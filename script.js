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

    setTimeout(resetRegisterBtn, 1500);
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