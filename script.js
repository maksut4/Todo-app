let taskCounter = 0;

document.getElementById('add-task').addEventListener('click', function () {
    const taskTitle = document.getElementById('task-title').value;
    const taskDesc = document.getElementById('task-desc').value;

    if (taskTitle && taskDesc) {
        addTask(taskTitle, taskDesc);
        saveTasksToLocalStorage();
        document.getElementById('task-title').value = '';
        document.getElementById('task-desc').value = '';
    }
});

function addTask(title, desc) {
    const tasksList = document.getElementById('tasks-list');

    taskCounter++;
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';

    const taskHeaderDiv = document.createElement('div');
    taskHeaderDiv.className = 'taskHeaderDiv';

    const taskTitleElem = document.createElement('h3');
    taskTitleElem.className = 'task-title';
    taskTitleElem.textContent = `${taskCounter} ${title}`;

    const taskButtons = document.createElement('div');
    taskButtons.className = 'task-buttons';

    const doneButton = document.createElement('button');
    doneButton.className = 'done-btn';
    doneButton.textContent = 'Done';
    doneButton.addEventListener('click', function () {
        if (!taskDiv.classList.contains('done')) {
            taskDiv.classList.add('done');
            editButton.remove();
        }
        saveTasksToLocalStorage();
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit';
    editButton.addEventListener('click', function () {
        const newTitle = prompt('Edit Task Title', title);
        const newDesc = prompt('Edit Task Description', desc);
        if (newTitle !== null) {
            taskTitleElem.textContent = `${taskTitleElem.textContent.split(' ')[0]} ${newTitle}`;
        }
        if (newDesc !== null) {
            taskDescElem.textContent = newDesc;
        }
        saveTasksToLocalStorage();
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        tasksList.removeChild(taskDiv);
        updateTaskNumbers();
        saveTasksToLocalStorage();
    });

    taskButtons.appendChild(doneButton);
    taskButtons.appendChild(editButton);
    taskButtons.appendChild(deleteButton);
    taskHeaderDiv.appendChild(taskTitleElem);
    taskHeaderDiv.appendChild(taskButtons);

    const taskDate = document.createElement('p');
    taskDate.className = 'task-date';
    const currentDate = new Date();
    taskDate.textContent = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

    const taskDescElem = document.createElement('p');
    taskDescElem.className = 'task-desc';
    taskDescElem.textContent = desc;

    taskDiv.appendChild(taskHeaderDiv);
    taskDiv.appendChild(taskDate);
    taskDiv.appendChild(taskDescElem);

    tasksList.appendChild(taskDiv);
}

function updateTaskNumbers() {
    const tasks = document.querySelectorAll('.task');
    taskCounter = 0;
    tasks.forEach(task => {
        taskCounter++;
        const taskTitle = task.querySelector('.task-title');
        taskTitle.textContent = `${taskCounter} ${taskTitle.textContent.split(' ').slice(1).join(' ')}`;
    });
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.task').forEach(task => {
        const taskTitle = task.querySelector('.task-title').textContent.split(' ').slice(1).join(' ');
        const taskDesc = task.querySelector('.task-desc').textContent;
        const taskDate = task.querySelector('.task-date').textContent;
        const isDone = task.classList.contains('done');
        tasks.push({ title: taskTitle, desc: taskDesc, date: taskDate, done: isDone });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks && tasks.length > 0) {
        taskCounter = 0;
        tasks.forEach(task => {
            addTask(task.title, task.desc);
            const taskDiv = document.querySelectorAll('.task')[taskCounter - 1];
            taskDiv.querySelector('.task-date').textContent = task.date;
            if (task.done) {
                taskDiv.classList.add('done');
                taskDiv.querySelector('button.edit').remove();
            }
        });
    } else {
        const exampleTasks = [
            { title: 'Buy groceries', desc: 'Milk, Bread, Cheese', date: new Date().toLocaleString(), done: false },
            { title: 'Call the doctor', desc: 'Schedule appointment for next week', date: new Date().toLocaleString(), done: false },
            { title: 'Finish project', desc: 'Complete the coding assignment', date: new Date().toLocaleString(), done: false },
            { title: 'Read a book', desc: 'Read 20 pages of the new novel', date: new Date().toLocaleString(), done: false }
        ];
        exampleTasks.forEach(task => {
            addTask(task.title, task.desc);
            const taskDiv = document.querySelectorAll('.task')[taskCounter - 1];
            taskDiv.querySelector('.task-date').textContent = task.date;
        });
        saveTasksToLocalStorage();
    }
}

window.onload = function () {
    loadTasksFromLocalStorage();
};
