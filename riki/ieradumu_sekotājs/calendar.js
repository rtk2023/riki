// Kalendāra funkcijas
function renderModernCalendar() {
    const monthNames = ["Janvāris","Februāris","Marts","Aprīlis","Maijs","Jūnijs",
                       "Jūlijs","Augusts","Septembris","Oktobris","Novembris","Decembris"];
    document.getElementById('modernCalendarTitle').textContent = 
        `${monthNames[modernCurrentMonth]} ${modernCurrentYear}`;
    
    const firstDay = new Date(modernCurrentYear, modernCurrentMonth, 1);
    const lastDay = new Date(modernCurrentYear, modernCurrentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay() || 7;
    const prevMonthDays = startingDay - 1;
    const prevMonthLastDay = new Date(modernCurrentYear, modernCurrentMonth, 0).getDate();
    
    let calendarHTML = '';
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const isCurrentMonth = today.getMonth() === modernCurrentMonth && 
                         today.getFullYear() === modernCurrentYear;

    for (let i = prevMonthDays; i > 0; i--) {
        const day = prevMonthLastDay - i + 1;
        const dateStr = `${modernCurrentYear}-${String(modernCurrentMonth).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
        const isPastDate = dateStr < todayStr;
        
        if (isPastDate) {
            const dueHabits = habits.filter(h => h.isDueOnDate(dateStr));
            const allCompleted = dueHabits.length > 0 && dueHabits.every(h => h.isCompletedOnDate(dateStr));
            const statusIcon = allCompleted ? 
                '<i class="fas fa-check-circle text-success"></i>' : 
                '<i class="fas fa-times-circle text-danger"></i>';
            calendarHTML += `<div class="modern-calendar-day other-month"><span class="modern-day-number">${day}</span><div class="day-status">${statusIcon}</div></div>`;
        } else {
            calendarHTML += `<div class="modern-calendar-day other-month"><span class="modern-day-number">${day}</span></div>`;
        }
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${modernCurrentYear}-${String(modernCurrentMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
        const isToday = isCurrentMonth && day === today.getDate();
        const isFutureDate = dateStr > todayStr;
        
        if (!isFutureDate) {
            const dueHabits = habits.filter(h => h.isDueOnDate(dateStr));
            const allCompleted = dueHabits.length > 0 && dueHabits.every(h => h.isCompletedOnDate(dateStr));
            const statusIcon = allCompleted ? 
                '<i class="fas fa-check-circle text-success"></i>' : 
                '<i class="fas fa-times-circle text-danger"></i>';
            calendarHTML += `<div class="modern-calendar-day ${isToday ? 'today' : ''}"><span class="modern-day-number">${day}</span><div class="day-status">${statusIcon}</div></div>`;
        } else {
            calendarHTML += `<div class="modern-calendar-day ${isToday ? 'today' : ''}"><span class="modern-day-number">${day}</span></div>`;
        }
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

// Inicializācija
document.addEventListener('DOMContentLoaded', function() {
    const addHabitModal = new bootstrap.Modal(document.getElementById('addHabitModal'));
    
    document.getElementById('habitForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const nameInput = document.getElementById('habitName');
        const categorySelect = document.getElementById('habitCategory');
        
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
        
        habits.push(new Habit(
            nameInput.value.trim(), 
            categorySelect.value,
            document.getElementById('habitFrequency').value
        ));
        
        renderAll();
        addHabitModal.hide();
        this.reset();
    });

    document.querySelector('.prev-month-modern').addEventListener('click', prevMonthModern);
    document.querySelector('.next-month-modern').addEventListener('click', nextMonthModern);

    renderAll();
});