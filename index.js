const paginaRegistro = document.getElementById("mean-register");
const paginaLogin = document.getElementById("mean-login");
const registerLink = document.getElementById("registerLink");
const inicioLink = document.getElementById("inicioSesion");
const loginBtn = document.getElementById("Login");
const landingPage = document.getElementById("productos");
const logOutBtn = document.getElementById("logOut");
const pedidoBtn = document.getElementById("pedidoBtn");
const modalPedido = document.getElementById("blur-modal");
const cancelPedido = document.getElementById("cancel-pedido");
const confirmPedido = document.getElementById("confirm-pedido");
const floatPedido = document.getElementById("float-pedido");
const addBtns = document.getElementsByClassName("add-icon");
const userInput = document.getElementById("correo");
const confirmedPage = document.getElementById("confirmed");
const seguirPedido = document.getElementById("follow-btn");
const statusPage = document.getElementById("status-pedido");
const detailBack = document.getElementById("detail-goback");


userInput.addEventListener('blur', (event) => {
    const resultado = document.getElementById("emailHelp");
    resultado.style.display = "block";
});

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
    floatPedido.style.display = "none";
    landingPage.style.display = "none";
    confirmedPage.style.display = "flex";
});

seguirPedido.addEventListener('click', () => {
    confirmedPage.style.display = "none";
    statusPage.style.display = "block";
});

detailBack.addEventListener("click", () => {
    statusPage.style.display = "none";
    landingPage.style.display = "block";
})

for (let i = 0; i < addBtns.length; i++) {
    const element = addBtns[i];
    element.addEventListener("click", () => {
        floatPedido.style.display = "block";
    })
};