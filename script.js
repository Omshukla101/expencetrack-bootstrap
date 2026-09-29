let expenses = [];

let editIndex = -1;


// Get elements
const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");
const submitBtn = document.getElementById("submitBtn");
const emptyMessage = document.getElementById("emptyMessage");


// Add / Edit Expense
expenseForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);

    if (name === "" || amount <= 0) {
        return;
    }


    // Edit existing expense
    if (editIndex !== -1) {

        expenses[editIndex].name = name;
        expenses[editIndex].amount = amount;

        editIndex = -1;

        submitBtn.textContent = "Add Expense";
        submitBtn.classList.remove("btn-warning");
        submitBtn.classList.add("btn-primary");

    }

    // Add new expense
    else {

        const expense = {
            name: name,
            amount: amount
        };

        expenses.push(expense);

    }


    // Save to localStorage
    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );


    // Display expenses
    displayExpenses();


    // Clear form
    expenseForm.reset();

});


// Display expenses
function displayExpenses() {

    expenseList.innerHTML = "";


    if (expenses.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }


    expenses.forEach(function (expense, index) {

        const row = document.createElement("tr");


        row.innerHTML = `

            <td>${index + 1}</td>

            <td>${expense.name}</td>

            <td>₹${expense.amount}</td>

            <td>

                <button
                    class="btn btn-warning btn-sm me-2"
                    onclick="editExpense(${index})"
                >
                    Edit
                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteExpense(${index})"
                >
                    Delete
                </button>

            </td>

        `;


        expenseList.appendChild(row);

    });


    calculateTotal();

}


// Calculate total
function calculateTotal() {

    let total = 0;

    expenses.forEach(function (expense) {

        total += expense.amount;

    });

    totalAmount.textContent = total;

}


// Edit expense
function editExpense(index) {

    expenseName.value = expenses[index].name;

    expenseAmount.value = expenses[index].amount;

    editIndex = index;

    submitBtn.textContent = "Update Expense";

    submitBtn.classList.remove("btn-primary");

    submitBtn.classList.add("btn-warning");

}


// Delete expense
function deleteExpense(index) {

    expenses.splice(index, 1);


    // Update localStorage
    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );


    displayExpenses();

}