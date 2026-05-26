/*LOGIN*/
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