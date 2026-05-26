/*LOGIN*/
const togglePassword =
document.getElementById('togglePassword');

const password =
document.getElementById('password');

togglePassword.addEventListener('click', () => {

  const type =
  password.getAttribute('type') === 'password'
  ? 'text'
  : 'password';

  password.setAttribute('type', type);

  togglePassword.classList.toggle('fa-eye');

  togglePassword.classList.toggle('fa-eye-slash');

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