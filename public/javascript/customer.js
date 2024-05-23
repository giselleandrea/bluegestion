document.addEventListener('DOMContentLoaded', function() {
    fetch('/branch/branches') // URL de la consulta GET
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(result => {
            // Verifica si la respuesta tiene éxito
            if (!result.success) {
                throw new Error('Error en la respuesta de la API');
            }

            /*// Agregar una opción por defecto
            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Seleccione";
            categorySelect.appendChild(defaultOption);*/

            const data = result.data; // Obtén la lista de sucursales
            const listaDesplegable = document.getElementById('listaDesplegable');

            data.forEach(branch => {
                const option = document.createElement('option');
                option.value = branch.id;
                option.textContent = branch.nameBranch;
                listaDesplegable.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al obtener las sucursales:', error);
            alert('Error al cargar las sucursales. Por favor, inténtalo de nuevo.');
        });
});

// Código JavaScript para enviar los datos del formulario al servidor
document.getElementById("customerForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const requestData = {};
    formData.forEach((value, key) => {
        requestData[key] = value;
    });

    try {
        const response = await fetch("/customer/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();

        if (response.ok) {
            alert("Cliente creado con exito")
            location.reload();
        } else {
            console.error("Error en la respuesta del servidor:", data);
            alert("Error al crear el cliente. Por favor, inténtalo de nuevo.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error interno del servidor");
    }
});

//agregar clientes a na tabla 
document.addEventListener('DOMContentLoaded', async () => {
    const customerList = document.getElementById('customerList');
    
    try {
        const response = await fetch('/customer/customers');
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch data');
        }

        const customers = data.data;
        customerList.innerHTML = ''; 

        customers.forEach(customer => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.nameCustomer}</td>
                <td>${customer.phoneCustomer}</td>
                <td>${customer.neighborhoodCustomer}</td>
                <td>${customer.address}</td>
                <td>${customer.email}</td>
                <td>${customer.branch.nameBranch}</td>
            `;
            customerList.appendChild(tr);
        });
    } catch (error) {
        console.error('Error:', error);
        // Muestra un mensaje de error en la lista de clientes
        customerList.innerHTML = `<tr><td colspan="7">Error al cargar los clientes: ${error.message}</td></tr>`;
    }
});
