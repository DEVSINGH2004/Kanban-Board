let taskData = {};
let todo = document.querySelector("#todo");
let progress = document.querySelector("#progress");
let done = document.querySelector("#done");
let dragElem = null;
let toggleModal = document.querySelector("#toggle-modal");
let modal = document.querySelector(".modal");
let bg = document.querySelector(".bg");
let addTask = document.querySelector("#add-task");
let tasks = document.querySelectorAll(".task");
let columns = [todo,progress,done];


function updateTaskCount(){
    columns.forEach(col =>{
         let count = col.querySelector(".right");
        let task_count = col.querySelectorAll(".task"); 
        count.textContent = task_count.length;
    })
}

if(localStorage.getItem("tasks")){
    let data = JSON.parse(localStorage.getItem("tasks"));
    console.log(data);
    for(let col in data ){
        let colElem = document.querySelector(`#${col}`);
        data[col].forEach(t =>{
            let div = document.createElement("div");
            div.classList.add("task");
            div.setAttribute("draggable","true");
            div.innerHTML = `
            <h2>${t.title}</h2>
            <p>${t.description}</p>
            <button>Delete</button>
        `
        colElem.appendChild(div);
        div.addEventListener("drag",()=>{
            dragElem = div;
        })
        })
       updateTaskCount();
    }
    
}


addTask.addEventListener("click",()=>{
    let title = document.querySelector("#title").value;
    let description = document.querySelector("#description").value;
   
    let div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable","true");
    div.innerHTML = `
    <h2>${title}</h2>
    <p>${description}</p>
    <button>Delete</button>
    `
   
    todo.appendChild(div);

    let deleteBtn = div.querySelector("button");
    deleteBtn.addEventListener("click",()=>{
        div.remove();
        updateTaskCount();
    })

    columns.forEach(col =>{
         let count = col.querySelector(".right");
        let task_count = col.querySelectorAll(".task"); 
        taskData[col.id] = Array.from(task_count).map(t=>{
            return{
                title:t.querySelector("h2").textContent,
                description:t.querySelector("p").textContent,
            }           
        })
        
         localStorage.setItem("tasks",JSON.stringify(taskData));       
        count.textContent = task_count.length;
       })
        div.addEventListener("drag",()=>{
        dragElem = div; 
    })
    modal.classList.remove("active");
})

bg.addEventListener("click",()=>{
    modal.classList.remove("active");
})

toggleModal.addEventListener("click",()=>{
    modal.classList.toggle("active");
})



tasks.forEach((task)=>{
    task.addEventListener("drag",()=>{
        dragElem = task;
        
    })
})


function dragEvents(boards){
    boards.addEventListener("dragenter", () => {
    boards.classList.add("hover-over");
})
    boards.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
    boards.addEventListener("dragleave", () => {
    boards.classList.remove("hover-over");
})

    boards.addEventListener("drop", () => {
        boards.appendChild(dragElem);
        boards.classList.remove("hover-over");
       columns.forEach(col =>{
         let count = col.querySelector(".right");
        let task_count = col.querySelectorAll(".task"); 
        taskData[col.id] = Array.from(task_count).map(t=>{
            return{
                title:t.querySelector("h2").textContent,
                description:t.querySelector("p").textContent,
            }           
        })
        
         localStorage.setItem("tasks",JSON.stringify(taskData));       
        count.textContent = task_count.length;
       })
       
    })
}

dragEvents(todo);
dragEvents(progress);
dragEvents(done);



