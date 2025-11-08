document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            const tabName = this.getAttribute('data-tab');
            loadTabContent(tabName);
        });
    });
});

function loadTabContent(tabName) {
    const tabContent = document.getElementById('tabContent');
    
    switch(tabName) {
        case 'irrigation':
            tabContent.innerHTML = getIrrigationContent();
            break;
        case 'analytics':
            tabContent.innerHTML = getAnalyticsContent();
            initAnalyticsChart();
            break;
        case 'courses':
            tabContent.innerHTML = getCoursesContent();
            break;
        case 'ai-bot':
            tabContent.innerHTML = getAIBotContent();
            break;
        case 'news':
            tabContent.innerHTML = getNewsContent();
            break;
        case 'settings':
            tabContent.innerHTML = getSettingsContent();
            break;
        default:
            tabContent.innerHTML = '';
    }
}