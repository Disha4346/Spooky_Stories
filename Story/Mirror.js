// Consolidated interactive story + autoscroll + jumpscare + name-sound (WebAudio)

// ---------------- CONFIG ----------------
const TYPE_SPEED = 30; // ms per char (keeps it slow)
const LINE_DELAY = 500;
const JUMPSCARE_MIN = 8000;
const JUMPSCARE_MAX = 20000;

// ---------------- STORY ----------------
const templateLines = [
  "Mira never trusted mirrors.",
  "Not because of ghosts or superstitions—she simply didn’t like the way reflections sometimes felt too alive.",
  "As a psychology student, she knew the mind could trick itself, but lately her mind had been doing more than tricking.",
  "It had been warning.",
  "For the past week, her bathroom mirror had been fogging up even when she hadn’t taken a shower.",
  "And every time she wiped it clean, she saw the same thing:",
  "A dark figure behind her—just for a split second.",
  "She always spun around.",
  "Always found nothing.",
  "Her roommate, Sana, laughed it off.",
  "\"You’re just stressed. That crime documentary binge is catching up.\"",
  "Mira tried to agree. But stress didn’t explain the dreams—vivid, terrifying dreams of a man with a calm smile and cold eyes walking silently behind her, hands in his pockets, humming.",
  "Always humming.",
  "A soft, repetitive tune.",
  "DAY 4 – MIDNIGHT",
  "Mira woke up sweating.",
  "The humming still echoed faintly in her ears—so faint she couldn’t tell if it came from her memory or her room.",
  "She checked her phone. 3:14 AM.",
  "She sat up. Something felt wrong, like the air had weight.",
  "As she walked to the bathroom for water, the humming grew louder.",
  "She froze.",
  "It was real.",
  "Coming from the bathroom.",
  "Her breath caught. She reached the door slowly, heart pounding, and pushed it open with her fingertips.",
  "Nothing.",
  "Just darkness. Silence.",
  "Then she saw the mirror.",
  "No fog. No reflection of a man.",
  "But there was something else—words written across the glass.",
  "\"DON'T TURN AROUND.\"",
  "Her blood ran cold.",
  "Her mind screamed to run, but her body turned automatically, reacting faster than her fear.",
  "Behind her—",
  "Nobody.",
  "The hallway was empty.",
  "The message vanished the moment she blinked, as if it had never existed.",
  "DAY 5 – MORNING",
  "She tried explaining to Sana, but all she got was a tired sigh.",
  "\"Mira, if something was wrong, I’d know. Nobody can get into our apartment.\"",
  "“We’ll put cameras if it makes you feel better.”",
  "That calmed Mira slightly.",
  "Cameras don’t hallucinate.",
  "DAY 5 – NIGHT",
  "They placed a small camera facing the bathroom doorway before going to sleep.",
  "Mira felt safer than she had all week.",
  "But at 3:00 AM, the humming returned.",
  "This time, she didn’t get up. She grabbed her phone, opened the camera app remotely… and watched.",
  "The bathroom door was closed.",
  "Everything seemed normal.",
  "Then the humming grew louder—until her phone screen glitched.",
  "Static blurred the video.",
  "Then the door opened slowly on its own.",
  "Her breath hitched. A shadow moved across the frame—tall, unmistakably human.",
  "But the figure had no face.",
  "Just a blank, smooth surface like a mannequin.",
  "She watched it glide toward her room.",
  "Mira threw the covers off and ran to Sana’s room.",
  "\"SANA! Someone’s here! Wake up!\"",
  "Lights on. Sana sat up groggy and annoyed.",
  "\"Mira—what?\"",
  "They both rushed to the living room, breathing hard.",
  "The apartment was empty.",
  "The camera showed nothing. No shadow. No movement.",
  "Only a recording of Mira screaming Sana’s name.",
  "Sana stared at her, concerned now.",
  "When she entered Sana’s room, the camera had caught a small reflection in the hallway mirror.",
  "A man. Standing right behind Mira. Smiling.",
  "DAY 6 – EVENING",
  "Sana insisted on staying home with her.",
  "They cooked, watched something light, tried to make the atmosphere normal. By midnight, Mira finally felt sleepy. Safe, even.",
  "She brushed her teeth, washed her face, and looked into the mirror.",
  "Her reflection looked exhausted—but normal.",
  "Then she noticed something strange.",
  "Her reflection blinked late.",
  "She froze.",
  "The reflection smiled before she did, lips curling up with eerie calm.",
  "The reflection lifted a finger and traced a message on the other side of the glass:",
  "\"HE’S NOT IN THE MIRROR.\"",
  "Mira whispered, \"Then where—?\"",
  "Before she could finish, a voice said softly behind her ear:",
  "\"Right here.\"",
  "She didn’t scream. She was too shocked to move.",
  "The humming began again. Calm. Repetitive. Right behind her.",
  "EPILOGUE",
  "Police filed the case as a disappearance.",
  "Sana told them Mira had been hallucinating for days.",
  "Cameras showed nothing. No intruder. No sign of forced entry.",
  "Just one odd detail:",
  "Every mirror in the apartment was shattered when they arrived.",
  "Every mirror… except the bathroom one.",
  "On its surface, written faintly as if traced by a fingertip:",
  "\"Mira finally turned the right way.\"",
  "And if anyone stands there long enough, sometimes—just sometimes—they swear they hear humming."
];

// ---------------- DOM refs ----------------
const stage = document.getElementById('stage');
const storyEl = document.getElementById('story');
const nextBtn = document.getElementById('nextBtn');
const skipBtn = document.getElementById('skipBtn');
const startBtn = document.getElementById('startBtn');
const ambientBtn = document.getElementById('ambientBtn');
const nameSoundBtn = document.getElementById('nameSoundBtn');
const overlay = document.getElementById('overlay');
const ambientAudio = document.getElementById('ambientAudio');

let userName = '';
let friendName = '';
let lines = [];
let currentLine = 0;
let typing = false;
let interruptTyping = false;
let jumpscareTimer = null;
let globalJumpscareInterval = null;

// ---------------- Utilities ----------------
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
}

function personalize(text){
  let out = text;
  if(userName){
    const re = new RegExp('\\bMira\\b', 'g');
    out = out.replace(re, userName);
  }
  if(friendName){
    out = out.replace(/Sana/g, friendName);
    if(Math.random() < 0.25 && out.length < 90){
      out += `\n\n"${friendName}…?"`;
    }
  }
  return out;
}
function prepareLines(){
  lines = templateLines.map(personalize);
}

// Safe DOM-based highlighter (avoids innerHTML injection)
function highlightNameInElement(el, name, className='name'){
  if(!name) return;
  const escForRegex = name.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
  const re = new RegExp(escForRegex, 'g');
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
  const nodes = [];
  while(walker.nextNode()) nodes.push(walker.currentNode);
  for(const node of nodes){
    const val = node.nodeValue;
    if(re.test(val)){
      const frag = document.createDocumentFragment();
      let lastIndex = 0;
      val.replace(re, (match, offset) => {
        if(offset > lastIndex) frag.appendChild(document.createTextNode(val.slice(lastIndex, offset)));
        const span = document.createElement('span');
        span.className = className;
        span.textContent = match;
        frag.appendChild(span);
        lastIndex = offset + match.length;
      });
      if(lastIndex < val.length) frag.appendChild(document.createTextNode(val.slice(lastIndex)));
      node.parentNode.replaceChild(frag, node);
    }
  }
}

// ── Audio shim — delegates to the engine embedded in the HTML ──
// These wrappers let existing engine code call resumeAudio() /
// playNameSound() etc. without knowing about window.__audio.
function resumeAudio()    { if (window.__audio) window.__audio.resumeAudio(); }
function stopAllAudio()   { if (window.__audio) window.__audio.stopAllAudio(); }
function playNameSound(n) { if (window.__audio) window.__audio.playNameSound(n); }


// ---------------- Typewriter + autoscroll ----------------
function showLine(index){
  return new Promise((resolve)=>{
    const raw = lines[index] || '';
    const container = document.createElement('div');
    container.className = 'line';
    storyEl.appendChild(container);

    typing = true;
    interruptTyping = false;
    let i = 0;

    function step(){
      if (interruptTyping) {
        container.textContent += raw.slice(i);
        i = raw.length;
      } else {
        const c = raw.charAt(i);
        container.textContent += c;
        i++;
      }

      // autoscroll
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

      if(i < raw.length){
        const delay = TYPE_SPEED + Math.floor(Math.random()*12 - 6);
        setTimeout(()=> step(), delay);
      } else {
        // highlight names safely
        if(userName) highlightNameInElement(container, userName);
        if(friendName) highlightNameInElement(container, friendName);

        setTimeout(()=>{
          container.classList.add('visible');
          typing = false;
          interruptTyping = false;

          // play name-sound each time the roommate's name appears in this line
          if(friendName){
            try{
              const esc = escapeRegExp(friendName);
              const re = new RegExp('\\b' + esc + '\\b', 'i');
              if(re.test(raw)){
                // ensure audio context resumed on user gesture
                playNameSound(friendName);
              }
            }catch(e){ /* ignore */ }
          }

          resolve();
        }, LINE_DELAY);
      }
    }

    step();

    // short autoscroll interval while typing (cleared after 2s)
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

// ---------------- Next / flow ----------------
async function next(){
  if(currentLine >= lines.length) {
    endExperience();
    return;
  }
  if(typing){
    interruptTyping = true;
    return;
  }
  // small chance of jumpscare before line
  if(Math.random() < 0.22){
    await triggerJumpscare();
  }
  await showLine(currentLine);
  currentLine++;
  scheduleJumpscare();
  if(currentLine >= lines.length){
    nextBtn.textContent = 'End';
  }
}

// ---------------- Jumpscare ----------------
function triggerJumpscare(){
  return new Promise((resolve)=>{
    interruptTyping = true;
    const gla = document.getElementById('glitch');
    if(gla){
      gla.style.opacity = '1';
      gla.classList.add('flicker');
    }
    if(stage) stage.classList.add('shake');

    const flash = document.createElement('div');
    flash.className = 'line visible jumpscare-flash';
    flash.style.color = 'var(--accent)';
    flash.style.fontSize = '26px';
    flash.style.marginTop = '12px';
    flash.style.textAlign = 'center';
    let text = '';
    if(Math.random() < 0.6 && friendName){
      text = `${friendName.toUpperCase()}…`;
    } else if(userName){
      text = `${userName.toUpperCase()}…`;
    } else {
      text = 'DON\'T LOOK';
    }
    flash.textContent = text;
    storyEl.appendChild(flash);

    const drip1 = document.getElementById('drip1');
    if(drip1) drip1.style.opacity = '1';

    const duration = 900 + Math.random()*600;
    setTimeout(()=>{
      if(gla){ gla.style.opacity = '0'; gla.classList.remove('flicker'); }
      if(stage) stage.classList.remove('shake');
      flash.style.transition = 'all 700ms ease';
      flash.style.opacity = '0';
      setTimeout(()=> flash.remove(), 900);
      if(drip1) drip1.style.opacity = '0.55';
      interruptTyping = false;
      resolve();
    }, duration);
  });
}

function scheduleJumpscare(){
  if(jumpscareTimer) clearTimeout(jumpscareTimer);
  const t = JUMPSCARE_MIN + Math.random()*(JUMPSCARE_MAX - JUMPSCARE_MIN);
  jumpscareTimer = setTimeout(()=>{
    if(currentLine < lines.length){
      triggerJumpscare();
      scheduleJumpscare();
    }
  }, t);
}

function endExperience(){
  const endLine = document.createElement('div');
  endLine.className = 'line visible';
  endLine.style.textAlign = 'center';
  endLine.style.marginTop = '26px';
  endLine.innerHTML = `<strong>— The End —</strong><br><small class="muted">Refresh to play again.</small>`;
  storyEl.appendChild(endLine);
  nextBtn.disabled = true;
  skipBtn.textContent = 'Restart';
  if(ambientAudio && !ambientAudio.paused) ambientAudio.pause();
  if(jumpscareTimer) clearTimeout(jumpscareTimer);
  if(globalJumpscareInterval) clearInterval(globalJumpscareInterval);
}


// ── Bind UI ──
nextBtn.addEventListener('click', () => {
  resumeAudio();
  next();
});

skipBtn.addEventListener('click', () => location.reload());

startBtn.addEventListener('click', () => {
  resumeAudio();
  userName   = (document.getElementById('nameInput').value  || '').trim();
  friendName = (document.getElementById('friendInput').value || '').trim();
  if (!userName) userName = 'Mira';
  prepareLines();
  if (!window.__overlayDismissed) {
    overlay.style.opacity = '0';
    overlay.setAttribute('aria-hidden', 'true');
    setTimeout(() => overlay.style.display = 'none', 450);
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
  const nameInput   = document.getElementById('nameInput');
  const friendInput = document.getElementById('friendInput');
  if (nameInput)   nameInput.addEventListener('keydown',   e => { if (e.key === 'Enter') startBtn.click(); });
  if (friendInput) friendInput.addEventListener('keydown', e => { if (e.key === 'Enter') startBtn.click(); });
});