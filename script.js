function showcase() {
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
showcase(); 
let form = document.querySelector('.mid-wrapper>.box form');
let input = document.querySelector('.mid-wrapper>.box form input');
let textarea = document.querySelector('.mid-wrapper>.box form textarea');
let checkbox = document.querySelector('.mid-wrapper>.box form .input-wrapper input');
let todoItems=document.querySelector('.box2>.todo-items');
let todoFormSubmit=document.getElementById('todoFormSubmit');
let todos = JSON.parse(localStorage.getItem('todo')) || [];
showTodos();
function showTodos(){
let todo='';
todos.forEach((e,id)=>{
    todo+=`<li id=${id}>
                  <details>
                  <summary>${e.todoName} <sup><i class="${e.imp?'ri-verified-badge-fill':''}"></i></sup>
                  </summary>
                  <h3>${e.todoDesc}</h3>
                  </details>
                  <span>
                    <i class="ri-edit-circle-fill"></i><i class="ri-target-fill"></i>
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
  }else{
    todoFormSubmit.style.opacity=0.5;
    todoFormSubmit.style.cursor='not-allowed';
  }
}
input.addEventListener('input', validateForm);
textarea.addEventListener('input', validateForm);
form.addEventListener('submit',(e)=>{
  e.preventDefault(); 
  if(input.value.trim()!==''&& textarea.value.trim()!== ''){
  todos.push({
  todoName:input.value,
  todoDesc:textarea.value,
  imp:checkbox.checked
})
  }else{
    console.error("Please Provide a Readable Character")
  }
 localStorage.setItem('todo', JSON.stringify(todos));
  form.reset();
  validateForm();
  showTodos();
})
function edit(){
  let edit=document.querySelectorAll('.ri-edit-circle-fill');
  edit.forEach(e=>{
  e.addEventListener('click',e=>{
    console.log();
  })
})
}
edit();