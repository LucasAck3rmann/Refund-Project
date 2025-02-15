const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const expenseList = document.querySelector("ul");

//captura evento de input do campo de valor
amount.oninput = function () {
  let amountValue = amount.value.replace(/\D/g, "");

  amountValue = Number(amountValue) / 100;

  amount.value = formatAmount(amountValue);
};

//função para formatar o valor do input
function formatAmount(amountValue) {
  amountValue = amountValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return amountValue;
}

//captura evento de submit do formulário
form.onsubmit = function (event) {
  event.preventDefault();

  //cria um novo objeto com os dados do formulário
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };

  addExpense(newExpense);
  updateExpenseCount();
};

//adição de despesa
function addExpense(newExpense) {
  try {
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    const expenseText = document.createElement("strong");
    expenseText.textContent = newExpense.expense;

    const categorySpan = document.createElement("span");
    categorySpan.textContent = newExpense.category_name;

    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`;

    const expenseIconError = document.createElement("img");
    expenseIconError.classList.add("remove-icon");
    expenseIconError.setAttribute("src", "/img/remove.svg");
    expenseIconError.setAttribute("alt", "remover");

    expenseInfo.appendChild(expenseText);
    expenseInfo.appendChild(categorySpan);
    expenseItem.append(
      expenseIcon,
      expenseInfo,
      expenseAmount,
      expenseIconError
    );
    expenseList.append(expenseItem);
  } catch (error) {
    alert("Erro ao adicionar despesa");
    console.log(error);
  }
}

//uptade contador
function updateExpenseCount() {
  const expenseCount = document.querySelector("header span");
  const totalExpenses = expenseList.children.length;
  expenseCount.textContent = `${totalExpenses} Despesas`;
}

//remoção de despesa
expenseList.onclick = function (event) {
  const clickedElement = event.target;

  if (clickedElement.classList.contains("remove-icon")) {
    clickedElement.parentElement.remove();
    updateExpenseCount();
  }
};