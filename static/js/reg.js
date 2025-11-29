// ========== FORM VALIDATION ==========
const form = document.querySelector('.auth-form');

if (form) {
    form.addEventListener('submit', function(e) {
        const isValid = validateForm();
        if (!isValid) {
            e.preventDefault();
            showFormError('Пожалуйста, исправьте ошибки в форме');
        }
    });
}

function validateForm() {
    const inputs = document.querySelectorAll('.auth-form input');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showFieldError(input, 'Это поле обязательно');
            isValid = false;
        } else {
            clearFieldError(input);
        }
        
        if (input.type === 'email' && input.value) {
            if (!isValidEmail(input.value)) {
                showFieldError(input, 'Введите корректный email');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

// ========== FORM FIELDS ANIMATION ==========
const inputs = document.querySelectorAll('.form-group input');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateX(-5px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateX(0)';
    });
    
    input.style.transition = 'all 0.3s ease';
    input.parentElement.style.transition = 'transform 0.3s ease';
});

// ========== PASSWORD STRENGTH INDICATOR ==========
function addPasswordStrengthIndicator() {
    const passwordInput = document.querySelector('input[type="password"]:first-of-type');
    
    if (!passwordInput) return;
    
    const strengthIndicator = document.createElement('div');
    strengthIndicator.className = 'password-strength';
    strengthIndicator.style.cssText = `
        margin-top: 0.5rem;
        height: 4px;
        border-radius: 2px;
        background: rgba(99, 102, 241, 0.1);
        overflow: hidden;
    `;
    
    const strengthBar = document.createElement('div');
    strengthBar.style.cssText = `
        height: 100%;
        width: 0%;
        transition: all 0.3s ease;
        border-radius: 2px;
    `;
    
    strengthIndicator.appendChild(strengthBar);
    passwordInput.parentElement.appendChild(strengthIndicator);
    
    const strengthText = document.createElement('p');
    strengthText.style.cssText = `
        font-size: 0.8rem;
        margin-top: 0.25rem;
        color: #cbd5e1;
    `;
    strengthIndicator.parentElement.appendChild(strengthText);
    
    passwordInput.addEventListener('input', function() {
        const strength = calculatePasswordStrength(this.value);
        updateStrengthIndicator(strength, strengthBar, strengthText);
    });
}

function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    return Math.min(strength, 4);
}

function updateStrengthIndicator(strength, bar, text) {
    const strengths = [
        { width: '25%', color: '#ef4444', label: 'Слабый пароль' },
        { width: '50%', color: '#f59e0b', label: 'Средний пароль' },
        { width: '75%', color: '#eab308', label: 'Хороший пароль' },
        { width: '100%', color: '#10b981', label: 'Сильный пароль' }
    ];
    
    if (strength > 0) {
        const current = strengths[strength - 1];
        bar.style.width = current.width;
        bar.style.background = current.color;
        text.textContent = current.label;
        text.style.color = current.color;
    } else {
        bar.style.width = '0%';
        text.textContent = '';
    }
}

// ========== SHOW/HIDE PASSWORD ==========
function addPasswordToggle() {
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    passwordInputs.forEach(input => {
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.innerHTML = '👁️';
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
        `;
        
        input.parentElement.style.position = 'relative';
        input.parentElement.appendChild(toggleBtn);
        
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (input.type === 'password') {
                input.type = 'text';
                toggleBtn.innerHTML = '👁️‍🗨️';
            } else {
                input.type = 'password';
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
    });
}

// ========== FORM SUBMISSION ANIMATION ==========
if (form) {
    form.addEventListener('submit', function() {
        const submitBtn = this.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.style.pointerEvents = 'none';
            submitBtn.innerHTML = 'Загрузка...';
            submitBtn.style.opacity = '0.6';
        }
    });
}

// ========== INPUT FOCUS EFFECTS ==========
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = '#6366f1';
        this.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
    });
    
    input.addEventListener('blur', function() {
        this.style.borderColor = 'rgba(99, 102, 241, 0.3)';
        this.style.boxShadow = 'none';
    });
});

// ========== PREVENT AUTO-COMPLETE STYLING ==========
const style = document.createElement('style');
style.textContent = `
    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px rgba(15, 23, 42, 0.8) inset !important;
        -webkit-text-fill-color: #f1f5f9 !important;
    }
`;
document.head.appendChild(style);

// ========== PAGE INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('Registration page loaded');
    addPasswordStrengthIndicator();
    addPasswordToggle();
});