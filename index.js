let paginaRegistro = document.getElementById("mean-register");
let paginaLogin = document.getElementById("mean-login");
let registerLink = document.getElementById("registerLink");
let inicioLink = document.getElementById("inicioSesion");
let loginBtn = document.getElementById("Login");
let landingPage = document.getElementById("productos");
let logOutBtn = document.getElementById("logOut");
let pedidoBtn = document.getElementById("pedidoBtn");
let modalPedido = document.getElementById("blur-modal");
let cancelPedido = document.getElementById("cancel-pedido");
let confirmPedido = document.getElementById("confirm-pedido");
let floatPedido = document.getElementById("float-pedido");
let addBtns = document.getElementsByClassName("add-icon");

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

pedidoBtn.addEventListener('click', () => {
    modalPedido.style.display = "block";
});

cancelPedido.addEventListener('click', () => {
    modalPedido.style.display = "none";
    floatPedido.style.display = "none";
});

confirmPedido.addEventListener('click', () => {
    modalPedido.style.display = "none";

});

for (let i = 0; i < addBtns.length; i++) {
    const element = addBtns[i];
    element.addEventListener("click", () => {
        floatPedido.style.display = "block";
    })
};