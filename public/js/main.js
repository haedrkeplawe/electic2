let Nav = document.querySelector("nav");
let OpenBtn = document.querySelector("nav .head span.open");
let CloseBtn = document.querySelector("nav .head span.close");
let ChosseBtn = document.querySelectorAll("section button");
let H4 = document.querySelectorAll("section h4");
let Box = document.querySelectorAll("section .box");

OpenBtn.onclick = (params) => {
  Nav.style.height = "400px";
  OpenBtn.style.display = "none";
  CloseBtn.style.display = "block";
};
CloseBtn.onclick = (params) => {
  Nav.style.height = "99px";
  CloseBtn.style.display = "none";
  OpenBtn.style.display = "flex";
};
//
function GetH4() {
  H4.forEach((element) => {
    element.addEventListener("click", () => {
      H4.forEach((element) => {
        element.classList.remove("active");
      });
      element.classList.add("active");
    });
  });
}
GetH4();

ChosseBtn.forEach((element) => {
  element.addEventListener("click", () => {
    H4.forEach((ele) => {
      if (
        ele.dataset.id === element.dataset.id &&
        ele.dataset.name === element.dataset.name &&
        ele.classList == "active"
      ) {
        console.log(ele.dataset.id);
        console.log(element.dataset.id);
        ele.style.background = "#c2efee";
        ele.classList.add("truo");
      } else if (ele.dataset.name === element.dataset.name && ele.dataset.id === element.dataset.id) {
        ele.style.background = "#c2efee";
      }

      if (
        ele.classList == "active" &&
        ele.dataset.name != element.dataset.name &&
        ele.style.background != "#efc2c2"
      ) {
        ele.style.background = "#efc2c2";
        ele.classList.add("false");
      }
    });

    // Box.forEach((ele) => {
    //   if (ele.dataset.name === element.dataset.name) {
    //     element.style.pointerEvents = "none";
    //     ele.style.background = "#faefeff0";
    //   }
    // });
  });
});
