function getAIBotContent() {
    return `
        <div class="section">
            <h3>AiQanat - Суды үнемдеу бойынша AI көмекшісі</h3>
            <div class="ai-chat-container">
                <div class="chat-messages" id="chatMessages">
                    <div class="message bot-message">
                        <div class="message-content">
                            <strong>AiQanat:</strong> Сәлеметсіз бе! Мен суды үнемдеу бойынша сіздің көмекшісіңіз. 
                            Сізге қандай көмек керек? Суғару, дақылдар немесе технологиялар туралы сұрақ қойыңыз.
                        </div>
                    </div>
                </div>
                <div class="chat-input">
                    <input type="text" id="chatInput" placeholder="Сұрағыңызды жазыңыз..." onkeypress="handleChatInput(event)">
                    <button onclick="sendMessage()">Жіберу</button>
                </div>
                <div class="quick-questions">
                    <h4>Жиі қойылатын сұрақтар:</h4>
                    <div class="quick-buttons">
                        <button class="quick-btn" onclick="askQuestion('Бидайды суғару нормасы қандай?')">Бидай суғару нормасы</button>
                        <button class="quick-btn" onclick="askQuestion('Тамшылы суғаруды қалай орнату керек?')">Тамшылы суғару</button>
                        <button class="quick-btn" onclick="askQuestion('Құрғақшылық кезінде не істеу керек?')">Құрғақшылық кезінде</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, 'user');
        input.value = '';
        
        setTimeout(() => {
            const response = generateAIResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    }
}

function askQuestion(question) {
    document.getElementById('chatInput').value = question;
    sendMessage();
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const prefix = sender === 'bot' ? '<strong>AiQanat:</strong> ' : '';
    messageDiv.innerHTML = `<div class="message-content">${prefix}${text}</div>`;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateAIResponse(question) {
    const lowerQuestion = question.toLowerCase();
    
    const responses = {
        'бидай': 'Бидайды суғару нормасы өсу кезеңіне байланысты 4000-6000 м³/гектар. Ерте өсу кезеңінде аптасына 2 рет, пісу кезеңінде аптасына 1 рет суғару ұсынылады. Тамшылы суғару арқылы 30% үнемдеуге болады.',
        'тамшылы': 'Тамшылы суғару жүйесін орнату үшін: 1) Негізгі құбырды орнату, 2) Тамшылы сызықтарды жабдықтау, 3) Сүзгі жүйесін қосу, 4) Бақылау жүйесін орнату. Бұл әдіс суды 40-60% үнемдейді және тыңайтқыштарды тиімді пайдалануға мүмкіндік береді.',
        'құрғақшылық': 'Құрғақшылық кезінде: 1) Суғаруды түнде жүргізу, 2) Мульчалауды қолдану, 3) Құрғақшылыққа төзімді дақылдарды отырғызу, 4) Топырақ ылғалдылығын бақылау, 5) Су жинау жүйелерін орнату.',
        'күріш': 'Күріш суғару үшін көп су қажет (8000-10000 м³/гектар). Дегенмен, кесінді суғару әдісін қолданып, суды 30% үнемдеуге болады. Кесінді әдісі: суды белгілі бір кезеңдерде ғана беру.',
        'су үнемдеу': 'Су үнемдеу үшін: тамшылы суғару, далалық мониторинг, қайталама суды пайдалану, құрғақшылыққа төзімді дақылдарды отырғызу, суғаруды бағдарламалау, топырақ ылғалдылығын мониторингілеу.',
        'default': 'Жақсы сұрақ! Су үнемдеу бойынша келесі ұсыныстарды қарастырыңыз: тамшылы суғару жүйесін енгізу, суғаруды бағдарламалау, топырақ ылғалдылығын мониторингілеу. Нақтырақ ақпарат алу үшін дақыл түрін, ауданын және топырақ жағдайын көрсетіңіз.'
    };

    for (const [key, response] of Object.entries(responses)) {
        if (lowerQuestion.includes(key)) {
            return response;
        }
    }
    
    return responses.default;
}