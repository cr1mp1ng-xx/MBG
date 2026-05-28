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

// TRACKING 
// tombol selesai

const finishButton = document.querySelector(".finish-btn");

finishButton.addEventListener("click", function () {

    alert("Pengiriman selesai!");

});

// search input

const searchInput = document.querySelector(".search-box input");

searchInput.addEventListener("keyup", function () {

    console.log("Mencari :", searchInput.value);

});

// tombol map

const mapButtons = document.querySelectorAll(".map-buttons button");

mapButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        alert("Fitur map diklik");

    });

});