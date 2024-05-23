// Código JavaScript para enviar los datos del formulario al servidor
document.getElementById("productForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const requestData = {};
    formData.forEach((value, key) => {
        requestData[key] = value;
    });

    try {
        const response = await fetch("/product/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();
        if (response.ok) {
            alert("Producto creado con exito")
            location.reload();
        } else {
            console.error("Error en la respuesta del servidor:", data);
            alert("Error al crear el producto. Por favor, inténtalo de nuevo.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error interno del servidor");
    }
});

//agregar productos a la tabla 
document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.getElementById('productList');
    
    try {
        const response = await fetch('/product/products');
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch data');
        }

        const products = data.data;
        productList.innerHTML = ''; 

        products.forEach(product => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${product.id}</td>
                <td>${product.nameProduct}</td>
                <td>${product.referenceProduct}</td>
                <td>${product.amountProduct}</td>
                <td>${product.description}</td>
                <td>${product.stock}</td>
                <td>${product.category.category}</td>
            `;
            productList.appendChild(tr);
        });
    } catch (error) {
        console.error('Error:', error);
        // Muestra un mensaje de error en la lista de Productos
        productList.innerHTML = `<tr><td colspan="7">Error al cargar los productos: ${error.message}</td></tr>`;
    }
});

//Buscador
document.getElementById('searchInput').addEventListener('keyup', function() {
    var filter = this.value.toLowerCase();
    var rows = document.querySelectorAll('#productTable tbody tr');
    rows.forEach(function(row) {
        var nameProduct = row.cells[1].textContent.toLowerCase();
        var referenceProduct = row.cells[2].textContent.toLowerCase();
        if (nameProduct.includes(filter) || referenceProduct.includes(filter)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});