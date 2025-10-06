document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // CONFIGURACIÓN (ADAPTADA)
    // ----------------------------------------------------
    const URL_API = 'http://localhost:3000/api/admins'; // <--- ¡Endpoint de Admins!
    const form = document.getElementById('admin-form');
    const adminList = document.getElementById('admins-list');

    // ----------------------------------------------------
    // FUNCIÓN PRINCIPAL: LEER ADMINS (GET)
    // ----------------------------------------------------
    async function getAdmins() {
        try {
            const response = await fetch(URL_API);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const admins = await response.json();
            renderAdmins(admins); 
        } catch (error) {
            console.error('Error al obtener administradores:', error);
            adminList.innerHTML = '<p style="color: red;">Error al conectar con el servidor (Node.js). Verifica el endpoint /api/admins.</p>';
        }
    }

    // Función auxiliar para dibujar la lista (ADAPTADA)
    function renderAdmins(admins) {
        adminList.innerHTML = '';
        if (admins.length === 0) {
            adminList.innerHTML = '<p>No hay administradores registrados.</p>';
            return;
        }

        admins.forEach(admin => {
            const div = document.createElement('div');
            div.className = 'admin-item';
            div.innerHTML = `
                <p><strong>Usuario:</strong> ${admin.username} | <strong>ID:</strong> ${admin._id}</p>
                <button onclick="editAdmin('${admin._id}', '${admin.username}', '')">Editar</button>
                <button onclick="deleteAdmin('${admin._id}')">Eliminar</button>
            `;
            adminList.appendChild(div);
        });
    }

    // ----------------------------------------------------
    // CREAR/ACTUALIZAR ADMIN (POST/PUT) (ADAPTADA)
    // ----------------------------------------------------
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        const id = document.getElementById('admin-id').value; 
        
        // Construir el objeto con los campos del admin
        const newAdmin = {
            ...(id && {_id: id}), 
            username: document.getElementById('username').value,
            key: document.getElementById('key').value, 
        };
        
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${URL_API}/${id}` : URL_API;

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newAdmin)
            });

            if (response.ok) {
                form.reset(); 
                document.getElementById('admin-id').value = '';
                document.getElementById('submit-button').textContent = 'Guardar Admin';
                getAdmins(); 
                alert('¡Operación realizada con éxito!');
            } else {
                const errorData = await response.json(); 
                console.error('Error del Servidor:', errorData.details || errorData.error);
                alert('Fallo en la operación: revise la consola y la conexión al backend.');
            }
        } catch (error) {
            console.error('Error de red/conexión:', error);
            alert('Error al guardar: revise la consola y la conexión al backend.');
        }
    });

    // ----------------------------------------------------
    // FUNCIONES GLOBALES (ACCIONES EN BOTONES) (ADAPTADA)
    // ----------------------------------------------------
    
    // NOTA: Cuando editamos, no precargamos el campo 'key' (seguridad)
    window.editAdmin = function(id, username) { 
        document.getElementById('admin-id').value = id;
        document.getElementById('username').value = username;
        document.getElementById('key').value = ''; // Deja la clave vacía por seguridad, obligando a reescribirla si se desea
        document.getElementById('submit-button').textContent = 'Actualizar Admin';
        window.scrollTo(0, 0); 
    };

    window.deleteAdmin = async function(id) {
        if (!confirm('¿Está seguro de que desea eliminar este administrador?')) return;
        try {
            const response = await fetch(`${URL_API}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                getAdmins(); 
                alert('Administrador eliminado con éxito!');
            } else {
                throw new Error('Fallo al eliminar.');
            }
        } catch (error) {
            console.error('Error al eliminar administrador:', error);
            alert('Error al eliminar: revise la consola.');
        }
    };

    // INICIO
    getAdmins(); 
});