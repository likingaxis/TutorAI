/* ============================================================================
   TUTORAI — ANATOMICAL ASCII KNOWLEDGE BRAIN RENDERER (knowledge-brain.js)
   Self-contained IIFE exposing window.TutorBrainAscii for profile activity card.
   36 cols x 15 rows lateral anatomical brain silhouette with live neural wave.
   ============================================================================ */
(function (window) {
  'use strict';

  var WIDTH = 36;
  var HEIGHT = 15;

  // Protected anatomical canvas (every row padded to exact 36 chars):
  // - Rounded frontal lobe (left), arched parietal crown (top), occipital overhang (right)
  // - Central sulcus, diagonal Sylvian fissure & protruding temporal lobe belly
  // - Horizontally striated cerebellum tucked under occipital lobe + angled brainstem
  var BASE_LINES = [
    '         _.--""""""""--.._          ',
    '      .-\'   .-~-.   /  ~--.._\'.     ',
    '    .\'  .-~\'  .  \'-/ .\'  .-~-. \'.   ',
    '   /  .\'  ~  \'-._  ;   .\'  ~  \'. \\  ',
    '  ;  /  .-~-.    \\/  .\'  .-~-.  \\ ; ',
    ' ;  (  .~  ~ \'-.  | /  .-\'  ~  ;  ; ',
    ' |   \\ \'-._   _.-\'~\'-._  _..-\'    | ',
    '  \\   \'-.._\'-._  .--~-. \'-._   _.\'  ',
    '   \'.  ~   \'-._\'-.  ~  \'.   _.-\'    ',
    '     \'---.._  \\ .--~-. \'. .====.    ',
    '            \\\'--..__..-\' /======\\   ',
    '             ( .:::\\    (========)  ',
    '              \\ ::::\\    \'------\'   ',
    '               \\ :::\\               ',
    '                \'---\'               '
  ];

  // 25 cortical, cerebellar, and brainstem synapse coordinates ordered across regions
  // so partial mastery (e.g. 0.44 -> 11 active nodes) lights up the entire brain evenly.
  var SYNAPSE_NODES = [
    [10, 4],  // Frontal mid gyrus
    [27, 2],  // Superior parietal lobule
    [20, 7],  // Superior temporal gyrus (below Sylvian fissure)
    [28, 5],  // Occipital cortex core
    [28, 10], // Cerebellar cortex center
    [7, 2],   // Superior frontal brow
    [21, 3],  // Postcentral / parietal junction
    [19, 9],  // Inferior temporal belly
    [31, 6],  // Occipital pole
    [4, 4],   // Prefrontal cortex
    [26, 11], // Cerebellar folia anterior
    [12, 6],  // Fronto-temporal operculum
    [29, 7],  // Lower occipital lobe
    [17, 11], // Brainstem pons relay
    [27, 3],  // Angular gyrus
    [8, 5],   // Inferior frontal gyrus
    [18, 1],  // Motor crown
    [20, 8],  // Mid temporal gyrus
    [27, 4],  // Parieto-occipital arc
    [3, 6],   // Anterior frontal pocket
    [14, 1],  // Premotor cortex
    [14, 4],  // Central frontal pocket
    [7, 8],   // Orbital frontal lobe
    [30, 11], // Cerebellar folia posterior
    [26, 8]   // Temporo-occipital notch
  ];

  // Isolated interior gyrus tissue & brainstem relay cells (never touch border lines)
  var TISSUE_CELLS = [
    [10, 1], [22, 1],
    [10, 2], [20, 2],
    [10, 3], [17, 3],
    [20, 4],
    [10, 5], [16, 5],
    [18, 6],
    [4, 7],
    [16, 11], [18, 11],
    [17, 12], [18, 12],
    [17, 13], [18, 13]
  ];

  // Pre-compute spatial wave metrics & reusable character buffers to avoid per-frame allocations
  var baseGrid = new Array(HEIGHT);
  var workGrid = new Array(HEIGHT);
  var lineBuffer = new Array(HEIGHT);
  var nodeLookup = Object.create(null);

  for (var y = 0; y < HEIGHT; y++) {
    var row = BASE_LINES[y].padEnd(WIDTH, ' ').slice(0, WIDTH);
    baseGrid[y] = row.split('');
    workGrid[y] = row.split('');
  }

  for (var i = 0; i < SYNAPSE_NODES.length; i++) {
    var nx = SYNAPSE_NODES[i][0];
    var ny = SYNAPSE_NODES[i][1];
    nodeLookup[ny * WIDTH + nx] = i;
  }

  function neuralWave(x, y, phase) {
    // Radiates smoothly upward and outward from brainstem/thalamus (17, 10.5)
    var dx = (x - 17) * 0.50;
    var dy = (y - 10.5) * 1.00;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var primary = 0.5 + 0.5 * Math.sin(dist * 0.78 - phase * 1.5);
    var secondary = 0.5 + 0.5 * Math.cos((x * 0.24 - y * 0.34) - phase * 0.9);
    return primary * 0.74 + secondary * 0.26;
  }

  function resetMutableCells() {
    for (var i = 0; i < TISSUE_CELLS.length; i++) {
      var tx = TISSUE_CELLS[i][0];
      var ty = TISSUE_CELLS[i][1];
      workGrid[ty][tx] = baseGrid[ty][tx];
    }
    for (var j = 0; j < SYNAPSE_NODES.length; j++) {
      var nx = SYNAPSE_NODES[j][0];
      var ny = SYNAPSE_NODES[j][1];
      workGrid[ny][nx] = baseGrid[ny][nx];
    }
  }

  function renderFrame(el, options) {
    if (!el) return;
    var opts = options || {};
    var rawRatio = Number(opts.masteryRatio);
    var ratio = isFinite(rawRatio) ? Math.min(1, Math.max(0, rawRatio)) : 0.44;
    var rawPhase = Number(opts.phase);
    var phase = isFinite(rawPhase) ? rawPhase : 0;

    var activeCount = Math.round(SYNAPSE_NODES.length * ratio);
    resetMutableCells();

    // 1. Subtle interior neural pathway shimmer along gyri & brainstem relay
    for (var i = 0; i < TISSUE_CELLS.length; i++) {
      var x = TISSUE_CELLS[i][0];
      var y = TISSUE_CELLS[i][1];
      if (nodeLookup[y * WIDTH + x] !== undefined) continue;
      var w = neuralWave(x, y, phase);
      var baseCh = baseGrid[y][x];
      if (y >= 11) {
        workGrid[y][x] = (w > 0.78 && ratio > 0.08) ? '+' : (w > 0.44 ? ':' : '.');
      } else if (baseCh === '~') {
        workGrid[y][x] = (w > 0.82 && ratio > 0.04) ? '+' : (w > 0.58 ? '=' : '~');
      } else if (baseCh === ' ') {
        if (w > 0.78) workGrid[y][x] = ':';
        else if (w > 0.52) workGrid[y][x] = '.';
      }
    }

    // 2. Mastery-scaled synaptic node firing
    for (var j = 0; j < SYNAPSE_NODES.length; j++) {
      var nx = SYNAPSE_NODES[j][0];
      var ny = SYNAPSE_NODES[j][1];
      var active = j < activeCount;
      var nw = neuralWave(nx, ny, phase);
      var isCerebellum = ny >= 9 && nx >= 24;
      var isBrainstem = ny >= 11 && nx < 22;

      if (active) {
        if (isCerebellum) {
          workGrid[ny][nx] = nw > 0.62 ? '*' : (nw > 0.28 ? '+' : '=');
        } else if (isBrainstem) {
          workGrid[ny][nx] = nw > 0.66 ? '*' : (nw > 0.34 ? '+' : ':');
        } else {
          workGrid[ny][nx] = nw > 0.80 ? '@' : (nw > 0.56 ? '*' : (nw > 0.30 ? 'o' : '+'));
        }
      } else if (!isCerebellum && !isBrainstem && baseGrid[ny][nx] === ' ') {
        workGrid[ny][nx] = (nw > 0.82 && ratio > 0) ? ':' : '.';
      }
    }

    for (var r = 0; r < HEIGHT; r++) {
      lineBuffer[r] = workGrid[r].join('');
    }
    el.textContent = lineBuffer.join('\n');
  }

  window.TutorBrainAscii = {
    renderFrame: renderFrame
  };
})(window);
