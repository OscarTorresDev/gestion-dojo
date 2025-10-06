document.addEventListener('DOMContentLoaded', () => {
    const URL_API = 'http://localhost:3000/api/students'; 
    const form = document.getElementById('student-form');
    const studentList = document.getElementById('students-list');

    // FUNCIÓN PRINCIPAL: LEER ESTUDIANTES (GET)
    async function getStudents() {
        try {
            const response = await fetch(URL_API);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const students = await response.json();
            renderStudents(students); 
        } catch (error) {
            console.error('Error al obtener estudiantes:', error);
            studentList.innerHTML = '<p style="color: red;">Error al conectar con el servidor (Node.js). Verifica que esté corriendo en el puerto 3000.</p>';
        }
    }

    // Función auxiliar para dibujar la lista
    function renderStudents(students) {
        studentList.innerHTML = '';
        if (students.length === 0) {
            studentList.innerHTML = '<p>No hay estudiantes registrados. ¡Usa el formulario para agregar uno!</p>';
            return;
        }

        students.forEach(student => {
            const div = document.createElement('div');
            div.className = 'student-item';
            div.innerHTML = `
                <p><strong>Nombre:</strong> ${student.name} | <strong>Curso:</strong> ${student.course} | <strong>Nota:</strong> ${student.grade}</p>
                <button onclick="editStudent('${student._id}', '${student.name}', ${student.age}, '${student.course}', ${student.grade})">Editar</button>
                <button onclick="deleteStudent('${student._id}')">Eliminar</button>
            `;
            studentList.appendChild(div);
        });
    }

    // CREAR/ACTUALIZAR ESTUDIANTE (POST/PUT)
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        // CORRECCIÓN CLAVE: Obtener 'id' del campo oculto
        const id = document.getElementById('student-id').value; 
        
        // Objeto con los datos del formulario
        const newStudent = {
            ...(id && {_id: id}), 
            name: document.getElementById('name').value,
            // Asegurarse de convertir a número; Mongoose validará si es 'required'
            age: parseInt(document.getElementById('age').value), 
            course: document.getElementById('course').value,
            grade: parseFloat(document.getElementById('grade').value) 
        };
        
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${URL_API}/${id}` : URL_API;

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newStudent)
            });

            if (response.ok) {
                // ÉXITO: Limpiar y recargar
                form.reset(); 
                document.getElementById('student-id').value = '';
                document.getElementById('submit-button').textContent = 'Guardar Estudiante';
                getStudents(); 
                alert('¡Operación realizada con éxito!');

            } else {
                // FALLO: Error de validación (400) o interno (500)
                const errorData = await response.json(); 
                console.error('Error del Servidor:', errorData.details || errorData.error);
                alert('Fallo en la operación: revise la consola y el backend.');
            }
        } catch (error) {
            // Este catch solo se ejecuta por errores de red (servidor apagado, etc.)
            console.error('Error de red/conexión:', error);
            alert('Error al guardar: revise la consola y la conexión al backend.');
        }
    });

    // FUNCIONES GLOBALES (Editar y Eliminar)
    window.editStudent = function(id, name, age, course, grade) {
        document.getElementById('student-id').value = id;
        document.getElementById('name').value = name;
        document.getElementById('age').value = age;
        document.getElementById('course').value = course;
        document.getElementById('grade').value = grade;
        document.getElementById('submit-button').textContent = 'Actualizar Estudiante';
        window.scrollTo(0, 0); 
    };

    window.deleteStudent = async function(id) {
        if (!confirm('¿Está seguro de que desea eliminar este estudiante?')) return;
        try {
            const response = await fetch(`${URL_API}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                getStudents(); 
                alert('Estudiante eliminado con éxito!');
            } else {
                throw new Error('Fallo al eliminar.');
            }
        } catch (error) {
            console.error('Error al eliminar estudiante:', error);
            alert('Error al eliminar: revise la consola.');
        }
    };

    // INICIO
    getStudents(); 
});