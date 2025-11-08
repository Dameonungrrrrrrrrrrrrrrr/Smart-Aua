let currentUser = null;
let users = JSON.parse(localStorage.getItem('smartAuaUsers')) || [];
let currentCaptcha = '';

function generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('captchaText').textContent = captcha;
    currentCaptcha = captcha;
    return captcha;
}

function showLogin() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
}

function showRegister() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
    generateCaptcha();
}

function register() {
    const lastName = document.getElementById('regLastName').value;
    const firstName = document.getElementById('regFirstName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const district = document.getElementById('regDistrict').value;
    const captchaInput = document.getElementById('captchaInput').value;

    if (!lastName || !firstName || !email || !password || !confirmPassword || !district) {
        alert('Барлық өрістерді толтырыңыз');
        return;
    }

    if (password !== confirmPassword) {
        alert('Құпия сөздер сәйкес келмейді');
        return;
    }

    if (captchaInput !== currentCaptcha) {
        alert('CAPTCHA қате');
        generateCaptcha();
        return;
    }

    if (users.find(user => user.email === email)) {
        alert('Бұл email бойынша тіркелген пайдаланушы бар');
        return;
    }

    const newUser = {
        id: Date.now().toString(),
        lastName,
        firstName,
        email,
        password,
        district,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('smartAuaUsers', JSON.stringify(users));

    alert('Тіркелу сәтті аяқталды! Енді жүйеге кіре аласыз.');
    showLogin();
    clearRegisterForm();
}

function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showDashboard();
    } else {
        alert('Email немесе құпия сөз қате');
    }
}

function loginWithGoogle() {
    alert('Google кіру әзірлеу процесінде. Қазір тіркеліп, кіріңіз.');
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showHero();
}

function showHero() {
    document.getElementById('hero').classList.remove('hidden');
    document.getElementById('dashboard').classList.add('hidden');
}

function showDashboard() {
    document.getElementById('hero').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    updateDashboard();
}

function updateDashboard() {
    if (currentUser) {
        document.getElementById('userWelcome').textContent = 
            `${currentUser.lastName} ${currentUser.firstName}`;
        document.getElementById('userLocation').textContent = 
            `${getDistrictName(currentUser.district)} ауданы`;
    }
}

function getDistrictName(districtKey) {
    const districts = {
        'aral': 'Арал',
        'karmakshy': 'Қармақшы',
        'zhalagash': 'Жалағаш',
        'zhanakorgan': 'Жаңақорған',
        'syrdarya': 'Сырдария',
        'kazaly': 'Қазалы',
        'shieli': 'Шиелі'
    };
    return districts[districtKey] || districtKey;
}

function clearRegisterForm() {
    document.getElementById('regLastName').value = '';
    document.getElementById('regFirstName').value = '';
    document.getElementById('regEmail').value = '';
    document.getElementById('regPassword').value = '';
    document.getElementById('regConfirmPassword').value = '';
    document.getElementById('regDistrict').value = '';
    document.getElementById('captchaInput').value = '';
}

function checkAuthStatus() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showDashboard();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    generateCaptcha();
});