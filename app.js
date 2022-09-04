//selectors
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
//eventlisteners
todoButton.addEventListener("click", addToDo); 
todoList.addEventListener("click", deleteCheck);

//functions
function addToDo(event){
    //prevent form from submitting
    event.preventDefault();
    //ToDo Div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo");
    //Todo Li
    const newTodo = document.createElement("li");
    newTodo.innerText=todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //CHECK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton );

    //TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append the todoDiv to the ul
    todoList.appendChild(todoDiv); 
    //clear todoInput value
    todoInput.value = "";

}
function deleteCheck(e){
    
    const item = e.target;
    //delete todo
    if(item.classList[0]==="trash-btn"){
        const todo=item.parentElement;
         
        //animation
       todo.classList.add("fall");
        todo.addEventListener("transitionend", function (){
            todo .remove();
        })
        
        
        }
        if(item.classList[0]==="check-btn"){
            const todo = item.parentElement; 
            todo.classList.toggle("completed");
        }
        

    }