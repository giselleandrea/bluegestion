// Función para iniciar sesión
async function login(email, password) {
    try {
        console.log('Iniciando sesión con:', email, password);

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        if (data.token) {
            console.log('Token recibido:', data.token);
            localStorage.setItem('token', data.token);
            window.location.href = '/home';
        } else {
            console.error('Error en la respuesta del servidor:', data);
            alert('Inicio de sesión fallido. Por favor, inténtalo de nuevo.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error interno del servidor');
    }
}

// Llamar a la función de inicio de sesión cuando se envíe el formulario de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
});
