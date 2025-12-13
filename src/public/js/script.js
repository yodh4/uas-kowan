document.getElementById('registerButton').addEventListener('click', register);
document.getElementById('loginButton').addEventListener('click', login);


function showMessage(message, isError = false) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.style.color = isError ? 'red' : 'green';
}

async function register() {
    // Retrieve the username from the input field
    const username = document.getElementById('username').value;

    try {
        // Get registration options from your server. Here, we also receive the challenge.
        const response = await fetch('/api/passkey/registerStart', {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: username})
        });
        console.log(response)

        // Check if the registration options are ok.
        if (!response.ok) {
            throw new Error('User already exists or failed to get registration options from server');
        }

        // Convert the registration options to JSON.
        const options = await response.json();
        console.log(options)

        // This triggers the browser to display the passkey / WebAuthn modal (e.g. Face ID, Touch ID, Windows Hello).
        // A new attestation is created. This also means a new public-private-key pair is created.
        const attestationResponse = await SimpleWebAuthnBrowser.startRegistration(options);

        // Send attestationResponse back to server for verification and storage.
        const verificationResponse = await fetch('/api/passkey/registerFinish', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(attestationResponse)
        });

        if (verificationResponse.ok) {
            showMessage('Registration successful');
        } else {
            showMessage('Registration failed', true);
        }
    } catch
        (error) {
        showMessage('Error: ' + error.message, true);
    }
}

async function login() {
    // Retrieve the username from the input field
    const username = document.getElementById('username').value;

    try {
        // Get login options from your server. Here, we also receive the challenge.
        const response = await fetch('/api/passkey/loginStart', {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: username})
        });
        // Check if the login options are ok.
        if (!response.ok) {
            throw new Error('Failed to get login options from server');
        }
        // Convert the login options to JSON.
        const options = await response.json();
        console.log(options)

        // This triggers the browser to display the passkey / WebAuthn modal (e.g. Face ID, Touch ID, Windows Hello).
        // A new assertionResponse is created. This also means that the challenge has been signed.
        const assertionResponse = await SimpleWebAuthnBrowser.startAuthentication(options);

        // Send assertionResponse back to server for verification.
        const verificationResponse = await fetch('/api/passkey/loginFinish', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(assertionResponse)
        });

        if (verificationResponse.ok) {
            showMessage('Login successful');
            document.getElementById('auth-section').style.display = 'none';
            document.getElementById('calculator-section').style.display = 'block';
        } else {
            showMessage('Login failed', true);
        }
    } catch (error) {
        showMessage('Error: ' + error.message, true);
    }
}

// Listener untuk tombol hitung
document.getElementById('calculateButton').addEventListener('click', calculateCircle);

async function calculateCircle() {
    const radius = document.getElementById('radius').value;
    
    try {
        const response = await fetch('/api/passkey/calculate', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ radius: radius })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('result').innerHTML = `
                <p><strong>Jari-jari:</strong> ${data.radius}</p>
                <p><strong>Luas:</strong> ${data.area}</p>
                <p><strong>Keliling:</strong> ${data.circumference}</p>
            `;
            showMessage('Perhitungan berhasil', false);
        } else {
            showMessage(data.error || 'Gagal menghitung', true);
        }
    } catch (error) {
        showMessage('Error: ' + error.message, true);
    }
}