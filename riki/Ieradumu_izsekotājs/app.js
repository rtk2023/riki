let habits = [];
let categories = {
    'Veselība': '#4CAF50',
    'Darbs': '#2196F3',
    'Brīvais laiks': '#9C27B0',
    'Cits': '#FF9800'
};

let statsChart = null;
let currentStatsPeriod = 'week';
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let modernCurrentMonth = new Date().getMonth();
let modernCurrentYear = new Date().getFullYear();

class Habit {
    constructor(name, category, frequency = 'daily') {
        this.id = Date.now();
        this.name = name;
        this.category = category;
        this.frequency = frequency;
        this.completedDates = [];
        this.createdAt = new Date().toISOString();
    }

    isDueOnDate(dateStr) {
        const date = new Date(dateStr);
        switch(this.frequency) {
            case 'daily':
                return true;
            case 'weekly':
                return date.getDay() === 1; // Pirmdiena
            case 'monthly':
                return date.getDate() === 1; // Pirmā mēneša diena
            default:
                return true;
        }
    }

    toggleCompletion(date) {
        date = date || new Date().toISOString().split('T')[0];
        const index = this.completedDates.indexOf(date);
        
        if (index === -1) {
            this.completedDates.push(date);
        } else {
            this.completedDates.splice(index, 1);
        }
    }

    isCompletedOnDate(date) {
        return this.completedDates.includes(date);
    }
}

// Kalendāra funkcijas
function renderCalendar() {
    const monthNames = ["Janvāris", "Februāris", "Marts", "Aprīlis", "Maijs", "Jūnijs", 
                       "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"];
    
    document.getElementById('currentMonthYear').textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay() || 7;
    
    let calendarHTML = '';
    let day = 1;
    
    for (let i = 0; i < 6; i++) {
        if (day > daysInMonth) break;
        
        for (let j = 1; j <= 7; j++) {
            if ((i === 0 && j < startingDay) || day > daysInMonth) {
                calendarHTML += '<div class="calendar-day invisible"></div>';
            } else {
                const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const today = new Date();
                const isToday = today.getDate() === day && 
                                today.getMonth() === currentMonth && 
                                today.getFullYear() === currentYear;
                const isCompleted = habits.some(habit => habit.isCompletedOnDate(dateStr));
                
                let dayClasses = 'calendar-day';
                if (isToday) dayClasses += ' today';
                if (isCompleted) dayClasses += ' completed';
                
                calendarHTML += `<div class="${dayClasses}" 
                    onclick="handleDayClick(${day})" title="${dateStr}">${day}</div>`;
                day++;
            }
        }
    }
    
    document.getElementById('calendarDays').innerHTML = calendarHTML;
}

function renderModernCalendar() {
    const monthNames = ["Janvāris", "Februāris", "Marts", "Aprīlis", 
                       "Maijs", "Jūnijs", "Jūlijs", "Augusts", 
                       "Septembris", "Oktobris", "Novembris", "Decembris"];
    
    document.getElementById('modernCalendarTitle').textContent = 
        `${monthNames[modernCurrentMonth]} ${modernCurrentYear}`;
    
    const firstDay = new Date(modernCurrentYear, modernCurrentMonth, 1);
    const lastDay = new Date(modernCurrentYear, modernCurrentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay() || 7;
    
    const prevMonthDays = startingDay - 1;
    const prevMonthLastDay = new Date(modernCurrentYear, modernCurrentMonth, 0).getDate();
    const totalCells = 6 * 7;
    const nextMonthDays = totalCells - (daysInMonth + prevMonthDays);
    
    let calendarHTML = '';
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const isCurrentMonth = today.getMonth() === modernCurrentMonth && 
                         today.getFullYear() === modernCurrentYear;

    for (let i = prevMonthDays; i > 0; i--) {
        const day = prevMonthLastDay - i + 1;
        const dateStr = `${modernCurrentYear}-${String(modernCurrentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isPastDate = dateStr < todayStr;
        let statusIcon = '';
        
        if (isPastDate) {
            const dueHabits = habits.filter(habit => habit.isDueOnDate(dateStr));
            const allCompleted = dueHabits.length > 0 ? 
                dueHabits.every(habit => habit.isCompletedOnDate(dateStr)) : 
                false;
            
            statusIcon = allCompleted ? 
                '<i class="fas fa-check-circle text-success"></i>' : 
                '<i class="fas fa-times-circle text-danger"></i>';
        }

        calendarHTML += `
            <div class="modern-calendar-day other-month">
                <span class="modern-day-number">${day}</span>
                ${isPastDate ? `<div class="day-status">${statusIcon}</div>` : ''}
            </div>
        `;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${modernCurrentYear}-${String(modernCurrentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = isCurrentMonth && day === today.getDate();
        const isPastDate = dateStr < todayStr;
        const isFutureDate = dateStr > todayStr;
        
        let statusIcon = '';
        if (!isFutureDate) {
            const dueHabits = habits.filter(habit => habit.isDueOnDate(dateStr));
            const allCompleted = dueHabits.length > 0 ? 
                dueHabits.every(habit => habit.isCompletedOnDate(dateStr)) : 
                false;
            
            statusIcon = allCompleted ? 
                '<i class="fas fa-check-circle text-success"></i>' : 
                '<i class="fas fa-times-circle text-danger"></i>';
        }

        calendarHTML += `
            <div class="modern-calendar-day ${isToday ? 'today' : ''}">
                <span class="modern-day-number">${day}</span>
                ${!isFutureDate ? `<div class="day-status">${statusIcon}</div>` : ''}
            </div>
        `;
    }

    // Nākamais mēnesis
    for (let day = 1; day <= nextMonthDays; day++) {
        calendarHTML += `
            <div class="modern-calendar-day other-month">
                <span class="modern-day-number">${day}</span>
            </div>
        `;
    }
    
    document.getElementById('modernCalendarDays').innerHTML = calendarHTML;
}

function prevMonthModern() {
    modernCurrentMonth--;
    if (modernCurrentMonth < 0) {
        modernCurrentMonth = 11;
        modernCurrentYear--;
    }
    renderModernCalendar();
}

function nextMonthModern() {
    modernCurrentMonth++;
    if (modernCurrentMonth > 11) {
        modernCurrentMonth = 0;
        modernCurrentYear++;
    }
    renderModernCalendar();
}

// Renderē visus UI elemntus
function renderAll() {
    // Renderē kalendāru vispirms
    renderModernCalendar();
    renderCategoryColors();
    renderHabits();
    populateCategorySelect();
    renderStats();
    renderCalendar();
    renderStreak();
}

function renderHabits() {
    const activeContainer = document.getElementById('activeHabits');
    const completedContainer = document.getElementById('completedHabits');
    const today = new Date().toISOString().split('T')[0];
    
    activeContainer.innerHTML = '';
    completedContainer.innerHTML = '';

    // Grupējam ieradumus pa kategorijām
    const habitsByCategory = {};
    habits.forEach(habit => {
        if (!habitsByCategory[habit.category]) {
            habitsByCategory[habit.category] = {
                color: categories[habit.category] || '#cccccc',
                active: [],
                completed: []
            };
        }
        
        const isDueToday = habit.isDueOnDate(today);
        const isCompletedToday = isDueToday && habit.isCompletedOnDate(today);
        
        if (isCompletedToday) {
            habitsByCategory[habit.category].completed.push(habit);
        } else if (isDueToday) {
            habitsByCategory[habit.category].active.push(habit);
        }
    });

    // Renderējam aktīvos ieradumus grupēti pa kategorijām
    for (const [category, data] of Object.entries(habitsByCategory)) {
        if (data.active.length > 0) {
            const categoryGroup = document.createElement('div');
            categoryGroup.className = 'habit-category-group';
            
            categoryGroup.innerHTML = `
                <div class="habit-category-title">
                    ${category}
                    <span class="badge" style="background-color: ${data.color}">${data.active.length} aktīvi</span>
                </div>
            `;
            
            data.active.forEach(habit => {
                const card = createHabitCard(habit, false);
                categoryGroup.appendChild(card);
            });
            
            activeContainer.appendChild(categoryGroup);
        }
    }

    // Renderējam pabeigtos ieradumus grupēti pa kategorijām
    for (const [category, data] of Object.entries(habitsByCategory)) {
        if (data.completed.length > 0) {
            const categoryGroup = document.createElement('div');
            categoryGroup.className = 'habit-category-group';
            
            categoryGroup.innerHTML = `
                <div class="habit-category-title">
                    ${category}
                    <span class="badge" style="background-color: ${data.color}">${data.completed.length} pabeigti</span>
                </div>
            `;
            
            data.completed.forEach(habit => {
                const card = createHabitCard(habit, true);
                categoryGroup.appendChild(card);
            });
            
            completedContainer.appendChild(categoryGroup);
        }
    }
}

// Palīgfunkcija ieradumu kartiņu izveidei
function createHabitCard(habit, isCompleted) {
    const today = new Date().toISOString().split('T')[0];
    const isDueToday = habit.isDueOnDate(today);
    
    let frequencyText = '';
    switch(habit.frequency) {
        case 'daily': frequencyText = 'Katru dienu'; break;
        case 'weekly': frequencyText = 'Reizi nedēļā'; break;
        case 'monthly': frequencyText = 'Reizi mēnesī'; break;
    }
    
    const card = document.createElement('div');
    card.className = `card habit-card ${isCompleted ? 'completed-habit' : ''}`;
    card.innerHTML = `
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="card-title mb-1">${habit.name}</h5>
                    <small class="text-muted">Atkārtošanās: ${frequencyText}</small>
                    <small class="text-muted d-block">Pabeigts: ${habit.completedDates.length} reizes</small>
                </div>
                <div class="habit-actions">
                    <button class="btn ${isCompleted ? 'btn-success' : 'btn-outline-secondary'}" 
                        onclick="toggleHabitCompletion(${habit.id})" ${!isDueToday ? 'disabled' : ''}>
                        <i class="fas fa-${isCompleted ? 'check' : 'plus'}"></i>
                    </button>
                    <button class="btn btn-outline-danger btn-sm" onclick="deleteHabit(${habit.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// Ieraduma statuss šodienai
function toggleHabitCompletion(habitId) {
    const habit = habits.find(h => h.id === habitId);
    if (habit) {
        habit.toggleCompletion();
        renderAll();
    }
}

// Dzēš ieradumu
function deleteHabit(habitId) {
    if (confirm('Vai tiešām vēlaties dzēst šo ieradumu?')) {
        habits = habits.filter(h => h.id !== habitId);
        renderAll();
    }
}

function renderCategoryColors() {
    const container = document.getElementById('categoryColors');
    container.innerHTML = Object.entries(categories).map(([name, color]) => `
        <div class="d-flex align-items-center mb-3">
            <div class="category-color-picker" style="background-color: ${color}"
                 onclick="changeCategoryColor('${name}')"></div>
            <span class="me-2">${name}</span>
            <button class="btn btn-sm btn-outline-danger ms-auto" onclick="deleteCategory('${name}')">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

// Streak informacija
function calculateStreak() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    let currentDate = new Date(today);
    const streakDays = [];
    
    for (let i = 0; i < 30; i++) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const allCompleted = habits.every(habit => {
            if (!habit.isDueOnDate(dateStr)) return true;
            return habit.isCompletedOnDate(dateStr);
        });
        
        if (allCompleted) {
            streak++;
            streakDays.unshift({
                date: dateStr,
                completed: true,
                isToday: i === 0
            });
        } else {
            if (i === 0) {
                streakDays.unshift({
                    date: dateStr,
                    completed: false,
                    isToday: true
                });
            }
            break;
        }
        
        currentDate.setDate(currentDate.getDate() - 1);
    }
    
    return { streak, streakDays };
}

// Renderē streak informāciju
function renderStreak() {
    const { streak, streakDays } = calculateStreak();
    const streakElement = document.getElementById('currentStreak');
    const calendarElement = document.getElementById('streakCalendar');
    
    streakElement.textContent = streak;

    if (streak > 0) {
        streakElement.style.color = streak >= 7 ? '#ff5722' : 
                                  streak >= 3 ? '#ff9800' : '#4caf50';
    } else {
        streakElement.style.color = '#6c757d';
    }
    
    // Renderē streak kalendāru
    calendarElement.innerHTML = streakDays.map(day => {
        const dayClasses = ['streak-day'];
        if (day.completed) dayClasses.push('completed');
        if (day.isToday) dayClasses.push('current');
        
        return `<div class="${dayClasses.join(' ')}" title="${day.date}"></div>`;
    }).join('');
}

// Maina kategorijas krāsu
function changeCategoryColor(categoryName) {
    const newColor = prompt('Ievadiet jaunu krāsu (HEX formātā):', categories[categoryName]);
    if (newColor) {
        categories[categoryName] = newColor;
        renderAll();
    }
}

// Dzēst kategoriju
function deleteCategory(categoryName) {
    if (habits.some(h => h.category === categoryName)) {
        alert('Nevar dzēst kategoriju, jo tai ir piesaistīti ieradumi!');
        return;
    }
    
    if (confirm(`Vai tiešām vēlaties dzēst kategoriju "${categoryName}"?`)) {
        delete categories[categoryName];
        renderAll();
    }
}

// Pievieno jaunu kategoriju
function addNewCategory() {
    const categoryName = prompt('Ievadiet jaunas kategorijas nosaukumu:');
    if (categoryName) {
        if (!categories[categoryName]) {
            categories[categoryName] = '#cccccc';
            renderAll();
        } else {
            alert('Šāda kategorija jau pastāv!');
        }
    }
}

function populateCategorySelect() {
    const select = document.getElementById('habitCategory');
    select.innerHTML = `
        <option value="">Izvēlieties kategoriju</option>
        ${Object.keys(categories).map(category => `
            <option value="${category}">${category}</option>
        `).join('')}
    `;
}

function renderStats() {
    const ctx = document.getElementById('statsChart').getContext('2d');
    const stats = calculateStats();
    
    if (statsChart) {
        statsChart.destroy();
    }

    statsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: stats.labels,
            datasets: [{
                label: 'Izpildītie ieradumi',
                data: stats.data,
                backgroundColor: stats.colors,
                borderColor: stats.colors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}

function calculateStats() {
    const now = new Date();
    let dateFilter;
    
    switch(currentStatsPeriod) {
        case 'week':
            dateFilter = date => {
                const d = new Date(date);
                return d > new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            };
            break;
        case 'month':
            dateFilter = date => {
                const d = new Date(date);
                return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
            };
            break;
        case 'year':
            dateFilter = date => {
                const d = new Date(date);
                return d.getFullYear() === now.getFullYear();
            };
            break;
        default:
            dateFilter = () => true;
    }

    const categoryStats = {};
    
    // Inicializē kategorijas
    Object.keys(categories).forEach(cat => {
        categoryStats[cat] = 0;
    });

    // Skaita pabeigtos
    habits.forEach(habit => {
        habit.completedDates.forEach(date => {
            if (dateFilter(date)) {
                categoryStats[habit.category]++;
            }
        });
    });

    // Sagatavo datus diagrammai
    return {
        labels: Object.keys(categoryStats),
        data: Object.values(categoryStats),
        colors: Object.keys(categoryStats).map(cat => categories[cat])
    };
}

function showStats(period) {
    currentStatsPeriod = period;
    document.querySelectorAll('.stat-tabs .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
    renderStats();
}

// Tumšais - gaišais režīms
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', newTheme);
}

document.addEventListener('DOMContentLoaded', function() {
    const addHabitModal = new bootstrap.Modal(document.getElementById('addHabitModal'));
    
    document.getElementById('habitForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('habitName');
        const categorySelect = document.getElementById('habitCategory');
        const frequencySelect = document.getElementById('habitFrequency');
        
        if (!nameInput.value.trim()) {
            alert('Lūdzu ievadiet ieraduma nosaukumu!');
            nameInput.focus();
            return;
        }
        
        if (!categorySelect.value) {
            alert('Lūdzu izvēlieties kategoriju!');
            categorySelect.focus();
            return;
        }
        
        // Pievieno ieradumu ar atkārtošanos
        habits.push(new Habit(
            nameInput.value.trim(), 
            categorySelect.value,
            frequencySelect.value
        ));
        
        renderAll();
        addHabitModal.hide();
        this.reset();
    });

    document.querySelector('.prev-month-modern').addEventListener('click', prevMonthModern);
    document.querySelector('.next-month-modern').addEventListener('click', nextMonthModern);

    renderAll();
});