function getAnalyticsContent() {
    return `
        <div class="section">
            <h3>Су пайдалану аналитикасы</h3>
            <div class="chart-container">
                <canvas id="waterUsageChart" width="400" height="200"></canvas>
            </div>
            <div class="analytics-grid">
                <div class="analytics-card">
                    <h4>Су деңгейі: Сырдария</h4>
                    <div class="water-level">+15 см</div>
                    <p>Соңғы 24 сағатта</p>
                </div>
                <div class="analytics-card">
                    <h4>Жауын-шашын болжамы</h4>
                    <div class="rain-forecast">20% мүмкіндік</div>
                    <p>Келесі 3 күнде</p>
                </div>
                <div class="analytics-card">
                    <h4>Топырақ ылғалдылығы</h4>
                    <div class="soil-moisture">65%</div>
                    <p>Орташа көрсеткіш</p>
                </div>
            </div>
        </div>
        <div class="section">
            <h3>Аудан бойынша су қолжетімділігі</h3>
            <div id="districtMap" class="district-map">
                <div class="map-container">
                    <div class="map-region" data-region="aral">Арал: 75%</div>
                    <div class="map-region" data-region="karmakshy">Қармақшы: 85%</div>
                    <div class="map-region" data-region="zhalagash">Жалағаш: 60%</div>
                    <div class="map-region" data-region="zhanakorgan">Жаңақорған: 90%</div>
                    <div class="map-region" data-region="syrdarya">Сырдария: 95%</div>
                    <div class="map-region" data-region="kazaly">Қазалы: 70%</div>
                    <div class="map-region" data-region="shieli">Шиелі: 80%</div>
                </div>
            </div>
        </div>
    `;
}

function initAnalyticsChart() {
    const ctx = document.getElementById('waterUsageChart');
    if (!ctx) return;
    
    const canvas = ctx.getContext('2d');
    const width = ctx.width;
    const height = ctx.height;
    
    canvas.clearRect(0, 0, width, height);
    
    const data = [1200, 1900, 1500, 1800];
    const maxData = Math.max(...data);
    const barWidth = 60;
    const spacing = 30;
    
    data.forEach((value, index) => {
        const barHeight = (value / maxData) * 150;
        const x = index * (barWidth + spacing) + 50;
        const y = height - barHeight - 50;
        
        canvas.fillStyle = '#2c5530';
        canvas.fillRect(x, y, barWidth, barHeight);
        
        canvas.fillStyle = '#333';
        canvas.font = '12px Inter';
        canvas.fillText(value.toString(), x + 10, y - 10);
        canvas.fillText(['1-ші', '2-ші', '3-ші', '4-ші'][index] + ' апта', x + 5, height - 20);
    });
}

function getCoursesContent() {
    return `
        <div class="section">
            <h3>Agro-Edu Курстар</h3>
            <div class="courses-grid">
                <div class="course-card">
                    <h4>Су үнемдеуші егіншілік негіздері</h4>
                    <p>Негізгі әдістер мен техникалар</p>
                    <div class="course-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 30%"></div>
                        </div>
                        <span>30% аяқталды</span>
                    </div>
                    <button class="btn-primary" onclick="startCourse('water-saving')">Жалғастыру</button>
                </div>
                <div class="course-card">
                    <h4>Тамшылы суғаруды енгізу</h4>
                    <p>Заманауи суғару технологиялары</p>
                    <div class="course-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 0%"></div>
                        </div>
                        <span>Бастау</span>
                    </div>
                    <button class="btn-primary" onclick="startCourse('drip-irrigation')">Бастау</button>
                </div>
                <div class="course-card">
                    <h4>Құрғақшылыққа бейімделу</h4>
                    <p>Экстремалды жағдайларда егіншілік</p>
                    <div class="course-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 75%"></div>
                        </div>
                        <span>75% аяқталды</span>
                    </div>
                    <button class="btn-primary" onclick="startCourse('drought-adaptation')">Жалғастыру</button>
                </div>
            </div>
        </div>
    `;
}

function startCourse(courseId) {
    alert(`"${getCourseName(courseId)}" курсы басталады! Бұл функция әзірлеу процесінде.`);
}

function getCourseName(courseId) {
    const courses = {
        'water-saving': 'Су үнемдеуші егіншілік негіздері',
        'drip-irrigation': 'Тамшылы суғаруды енгізу',
        'drought-adaptation': 'Құрғақшылыққа бейімделу'
    };
    return courses[courseId] || courseId;
}

function getNewsContent() {
    return `
        <div class="section">
            <h3>Соңғы жаңалықтар</h3>
            <div class="news-list">
                <div class="news-item">
                    <h4>Сырдариядағы су деңгейі көтерілуде</h4>
                    <p class="news-date">Қараша 15, 2024</p>
                    <p>Соңғы жауын-шашыннан кейін Сырдария өзеніндегі су деңгейі 15 см-ге көтерілді. Бұл аудандағы суғару маусымына оң әсер етеді.</p>
                </div>
                <div class="news-item">
                    <h4>Жаңа су үнемдеу технологиялары</h4>
                    <p class="news-date">Қараша 12, 2024</p>
                    <p>Ауылшаруашылық өндірушілерге арналған жаңа тамшылы суғару жүйелері енгізілді. Технология суды 40% үнемдеуге мүмкіндік береді.</p>
                </div>
                <div class="news-item">
                    <h4>Мемлекеттік қолдау бағдарламасы</h4>
                    <p class="news-date">Қараша 10, 2024</p>
                    <p>Су үнемдеу технологияларын енгізу үшін жаңа субсидиялар бекітілді. Өтініштерді наурыз айына дейін қабылдау жоспарлануда.</p>
                </div>
            </div>
        </div>
    `;
}

function getSettingsContent() {
    if (!currentUser) return '<div class="section">Пайдаланушы жүктелмеді</div>';
    
    return `
        <div class="section">
            <h3>Пайдаланушы баптаулары</h3>
            <div class="settings-form">
                <div class="form-group">
                    <label>Аты:</label>
                    <input type="text" id="settingsFirstName" value="${currentUser.firstName || ''}">
                </div>
                <div class="form-group">
                    <label>Тегі:</label>
                    <input type="text" id="settingsLastName" value="${currentUser.lastName || ''}">
                </div>
                <div class="form-group">
                    <label>Email:</label>
                    <input type="email" id="settingsEmail" value="${currentUser.email || ''}">
                </div>
                <div class="form-group">
                    <label>Ауданы:</label>
                    <select id="settingsDistrict">
                        <option value="aral" ${currentUser.district === 'aral' ? 'selected' : ''}>Арал ауданы</option>
                        <option value="karmakshy" ${currentUser.district === 'karmakshy' ? 'selected' : ''}>Қармақшы ауданы</option>
                        <option value="zhalagash" ${currentUser.district === 'zhalagash' ? 'selected' : ''}>Жалағаш ауданы</option>
                        <option value="zhanakorgan" ${currentUser.district === 'zhanakorgan' ? 'selected' : ''}>Жаңақорған ауданы</option>
                        <option value="syrdarya" ${currentUser.district === 'syrdarya' ? 'selected' : ''}>Сырдария ауданы</option>
                        <option value="kazaly" ${currentUser.district === 'kazaly' ? 'selected' : ''}>Қазалы ауданы</option>
                        <option value="shieli" ${currentUser.district === 'shieli' ? 'selected' : ''}>Шиелі ауданы</option>
                    </select>
                </div>
                <button class="btn-primary" onclick="saveSettings()">Сақтау</button>
            </div>
        </div>
    `;
}

function saveSettings() {
    if (!currentUser) return;
    
    const firstName = document.getElementById('settingsFirstName').value;
    const lastName = document.getElementById('settingsLastName').value;
    const email = document.getElementById('settingsEmail').value;
    const district = document.getElementById('settingsDistrict').value;

    if (!firstName || !lastName || !email) {
        alert('Барлық міндетті өрістерді толтырыңыз');
        return;
    }

    currentUser.firstName = firstName;
    currentUser.lastName = lastName;
    currentUser.email = email;
    currentUser.district = district;

    const users = JSON.parse(localStorage.getItem('smartAuaUsers')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('smartAuaUsers', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    alert('Баптаулар сәтті сақталды!');
    updateDashboard();
}