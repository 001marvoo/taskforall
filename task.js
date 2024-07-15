document.addEventListener('DOMContentLoaded', function(e){

    const taskForm = document.querySelector('.task-form')
    
    let currentTask = document.querySelector('#task')
    
    const taskBody = document.querySelector('.task-body')
    
    const btnDel = document.querySelector('.btn-del')
    
    let todos = []
    let isEditing = false
    let currentEdited = null
    
    const taskAvailable = () =>{
        return localStorage.getItem('todos') !== null;
    }
    
    
    const getSaveTask = () =>{
        return JSON.parse(localStorage.getItem('todos'))
    }
    
    let task_count = ""
    
    const updateUI = ()=>{
    
        
    taskBody.innerHTML = ""
    
    
        const ui = todos.map((task)=>{
            return `<tr data-id=${task.id}><td>${task_count}</td><td>${task.title}</td><td class="btn-del act">delete</id><td class="act edit-btn">edit</td></tr>`
        })
    
        return ui.join('')
    }
    
    if(taskAvailable()){
        todos = getSaveTask()
        taskBody.insertAdjacentHTML('afterbegin', updateUI()) 
    }
    
    const Todos = function(id,task_count,title,deleted, status){
        this.id = id
        this.task_count = task_count
        this.title = title
        this.deleted = deleted
        this.status = status
    
    }
    
    const addTask = (task)=>{
        todos.push(task)
    }
    
    
    const saveTask = (todos)=>{
        const taskString = JSON.stringify(todos)
    
        localStorage.setItem('todos', taskString)
    }
    
    
    
    taskBody.addEventListener('click', (e)=>{
            if(e.target.classList.contains('btn-del')){
                const targetId = e.target.parentElement.getAttribute('data-id')
            const filteredTask = todos.filter(item=>{
                return item.id != targetId
            })
    
        
            todos = filteredTask
    
            taskBody.insertAdjacentHTML('afterbegin', updateUI())
            saveTask(todos)
    
            console.log(filteredTask)
            }
    
            if(e.target.classList.contains('edit-btn')){
                const targetId = e.target.parentElement.getAttribute('data-id')
    
            const foundTask = todos.find(item=>{
                return targetId == item.id
            })
    
    
            currentTask.value = foundTask.title
            isEditing = true;
    
            currentEdited = targetId
            }
        })
    
    
    
    //submit
    
    taskForm.addEventListener('submit', (e)=>{
    
        e.preventDefault()
    
        let title = currentTask.value;
        task_count = task_count++
    
        if(isEditing){
            todos = todos.map(task=>{
                if(task.id === currentEdited){
                    task.title = title
                }
    
                return task
            })
    
            isEditing = false
            currentEdited = null
    
        }else{
            id = crypto.randomUUID()
    
            const singleTask = new Todos(id,task_count,title,false,false)
    
            addTask(singleTask)
        
        }
    
        currentTask.value = ""
        
         
            saveTask(todos)
            taskBody.insertAdjacentHTML('afterbegin', updateUI()) 
    
       
    })
    
    
    
    });