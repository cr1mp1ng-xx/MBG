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