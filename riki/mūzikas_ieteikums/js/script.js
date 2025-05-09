/* moodify_refactored_dynamic_complete.js
 * Moodify skripts pilnībā refaktorēts / Скрипт Moodify полностью переработан:
 * - Stabilas JSONP Deezer API pieprasījumi / Надёжные JSONP вызовы Deezer API
 * - Apvienota displayTracks lapošanai un autoatsvaidzināšanai / Объединённый displayTracks для пагинации и авто‑обновления
 * - Viena poga "Find" apstrādā ielādi, nākamo daļu, jaunu albumu / Одна кнопка "Find" обрабатывает загрузку, следующий блок, новый альбом
 * - Atbalsta dinamiskas noskaņojuma izmaiņas / Поддерживает динамическую смену настроения
 * - Spinneris indikators / Индикатор загрузки (спиннер)
 */

$(function () {
  // --- Konstantes / Константы ---
  const PEEP_ID = 11420468;
  const CHUNK = 10;
  const MAX_TRACKS = 50;

  // --- Stāvoklis / Состояние ---
  const state = {
    mode: 'normal',            // 'normal' vai 'peep' / 'normal' или 'peep'
    currentMood: null,         // pēdējais izmantotais noskaņojums / последний использованный настрой
    lists: { peep: [], normal: [] },
    indices: { peep: 0, normal: 0 },
    cache: {},                 // atskaņošanas saraksti pēc noskaņojuma / кэш плейлистов по настроению
    usedPlaylists: {}          // izmantotie atskaņošanas saraksti, lai nebūtu atkārtojumu / использованные плейлисты, чтобы избежать повторов
  };

  const moodKeywords = { happy: 'happy', sad: 'sad', chill: 'chill', energetic: 'energetic' };

  // --- Spineris / Спиннер ---
  function showSpinner() { $('#spinner').removeClass('hidden'); }
  function hideSpinner() { $('#spinner').addClass('hidden'); }

  // --- UI atiestatīšana / Сброс интерфейса ---
  function resetView() {
    $('#tracks').empty();
    hideSpinner();
    $('#controls').toggle(state.mode === 'normal');
    $('#find-button').prop('disabled', false).text('Find');
  }

  // --- Parādīt nākamo daļu vai pārlādēt / Показать следующий блок или перезагрузить ---
  function displayTracks() {
    const key = state.mode;
    const list = state.lists[key] || [];
    let idx = state.indices[key];

    // Nav vairāk sarakstā vai sasniegts limits / Нет больше в списке или достигнут лимит
    if (idx >= list.length || idx >= MAX_TRACKS) {
      if (state.mode === 'normal') {
        loadNormalTracks();
      } else {
        $('#find-button').text('No more').prop('disabled', true);
        hideSpinner();
      }
      return;
    }

    showSpinner();
    const end = Math.min(idx + CHUNK, list.length, MAX_TRACKS);
    list.slice(idx, end).forEach(tr => $('#tracks').append(createTrackDiv(tr)));
    state.indices[key] = end;
    hideSpinner();

    // Pogas teksta atjauninājums / Обновление текста кнопки
    if (state.indices[key] < list.length && state.indices[key] < MAX_TRACKS) {
      $('#find-button').text('More');
    } else {
      $('#find-button').text(state.mode === 'normal' ? 'Refresh' : 'No more');
    }
  }

  // --- Ielādēt Lil Peep dziesmas / Загрузка треков Lil Peep ---
  async function loadPeepTracks() {
    state.mode = 'peep'; resetView(); applyPeepStyle(); showSpinner();
    try {
      const data = await fetchPeepTracks();
      state.lists.peep = data.filter(tr => tr.preview && tr.artist.id === PEEP_ID);
      state.indices.peep = 0;
      $('#find-button').text('More');
      displayTracks();
    } catch (e) {
      console.error(e); alert('Kļūda ielādējot Peep dziesmas / Ошибка загрузки треков Peep'); hideSpinner();
    }
  }

  // --- Ielādēt dziesmas pēc noskaņojuma / Загрузка треков по настроению ---
  async function loadNormalTracks() {
    state.mode = 'normal'; resetView(); removePeepStyle(); showSpinner();
    try {
      const mood = $('#mood-select').val();
      // Ja mainās noskaņojums, atiestatīt indeksu / При смене настроения сбросить индекс
      if (mood !== state.currentMood) {
        state.currentMood = mood;
        state.indices.normal = 0;
      }
      // Hopsēt vai izmantot kešotu atskaņ. sarakstu / Получить или использовать кэшированный плейлист
      if (!state.cache[mood]) {
        const pls = await searchPlaylists(moodKeywords[mood]);
        state.cache[mood] = Array.isArray(pls) ? pls : [];
      }
      // Nav pieejamu atskaņošanas sarakstu? / Нет доступных плейлистов?
      if (state.cache[mood].length === 0) {
        alert('Neatrasti noskaņojuma pleilisti: ' + mood + ' / Не найдено плейлистов для настроения: ' + mood);
        hideSpinner();
        $('#find-button').text('No playlists').prop('disabled', true);
        return;
      }
      // Izvēlēties neizmantotu pleilisti / Выбрать плейлист без повторов
      state.usedPlaylists[mood] = state.usedPlaylists[mood] || [];
      // Filtrēt izmantotos / Отфильтровать уже использованные
      let available = state.cache[mood].filter(p => !state.usedPlaylists[mood].includes(p.id));
      // Ja visi izmantoti, atiestatīt / Если все использованы, сбросить список
      if (available.length === 0) {
        state.usedPlaylists[mood] = [];
        available = state.cache[mood].slice();
      }
      const pl = pickRandom(available);
      // Atzīmēt kā izmantotu / Отметить как использованный
      state.usedPlaylists[mood].push(pl.id);
      // Pārbaudīt izvēlēto pleilisti / Проверить выбранный плейлист
      if (!pl || !pl.id) {
        alert('Pleilista datu kļūda / Ошибка данных плейлиста');
        hideSpinner();
        $('#find-button').text('Error').prop('disabled', true);
        return;
      }
      const data = await fetchPlaylistTracks(pl.id);
      state.lists.normal = Array.isArray(data) ? data.filter(t => t.preview) : [];
      state.indices.normal = 0;
      $('#find-button').text('More');
      // Ja pleilists tukšs, auto atsvaidzināt / Если плейлист пуст, загрузить другой
      if (state.lists.normal.length === 0) {
        alert('Pleilists tukšs, tiek ielādēts cits... / Плейлист пуст, загружаю другой...');
        loadNormalTracks();
        return;
      }
      displayTracks();
    } catch (e) {
      console.error(e);
      alert('Kļūda ielādējot mūziku / Ошибка загрузки музыки');
      hideSpinner();
    }
  }

  // --- Stila pārslēgšana / Переключение стиля ---
  function applyPeepStyle() {
    $('#controls').hide(); $('h1').text('🎵 Peep Mode'); $('#peep-toggle').text('Exit Peep');
    $('body').addClass('dark').css({ color: '#ffb6c1', fontFamily: 'Courier New, monospace' });
  }
  function removePeepStyle() {
    $('#controls').show(); $('h1').text('🎧 Moodify'); $('#peep-toggle').text('Peep Mode');
    $('body').removeClass('dark').css({ color: '', fontFamily: '', background: '' });
  }

  // --- Deezer JSONP pieprasījumi / Deezer JSONP запросы ---
  function fetchPeepTracks() {
    return new Promise((res, rej) => {
      $.ajax({
        url: `https://api.deezer.com/artist/${PEEP_ID}/top?limit=100&output=jsonp`, dataType: 'jsonp',
        success: d => res(d.data || []), error: rej
      });
    });
  }
  function searchPlaylists(q) {
    return new Promise((res, rej) => {
      $.ajax({
        url: `https://api.deezer.com/search/playlist?q=${encodeURIComponent(q)}&output=jsonp`, dataType: 'jsonp',
        success: d => res(d.data || []), error: rej
      });
    });
  }
  function fetchPlaylistTracks(id) {
    return new Promise((res, rej) => {
      $.ajax({
        url: `https://api.deezer.com/playlist/${id}?output=jsonp`, dataType: 'jsonp',
        success: d => {
          const arr = d?.tracks?.data || [];
          res(Array.isArray(arr) ? arr : []);
        }, error: rej
      });
    });
  }

  // --- Palīgfunkcijas un atskaņotājs / Утилиты и плеер ---
  function pickRandom(a) { return a[Math.floor(Math.random()*a.length)]; }
  function createTrackDiv(tr) {
    const div = $('<div>').addClass('track');
    $('<img>').attr('src', tr.album.cover_medium).attr('loading', 'lazy').appendTo(div);
    const info = $('<div>').addClass('track-info').appendTo(div);
    const yt = encodeURIComponent(`${tr.title} ${tr.artist.name}`);
    $('<p>').html(`<strong><a href="https://www.youtube.com/results?search_query=${yt}" target="_blank">${tr.title}</a></strong>`).appendTo(info);
    const sp = encodeURIComponent(tr.artist.name);
    $('<p>').html(`<a href="https://open.spotify.com/search/${sp}" target="_blank">${tr.artist.name}</a>`).appendTo(info);
    const ph = `<div class="custom-player">
      <button class="prev">⏮️</button>
      <button class="play">▶️</button>
      <button class="next">⏭️</button>
      <input class="volume" type="range" min="0" max="1" step="0.01" value="1">
      <div class="progress"><div class="bar"></div></div>
      <span class="time">0:00</span>
      <audio src="${tr.preview}"></audio>
    </div>`;
    const player = $(ph).appendTo(info);
    initPlayer(player);
    return div;
  }
  function initPlayer(c) {
    const audio = c.find('audio')[0];
    const btn = c.find('button.play'); const prev = c.find('button.prev'); const next = c.find('button.next');
    const bar = c.find('.bar'); const time = c.find('.time'); const vol = c.find('.volume')[0];
    prev.hide(); next.hide();
    btn.on('click', e=>{e.stopPropagation(); audio.paused?audio.play():audio.pause();});
    prev.on('click',e=>{e.stopPropagation(); audio.pause(); const p=c.closest('.track').prev().find('audio')[0]; if(p) p.play();});
    next.on('click',e=>{e.stopPropagation(); audio.pause(); const n=c.closest('.track').next().find('audio')[0]; if(n) n.play();});
    vol.oninput = ()=> audio.volume = vol.value;
    audio.onplay = ()=>{ $('audio').not(audio).each((i,a)=>a.pause()); btn.text('⏸️'); prev.show(); next.show(); };
    audio.onpause = ()=>{ btn.text('▶️'); prev.hide(); next.hide(); };
    audio.ontimeupdate = ()=>{
      if(!audio.duration) return;
      const pct = (audio.currentTime/audio.duration)*100;
      bar.css('width',pct+'%');
      const m=Math.floor(audio.currentTime/60), s=String(Math.floor(audio.currentTime%60)).padStart(2,'0');
      time.text(`${m}:${s}`);
    };
    c.find('.progress').on('click',e=>{e.stopPropagation(); const r=c.find('.progress')[0].getBoundingClientRect(); audio.currentTime=((e.clientX-r.left)/r.width)*audio.duration;});
    audio.onended = ()=>{ prev.hide(); next.hide(); const nx=c.closest('.track').next().find('audio')[0]; if(nx) nx.play(); };
  }

  // --- Notikumu saistīšana / Привязка событий ---
  $('#theme-toggle').on('click',()=>$('body').toggleClass('dark'));
  $('#peep-toggle').on('click',()=> state.mode==='peep'?loadNormalTracks():loadPeepTracks());
  $('#find-button').on('click', () => {
    // Normālajā režīmā izlemt, vai ielādēt jaunus dziesmas vai parādīt nākamo daļu / В нормальном режиме решить, загружать ли новые треки или показывать следующий блок
    if (state.mode === 'normal') {
      const sel = $('#mood-select').val();
      // Ja dziesmas nav ielādētas, noskaņojums mainīts vai viss parādīts, ielādēt jaunu / Если треки не загружены, настроение сменилось или всё показано, загрузить новый набор
      if (
        state.lists.normal.length === 0 ||
        sel !== state.currentMood ||
        state.indices.normal >= state.lists.normal.length ||
        state.indices.normal >= MAX_TRACKS
      ) {
        loadNormalTracks();
        return;
      }
    }
    // Pretējā gadījumā vienkārši parādīt nākamo daļu / В противном случае просто показать следующий блок
    displayTracks();
});
});

