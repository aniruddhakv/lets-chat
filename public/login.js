document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const usernameOrEmail = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usernameOrEmail, password })
        });

        if (response.ok) {
            // Redirect to chat page upon successful login
            window.location.href = '/chat.html';
        } else {
            // Display alert if login fails
            alert('Invalid username/email or password');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
