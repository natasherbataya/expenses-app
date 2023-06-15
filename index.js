let LIMIT = 0;
const CURRENCY = "руб.";
const STATUS_IN_LIMIT = "все хорошо";
const STATUS_OUT_OF_LIMIT = "все плохо";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "limit_red";
const OUTPUT_MESSAGE_CLASSNAME = "output";

const inputNode = document.querySelector(".js-input");
const addButtonNode = document.querySelector(".js-add-button");
const historyNode = document.querySelector(".js-history__list");
const sumNode = document.querySelector(".js-sum");
const limitNode = document.querySelector(".js-limit");
const statusNode = document.querySelector(".js-status");
const clearButtonNode = document.querySelector(".js-clear-button");
const popupInputNode = document.querySelector('.js-popup__input-limit');
const popupAddLimitBtnNode = document.querySelector('.js-popup__btn-add-limit');
const selectCategoryNode = document.querySelector('.js-select__category');
const outputMessageLimit = document.querySelector('.js-output');
const outputMessageCategory = document.querySelector('.js-output__message');



const POPUP_OPENED_CLASSNAME = 'popup_open';
const BODY_FIXED_CLASSNAME = 'body_fixed';

const bodyNode = document.querySelector('body');
const popupNode = document.querySelector('.js-popup');
const popupBtnOpenNode = document.querySelector('.js-popup_btn-open');
const popupContentNode = document.querySelector('.js-popup__content');
const popupBtnCloseNode = document.querySelector('.js-popup__btn-close');

popupBtnOpenNode.addEventListener('click', togglePopup);
popupBtnCloseNode.addEventListener('click', togglePopup);

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


let expenses = [];

init(expenses);

function init(expenses) {
  limitNode.innerText = LIMIT;
  statusNode.innerText = STATUS_IN_LIMIT;
  sumNode.innerText = calculateExpenses(expenses);
};


function popupAddLimitBtnHandler() {
  LIMIT = parseInt(popupInputNode.value);

  if (!LIMIT) {
    const messageLimit = 'Введите лимит';
    outputMessageLimit.innerText = messageLimit;
    outputMessageLimit.classList.add(OUTPUT_MESSAGE_CLASSNAME);
    return;
  } else {
    outputMessageLimit.innerText = '';
  };

  clearInput();
  togglePopup();
  return limitNode.innerText = LIMIT;
}


function getExpenseFromUser() {
  const expense = parseInt(inputNode.value);
  if (!expense) {
    return;
  };

  return expense;
};


function getCategoryFromUser() {
  const selectedCategory = selectCategoryNode.value;

  return selectedCategory;
};

function addButtonHandler() {
  const currentAmount = getExpenseFromUser();

  const currentCategory = getCategoryFromUser();

  if (currentCategory === "Категория") {
    outputMessageCategory.innerText = 'Выберите категорию';
    outputMessageCategory.classList.add(OUTPUT_MESSAGE_CLASSNAME);
    return;

  } else {
    outputMessageCategory.innerText = '';
  };


  const newExpenses = { amount: currentAmount, category: currentCategory };

  expenses.push(newExpenses);

  clearInput();

  render(expenses);
}

function calculateExpenses() {
  let sum = 0;
  expenses.forEach((expense) => {
    sum += expense.amount;
  });

  return sum;
}

function render(expenses) {
  const sum = calculateExpenses(expenses);

  renderHistory();
  renderSum(sum);
  renderStatus(sum);
};

function renderHistory() {
  historyNode.innerHTML = '';

  expenses.forEach(expense => {
    const historyItem = document.createElement('li');
    historyItem.classList.add('rub');
    historyItem.innerText = `${expense.category} - ${expense.amount}`;

    historyNode.appendChild(historyItem);
  });

};

function renderSum(sum) {
  sumNode.innerText = sum;
};

function renderStatus(sum) {
  if (sum <= LIMIT) {
    statusNode.innerText = STATUS_IN_LIMIT;
  } else {
    statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${LIMIT - sum} ${CURRENCY}) `;
    statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  }
};

function clearInput() {
  inputNode.value = '';
  popupInputNode.value = '';
};

function clearButtonHandler() {
  expenses = [];
  render();
  statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
}


popupAddLimitBtnNode.addEventListener('click', popupAddLimitBtnHandler);
addButtonNode.addEventListener("click", addButtonHandler);
clearButtonNode.addEventListener("click", clearButtonHandler);








