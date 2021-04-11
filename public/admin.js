let modal = document.getElementById("modal");
let closeModal = document.getElementById("close-modal");
let infoBtn = document.getElementsByClassName("fas fa-info-circle");
let cancelPedido = document.getElementById("liveToastBtn");
let toast = document.getElementById("toast-confirm");
let closeToast = document.getElementById("cancel-toast");
let nuevoProducto = document.getElementById("prod-nuevo-btn");
let paginaCrear = document.getElementById("product-creator");
let tablaPedidos = document.getElementById("table");

for (let i = 0; i < infoBtn.length; i++) {
    const element = infoBtn[i];
    element.addEventListener("click", () => {
        modal.style.display = "flex";
    })

}

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

cancelPedido.addEventListener("click", () => {
    toast.style.opacity = "1";
});

closeToast.addEventListener("click", () => {
    toast.style.opacity = "0";
});

nuevoProducto.addEventListener("click", () => {
    tablaPedidos.style.display = "none";
    paginaCrear.style.display = "block";
})