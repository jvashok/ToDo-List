document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('add-task-form');
    const taskInput = document.getElementById('task-input');
    const timeInput = document.getElementById('time-input');
    const dateInput = document.getElementById('date-input');
    const categoryInput = document.getElementById('category-input');
    const tasksView = document.getElementById('tasks-view');
    const scheduledView = document.getElementById('scheduled-view');
    const settingsView = document.getElementById('settings-view');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        addTask(taskInput.value, timeInput.value, dateInput.value, categoryInput.value);
        form.reset();
    });

    function addTask(title, time, date, category) {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox">
            <span class="task-title">${title}</span>
            <span class="task-time">${time}</span>
        `;

        const today = new Date().toISOString().split('T')[0];
        if (date === today) {
            const categoryContainer = document.getElementById(`${category}-tasks`);
            categoryContainer.appendChild(taskItem);
        } else {
            const scheduledTasks = document.getElementById('scheduled-tasks');
            taskItem.innerHTML += `<span class="task-date">${date}</span>`;
            scheduledTasks.appendChild(taskItem);
        }

        const checkbox = taskItem.querySelector('.task-checkbox');
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                taskItem.querySelector('.task-title').style.textDecoration = 'line-through';
                taskItem.querySelector('.task-title').style.color = '#888';
            } else {
                taskItem.querySelector('.task-title').style.textDecoration = 'none';
                taskItem.querySelector('.task-title').style.color = 'inherit';
            }
        });
    }

    // Navigation
    document.querySelectorAll('.category, .nav-item').forEach(item => {
        item.addEventListener('click', function () {
            const view = this.dataset.view;
            if (view === 'scheduled') {
                tasksView.style.display = 'none';
                scheduledView.style.display = 'block';
                settingsView.style.display = 'none';
            } else if (view === 'settings') {
                tasksView.style.display = 'none';
                scheduledView.style.display = 'none';
                settingsView.style.display = 'block';
            } else {
                tasksView.style.display = 'block';
                scheduledView.style.display = 'none';
                settingsView.style.display = 'none';
            }
        });
    });

    // Add some initial tasks
    const today = new Date().toISOString().split('T')[0];
    addTask('Work out', '08:00', today, 'personal');
    addTask('Design team meeting', '14:30', today, 'work');
    addTask('Hand off the project', '19:00', today, 'freelance');
    addTask('Read 5 pages of "sprint"', '22:30', today, 'personal');

    // Add a scheduled task
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];
    addTask('Dentist appointment', '10:00', tomorrowString, 'personal');
});
