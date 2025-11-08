function getIrrigationContent() {
    return `
        <div class="section">
            <h3>Ақылды суғару калькуляторы</h3>
            <div class="calculator-form">
                <div class="form-group">
                    <label>Дақыл түрі:</label>
                    <select id="cropType">
                        <option value="wheat">Бидай</option>
                        <option value="rice">Күріш</option>
                        <option value="cotton">Мақта</option>
                        <option value="vegetables">Көкөністер</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Ауданы (гектар):</label>
                    <input type="number" id="area" placeholder="Мысалы: 10" min="1">
                </div>
                <div class="form-group">
                    <label>Өсу кезеңі:</label>
                    <select id="growthStage">
                        <option value="early">Ерте өсу</option>
                        <option value="middle">Орта өсу</option>
                        <option value="late">Кеш өсу</option>
                        <option value="harvest">Пісу</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Топырақ түрі:</label>
                    <select id="soilType">
                        <option value="sandy">Құмды</option>
                        <option value="loamy">Сазды</option>
                        <option value="clay">Балшықты</option>
                    </select>
                </div>
                <button class="btn-primary" onclick="calculateIrrigation()">Есептеу</button>
            </div>
            <div id="irrigationResult" class="result-section hidden">
                <h4>Суғару жоспары:</h4>
                <div id="resultContent"></div>
            </div>
        </div>
    `;
}

function calculateIrrigation() {
    const cropType = document.getElementById('cropType').value;
    const area = parseFloat(document.getElementById('area').value);
    const growthStage = document.getElementById('growthStage').value;
    const soilType = document.getElementById('soilType').value;

    if (!area || area <= 0) {
        alert('Ауданын дұрыс енгізіңіз');
        return;
    }

    const baseWater = {
        'wheat': 4000,
        'rice': 8000,
        'cotton': 6000,
        'vegetables': 3000
    }[cropType] || 4000;

    const stageMultiplier = {
        'early': 0.7,
        'middle': 1.0,
        'late': 0.8,
        'harvest': 0.3
    }[growthStage] || 1.0;

    const soilMultiplier = {
        'sandy': 1.2,
        'loamy': 1.0,
        'clay': 0.9
    }[soilType] || 1.0;

    const totalWater = baseWater * stageMultiplier * soilMultiplier * area;
    const weeklyWater = totalWater / 4;
    const dailyWater = weeklyWater / 7;

    const resultContent = `
        <div class="irrigation-plan">
            <div class="plan-item">
                <strong>Айлық су қажеттілігі:</strong> ${totalWater.toLocaleString()} л/гектар
            </div>
            <div class="plan-item">
                <strong>Апталық су қажеттілігі:</strong> ${weeklyWater.toLocaleString()} л/гектар
            </div>
            <div class="plan-item">
                <strong>Күнделікті су қажеттілігі:</strong> ${dailyWater.toLocaleString()} л/гектар
            </div>
            <div class="plan-item">
                <strong>Ұсынылатын суғару жиілігі:</strong> Аптасына 2-3 рет
            </div>
            <div class="plan-item">
                <strong>Бір суғаруға:</strong> ${(weeklyWater / 2.5).toLocaleString()} л/гектар
            </div>
            <div class="recommendation">
                <strong>AI ұсынысы:</strong> Тамшылы суғару жүйесін қолдану арқылы суды 40% үнемдеуге болады. Суғаруды таңертең немесе кешке жүргізу ұсынылады.
            </div>
        </div>
    `;

    document.getElementById('resultContent').innerHTML = resultContent;
    document.getElementById('irrigationResult').classList.remove('hidden');
}