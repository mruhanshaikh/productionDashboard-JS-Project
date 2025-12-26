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
