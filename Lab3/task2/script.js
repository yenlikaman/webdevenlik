
const newTaskInput = document.getElementById('new-task');
const addButton = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');


addButton.addEventListener('click', addTask);
newTaskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = newTaskInput.value.trim();
    
    if (taskText === '') {
        newTaskInput.style.borderColor = '#f44336';
        setTimeout(() => {
            newTaskInput.style.borderColor = '#ddd';
        }, 1000);
        return;
    }
    
    createTaskElement(taskText);
    newTaskInput.value = '';
    newTaskInput.focus();
}

function createTaskElement(taskText) {
  
    const emptyMsg = document.querySelector('.empty-message');
    if (emptyMsg) {
        emptyMsg.remove();
    }
    

    const li = document.createElement('li');
    li.className = 'task-item pending';
    

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.addEventListener('change', function() {
        taskSpan.classList.toggle('done');
        if (checkbox.checked) {
            li.className = 'task-item completed';
        } else {
            li.className = 'task-item pending';
        }
    });
    
    
    const taskSpan = document.createElement('span');
    taskSpan.className = 'task-text';
    taskSpan.textContent = taskText;
    
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
        li.style.opacity = '0';
        li.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            li.remove();
            checkIfEmpty();
        }, 300);
    });
    
  
    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);
    

    li.style.opacity = '0';
    li.style.transform = 'translateY(20px)';
    
  
    taskList.appendChild(li);
    

    setTimeout(() => {
        li.style.opacity = '1';
        li.style.transform = 'translateY(0)';
        li.style.transition = 'all 0.3s';
    }, 10);
}


function checkIfEmpty() {
    if (taskList.children.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'empty-message';
        emptyMsg.textContent = 'No tasks to do';
        taskList.appendChild(emptyMsg);
    }
}


checkIfEmpty();