const form = document.querySelector("form");
const pBtns = document.querySelectorAll(".tip__btn");
const peopleCount = document.querySelector("#peopleCount");
const error = document.querySelector(".error");
const validate = {
  billAmount: (value) => value > 0,
  tipPercent: (value) => value > 0,
  tipPercent: (value) => value > 1,
};

const dataValidate = (key, value, validation) => {
  if (!validation[key]) return true;
  return validate[key](value);
};

const calculateTip = {
  totalPerPerson: (bill, tip, people) =>
    (bill + getPercent(bill, tip)) / people,
  tipPerPerson: (bill, tip, people) => getPercent(bill, tip) / people,
};

const getPercent = (bill, tip) => {
  return (bill * tip) / 100;
};

let clickedBtn = null;

pBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    clickedBtn = e.target;
  });
});
const formValid = (form, validation) => {
  const formData = new FormData(form);
  formData.append("tipPercent", clickedBtn.value);
  const data = Object.fromEntries(formData);
  let isValid = true;
  Object.keys(data).forEach((name) => {
    if (!dataValidate(name, data[name], validation)) isValid = false;
  });
  return isValid;
};

const handleClick = (e) => {
  e.preventDefault();

  if (formValid(e.target, validate)) console.log("pass");
  else console.log("fail");
};

const handlePeopleCount = (e) => {
  if (!parseInt(e.target.value) <= 0) {
    error.innerHTML = " ";
    return;
  }

  let err = e.target.closest("div")?.querySelector(".error");
  err.textContent = "Can't be zero";
};

peopleCount.addEventListener("input", handlePeopleCount);
form.addEventListener("submit", handleClick);
