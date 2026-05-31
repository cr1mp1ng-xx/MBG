// LOGIN
const togglePw = document.getElementById('togglePw');
const pwInput = document.getElementById('password');
const eyeOpen = document.getElementById('eyeOpen');
const eyeClosed = document.getElementById('eyeClosed');

togglePw.addEventListener('click', () => {
    const isText = pwInput.type === 'text';
    pwInput.type = isText ? 'password' : 'text';
    eyeOpen.style.display = isText ? 'block' : 'none';
    eyeClosed.style.display = isText ? 'none' : 'block';
});

const loginBtn = document.getElementById('loginBtn');

const arrowIcon = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
        stroke-linecap="round" stroke-linejoin="round" style="width:17px;height:17px">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
        <polyline points="10 17 15 12 10 7"/>
        <line x1="15" y1="12" x2="3" y2="12"/>
    </svg>`;

function resetLoginBtn() {
    loginBtn.style.background = '';
    loginBtn.style.opacity = '';
    loginBtn.disabled = false;
    loginBtn.innerHTML = 'Masuk ke Dashboard ' + arrowIcon;
}

loginBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value.trim();
    const pw = document.getElementById('password').value;

    if (!email || !pw) {
        loginBtn.style.background = 'linear-gradient(135deg, #c0392b, #e74c3c)';
        loginBtn.textContent = 'Harap isi semua kolom';
        setTimeout(resetLoginBtn, 2000);
        return;
    }

    loginBtn.textContent = 'Memproses…';
    loginBtn.style.opacity = '.8';
    loginBtn.disabled = true;

    setTimeout(resetLoginBtn, 1500);
});

// REGISTER
function togglePassword(inputId, openId, closedId) {
    const input = document.getElementById(inputId);
    const open = document.getElementById(openId);
    const closed = document.getElementById(closedId);
    const isText = input.type === 'text';

    input.type = isText ? 'password' : 'text';
    open.style.display = isText ? 'block' : 'none';
    closed.style.display = isText ? 'none' : 'block';
}

function checkStrength(val) {
    const el = document.getElementById('pwStrength');
    const label = document.getElementById('pwLabel');
    let score = 0;

    if (val.length >= 8) score++; // panjang minimal
    if (/[A-Z]/.test(val)) score++; // huruf kapital
    if (/[0-9]/.test(val)) score++; // angka
    if (/[^A-Za-z0-9]/.test(val)) score++; // simbol

    el.className = 'pw-strength strength-' + score;
    const labels = ['—', 'Lemah', 'Cukup', 'Kuat', 'Sangat Kuat'];
    label.textContent = val.length === 0 ? '—' : labels[score];
}

const registerBtn = document.getElementById('registerBtn');

const iconHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width:17px;height:17px"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>';

function resetRegisterBtn() {
    registerBtn.style.background = '';
    registerBtn.style.opacity = '';
    registerBtn.disabled = false;
    registerBtn.innerHTML = 'Daftarkan Akun ' + iconHTML;
}

registerBtn.addEventListener('click', () => {
    const nama = document.getElementById('namaLengkap').value.trim();
    const nip = document.getElementById('nip').value.trim();
    const email = document.getElementById('email').value.trim();
    const pw = document.getElementById('password').value;
    const pwConf = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;

    if (!nama || !nip || !email || !pw || !pwConf) {
        registerBtn.style.background = 'linear-gradient(135deg, #c0392b, #e74c3c)';
        registerBtn.textContent = 'Harap isi semua kolom';
        setTimeout(resetRegisterBtn, 2000);
        return;
    }

    if (pw !== pwConf) {
        registerBtn.style.background = 'linear-gradient(135deg, #c0392b, #e74c3c)';
        registerBtn.textContent = 'Kata sandi tidak cocok';
        setTimeout(resetRegisterBtn, 2000);
        return;
    }

    if (!terms) {
        registerBtn.style.background = 'linear-gradient(135deg, #e67e22, #f39c12)';
        registerBtn.textContent = 'Setujui syarat & ketentuan';
        setTimeout(resetRegisterBtn, 2000);
        return;
    }

    registerBtn.textContent = 'Memproses…';
    registerBtn.style.opacity = '.8';
    registerBtn.disabled = true;

    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
});

// DASHBOARD
document.addEventListener('DOMContentLoaded', () => {
    // status aktif untuk navigasi pada item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // toggle tarik untuk tampilannya
    const viewDropBtn = document.getElementById('viewDropBtn');
    const viewDropMenu = document.getElementById('viewDropMenu');

    if (viewDropBtn && viewDropMenu) {
        viewDropBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            viewDropMenu.classList.toggle('open');
        });

        viewDropMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                viewDropBtn.childNodes[0].textContent = link.textContent + ' ';
                viewDropMenu.classList.remove('open');
            });
        });

        document.addEventListener('click', () => {
            viewDropMenu.classList.remove('open');
        });
    }

    // bilah animasi
    function animateBars(selector) {
        const fills = document.querySelectorAll(selector);
        fills.forEach((fill) => {
            const target = fill.getAttribute('data-width');
            if (!target) return;
            setTimeout(() => {
                fill.style.width = target + '%';
            }, 400);
        });
    }

    animateBars('.bar-fill');
    animateBars('.priority-bar-fill');

    // gambar map pada canvas
    const canvas = document.getElementById('mapCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            const parent = canvas.parentElement;
            canvas.width = parent.offsetWidth;
            canvas.height = parent.offsetHeight;
            drawMap();
        }

        function drawMap() {
            const W = canvas.width;
            const H = canvas.height;
            ctx.clearRect(0, 0, W, H);

            // gradien latar belakang
            const bg = ctx.createLinearGradient(0, 0, W, H);
            bg.addColorStop(0, '#0d1a0f');
            bg.addColorStop(1, '#0b1c14');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, W, H);

            // garis kisi kisi
            ctx.strokeStyle = 'rgba(255,255,255,0.04)';
            ctx.lineWidth = 1;
            for (let x = 0; x < W; x += 40) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
            }
            
            for (let y = 0; y < H; y += 40) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
            }

            // Definisi node kayak berikut: [x%, y%, warna, radius, tipe]
            const nodes = [
                [0.50, 0.40, '#22c55e', 12, 'hub'],
                [0.30, 0.30, '#22c55e', 7, 'covered'],
                [0.60, 0.25, '#22c55e', 7, 'covered'],
                [0.70, 0.55, '#22c55e', 6, 'covered'],
                [0.40, 0.65, '#22c55e', 6, 'covered'],
                [0.55, 0.70, '#f59e0b', 8, 'partial'],
                [0.20, 0.50, '#f59e0b', 6, 'partial'],
                [0.75, 0.35, '#f59e0b', 6, 'partial'],
                [0.15, 0.20, '#ef4444', 9, 'critical'],
                [0.85, 0.20, '#ef4444', 9, 'critical'],
                [0.80, 0.75, '#ef4444', 8, 'critical'],
                [0.10, 0.70, '#ef4444', 8, 'critical'],
                [0.45, 0.15, '#ef4444', 7, 'critical'],
                [0.65, 0.82, '#ef4444', 7, 'critical'],
            ];

            // gambar garis untuk koneksi
            const connections = [
                [0, 1], [0, 2], [0, 3], [0, 4], [1, 4], [2, 3], [0, 5], [0, 6], [3, 7], [5, 9], [6, 8],
            ];

            connections.forEach(([a, b]) => {
                const na = nodes[a], nb = nodes[b];
                const ax = na[0] * W, ay = na[1] * H;
                const bx = nb[0] * W, by = nb[1] * H;
                const grad = ctx.createLinearGradient(ax, ay, bx, by);
                grad.addColorStop(0, na[2] + '55');
                grad.addColorStop(1, nb[2] + '33');
                ctx.beginPath();
                ctx.moveTo(ax, ay);
                ctx.lineTo(bx, by);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.2;
                ctx.stroke();
            });

            // gambar node
            nodes.forEach(([xp, yp, color, r]) => {
                const x = xp * W, y = yp * H;
                // Glow/cahaya
                const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
                glow.addColorStop(0, color + '40');
                glow.addColorStop(1, 'transparent');
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.arc(x, y, r * 3, 0, Math.PI * 2);
                ctx.fill();
                // Node/simpul
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
                // sorotan
                ctx.beginPath();
                ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.35, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,255,255,0.35)';
                ctx.fill();
            });

            // cahaya untuk hubnya statik
            const hub = nodes[0];
            const hx = hub[0] * W, hy = hub[1] * H;
            const pulseGrad = ctx.createRadialGradient(hx, hy, 0, hx, hy, 40);
            pulseGrad.addColorStop(0, 'rgba(34,197,94,0.15)');
            pulseGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = pulseGrad;
            ctx.beginPath();
            ctx.arc(hx, hy, 40, 0, Math.PI * 2);
            ctx.fill();
        }

        resizeCanvas();
        window.addEventListener('resize', () => {
            clearTimeout(window._mapResize);
            window._mapResize = setTimeout(resizeCanvas, 150);
        });

        // animasi kayak mengawang / berdenyut untuk hub
        let pulseR = 14;
        let pulseDir = 1;
        function pulseHub() {
            const W = canvas.width, H = canvas.height;
            const hx = 0.50 * W, hy = 0.40 * H;

            drawMap();

            pulseR += pulseDir * 0.4;
            if (pulseR > 28 || pulseR < 14) pulseDir *= -1;

            ctx.beginPath();
            ctx.arc(hx, hy, pulseR, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(34,197,94,' + (0.6 - (pulseR - 14) / 28) + ')';
            ctx.lineWidth = 2;
            ctx.stroke();

            requestAnimationFrame(pulseHub);
        }
        pulseHub();
    }

    // tombol rute
    const planBtn = document.getElementById('planRouteBtn');
    if (planBtn) {
        planBtn.addEventListener('click', () => {
            planBtn.textContent = '✓ Route Planned!';
            planBtn.style.background = 'var(--primary-dark)';
            setTimeout(() => {
                planBtn.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 5v14"/><path d="m5 12 7-7 7 7"/>
                </svg>
                Plan New Distribution Route`;
                planBtn.style.background = '';
            }, 2500);
        });
    }

    // pengarahan untuk ke statistik
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.cursor = 'pointer';
        });
    });

    // live jam (terakhir update)
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const timeBadge = document.querySelector('.stat-badge.time');
        if (timeBadge) {
            const mins = now.getMinutes() % 10;
            timeBadge.innerHTML = `
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> 
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
            Diperbarui ${mins === 0 ? 'baru saja' : mins + ' menit lalu'}`;
        }
    }

    updateClock();
    setInterval(updateClock, 60000);

    // button notif
    const notifBtn = document.getElementById('notifBtn');
    if (notifBtn) {
        notifBtn.addEventListener('click', () => {
            const badge = notifBtn.querySelector('.notif-badge');
            if (badge) {
                badge.style.display = badge.style.display === 'none' ? 'flex' : 'none';
                notifBtn.style.background = badge.style.display === 'none'
                    ? 'var(--primary-light)' : '';
                notifBtn.style.borderColor = badge.style.display === 'none'
                    ? 'var(--primary)' : '';
            }
        });
    }
});

/* =============================================
   MBG TRACKING - SCRIPT.JS
   Google Maps-style bottom sheet + sidebar
   ============================================= */

(function () {
  'use strict';

  /* ── DOM refs ── */
  const card       = document.querySelector('.bottom-card');
  const line       = document.querySelector('.line');
  const container  = document.querySelector('.container');
  const navItems   = document.querySelectorAll('.nav-item');

  /* ── Inject sidebar HTML before .container closes ── */
  function buildSidebar () {
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    sidebar.id = 'sidebar';

    // Clone nav items into sidebar
    const navLabels = [
      { icon: 'fa-solid fa-house',         label: 'Home' },
      { icon: 'fa-solid fa-location-dot',  label: 'Tracking',     active: true },
      { icon: 'fa-solid fa-truck',         label: 'Distribution' },
      { icon: 'fa-solid fa-chart-simple',  label: 'Reports' },
      { icon: 'fa-regular fa-user',        label: 'Profile' },
    ];

    navLabels.forEach(item => {
      const div = document.createElement('div');
      div.className = 'nav-item' + (item.active ? ' active' : '');
      div.innerHTML = `<i class="${item.icon}"></i><span>${item.label}</span>`;
      div.addEventListener('click', () => setActiveNav(div, sidebar));
      sidebar.appendChild(div);
    });

    container.appendChild(sidebar);
    return sidebar;
  }

  /* ── Inject desktop panel-toggle ── */
  function buildPanelToggle () {
    const toggle = document.createElement('div');
    toggle.className = 'panel-toggle up';
    toggle.innerHTML = '<span>Details</span><i class="fa-solid fa-chevron-up"></i>';
    toggle.id = 'panelToggle';
    card.insertBefore(toggle, card.children[1]); // after .line
    toggle.addEventListener('click', toggleDesktopPanel);
    return toggle;
  }

  /* ── Active nav ── */
  function setActiveNav (clicked, scope) {
    const items = scope
      ? scope.querySelectorAll('.nav-item')
      : document.querySelectorAll('.navbar .nav-item');
    items.forEach(n => n.classList.remove('active'));
    clicked.classList.add('active');
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => setActiveNav(item, null));
  });

  /* ─────────────────────────────────────────────
     GOOGLE MAPS-STYLE BOTTOM SHEET
     Snaps: down (peek) | mid | up (full)
     ───────────────────────────────────────────── */
  const SNAP = {
    down: 0,   // 140px  – peek
    mid:  1,   // ~52%
    up:   2,   // ~95%
  };

  let currentSnap = SNAP.mid;

  function applySnap (snap, animate = true) {
    card.style.transition = animate
      ? 'max-height .32s cubic-bezier(.4,0,.2,1)'
      : 'none';

    card.classList.remove('snapped-up', 'snapped-mid', 'snapped-down');
    if (snap === SNAP.up)   card.classList.add('snapped-up');
    if (snap === SNAP.mid)  card.classList.add('snapped-mid');
    if (snap === SNAP.down) card.classList.add('snapped-down');

    currentSnap = snap;
  }

  /* Drag on .line (handle) */
  let dragStartY  = 0;
  let dragStartH  = 0;
  let isDragging  = false;

  function onDragStart (e) {
    if (window.innerWidth >= 1024) return; // desktop uses toggle button
    isDragging  = true;
    dragStartY  = e.touches ? e.touches[0].clientY : e.clientY;
    dragStartH  = card.getBoundingClientRect().height;
    card.style.transition = 'none';
    document.addEventListener('mousemove', onDragMove, { passive: false });
    document.addEventListener('mouseup',   onDragEnd);
    document.addEventListener('touchmove', onDragMove, { passive: false });
    document.addEventListener('touchend',  onDragEnd);
  }

  function onDragMove (e) {
    if (!isDragging) return;
    e.preventDefault();
    const clientY  = e.touches ? e.touches[0].clientY : e.clientY;
    const delta    = dragStartY - clientY;        // positive = dragging up
    const newH     = Math.max(80, Math.min(
      window.innerHeight - 80,
      dragStartH + delta
    ));
    card.style.maxHeight = newH + 'px';
  }

  function onDragEnd (e) {
    if (!isDragging) return;
    isDragging = false;
    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('mouseup',   onDragEnd);
    document.removeEventListener('touchmove', onDragMove);
    document.removeEventListener('touchend',  onDragEnd);

    const currentH  = card.getBoundingClientRect().height;
    const vhH       = window.innerHeight;
    const ratio     = currentH / vhH;

    // Snap zones
    if      (ratio > .70) applySnap(SNAP.up);
    else if (ratio > .30) applySnap(SNAP.mid);
    else                  applySnap(SNAP.down);
  }

  line.addEventListener('mousedown',  onDragStart);
  line.addEventListener('touchstart', onDragStart, { passive: true });

  /* When scrolling the card itself, if at top & dragging down → collapse */
  card.addEventListener('touchstart', e => {
    if (card.scrollTop === 0) {
      const startY = e.touches[0].clientY;
      const startSnap = currentSnap;

      function pullDown (ev) {
        const dy = ev.touches[0].clientY - startY;
        if (dy > 40 && card.scrollTop === 0) {
          // Snap down one level
          const next = Math.max(SNAP.down, startSnap - 1);
          if (next !== startSnap) {
            applySnap(next);
          }
          card.removeEventListener('touchmove', pullDown);
        }
      }
      card.addEventListener('touchmove', pullDown, { passive: true });
      card.addEventListener('touchend', () => {
        card.removeEventListener('touchmove', pullDown);
      }, { once: true });
    }
  }, { passive: true });

  /* ─────────────────────────────────────────────
     DESKTOP PANEL TOGGLE
     ───────────────────────────────────────────── */
  let desktopExpanded = false;

  function toggleDesktopPanel () {
    const toggle = document.getElementById('panelToggle');
    desktopExpanded = !desktopExpanded;
    if (desktopExpanded) {
      card.classList.add('expanded');
      toggle.classList.remove('up');
      toggle.querySelector('span').textContent = 'Collapse';
    } else {
      card.classList.remove('expanded');
      toggle.classList.add('up');
      toggle.querySelector('span').textContent = 'Details';
    }
  }

  /* ─────────────────────────────────────────────
     MAP BUTTONS (+ / – / locate)
     ───────────────────────────────────────────── */
  let zoomLevel = 14;

  const mapBtns   = document.querySelectorAll('.map-buttons button');
  const mapEl     = document.querySelector('.map');
  const schoolLoc = document.querySelector('.school-location');

  // Zoom in
  mapBtns[0]?.addEventListener('click', () => {
    zoomLevel = Math.min(20, zoomLevel + 1);
    animateMapZoom(1.06);
    showToast(`Zoom ${zoomLevel}x`);
  });

  // Zoom out
  mapBtns[1]?.addEventListener('click', () => {
    zoomLevel = Math.max(8, zoomLevel - 1);
    animateMapZoom(0.94);
    showToast(`Zoom ${zoomLevel}x`);
  });

  // Locate
  mapBtns[2]?.addEventListener('click', () => {
    schoolLoc.style.transition = 'transform .4s ease';
    schoolLoc.style.transform  = 'translate(-50%, -50%) scale(1.18)';
    setTimeout(() => {
      schoolLoc.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 400);
    showToast('Lokasi ditemukan');
  });

  function animateMapZoom (scale) {
    mapEl.style.transition = 'transform .25s ease';
    mapEl.style.transform  = `scale(${scale})`;
    setTimeout(() => {
      mapEl.style.transition = 'transform .25s ease';
      mapEl.style.transform  = 'scale(1)';
    }, 250);
  }

  /* ─────────────────────────────────────────────
     SEARCH INPUT
     ───────────────────────────────────────────── */
  const searchInput = document.querySelector('.search-box input');
  searchInput?.addEventListener('focus', () => {
    if (window.innerWidth < 1024) {
      applySnap(SNAP.down);
    }
  });
  searchInput?.addEventListener('blur', () => {
    if (window.innerWidth < 1024) {
      applySnap(SNAP.mid);
    }
  });

  /* ─────────────────────────────────────────────
     FINISH BUTTON
     ───────────────────────────────────────────── */
  const finishBtn = document.querySelector('.finish-btn');
  finishBtn?.addEventListener('click', () => {
    finishBtn.innerHTML = '<i class="fa-solid fa-check"></i> SELESAI!';
    finishBtn.style.background = '#15803d';
    finishBtn.disabled = true;
    showToast('Pengiriman selesai! ✓', 3000);
    // Reset after 2.5s
    setTimeout(() => {
      finishBtn.innerHTML = 'SELESAI <i class="fa-solid fa-arrow-right"></i>';
      finishBtn.style.background = '';
      finishBtn.disabled = false;
    }, 2500);
  });

  /* ─────────────────────────────────────────────
     DRIVER ACTION BUTTONS
     ───────────────────────────────────────────── */
  const driverBtns = document.querySelectorAll('.driver-right button');
  driverBtns[0]?.addEventListener('click', () => showToast('Menghubungi Danda…'));
  driverBtns[1]?.addEventListener('click', () => showToast('Membuka pesan…'));

  /* ─────────────────────────────────────────────
     TOAST NOTIFICATION
     ───────────────────────────────────────────── */
  function showToast (msg, duration = 1800) {
    const existing = document.querySelector('.mbg-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'mbg-toast';
    toast.textContent = msg;

    Object.assign(toast.style, {
      position:     'fixed',
      bottom:       '90px',
      left:         '50%',
      transform:    'translateX(-50%) translateY(10px)',
      background:   'rgba(26,107,69,.92)',
      color:        '#fff',
      padding:      '9px 20px',
      borderRadius: '30px',
      fontSize:     '.78rem',
      fontFamily:   "'Poppins',sans-serif",
      fontWeight:   '500',
      zIndex:       '999',
      whiteSpace:   'nowrap',
      backdropFilter: 'blur(6px)',
      boxShadow:    '0 4px 16px rgba(0,0,0,.18)',
      opacity:      '0',
      transition:   'opacity .22s ease, transform .22s ease',
    });

    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity   = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity   = '0';
      toast.style.transform = 'translateX(-50%) translateY(8px)';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  /* ─────────────────────────────────────────────
     RESPONSIVE BREAKPOINT HANDLER
     ───────────────────────────────────────────── */
  function onResize () {
    const w = window.innerWidth;
    const toggle = document.getElementById('panelToggle');

    if (w >= 1024) {
      // Desktop — use panel toggle
      card.style.transition = 'none';
      card.style.maxHeight  = '';
      card.classList.remove('snapped-up', 'snapped-mid', 'snapped-down');
      if (toggle) toggle.style.display = 'flex';
    } else if (w >= 768) {
      // Tablet — mid snap default
      if (toggle) toggle.style.display = 'none';
      applySnap(SNAP.mid, false);
    } else {
      // Mobile — mid snap default
      if (toggle) toggle.style.display = 'none';
      applySnap(SNAP.mid, false);
    }
  }

  /* ─────────────────────────────────────────────
     INIT
     ───────────────────────────────────────────── */
  function init () {
    buildSidebar();
    buildPanelToggle();

    // Initial snap
    applySnap(SNAP.mid, false);

    // Responsive
    window.addEventListener('resize', onResize);
    onResize();

    // Animate progress bar on load
    const bar = document.querySelector('.progress');
    if (bar) {
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.transition = 'width 1s cubic-bezier(.4,0,.2,1)';
        bar.style.width = '85%';
      }, 400);
    }

    // Simulate live ETA countdown (cosmetic)
    const etaEl = document.querySelector('.arrival h3');
    if (etaEl) {
      let min = 45;
      setInterval(() => {
        if (min > 0) {
          min--;
          const h = min >= 60 ? 11 : (min >= 45 ? 11 : 11);
          const m = min % 60;
          etaEl.textContent = `${h}:${String(m).padStart(2,'0')} AM`;
        }
      }, 60000);
    }
  }

  document.addEventListener('DOMContentLoaded', init);

})();

// Profile

// Nav item click
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    item.classList.add('active');
  });
});

// Menu item click
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', () => {
    if (item.classList.contains('logout')) {
      if (confirm('Yakin ingin logout?')) {
        alert('Logout berhasil');
      }
    }
  });
});