document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;
        
        // Check credentials
        if (email === 'test@gmail.com' && password === 'test') {
            // Set a flag in sessionStorage to track login state
            sessionStorage.setItem('isLoggedIn', 'true');
            alert('Login successful!');
            window.location.href = 'index.html';
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });
    
    // Check login state when page loads
    if (!sessionStorage.getItem('isLoggedIn') && !window.location.href.includes('login.html')) {
        window.location.href = 'login.html';
    }
}); 