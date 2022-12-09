const activityTable = document.querySelector('#activityTable');
const currentBalanceP = document.querySelector('#currentBalance');

const addIncomeAmount = document.querySelector('#incomeAmount');
const addIncomeDescript = document.querySelector('#incomeDescription');
const addIncomeButton = document.querySelector('#addIncomeModalButton');

const addExpenseAmount = document.querySelector('#expenseAmount');
const addExpenseDescript = document.querySelector('#expenseDescription');
const addExpenseButton = document.querySelector('#addExpenseModalButton');

const arrayTransactions = []

let savingTotal = 0;

let incomesTotal = 0;
let expensesTotal = 0;


/**Mostrar balance actual */ 
const showCurrentBalance = () => {
    currentBalanceP.innerHTML = "";
    savingTotal = 0;
    console.log(savingTotal)
    arrayTransactions.forEach(transaction => {
        savingTotal += parseFloat(transaction.amount);
        console.log(savingTotal)
    })
    currentBalanceP.innerHTML = savingTotal;
}


//Calcular incomes y expenses 
const showIncomesExpenses = () => {
    arrayTransactions.forEach(transaction => {
        let amount = parseFloat(transaction.amount);
        if (amount >= 0) {
            incomesTotal += amount;
        } else {
            expensesTotal += amount;
        }
    })
}
//Añadir un ingreso al array
const addIncome = () => {
    const description = addIncomeDescript.value;
    let amount = addIncomeAmount.value;
    amount = parseFloat(amount).toFixed(2);

    arrayTransactions.push({description,amount});
    console.log(arrayTransactions);
    createTransactionTr()
    showCurrentBalance(); 
}

//Añadir un gasto al array
const addExpense = () => {
    const description = addExpenseDescript.value;
    let amount = addExpenseAmount.value;
    amount =  parseFloat(-amount).toFixed(2);
    arrayTransactions.push({description,amount});
    console.log(arrayTransactions);
    createTransactionTr()
    showCurrentBalance(); 
}

// Creamos la tabla para las transacciones
const createTransactionTr = () => {
    activityTable.innerHTML = '';
    arrayTransactions.forEach(transaction => {
        const newExpense = document.createElement('tr');
        let newRow = `<td>${transaction.description}</td>
                    <td>${transaction.amount}</td>
                    <td><img class="RRSS" src="imgs/bin.png"></td>
                    <td class="tableColor"></td>`;
        newExpense.innerHTML = newRow;

        activityTable.insertAdjacentHTML('afterbegin', newRow);
    })
};    


//Eliminar una transacción

// Event listeners y funciones
addIncomeButton.addEventListener('click', addIncome);
addExpenseButton.addEventListener('click', addExpense);

createTransactionTr()