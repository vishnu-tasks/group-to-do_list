let input = document.getElementById("input");
let addBtn = document.getElementById("add");
let updBtn = document.getElementById("update");
let todoList = document.getElementById("todo-list");
let errorMsg = document.getElementById("err-msg");
let delIndex,i;
let completed,paras,del,edit;

//group properties
let groupTask = document.getElementById("grp-task");
let grpInput = document.getElementById("grp-input");
let grpBtn = document.getElementById("grp-btn");
let groupContain = document.getElementById("group-container");
let count;
let listAdd = false;
let grpHead = JSON.parse(localStorage.getItem("grp-head")) || [];
let grpTodos = JSON.parse(localStorage.getItem("grp-todo-list")) || [];




let todos = JSON.parse(localStorage.getItem("todo-list")) || [];
updBtn.style.display = "none";
console.log(todos);

// for(let i = 0; i < todos.length; i++){
//     if(todos[i].isChecked === false){
//         groupTask.style.display = "none";
//     }    
// }



addBtn.addEventListener("click", ()=>{

    if(input.value === ""){
        errorMsg.innerHTML = "Please Enter a Task";
    }
    else{
        errorMsg.innerHTML = "";
        todos.push({value: input.value, isChecked: false});
        localStorage.setItem("todo-list", JSON.stringify(todos));
        input.value = "";
        displayTodo();
        console.log(todos);
    }

    
})

function displayTodo(){

    let list = "";
    groupTask.style.display = "none";
    if(todos.length === 0){
        todoList.innerHTML = "";  
    }
    else{
        // console.log(todos);
        for(let i = 0; i < todos.length; i++){
            list += "<p class='para'>";
            list += `<input type='checkbox' onclick= 'checkItem(${i})' class='completed' ${todos[i].isChecked ? 'checked' : ''}>`;
            list += todos[i].value;
            list += `<button onclick = 'deleteItem(${i})' class='del'>Delete</button>`;
            list += `<button onclick = 'editItem(${i})' class='edit'>Edit</button></p>`;
            // displayGroup(i, list);
        }
        todoList.innerHTML = list;
        for(let i = 0; i < todos.length; i++){
            checkItem(i)
        }
    }
}

// check task
function checkItem(i){
    completed = document.querySelectorAll(".completed");
    paras = document.querySelectorAll(".para");
    edit = document.querySelectorAll(".edit");
    del = document.querySelectorAll(".del");
    // console.log(completed,i);

    if(completed[i].checked === true){
        console.log("true");
        todos[i].isChecked =true;
        if(todos[i].isChecked === true){
            paras[i].style.textDecoration = "line-through";
            edit[i].disabled = true;
            del[i].disabled = true;
            edit[i].style.opacity = "0.5";
            del[i].style.opacity = "0.5";

            //group-btn properties
            groupTask.style.display = "block";
            
        }
        localStorage.setItem("todo-list", JSON.stringify(todos));
        // displayTodo();   
    }
  
    else if(completed[i].checked === false){
        count = 0;
        console.log("false");
        todos[i].isChecked =false;
        
        if(todos[i].isChecked === false){
            paras[i].style.textDecoration = "none";
            edit[i].disabled = false;
            del[i].disabled = false;
            edit[i].style.opacity = "1.0";
            del[i].style.opacity = "1.0";

            //group-btn properties
            for(let i = 0; i < todos.length; i++){
                if(todos[i].isChecked === false){
                    count++;
                    if(count === todos.length)
                    groupTask.style.display = "none";
                }
                
            }
        }
        localStorage.setItem("todo-list", JSON.stringify(todos)); 
        
        // displayTodo();
    }
    // localStorage.setItem("todo-list", JSON.stringify(todos));
    // console.log(todos);
}




//delete todos
function deleteItem(index){
    todos.splice(index,1);
    localStorage.setItem("todo-list",JSON.stringify(todos));
        displayTodo();

}

//update button
updBtn.addEventListener("click", ()=>{
    if(input.value === ""){
        errorMsg.innerHTML = "Please Select or update task";
    }
    else{
        errorMsg.innerHTML = "";
        let updVal = input.value;
        todos.splice(delIndex,1,{value:updVal});
        localStorage.setItem("todo-list", JSON.stringify(todos));
        input.value = "";
        displayTodo();
    }
    addBtn.style.display = "inline";
    updBtn.style.display = "none";

}) 

//update todos
function editItem(index){
    addBtn.style.display = "none";
    updBtn.style.display = "inline";
    input.value = todos[index].value;
    delIndex = index;
}

//group todos
grpBtn.addEventListener("click",()=>{
    if(grpInput.value === ""){
        errorMsg.innerHTML = "Please Enter a Group Task Name";
    }
    else{
        errorMsg.innerHTML = "";
        // if(grpHead.length > 0){
        //     displayHidden();
        // }

        grpHead.push({head:grpInput.value});
        localStorage.setItem("grp-head", JSON.stringify(grpHead));
        console.log(grpHead);
        grpInput.value = "";
        listAdd = true;
        groupContain.innerHTML = "";
        displayGrptodo();
    }
})
let list = 0;
function displayGrptodo(){
    for(let i=0; i< grpHead.length; i++){
        let p = document.createElement("p");
        groupContain.appendChild(p);
        let textNodeHead = document.createTextNode(grpHead[i].head);
        p.appendChild(textNodeHead);
        let ul = document.createElement("ul");
        p.appendChild(ul);
        //add the todos into grptodos
        for(let j = 0; j < todos.length; j++){
            if(todos[j].isChecked === true){

                grpTodos.push({value: todos[j].value, list: list});
                localStorage.setItem("grp-todo-list", JSON.stringify(grpTodos));
                console.log("Hello");
            }
            
        }
        //display todolist from grpTodos
        for(let m = 0; m < grpTodos.length; m++){
            if(grpTodos[m].list === i){
                    let li = document.createElement("li");
                    ul.appendChild(li);
                    let textNodeList = document.createTextNode(grpTodos[m].value);
                    li.appendChild(textNodeList);
                    
            }
        }
    
        //remove todos from todolist
        removeTodos();
        function removeTodos(){
            for(let k = 0; k < todos.length; k++){
                if(todos[k].isChecked === true){
                    todos.splice(k,1);
                    localStorage.setItem("todo-list", JSON.stringify(todos));
                    console.log("deleted...");
                    removeTodos();
                }
            }
        }
        console.log(list);
        displayTodo();
        
    }
    if(listAdd === true){
        list++;
        listAdd = false;

    }
    
}

// function displayHidden(){
//     for(let i = 0; i < grpHead.length; i++){
//         p.remove();
//         ul.remove();
//     }

// }

(function(){
    displayGrptodo();
})()