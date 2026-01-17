document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const responseDiv = document.getElementById('formResponse');
    const submitBtn = document.getElementById('submitBtn');
    
    // 1. Validación Honeypot (Anti-Spam básico en cliente)
    const honeypot = document.getElementById('honeypot').value;
    if (honeypot) { 
        console.log('Bot detectado'); 
        return; 
    }

    const reasonMap = {
            General: 'INFORMACION_GENERAL',
            Esencial: 'PREMIUM',
            Palazzo: 'PALAZZO',
            Imperial: 'IMPERIAL'
        }

    // Preparar datos
    const formData = {
        full_name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone_number: document.getElementById('phone').value,
        reason: reasonMap[document.getElementById('package').value],
        message: document.getElementById('message').value
    };
    console.log(document.getElementById('package').value);

    // Deshabilitar botón para evitar doble click
    submitBtn.disabled = true;
    submitBtn.innerText = "Enviando...";

    try {
        const response = await fetch('http://localhost:8000/api/public/contact/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'X-CSRFToken': ... (Si estuvieras en el mismo dominio de Django, pero como es landing separada o API pública, suele no ser necesario si configuras CORS bien)
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            responseDiv.innerText = "¡Gracias! Hemos recibido tu mensaje.";
            responseDiv.className = "text-center text-green-600 font-bold mt-4 block";
            document.getElementById('contactForm').reset();
        } else {
            // Manejo de errores de validación (Ej: Email duplicado)
            let errorMsg = "Hubo un error al enviar.";
            
            if (data.email) errorMsg = data.email[0]; // "Este correo ya ha sido registrado"
            else if (data.phone_number) errorMsg = data.phone_number[0];

            responseDiv.innerText = errorMsg;
            responseDiv.className = "text-center text-red-500 font-bold mt-4 block";
            submitBtn.disabled = false;
            submitBtn.innerText = "Enviar Mensaje";
        }

    } catch (error) {
        console.error('Error:', error);
        responseDiv.innerText = "Error de conexión. Intenta de nuevo.";
        responseDiv.className = "text-center text-red-500 font-bold mt-4 block";
        submitBtn.disabled = false;
        submitBtn.innerText = "Enviar Mensaje";
    }
});