document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;
        
        // Check credentials
        if (email === 'test@gmail.com' && password === 'test') {
            alert('Login successful!');
            window.location.href = 'index.html';
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });
}); 