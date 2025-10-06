document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // CONFIGURACIÓN (ADAPTADA)
    // ----------------------------------------------------
    const URL_API = 'http://localhost:3000/api/senseis'; // <--- ¡Endpoint de Senseis!
    const form = document.getElementById('sensei-form');
    const senseiList = document.getElementById('senseis-list');

    // ----------------------------------------------------
    // FUNCIÓN PRINCIPAL: LEER SENSEIS (GET)
    // ----------------------------------------------------
    async function getSenseis() {
        try {
            const response = await fetch(URL_API);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const senseis = await response.json();
            renderSenseis(senseis); 
        } catch (error) {
            console.error('Error al obtener senseis:', error);
            senseiList.innerHTML = '<p style="color: red;">Error al conectar con el servidor (Node.js). Verifica el endpoint /api/senseis.</p>';
        }
    }

    // Función auxiliar para dibujar la lista (ADAPTADA)
    function renderSenseis(senseis) {
        senseiList.innerHTML = '';
        if (senseis.length === 0) {
            senseiList.innerHTML = '<p>No hay senseis registrados.</p>';
            return;
        }

        senseis.forEach(sensei => {
            const div = document.createElement('div');
            div.className = 'sensei-item';
            div.innerHTML = `
                <p><strong>Nombre:</strong> ${sensei.name} | <strong>Especialidad:</strong> ${sensei.specialty} | <strong>Rango:</strong> ${sensei.rank}</p>
                <button onclick="editSensei('${sensei._id}', '${sensei.name}', '${sensei.specialty}', '${sensei.rank}')">Editar</button>
                <button onclick="deleteSensei('${sensei._id}')">Eliminar</button>
            `;
            senseiList.appendChild(div);
        });
    }

    // ----------------------------------------------------
    // CREAR/ACTUALIZAR SENSEI (POST/PUT) (ADAPTADA)
    // ----------------------------------------------------
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        const id = document.getElementById('sensei-id').value; 
        
        // Construir el objeto con los campos del sensei (name, specialty, rank)
        const newSensei = {
            ...(id && {_id: id}), 
            name: document.getElementById('name').value,
            specialty: document.getElementById('specialty').value, 
            rank: document.getElementById('rank').value, 
        };
        
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${URL_API}/${id}` : URL_API;

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newSensei)
            });

            if (response.ok) {
                form.reset(); 
                document.getElementById('sensei-id').value = '';
                document.getElementById('submit-button').textContent = 'Guardar Sensei';
                getSenseis(); 
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
    
    window.editSensei = function(id, name, specialty, rank) {
        document.getElementById('sensei-id').value = id;
        document.getElementById('name').value = name;
        document.getElementById('specialty').value = specialty;
        document.getElementById('rank').value = rank;
        document.getElementById('submit-button').textContent = 'Actualizar Sensei';
        window.scrollTo(0, 0); 
    };

    window.deleteSensei = async function(id) {
        if (!confirm('¿Está seguro de que desea eliminar este sensei?')) return;
        try {
            const response = await fetch(`${URL_API}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                getSenseis(); 
                alert('Sensei eliminado con éxito!');
            } else {
                throw new Error('Fallo al eliminar.');
            }
        } catch (error) {
            console.error('Error al eliminar sensei:', error);
            alert('Error al eliminar: revise la consola.');
        }
    };

    // INICIO
    getSenseis(); 
});