let habits = [];
let statsChart = null;
let currentStatsPeriod = 'week';
let modernCurrentMonth = new Date().getMonth();
let modernCurrentYear = new Date().getFullYear();

const categories = {
    'Veselība': '#4CAF50',
    'Darbs': '#2196F3', 
    'Brīvais laiks': '#9C27B0',
    'Cits': '#FF9800'
};

class Habit {
    constructor(name, category, frequency = 'daily') {
        this.id = Date.now();
        this.name = name;
        this.category = category;
        this.frequency = frequency;
        this.completedDates = [];
    }

    isDueOnDate(dateStr) {
        const date = new Date(dateStr);
        if (this.frequency === 'daily') return true;
        if (this.frequency === 'weekly') return date.getDay() === 1;
        if (this.frequency === 'monthly') return date.getDate() === 1;
        return true;
    }

    toggleCompletion(date = new Date().toISOString().split('T')[0]) {
        const index = this.completedDates.indexOf(date);
        if (index === -1) this.completedDates.push(date);
        else this.completedDates.splice(index, 1);
    }

    isCompletedOnDate(date) {
        return this.completedDates.includes(date);
    }
}

// Galvenās funkcijas
function renderAll() {
    renderModernCalendar();
    renderCategoryColors();
    renderHabits();
    populateCategorySelect();
    renderStats();
    renderStreak();
}

function renderHabits() {
    const today = new Date().toISOString().split('T')[0];
    const habitsByCategory = {};
    const activeContainer = document.getElementById('activeHabits');
    const completedContainer = document.getElementById('completedHabits');
    
    activeContainer.innerHTML = '';
    completedContainer.innerHTML = '';

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

    for (const [category, data] of Object.entries(habitsByCategory)) {
        if (data.active.length > 0) {
            renderHabitGroup(activeContainer, category, data.color, data.active, false);
        }
        if (data.completed.length > 0) {
            renderHabitGroup(completedContainer, category, data.color, data.completed, true);
        }
    }
}

function renderHabitGroup(container, category, color, habits, isCompleted) {
    const group = document.createElement('div');
    group.className = 'habit-category-group';
    group.innerHTML = `
        <div class="habit-category-title">
            ${category}
            <span class="badge" style="background-color: ${color}">${habits.length} ${isCompleted ? 'pabeigti' : 'aktīvi'}</span>
        </div>
    `;
    
    habits.forEach(habit => {
        group.appendChild(createHabitCard(habit, isCompleted));
    });
    
    container.appendChild(group);
}

function createHabitCard(habit, isCompleted) {
    const today = new Date().toISOString().split('T')[0];
    const isDueToday = habit.isDueOnDate(today);
    const frequencyText = {
        'daily': 'Katru dienu',
        'weekly': 'Reizi nedēļā', 
        'monthly': 'Reizi mēnesī'
    }[habit.frequency];
    
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

function toggleHabitCompletion(habitId) {
    const habit = habits.find(h => h.id === habitId);
    if (habit) {
        habit.toggleCompletion();
        renderAll();
    }
}

function deleteHabit(habitId) {
    if (confirm('Vai tiešām vēlaties dzēst šo ieradumu?')) {
        habits = habits.filter(h => h.id !== habitId);
        renderAll();
    }
}

// Kategoriju menedžments
function renderCategoryColors() {
    const container = document.getElementById('categoryColors');
    container.innerHTML = Object.entries(categories).map(([name, color]) => `
        <div class="d-flex align-items-center mb-3">
            <div class="category-color-picker" style="background-color: ${color}" 
                 onclick="changeCategoryColor('${name}')"></div>
            <span class="me-2">${name}</span>
            <button class="btn btn-sm btn-outline-danger ms-auto" 
                    onclick="deleteCategory('${name}')">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function changeCategoryColor(categoryName) {
    const newColor = prompt('Ievadiet jaunu krāsu (HEX formātā):', categories[categoryName]);
    if (newColor) {
        categories[categoryName] = newColor;
        renderAll();
    }
}

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

function addNewCategory() {
    const categoryName = prompt('Ievadiet jaunas kategorijas nosaukumu:');
    if (categoryName && !categories[categoryName]) {
        categories[categoryName] = '#cccccc';
        renderAll();
    } else if (categoryName) {
        alert('Šāda kategorija jau pastāv!');
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

// Statistika
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
            streakDays.unshift({ date: dateStr, completed: true, isToday: i === 0 });
        } else {
            if (i === 0) {
                streakDays.unshift({ date: dateStr, completed: false, isToday: true });
            }
            break;
        }
        
        currentDate.setDate(currentDate.getDate() - 1);
    }
    
    return { streak, streakDays };
}

function renderStreak() {
    const { streak, streakDays } = calculateStreak();
    const streakElement = document.getElementById('currentStreak');
    streakElement.textContent = streak;
    streakElement.style.color = streak >= 7 ? '#ff5722' : streak >= 3 ? '#ff9800' : '#4caf50';
    document.getElementById('streakCalendar').innerHTML = streakDays.map(day => 
        `<div class="streak-day ${day.completed ? 'completed' : ''} ${day.isToday ? 'current' : ''}" 
              title="${day.date}"></div>`
    ).join('');
}

function calculateStats() {
    const now = new Date();
    let dateFilter;
    
    switch(currentStatsPeriod) {
        case 'week': 
            dateFilter = date => new Date(date) > new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
        case 'month':
            dateFilter = date => new Date(date).getMonth() === now.getMonth() && 
                               new Date(date).getFullYear() === now.getFullYear();
            break;
        case 'year':
            dateFilter = date => new Date(date).getFullYear() === now.getFullYear();
            break;
        default:
            dateFilter = () => true;
    }

    const categoryStats = {};
    Object.keys(categories).forEach(cat => categoryStats[cat] = 0);
    
    habits.forEach(habit => {
        habit.completedDates.forEach(date => {
            if (dateFilter(date)) {
                categoryStats[habit.category]++;
            }
        });
    });
    
    return {
        labels: Object.keys(categoryStats),
        data: Object.values(categoryStats),
        colors: Object.keys(categoryStats).map(cat => categories[cat])
    };
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

function showStats(period) {
    currentStatsPeriod = period;
    document.querySelectorAll('.stat-tabs .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
    renderStats();
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    document.documentElement.setAttribute('data-bs-theme', 
        currentTheme === 'dark' ? 'light' : 'dark');
}