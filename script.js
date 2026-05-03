const carousel = document.getElementById('carousel');
const cards = document.querySelectorAll('.p-card');
const dots = document.querySelectorAll('.cdot');

if (carousel) {
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const i = parseInt(dot.dataset.i);
      cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    });
  });
  carousel.addEventListener('scroll', () => {
    const cardW = cards[0].offsetWidth + 14;
    const active = Math.round(carousel.scrollLeft / cardW);
    dots.forEach((d, i) => d.classList.toggle('active', i === active));
  }, { passive: true });
}

// --- YouTube Logic ---
const ytData = {
  session: [{ id: '4frKVkccUck' },{ id: 'o0DG1jdetuc' },{ id: 'FZ6VzdC8XdE' }, { id: '_WdU1EZ1-Ow' },{ id: '7PH7L2KVMYo' }],
  bass:   [{ id: 'YDobOtnFm9w' }, { id: 'KH9uW8Y6cdk' }],
  guitar: [{ id: 'i8FgazNW-mI' }, {id: 'ii3dqZtnFmA'},{id: 'TtpqHI9vKxo'},{ id: 'TSkr-sDEpxk' },{ id: 'IODOZYCPOT4' }],
};

function renderThumbs(cat, activeIdx = 0) {
  const wrap = document.getElementById('yt-thumbs');
  if (!wrap || !ytData[cat]) return; 
  
  wrap.innerHTML = '';
  ytData[cat].forEach((v, i) => {
    const div = document.createElement('div');
    div.className = 'yt-thumb' + (i === activeIdx ? ' active' : '');
    div.innerHTML = `<img src="https://img.youtube.com/vi/${v.id}/mqdefault.jpg" loading="lazy">`;
    div.addEventListener('click', () => {
      document.getElementById('yt-iframe').src = `https://www.youtube.com/embed/${v.id}?autoplay=1`;
      document.querySelectorAll('.yt-thumb').forEach((t, j) => t.classList.toggle('active', j === i));
    });
    wrap.appendChild(div);
  });
}

// タブクリックイベント
document.querySelectorAll('.yt-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.yt-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const cat = tab.dataset.cat;
    document.getElementById('yt-iframe').src = `https://www.youtube.com/embed/${ytData[cat][0].id}`;
    renderThumbs(cat, 0);
  });
});

renderThumbs('session', 0);