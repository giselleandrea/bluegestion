document.addEventListener('DOMContentLoaded', function() {
    fetch('/customer/customers')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(result => {
            if (!result.success) {
                throw new Error('Error en la respuesta de la API');
            }

            const customerSelect = document.getElementById('customerSelect');
            const data = result.data;

            data.forEach(customer => {
                const option = document.createElement('option');
                option.value = customer.id;
                option.textContent = customer.nameCustomer;
                customerSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al obtener los clientes:', error);
            alert('Error al cargar los clientes. Por favor, inténtalo de nuevo.');
        });

    fetch('/product/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(result => {
            if (!result.success) {
                throw new Error('Error en la respuesta de la API');
            }

            const productSelect = document.createElement('select');
            const data = result.data;

            data.forEach(product => {
                const option = document.createElement('option');
                option.value = product.id;
                option.textContent = product.nameProduct;
                productSelect.appendChild(option);
            });

            const productEntriesContainer = document.getElementById('productEntriesContainer');
            const addProductButton = document.getElementById('addProductButton');

            addProductButton.addEventListener('click', () => {
                const productEntry = document.createElement('div');
                productEntry.classList.add('product-entry');

                const productSelectClone = productSelect.cloneNode(true);
                const productQuantity = document.createElement('input');
                productQuantity.type = 'number';
                productQuantity.placeholder = 'Cantidad';
                productQuantity.min = '1';

                const removeButton = document.createElement('button');
                removeButton.textContent = 'Eliminar';
                removeButton.addEventListener('click', () => {
                    productEntriesContainer.removeChild(productEntry);
                });

                productEntry.appendChild(productSelectClone);
                productEntry.appendChild(productQuantity);
                productEntry.appendChild(removeButton);

                productEntriesContainer.appendChild(productEntry);
            });
        })
        .catch(error => {
            console.error('Error al obtener los productos:', error);
            alert('Error al cargar los productos. Por favor, inténtalo de nuevo.');
        });
});

document.getElementById('orderForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const referenceOrder = document.getElementById('referenceOrder').value;
    const statusOrder = document.getElementById('statusOrder').value;
    const totalAmount = document.getElementById('totalAmount').value;
    const customerId = document.getElementById('customerSelect').value;

    const productEntries = document.querySelectorAll('.product-entry');
    const productIds = Array.from(productEntries).map(entry => {
        return {
            productId: entry.querySelector('select').value,
            cant: entry.querySelector('input').value
        };
    });

    try {
        const token = localStorage.getItem("token");

        const response = await fetch('/order/create', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                referenceOrder,
                statusOrder,
                totalAmount,
                customerId,
                productIds
            })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Orden creada correctamente');
            location.reload();
        } else {
            console.error('Error en la respuesta del servidor:', data);
            alert('Error al crear la orden. Por favor, inténtalo de nuevo.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al procesar los datos. Por favor, asegúrate de ingresar la información correctamente.');
    }
});

//agregar ordenes a la tabla. 
document.addEventListener('DOMContentLoaded', async () => {
    const orderList = document.getElementById('orderList');
    
    try {
        const response = await fetch('/order/orders');
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch data');
        }

        const orders = data.data;
        orderList.innerHTML = ''; 

        orders.forEach(orderData => {
            const { order, orderProducts } = orderData;
            const orderRow = document.createElement('tr');

            // Lista de opciones de estado
            const statusOptions = [
                "Pendiente", 
                "Procesando", 
                "Completada", 
                "Cancelada",
                "Recibida"
            ];

            orderRow.innerHTML = `
                <td>${order.referenceOrder}</td>
                <td>
                    <select class="status-select" data-order-id="${order.id}">
                        ${statusOptions.map(status => `
                            <option value="${status}" ${status === order.statusOrder ? 'selected' : ''}>${status}</option>
                        `).join('')}
                    </select>
                </td>
                <td>$ ${order.totalAmount}</td>
                <td>${order.customer.nameCustomer}</td>
                <td>${order.customer.email}</td>
                <td>${new Date(order.created_at).toLocaleString()}</td>
                <td>
                    <button class="toggle-products" data-order-id="${order.id}">Ver Productos</button>
                </td>
            `;
            orderList.appendChild(orderRow);

            // Fila de los productos
            const productRow = document.createElement('tr');
            productRow.style.display = 'none';
            productRow.dataset.orderId = order.id;

            productRow.innerHTML = `
                <td colspan="7">
                    <table class="product-table">
                        <thead>
                            <tr>
                                <th>Referencia</th>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orderProducts.map(op => `
                                <tr>
                                    <td>${op.product.referenceProduct}</td>
                                    <td>${op.product.nameProduct}</td>
                                    <td>${op.cant}</td>
                                    <td>${op.product.description}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </td>
            `;
            orderList.appendChild(productRow);
        });

        // Event listener para mostrar/ocultar productos
        orderList.addEventListener('click', (e) => {
            if (e.target.classList.contains('toggle-products')) {
                const orderId = e.target.dataset.orderId;
                const productRow = orderList.querySelector(`tr[data-order-id="${orderId}"]`);
                productRow.style.display = productRow.style.display === 'none' ? 'table-row' : 'none';
            }
        });

        // Añadir event listener para cambios en el select
        document.querySelectorAll('.status-select').forEach(select => {
            select.addEventListener('change', async function() {
                const orderId = this.getAttribute('data-order-id');
                const newStatus = this.value;

                try {
                    const response = await fetch('/order/status', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            order_id: orderId,
                            statusOrder: newStatus
                        })
                    });

                    const result = await response.json();

                    if (!response.ok) {
                        throw new Error(result.message || 'Failed to update status');
                    }

                    alert('Estado de la orden actualizado correctamente');
                    location.reload();
                } catch (error) {
                    console.error('Error:', error);
                    alert('Error al actualizar el estado de la orden: ' + error.message);
                }
            });
        });
        
        //Buscador
        document.getElementById('searchInput').addEventListener('keyup', function() {
            var filter = this.value.toLowerCase();
            var rows = document.querySelectorAll('#orderTable tbody tr');

            rows.forEach(function(row) {
                if (row.dataset.orderId) {
                    // Row es una fila de productos
                    var cells = row.querySelectorAll('td');
                    var match = false;

                    cells.forEach(function(cell) {
                        if (cell.textContent.toLowerCase().includes(filter)) {
                            match = true;
                        }
                    });

                    if (match) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                } else {
                    // Row es una fila de orden
                    var cells = row.querySelectorAll('td');
                    var match = false;

                    cells.forEach(function(cell) {
                        if (cell.textContent.toLowerCase().includes(filter)) {
                            match = true;
                        }
                    });

                    const toggleButton = row.querySelector('.toggle-products');

                    if (toggleButton) {
                        const orderId = toggleButton.dataset.orderId;
                        const productRow = document.querySelector(`tr[data-order-id="${orderId}"]`);

                        if (match) {
                            row.style.display = '';
                            productRow.style.display = '';
                        } else {
                            row.style.display = 'none';
                            productRow.style.display = 'none';
                        }
                    }
                }
            });
        });

    } catch (error) {
        console.error('Error:', error);
        // Muestra un mensaje de error en la lista de ordenes
        orderList.innerHTML = `<tr><td colspan="7">Error al cargar los ordenes: ${error.message}</td></tr>`;
    }
});

