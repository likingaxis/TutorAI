"""Controlla i file condivisi di TutorAI, senza dipendenze esterne."""

from __future__ import annotations

import json
import re
import struct
import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
MARKDOWN_LINK = re.compile(r"!?\[[^\]]*\]\(([^\n)]+)\)")


class References(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.targets: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        for key, value in attrs:
            if key in {"src", "href"} and value:
                self.targets.append(value)


def require(condition: bool, message: str) -> None:
    if not condition:
        raise ValueError(message)


def check_target(source: Path, target: str) -> bool:
    target = target.strip().strip("<>")
    parsed = urlsplit(target)
    require(parsed.scheme.lower() not in {"file", "c", "d"}, f"Percorso locale assoluto in {source.name}: {target}")
    if parsed.scheme or parsed.netloc or not parsed.path:
        return False
    resolved = (source.parent / unquote(parsed.path)).resolve()
    require(resolved.is_relative_to(ROOT), f"Link fuori dal repository in {source.name}: {target}")
    require(resolved.exists(), f"Link mancante in {source.relative_to(ROOT)}: {target}")
    return True


def main() -> None:
    markdown = [ROOT / "README.md", ROOT / "CONTRIBUTING.md", *sorted((ROOT / "docs").rglob("*.md"))]
    local_links = 0
    for path in markdown:
        text = path.read_text(encoding="utf-8")
        require("\ufffd" not in text, f"Problema UTF-8 in {path.name}")
        require(text.count("```") % 2 == 0, f"Blocco di codice non chiuso in {path.name}")
        for target in MARKDOWN_LINK.findall(text):
            local_links += check_target(path, target)
        parser = References()
        parser.feed(text)
        for target in parser.targets:
            local_links += check_target(path, target)
        for snippet in re.findall(r"```json\n(.*?)\n```", text, re.S):
            json.loads(snippet)

    for path in [ROOT / "index.html", ROOT / "docs/riferimenti/presentazione.html"]:
        parser = References()
        parser.feed(path.read_text(encoding="utf-8"))
        for target in parser.targets:
            local_links += check_target(path, target)

    for path in sorted((ROOT / "docs/riferimenti").glob("*.svg")):
        ET.parse(path)
    samples = sorted((ROOT / "esempi").glob("*.json"))
    for path in samples:
        json.loads(path.read_text(encoding="utf-8"))

    for filename, prefix, count in [
        ("SPECIFICA.md", "F", 17),
        ("CONTRATTI_E_DATI.md", "T", 12),
        ("PIANO.md", "AC", 18),
    ]:
        content = (ROOT / "docs" / filename).read_text(encoding="utf-8")
        actual = re.findall(r"^\| (" + prefix + r"\d{2}) \|", content, re.M)
        require(actual == [f"{prefix}{i:02d}" for i in range(1, count + 1)], f"ID incompleti o duplicati in {filename}")

    logo = (ROOT / "assets/logo.png").read_bytes()
    require(logo[:8] == b"\x89PNG\r\n\x1a\n", "Logo PNG non valido")
    width, height = struct.unpack(">II", logo[16:24])
    require(width > 0 and height > 0, "Dimensioni logo non valide")
    print(f"OK: {len(markdown)} documenti Markdown, {local_links} riferimenti locali, {len(samples)} esempi JSON, SVG e logo PNG.")
    print("ID verificati: F01-F17, T01-T12, AC01-AC18.")
    print("Il controllo riguarda i file del repository; i flussi applicativi sono ancora da implementare e testare.")


if __name__ == "__main__":
    try:
        main()
    except (ValueError, OSError, json.JSONDecodeError, ET.ParseError) as error:
        print(f"ERRORE: {error}", file=sys.stderr)
        sys.exit(1)
