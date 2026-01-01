function homePage() {
  let allbox = document.querySelectorAll(".showcase .box");
  let allopenbox = document.querySelectorAll(".openBox");
  let showcase = document.querySelector(".showcase");
  let close = document.querySelectorAll(".close");
  let x;
  allbox.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      showcase.style.display = "none";
      x = allopenbox[e.target.id];
      x.style.display = "block";
    });
  });
  close.forEach((e) => {
    e.addEventListener("click", () => {
      showcase.style.display = "flex";
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
todoFormSubmit.disabled=true;
let todos = JSON.parse(localStorage.getItem('todo')) || [];
showTodos();
function showTodos(){
(todos.length===0)?emptyTodo.style.display='block':emptyTodo.style.display='none';
let todo='';
todos.forEach((e,id)=>{
    todo+=`<li id=${id}>
                  <details>
                  <summary>${e.todoName} <sup><i class="${e.imp?'ri-verified-badge-fill':''}"></i></sup>
                  </summary>
                  <h3>${e.todoDesc}</h3>
                  </details>
                  <span class="icons">
                  
                    <i class="ri-pencil-fill" data-index="${id}"></i>
                    <i class="ri-delete-bin-6-fill" data-index="${id}"></i>
                    <i class="ri-target-fill" data-index="${id}"></i>
                  </span>
                </li>`; 
});
todoItems.innerHTML=todo;
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
  todoName:input.value,
  todoDesc:textarea.value,
  imp:checkbox.checked
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
    const index=e.target.dataset.index;
    editIndex=index;
    input.value=todos[index].todoName;
    textarea.value=todos[index].todoDesc;
    checkbox.checked=todos[index].imp;
  })
  todoItems.addEventListener('click',(e)=>{
    if(!e.target.classList.contains('ri-delete-bin-6-fill')) return;
    const index=e.target.dataset.index;
    let x=confirm("Are you sure you want to delete this todo ??");
    if(x){
        todos.splice(index,1);
        localStorage.setItem('todo',JSON.stringify(todos));
        showTodos();
      } 
  })
  
    todoItems.addEventListener('click',(e)=>{
    if(!e.target.classList.contains('ri-target-fill')) return;
      const index=e.target.dataset.index;
      e.target.classList.toggle('active');
      if(e.target.classList.contains('active')){
        alert('Task Compleated !!')
      }else{
        alert('Task Undo...')
      }
  })

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
