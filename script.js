// Select DOM elements
const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('moneyPlus');
const moneyMins = document.getElementById('moneyMins');
const transactionList = document.getElementById('list');
const form = document.getElementById('form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');

// Initialize variables
let totalIncome = 0;
let totalExpense = 0;

// Function to update the balance display
function updateBalance() {
    const netBalance = totalIncome - totalExpense;
    balance.textContent = `$${netBalance.toFixed(2)}`;
    moneyPlus.textContent = `+$${totalIncome.toFixed(2)}`;
    moneyMins.textContent = `-$${totalExpense.toFixed(2)}`;
}

// Function to add a transaction
function addTransaction(e) {
    e.preventDefault(); // Prevent the form from submitting

    const description = textInput.value;
    const amount = parseFloat(amountInput.value);

    if (description === '' || isNaN(amount)) {
        alert('Please provide a valid description and amount.');
        return;
    }

    // Determine if the amount is income or expense
    if (amount > 0) {
        totalIncome += amount;
        addTransactionToList(description, amount, true); // true for income
    } else {
        totalExpense += Math.abs(amount);
        addTransactionToList(description, amount, false); // false for expense
    }

    // Update the balance and clear the input fields
    updateBalance();
    textInput.value = '';
    amountInput.value = '';
}

// Function to add a transaction to the list
function addTransactionToList(description, amount, isIncome) {
    const listItem = document.createElement('li');
    listItem.textContent = `${description}: $${Math.abs(amount).toFixed(2)}`;
    listItem.className = isIncome ? 'income' : 'expense';

    // Append the list item to the transaction list
    transactionList.appendChild(listItem);

    // If this is the first transaction, remove the "No Transaction" message
    if (transactionList.childElementCount === 1) {
        transactionList.innerHTML = '';
    }
}

// Event listener for the form submission
form.addEventListener('submit', addTransaction);
