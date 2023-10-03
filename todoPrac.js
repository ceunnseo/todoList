const todoForm = document.querySelector("#todo-form");
const todoinput = todoForm.querySelector("input");
const todoList = document.querySelector("ul");

let tasks = []; //할일(obj)들을 담아두는 array

function saveTask(){
    localStorage.setItem("todoList",JSON.stringify(tasks));
}

function delTask(event) {
    const li = event.target.parentElement;
    tasks = tasks.filter((obj) => obj.id !== parseInt(li.id));
    console.log(tasks);
    saveTask();
    li.remove();
}


function paint(todayTaskObj) {
    console.log("paint!");
    const li = document.createElement("li");
    li.id = todayTaskObj.id;
    const span = document.createElement("span");
    span.innerText = todayTaskObj.todo;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", delTask);
    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);
}

function handle(event){
    event.preventDefault(); //새로고침 방지
    const todayTask = todoinput.value; //창에 입력한 글자
    obj = {"todo" : todayTask, "id":Date.now()};
    tasks.push(obj);
    paint(obj); //화면에 그리는 함수 호출
    saveTask();
    todoinput.value = ""; //빈화면으로
}
//enter를 누르면 -> input
todoForm.addEventListener("submit", handle);

//새로고침했을 때 저장된 localStorage를 가져오자 (key가져옴, string)
const savedTodoList = localStorage.getItem("todoList");
if (savedTodoList){ //투두리스트가 있을 때
    const savedTodoListObj = JSON.parse(savedTodoList); //string to obj(list)
    tasks = savedTodoListObj;
    console.log(savedTodoListObj); //obj가 담긴 array
    //obj각각을 paint하자 -> list의 각 item을 돌 수 있는 func인 forEach
    savedTodoListObj.forEach(paint);
}