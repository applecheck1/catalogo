
document.addEventListener("DOMContentLoaded", function() {
    const productosContainer = document.getElementById("productos-container");
    // Iterar sobre los productos de la categoría "cargadores"
    productos["audifonos"].forEach(producto => {
        const productoElement = document.createElement("div");
        productoElement.classList.add("col-md-6", "col-lg-4", "mb-1");
        productoElement.innerHTML = `
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="Imagen de ${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title font-weight-bold mb-1">${producto.nombre}</h5>
                    <p class="precio">Precio: $${producto.precio.toFixed(2)}</p>
                </div>
            </div>
        `;

        productosContainer.appendChild(productoElement);
    });
});
