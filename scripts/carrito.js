const carro = JSON.parse(localStorage.getItem("carro") || "[]")
carro.forEach(producto => {
    carro.forEach(producto => {
        document.querySelector('.'+producto.ref).innerHTML=producto.cantidad
    })
})

function crear_carro() {
    if (localStorage.getItem("carro") === null) {
        let carrito = [];
        localStorage.setItem("carro", JSON.stringify(carrito));
    }
}

function sumarCantidad(xmas) {
    crear_carro()
    const carro = JSON.parse(localStorage.getItem("carro") || "[]");
    // Verifica si el carrito está vacío
    if (carro.length === 0) {
        console.log("El carrito está vacío.")
        productos[localStorage.getItem("categoria")].forEach(producto => {
            if (producto.ref === xmas) {
                // Crea el objeto JSON para el carrito
                const json = {
                    nombre: producto.nombre || "",
                    imagen: producto.imagen || "",
                    precio: producto.precio || "",
                    ref: producto.ref || "",
                    cantidad: 1
                };
                carro.push(json);
            }
        });
    }else{
        var a=1;
        carro.forEach(producto => {
            if (producto.ref === xmas) {
                producto.cantidad=producto.cantidad+1
                a=0
            }
        })
        if(a===1){
            productos[localStorage.getItem("categoria")].forEach(producto => {
                if (producto.ref === xmas) {
                    // Crea el objeto JSON para el carrito
                    const json = {
                        nombre: producto.nombre || "",
                        imagen: producto.imagen || "",
                        precio: producto.precio || "",
                        ref: producto.ref || "",
                        cantidad: 1
                    };
                    carro.push(json);
                }
            });
        }
    }
    localStorage.setItem("carro", JSON.stringify(carro));

    var longitud=0
    carro.forEach(producto => {
        if (producto.cantidad > 0) {
            longitud=producto.cantidad+longitud
        }
    })
    document.getElementById('carrito-cantidad').textContent = longitud;

    carro.forEach(producto => {
        document.querySelector('.'+producto.ref).innerHTML=producto.cantidad
    })
}

function restarCantidad(xmenos) {
    crear_carro()
    // Obtén el item del localStorage, conviértelo de JSON a un array, y usa un array vacío como valor predeterminado si es null
    const carro = JSON.parse(localStorage.getItem("carro") || "[]");
    // Verifica si el carrito está vacío
    if (carro.length === 0) {
        console.log("El carrito está vacío.")
    }else{
        carro.forEach(producto => {
            if (producto.ref === xmenos) {
                // Crea el objeto JSON para el carrito
                if(producto.cantidad>0){
                    producto.cantidad=producto.cantidad-1
                }
            }
        });
        localStorage.setItem("carro", JSON.stringify(carro));
    }

    var longitud=0
    carro.forEach(producto => {
        if (producto.cantidad > 0) {
            longitud=producto.cantidad+longitud
        }
    })
    document.getElementById('carrito-cantidad').textContent = longitud;
    
    carro.forEach(producto => {
        document.querySelector('.'+producto.ref).innerHTML=producto.cantidad
    })
}

//Formato para pesos:
// Número a formatear
function formato(num){
    const formatoPesos = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(num);
    const cadenaConPuntos = formatoPesos.replace(/,/g, '.');
    return cadenaConPuntos
}

function mostrarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';

    var total=0
    const carro = JSON.parse(localStorage.getItem("carro") || "[]");
    carro.forEach(item => {
        if(item.cantidad>0){
            const li = document.createElement('li');
            li.textContent = `🌟 ${item.nombre} - ${item.cantidad} x ${formato(item.precio)} = ${formato(item.cantidad * item.precio)}`;
            listaCarrito.appendChild(li);
            total=total+item.cantidad * item.precio
        }
    });

    document.getElementById('total').textContent = `Total: ${formato(total)}`;

    const carritoElement = document.getElementById('carrito');
    if (carro.length > 0) {
        if(carritoElement.style.display=='block'){
            carritoElement.style.display = 'none';
        }else{
            carritoElement.style.display = 'block';
        }
    } else {
        carritoElement.style.display = 'none';
    }
}

function enviarPedido() {
    let mensaje = `📲 ¡Hola! 🌟 Mi pedido es:\n\n`;
    var total=0
    const carro = JSON.parse(localStorage.getItem("carro") || "[]");
    carro.forEach(item => {
        mensaje += `🔅 ${item.nombre}:\n`;
        mensaje += `   📦${item.cantidad} 💰${formato(item.precio)}/u: 💲${formato(item.cantidad * item.precio)}\n\n`;
        total=total+item.cantidad * item.precio
    });

    mensaje += `✅ Total: *${formato(total)}*\n`;

    // Generar link de WhatsApp con el mensaje
    const linkWhatsApp = `https://wa.me/573163748711/?text=${encodeURIComponent(mensaje)}`;
    console.log(linkWhatsApp)
    // Abrir WhatsApp en una nueva ventana
    window.open(linkWhatsApp, '_blank');
}
