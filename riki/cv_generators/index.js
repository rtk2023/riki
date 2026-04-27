 (function(){
      "use strict";

      // ----- Profile picture -----
      let profileImageData = null;

      window.handleProfilePicUpload = function(event) {
        const file = event.target.files[0];
        const previewDiv = document.getElementById('avatarPreview');
        if (file) {
          if (file.size > 2 * 1024 * 1024) {
            document.getElementById('profilePic').value = '';
            showFieldError('profilePic', 'Image too large (max 2MB)');
            return;
          }
          const reader = new FileReader();
          reader.onload = e => {
            profileImageData = e.target.result;
            previewDiv.innerHTML = `<img src="${profileImageData}" alt="profile">`;
          };
          reader.readAsDataURL(file);
        } else {
          profileImageData = null;
          previewDiv.innerHTML = '<i class="fas fa-user-circle"></i>';
        }
        clearFieldError('profilePic');
      };

      window.removeProfilePic = function() {
        profileImageData = null;
        document.getElementById('profilePic').value = '';
        document.getElementById('avatarPreview').innerHTML = '<i class="fas fa-user-circle"></i>';
        generateCV();
      };

      // ----- inline error handling -----
      function showFieldError(fieldId, message) {
        const input = document.getElementById(fieldId);
        const errorDiv = document.getElementById(fieldId + 'Error');
        if (input) input.classList.add('input-error');
        if (errorDiv) errorDiv.textContent = message;
      }
      function clearFieldError(fieldId) {
        const input = document.getElementById(fieldId);
        const errorDiv = document.getElementById(fieldId + 'Error');
        if (input) input.classList.remove('input-error');
        if (errorDiv) errorDiv.textContent = '';
      }

      function validateInputs(email, phone) {
        let valid = true;
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const phoneValid = /^[0-9+ ]{6,15}$/.test(phone);
        
        if (!emailValid) {
          showFieldError('email', 'Valid email required');
          valid = false;
        } else clearFieldError('email');
        
        if (!phoneValid) {
          showFieldError('phone', '6-15 digits, +, spaces');
          valid = false;
        } else clearFieldError('phone');
        
        return valid;
      }

      const body = document.body;
      const themeToggle = document.getElementById('themeToggle');
      function updateThemeUI() {
        const isDark = body.classList.contains('dark');
        const span = themeToggle.querySelector('span');
        const sun = themeToggle.querySelector('.fa-sun');
        const moon = themeToggle.querySelector('.fa-moon');
        span.textContent = isDark ? 'Dark' : 'Light';
        sun.style.opacity = isDark ? '0.6' : '1';
        moon.style.opacity = isDark ? '1' : '0.6';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      }
      themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        updateThemeUI();
      });
      if (localStorage.getItem('theme') === 'dark') body.classList.add('dark');
      updateThemeUI();

      function toModernList(text, icon = 'fa-chevron-right') {
        if (!text) return '<p class="placeholder-muted"><i class="far fa-plus-circle"></i> Add content</p>';
        const lines = text.split('\n').filter(l => l.trim() !== '');
        if (!lines.length) return '<p class="placeholder-muted">—</p>';
        let html = '<ul class="cv-list">';
        lines.forEach(line => {
          let clean = line.replace(/^[•\-–—*\s]+/, '').trim();
          if (!clean) return;
          html += `<li><i class="fas ${icon}"></i> <span>${clean}</span></li>`;
        });
        html += '</ul>';
        return html;
      }

      window.generateCV = function() {
        const name = document.getElementById('name').value.trim();
        const title = document.getElementById('title').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();

        if (!name) {
          showFieldError('name', 'Name is required');
          return;
        } else clearFieldError('name');

        if (!validateInputs(email, phone)) return;

        const summaryHtml = toModernList(document.getElementById('summary').value, 'fa-pen-fade');
        const expHtml = toModernList(document.getElementById('experience').value, 'fa-briefcase');
        const eduHtml = toModernList(document.getElementById('education').value, 'fa-graduation-cap');
        const skillsHtml = toModernList(document.getElementById('skills').value, 'fa-code');

        let avatarHtml = '';
        if (profileImageData) {
          avatarHtml = `<img class="cv-avatar" src="${profileImageData}" alt="${name}">`;
        } else {
          avatarHtml = `<div class="cv-avatar" style="display: flex; align-items: center; justify-content: center; background: var(--chip-bg); color: var(--accent); font-size: 2.5rem;"><i class="fas fa-user-circle"></i></div>`;
        }

        const contactChips = `
          <div class="contact-chips">
            <span class="contact-chip"><i class="fas fa-envelope"></i> ${email}</span>
            <span class="contact-chip"><i class="fas fa-phone-alt"></i> ${phone}</span>
          </div>
        `;

        const cvHTML = `
          <div class="cv-header">
            ${avatarHtml}
            <div class="cv-header-info">
              <div class="cv-name">${name}</div>
              <div class="cv-title">${title}</div>
              ${contactChips}
            </div>
          </div>
          <div class="cv-grid">
            <div class="cv-left">
              <div class="cv-section">
                <h3><i class="fas fa-code"></i> Expertise</h3>
                ${skillsHtml}
              </div>
              <div class="cv-section">
                <h3><i class="fas fa-graduation-cap"></i> Education</h3>
                ${eduHtml}
              </div>
            </div>
            <div class="cv-right">
              <div class="cv-section">
                <h3><i class="fas fa-user-pen"></i> Profile</h3>
                ${summaryHtml}
              </div>
              <div class="cv-section">
                <h3><i class="fas fa-briefcase"></i> Experience</h3>
                ${expHtml}
              </div>
            </div>
          </div>
        `;

        const cvDiv = document.getElementById('cv');
        cvDiv.className = 'cv';
        cvDiv.innerHTML = cvHTML;
      };

      window.downloadPDF = function() {
        if (!document.getElementById('cv').innerText.trim()) generateCV();
        window.print();
      };
    })();