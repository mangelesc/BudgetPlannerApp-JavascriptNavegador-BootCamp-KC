const activityTable = document.querySelector('#activityTable');
const currentBalanceP = document.querySelector('#currentBalance');
const totalIncomesDiv = document.querySelector('#totalIncomes');
const totalExpensesDiv = document.querySelector('#totalExpenses');

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


//Mostrar balance actual 
const showCurrentBalance = () => {
    currentBalanceP.innerHTML = "";
    savingTotal = 0;
    arrayTransactions.forEach(transaction => {
        savingTotal += parseFloat(transaction.amount);
    })
    currentBalanceP.innerHTML = savingTotal + ' €';
}


//Calcular incomes y expenses 
const calculateIncomesExpenses = () => {
    incomesTotal = 0;
    expensesTotal = 0;
    arrayTransactions.forEach(transaction => {
        let amount = parseFloat(transaction.amount);
        if (amount >= 0) {
            incomesTotal += amount;
        } else {
            expensesTotal += amount;
        }
    })
}

const showIncomes = () => {
    totalIncomesDiv.innerHTML = incomesTotal + ' €';
}

const showExpenses = () => {
    totalExpensesDiv.innerHTML = expensesTotal + ' €';
}

// Creamos la tabla para las transacciones
const createTransactionTr = () => {
    activityTable.innerHTML = '';
    //Recorro el array al revés, para luego poner usar el ined de la fila en deleteTransaction
    for(let i = arrayTransactions.length-1; i >= 0; i--){
        const newExpense = document.createElement('tr');
        let newRow = `<td>${arrayTransactions[i].description} </td>
                    <td>${arrayTransactions[i].amount} €</td>
                    <td onclick="deleteTransaction(this)"><img class="binIMG" src="imgs/bin.png" ></td>
                    <td class="tableColor"></td>`;
        newExpense.innerHTML = newRow;

        activityTable.insertAdjacentHTML('beforeend', newRow);
    }
}; 

// Llamamos a todas las funciones desde una sola
const refresh = () => {
    showCurrentBalance();
    calculateIncomesExpenses();
    showIncomes();
    showExpenses();
    createTransactionTr();
}

//Añadir un ingreso al array
const addIncome = () => {
    const description = addIncomeDescript.value;
    let amount = addIncomeAmount.value;
    if (amount>0 && amount!= NaN &&description != ''){
        amount = parseFloat(amount).toFixed(2);
        arrayTransactions.push({description,amount});
        refresh();
    } else {
        alert("Ops, fields cannot be empty!\nMake sure you add a positive integer number in the amount section")
    } 
}

//Añadir un gasto al array
const addExpense = () => {
    const description = addExpenseDescript.value;
    let amount = addExpenseAmount.value;
    if (amount>0 && amount!= NaN &&description != ''){
        amount =  parseFloat(-amount).toFixed(2);
        arrayTransactions.push({description,amount});
        refresh();
    } else {
        alert("Ops, fields cannot be empty!\nMake sure you add a positive integer number in the amount section")
    } 
}

//Eliminar una transacción
const deleteTransaction = (row) => {
    let rowIndex = row.parentElement.rowIndex;
    arrayTransactions.splice(rowIndex,1);
    refresh();
}

// Event listeners y funciones
addIncomeButton.addEventListener('click', addIncome);
addExpenseButton.addEventListener('click', addExpense);
refresh();