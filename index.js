let LIMIT = 0;
const CURRENCY = "руб.";
const STATUS_IN_LIMIT = "все хорошо";
const STATUS_OUT_OF_LIMIT = "все плохо";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "limit_red";

const inputNode = document.querySelector(".js-input");
const addButtonNode = document.querySelector(".js-add-button");
const historyNode = document.querySelector(".js-history");
const sumNode = document.querySelector(".js-sum");
const limitNode = document.querySelector(".js-limit");
const statusNode = document.querySelector(".js-status");
const clearButtonNode = document.querySelector(".js-clear-button");
const popupInputNode = document.querySelector('.js-popup__input-limit');
const popupAddLimitBtnNode = document.querySelector('.js-popup__btn-add-limit');
const selectCategoryNode = document.querySelector('.js-select__category');

const POPUP_OPENED_CLASSNAME = 'popup_open';
const BODY_FIXED_CLASSNAME = 'body_fixed';

const bodyNode = document.querySelector('body');
const popupNode = document.querySelector('.js-popup');
const popupBtnOpenNode = document.querySelector('.js-popup_btn-open');
const popupContentNode = document.querySelector('.js-popup__content');
// const popupBtnCloseNode = document.querySelector('.js-popup__btn-close');

popupBtnOpenNode.addEventListener('click', togglePopup);
// popupBtnCloseNode.addEventListener('click', togglePopup);

popupNode.addEventListener('click', (event) => {
  const isClickOutsideContent = !event.composedPath().includes(popupContentNode)

  if (isClickOutsideContent) {
    togglePopup();
  }
})


function togglePopup() {
  popupNode.classList.toggle(POPUP_OPENED_CLASSNAME);
  bodyNode.classList.toggle(BODY_FIXED_CLASSNAME);
}



const expenses = [];

init(expenses);

popupAddLimitBtnNode.addEventListener('click', function () {
  LIMIT = popupInputNode.value;
  if (!LIMIT) {
    return;
  }


  return limitNode.innerText = LIMIT;



})


// function getLimitFromUser() {
//   const newLimit = parseInt(popupInputNode.value);
//   console.log(newLimit);

//   if (!newLimit) {
//     return null;
//   }

//   return newLimit;

// }



addButtonNode.addEventListener("click", function () {
  const expense = getExpenseFromUser();
  if (!expense) {
    return;
  }

  trackExpance(expense);

  render(expenses);

  getCategoryFromUser();

});

function init(expenses) {
  limitNode.innerText = LIMIT;
  statusNode.innerText = STATUS_IN_LIMIT;
  sumNode.innerText = calculateExpenses(expenses);
}

function trackExpance(expense) {
  expenses.push(expense);
}

function getExpenseFromUser() {
  if (!inputNode.value) {
    return null;
  }

  const expense = parseInt(inputNode.value);

  clearInput();

  return expense;
}

function getCategoryFromUser() {
  const category = selectCategoryNode.value;
  console.log(category);
}



function clearInput() {
  inputNode.value = '';
}

function calculateExpenses(expenses) {
  let sum = 0;

  expenses.forEach((element) => {
    sum += element;
  });

  return sum;
}

function render(expenses) {
  const sum = calculateExpenses(expenses);

  renderHistory(expenses);
  renderSum(sum);
  renderStatus(sum);
}

function renderHistory(expenses) {
  let expensesListHTML = "";

  //   expenses.forEach(element => {
  //     const elementHTML = `<li>${element}</li>`
  //     expensesListHTML += elementHTML;
  // });

  //     Эту конструкцию ещё можно записать так
  expenses.forEach((element) => {
    expensesListHTML += `<li>${element} ${CURRENCY}</li>`;
  });

  historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
}

function renderSum(sum) {
  sumNode.innerText = sum;
}

function renderStatus(sum) {
  if (sum <= LIMIT) {
    statusNode.innerText = STATUS_IN_LIMIT;
  } else {
    statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${LIMIT - sum} ${CURRENCY}) `;
    statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  }
}

function clear() {
  statusNode.value = '';
  statusNode.innerText = '';
}

clearButtonNode.addEventListener("click", function () {
  // statusNode.value = '';
  // sumNode.innerText = '';
  // historyNode.value = '';
  clear();
});








