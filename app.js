//selectors
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")
//eventlisteners
todoButton.addEventListener("click", addToDo); 
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo)

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
    //add to local storage
    saveLocalTodos(todoInput.value);
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
        //check mark
        if(item.classList[0]==="complete-btn"){
            const todo = item.parentElement; 
            todo.classList.toggle("completed");
        }
        
    }

    function filterTodo(e){
        const todos = todoList.childNodes;
        todos.forEach(function(todo){
            switch(e.target.value){
                case "all":
                    todo.style.display = "flex"
                    break;
                    case "completed":
                        if(todo.classList.contains("completed")){
                            todo.style.display = "flex"
                        }
                        else{
                            todo.style.display = "none"
                        }
                        break;
                        case "uncompleted":
                            if (!todo.classList.contains("completed")){
                                todo.style.display = "flex"}
                                else {
                                    todo.style.display = "none"
                                }
                            break; 
            }
        });

    }

    function saveLocalTodos(todo){
        //check if things exist here
        let todos;

        if (localStorage.getItem("todos")===null){
            todos=[];
        } else{
            todos=JSON.parse(localStorage.getItem("todos"));
        }
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos))

    }

    

        


    

    let todoLists;

    const apiHost = "  http://localhost:3000"
     
    function postTodos(e){
        const fetchTodos = todoInput.value
        const fetchParameters = {
            method : "POST",
            body : JSON.stringify({
                fetchTodos,
                todoLists
                
            }),
            headers : {
                "Content-Type":"application/json"
            }
        }

        fetch(`${apiHost}`,fetchParameters).then((response)=>{
            addToDo();
            deleteCheck();

        })
    }

    document.addEventListener("DOMContentLoaded",()=>{
        addToDo();
    })
