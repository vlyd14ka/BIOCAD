const descriptionData = {
    erpId: '28fedb4b-85a1-11e8-80e5-00155df02900',
    serial: '37767108',
    passportId: '18941',
    eo: '10025426',
    name: 'Система щелочи, Watertown, NaOH',
    className: 'Система щелочи',
    manufacturer: 'Watertown'
};

const logo = document.querySelector('.logo');
if (logo) {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', () => window.location.href = 'index.html');
}

async function loadCardTemplate() {
    try {
        const response = await fetch('card/card-template.html');  
        if (!response.ok) throw new Error('Сетевая ошибка');
        const html = await response.text();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const template = tempDiv.querySelector('template');
        if (template) document.body.appendChild(template);
    } catch (error) {
        console.error('Ошибка загрузки шаблона карты:', error);
    }
}

async function renderCards() {
   
    if (!document.getElementById('card-template')) {
        await loadCardTemplate();
    }
    
    const templateElement = document.getElementById('card-template');
    if (!templateElement) return;
    
    const template = templateElement.content;
    const list = document.querySelector('.operations-list');
    if (!list) return;

    list.innerHTML = ''; 

    const cardsData = [
        { id: '10025426', description: 'Рециркуляционная вентиляция, Trox, xcube, Приточно-рециркуляционная установка 2С-ПР10.1', location: '101', status: 'Свободен', errors: 0, warnings: 0, logo: 'images/operations/ventilation.png' },
        { id: '10025426', description: 'Осмометр Киви Осмометрия ОСКР-1М', location: '2.5.03/2', status: 'Занят', errors: 0, warnings: 0, logo: 'images/operations/osmometer.png' },
        { id: '10025426', description: 'Рециркуляционная вентиляция, Trox, xcube, Приточно-рециркуляционная установка 2С-ПР10.1', location: '101', status: 'Свободен', errors: 0, warnings: 0, logo: 'images/operations/ventilation.png' },
        { id: '10025426', description: 'Система щелочи, Watertown, NaOH', location: '2.5.03/2', status: 'Свободен', errors: 0, warnings: 0, logo: 'images/operations/unknown.png' },
        { id: '10025426', description: 'Осмометр Киви Осмометрия ОСКР-1М', location: '2.5.03/2', status: 'Занят', errors: 0, warnings: 0, logo: 'images/operations/osmometer.png' },
        { id: '10025426', description: 'Осмометр Киви Осмометрия ОСКР-1М', location: '101', status: 'Занят', errors: 0, warnings: 0, logo: 'images/operations/osmometer.png' },
        { id: '00-024004', description: 'Бокс биологической безопасности', location: '507', status: 'Занят', errors: 0, warnings: 0, logo: 'images/operations/labroom.png' },
        { id: '10025426', description: 'Рециркуляционная вентиляция, Trox, xcube, Приточно-рециркуляционная установка 2С-ПР10.1', location: '010', status: 'Свободен', errors: 0, warnings: 0, logo: 'images/operations/ventilation.png' },
    ];

    const STATUS_MAP = {
        'Свободен': { class: 'free', icon: 'images/arrows/arrow_down.svg' },
        'Занят': { class: 'busy', icon: 'images/icons/lock.svg' }
    };
        
    cardsData.forEach(data => {
        const clone = template.cloneNode(true);
        const statusCfg = STATUS_MAP[data.status] || {};

        clone.querySelector('.card-id').textContent = data.id;
        clone.querySelector('.card-description').textContent = data.description;
        clone.querySelector('.card-info span').textContent = data.location;
        clone.querySelector('.card-logo').src = data.logo;

        const statusEl = clone.querySelector('.card-status');
        statusEl.classList.add(statusCfg.class);
        statusEl.querySelector('span').textContent = data.status;
        
        const icon = statusEl.querySelector('img');
        icon.src = statusCfg.icon;
        icon.alt = data.status;

        const card = clone.querySelector('.card');
        card.addEventListener('click', () => {
            if (data.description === descriptionData.name) {
                window.location.href = 'analytics.html';  
            } else {
                window.location.href = 'error.html';
            }
        });
        list.appendChild(clone);
    });
}

function renderDescriptionTab(data) {
    const container = document.getElementById('description');
    if (!container) return;
    container.innerHTML = `
        <div class="card-body_content">
            <span class="card-body_content_header">ID в ERP (GUID)</span>
            <span class="card_body_content_value">${data.erpId}</span>
            <span class="card-body_content_header">Серийный номер</span>
            <span class="card_body_content_value">${data.serial}</span>
            <span class="card-body_content_header">ID в паспорте</span>
            <span class="card_body_content_value">${data.passportId}</span>
            <span class="card-body_content_header">EO</span>
            <span class="card_body_content_value">${data.eo}</span>
        </div>
        <hr>
        <div class="card-body_content_footer">
            <span class="card-body_content_header">Название</span>
            <span class="card_body_content_value">${data.name}</span>
            <span class="card-body_content_header">Класс</span>
            <span class="card_body_content_value">${data.className}</span>
            <span class="card-body_content_header">Производитель</span>
            <span class="card_body_content_value">${data.manufacturer}</span>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    renderCards();  
    renderDescriptionTab(descriptionData);  

    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.style.display = 'none';
            });
            const activeTab = document.getElementById(tabId);
            if (activeTab) activeTab.style.display = 'block';
        });
    });
});