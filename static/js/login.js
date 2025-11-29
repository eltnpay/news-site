// ========== FORM VALIDATION ==========
const form = document.querySelector('.auth-form');

if (form) {
    form.addEventListener('submit', function(e) {
        const isValid = validateLoginForm();
        if (!isValid) {
            e.preventDefault();
            showFormError('Пожалуйста, заполните все поля');
        }
    });
}

function validateLoginForm() {
    const usernameInput = document.querySelector('input[name="username"]');
    const passwordInput = document.querySelector('input[name="password"]');
    let isValid = true;
    
    if (!usernameInput.value.trim()) {
        showFieldError(usernameInput, 'Введите имя пользователя');
        isValid = false;
    } else {
        clearFieldError(usernameInput);
    }
    
    if (!passwordInput.value.trim()) {
        showFieldError(passwordInput, 'Введите пароль');
        isValid = false;
    } else {
        clearFieldError(passwordInput);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.style.borderColor = '#ef4444';
    field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    
    let errorMsg = field.parentElement.querySelector('.error-message');
    if (!errorMsg) {
        errorMsg = document.createElement('span');
        errorMsg.className = 'error-message';
        errorMsg.style.cssText = `
            color: #ef4444;
            font-size: 0.85rem;
            margin-top: 0.25rem;
            display: block;
            animation: slideInLeft 0.3s ease;
        `;
        field.parentElement.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
}

function clearFieldError(field) {
    field.style.borderColor = 'rgba(99, 102, 241, 0.3)';
    field.style.boxShadow = 'none';
    
    const errorMsg = field.parentElement.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

function showFormError(message) {
    const alert = document.createElement('div');
    alert.style.cssText = `
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid #ef4444;
        color: #fca5a5;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        animation: slideInDown 0.3s ease;
    `;
    alert.textContent = message;
    
    const form = document.querySelector('.auth-form');
    form.parentElement.insertBefore(alert, form);
    
    setTimeout(() => {
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

// ========== INPUT FOCUS EFFECTS ==========
const inputs = document.querySelectorAll('.form-group input[type="text"], .form-group input[type="password"]');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = '#6366f1';
        this.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
    });
    
    input.addEventListener('blur', function() {
        this.style.borderColor = 'rgba(99, 102, 241, 0.3)';
        this.style.boxShadow = 'none';
    });
    
    input.style.transition = 'all 0.3s ease';
});

// ========== PASSWORD VISIBILITY TOGGLE ==========
function addPasswordToggle() {
    const passwordInput = document.querySelector('input[name="password"]');
    
    if (!passwordInput) return;
    
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.innerHTML = '👁️';
    toggleBtn.className = 'password-toggle';
    toggleBtn.style.cssText = `
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        color: #cbd5e1;
        transition: all 0.3s ease;
        padding: 0.5rem;
    `;
    
    const formGroup = passwordInput.parentElement;
    formGroup.style.position = 'relative';
    formGroup.appendChild(toggleBtn);
    
    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleBtn.innerHTML = '👁️‍🗨️';
        } else {
            passwordInput.type = 'password';
            toggleBtn.innerHTML = '👁️';
        }
    });
    
    toggleBtn.addEventListener('mouseover', () => {
        toggleBtn.style.color = '#6366f1';
        toggleBtn.style.transform = 'translateY(-50%) scale(1.2)';
    });
    
    toggleBtn.addEventListener('mouseout', () => {
        toggleBtn.style.color = '#cbd5e1';
        toggleBtn.style.transform = 'translateY(-50%) scale(1)';
    });
}

// ========== REMEMBER ME FUNCTIONALITY ==========
function initRememberMe() {
    const rememberCheckbox = document.querySelector('input[name="remember"]');
    const usernameInput = document.querySelector('input[name="username"]');
    
    if (!rememberCheckbox || !usernameInput) return;
    
    // Load saved username
    const savedUsername = localStorage.getItem('remembered_username');
    if (savedUsername) {
        usernameInput.value = savedUsername;
        rememberCheckbox.checked = true;
    }
    
    // Save on checkbox change
    rememberCheckbox.addEventListener('change', function() {
        if (this.checked) {
            localStorage.setItem('remembered_username', usernameInput.value);
        } else {
            localStorage.removeItem('remembered_username');
        }
    });
    
    // Update on input change
    usernameInput.addEventListener('input', function() {
        if (rememberCheckbox.checked) {
            localStorage.setItem('remembered_username', this.value);
        }
    });
}

// ========== SOCIAL AUTH BUTTONS ==========
function initSocialButtons() {
    const googleBtn = document.querySelector('.google-btn');
    const githubBtn = document.querySelector('.github-btn');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Google auth coming soon! 🚀');
        });
    }
    
    if (githubBtn) {
        githubBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('GitHub auth coming soon! 🚀');
        });
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: linear-gradient(135deg, #6366f1, #ec4899);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
        animation: slideInUp 0.3s ease;
        z-index: 1000;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ========== FORM SUBMISSION ANIMATION ==========
if (form) {
    form.addEventListener('submit', function() {
        const submitBtn = this.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.style.pointerEvents = 'none';
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Загрузка...';
            submitBtn.style.opacity = '0.7';
            
            // Reset after timeout if something goes wrong
            setTimeout(() => {
                submitBtn.style.pointerEvents = 'auto';
                submitBtn.textContent = originalText;
                submitBtn.style.opacity = '1';
            }, 5000);
        }
    });
}

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', (e) => {
    // Enter to submit
    if (e.key === 'Enter' && e.ctrlKey) {
        const form = document.querySelector('.auth-form');
        if (form) {
            form.submit();
        }
    }
    
    // Tab focus management
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ========== INPUT AUTOCOMPLETE STYLING ==========
const style = document.createElement('style');
style.textContent = `
    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px rgba(15, 23, 42, 0.8) inset !important;
        -webkit-text-fill-color: #f1f5f9 !important;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOutDown {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
`;
document.head.appendChild(style);

// ========== PAGE INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('Login page loaded');
    addPasswordToggle();
    initRememberMe();
    initSocialButtons();
});