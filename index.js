let paginaRegistro = document.getElementById("mean-register");
let paginaLogin = document.getElementById("mean-login");
let registerLink = document.getElementById("registerLink");
let inicioLink = document.getElementById("inicioSesion");
let loginBtn = document.getElementById("Login");
let landingPage = document.getElementById("productos");
let logOutBtn = document.getElementById("logOut")

registerLink.addEventListener('click', () => {
    paginaRegistro.style.display = "block";
    paginaLogin.style.display = "none";

});

inicioLink.addEventListener('click', () => {
    paginaRegistro.style.display = "none";
    paginaLogin.style.display = "block";
});

loginBtn.addEventListener('click', () => {
    landingPage.style.display = "block";
    paginaLogin.style.display = "none";

});
logOutBtn.addEventListener('click', () => {
    landingPage.style.display = "none";
    paginaLogin.style.display = "block";

});