function homePage() {
  let allbox = document.querySelectorAll(".showcase .box");
  let allopenbox = document.querySelectorAll(".openBox");
  let showcase = document.querySelector(".showcase");
  let close = document.querySelectorAll(".close");
  let mq=document.querySelector('.mq-sec');
  let dtw=document.querySelector('.daytimewheater-sec');
  let dtwleft=document.querySelector('.daytimewheater-sec .left');
  let dtwcenter=document.querySelector('.daytimewheater-sec .center');
  let dtwinnertext=document.querySelector('.daytimewheater-sec .center .fetch-btn');
  let dtwright=document.querySelector('.daytimewheater-sec .right');
  const url =`https://picsum.photos/1920/1080?random=${Date.now()}`;
  dtw.style.backgroundImage=`url(${url})`;
  let clockInterval;
  let date;
  function render(e){
  if(clockInterval)clearInterval(clockInterval);
  // let date=new Date(e.location.localtime_epoch*1000);
     date=new Date(Date.now());
  let dayname=date.toLocaleDateString('en-US',{
    weekday:"long"
  });
  let monthname=date.toLocaleDateString('en-US',{
    month:"long"
  });
  let initime=date.toLocaleTimeString('en-US',{
        timeZone:e.location.tz_id,
        hour:'numeric',
         minute:'2-digit'
        });
  let day=date.getDate();
  let year=date.getFullYear();
  dtwleft.innerHTML=`
          <time class="datetime">
            <span class="time">${initime}</span>
            <span class="date">${dayname}, ${day} ${monthname} ${year}</span>
          </time>
          <address class="location">${e.location.name}, ${e.location.region}, ${e.location.country}</address>
        </div>`
  dtwright.innerHTML=`
          <div class="weather-main">
            <span class="temperature">${e.current.temp_c}°C</span>
            <span class="condition">${e.current.condition.text}<img src="${e.current.condition.icon}" alt="wheater icon" class="wheater-icon"></span>
          </div>
          <ul class="weather-details">
            <li>
              <span class="label">Humidity</span>
              <span class="value">${e.current.humidity}%</span>
            </li>
            <li>
              <span class="label">Wind</span>
              <span class="value">${e.current.wind_kph} km/h</span>
            </li>
          </ul>
        </div>`
        let time=document.querySelector('.datetime .time');
        clockInterval=setInterval(()=>{
        // date.setSeconds(date.getSeconds()+1);
         date = new Date(date.getTime() + 1000);
        time.textContent=date.toLocaleTimeString('en-US',{
        timeZone:e.location.tz_id,
        hour:'numeric',
         minute:'2-digit'
        });
  },1000);
  }
  let x;
  allbox.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      showcase.style.display = "none";
      dtwleft.style.display="none";
      dtwcenter.style.display="none";
      dtwright.style.display="none";
      mq.style.display="none";
      x = allopenbox[e.target.id];
      x.style.display = "block";
    });
  });
  close.forEach((e) => {
    e.addEventListener("click", () => {
      showcase.style.display = "flex";
      dtwleft.style.display="flex";
      dtwcenter.style.display="flex";
      dtwright.style.display="flex";
      mq.style.display="flex";
      x.style.display = "none";
    });
  });
  const apikey="2290f8ce5c7a467b93f74700260302";
  // const city="dubai";
  dtwcenter.addEventListener('click',()=>{
    window.navigator.geolocation.getCurrentPosition(
    async(e)=>{
     let longitude=e.coords.longitude;
     let latitude=e.coords.latitude;
     await wheatherAPI(latitude,longitude);
     dtwcenter.style.display="none";
    },
    (error)=>{
      dtwinnertext.innerHTML="location is disabled"
      console.error(error.message); 
    }
  )
  })
  async function wheatherAPI(lat,lon) {
    try{
      let response=await fetch(`http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${lat},${lon}`);
      if(!response.ok){
      throw new Error("bad request");
      } 
      let data=await response.json();
      render(data);
      console.log(data.location.tz_id);
    }catch (error){
      console.log(error);
    }
  }
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
function kanbanBoard(){
let common= document.querySelectorAll('.kanban-mid-wrapper .box .items');
let todo = document.querySelector('.box1');
let totaltask = document.querySelector('.box1 .box-top span');
let totalprocess = document.querySelector('.box2 .box-top span');
let totaldone = document.querySelector('.box3 .box-top span');
let emptymsg = document.querySelector('.box1 p');
let progress = document.querySelector('.box2');
let done = document.querySelector('.box3');
let addTask= document.querySelector('.addTask');
let addoverlay = document.querySelector('.addoverlay');
let taskform=document.getElementById('taskform');
let input=document.querySelector('#taskform input');
let textarea=document.querySelector('#taskform textarea');
let submit=document.querySelector('#taskform button');
let itemss=document.querySelector('.box .items');
let left=document.querySelector('.box .left');
let middel=document.querySelector('.box .middel');
let right=document.querySelector('.box .right');
let items=JSON.parse(localStorage.getItem('item'))||[];
render();
dragitems(); 
submit.disabled=true;
function render(){
 if (items.length === 0) {
    // emptymsg.innerHTML = "Nothing Here Yet...";
    left.innerHTML = "Nothing Here Yet...";      // Clear left column
    middel.innerHTML = "Nothing Here Yet...";    // Clear middle column
    right.innerHTML = "Nothing Here Yet...";     // Clear right column
    totaltask.textContent = 0;
    totalprocess.textContent = 0;
    totaldone.textContent = 0;
    return;
  }
  const todoCount = items.filter(item => item.column === 'left').length;
  const inprogressCount = items.filter(item => item.column === 'middel').length;
  const doneCount = items.filter(item => item.column === 'right').length;
  
  totaltask.textContent = `${todoCount}`;
  totalprocess.textContent = `${inprogressCount}`;
  totaldone.textContent = `${doneCount}`;

  // emptymsg.innerHTML = "";

  left.innerHTML = '';
  middel.innerHTML = '';
  right.innerHTML = '';

items.forEach((e,id)=>{
  const taskHTML =`<div class="item" draggable="true" data-index="${id}">
              <h3>${e.task}</h3>  
              <p>${e.desc}</p>
              <button id=${id} class="delbtn">Delete</button>
            </div>  `;
      if (e.column === 'left') {
      left.innerHTML += taskHTML;
    } else if (e.column === 'middel') {
      middel.innerHTML += taskHTML;
    } else if (e.column === 'right') {
      right.innerHTML += taskHTML;
    } else {
      // If no column is saved (old data), put in left by default
      left.innerHTML += taskHTML;
    }
});
}
function validateForm(){
  const title = input.value.trim();
  const desc = textarea.value.trim();
  if(title && desc){
    submit.style.opacity=1;
    submit.style.cursor='pointer';
    submit.disabled=false;
  }else{
    submit.style.opacity=0.5;
    submit.style.cursor='not-allowed';
    submit.disabled=true;
  }
}
input.addEventListener('input',validateForm);
textarea.addEventListener('input',validateForm);
addTask.addEventListener('click',()=>{
  addTask.innerHTML = addTask.innerHTML === "Add Task" ? "Undo" : "Add Task";
  addoverlay.classList.toggle('hidden');
  addoverlay.classList.toggle('overlay');
})
taskform.addEventListener('submit',(e)=>{
  e.preventDefault();
  items.push({
    task:input.value,
    desc:textarea.value,
    column: 'left'
  });
  localStorage.setItem('item',JSON.stringify(items));
  render();
  dragitems(); 
  taskform.reset();
  validateForm();
  addTask.innerHTML = addTask.innerHTML === "Add Task" ? "Undo" : "Add Task";
  addoverlay.classList.toggle('hidden');
  addoverlay.classList.toggle('overlay');
});
  common.forEach((e)=>{
    e.addEventListener('click',(e)=>{
    if(!e.target.classList.contains('delbtn')) return;
    let index = e.target.id;
    let isdelete = confirm(" Do You Really Want to Delete ?");
    if(isdelete){
      items.splice(index,1);  
    }
    localStorage.setItem('item',JSON.stringify(items));
    render();
    dragitems();
  })
  })
let selectedItem = null;
function dragitems() {
  document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', (e) => {
      selectedItem = e.currentTarget;
    });

    item.addEventListener('dragend', () => {
      selectedItem = null;
    });
  }); 
}
function dropitem(container,columnName) {
  container.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  container.addEventListener('drop', () => {
    if (selectedItem) {
      container.appendChild(selectedItem);
      const taskIndex = selectedItem.getAttribute('data-index'); 
      if (taskIndex !== null) {
        items[taskIndex].column = columnName;
        localStorage.setItem('item', JSON.stringify(items));
        render();
        dragitems();
      }
    }
  });
}
dropitem(left, 'left');     
dropitem(middel, 'middel');  
dropitem(right, 'right'); 
}
kanbanBoard();  