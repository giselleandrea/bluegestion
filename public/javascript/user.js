document.getElementById("userForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const requestData = {};
    formData.forEach((value, key) => {
        requestData[key] = value;
    });
    
    try {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });
        
        const data = await response.json();

        if (response.ok) {
            window.location.href = "/home";
        } else {
            console.error("Error en la respuesta del servidor:", data);
            alert("Error al crear el usuario. Por favor, inténtalo de nuevo.");
        }

        alert(data.message);
    } catch (error) {
        console.error("Error:", error);
        alert("Error interno del servidor");
    }
});