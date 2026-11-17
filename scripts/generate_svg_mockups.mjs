import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Static, editable SVG mockups (Revisione Argon High). No application code or live data is changed.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'docs', 'mockup-svg');
fs.mkdirSync(out, { recursive: true });
const logo = fs.readFileSync(path.join(root, 'assets', 'logo.png')).toString('base64');

const C = {
  bg: '#0f131b',
  rail: '#141e33',
  panel: '#181f2c',
  panelHi: '#1d2638',
  inset: '#121722',
  line: '#2b3548',
  lineHi: '#3d4f6e',
  ink: '#f2f5fc',
  muted: '#a6b1c6',
  faint: '#77839b',
  blue: '#92aaff',
  blueBright: '#4a7dff',
  blueBg: '#243454',
  green: '#7ee0b8',
  greenBg: '#1d3933',
  amber: '#f0c475',
  amberBg: '#3b3123',
  white: '#f8faff',
  red: '#f2a7ad',
  redBg: '#3a252d',
};

const esc = (s) =>
  String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const icons = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.7"/><rect x="14" y="3" width="7" height="7" rx="1.7"/><rect x="3" y="14" width="7" height="7" rx="1.7"/><rect x="14" y="14" width="7" height="7" rx="1.7"/>',
  recall: '<path d="M4 10a8 8 0 1 1 1.4 7.2M4 4v6h6"/><path d="m9 13 2 2 4-5"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  plus: '<path d="M12 4v16M4 12h16"/>',
  arrow: '<path d="M4 12h15m-5-5 5 5-5 5"/>',
  back: '<path d="M20 12H5m5-5-5 5 5 5"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  book: '<path d="M12 5c-3-2-7-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-2-1-6-1-9 1Zm0 0v15"/>',
  note: '<path d="M6 3h9l4 4v14H6zM14 3v5h5M9 12h7M9 16h7"/>',
  file: '<path d="M5 3h9l5 5v13H5zM14 3v5h5"/>',
  folder: '<path d="M3 7V5h7l2 3h9v12H3z"/>',
  nodes: '<circle cx="5" cy="5" r="2.5"/><circle cx="19" cy="6" r="2.5"/><circle cx="12" cy="19" r="2.5"/><path d="m7.5 5 9 1M6 7l5 10M18 8l-5 9"/>',
  wave: '<path d="M2 15c3 0 3-9 6-9s3 12 6 12 4-10 8-10"/>',
  shield: '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6z"/><path d="m8 12 3 3 5-6"/>',
  list: '<path d="M9 6h12M9 12h12M9 18h12M3 6h1M3 12h1M3 18h1"/>',
  code: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"/>',
  quote: '<path d="M4 8h6v6H6c0 3-2 4-3 4m11-10h6v6h-4c0 3-2 4-3 4"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v5M17 3v5M3 11h18M7 15h3M14 15h3"/>',
  edit: '<path d="m15 4 5 5-11 11H4v-5zM12 7l5 5"/>',
  review: '<path d="M5 3h10l4 4v5M14 3v5h5M8 12h5M8 16h3M5 3v18h6"/><path d="m17 14 3 3-6 6h-3v-3z"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 4M12 17h.01"/>',
  spark: '<path d="M12 3c.8 4.6 4.4 8.2 9 9-4.6.8-8.2 4.4-9 9-.8-4.6-4.4-8.2-9-9 4.6-.8 8.2-4.4 9-9z"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
};

class Page {
  constructor(id, title, desc) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.parts = [];
    this.add(`<defs>
      <linearGradient id="${id}-rail-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#13213c"/>
        <stop offset="48%" stop-color="#172b4f"/>
        <stop offset="100%" stop-color="#0e1729"/>
      </linearGradient>
      <linearGradient id="${id}-hero-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1b2842"/>
        <stop offset="100%" stop-color="#151f33"/>
      </linearGradient>
      <clipPath id="${id}-rail-clip">
        <rect x="0" y="0" width="88" height="1000"/>
      </clipPath>
      <pattern id="${id}-note-grid" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#222a39" stroke-width="0.75"/>
        <circle cx="12" cy="12" r="0.85" fill="#2c374b"/>
      </pattern>
    </defs>`);
    this.rect(0, 0, 1600, 1000, C.bg);
  }
  add(s) {
    this.parts.push(s);
  }
  rect(x, y, w, h, fill = C.panel, rx = 0, stroke = null, extra = '') {
    this.add(
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"${
        stroke ? ` stroke="${stroke}"` : ''
      } ${extra}/>`
    );
  }
  line(x1, y1, x2, y2, color = C.line, width = 1, extra = '') {
    this.add(
      `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" ${extra}/>`
    );
  }
  circle(x, y, r, fill, stroke = null, sw = 1, extra = '') {
    this.add(
      `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"${
        stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : ''
      } ${extra}/>`
    );
  }
  text(x, y, text, size = 16, fill = C.ink, weight = 400, extra = '') {
    this.add(
      `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" ${extra}>${esc(
        text
      )}</text>`
    );
  }
  lines(x, y, rows, size = 16, fill = C.ink, weight = 400, step = size * 1.6, extra = '') {
    rows.forEach((row, i) => this.text(x, y + i * step, row, size, fill, weight, extra));
  }
  icon(name, x, y, size = 22, color = C.muted, width = 1.7) {
    this.add(
      `<g transform="translate(${x} ${y}) scale(${
        size / 24
      })" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round">${
        icons[name] || icons.note
      }</g>`
    );
  }
  link(file, draw, label) {
    this.add(`<a href="${file}" aria-label="${esc(label || file)}">`);
    draw();
    this.add('</a>');
  }
  button(x, y, w, label, { primary = false, icon = null, href = null, h = 44, quiet = false } = {}) {
    const draw = () => {
      this.rect(
        x,
        y,
        w,
        h,
        primary ? C.blue : quiet ? 'none' : C.panelHi,
        11,
        primary ? null : quiet ? '#2b364a' : C.lineHi
      );
      const color = primary ? '#0e172a' : C.ink;
      if (icon) this.icon(icon, x + 15, y + (h - 20) / 2, 20, color, primary ? 2 : 1.7);
      this.text(
        icon ? x + 44 : x + w / 2,
        y + h / 2 + 5,
        label,
        14,
        color,
        600,
        icon ? '' : 'text-anchor="middle"'
      );
    };
    if (href) this.link(href, draw, label);
    else draw();
  }
  badge(x, y, label, kind = 'muted', w = null) {
    const colors = {
      blue: [C.blueBg, C.blue],
      green: [C.greenBg, C.green],
      amber: [C.amberBg, C.amber],
      red: [C.redBg, C.red],
      muted: ['#232c3d', C.muted],
    };
    const [bg, fg] = colors[kind] || colors.muted;
    const width = w || Math.ceil(label.length * 7.2 + 24);
    this.rect(x, y, width, 28, bg, 8);
    this.text(x + width / 2, y + 18.5, label, 12.5, fg, 600, 'text-anchor="middle"');
    return width;
  }
  eyebrow(x, y, label, color = C.faint) {
    this.text(x, y, label, 11, color, 650, 'letter-spacing="1.6"');
  }
  rail(active = 'courses') {
    // Signature TutorAI deep blue wavy texture rail
    this.rect(0, 0, 88, 1000, `url(#${this.id}-rail-grad)`);
    this.add(`<g clip-path="url(#${this.id}-rail-clip)">
      <path d="M-20 140 C 25 90, 65 190, 110 135 L 110 340 C 65 390, 20 290, -20 350 Z" fill="#2b579a" opacity="0.18"/>
      <path d="M-20 420 C 30 370, 60 470, 110 410 L 110 640 C 60 700, 25 580, -20 650 Z" fill="#3b6fd9" opacity="0.14"/>
      <path d="M-15 710 C 35 660, 65 760, 110 700 L 110 960 C 65 1010, 20 910, -15 970 Z" fill="#60a5fa" opacity="0.11"/>
      <path d="M-10 85 C 30 135, 55 55, 100 105" fill="none" stroke="#60a5fa" stroke-width="1.4" opacity="0.22"/>
      <path d="M-10 380 C 35 430, 55 340, 100 390" fill="none" stroke="#92aaff" stroke-width="1.2" opacity="0.18"/>
      <path d="M-10 690 C 35 740, 55 650, 100 700" fill="none" stroke="#92aaff" stroke-width="1.2" opacity="0.16"/>
    </g>`);
    this.line(88, 0, 88, 1000, '#2a3a59', 1.2);

    // App Logo ONLY in the rail
    this.link(
      '01-corsi.svg',
      () => {
        this.rect(17, 20, 54, 54, '#1b2c4d', 15, '#3b5998');
        this.add(
          `<image x="19" y="22" width="50" height="50" href="data:image/png;base64,${logo}"/>`
        );
      },
      'TutorAI · Home Corsi'
    );

    const item = (key, name, label, y, file, dot = false) =>
      this.link(
        file,
        () => {
          const on = active === key;
          if (on) {
            this.rect(12, y, 64, 64, '#243860', 15, '#4b6fb3');
            this.rect(0, y + 18, 3.5, 28, C.blue, 1.75);
          }
          this.icon(name, 33, y + 11, 22, on ? C.blue : '#b0bdd6');
          if (dot) this.circle(59, y + 14, 4.5, C.amber, '#15233f', 1.5);
          this.text(
            44,
            y + 52,
            label,
            12,
            on ? C.white : '#b0bdd6',
            on ? 650 : 500,
            'text-anchor="middle"'
          );
        },
        label
      );

    item('courses', 'grid', 'Corsi', 104, '01-corsi.svg');
    item('study', 'book', 'Studio', 180, '03-studio.svg');
    item('recall', 'recall', 'Ripasso', 256, '04-ripasso.svg', true);

    // Compact 3-dot Theme switcher pill (Light / Sepia / Dark)
    this.rect(14, 830, 60, 26, '#0e1628', 13, '#2c3e60');
    this.circle(26, 843, 4.5, '#f2f5fc');
    this.circle(44, 843, 4.5, '#dfc496');
    this.circle(62, 843, 5.5, '#3b6fd9', C.blue, 1.4);

    this.line(20, 874, 68, 874, '#2a3a59');

    // Profile + History clock cue linking to 06-attivita.svg
    this.link(
      '06-attivita.svg',
      () => {
        const on = active === 'profile';
        if (on) {
          this.rect(12, 890, 64, 82, '#243860', 15, '#4b6fb3');
          this.rect(0, 916, 3.5, 28, C.blue, 1.75);
        }
        this.circle(44, 920, 18, '#263859', on ? C.blue : '#4b618a', 1.5);
        this.text(44, 926, 'L', 15, C.white, 650, 'text-anchor="middle"');
        // Intuitive clock/history badge on avatar corner
        this.circle(58, 933, 8, '#111b30', C.blue, 1.2);
        this.add(
          `<path d="M58 929.5v3.5l2.2 1.4" fill="none" stroke="${C.blue}" stroke-width="1.3" stroke-linecap="round"/>`
        );
        this.text(
          44,
          960,
          'Profilo',
          12,
          on ? C.white : '#b0bdd6',
          on ? 650 : 500,
          'text-anchor="middle"'
        );
      },
      'Profilo e cronologia attività'
    );
  }
  progress(x, y, w, done, total, color = C.blue) {
    this.rect(x, y, w, 6, '#273144', 3);
    this.rect(x, y, Math.max(6, (w * done) / total), 6, color, 3);
  }
  ring(cx, cy, r, pct, color = C.blue, label = '') {
    const circ = +(2 * Math.PI * r).toFixed(2);
    const dash = +((circ * pct) / 100).toFixed(2);
    this.circle(cx, cy, r, 'none', '#273246', 5);
    this.add(
      `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round" stroke-dasharray="${dash} ${circ}" transform="rotate(-90 ${cx} ${cy})"/>`
    );
    if (label) {
      this.text(cx, cy + 5, label, 13, C.ink, 650, 'text-anchor="middle"');
    }
  }
  floatingFormatDock(cx = 1204, y = 838) {
    const w = 488,
      x = cx - w / 2;
    this.rect(x, y, w, 44, '#111724', 22, '#3a4b69');
    const items = [
      ['B', 750, ''],
      ['I', 500, 'font-style="italic"'],
      ['S', 500, 'text-decoration="line-through"'],
      ['U', 500, 'text-decoration="underline"'],
      ['|', 400, ''],
      ['x²', 600, ''],
      ['x₂', 600, ''],
      ['|', 400, ''],
      ['</>', 600, ''],
      ['∑', 600, ''],
      ['”', 650, ''],
    ];
    let curX = x + 28;
    items.forEach(([lbl, weight, style]) => {
      if (lbl === '|') {
        this.line(curX - 4, y + 11, curX - 4, y + 33, '#2d3a52', 1.2);
        curX += 16;
      } else {
        if (lbl === '∑') {
          this.rect(curX - 10, y + 7, 74, 30, '#1f2d47', 10, '#3e5680');
          this.text(curX + 27, y + 27, '∑ formula', 12.5, C.blue, 600, 'text-anchor="middle"');
          curX += 82;
        } else {
          this.text(curX, y + 27, lbl, 14.5, '#dbe4f6', weight, `text-anchor="middle" ${style}`);
          curX += 38;
        }
      }
    });
  }
  svg() {
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1600" height="1000" viewBox="0 0 1600 1000" role="img" aria-labelledby="${this.id}-title ${this.id}-desc"><title id="${this.id}-title">${esc(this.title)}</title><desc id="${this.id}-desc">${esc(this.desc)}</desc><style>text{font-family:'Segoe UI',Inter,system-ui,sans-serif}a{text-decoration:none}a:hover{cursor:pointer}</style>${this.parts.join('\n')}</svg>`;
  }
}

const pages = [];
let studyFrameParts = [];
function save(file, p) {
  fs.writeFileSync(path.join(out, file), p.svg());
  pages.push({ file, p });
}

function courseArt(p, x, y, w, kind, unitChip) {
  const bg = kind === 'nodes' ? '#1c2a46' : kind === 'wave' ? '#242944' : '#1b332f';
  const col = kind === 'nodes' ? '#92aaff' : kind === 'wave' ? '#b8aef7' : '#7ee0b8';
  p.rect(x, y, w, 132, bg, 14);
  if (kind === 'nodes') {
    [
      [68, 96, 126, 54],
      [126, 54, 194, 94],
      [194, 94, 256, 58],
      [126, 54, 256, 58],
      [68, 96, 194, 94],
    ].forEach((a) => p.line(x + a[0], y + a[1], x + a[2], y + a[3], '#465d91', 1.6));
    [
      [68, 96],
      [126, 54],
      [194, 94],
      [256, 58],
    ].forEach(([cx, cy], i) => {
      p.circle(x + cx, y + cy, i === 1 ? 9 : 6, i === 1 ? col : bg, col, 1.8);
    });
  } else if (kind === 'wave') {
    for (let i = 0; i < 4; i++) {
      p.add(
        `<path d="M${x + 64} ${y + 82 + i * 7} C${x + 110} ${y + 38 + i * 7} ${x + 146} ${
          y + 118 - i * 5
        } ${x + 194} ${y + 72 + i * 6} S${x + 236} ${y + 44 + i * 7} ${x + 272} ${
          y + 78 + i * 6
        }" fill="none" stroke="${col}" stroke-width="1.6" opacity="${0.9 - i * 0.18}"/>`
      );
    }
  } else {
    p.add(
      `<g transform="translate(${x + 120} ${y + 26})" fill="none" stroke="${col}" stroke-width="1.7"><path d="m46 0 38 15v24c0 26-38 44-38 44S8 65 8 39V15z"/><path d="m31 39 11 11 23-25"/></g>`
    );
    for (let i = 0; i < 3; i++) {
      p.line(x + 72 + i * 16, y + 48, x + 72 + i * 16, y + 96, '#34574e');
      p.line(x + w - 72 - i * 16, y + 48, x + w - 72 - i * 16, y + 96, '#34574e');
    }
  }
  // Subject icon tile top-left + unit badge top-right inside banner
  p.rect(x + 16, y + 16, 38, 38, '#111827', 10, col);
  p.icon(kind, x + 24, y + 24, 22, col);
  p.rect(x + w - 92, y + 16, 76, 26, '#111827', 8);
  p.text(x + w - 54, y + 33.5, unitChip, 12, C.ink, 600, 'text-anchor="middle"');
}

// ============================================================================
// 01 — HOME / CORSI
// ============================================================================
{
  const p = new Page(
    'courses',
    'TutorAI · Corsi',
    'Home con saluto, ripresa immediata dell’ultima lezione e griglia dei corsi con tessera + Nuovo corso integrata.'
  );
  p.rail('courses');

  // Minimal Top Greeting Bar + Streak Pill + Search
  p.eyebrow(144, 58, 'SPAZIO DI STUDIO');
  p.text(144, 104, 'Bentornato, Luca', 34, C.ink, 650);

  // Streak & weekly progress pill
  p.rect(448, 74, 168, 36, '#1d273b', 18, '#35486b');
  p.icon('bolt', 462, 82, 19, C.amber);
  p.text(488, 97, '3 giorni · 2/4', 13.5, C.ink, 600);

  // Search box
  p.rect(1188, 68, 356, 44, C.panel, 12, C.line);
  p.icon('search', 1206, 80, 20, C.muted);
  p.text(1238, 95, 'Cerca corso o argomento...', 14, C.muted);

  // Resume Hero Card ("Ultima lezione")
  p.rect(144, 144, 1400, 232, `url(#${p.id}-hero-grad)`, 22, '#34486d');
  p.badge(180, 174, 'ULTIMA LEZIONE', 'blue', 142);
  p.badge(334, 174, 'Sistemi Distribuiti', 'muted', 158);
  p.text(180, 238, '1.3 Orologi logici di Lamport', 31, C.white, 650);

  // Crisp visual status pills instead of prose
  p.icon('file', 180, 260, 17, C.blue);
  p.text(204, 274, 'Slide p. 12', 13.5, '#cbd6ee', 550);
  p.circle(292, 269, 2.5, C.faint);
  p.icon('note', 308, 260, 17, C.green);
  p.text(332, 274, 'Appunti v1', 13.5, C.green, 550);
  p.circle(418, 269, 2.5, C.faint);
  p.text(432, 274, 'Unità 3 di 4', 13.5, C.muted, 500);

  // Primary CTA + subtle course link
  p.button(180, 304, 192, 'Continua →', {
    primary: true,
    href: '03-studio.svg',
    h: 46,
  });
  p.link(
    '02-corso.svg',
    () => {
      p.rect(388, 304, 136, 46, '#202d47', 11, '#3b5079');
      p.text(456, 332, 'Vai al corso', 14, '#d3def7', 600, 'text-anchor="middle"');
    },
    'Vai al corso Sistemi Distribuiti'
  );

  // Visual stepping-stone path + Lamport diagram preview on right of Hero
  p.rect(868, 168, 646, 184, '#111827', 16, '#2b3b59');
  p.eyebrow(896, 198, 'PERCORSO DEL CORSO', C.blue);
  const steps = [
    { x: 930, lbl: '1.1 Asincrono', st: 'done' },
    { x: 1095, lbl: '1.2 Happened-before', st: 'done' },
    { x: 1275, lbl: '1.3 Lamport', st: 'curr' },
    { x: 1435, lbl: '1.4 Vettoriali', st: 'todo' },
  ];
  p.line(930, 236, 1435, 236, '#2c3c59', 2.5);
  p.line(930, 236, 1275, 236, C.blue, 2.5);
  steps.forEach((s) => {
    if (s.st === 'done') {
      p.circle(s.x, 236, 13, C.greenBg, C.green, 2);
      p.icon('check', s.x - 8, 228, 16, C.green, 2.2);
    } else if (s.st === 'curr') {
      p.circle(s.x, 236, 16, C.blueBg, C.blue, 2.5);
      p.circle(s.x, 236, 6, C.blue);
    } else {
      p.circle(s.x, 236, 12, '#182235', '#4a5a78', 1.8);
    }
    p.text(
      s.x,
      268,
      s.lbl,
      12,
      s.st === 'curr' ? C.white : C.muted,
      s.st === 'curr' ? 650 : 500,
      'text-anchor="middle"'
    );
  });
  // Mini P1 -> P2 clock preview bar at bottom of hero visual
  p.rect(896, 288, 590, 46, '#172136', 10);
  p.text(920, 316, 'P₁  C = 1', 12.5, C.muted, 600);
  p.line(986, 311, 1086, 311, C.blue, 2);
  p.circle(986, 311, 4, C.blue);
  p.circle(1086, 311, 5, C.blue);
  p.text(1104, 316, 'P₂  Cⱼ ← max(Cⱼ, tₘ) + 1 = 2', 13, C.blue, 600);
  p.badge(1366, 297, 'In corso', 'blue', 102);

  // Course Shelf Header
  p.text(144, 434, 'I tuoi corsi', 24, C.ink, 650);
  p.badge(282, 412, '3 attivi', 'muted', 82);

  const cards = [
    {
      x: 144,
      name: 'Sistemi Distribuiti',
      kind: 'nodes',
      done: 2,
      total: 4,
      unitChip: '2/4 unità',
      mode: 'Lezione per lezione',
      hint: 'Richiamo oggi',
      badge: 'amber',
    },
    {
      x: 500,
      name: 'Algoritmi e strutture dati',
      kind: 'wave',
      done: 1,
      total: 3,
      unitChip: '1/3 unità',
      mode: 'Preparazione esame',
      hint: 'Ripasso domani',
      badge: 'muted',
    },
    {
      x: 856,
      name: 'Crittografia applicata',
      kind: 'shield',
      done: 1,
      total: 2,
      unitChip: '1/2 unità',
      mode: 'Lezione per lezione',
      hint: 'In pari',
      badge: 'green',
    },
  ];

  cards.forEach((c) => {
    const draw = () => {
      p.rect(c.x, 462, 332, 344, C.panel, 18, C.line);
      courseArt(p, c.x + 1, 463, 330, c.kind, c.unitChip);
      p.text(c.x + 24, 634, c.name, 20, C.ink, 650);
      p.text(c.x + 24, 662, c.mode, 13.5, C.muted);
      p.text(c.x + 24, 708, `Avanzamento`, 13, C.muted);
      p.text(
        c.x + 308,
        708,
        `${Math.round((c.done / c.total) * 100)}%`,
        13,
        C.ink,
        650,
        'text-anchor="end"'
      );
      p.progress(
        c.x + 24,
        722,
        284,
        c.done,
        c.total,
        c.badge === 'green' ? C.green : C.blue
      );
      p.badge(c.x + 24, 754, c.hint, c.badge, 148);
      p.icon('arrow', c.x + 284, 758, 20, C.muted);
    };
    if (c.kind === 'nodes') p.link('02-corso.svg', draw, c.name);
    else draw();
  });

  // 4th Card: + Nuovo corso integrated cleanly in the same row with ZERO helper paragraph
  p.rect(1212, 462, 332, 344, '#141a26', 18, '#3b4a66', 'stroke-dasharray="7 6"');
  p.circle(1378, 594, 34, '#1e2b45', '#425d8f', 1.5);
  p.icon('plus', 1364, 580, 28, C.blue, 2);
  p.text(1378, 662, '+ Nuovo corso', 21, C.white, 650, 'text-anchor="middle"');
  p.badge(1302, 686, 'Slide · PDF · Appunti', 'muted', 152);

  save('01-corsi.svg', p);
}

// ============================================================================
// 02 — CORSO (Course Detail)
// ============================================================================
{
  const p = new Page(
    'course',
    'TutorAI · Sistemi Distribuiti',
    'Dettaglio del corso con elenco lezioni, pulsante + Aggiungi lezione, materiali e scheda ripasso.'
  );
  p.rail('courses');

  p.link(
    '01-corsi.svg',
    () => {
      p.icon('back', 144, 42, 19, C.muted);
      p.text(172, 58, 'Corsi', 14, C.muted, 550);
    },
    'Torna a tutti i corsi'
  );

  p.rect(144, 84, 62, 62, '#213152', 16, '#3e5788');
  p.icon('nodes', 159, 99, 32, C.blue);
  p.text(226, 116, 'Sistemi Distribuiti', 34, C.ink, 650);
  p.badge(226, 130, 'Lezione per lezione', 'muted', 152);
  p.badge(388, 130, '2 / 4 unità', 'blue', 102);
  p.badge(500, 130, '4 materiali', 'muted', 104);

  p.button(1312, 96, 232, 'Continua 1.3 →', {
    primary: true,
    href: '03-studio.svg',
    h: 46,
  });

  // Left Column: Lezioni + "+ Aggiungi lezione" right in the lesson header
  p.text(144, 218, 'Lezioni del corso', 22, C.ink, 650);
  p.button(820, 188, 196, '+ Aggiungi lezione', { h: 42 });
  p.line(144, 242, 1016, 242);

  const rows = [
    {
      y: 266,
      n: '1.1',
      title: 'Modello di sistema asincrono',
      meta: '2 fonti · Appunti v1',
      state: 'Completata',
      type: 'green',
      action: 'Riapri',
    },
    {
      y: 394,
      n: '1.2',
      title: 'Relazione happened-before',
      meta: '1 fonte · Verificata il 15 nov',
      state: 'Completata',
      type: 'green',
      action: 'Riapri',
    },
    {
      y: 522,
      n: '1.3',
      title: 'Orologi logici di Lamport',
      meta: 'Slide p. 12 · Bozza v1',
      state: 'In corso',
      type: 'blue',
      action: 'Riprendi',
    },
    {
      y: 650,
      n: '1.4',
      title: 'Orologi vettoriali',
      meta: '1 fonte · Slide p. 24',
      state: 'Da iniziare',
      type: 'muted',
      action: 'Inizia',
    },
  ];

  rows.forEach((r) => {
    const draw = () => {
      const isCurr = r.type === 'blue';
      p.rect(
        144,
        r.y,
        872,
        108,
        isCurr ? '#1f2d47' : C.panel,
        15,
        isCurr ? '#506fa8' : C.line
      );
      p.rect(
        168,
        r.y + 28,
        52,
        52,
        r.type === 'green' ? C.greenBg : isCurr ? C.blueBg : '#222b3a',
        13
      );
      if (r.type === 'green') {
        p.icon('check', 182, r.y + 42, 24, C.green, 2);
      } else {
        p.text(
          194,
          r.y + 60,
          r.n,
          15,
          isCurr ? C.blue : C.muted,
          650,
          'text-anchor="middle"'
        );
      }
      p.text(242, r.y + 47, `${r.n}  ${r.title}`, 19, C.ink, 600);
      p.text(242, r.y + 75, r.meta, 13.5, C.muted);
      p.badge(744, r.y + 40, r.state, r.type, 122);
      p.text(
        904,
        r.y + 59,
        r.action,
        14,
        isCurr ? C.blue : C.muted,
        600
      );
      p.icon('chevron', 974, r.y + 43, 18, isCurr ? C.blue : C.muted);
    };
    if (r.type === 'blue') p.link('03-studio.svg', draw, `${r.action} ${r.title}`);
    else draw();
  });

  // Right Column: Ripasso del corso + Materiali
  p.rect(1060, 188, 484, 224, C.panel, 18, C.line);
  p.eyebrow(1088, 222, 'RIPASSO DEL CORSO', C.amber);
  p.badge(1396, 206, 'Oggi · ~5 min', 'amber', 120);
  p.text(1088, 262, '1.2 Relazione happened-before', 21, C.ink, 650);
  p.text(1088, 292, '3 domande · Senza appunti · Ultima: 15 nov', 13.5, C.muted);
  p.button(1088, 336, 216, 'Vai al ripasso →', {
    primary: true,
    href: '04-ripasso.svg',
    h: 44,
  });

  p.rect(1060, 440, 484, 318, C.panel, 18, C.line);
  p.text(1088, 482, 'Materiali', 20, C.ink, 650);
  p.badge(1190, 462, '4 file', 'muted', 68);
  p.button(1392, 456, 124, '+ Carica', { h: 36 });

  const sources = [
    ['Slide delle lezioni', 'PDF · 42 pagine', 'file', 'muted'],
    ['Dispensa del corso', 'PDF · 86 pagine', 'file', 'muted'],
    ['Esercizi e temi d’esame', 'PDF · 18 pagine', 'file', 'muted'],
    ['Appunti manoscritti', 'Scansione · 6 pagine', 'note', 'amber'],
  ];
  sources.forEach((s, i) => {
    const y = 516 + i * 58;
    p.line(1088, y - 8, 1516, y - 8, '#232c3d');
    p.icon(s[2], 1088, y + 6, 21, s[3] === 'amber' ? C.amber : C.blue);
    p.text(1124, y + 18, s[0], 15, C.ink, 550);
    p.text(1124, y + 38, s[1], 12.5, s[3] === 'amber' ? C.amber : C.muted);
    p.icon('chevron', 1498, y + 12, 16, C.muted);
  });

  save('02-corso.svg', p);
}

// ============================================================================
// 03 — STUDIO (Explanation + Obsidian-inspired Micro-Grid Notes + Floating Dock)
// ============================================================================
{
  const p = new Page(
    'study',
    'TutorAI · Studio e appunti',
    'Spiegazione interattiva a sinistra e foglio appunti su griglia in stile Obsidian a destra con barra flottante.'
  );
  p.rail('study');

  // Top Bar: <- Corso + [Indice] on TOP-LEFT beside the breadcrumb!
  p.link(
    '02-corso.svg',
    () => {
      p.rect(112, 20, 96, 40, C.panel, 10, C.line);
      p.icon('back', 124, 30, 18, C.muted);
      p.text(152, 45, 'Corso', 14, C.ink, 550);
    },
    'Torna al corso Sistemi Distribuiti'
  );
  p.button(218, 20, 106, 'Indice', { icon: 'list', h: 40 });
  p.text(342, 45, 'Sistemi Distribuiti', 14, C.muted, 500);
  p.text(472, 45, '/', 14, C.faint);
  p.text(490, 45, '1.3 Orologi logici di Lamport', 15, C.ink, 650);
  p.badge(1432, 26, 'Unità 1.3 · 3/4', 'blue', 144);
  p.line(112, 76, 1576, 76);

  const lx = 112,
    ly = 92,
    lw = 700,
    rx = 832,
    rw = 744,
    ph = 880;

  // Left Pane: Spiegazione | Slide + Visual depth dots (● ● ○)
  p.rect(lx, ly, lw, ph, '#161c27', 18, C.line);
  p.rect(132, 110, 224, 38, '#10151f', 10, '#263145');
  p.rect(136, 114, 118, 30, '#26385e', 8);
  p.text(195, 134, 'Spiegazione', 13.5, C.white, 600, 'text-anchor="middle"');
  p.text(304, 134, 'Slide (12)', 13.5, C.muted, 500, 'text-anchor="middle"');

  // Compact visual depth selector (● ● ○)
  p.rect(636, 110, 154, 38, '#10151f', 10, '#263145');
  p.text(654, 134, 'Dettaglio', 12.5, C.muted, 550);
  p.circle(728, 129, 5, C.blue);
  p.circle(746, 129, 5, C.blue);
  p.circle(764, 129, 5, 'none', C.muted, 1.6);
  p.line(lx, 164, lx + lw, 164);

  p.eyebrow(144, 202, 'UNITÀ 1.3 · ORDINE LOGICO DEGLI EVENTI', C.blue);
  p.text(144, 242, 'Orologi logici di Lamport', 28, C.ink, 650);
  p.badge(144, 258, 'Slide delle lezioni · p. 12', 'muted', 194);

  p.lines(
    144,
    314,
    [
      'Un timestamp logico ordina gli eventi di un sistema asincrono',
      'senza assumere un orologio fisico condiviso tra i nodi.',
    ],
    15.5,
    '#c9d2e3',
    400,
    25
  );

  p.text(144, 386, 'Due regole per ogni processo Pᵢ', 17.5, C.ink, 600);
  p.circle(156, 420, 11, C.blueBg);
  p.text(156, 425, '1', 12, C.blue, 650, 'text-anchor="middle"');
  p.text(178, 425, 'Evento locale o invio: incrementa Cᵢ ← Cᵢ + 1.', 15, C.muted);
  p.circle(156, 456, 11, C.blueBg);
  p.text(156, 461, '2', 12, C.blue, 650, 'text-anchor="middle"');
  p.text(178, 461, 'Ricezione di un messaggio con timestamp tₘ:', 15, C.muted);

  p.rect(144, 480, 636, 58, '#101520', 12, '#28354d');
  p.text(462, 517, 'Cⱼ ← max(Cⱼ, tₘ) + 1', 22, '#dce6ff', 600, 'text-anchor="middle"');

  // Interactive Lamport message diagram
  p.eyebrow(144, 574, 'SEGUI UN MESSAGGIO');
  p.rect(144, 590, 636, 162, '#111621', 14, C.line);
  p.text(168, 642, 'P₁', 15, C.muted, 650);
  p.text(168, 712, 'P₂', 15, C.muted, 650);
  p.line(206, 637, 748, 637, '#435068', 2);
  p.line(206, 707, 748, 707, '#435068', 2);
  p.line(290, 637, 496, 707, C.blue, 2.2);
  p.add('<path d="m496 707-13-1 5-10z" fill="#92aaff"/>');
  p.circle(290, 637, 8, '#111621', C.blue, 2.2);
  p.circle(496, 707, 10, C.blue);
  p.text(270, 616, 'A · C = 1', 12.5, C.ink, 600);
  p.text(472, 734, 'B · C = 2', 12.5, C.blue, 650);
  p.rect(344, 652, 114, 24, '#1b2945', 6);
  p.text(401, 668, 'msg (t = 1)', 12, C.blue, 600, 'text-anchor="middle"');

  // Highlighted text passage with direct click-to-ask affordance
  p.rect(144, 770, 636, 120, '#1c2842', 12, '#425d94');
  p.rect(144, 770, 4, 120, C.blue, 2);
  p.lines(
    168,
    798,
    [
      'Se A → B, allora C(A) < C(B).',
      'Il contrario non basta a dimostrare causalità (A ∥ B).',
    ],
    15.5,
    C.white,
    550,
    25
  );
  // Floating selection affordance chips cleanly on their own row below the text
  p.rect(168, 844, 134, 30, C.blue, 15);
  p.text(235, 864, 'Chiedi al tutor', 12.5, '#0e172a', 650, 'text-anchor="middle"');
  p.rect(312, 844, 118, 30, '#131b2c', 15, '#3e5278');
  p.text(371, 864, 'Poco chiaro', 12.5, C.blue, 600, 'text-anchor="middle"');
  p.badge(642, 845, 'Testo selezionato', 'muted', 122);

  // Save left-pane + top-bar state for 07, 08, 09
  studyFrameParts = [...p.parts];

  // Right Pane: Obsidian-style Notes with subtle micro-grid paper background
  p.rect(rx, ly, rw, ph, '#161b26', 18, C.line);
  p.rect(rx + 1, ly + 72, rw - 2, 736, `url(#${p.id}-note-grid)`);

  // Minimal Top Status Bar
  p.icon('note', 858, 117, 20, C.blue);
  p.text(888, 134, 'I miei appunti', 15.5, C.ink, 650);
  p.circle(1022, 129, 4, C.green);
  p.text(1034, 134, 'Salvato', 13, C.green, 550);
  p.badge(1456, 114, 'v1 · Bozza', 'muted', 96);
  p.line(rx, 164, rx + rw, 164);

  // Obsidian Markdown Note Content
  p.text(876, 218, 'Orologi logici di Lamport', 28, C.ink, 650);

  p.text(876, 268, '#', 16, C.blue, 700);
  p.text(896, 268, 'Perché servono', 18.5, C.ink, 600);
  p.lines(
    876,
    302,
    [
      'Ogni nodo ha il proprio clock fisico locale. Senza sincronizzazione',
      'perfetta, usiamo un contatore logico monotono per gli eventi.',
    ],
    16,
    '#cbd3e3',
    400,
    27
  );

  p.text(876, 392, '#', 16, C.blue, 700);
  p.text(896, 392, 'Regola di aggiornamento', 18.5, C.ink, 600);
  p.lines(
    876,
    426,
    [
      'Alla ricezione di un messaggio (tₘ), il nodo prende il massimo',
      'tra il proprio contatore e tₘ, poi incrementa di 1:',
    ],
    16,
    '#cbd3e3',
    400,
    27
  );
  p.rect(876, 472, 656, 54, '#101520', 10, '#2b3850');
  p.text(1204, 506, 'Cⱼ = max(Cⱼ, tₘ) + 1', 21, '#dee7ff', 600, 'text-anchor="middle"');

  // Student's unresolved doubt block
  p.rect(876, 556, 656, 146, '#1d273d', 12, '#435b8a');
  p.rect(876, 556, 4, 146, C.amber, 2);
  p.text(900, 588, 'Dubbio da chiarire', 15, C.amber, 650);
  p.lines(
    900,
    618,
    [
      'Come riconosco due eventi concorrenti?',
      'Un timestamp più piccolo basta per dire che',
      'un evento ha causato l’altro?',
    ],
    16,
    '#e3eaf8',
    400,
    26
  );
  p.line(1134, 654, 1134, 674, C.blue, 2);

  // Centered Floating Pill Formatting Dock at bottom of notes canvas
  p.floatingFormatDock(1204, 836);

  // Single clear bottom action bar
  p.line(rx, 900, rx + rw, 900);
  p.badge(860, 920, '3 sezioni · 1 dubbio', 'muted', 158);
  p.button(1296, 914, 256, 'Rivedi i miei appunti →', {
    primary: true,
    icon: 'review',
    h: 42,
    href: '07-revisione-appunti.svg',
  });

  save('03-studio.svg', p);
}

// ============================================================================
// 04 — RIPASSO LOBBY (Balanced & Scannable at a Glance)
// ============================================================================
{
  const p = new Page(
    'recall',
    'TutorAI · Ripasso',
    'Lobby di ripasso bilanciata: sessione del giorno, prossimi richiami, padronanza per materia con anelli visivi e verifiche recenti.'
  );
  p.rail('recall');

  p.eyebrow(144, 58, 'RICHIAMO SENZA AIUTI');
  p.text(144, 104, 'Ripasso', 34, C.ink, 650);
  p.badge(292, 80, '1 sessione pronta', 'amber', 144);
  p.button(1312, 66, 232, 'Tutti i corsi', { icon: 'grid', h: 42 });
  p.icon('down', 1512, 78, 17, C.muted);

  // Left Column: "Da ripassare oggi" spotlight card + "Prossimi richiami"
  p.rect(144, 144, 820, 290, `url(#${p.id}-hero-grad)`, 20, '#3a5078');
  p.badge(176, 174, 'DA RIPASSARE OGGI', 'amber', 164);
  p.badge(352, 174, 'Sistemi Distribuiti · Unità 1.2', 'muted', 228);

  p.text(176, 240, '1.2 Relazione happened-before', 30, C.white, 650);

  // Crisp metadata pills
  p.icon('clock', 176, 266, 18, C.blue);
  p.text(202, 281, '3 domande · ~5 min · senza appunti', 14.5, '#d4def2', 550);
  p.text(176, 314, 'Ultima prova: 15 nov (2/2 corrette)', 13.5, C.muted);

  p.button(176, 356, 236, 'Inizia sessione →', {
    primary: true,
    href: '05-sessione-ripasso.svg',
    h: 48,
  });

  // Mini visual preview inside spotlight card
  p.rect(632, 176, 304, 228, '#111827', 14, '#2b3c5c');
  p.eyebrow(656, 206, 'CONCETTO CHIAVE', C.blue);
  p.text(656, 234, 'Ordine causale vs Concorrenza', 14.5, C.ink, 600);
  p.line(656, 272, 820, 272, C.blue, 2);
  p.circle(680, 272, 7, C.blue);
  p.circle(796, 272, 7, C.blue);
  p.text(846, 277, 'A → B', 13, C.blue, 650);
  p.line(656, 326, 820, 326, '#45536d', 1.8, 'stroke-dasharray="5 4"');
  p.circle(680, 326, 7, '#dce4f5');
  p.circle(796, 326, 7, '#dce4f5');
  p.text(846, 331, 'A ∥ B', 13, C.amber, 650);
  p.badge(656, 356, 'Senza fonti né indizi', 'green', 168);

  // Left Bottom: Prossimi richiami visual schedule
  p.text(144, 486, 'Prossimi richiami', 22, C.ink, 650);
  const schedule = [
    {
      y: 512,
      icon: 'calendar',
      title: '2.1 Programmazione dinamica',
      sub: 'Algoritmi e strutture dati · 3 domande',
      chip: 'Domani · 18 nov',
      kind: 'muted',
      href: null,
    },
    {
      y: 622,
      icon: 'book',
      title: '1.3 Orologi logici di Lamport',
      sub: 'Sistemi Distribuiti · Studio in corso',
      chip: 'Riprendi studio →',
      kind: 'blue',
      href: '03-studio.svg',
    },
    {
      y: 732,
      icon: 'shield',
      title: '1.1 Scambio di chiavi Diffie-Hellman',
      sub: 'Crittografia applicata · 2 domande',
      chip: '21 nov',
      kind: 'muted',
      href: null,
    },
  ];
  schedule.forEach((s) => {
    const draw = () => {
      p.rect(144, s.y, 820, 94, C.panel, 14, C.line);
      p.rect(168, s.y + 21, 52, 52, s.kind === 'blue' ? C.blueBg : '#212a3a', 13);
      p.icon(s.icon, 183, s.y + 36, 22, s.kind === 'blue' ? C.blue : C.muted);
      p.text(240, s.y + 42, s.title, 18, C.ink, 600);
      p.text(240, s.y + 68, s.sub, 13.5, C.muted);
      p.badge(784, s.y + 33, s.chip, s.kind, 156);
    };
    if (s.href) p.link(s.href, draw, s.title);
    else draw();
  });

  // Right Column Top: "Padronanza per materia" with visual progress rings/bars
  p.rect(1000, 144, 544, 348, C.panel, 18, C.line);
  p.text(1028, 186, 'Padronanza per materia', 20, C.ink, 650);
  p.badge(1408, 164, '3 materie', 'muted', 108);

  const mastery = [
    {
      y: 214,
      name: 'Sistemi Distribuiti',
      sub: '2/4 unità verificate · 1 richiamo oggi',
      pct: 50,
      col: C.blue,
      pill: 'Oggi',
      kind: 'amber',
    },
    {
      y: 302,
      name: 'Algoritmi e strutture dati',
      sub: '1/3 unità verificate · Prossimo domani',
      pct: 33,
      col: '#b8aef7',
      pill: 'Domani',
      kind: 'muted',
    },
    {
      y: 390,
      name: 'Crittografia applicata',
      sub: '1/2 unità verificate · In pari',
      pct: 50,
      col: C.green,
      pill: 'In pari',
      kind: 'green',
    },
  ];
  mastery.forEach((m) => {
    p.line(1028, m.y - 8, 1516, m.y - 8, '#232c3d');
    p.ring(1058, m.y + 32, 24, m.pct, m.col, `${m.pct}%`);
    p.text(1100, m.y + 24, m.name, 16.5, C.ink, 600);
    p.text(1100, m.y + 46, m.sub, 12.5, C.muted);
    p.progress(1100, m.y + 56, 290, m.pct, 100, m.col);
    p.badge(1418, m.y + 18, m.pill, m.kind, 96);
  });

  // Right Column Bottom: Clickable "Verifiche recenti" linking to 11-verifica-storica.svg
  p.rect(1000, 512, 544, 314, C.panel, 18, C.line);
  p.text(1028, 554, 'Verifiche recenti', 20, C.ink, 650);
  p.link(
    '06-attivita.svg',
    () => {
      p.text(1490, 554, 'Tutte', 14, C.blue, 600, 'text-anchor="end"');
      p.icon('arrow', 1498, 538, 18, C.blue);
    },
    'Vedi tutte le verifiche'
  );

  const recents = [
    {
      y: 582,
      title: '1.2 Relazione happened-before',
      sub: 'Sistemi Distribuiti · 15 nov, 18:32',
      score: '2/2',
      href: '11-verifica-storica.svg',
    },
    {
      y: 662,
      title: '1.1 Modello di sistema asincrono',
      sub: 'Sistemi Distribuiti · 14 nov, 17:10',
      score: '3/3',
      href: '11-verifica-storica.svg',
    },
    {
      y: 742,
      title: '1.1 Alberi bilanciati AVL',
      sub: 'Algoritmi e strutture dati · 12 nov',
      score: '2/3',
      href: null,
    },
  ];
  recents.forEach((r) => {
    const draw = () => {
      p.rect(1024, r.y, 496, 66, '#141a26', 12, '#263145');
      p.circle(1054, r.y + 33, 15, C.greenBg);
      p.icon('check', 1045, r.y + 24, 18, C.green, 2);
      p.text(1082, r.y + 28, r.title, 15.5, C.ink, 600);
      p.text(1082, r.y + 49, r.sub, 12.5, C.muted);
      p.badge(1408, r.y + 19, r.score, 'green', 68);
      p.icon('chevron', 1488, r.y + 24, 18, C.muted);
    };
    if (r.href) p.link(r.href, draw, `Apri verifica ${r.title}`);
    else draw();
  });

  save('04-ripasso.svg', p);
}

// ============================================================================
// 05 — SESSIONE DI RIPASSO (Distraction-Free Recall Session)
// ============================================================================
{
  const p = new Page(
    'session',
    'TutorAI · Sessione di ripasso',
    'Sessione focalizzata senza aiuti con selettore modalità Scelta rapida | Risposta scritta, diagramma P1/P2 con 0 messaggi e opzioni A/B/C.'
  );

  // Top Focus Header
  p.link(
    '04-ripasso.svg',
    () => {
      p.rect(48, 26, 108, 40, C.panel, 10, C.line);
      p.icon('back', 62, 36, 18, C.muted);
      p.text(92, 51, 'Esci', 14, C.ink, 550);
    },
    'Esci dalla sessione'
  );
  p.text(
    800,
    52,
    'Sistemi Distribuiti  ·  1.2 Relazione happened-before',
    15,
    C.muted,
    600,
    'text-anchor="middle"'
  );
  p.rect(1396, 26, 156, 40, C.greenBg, 20, '#2f6354');
  p.icon('lock', 1414, 36, 18, C.green);
  p.text(1442, 51, 'Senza aiuti', 13.5, C.green, 650);
  p.line(48, 84, 1552, 84);

  // Progress bar 1/3 + Mode Pill (Scelta rapida | Risposta scritta)
  p.eyebrow(312, 134, 'DOMANDA 1 DI 3', C.blue);
  for (let i = 0; i < 3; i++) {
    p.rect(312 + i * 184, 150, 172, 6, i === 0 ? C.blue : '#273246', 3);
  }

  // Sleek mode pill: Scelta rapida | Risposta scritta
  p.rect(968, 118, 320, 40, '#141a26', 12, C.line);
  p.rect(972, 122, 154, 32, '#25385e', 9);
  p.text(1049, 143, 'Scelta rapida', 13, C.white, 650, 'text-anchor="middle"');
  p.text(1206, 143, 'Risposta scritta', 13, C.muted, 500, 'text-anchor="middle"');

  p.text(312, 218, 'I timestamp bastano per stabilire causalità?', 30, C.ink, 650);
  p.text(312, 252, 'Osserva gli eventi A e B registrati sui processi P₁ e P₂:', 16, C.muted);

  // Clear P1/P2 visual diagram with explicit "0 messaggi" gap
  p.rect(312, 276, 976, 196, C.panel, 16, C.line);
  p.text(348, 330, 'P₁', 16, C.ink, 650);
  p.text(348, 424, 'P₂', 16, C.ink, 650);
  p.line(396, 324, 1236, 324, '#4c5c78', 2.2);
  p.line(396, 418, 1236, 418, '#4c5c78', 2.2);

  // Gap highlight between P1 and P2 showing 0 messages
  p.rect(688, 353, 224, 36, '#121824', 18, '#384764');
  p.text(800, 376, '0 messaggi scambiati', 13, C.amber, 650, 'text-anchor="middle"');

  p.circle(560, 324, 15, C.blue);
  p.text(560, 329, 'A', 13, '#0e172a', 700, 'text-anchor="middle"');
  p.rect(586, 308, 92, 30, '#1e2c47', 8);
  p.text(632, 328, 'C(A) = 3', 14, C.blue, 650, 'text-anchor="middle"');

  p.circle(1010, 418, 15, '#dce4f5');
  p.text(1010, 423, 'B', 13, '#0e172a', 700, 'text-anchor="middle"');
  p.rect(1036, 402, 92, 30, '#222b3d', 8);
  p.text(1082, 422, 'C(B) = 5', 14, '#dce4f5', 650, 'text-anchor="middle"');

  p.text(312, 518, 'Quale affermazione è corretta?', 18.5, C.ink, 600);

  const choices = [
    ['A', 'A ha causato B, perché il suo timestamp è minore (3 < 5).', false],
    ['B', 'A e B sono concorrenti: non esiste una relazione causale tra loro.', true],
    ['C', 'B ha causato A, perché il suo timestamp è maggiore (5 > 3).', false],
  ];
  choices.forEach(([letter, label, on], i) => {
    const y = 540 + i * 82;
    p.rect(
      312,
      y,
      976,
      66,
      on ? '#213252' : '#161c27',
      13,
      on ? C.blue : C.line
    );
    p.circle(348, y + 33, 12, on ? C.blue : 'none', on ? C.blue : '#596780', 1.8);
    p.text(
      348,
      y + 38,
      letter,
      13,
      on ? '#0e172a' : C.muted,
      700,
      'text-anchor="middle"'
    );
    p.text(384, y + 39, label, 16.5, C.ink, on ? 600 : 400);
  });

  // Clean bottom action bar with ZERO disclaimer text
  p.line(312, 814, 1288, 814);
  p.badge(312, 844, 'Risposta B selezionata', 'blue', 184);
  p.button(1064, 836, 224, 'Conferma →', {
    primary: true,
    href: '10-esito-ripasso.svg',
    h: 48,
  });

  save('05-sessione-ripasso.svg', p);
}

// ============================================================================
// 06 — ATTIVITÀ E PROFILO (Social-Learning Profile + Chronological Feed + Course Cards)
// ============================================================================
{
  const p = new Page(
    'activity',
    'TutorAI · Profilo e attività',
    'Profilo studente con metriche sintetiche, cronologia filtrabile e riepilogo visivo per corso.'
  );
  p.rail('profile');

  // Social-learning Profile Banner
  p.rect(144, 44, 1400, 128, `url(#${p.id}-hero-grad)`, 20, '#33476b');
  p.circle(208, 108, 36, '#273b61', C.blue, 2);
  p.text(208, 119, 'L', 28, C.white, 650, 'text-anchor="middle"');
  p.text(264, 98, 'Luca', 28, C.white, 650);
  p.badge(264, 112, 'Ingegneria Informatica', 'blue', 176);
  p.badge(450, 112, '3 corsi attivi', 'muted', 116);

  // Stat blocks on right of profile banner
  const stats = [
    { x: 960, val: '3 giorni', lbl: 'SERIE ATTIVA', col: C.amber },
    { x: 1150, val: '4 / 9', lbl: 'UNITÀ CONCLUSE', col: C.blue },
    { x: 1340, val: '4 prove', lbl: 'SENZA AIUTI', col: C.green },
  ];
  stats.forEach((s) => {
    p.rect(s.x, 66, 172, 84, '#111827', 14, '#2a3956');
    p.text(s.x + 86, 104, s.val, 22, s.col, 700, 'text-anchor="middle"');
    p.text(s.x + 86, 130, s.lbl, 10.5, C.muted, 650, 'text-anchor="middle" letter-spacing="1.2"');
  });

  // Filter Bar (Tutto | Studio | Appunti | Verifiche)
  p.text(144, 228, 'Cronologia attività', 24, C.ink, 650);
  p.rect(412, 198, 376, 42, '#141a26', 11, C.line);
  p.rect(416, 202, 84, 34, '#25385e', 8);
  p.text(458, 224, 'Tutto', 13.5, C.white, 650, 'text-anchor="middle"');
  p.text(544, 224, 'Studio', 13.5, C.muted, 500, 'text-anchor="middle"');
  p.text(634, 224, 'Appunti', 13.5, C.muted, 500, 'text-anchor="middle"');
  p.text(732, 224, 'Verifiche', 13.5, C.muted, 500, 'text-anchor="middle"');

  p.button(820, 198, 204, 'Tutti i corsi', { icon: 'grid', h: 42 });
  p.icon('down', 992, 210, 17, C.muted);

  // Left Column: Clean Chronological Feed
  const drawEvent = (e) => {
    p.rect(144, e.y, 880, 96, C.panel, 14, C.line);
    p.text(172, e.y + 54, e.time, 13.5, C.muted, 600);
    p.rect(
      236,
      e.y + 22,
      52,
      52,
      e.color === 'green' ? C.greenBg : e.color === 'blue' ? C.blueBg : '#222b3c',
      13
    );
    p.icon(
      e.icon,
      251,
      e.y + 37,
      22,
      e.color === 'green' ? C.green : e.color === 'blue' ? C.blue : C.amber
    );
    p.text(308, e.y + 42, e.title, 18, C.ink, 600);
    p.text(308, e.y + 68, e.sub, 13.5, C.muted);
    p.badge(640, e.y + 34, e.kind, e.color, 186);
    p.link(
      e.href,
      () => {
        p.text(972, e.y + 53, e.action, 14, C.blue, 600, 'text-anchor="end"');
        p.icon('arrow', 984, e.y + 38, 19, C.blue);
      },
      `${e.action} ${e.title}`
    );
  };

  p.eyebrow(144, 282, 'OGGI · 17 NOVEMBRE', C.blue);
  drawEvent({
    y: 300,
    time: '19:59',
    icon: 'book',
    title: '1.3 Orologi logici di Lamport',
    sub: 'Sistemi Distribuiti · Slide p. 12',
    kind: 'Studio in corso',
    color: 'blue',
    action: 'Riprendi',
    href: '03-studio.svg',
  });
  drawEvent({
    y: 412,
    time: '19:48',
    icon: 'note',
    title: '1.3 Orologi logici di Lamport',
    sub: 'Sistemi Distribuiti · 3 sezioni',
    kind: 'Appunti v2 salvati',
    color: 'muted',
    action: 'Apri',
    href: '09-appunti-consolidati.svg',
  });

  p.eyebrow(144, 548, '15 NOVEMBRE');
  drawEvent({
    y: 566,
    time: '18:32',
    icon: 'shield',
    title: '1.2 Relazione happened-before',
    sub: 'Sistemi Distribuiti · 2/2 corrette',
    kind: 'Verifica senza aiuti',
    color: 'green',
    action: 'Esito',
    href: '11-verifica-storica.svg',
  });

  p.eyebrow(144, 702, '14 NOVEMBRE');
  drawEvent({
    y: 720,
    time: '17:10',
    icon: 'check',
    title: '1.1 Modello di sistema asincrono',
    sub: 'Sistemi Distribuiti · 3/3 corrette',
    kind: 'Unità conclusa',
    color: 'green',
    action: 'Corso',
    href: '02-corso.svg',
  });

  // Right Column: Compact Visual Course Summary Cards (ZERO prose essay!)
  p.text(1064, 228, 'Riepilogo corsi', 22, C.ink, 650);
  const summaries = [
    {
      y: 256,
      icon: 'nodes',
      name: 'Sistemi Distribuiti',
      done: 2,
      total: 4,
      noteBadge: 'Appunti v2',
      verBadge: '2 prove · 100%',
      col: C.blue,
      href: '02-corso.svg',
    },
    {
      y: 444,
      icon: 'wave',
      name: 'Algoritmi e strutture dati',
      done: 1,
      total: 3,
      noteBadge: 'Appunti v1',
      verBadge: '1 prova · 67%',
      col: '#b8aef7',
      href: null,
    },
    {
      y: 632,
      icon: 'shield',
      name: 'Crittografia applicata',
      done: 1,
      total: 2,
      noteBadge: 'Appunti v1',
      verBadge: '1 prova · 100%',
      col: C.green,
      href: null,
    },
  ];
  summaries.forEach((s) => {
    const draw = () => {
      p.rect(1064, s.y, 480, 168, C.panel, 16, C.line);
      p.rect(1090, s.y + 24, 44, 44, '#202b40', 12);
      p.icon(s.icon, 1101, s.y + 35, 22, s.col);
      p.text(1150, s.y + 44, s.name, 18, C.ink, 650);
      p.text(1150, s.y + 66, `${s.done} di ${s.total} unità completate`, 13, C.muted);
      p.ring(1494, s.y + 46, 22, Math.round((s.done / s.total) * 100), s.col);
      p.progress(1090, s.y + 92, 428, s.done, s.total, s.col);
      p.badge(1090, s.y + 116, s.noteBadge, 'muted', 118);
      p.badge(1220, s.y + 116, s.verBadge, 'green', 138);
    };
    if (s.href) p.link(s.href, draw, s.name);
    else draw();
  });

  save('06-attivita.svg', p);
}

// Helper for 07, 08, 09 preserving updated study frame + micro-grid right canvas
function studyState(id, title, description) {
  const p = new Page(id, title, description);
  p.parts = [...studyFrameParts];
  const rx = 832,
    ly = 92,
    rw = 744,
    ph = 880;
  p.rect(rx, ly, rw, ph, '#161b26', 18, C.line);
  p.rect(rx + 1, ly + 72, rw - 2, 736, `url(#${p.id}-note-grid)`);
  p.line(rx, 164, rx + rw, 164);
  p.line(rx, 900, rx + rw, 900);
  return p;
}

// ============================================================================
// 07 — REVISIONE DEGLI APPUNTI (Anchored Question on Student's Note)
// ============================================================================
{
  const p = studyState(
    'review',
    'TutorAI · Revisione degli appunti',
    'Domanda del tutor ancorata direttamente al dubbio evidenziato negli appunti dello studente.'
  );
  p.icon('review', 858, 117, 21, C.blue);
  p.text(890, 134, 'Revisione appunti', 15.5, C.ink, 650);
  p.badge(1418, 114, '1 punto selezionato', 'blue', 138);

  p.text(868, 214, 'Orologi logici di Lamport', 26, C.ink, 650);

  // Highlighted student doubt box
  p.rect(868, 242, 672, 132, '#212d47', 13, '#5472ae');
  p.rect(868, 242, 4, 132, C.amber, 2);
  p.badge(892, 258, 'DUBBIO NELLA TUA BOZZA', 'amber', 194);
  p.lines(
    892,
    306,
    [
      'Come riconosco due eventi concorrenti?',
      'Un timestamp più piccolo basta per dire che un evento ha causato l’altro?',
    ],
    15.5,
    '#e3ecff',
    500,
    26
  );

  // Connector line anchoring the AI question card to the doubt
  p.line(892, 374, 892, 404, C.blue, 2);
  p.circle(892, 374, 4, C.blue);

  // Tutor Question Card
  p.rect(868, 404, 672, 392, '#141c2b', 16, '#425b8c');
  p.eyebrow(896, 438, 'DOMANDA SUL TUO PUNTO', C.blue);
  p.badge(1414, 418, 'Passaggio 1 / 1', 'muted', 104);
  p.lines(
    896,
    470,
    [
      'Considera A e B su processi diversi, senza alcuna catena',
      'di messaggi fra i due eventi. Che cosa puoi dedurre',
      'dal solo fatto che C(A) < C(B)?',
    ],
    16.5,
    C.white,
    600,
    25
  );

  p.text(896, 560, 'La tua risposta', 13, C.muted, 600);
  p.rect(896, 574, 616, 132, '#0f1520', 11, C.blue);
  p.lines(
    916,
    606,
    [
      'Il timestamp più piccolo non basta a provare causalità.',
      'Serve una catena di eventi e messaggi da A a B.',
      'Senza un legame causale, gli eventi sono concorrenti (A ∥ B).',
    ],
    15,
    '#dce5f7',
    400,
    27
  );
  p.line(1328, 646, 1328, 666, C.blue, 2);

  p.button(896, 728, 178, 'Chiedi indizio', { icon: 'help', h: 40 });
  p.badge(1090, 734, 'Fonte: Slide p. 12', 'muted', 148);

  // Clean bottom bar
  p.button(856, 914, 196, '← Torna alla bozza', {
    href: '03-studio.svg',
    quiet: true,
    h: 42,
  });
  p.button(1284, 914, 268, 'Confronta proposta →', {
    primary: true,
    href: '08-proposta-modifica.svg',
    h: 42,
  });

  save('07-revisione-appunti.svg', p);
}

// ============================================================================
// 08 — PROPOSTA DI MODIFICA (Inline Diff Merge Proposal)
// ============================================================================
{
  const p = studyState(
    'proposal',
    'TutorAI · Proposta di modifica',
    'Confronto diff inline tra il dubbio originale e la formulazione consolidata, con riferimento alla slide e scelta dello studente.'
  );
  p.icon('review', 858, 117, 21, C.blue);
  p.text(890, 134, 'Proposta di integrazione', 15.5, C.ink, 650);
  p.badge(1426, 114, 'Diff · v1 → v2', 'blue', 130);

  p.text(868, 214, 'Integra il chiarimento negli appunti', 25, C.ink, 650);

  // Red Removed Block
  p.rect(868, 240, 672, 146, C.redBg, 13, '#6e3b47');
  p.text(892, 270, '−', 20, C.red, 700);
  p.eyebrow(916, 266, 'TESTO ATTUALE (V1)', C.red);
  p.text(892, 300, 'Dubbio da chiarire', 16.5, '#f0c6cb', 600, 'text-decoration="line-through"');
  p.lines(
    892,
    328,
    [
      'Come riconosco due eventi concorrenti?',
      'Un timestamp più piccolo basta per dire che un evento ha causato l’altro?',
    ],
    15,
    '#f0c6cb',
    400,
    24,
    'text-decoration="line-through"'
  );

  // Green Added Block
  p.rect(868, 404, 672, 168, C.greenBg, 13, '#2f6e59');
  p.text(892, 434, '+', 20, C.green, 700);
  p.eyebrow(916, 430, 'INTEGRAZIONE PROPOSTA (V2)', C.green);
  p.text(892, 464, 'Timestamp e causalità', 17, '#d9f5e8', 650);
  p.lines(
    892,
    494,
    [
      'Un timestamp minore non prova che A abbia causato B.',
      'Serve una catena causale di eventi o messaggi (A → B).',
      'Se manca in entrambe le direzioni, gli eventi sono concorrenti (A ∥ B).',
    ],
    15.5,
    '#d9f5e8',
    400,
    26
  );

  // Concise Reason & Source Box
  p.rect(868, 592, 672, 108, '#141c2b', 13, C.line);
  p.text(892, 624, 'Perché', 15, C.ink, 650);
  p.text(
    892,
    650,
    'Riprende la tua risposta sulla concorrenza A ∥ B e sostituisce il dubbio aperto.',
    14.5,
    C.muted
  );
  p.icon('file', 892, 666, 17, C.blue);
  p.text(916, 680, 'Fonte: Slide delle lezioni · pagina 12', 13, C.blue, 600);

  // 3 explicit student control buttons
  p.button(868, 728, 204, 'Mantieni originale', { href: '03-studio.svg', h: 46 });
  p.button(1086, 728, 176, 'Modifica testo', { icon: 'edit', h: 46 });
  p.button(1276, 728, 264, 'Accetta in v2 →', {
    primary: true,
    icon: 'check',
    href: '09-appunti-consolidati.svg',
    h: 46,
  });

  // Clean bottom bar
  p.button(856, 914, 210, '← Torna alla domanda', {
    href: '07-revisione-appunti.svg',
    quiet: true,
    h: 42,
  });

  save('08-proposta-modifica.svg', p);
}

// ============================================================================
// 09 — APPUNTI CONSOLIDATI (v2 Updated Micro-Grid Notebook + Floating Dock)
// ============================================================================
{
  const p = studyState(
    'consolidated',
    'TutorAI · Appunti consolidati v2',
    'Foglio appunti aggiornato alla versione v2 su griglia stile Obsidian con barra di formattazione flottante e completamento unità.'
  );
  p.icon('note', 858, 117, 20, C.green);
  p.text(888, 134, 'I miei appunti', 15.5, C.ink, 650);
  p.circle(1022, 129, 4, C.green);
  p.text(1034, 134, 'Consolidato · v2', 13, C.green, 600);
  p.button(1428, 114, 124, 'Versioni', { icon: 'clock', h: 36 });

  p.text(876, 218, 'Orologi logici di Lamport', 28, C.ink, 650);

  p.text(876, 268, '#', 16, C.blue, 700);
  p.text(896, 268, 'Perché servono', 18.5, C.ink, 600);
  p.lines(
    876,
    302,
    [
      'Ogni nodo ha il proprio clock fisico locale. Senza sincronizzazione',
      'perfetta, usiamo un contatore logico monotono per gli eventi.',
    ],
    16,
    '#cbd3e3',
    400,
    27
  );

  p.text(876, 392, '#', 16, C.blue, 700);
  p.text(896, 392, 'Regola di aggiornamento', 18.5, C.ink, 600);
  p.lines(
    876,
    426,
    [
      'Alla ricezione di un messaggio (tₘ), il nodo prende il massimo',
      'tra il proprio contatore e tₘ, poi incrementa di 1:',
    ],
    16,
    '#cbd3e3',
    400,
    27
  );
  p.rect(876, 472, 656, 54, '#101520', 10, '#2b3850');
  p.text(1204, 506, 'Cⱼ = max(Cⱼ, tₘ) + 1', 21, '#dee7ff', 600, 'text-anchor="middle"');

  // Consolidated v2 section highlighted cleanly
  p.rect(876, 556, 656, 152, '#182c29', 12, '#2f6e59');
  p.rect(876, 556, 4, 152, C.green, 2);
  p.text(900, 588, '#  Timestamp e causalità', 17.5, C.green, 650);
  p.badge(1412, 568, 'Integrato in v2', 'green', 106);
  p.lines(
    900,
    620,
    [
      'Un timestamp minore non prova che A abbia causato B.',
      'Serve una catena causale di eventi o messaggi (A → B).',
      'Se manca in entrambe le direzioni, gli eventi sono concorrenti (A ∥ B).',
    ],
    15.5,
    '#dcf5e9',
    400,
    26
  );

  // Centered Floating Pill Formatting Dock at bottom of notes canvas
  p.floatingFormatDock(1204, 836);

  // Single clear bottom action
  p.badge(860, 920, '✓ 3 sezioni consolidate', 'green', 176);
  p.button(1296, 914, 256, 'Termina lo studio →', {
    primary: true,
    icon: 'check',
    href: '02-corso.svg',
    h: 42,
  });

  save('09-appunti-consolidati.svg', p);
}

// ============================================================================
// 10 & 11 — ESITO DEL RIPASSO & VERIFICA STORICA
// ============================================================================
function recallResult(historical) {
  const p = new Page(
    historical ? 'past-result' : 'result',
    historical ? 'TutorAI · Verifica del 15 novembre' : 'TutorAI · Esito del ripasso',
    historical
      ? 'Dettaglio della verifica senza aiuti del 15 novembre alle 18:32 con spiegazione e fonte.'
      : 'Esito della sessione di ripasso con spiegazione, riferimento alla slide e prossimo passo.'
  );
  p.rail('recall');

  p.link(
    historical ? '06-attivita.svg' : '04-ripasso.svg',
    () => {
      p.icon('back', 144, 42, 19, C.muted);
      p.text(
        172,
        58,
        historical ? 'Cronologia attività' : 'Ripasso',
        14,
        C.muted,
        550
      );
    },
    historical ? 'Torna alla cronologia' : 'Torna a Ripasso'
  );

  p.eyebrow(
    144,
    108,
    historical ? 'VERIFICA ARCHIVIATA · 15 NOVEMBRE, 18:32' : 'SESSIONE CONCLUSA · 17 NOVEMBRE',
    C.blue
  );
  p.text(
    144,
    154,
    historical ? '1.2 Relazione happened-before' : 'Esito della sessione',
    34,
    C.ink,
    650
  );
  p.badge(144, 174, historical ? '2 / 2 corrette' : '2 / 3 corrette', 'green', 124);
  p.badge(280, 174, 'Senza aiuti', 'blue', 112);
  p.badge(404, 174, 'Sistemi Distribuiti · Unità 1.2', 'muted', 228);

  const states = historical
    ? [
        ['1', 'Corretta', 'green', true],
        ['2', 'Corretta', 'green', false],
      ]
    : [
        ['1', 'Corretta', 'green', true],
        ['2', 'Corretta', 'green', false],
        ['3', 'Da rivedere', 'amber', false],
      ];

  states.forEach(([num, label, kind, on], i) => {
    const x = 144 + i * 234;
    p.rect(
      x,
      226,
      218,
      44,
      on ? '#223354' : C.panel,
      11,
      on ? C.blue : C.line
    );
    p.circle(
      x + 24,
      248,
      9,
      kind === 'green' ? C.greenBg : C.amberBg
    );
    p.text(
      x + 24,
      252,
      kind === 'green' ? '✓' : '!',
      11,
      kind === 'green' ? C.green : C.amber,
      700,
      'text-anchor="middle"'
    );
    p.text(
      x + 44,
      253,
      `Domanda ${num} · ${label}`,
      13.5,
      on ? C.white : C.muted,
      on ? 650 : 500
    );
  });

  // Main Question Breakdown Card
  p.rect(144, 292, 900, 520, C.panel, 18, C.line);
  p.badge(176, 322, '✓ Risposta corretta', 'green', 164);
  p.text(176, 384, 'I timestamp bastano per stabilire causalità?', 24, C.ink, 650);

  p.text(176, 426, 'La tua risposta (Scelta B)', 13, C.muted, 600);
  p.rect(176, 440, 836, 76, '#1a312c', 12, '#2f6655');
  p.text(
    202,
    484,
    'A e B sono concorrenti (A ∥ B): non esiste una relazione causale tra loro.',
    17,
    '#daf4e8',
    600
  );

  p.text(176, 560, 'Perché', 17.5, C.ink, 650);
  p.lines(
    176,
    594,
    [
      'C(A) < C(B) da solo non dimostra A → B.',
      'Il sistema contiene solo i processi P₁ e P₂ con 0 messaggi scambiati:',
      'non esiste alcuna catena causale, né diretta né indiretta, tra i due eventi.',
    ],
    16,
    '#c8d2e4',
    400,
    28
  );

  p.line(176, 706, 1012, 706);
  p.rect(176, 728, 336, 46, '#141d2f', 11, '#31456b');
  p.icon('file', 194, 741, 20, C.blue);
  p.text(224, 756, 'Fonte: Slide delle lezioni · pagina 12', 14, C.blue, 600);

  // Right Summary Card
  p.rect(1080, 292, 464, 380, '#182234', 18, C.line);
  p.eyebrow(
    1112,
    330,
    historical ? 'RIEPILOGO VERIFICA' : 'PROSSIMO PASSO',
    C.blue
  );
  p.ring(
    1476,
    356,
    30,
    historical ? 100 : 67,
    historical ? C.green : C.blue,
    historical ? '2/2' : '2/3'
  );
  p.text(
    1112,
    368,
    historical ? 'Padronanza confermata' : 'Rivedi le catene causali',
    22,
    C.ink,
    650
  );
  p.text(
    1112,
    398,
    historical ? '15 novembre · ore 18:32' : 'Domanda 3 da consolidare nello Studio',
    14,
    C.muted
  );

  // Mini breakdown rows inside right card
  const items = historical
    ? [
        ['1 · Concorrenza A ∥ B', 'Corretta', 'green'],
        ['2 · Incremento locale Cᵢ', 'Corretta', 'green'],
      ]
    : [
        ['1 · Concorrenza A ∥ B', 'Corretta', 'green'],
        ['2 · Incremento locale Cᵢ', 'Corretta', 'green'],
        ['3 · Catene di messaggi', 'Da rivedere', 'amber'],
      ];
  items.forEach(([lbl, st, k], idx) => {
    const y = 432 + idx * 48;
    p.rect(1112, y, 400, 40, '#121928', 9);
    p.text(1128, y + 25, lbl, 13.5, C.ink, 550);
    p.badge(1396, y + 6, st, k, 108);
  });

  if (historical) {
    p.button(1112, 596, 400, 'Vai al ripasso di oggi →', {
      primary: true,
      icon: 'recall',
      href: '04-ripasso.svg',
      h: 46,
    });
  } else {
    p.button(1112, 596, 400, 'Apri passaggio nello Studio →', {
      primary: true,
      icon: 'book',
      href: '03-studio.svg',
      h: 46,
    });
  }

  p.link(
    '06-attivita.svg',
    () => {
      p.text(1112, 714, 'Vedi tutta la cronologia attività', 14, C.blue, 600);
      p.icon('arrow', 1344, 698, 20, C.blue);
    },
    'Vai a Profilo e attività'
  );

  return p;
}

save('10-esito-ripasso.svg', recallResult(false));
save('11-verifica-storica.svg', recallResult(true));

// ============================================================================
// 00 — BOARDS (Panoramica, Flusso Studio, Flusso Ripasso)
// ============================================================================
function makeBoard(file, title, subtitle, entries) {
  const boardW = 2200,
    boardH = 160 + Math.ceil(entries.length / 2) * 705;
  const board = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${boardW}" height="${boardH}" viewBox="0 0 ${boardW} ${boardH}"><title>${esc(
      title
    )}</title><rect width="${boardW}" height="${boardH}" fill="#0a0d14"/><style>text{font-family:'Segoe UI',Inter,system-ui,sans-serif}</style><text x="48" y="58" fill="#f2f5fc" font-size="30" font-weight="650">${esc(
      title
    )}</text><text x="48" y="91" fill="#a6b1c6" font-size="17">${esc(subtitle)}</text>`,
  ];
  entries.forEach(([filename, label], i) => {
    const { p } = pages.find((v) => v.file === filename);
    const x = 48 + (i % 2) * 1080,
      y = 160 + Math.floor(i / 2) * 705;
    board.push(
      `<text x="${x}" y="${
        y - 17
      }" fill="#d9e0f0" font-size="18" font-weight="600">${esc(label)}</text>`
    );
    board.push(
      p
        .svg()
        .replace('<svg ', `<svg x="${x}" y="${y}" `)
        .replace('width="1600" height="1000"', 'width="1040" height="650"')
    );
  });
  board.push('</svg>');
  fs.writeFileSync(path.join(out, file), board.join('\n'));
}

const mainEntries = [
  ['01-corsi.svg', '01 / Corsi (Home)'],
  ['02-corso.svg', '02 / Dettaglio Corso'],
  ['03-studio.svg', '03 / Studio e Appunti su Griglia'],
  ['04-ripasso.svg', '04 / Ripasso e Padronanza'],
  ['05-sessione-ripasso.svg', '05 / Sessione Senza Aiuti'],
  ['06-attivita.svg', '06 / Profilo e Attività'],
];

makeBoard(
  '00-panoramica.svg',
  'TutorAI · Panoramica Interfaccia',
  'Architettura a contesti distinti · Revisione Argon High',
  mainEntries
);
makeBoard(
  '00-flusso-studio.svg',
  'TutorAI · Flusso Studio e Revisione Appunti',
  'Appunti su griglia → Domanda sul dubbio → Diff inline → Consolidamento v2 · Revisione Argon High',
  [
    ['03-studio.svg', '1 / Studio e scrittura su griglia'],
    ['07-revisione-appunti.svg', '2 / Domanda ancorata al dubbio'],
    ['08-proposta-modifica.svg', '3 / Confronto diff inline'],
    ['09-appunti-consolidati.svg', '4 / Appunti consolidati v2'],
  ]
);
makeBoard(
  '00-flusso-ripasso.svg',
  'TutorAI · Flusso Ripasso e Verifiche',
  'Lobby ripasso → Sessione senza aiuti → Esito con fonte → Verifica storica · Revisione Argon High',
  [
    ['04-ripasso.svg', '1 / Lobby ripasso e padronanza'],
    ['05-sessione-ripasso.svg', '2 / Sessione focalizzata senza aiuti'],
    ['10-esito-ripasso.svg', '3 / Esito della sessione'],
    ['11-verifica-storica.svg', '4 / Verifica storica del 15 novembre'],
  ]
);

console.log(`Generated ${pages.length} editable mockups and 3 boards in ${out}`);
