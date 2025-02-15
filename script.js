const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

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
    id: Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };
};
