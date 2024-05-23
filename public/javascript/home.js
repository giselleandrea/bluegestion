// Función para obtener el token JWT del almacenamiento local
function getToken() {
    return localStorage.getItem('token');
}

// Función para realizar una solicitud GET a la ruta protegida '/home'
function fetchHome() {
    const token = getToken(); // Obtener el token JWT
    console.log('Token obtenido de localStorage:', token); 

    // Verificar si hay un token
    if (!token) {
        console.error('Token no encontrado');
        alert('Error Token no encontrado');
        window.location.href = "/login"; 
        return;
    }

    // Construir el encabezado de autorización con el token
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    // Realizar la solicitud GET a la ruta protegida '/home' con el encabezado de autorización
    fetch('/home', {
        method: 'GET',
        headers: headers
    })
    .then(response => {
        // Verificar si la respuesta es exitosa
        if (response.ok) {
            return response.json(); 
        } else if (response.status === 401) {
            console.error('Acceso no autorizado');
            alert('Acceso no autorizado');
            window.location.href = "/login";
        } else {
            throw new Error('Error al cargar la página de inicio');
        }
    })
    .then(data => {
        console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
        console.error('Error al cargar la página de inicio:', error);
    });
}

//Funcion LogOut
function logout() {
    window.location.href = '/logout';
}

// Llamar a la función fetchHome() cuando se cargue completamente la página
document.addEventListener('DOMContentLoaded', fetchHome);
