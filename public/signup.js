document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            // Redirect to login page if registration is successful
            window.location.href = '/login.html';
        } else {
           if(response.status===400){
            alert('Username or emial aleready exists')
           }
           else{
            alert('Signup failed')
           }
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
