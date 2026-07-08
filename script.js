const story = window.STORY;
const assetVersion = story.assetVersion || 'audio-1';

function versionedAsset(source) {
  if (!source || !source.startsWith('assets/')) return source;
  return `${source}${source.includes('?') ? '&' : '?'}v=${encodeURIComponent(assetVersion)}`;
}

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

function media(image, video, label) {
  if (image) return `<div class="photo"><img src="${image}" alt="" loading="lazy"></div>`;
  if (video) return `<div class="photo"><video src="${video}" muted loop autoplay playsinline preload="metadata"></video></div>`;
  return `<div class="photo photo--placeholder"><span>${label}</span></div>`;
}

function isVideo(source) { return /\.(mp4|webm|mov)$/i.test(source); }

function chapterSlide(source, index) {
  const content = isVideo(source)
    ? `<video src="${source}" muted loop autoplay playsinline preload="metadata"></video>`
    : `<img src="${source}" alt="" loading="lazy">`;
  return `<div class="chapter-slide ${index === 0 ? 'is-active' : ''}" data-slide="${index}">${content}</div>`;
}

function render() {
  document.querySelector('#chapters').innerHTML = story.chapters.map((item, index) => {
    const items = item.media || [];
    const controls = items.length > 1 ? `<button class="carousel-arrow carousel-arrow--prev" type="button" data-direction="-1" aria-label="Foto anterior">‹</button><button class="carousel-arrow carousel-arrow--next" type="button" data-direction="1" aria-label="Foto siguiente">›</button>` : '';
    const musicControl = item.audio ? `<button class="chapter-music-button" type="button" data-audio="${item.audio}" aria-label="Reproducir música de ${item.title}"><span>♪</span></button>` : '';
    const slides = items.length ? items.map(chapterSlide).join('') : media('', '', `Foto o video pendiente · Capítulo ${item.number}`);
    return `<article class="chapter reveal" data-audio="${item.audio || ''}"><div class="chapter-photo"><button class="chapter-stage" type="button" data-chapter="${index}" data-media-index="0" aria-label="Ampliar ${item.title}" ${items.length ? '' : 'disabled'}><div class="chapter-carousel">${slides}</div></button>${controls}${musicControl}</div>
    <div class="chapter-copy"><i>${item.number}</i><h3>${item.title}</h3><time>${item.date}</time><p>${item.text}</p></div></article>`;
  }).join('');
  document.querySelector('#gallery').innerHTML = story.gallery.map((item, index) => `
    <button class="gallery-item reveal" type="button" data-index="${index}" aria-label="Abrir recuerdo ${index + 1}">
    ${media(item.image, item.video, `Foto ${index + 1} pendiente`)}<b>${String(index + 1).padStart(2, '0')}</b></button>`).join('');
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
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxVideo = document.querySelector('#lightbox-video');
const lightboxPrev = document.querySelector('#lightbox-prev');
const lightboxNext = document.querySelector('#lightbox-next');
const chapterAudio = document.querySelector('#chapter-audio');
let lightboxItems = [];
let lightboxIndex = 0;
let activeChapterMusicButton = null;
let chapterAudioUnlocked = false;

async function playChapterTrack(source, button) {
  if (!source) return;
  const sameTrack = chapterAudio.dataset.current === source;
  if (!sameTrack) { chapterAudio.src = versionedAsset(source); chapterAudio.dataset.current = source; }
  activeChapterMusicButton = button || document.querySelector(`.chapter-music-button[data-audio="${source}"]`);
  if (!audio.paused) audio.pause();
  try { await chapterAudio.play(); }
  catch {
    activeChapterMusicButton?.classList.add('is-missing');
    activeChapterMusicButton?.setAttribute('aria-label', 'Pista pendiente o reproducción bloqueada');
  }
}

async function unlockChapterMusic() {
  if (chapterAudioUnlocked) return;
  const firstTrack = story.chapters.find(item => item.audio)?.audio;
  if (!firstTrack) return;
  chapterAudio.src = versionedAsset(firstTrack); chapterAudio.volume = 0;
  try {
    await chapterAudio.play(); chapterAudio.pause(); chapterAudio.currentTime = 0;
    chapterAudio.volume = 1; chapterAudio.dataset.current = '';
    chapterAudioUnlocked = true;
  } catch { chapterAudio.volume = 1; }
}

function changeChapterSlide(container, direction) {
  const stage = container.querySelector('.chapter-stage');
  const slides = [...container.querySelectorAll('.chapter-slide')];
  if (slides.length < 2) return;
  const current = Number(stage.dataset.mediaIndex);
  const next = (current + direction + slides.length) % slides.length;
  slides[current].classList.remove('is-active');
  slides[next].classList.add('is-active');
  slides[current].querySelector('video')?.pause();
  slides[next].querySelector('video')?.play().catch(() => {});
  stage.dataset.mediaIndex = String(next);
}

function showLightboxItem() {
  const source = lightboxItems[lightboxIndex];
  const video = isVideo(source);
  lightboxImage.hidden = video;
  lightboxVideo.hidden = !video;
  lightboxPrev.hidden = lightboxItems.length < 2;
  lightboxNext.hidden = lightboxItems.length < 2;
  lightboxVideo.pause();
  if (video) {
    lightboxVideo.src = source;
    lightboxVideo.play().catch(() => {});
  } else {
    lightboxImage.src = source;
    lightboxVideo.removeAttribute('src');
  }
}

document.addEventListener('click', event => {
  const musicButton = event.target.closest('.chapter-music-button');
  if (musicButton) {
    const sameTrack = chapterAudio.dataset.current === musicButton.dataset.audio;
    if (sameTrack && !chapterAudio.paused) chapterAudio.pause();
    else playChapterTrack(musicButton.dataset.audio, musicButton);
    return;
  }
  const arrow = event.target.closest('.carousel-arrow');
  if (arrow) {
    const container = arrow.closest('.chapter-photo');
    changeChapterSlide(container, Number(arrow.dataset.direction));
    return;
  }
  const galleryItem = event.target.closest('.gallery-item');
  const chapterItem = event.target.closest('.chapter-stage');
  if (!galleryItem && !chapterItem) return;
  const memory = galleryItem ? story.gallery[Number(galleryItem.dataset.index)] : story.chapters[Number(chapterItem.dataset.chapter)];
  lightboxItems = galleryItem ? [memory.image || memory.video] : memory.media;
  lightboxIndex = galleryItem ? 0 : Number(chapterItem.dataset.mediaIndex);
  if (!lightboxItems[0]) return;
  lightboxImage.alt = memory.title || memory.date;
  lightbox.querySelector('.caption small').textContent = memory.date;
  lightbox.querySelector('.caption p').textContent = memory.phrase || memory.text;
  lightbox.showModal();
  showLightboxItem();
  if (chapterItem && memory.audio) playChapterTrack(memory.audio);
});

function closeMemory() {
  lightbox.close(); lightboxImage.removeAttribute('src');
  lightboxVideo.pause(); lightboxVideo.removeAttribute('src'); lightboxVideo.load();
}
function moveLightbox(direction) { lightboxIndex = (lightboxIndex + direction + lightboxItems.length) % lightboxItems.length; showLightboxItem(); }
document.querySelector('#close').addEventListener('click', closeMemory);
lightboxPrev.addEventListener('click', () => moveLightbox(-1));
lightboxNext.addEventListener('click', () => moveLightbox(1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeMemory(); });
chapterAudio.addEventListener('play', () => {
  document.querySelectorAll('.chapter-music-button').forEach(button => { button.classList.remove('is-playing'); button.querySelector('span').textContent = '♪'; });
  activeChapterMusicButton?.classList.add('is-playing');
  if (activeChapterMusicButton) activeChapterMusicButton.querySelector('span').textContent = '❚❚';
});
chapterAudio.addEventListener('pause', () => {
  if (!activeChapterMusicButton) return;
  activeChapterMusicButton.classList.remove('is-playing');
  activeChapterMusicButton.querySelector('span').textContent = '♪';
});
chapterAudio.addEventListener('error', () => {
  activeChapterMusicButton?.classList.add('is-missing');
  activeChapterMusicButton?.classList.remove('is-playing');
  if (activeChapterMusicButton) activeChapterMusicButton.querySelector('span').textContent = '♪';
});
document.querySelector('#skip').addEventListener('click', endIntro);
document.querySelector('#begin').addEventListener('click', () => { unlockChapterMusic(); document.querySelector('#recorrido').scrollIntoView(); });
const answer = document.querySelector('#answer');

function launchFinale() {
  if (answer.classList.contains('visible')) return;
  const stars = answer.querySelector('.answer-stars');
  stars.innerHTML = Array.from({ length: 28 }, (_, index) => {
    const left = (index * 37) % 101;
    const delay = (index % 9) * .22;
    const size = 2 + (index % 4);
    const drift = -35 + (index % 8) * 10;
    return `<i style="--left:${left}%;--delay:${delay}s;--size:${size}px;--drift:${drift}px"></i>`;
  }).join('');
  answer.classList.add('visible');
  requestAnimationFrame(() => answer.classList.add('is-animating'));
}

document.querySelector('#second-year').addEventListener('click', launchFinale);
document.querySelector('#replay-finale').addEventListener('click', () => {
  answer.classList.remove('is-animating', 'visible');
  setTimeout(() => { answer.querySelector('.answer-stars').innerHTML = ''; }, 900);
});

const audio = document.querySelector('#anniversary-audio');
const playButton = document.querySelector('#music-toggle');
audio.src = versionedAsset(audio.getAttribute('src'));

function updateMusicState(isPlaying) {
  playButton.classList.toggle('playing', isPlaying);
  playButton.querySelector('span').textContent = isPlaying ? '❚❚' : '▶';
  playButton.setAttribute('aria-label', isPlaying ? 'Pausar nuestra canción' : 'Reproducir nuestra canción');
  document.querySelector('#music-status').textContent = isPlaying ? 'Sonando ahora' : 'Nuestra canción';
}

playButton.addEventListener('click', async () => {
  if (audio.paused) {
    chapterAudio.pause();
    try { await audio.play(); } catch { document.querySelector('#music-status').textContent = 'Agrega cancion1.mp3 en assets/audio'; }
  } else audio.pause();
});
audio.addEventListener('play', () => updateMusicState(true));
audio.addEventListener('pause', () => updateMusicState(false));
audio.addEventListener('error', () => { updateMusicState(false); document.querySelector('#music-status').textContent = 'Pista pendiente'; });

function startChapterCarousels() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.chapter-photo').forEach(container => {
    if (container.querySelectorAll('.chapter-slide').length < 2) return;
    let timer;
    const start = () => { clearInterval(timer); timer = setInterval(() => changeChapterSlide(container, 1), 4800); };
    const stop = () => clearInterval(timer);
    container.addEventListener('pointerenter', stop);
    container.addEventListener('pointerleave', start);
    container.addEventListener('focusin', stop);
    container.addEventListener('focusout', start);
    start();
  });
}

function startChapterMusicObserver() {
  const musicObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting || !chapterAudioUnlocked) return;
    const source = entry.target.dataset.audio;
    if (source && chapterAudio.dataset.current !== source) playChapterTrack(source);
  }), { rootMargin: '-30% 0px -30% 0px', threshold: .01 });
  document.querySelectorAll('.chapter[data-audio]').forEach(chapter => musicObserver.observe(chapter));
}

render(); revealElements(); runIntro(); startChapterCarousels(); startChapterMusicObserver();
