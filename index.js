//Selectors

const input = document.querySelector(".todo-input");
const button = document.querySelector(".todo-btn");
const itemList = document.querySelector(".todo-list")
const todoSelect = document.querySelector("#todo-select");

//Event Handlers


button.addEventListener('click', addItem);
itemList.addEventListener('click', alterItem);
todoSelect.addEventListener('click', showItem);


//Functions



function addItem(e) {
    e.preventDefault();
    if (input.value === '') {
        alert("Please enter the fields");
    } else {
        const task = input.value;
        //First creating a div which will contain li element and 3 buttons
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const list = document.createElement('li');
        list.innerText = task;
        list.classList.add("todo-item");
        todoDiv.appendChild(list);
        const editbtn = document.createElement("button");
        editbtn.innerHTML = '<i class="fas fa-pen-square"></i>';
        editbtn.classList.add("edit-btn");
        todoDiv.appendChild(editbtn);
        const checkbtn = document.createElement("button");
        checkbtn.innerHTML = '<i class="fas fa-check"></i>';
        checkbtn.classList.add("check-btn");
        todoDiv.appendChild(checkbtn);
        const deletebtn = document.createElement("button");
        deletebtn.innerHTML = '<i class="fas fa-trash"></i>';
        deletebtn.classList.add("trash-btn");

        todoDiv.appendChild(deletebtn);
        itemList.appendChild(todoDiv);
        input.value = '';
    }

}

function alterItem(e) {
    console.log(e.target.parentElement.parentElement.innerText);
    const targetItem = e.target;
    //If the user has clicked the delete button
    if (targetItem.classList.contains("fa-trash")) {
        targetItem.parentNode.parentNode.classList.add("fall");
        //Using the transitioned event so that the fall animation gets completed and then we can remove the item
        targetItem.parentNode.parentNode.addEventListener("transitionend", function () {
            targetItem.parentNode.parentNode.remove();
        })
    }

    //If the user has clicked the checked button
    if (targetItem.classList.contains("fa-check")) {
        if (targetItem.parentNode.parentNode.classList.contains("completed")) {
            targetItem.parentNode.parentNode.classList.remove("completed");
        } else
            targetItem.parentNode.parentNode.classList.add("completed");
    }


    //If the user has clicked the edit button
    if (targetItem.classList.contains("fa-pen-square")) {
        if (targetItem.parentNode.parentNode.classList.contains("edit-mode")) {
            //Adding the edited sentence to the li where parentNode is the edit button and its previous
            //sibling is the Li element
            targetItem.parentNode.previousSibling.innerText = input.value;
            targetItem.parentNode.parentNode.classList.remove("edit-mode");
            input.value = '';
        } else {
            //Adding the edit-mode class and putting the innerText of the li to the input
            targetItem.parentNode.parentNode.classList.add("edit-mode");
            input.value = targetItem.parentNode.parentNode.innerText;

        }

    }
}


//Filter the list
function showItem(e) {
    const todos = itemList.childNodes;
    todos.forEach((todo) => {
        switch (e.target.value) {
            case "All": {
                todo.style.display = "flex";
                break;
            }
            case "Completed": {
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            }
            case "Incomplete": {
                if (todo.classList.contains("completed")) {
                    todo.style.display = "none";
                } else {
                    todo.style.display = "flex";
                }
                break;

            }
        }
    })
}