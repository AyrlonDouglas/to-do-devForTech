const input = document.querySelector(".input-todo");

input.addEventListener("keyup", (e) => {
  e.preventDefault();
  let key = e.which || e.keyCode;

  if (key == 13 && e.target.value) {
    //obtem a list no localstorage
    let listCurrent = localStorage.getItem("list");
    // transforma em objeto js
    listCurrent = JSON.parse(listCurrent);
    if (!listCurrent) {
      listCurrent = [];
    }
    //adiciona conteudo a list para localstorage
    listCurrent.unshift({
      value: e.target.value,
      checked: false,
    });
    // armazena lista atualizada no localstorage
    localStorage.setItem("list", JSON.stringify(listCurrent));
    input.value = "";
    runFunctionEssencials();
  }
});

const setClickClose = (list, items) => {
  let closes = document.querySelectorAll(".close");
  for (let close of closes) {
    close.addEventListener("click", (e) => {
      e.preventDefault();
      let listCurrentInLocal = JSON.parse(localStorage.getItem("list"));
      listCurrentInLocal.splice(
        e.target.attributes.class.nodeValue.split(" ")[2].split("-")[1],
        1
      );
      localStorage.setItem("list", JSON.stringify(listCurrentInLocal));

      runFunctionEssencials();
    });
  }
};

const setClickCheckbox = () => {
  let listCurrentInLocal = JSON.parse(localStorage.getItem("list"));
  checks = document.querySelectorAll(".check");
  checks.forEach((check) => {
    check.onclick = (e) => {
      if (e.target.checked) {
        listCurrentInLocal[
          e.target.attributes.id.value.split("-")[1]
        ].checked = true;
      } else {
        listCurrentInLocal[
          e.target.attributes.id.value.split("-")[1]
        ].checked = false;
      }
      localStorage.setItem("list", JSON.stringify(listCurrentInLocal));

      runFunctionEssencials();
    };
  });
};

const generateList = () => {
  let list = document.querySelector(".todo-list");
  let listCurrentInLocal = JSON.parse(localStorage.getItem("list"));
  let newList = "";

  for (let i = 0; i < listCurrentInLocal.length; i++) {
    newList += ` 
    <li class="todo-item ${
      listCurrentInLocal[i].checked ? "completed" : ""
    }" id="li-${i}">
        <div class="wrapper-check">
            <input type="checkbox" class="check" id="checkbox-${i}"  ${
      listCurrentInLocal[i].checked ? "checked" : ""
    }>
            <p>${listCurrentInLocal[i].value}</p>
        </div>
        <span class="material-symbols-outlined close index-${i}">close</span>
    </li>`;
  }
  list.innerHTML = newList;
};

const runFunctionEssencials = () => {
  generateList();
  setClickClose();
  setClickCheckbox();
};
runFunctionEssencials();
