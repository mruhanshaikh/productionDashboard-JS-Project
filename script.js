function homePage() {
  let allbox = document.querySelectorAll(".showcase .box");
  let allopenbox = document.querySelectorAll(".openBox");
  let showcase = document.querySelector(".showcase");
  let close = document.querySelectorAll(".close");
  let mq=document.querySelector('.mq-sec');
  let x;
  allbox.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      showcase.style.display = "none";
      mq.style.display="none";
      x = allopenbox[e.target.id];
      x.style.display = "block";
    });
  });
  close.forEach((e) => {
    e.addEventListener("click", () => {
      showcase.style.display = "flex";
      mq.style.display="flex";
      x.style.display = "none";
    });
  });
}
homePage(); 
function todoPage(){
let form = document.querySelector('.todo-mid-wrapper>.box form');
let input = document.querySelector('.todo-mid-wrapper>.box form input');
let textarea = document.querySelector('.todo-mid-wrapper>.box form textarea');
let checkbox = document.querySelector('.todo-mid-wrapper>.box form .input-wrapper input');
let todoItems=document.querySelector('.box2>.todo-items');
let todoFormSubmit=document.getElementById('todoFormSubmit');
let emptyTodo=document.querySelector('.emptyTodo');
let compleateTodo=document.querySelector('.compleateTodo');
let taskDone=document.querySelector('.compleated-todo');
let todos = JSON.parse(localStorage.getItem('todo')) || [];
showTodos();

function showTodos(){
(todos.length===0)?emptyTodo.style.display='block':emptyTodo.style.display='none';
// logic for filterig UI based on importance
let imp = todos.filter(e=>e.imp === true);
let notImp = todos.filter(e=>e.imp === false);
let compleate=todos.filter(e=>e.compleated === true );
(compleate.length===0)?compleateTodo.style.display='block':compleateTodo.style.display='none';
// let inCompleate=todos.filter(e=>e.compleated === false );
let merge = [...imp,...notImp];
let todo='';
merge.forEach((e)=>{
    todo+=`<li>
                  <details>
                  <summary>${e.todoName} <sup><i class="${e.imp?'ri-verified-badge-fill':''}"></i></sup>
                  </summary>
                  <h3>${e.todoDesc}</h3>
                  </details>
                  <span class="icons">  
                  
                    <i class="ri-pencil-fill" data-id="${e.id}"></i>
                    <i class="ri-delete-bin-6-fill" data-id="${e.id}"></i>
                    <i class="ri-target-fill ${e.compleated?'active':''}" data-id="${e.id}"></i>
                  </span>
                </li>`; 
});
todoItems.innerHTML=todo;
let done='';
compleate.forEach(e=>{
 done+=`<li>
                  <details>
                  <summary>${e.todoName}</summary>
                  <h3>${e.todoDesc}</h3>
                  </details>
                </li>`; 
});
taskDone.innerHTML=done;
}
function validateForm(){
  const title = input.value.trim();
  const desc = textarea.value.trim();
  if(title && desc){
    todoFormSubmit.style.opacity=1;
    todoFormSubmit.style.cursor='pointer';
    todoFormSubmit.disabled=false;
  }else{
    todoFormSubmit.style.opacity=0.5;
    todoFormSubmit.style.cursor='not-allowed';
    todoFormSubmit.disabled=true;
  }
}

let editIndex = null;
input.addEventListener('input', validateForm);
textarea.addEventListener('input', validateForm);

form.addEventListener('submit',(e)=>{
  e.preventDefault(); 
  if(input.value.trim()!==''&& textarea.value.trim()!== ''){
  const data= {
  id:(editIndex!==null)?todos[editIndex].id:Date.now(),
  todoName:input.value,
  todoDesc:textarea.value,
  imp:checkbox.checked,
  compleated:false
 }
      if(editIndex!==null){
      todos[editIndex]=data;
      editIndex=null;
      }else{
      todos.push(data);
      }
  }else{
    console.error("Please Provide a Readable Character")
  }
  localStorage.setItem('todo', JSON.stringify(todos));
  form.reset();
  validateForm();
  showTodos();
})

  todoItems.addEventListener('click',(e)=>{
    if(!e.target.classList.contains('ri-pencil-fill')) return;
    const id=Number(e.target.dataset.id);
    let index=todos.findIndex(e=>e.id === id);
    editIndex=index;
    input.value=todos[index].todoName;
    textarea.value=todos[index].todoDesc;
    checkbox.checked=todos[index].imp;
  })

  todoItems.addEventListener('click',(e)=>{
    if(!e.target.classList.contains('ri-delete-bin-6-fill')) return;
    const id=Number(e.target.dataset.id);
    let index=todos.findIndex(e=>e.id===id);
    let x=confirm("Are you sure you want to delete this todo ??");
    if(x){
        todos.splice(index,1);
        localStorage.setItem('todo',JSON.stringify(todos));
        showTodos();
      } 
  })
  
   todoItems.addEventListener('click', (e) => {
  if (!e.target.classList.contains('ri-target-fill')) return;

  const id = Number(e.target.dataset.id);
  const index = todos.findIndex(t => t.id === id);

  if (!todos[index].compleated) {
    alert('Task Completed !!');
    todos[index].compleated = true;
  } else {
    alert('Task Undo...');
    todos[index].compleated = false;
  }

  localStorage.setItem('todo', JSON.stringify(todos));
  showTodos();
});

}
todoPage();
function dailyTask(){
let taskMidWrapper = document.querySelector('.task-mid-wrapper');
let wrapper = document.querySelector('.task-mid-wrapper>.wrapper');
let time = document.querySelector('.task-mid-wrapper>.wrapper .time');
let task = document.querySelector('.task-mid-wrapper>.wrapper .task');
let sequence=Array.from({ length: 24 },(_,id)=>id);

let inputs=JSON.parse(localStorage.getItem('inputs'))||[];

function showData(){
    let data='';
    sequence.forEach((e,id)=>{
    data+=`<div class="wrapper">
             <div class="time">${e}:00-${e+1}:00</div>
               <div class="task"><input data-index=${id} class='input' type='text' placeholder='...' value="${inputs[e]||""}"></div>
          </div>`
});
   taskMidWrapper.innerHTML=data;
}
showData();
taskMidWrapper.addEventListener('input',(e)=>{
    if(!e.target.classList.contains('input')) return; 
    const cleanedValue = e.target.value
   .replace(/\s+/g, ' ')
   .trim();
    inputs[e.target.dataset.index]=cleanedValue;
    localStorage.setItem('inputs',JSON.stringify(inputs));
});
}
dailyTask();
let quote =document.querySelector('.quote-box q');
async function fetchQuote(){
  try{
    const response=await fetch('https://api.api-ninjas.com/v2/randomquotes',{
      headers:{'X-Api-Key':'Vs6szsaLhL5WqPS96dVwjQ==iSvfW99ISXMdx4zN'}
    });
    if(!response.ok){
      throw new Error("Status Code is Different");
    }
    const data=await response.json();
    quote.textContent=data[0].quote
  }catch(error){
    console.error(error);
  }
  finally{
    console.log('Data Fetched Sucessfully');
  }
}
fetchQuote();
function pomodomoTimer(){
let startbtn = document.querySelector('.start');
let pausebtn = document.querySelector('.pause');
let resetbtn = document.querySelector('.reset');
let timeshow = document.querySelector('.right .time');
let workSession=document.querySelector('.work-session');
let totalSec = Number(localStorage.getItem('time')) || 25 * 60;
let isWork=JSON.parse(localStorage.getItem('isWork')||true);
updateTimer();
function pad(s){
  return String(s).padStart(2,0);
}
function updateTimer(){
  let min = Math.floor(totalSec/60);
  let sec = totalSec % 60;
  timeshow.innerHTML =`${pad(min)}:${pad(sec)}`;
  isWork?workSession.innerHTML='work session':workSession.innerHTML='break';
}
let clear;
startbtn.addEventListener('click',()=>{
  clearInterval(clear);
  clear=setInterval(()=>{
  if(totalSec >0){
  totalSec--;
  localStorage.setItem('time',totalSec);
  updateTimer();
  }else{
    clearInterval(clear);
    isWork =!isWork;
    localStorage.setItem('isWork',JSON.stringify(isWork));
    totalSec = isWork ? 25 * 60 : 5 * 60;
    localStorage.setItem('time',totalSec);
    updateTimer();
  }
},1000);
})
pausebtn.addEventListener('click',()=>{
  clearInterval(clear);
});
resetbtn.addEventListener('click',()=>{
    clearInterval(clear);
    totalSec = isWork ? 25 * 60 : 5 * 60;
    localStorage.setItem('time',totalSec);
    updateTimer();
});
}
pomodomoTimer();
let todo = document.querySelector('.box1');
let progress = document.querySelector('.box2');
let done = document.querySelector('.box3');
let addTask= document.querySelector('.addTask');
let addoverlay = document.querySelector('.addoverlay');
let form=document.querySelector('.overlay form');
addTask.addEventListener('click',()=>{
  addTask.innerHTML = addTask.innerHTML === "Add Task" ? "Undo" : "Add Task";
  addoverlay.classList.toggle('hidden');
  addoverlay.classList.toggle('overlay');
})
form.addEventListener('submit',(e)=>{
  e.preventDefault();
})