// script.js
$(function() {
  $(document).on('play', 'audio', function() {
    $('audio').not(this).each(function() {
      this.pause();
    });
  });

  const PEEP_ID     = 11420468;
  const CHUNK       = 10;
  const MAX_TRACKS  = 50;
  let peepMode      = false;
  const moodKeywords= {
    happy: 'happy',
    sad: 'sad',
    chill: 'chill',
    energetic: 'energetic'
  };
  const state = {
    cache: {},
    peepTracks: null,
    peepIndex: 0,
    normalTracks: null,
    normalIndex: 0
  };

  // Переключение темы
  $('#theme-toggle').click(() => $('body').toggleClass('dark'));

  // Peep Mode
  $('#peep-toggle').click(() => {
    peepMode = !peepMode;
    $('#find-button').prop('disabled', peepMode);

    if (peepMode) {
      $('#controls').hide();
      $('#peep-toggle').text('Exit Peep');
      $('h1').text('🎵 Peep Mode');
      $('body').css({
        background: '#1d1d1d',
        color: '#ffb6c1',
        fontFamily: 'Courier New, monospace'
      });
      state.peepTracks = null;
      state.peepIndex  = 0;
      $('#tracks, #loading').empty();
      loadPeepTracks();
    } else {
      $('#controls').show();
      $('#peep-toggle').text('Peep Mode');
      $('h1').text('🎧 Moodify');
      $('body').css({ background: '', color: '', fontFamily: '' });
      state.peepTracks = null;
      state.peepIndex  = 0;
      $('#tracks, #loading').empty();
      $('#more-button').hide();
    }
  });

  // Find-button
  $('#find-button').click(() => {
    peepMode = false;
    $('#peep-toggle').text('Peep Mode');
    $('h1').text('🎧 Moodify');
    $('#find-button').prop('disabled', false);
    loadNormalTracks();
  });

  $('#more-button').click(() => {
    peepMode ? displayPeep() : displayNormal();
  });

  // --- Peep Mode ---
  function fetchPeepTracks(cb) {
    $.ajax({
      url: `https://api.deezer.com/artist/${PEEP_ID}/top?limit=100&output=jsonp`,
      dataType: 'jsonp',
      success(d) {
        cb(d.data.filter(tr => tr.preview && tr.artist.id === PEEP_ID));
      }
    });
  }

  function loadPeepTracks() {
    $('#loading').text('Загрузка треков Lil Peep...');
    $('#tracks').empty();
    $('#more-button').hide();
    if (!state.peepTracks) {
      fetchPeepTracks(tr => {
        state.peepTracks = tr;
        state.peepIndex  = 0;
        displayPeep();
      });
    } else {
      displayPeep();
    }
  }

  function displayPeep() {
    if (state.peepIndex >= MAX_TRACKS || state.peepIndex >= state.peepTracks.length) {
      $('#loading').empty();
      $('#more-button').hide();
      return;
    }
    const end   = Math.min(state.peepIndex + CHUNK, state.peepTracks.length, MAX_TRACKS);
    const slice = state.peepTracks.slice(state.peepIndex, end);
    slice.forEach(tr => $('#tracks').append(createTrackDiv(tr)));
    state.peepIndex = end;
    $('#loading').empty();
    $('#more-button').toggle(state.peepIndex < MAX_TRACKS && state.peepIndex < state.peepTracks.length);
  }

  // --- Normal Mode с кэшированием ---
  function loadNormalTracks() {
    $('#loading').text('Загрузка музыки...');
    $('#tracks').empty();
    $('#more-button').hide();
    const mood = $('#mood-select').val();

    if (!state.cache[mood]) {
      $.ajax({
        url: `https://api.deezer.com/search/playlist?q=${moodKeywords[mood]}&output=jsonp`,
        dataType: 'jsonp',
        success(d) {
          state.cache[mood] = d.data;
          pickPlaylistAndLoad(d.data);
        }
      });
    } else {
      pickPlaylistAndLoad(state.cache[mood]);
    }
  }

  function pickPlaylistAndLoad(list) {
    const pl = list[Math.floor(Math.random() * list.length)];
    $.ajax({
      url: `https://api.deezer.com/playlist/${pl.id}?output=jsonp`,
      dataType: 'jsonp',
      success(plData) {
        state.normalTracks = plData.tracks.data.filter(t => t.preview);
        state.normalIndex  = 0;
        displayNormal();
      }
    });
  }

  function displayNormal() {
    if (state.normalIndex >= MAX_TRACKS || state.normalIndex >= state.normalTracks.length) {
      $('#loading').empty();
      $('#more-button').hide();
      return;
    }
    const end   = Math.min(state.normalIndex + CHUNK, state.normalTracks.length, MAX_TRACKS);
    const slice = state.normalTracks.slice(state.normalIndex, end);
    slice.forEach(tr => $('#tracks').append(createTrackDiv(tr)));
    state.normalIndex = end;
    $('#loading').empty();
    $('#more-button').toggle(state.normalIndex < MAX_TRACKS && state.normalIndex < state.normalTracks.length);
  }

  // --- Общий плеер ---
  function createTrackDiv(tr) {
    const div = $('<div>').addClass('track');
    $('<img>').attr('src', tr.album.cover_medium).appendTo(div);
    const info = $('<div>').addClass('track-info').appendTo(div);
    const yt = encodeURIComponent(tr.title + ' ' + tr.artist.name);
    $('<p>').html(`<strong><a href="https://www.youtube.com/results?search_query=${yt}" target="_blank">${tr.title}</a></strong>`).appendTo(info);
    const sp = encodeURIComponent(tr.artist.name);
    $('<p>').html(`<a href="https://open.spotify.com/search/${sp}" target="_blank">${tr.artist.name}</a>`).appendTo(info);

    const player = $(`
      <div class="custom-player">
        <button class="prev">⏮️</button>
        <button class="play">▶️</button>
        <button class="next">⏭️</button>
        <input class="volume" type="range" min="0" max="1" step="0.01" value="1">
        <div class="progress"><div class="bar"></div></div>
        <span class="time">0:00</span>
        <audio src="${tr.preview}"></audio>
      </div>
    `).appendTo(info);

    initPlayer(player);
    return div;
  }

  function initPlayer(container) {
    const audio   = container.find('audio')[0];
    const btn     = container.find('button.play');
    const btnPrev = container.find('button.prev');
    const btnNext = container.find('button.next');
    const bar     = container.find('.bar');
    const time    = container.find('.time');
    const vol     = container.find('.volume')[0];

    btnPrev.hide();
    btnNext.hide();

    btn.click(e => { e.stopPropagation(); audio.paused ? audio.play() : audio.pause(); });
    btnPrev.click(e => { e.stopPropagation(); audio.pause(); const p = container.closest('.track').prev().find('audio')[0]; if (p) p.play(); });
    btnNext.click(e => { e.stopPropagation(); audio.pause(); const n = container.closest('.track').next().find('audio')[0]; if (n) n.play(); });

    vol.oninput = () => audio.volume = vol.value;

    audio.onplay = () => {
      $('audio').each((i,a) => { if (a !== audio) a.pause(); });
      btn.text('⏸️');
      btnPrev.show();
      btnNext.show();
    };
    audio.onpause = () => {
      btn.text('▶️');
      btnPrev.hide();
      btnNext.hide();
    };
    audio.ontimeupdate = () => {
      if (!audio.duration) return;
      const pct = (audio.currentTime / audio.duration) * 100;
      bar.css('width', pct + '%');
      const m = Math.floor(audio.currentTime / 60);
      const s = String(Math.floor(audio.currentTime % 60)).padStart(2, '0');
      time.text(`${m}:${s}`);
    };
    container.find('.progress').click(e => {
      e.stopPropagation();
      const rect = container.find('.progress')[0].getBoundingClientRect();
      audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
    });
    audio.onended = () => {
      btnPrev.hide();
      btnNext.hide();
      const nx = container.closest('.track').next().find('audio')[0];
      if (nx) nx.play();
    };
  }

  // Функция shuffle
  function shuffle(a) {
    return a.sort(() => Math.random() - 0.5);
  }
});