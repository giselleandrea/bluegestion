document.getElementById("branchForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const requestData = {};
    formData.forEach((value, key) => {
        requestData[key] = value;
    });
    
    try {
        const response = await fetch("/branch/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });
        
        const data = await response.json();

        if (response.ok) {
            alert("Sucursal creada con exito")
            location.reload();
        } else {
            console.error("Error en la respuesta del servidor:", data);
            alert("Error al crear la sucursal. Por favor, inténtalo de nuevo.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error interno del servidor");
    }
});

//agregar sucursales a la tabla 
document.addEventListener('DOMContentLoaded', async () => {
    const branchList = document.getElementById('branchList');
    
    try {
        const response = await fetch('/branch/branches');
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch data');
        }

        const branchs = data.data;
        branchList.innerHTML = ''; 

        branchs.forEach(branch => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${branch.id}</td>
                <td>${branch.nameBranch}</td>
                <td>${branch.phoneBranch}</td>
                <td>${branch.neighborhoodBranch}</td>
                <td>${branch.address}</td>
                <td>${branch.nameContact}</td>
            `;
            branchList.appendChild(tr);
        });
    } catch (error) {
        console.error('Error:', error);
        // Muestra un mensaje de error en la lista de clientes
        branchList.innerHTML = `<tr><td colspan="7">Error al cargar los clientes: ${error.message}</td></tr>`;
    }
});