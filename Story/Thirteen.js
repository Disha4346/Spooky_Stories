// Thirteen.js — Interactive horror story engine
// Story: "Thirteen" — protagonist placeholder X replaced by user name
// Entity: Damien (fixed, not personalized)

// ---------------- CONFIG ----------------
const TYPE_SPEED = 32;        // ms per char — slightly slower for dread
const LINE_DELAY = 550;
const JUMPSCARE_MIN = 9000;
const JUMPSCARE_MAX = 22000;

// ---------------- STORY ----------------
// "X" is the protagonist placeholder — replaced at runtime with userName.
// "Damien" is the entity — never replaced.
const templateLines = [

  // -- NIGHT ONE --
  "On the first night, X dreamed of a corridor that did not end.",
  "It was too narrow for comfort.",
  "The walls were damp and pulsing — as if something enormous breathed behind them.",
  "At the far end stood a wooden door with X's name carved into it.",
  "Not scratched. Not painted.",
  "Carved deep enough to split the grain.",
  "Behind her, a voice whispered:",
  "\"Thirteen days.\"",
  "She spun around.",
  "No one.",
  "But the air grew colder.",

  // -- DAY TWO --
  "DAY TWO",
  "On Day Two, she learned his name.",
  "He didn't walk toward her.",
  "He assembled himself — ribs first, unfolding from shadow.",
  "Then fingers bending the wrong way.",
  "Then a smile stretching wider than bone should allow.",
  "\"Damien,\" he said.",
  "X tried to wake up.",
  "Her eyes opened.",
  "She was still in the corridor.",
  "\"You don't control this,\" he murmured, voice layered like two mouths speaking through one throat.",
  "\"I do.\"",

  // -- DAY FOUR --
  "DAY FOUR",
  "By Day Four, the dreams bled into daylight.",
  "She would blink — and see the corridor overlaying her bedroom.",
  "Blink — and the carved door stood behind her wardrobe.",
  "Blink — and Damien's reflection stood where her own should be.",
  "Her mirror began lagging half a second behind her movements.",
  "Her smile lingered too long.",
  "Her eyes darkened at the edges.",
  "X tried grounding exercises.",
  "Cold water.",
  "Slapping her own cheeks.",
  "Nothing stopped it.",

  // -- DAY SIX --
  "DAY SIX",
  "She woke at 3:13 a.m. standing in her room's corner.",
  "Her body felt used.",
  "Her phone contained a voice recording she did not remember making.",
  "Her own voice — whispering:",
  "\"Almost ready.\"",

  // -- DAY EIGHT --
  "DAY EIGHT",
  "The corridor walls filled with mirrors.",
  "Every reflection showed X's face.",
  "But the eyes were wrong.",
  "Black.",
  "Depthless.",
  "Damien walked behind each reflection — but never beside her.",
  "\"You're hollowing,\" he told her calmly.",
  "\"Hollow things are easy to fill.\"",
  "X screamed at him.",
  "He only smiled.",

  // -- DAY TEN --
  "DAY TEN",
  "She scratched at her skin because it felt tight.",
  "As if something underneath wanted out.",
  "Her laugh started sounding unfamiliar.",
  "Softer.",
  "Lower.",
  "Sometimes layered.",
  "She began losing time in chunks.",
  "Hours vanished.",
  "Messages sent she didn't write.",
  "Plans canceled she didn't remember canceling.",
  "Friends asked if she was okay.",
  "She said yes.",
  "Her reflection smiled too widely.",

  // -- DAY TWELVE --
  "DAY TWELVE",
  "The carved door finally opened.",
  "Inside was not a room.",
  "It was darkness so thick it looked solid.",
  "Damien stood at its threshold.",
  "\"You've done well,\" he said.",
  "X's voice trembled. \"Done what?\"",
  "\"Survived.\"",
  "The corridor began collapsing inward — walls folding like ribs around a heart.",
  "She felt herself dissolving.",
  "Memories slipping.",
  "Her name fading at the edges.",
  "He stepped closer.",
  "\"Tomorrow,\" he whispered, almost tenderly.",
  "\"There will be no more fear.\"",

  // -- DAY THIRTEEN --
  "DAY THIRTEEN",
  "She woke up in her bed.",
  "No corridor.",
  "No whispers.",
  "Silence.",
  "Her breathing was steady.",
  "Her mind was clear.",
  "Relief flooded her.",
  "It was over.",
  "She stood and walked to the mirror slowly.",
  "Looked at herself.",
  "Normal.",
  "Completely normal.",
  "Her reflection did not lag.",
  "Her smile matched perfectly.",
  "She exhaled.",
  "\"I won,\" she whispered.",
  "The reflection tilted its head.",
  "Half a second after she did.",
  "Her stomach dropped.",
  "And then—",
  "The reflection smiled.",
  "X wasn't smiling.",
  "Not yet.",
  "It widened slowly.",
  "Deliberately.",
  "Sinister.",
  "Her body felt… calm.",
  "Too calm.",

  // -- THE MEMORY --
  "A memory surfaced.",
  "Not from the past thirteen days.",
  "From before.",
  "A night long ago.",
  "Sitting alone on her bedroom floor.",
  "Lights off.",
  "Phone discarded.",
  "Tears dried.",
  "Staring into the dark and whispering:",
  "\"I don't believe in them anymore.\"",
  "Her voice had been steady.",
  "Cold.",
  "\"If there's anything listening… take it.\"",
  "A pause.",
  "Then softer:",
  "\"Take what makes me care.\"",

  // -- REVELATION --
  "The memory ended.",
  "Back in the mirror, her reflection leaned closer.",
  "And now X remembered everything.",
  "Damien had never forced his way in.",
  "He had been invited.",
  "Thirteen days wasn't a possession.",
  "It was integration.",
  "He hadn't hollowed her.",
  "She had offered the hollow space.",
  "Not in desperation.",
  "In decision.",
  "Because faith had not shattered in a single moment.",
  "It had eroded.",
  "Humanity had done that.",
  "Small betrayals.",
  "Calculated cruelty.",
  "Indifference dressed as normalcy.",
  "She hadn't wanted protection.",
  "She had wanted transformation.",
  "Behind X's eyes, something settled into place — like a final puzzle piece clicking in.",
  "Damien's voice surfaced.",
  "Not separate.",
  "Not echoing.",
  "Aligned.",
  "\"You're ready.\"",

  // -- UNITY --
  "She stared at the reflection.",
  "And this time—",
  "She smiled first.",
  "Slow.",
  "Measured.",
  "Intentional.",
  "The reflection mirrored perfectly.",
  "No delay.",
  "No distortion.",
  "No possession.",
  "Only unity.",
  "Her lips parted.",
  "\"We are Damien.\"",
  "The name felt natural.",
  "Comfortable.",
  "Her pulse did not race.",
  "Her hands did not tremble.",
  "There was no internal struggle.",
  "Because nothing had been taken.",
  "It had been given.",

  // -- EPILOGUE --
  "She stepped back from the mirror.",
  "Picked up her phone.",
  "Messages from friends filled the screen.",
  "Apologies. Invitations. Concern.",
  "She scrolled through them calmly.",
  "Deleted them one by one.",
  "Not out of rage.",
  "Out of clarity.",
  "Faith was a currency she no longer invested.",
  "At the doorway of her room, she paused.",
  "The corridor flickered faintly in the mirror behind her.",
  "Empty now.",
  "No carved door.",
  "No breathing walls.",
  "Because it had never been a prison.",
  "It had been construction.",
  "And the build was complete.",
  "She turned off the light.",
  "In the darkness, her smile remained.",
  "Wider than it needed to be.",
  "Not monstrous.",
  "Not dramatic.",
  "Just… certain.",
  "Damien had not taken control on Day Thirteen.",
  "She had.",
  "And she had never felt more certain about anything in her life.",
];

// ---------------- DOM refs ----------------
const stage        = document.getElementById('stage');
const storyEl      = document.getElementById('story');
const nextBtn      = document.getElementById('nextBtn');
const skipBtn      = document.getElementById('skipBtn');
const startBtn     = document.getElementById('startBtn');
const ambientBtn   = document.getElementById('ambientBtn');
const nameSoundBtn = document.getElementById('nameSoundBtn');
const overlay      = document.getElementById('overlay');
const ambientAudio = document.getElementById('ambientAudio');

let userName   = '';
let lines      = [];
let currentLine = 0;
let typing     = false;
let interruptTyping = false;
let jumpscareTimer = null;
let globalJumpscareInterval = null;

// ---------------- Utilities ----------------
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Personalize: replace "X" with the user's name.
// Damien is fixed — never replaced.
function personalize(text) {
  let out = text;
  if (userName) {
    out = out.replace(/\bX's\b/g, userName + "'s");
    out = out.replace(/\bX\b/g,   userName);
  }
  return out;
}

function prepareLines() {
  lines = templateLines.map(personalize);
}

// Safe DOM highlighter — highlights the user's name in red
function highlightNameInElement(el, name, className = 'name') {
  if (!name) return;
  const escForRegex = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(escForRegex, 'g');
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const val = node.nodeValue;
    if (re.test(val)) {
      const frag = document.createDocumentFragment();
      let lastIndex = 0;
      val.replace(re, (match, offset) => {
        if (offset > lastIndex)
          frag.appendChild(document.createTextNode(val.slice(lastIndex, offset)));
        const span = document.createElement('span');
        span.className = className;
        span.textContent = match;
        frag.appendChild(span);
        lastIndex = offset + match.length;
      });
      if (lastIndex < val.length)
        frag.appendChild(document.createTextNode(val.slice(lastIndex)));
      node.parentNode.replaceChild(frag, node);
    }
  }
}

// Highlight "Damien" in a sinister distinct colour
function highlightDamienInElement(el) {
  const re = /Damien/g;
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const val = node.nodeValue;
    if (!re.test(val)) { re.lastIndex = 0; continue; }
    re.lastIndex = 0;
    const frag = document.createDocumentFragment();
    let lastIndex = 0;
    val.replace(re, (match, offset) => {
      if (offset > lastIndex)
        frag.appendChild(document.createTextNode(val.slice(lastIndex, offset)));
      const span = document.createElement('span');
      span.className = 'entity-name';
      span.textContent = match;
      frag.appendChild(span);
      lastIndex = offset + match.length;
    });
    if (lastIndex < val.length)
      frag.appendChild(document.createTextNode(val.slice(lastIndex)));
    node.parentNode.replaceChild(frag, node);
  }
}



// ── Audio shim — delegates to the engine embedded in the HTML ──
function resumeAudio()    { if (window.__audio) window.__audio.resumeAudio(); }
function stopAllAudio()   { if (window.__audio) window.__audio.stopAllAudio(); }
function playNameSound(n) { if (window.__audio) window.__audio.playNameSound(n); }
function playDaySound()   { if (window.__audio) window.__audio.playDaySound(); }

// ════════════════════════════════════════════════════════════
// TYPEWRITER + AUTOSCROLL
// ════════════════════════════════════════════════════════════
function showLine(index) {
  return new Promise((resolve) => {
    const raw = lines[index] || '';
    const container = document.createElement('div');
    container.className = 'line';

    // Day headers — special style + bell toll
    const isDayHeader = /^DAY (TWO|FOUR|SIX|EIGHT|TEN|TWELVE|THIRTEEN)$/.test(raw.trim());
    if (isDayHeader) {
      container.classList.add('day-header');
      try { playDaySound(); } catch(e) { /* ignore */ }
    }

    storyEl.appendChild(container);

    typing = true;
    interruptTyping = false;
    let i = 0;

    function step() {
      if (interruptTyping) {
        container.textContent += raw.slice(i);
        i = raw.length;
      } else {
        container.textContent += raw.charAt(i);
        i++;
      }

      try {
        if (stage && typeof stage.scrollTo === 'function') {
          stage.scrollTo({ top: stage.scrollHeight, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
      } catch (e) {
        if (stage) stage.scrollTop = stage.scrollHeight;
        else window.scrollTo(0, document.body.scrollHeight);
      }

      if (i < raw.length) {
        const delay = TYPE_SPEED + Math.floor(Math.random() * 14 - 7);
        setTimeout(() => step(), delay);
      } else {
        if (userName) highlightNameInElement(container, userName);
        highlightDamienInElement(container);

        setTimeout(() => {
          container.classList.add('visible');
          typing = false;
          interruptTyping = false;

          // Play Damien whisper whenever his name appears
          if (/Damien/.test(raw)) {
            try { playNameSound('Damien'); } catch (e) { /* ignore */ }
          }

          resolve();
        }, LINE_DELAY);
      }
    }

    step();

    const scrollInterval = setInterval(() => {
      try {
        if (stage && typeof stage.scrollTo === 'function') {
          stage.scrollTo({ top: stage.scrollHeight, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
      } catch (e) {
        if (stage) stage.scrollTop = stage.scrollHeight;
        else window.scrollTo(0, document.body.scrollHeight);
      }
    }, 60);
    setTimeout(() => clearInterval(scrollInterval), 2000);
  });
}

// ════════════════════════════════════════════════════════════
// NEXT / FLOW
// ════════════════════════════════════════════════════════════
async function next() {
  if (currentLine >= lines.length) { endExperience(); return; }
  if (typing) { interruptTyping = true; return; }

  if (Math.random() < 0.20) {
    await triggerJumpscare();
  }
  await showLine(currentLine);
  currentLine++;
  scheduleJumpscare();
  if (currentLine >= lines.length) {
    nextBtn.textContent = 'End';
  }
}

// ════════════════════════════════════════════════════════════
// JUMPSCARE
// ════════════════════════════════════════════════════════════
const jumpscareTexts = [
  'HE IS ALREADY HERE',
  '13',
  "DON'T LOOK",
  'ALMOST READY',
  'HOLLOWING',
  'WE ARE DAMIEN',
  'THE DOOR IS OPEN',
  'THIRTEEN',
  'IT WAS NEVER A PRISON',
];

function triggerJumpscare() {
  return new Promise((resolve) => {
    interruptTyping = true;

    const gla = document.getElementById('glitch');
    if (gla) { gla.style.opacity = '1'; gla.classList.add('flicker'); }
    if (stage) stage.classList.add('shake');

    const flash = document.createElement('div');
    flash.className = 'line visible jumpscare-flash';
    flash.style.color = 'var(--accent)';
    flash.style.fontSize = '26px';
    flash.style.marginTop = '12px';
    flash.style.textAlign = 'center';
    flash.style.letterSpacing = '0.12em';

    const roll = Math.random();
    let text;
    if (roll < 0.3 && userName) {
      text = userName.toUpperCase() + '…';
    } else {
      text = jumpscareTexts[Math.floor(Math.random() * jumpscareTexts.length)];
    }
    flash.textContent = text;
    storyEl.appendChild(flash);

    const drip1 = document.getElementById('drip1');
    if (drip1) drip1.style.opacity = '1';

    const duration = 850 + Math.random() * 700;
    setTimeout(() => {
      if (gla) { gla.style.opacity = '0'; gla.classList.remove('flicker'); }
      if (stage) stage.classList.remove('shake');
      flash.style.transition = 'all 700ms ease';
      flash.style.opacity = '0';
      setTimeout(() => flash.remove(), 900);
      if (drip1) drip1.style.opacity = '0.55';
      interruptTyping = false;
      resolve();
    }, duration);
  });
}

function scheduleJumpscare() {
  if (jumpscareTimer) clearTimeout(jumpscareTimer);
  const t = JUMPSCARE_MIN + Math.random() * (JUMPSCARE_MAX - JUMPSCARE_MIN);
  jumpscareTimer = setTimeout(() => {
    if (currentLine < lines.length) {
      triggerJumpscare();
      scheduleJumpscare();
    }
  }, t);
}

// ════════════════════════════════════════════════════════════
// END
// ════════════════════════════════════════════════════════════
function endExperience() {
  const endLine = document.createElement('div');
  endLine.className = 'line visible';
  endLine.style.textAlign = 'center';
  endLine.style.marginTop = '26px';
  endLine.innerHTML = `<strong>— We Are Damien —</strong><br><small class="muted">Refresh to begin again.</small>`;
  storyEl.appendChild(endLine);
  nextBtn.disabled = true;
  skipBtn.textContent = 'Restart';
  if (ambientAudio && !ambientAudio.paused) ambientAudio.pause();
  if (jumpscareTimer) clearTimeout(jumpscareTimer);
  if (globalJumpscareInterval) clearInterval(globalJumpscareInterval);
}

// ════════════════════════════════════════════════════════════
// BIND UI
// AudioContext MUST be resumed inside a real user-gesture handler.
// ── Bind UI ──
nextBtn.addEventListener('click', () => {
  resumeAudio();
  next();
});

skipBtn.addEventListener('click', () => location.reload());

startBtn.addEventListener('click', () => {
  resumeAudio();
  userName = (document.getElementById('nameInput').value || '').trim();
  if (!userName) userName = 'X';
  prepareLines();
  if (!window.__overlayDismissed) {
    overlay.style.opacity = '0';
    overlay.setAttribute('aria-hidden', 'true');
    setTimeout(() => { if (overlay) overlay.style.display = 'none'; }, 450);
  }
  next();
  scheduleJumpscare();
  if (!globalJumpscareInterval) {
    globalJumpscareInterval = setInterval(() => {
      if (Math.random() < 0.18 && currentLine < lines.length) {
        const all = storyEl.querySelectorAll('.line.visible');
        const len = all.length;
        if (len > 0) {
          const idx  = Math.max(0, len - 1 - Math.floor(Math.random() * 20));
          const item = all[idx];
          if (item) { item.classList.add('flicker'); setTimeout(() => item.classList.remove('flicker'), 600); }
        }
      }
    }, 2400);
  }
  setTimeout(() => storyEl.focus(), 600);
});

// NOTE: ambientBtn and nameSoundBtn are handled by the HTML — do NOT rebind here.

document.addEventListener('DOMContentLoaded', () => {
  const d1 = document.getElementById('drip1');
  const d2 = document.getElementById('drip2');
  if (d1) d1.style.opacity = '0.55';
  if (d2) d2.style.opacity = '0.35';
  const nameInput = document.getElementById('nameInput');
  if (nameInput) nameInput.addEventListener('keydown', e => { if (e.key === 'Enter') startBtn.click(); });
});