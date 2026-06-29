const story = window.STORY;
const intro = document.querySelector('#intro');
const experience = document.querySelector('#experience');
const terminal = document.querySelector('#terminal-lines');
let introEnded = false;

const introLines = [
  ['Inicializando sistema...', ''], ['Buscando recuerdos...', ''],
  ['Recuerdos encontrados.', ''], ['Analizando momentos especiales...', ''],
  ['Preparando una pequeña sorpresa...', ''], ['Bienvenida, Daira ❤️', 'accent']
];

function runIntro() {
  introLines.forEach(([text, className], index) => setTimeout(() => {
    const line = document.createElement('p');
    line.textContent = text; line.className = className; terminal.appendChild(line);
  }, 400 + index * 720));
  setTimeout(endIntro, 5300);
}

function endIntro() {
  if (introEnded) return;
  introEnded = true; intro.classList.add('finished'); experience.classList.add('visible');
  experience.setAttribute('aria-hidden', 'false'); document.body.classList.remove('locked');
  setTimeout(() => intro.remove(), 1000); revealElements();
}

function photo(image, label) {
  const style = image ? `style="background-image:url('${image}')"` : '';
  return `<div class="photo" ${style}><span>${label}</span></div>`;
}

function render() {
  document.querySelector('#chapters').innerHTML = story.chapters.map(item => `
    <article class="chapter reveal"><div class="chapter-photo">${photo(item.image, `Foto · Capítulo ${item.number}`)}</div>
    <div class="chapter-copy"><i>${item.number}</i><h3>${item.title}</h3><time>${item.date}</time><p>${item.text}</p></div></article>`).join('');
  document.querySelector('#gallery').innerHTML = story.gallery.map((item, index) => `
    <button class="gallery-item reveal" type="button" data-index="${index}" aria-label="Abrir recuerdo ${index + 1}">
    ${photo(item.image, `Tu foto ${index + 1}`)}<b>0${index + 1}</b></button>`).join('');
}

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  entry.target.classList.add('revealed');
  if (entry.target.classList.contains('numbers')) animateNumbers();
  observer.unobserve(entry.target);
}), { threshold: .12 });

function revealElements() { document.querySelectorAll('.reveal, .numbers').forEach(el => observer.observe(el)); }

let counted = false;
function animateNumbers() {
  if (counted) return; counted = true;
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = Number(el.dataset.count), start = performance.now();
    const tick = now => { const p = Math.min((now - start) / 1400, 1); el.textContent = Math.floor(target * (1 - (1 - p) ** 3)); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  });
}

const lightbox = document.querySelector('#lightbox');
document.addEventListener('click', event => {
  const item = event.target.closest('.gallery-item');
  if (!item) return;
  const memory = story.gallery[Number(item.dataset.index)], source = item.querySelector('.photo');
  lightbox.querySelector('.lightbox-photo').style.backgroundImage = source.style.backgroundImage || getComputedStyle(source).backgroundImage;
  lightbox.querySelector('.caption small').textContent = memory.date;
  lightbox.querySelector('.caption p').textContent = memory.phrase;
  lightbox.showModal();
});

document.querySelector('#close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
document.querySelector('#skip').addEventListener('click', endIntro);
document.querySelector('#begin').addEventListener('click', () => document.querySelector('#recorrido').scrollIntoView());
document.querySelector('#second-year').addEventListener('click', () => document.querySelector('#answer').classList.add('visible'));

const audio = document.querySelector('#anniversary-audio');
const playButton = document.querySelector('#music-toggle');
const trackButtons = document.querySelectorAll('.track-button');

function updateMusicState(isPlaying) {
  playButton.classList.toggle('playing', isPlaying);
  playButton.querySelector('span').textContent = isPlaying ? '❚❚' : '▶';
  playButton.setAttribute('aria-label', isPlaying ? 'Pausar música' : 'Reproducir música');
}

playButton.addEventListener('click', async () => {
  if (!audio.src) return;
  if (audio.paused) {
    try { await audio.play(); } catch { document.querySelector('#music-status').textContent = 'Agrega las canciones en assets/audio para escucharlas aquí.'; }
  } else audio.pause();
});

trackButtons.forEach(button => button.addEventListener('click', async () => {
  trackButtons.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  audio.src = button.dataset.src;
  document.querySelector('#track-name').textContent = button.dataset.name;
  try { await audio.play(); } catch { document.querySelector('#music-status').textContent = 'Esta canción estará disponible cuando agregues el archivo MP3.'; }
}));
audio.addEventListener('play', () => updateMusicState(true));
audio.addEventListener('pause', () => updateMusicState(false));
audio.addEventListener('error', () => { updateMusicState(false); document.querySelector('#music-status').textContent = 'Archivo pendiente: agrégalo en assets/audio.'; });

render(); revealElements(); runIntro();
