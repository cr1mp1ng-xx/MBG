/*LOGIN*/
function togglePassword() {
    const password = document.getElementById("password");
    const eyeIcon = document.querySelector(".right-icon");

    if(password.type === "password"){
        password.type = "text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    } else {
        password.type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    }
}

const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {

    input.addEventListener("focus", () => {
        input.style.border = "1px solid #007a4d";
        input.style.boxShadow = "0 0 5px rgba(0,122,77,0.3)";
    });

    input.addEventListener("blur", () => {
        input.style.border = "1px solid #cfd8d3";
        input.style.boxShadow = "none";
    });
});

const loginButton = document.querySelector(".btn-login");
    loginButton.addEventListener("click", () => {

    loginButton.innerHTML = "Loading...";

    setTimeout(() => {
        loginButton.innerHTML =
        'Masuk ke Dashboard <i class="fa-solid fa-right-to-bracket"></i>';
    }, 2000);
});

// TRACKING 
// tombol selesai

const finishButton = document.querySelector(".finish-btn");

finishButton.addEventListener("click", function(){

    alert("Pengiriman selesai!");

});

// search input

const searchInput = document.querySelector(".search-box input");

searchInput.addEventListener("keyup", function(){

    console.log("Mencari :", searchInput.value);

});

// tombol map

const mapButtons = document.querySelectorAll(".map-buttons button");

mapButtons.forEach(function(button){

    button.addEventListener("click", function(){

        alert("Fitur map diklik");

    });

});