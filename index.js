const form = document.querySelector("form");
const btns = document.querySelectorAll("button");
const peopleCount = document.querySelector("#people");
const error = document.querySelector(".error");
const tipPerPerson = document.querySelector(".tip__per__person");
const totalPerPerson = document.querySelector(".total__per__person");
const customTip = document.querySelector(".tip__custom");
const resetBtn = document.querySelector(".tip__details button");
const billInput = document.querySelector("#bill");

const validate = {
  bill: (value) => value > 0,
  tip: (value) => value > 0,
  people: (value) => value > 0,
};

const dataValidate = (key, value, validation) => {
  if (!validation[key]) return true;
  return validate[key](value);
};
const calculateTip = {
  totalPerPerson: ({ bill, tip, people }) =>
    round((parseInt(bill) + getPercent(bill, tip)) / people),
  tipPerPerson: ({ bill, tip, people }) =>
    round(getPercent(bill, tip) / people),
};

const getPercent = (bill, tip) => {
  return (bill * tip) / 100;
};

const round = (num) => Math.round(num * 100) / 100;
let clickedBtn = null;

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    btns.forEach((el) => el.classList.remove("active"));
    if (e.target.id === "reset") {
      console.log(btn);
      form.reset();
      totalPerPerson.textContent = "$0.00";
      tipPerPerson.textContent = "$0.00";
    } else {
      clickedBtn = e.target;
      clickedBtn.classList.add("active");
      customTip.value = "";

    }
  });
});


const handleClick = (e) => {
  e.preventDefault();

  if (billInput.value === "" && peopleCount.value === "" && clickedBtn === null)
    resetBtn.disabled = true;
  else {
    resetBtn.disabled = false;
  }
    if (e.target.classList.contains('tip__custom'))  btns.forEach((el) => el.classList.remove("active"));

  const formData = new FormData(form);

  if (clickedBtn && formData.get("tip") === "")
    formData.append("tip", clickedBtn.value);
  const data = Object.fromEntries(formData);
  let isValid = true;
  Object.keys(data).forEach((name) => {
    if (!dataValidate(name, data[name], validate)) isValid = false;
  });

  if (isValid) {
    tipPerPerson.textContent = `$${calculateTip.tipPerPerson(data)}`;
    totalPerPerson.textContent = `$${calculateTip.totalPerPerson(data)}`;
  }
};

const handlePeopleCount = (e) => {
  const wrapper = e.target.closest(".input-wrapper");
  if (parseInt(e.target.value) <= 0 || e.target === "") {
    let err = e.target.closest(".form-group").querySelector(".error");
    console.log(err);
    err.textContent = "Can't be zero";
    wrapper.classList.add("input-err");
    return;
  }
  error.innerHTML = " ";
  wrapper.classList.remove("input-err");

  handleClick(e);
};
resetBtn.disabled = true;
form.reset()
peopleCount.addEventListener("input", handlePeopleCount);
form.addEventListener("submit", handleClick);
customTip.addEventListener("input", handleClick);
billInput.addEventListener("input", handleClick);
