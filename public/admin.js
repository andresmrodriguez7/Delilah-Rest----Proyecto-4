let modal = document.getElementById("modal");
let closeModal = document.getElementById("close-modal");
let infoBtn = document.getElementsByClassName("fas fa-info-circle");
let cancelPedido = document.getElementById("liveToastBtn");
let toast = document.getElementById("toast-confirm");
let toastBody = document.getElementById("toast-body");
let closeToast = document.getElementById("cancel-toast");
let nuevoProducto = document.getElementById("prod-nuevo-btn");
let botonUsuarios = document.getElementById("usuarios-btn");
let paginaCrear = document.getElementById("product-creator");
let tablaPedidos = document.getElementById("table-pedido");
let tablaUsuarios = document.getElementById("table-usuarios");
let botonPedidos = document.getElementById("pedidos-btn");
let botonGetOut = document.getElementById("get-out");
let fechaPlacer = document.getElementById("fecha-hoy");
let paginaProductos = document.getElementById("products");
let botonProductos = document.getElementById("productos-btn")

setInterval(() => {
    fechaPlacer.innerHTML = moment().format("dddd D MMMM hh:mm:ss a");
}, 1000);


for (let i = 0; i < infoBtn.length; i++) {
    const element = infoBtn[i];
    element.addEventListener("click", () => {
        modal.style.display = "flex";
    });
}

botonProductos.addEventListener("click", () => {
    tablaUsuarios.style.display = "none";
    tablaPedidos.style.display = "none";
    paginaCrear.style.display = "none";
    paginaProductos.style.display = "flex";
    obtenerProductos();
})

botonUsuarios.addEventListener("click", () => {
    tablaUsuarios.style.display = "table";
    tablaPedidos.style.display = "none";
    paginaCrear.style.display = "none";
    paginaProductos.style.display = "none";
});

botonPedidos.addEventListener("click", () => {
    tablaUsuarios.style.display = "none";
    tablaPedidos.style.display = "table";
    paginaCrear.style.display = "none";
    paginaProductos.style.display = "none";
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

cancelPedido.addEventListener("click", () => {
    toast.style.opacity = "1";
});

closeToast.addEventListener("click", () => {
    toast.style.opacity = "0";
});

botonGetOut.addEventListener("click", () => {
    window.location.href = "./index.html"
});

nuevoProducto.addEventListener("click", () => {
    paginaCrear.style.display = "block";
    tablaUsuarios.style.display = "none";
    tablaPedidos.style.display = "none";
    paginaProductos.style.display = "none";
})

// selecciono del DOM la tabla de usuarios y subo uno a uno cada registro en la base de datos
let nuevoRegistro = document.getElementById("tbody-usuarios");

window.onload = async function getUsers() {
    let response = await fetch("/usuarios");
    let jsonUser = await response.json();

    if (jsonUser.status === 200) {
        for (let i = 0; i < jsonUser.body.length; i++) {
            const element = jsonUser.body[i];
            let userRegister = document.createElement("tr");
            userRegister.className = "userData";
            userRegister.id = `${element.id}`;
            userRegister.innerHTML += ` <td class="id">${element.id}</td>
            <td class="userName">${element.usuario}</td>
            <td class="name">${element.nombre}</td>
            <td class="lastname">${element.apellidos}</td>
            <td class="lemail">${element.email}</td>
            <td class="phone">${element.telefono}</td>
            <td class="address">${element.direccion}</td>
            <td class="password">${element.contrasena}</td>`;
            nuevoRegistro.appendChild(userRegister)
        }
    }
}

// funcion para eliminar un producto que es instanceada como un callback dentro de la función que obtiene los productos
async function deleteProduct(idSelected) {
    let response = await fetch(`/productos?id_productos=${idSelected}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    let jsonProduct = await response.json();
    return jsonProduct;
}

// funcion para obtener productos y mostrarlos | permite suscribir botones de borrar producto a la función de eliminar producto
let obtenerProductos = async function getProducts() {
    let response = await fetch("/productos");
    let jsonProducts = await response.json();

    if (jsonProducts.status === 200) {
        paginaProductos.innerHTML = "";
        for (let i = 0; i < jsonProducts.body.length; i++) {
            const element = jsonProducts.body[i];

            let product = document.createElement("div");
            product.className = "card";
            product.id = `${element.descripcion}`;
            product.innerHTML += ` <div class="col g-0">
            <div class="container col-md-4">
                <img src="./styles/images/${element.url}" alt="${element.descripcion}">
                <div>
                    <h5 class="card-title">${element.nombre}</h5>
                    <h6>${element.descripcion}</h6>
                    <p class=" text-muted"><small class="text-muted">$${element.precio}</small></p>
                </div>
                <div class="editor-control">
                    <p>Editar producto</p><i id="${element.id_productos}" class="fas fa-trash-alt"></i>
                </div>
            </div>`;
            paginaProductos.appendChild(product)
        }
        // suscribir los botones de eliminar producto a la petición delete
        let deleteBtn = document.getElementsByClassName("fa-trash-alt");
        for (let i = 0; i < deleteBtn.length; i++) {
            const element = deleteBtn[i];
            element.addEventListener("click", () => {
                deleteProduct(element.id);
                obtenerProductos();
            })

        }
    }
}

obtenerProductos();

// esta funcion recoge datos de nuevos productos y los crea en el sistema mediante una peticion POST al endpoint /productos
async function newProduct(productData) {
    let response = await fetch("/productos", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    });
    let jsonProduct = await response.json();
    console.log(jsonProduct.status);
    if (jsonProduct.status === 200) {
        toastBody.innerHTML = `Felicitaciones al Chef! ${productData.nombre} fue añadido al menú exitosamente!`
        toast.style.opacity = "1";
        setTimeout(() => {
            toast.style.opacity = "0";
        }, 3000);
    } else if (jsonProduct.status === 400) {
        toastBody.innerHTML = `${productData.nombre} es un producto que ya existe en el menú.`
        toast.style.opacity = "1";
        setTimeout(() => {
            toast.style.opacity = "0";
        }, 3000);
    } else {
        toastBody.innerHTML = `${productData.nombre} no pudo ingresarse en el menú, algo falló en el servidor.`
        toast.style.opacity = "1";
        setTimeout(() => {
            toast.style.opacity = "0";
        }, 3000);
    }
}

// aqui asignamos el evento al boton que creará la petición al endpoint de crear producto
let newProductBtn = document.getElementById("crear-producto-btn");

// rescatamos todos los datos a ser enviados
let nombreProduct = document.getElementById("product-name");
let descripProduct = document.getElementById("product-description");
let priceProduct = document.getElementById("product-price");
let rootProduct = document.getElementById("product-root");

newProductBtn.addEventListener("click", () => {
    let productData = {
        "nombre": nombreProduct.value,
        "descripcion": descripProduct.value,
        "precio": priceProduct.value,
        "disponible": 1,
        "url": rootProduct.value,
    }
    newProduct(productData)
})

// funcion para obtener productos y mostrarlos | permite suscribir botones de borrar producto a la función de eliminar producto
let tabla_Pedidos = document.getElementById("tablaPedidos");

let obtenerPedidos = async function getPedidos() {
    let response = await fetch("/pedidos");
    let jsonPedidos = await response.json();
    if (jsonPedidos.status === 200) {
        // tablaPedidos.innerHTML = "";
        for (let i = 0; i < jsonPedidos.body.length; i++) {
            const element = jsonPedidos.body[i];
            let pedido = document.createElement("tr");
            pedido.innerHTML += `  <td class="status">
            <select class="form-select" aria-label="Default select example">
        <option  style="text-align: center;" selected>${element.status}</option>
        <option value="1">NUEVO</option>
        <option value="2">CONFIRMADO</option>
        <option value="3">PREPARANDO</option>
        <option value="4">ENVIANDO</option>
        <option value="5">ENTREGADO</option>
      </select>
        </td>
        <td class="time">${element.time}</td>
        <td class="number"># ${element.id_pedido}</td>
        <td class="description">${element.detalle}</td>
        <td class="price"><i class="far fa-credit-card"></i> $${element.importe}</td>
        <td class="user">${element.nombre} ${element.apellidos}</td>
        <td class="address">${element.direccion} <span><i class="fas fa-info-circle"></i></span> </td>`;
            tabla_Pedidos.appendChild(pedido)
        }


        // suscribir los botones de eliminar producto a la petición delete
        // let deleteBtn = document.getElementsByClassName("fa-trash-alt");
        // for (let i = 0; i < deleteBtn.length; i++) {
        //     const element = deleteBtn[i];
        //     element.addEventListener("click", () => {
        //         deleteProduct(element.id);
        //         obtenerProductos();
        //     })

        // }
    }
}

obtenerPedidos();