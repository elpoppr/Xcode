let users = JSON.parse(localStorage.getItem('users')) || [];

// Animation for form switching
function animateFormSwitch(hideId, showId) {
    const hideForm = document.getElementById(hideId);
    const showForm = document.getElementById(showId);
    
    hideForm.classList.add('flip-leave-active');
    setTimeout(() => {
        hideForm.style.display = 'none';
        showForm.style.display = 'block';
        showForm.classList.add('flip-enter-active');
    }, 300);
}

document.getElementById('showRegister').addEventListener('click', (e) => {
    e.preventDefault();
    animateFormSwitch('loginForm', 'registerForm');
});

document.getElementById('showLogin').addEventListener('click', (e) => {
    e.preventDefault();
    animateFormSwitch('registerForm', 'loginForm');
});

// Enhanced registration
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newUsername = document.getElementById('newUsername').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();

    if (users.some(user => user.username === newUsername)) {
        showError('اسم المستخدم موجود مسبقًا!', 'registerForm');
        return;
    }

    users.push({ username: newUsername, password: newPassword });
    localStorage.setItem('users', JSON.stringify(users));
    
    showSuccess('تم إنشاء الحساب بنجاح!', 'registerForm');
    document.getElementById('registerForm').reset();
});

// Enhanced login with security checks
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const submitButton = document.querySelector('#loginForm button');
    const spinner = document.getElementById('loadingSpinner');

    submitButton.disabled = true;
    spinner.style.display = 'block';

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        showError('بيانات الدخول غير صحيحة!', 'loginForm');
        spinner.style.display = 'none';
        submitButton.disabled = false;
        return;
    }

    spinner.style.display = 'none';
    submitButton.innerHTML = 'تم الدخول بنجاح ?';
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.location.href = 'home.html';
});

// Helper functions
function showError(message, formId) {
    const form = document.getElementById(formId);
    let errorDiv = form.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        form.insertBefore(errorDiv, form.firstChild);
    }
    errorDiv.textContent = message;
    setTimeout(() => errorDiv.remove(), 3000);
}

function showSuccess(message, formId) {
    const form = document.getElementById(formId);
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        background: #d4edda;
        color: #155724;
        padding: 10px;
        margin: 10px 0;
        border-radius: 5px;
    `;
    form.insertBefore(successDiv, form.firstChild);
    setTimeout(() => successDiv.remove(), 3000);
}
