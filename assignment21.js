// Data Structure
let employees = [];

// DOM Elements
const nameInput = document.getElementById('empName');
const salaryInput = document.getElementById('empSalary');
const deptInput = document.getElementById('empDept');
const messageBox = document.getElementById('messageBox');
const employeeList = document.getElementById('employeeList');

// Utility to display messages
const showMessage = (msg) => {
    messageBox.innerHTML = msg;
};

// Render Employees to DOM
const displayEmployees = () => {
    employeeList.innerHTML = '';
    
    // Loops (for...of) and Arrow Functions
    for (const emp of employees) {
        // Object Destructuring
        const { name, salary, department } = emp;
        
        // Conditions & String Methods
        const salaryClass = salary >= 50000 ? 'High' : 'Low';
        const upperName = name.toUpperCase();

        // Template Literals
        const cardHtml = `
            <div class="employee-card">
                <h3>${upperName}</h3>
                <p>Dept: ${department}</p>
                <p>Salary: $${salary}</p>
                <span class="badge ${salaryClass.toLowerCase()}">${salaryClass} Salary</span>
            </div>
        `;
        employeeList.innerHTML += cardHtml;
    }
};

// Add Employee (push)
document.getElementById('addBtn').addEventListener('click', () => {
    const name = nameInput.value.trim();
    const salary = Number(salaryInput.value);
    const department = deptInput.value.trim();

    // Validation
    if (!name || !salary || !department) {
        showMessage('Please fill all fields correctly.');
        return;
    }

    employees.push({ name, salary, department });
    
    nameInput.value = '';
    salaryInput.value = '';
    deptInput.value = '';
    
    showMessage(`Added ${name} successfully!`);
    displayEmployees();
});

// Delete Last (pop)
document.getElementById('deleteLastBtn').addEventListener('click', () => {
    if (employees.length === 0) return showMessage('No employees to delete.');
    const removed = employees.pop();
    showMessage(`Removed last employee: ${removed.name}`);
    displayEmployees();
});

// Delete First (shift)
document.getElementById('deleteFirstBtn').addEventListener('click', () => {
    if (employees.length === 0) return showMessage('No employees to delete.');
    const removed = employees.shift();
    showMessage(`Removed first employee: ${removed.name}`);
    displayEmployees();
});

// Extract Salaries (map)
// document.getElementById('extractSalariesBtn').addEventListener('click', () => {
//     const salaries = employees.map(emp => emp.salary);
//     showMessage(`Extracted Salaries: ${salaries.join(', ')}`);
// });

// Filter Salaries > 30000 (filter)
// document.getElementById('filterSalariesBtn').addEventListener('click', () => {
//     const highEarners = employees.filter(emp => emp.salary > 30000);
//     // Spread operator usage demo
//     const copyOfEarners = [...highEarners]; 
//     const names = copyOfEarners.map(emp => emp.name);
//     showMessage(`Employees earning > 30k: ${names.join(', ') || 'None'}`);
// });

// Total Salary (reduce)
document.getElementById('totalSalaryBtn').addEventListener('click', () => {
    const total = employees.reduce((acc, emp) => acc + emp.salary, 0);
    showMessage(`Total Salary Output: $${total}`);
});

// Average Salary (Rest parameters demo)
const calculateAverage = (...salaries) => {
    if (salaries.length === 0) return 0;
    const total = salaries.reduce((a, b) => a + b, 0);
    return (total / salaries.length).toFixed(2);
};

document.getElementById('avgSalaryBtn').addEventListener('click', () => {
    const allSalaries = employees.map(emp => emp.salary);
    // Using spread to pass array as rest parameters
    const avg = calculateAverage(...allSalaries); 
    showMessage(`Average Salary: $${avg}`);
});

// JSON Handling
// document.getElementById('jsonBtn').addEventListener('click', () => {
//     const jsonString = JSON.stringify(employees);
//     const parsedData = JSON.parse(jsonString);
//     console.log("Parsed Data:", parsedData);
//     showMessage(`JSON Data created! Check console for Parsed Objects.`);
// });

// Promise Simulation
// document.getElementById('promiseBtn').addEventListener('click', () => {
//     showMessage('Loading data... Please wait.');
//     const loadPromise = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("Simulated loading completed successfully!");
//         }, 1500);
//     });

//     loadPromise.then((msg) => {
//         showMessage(msg);
//     });
// });

// Fetch API (AJAX)
document.getElementById('fetchBtn').addEventListener('click', async () => {
    showMessage('Fetching API Data...');
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        
        // Loop through API data and push to our array
        users.slice(0, 5).forEach(user => {
            employees.push({
                name: user.name,
                // Assigning mock salary and dept since API doesn't have them
                salary: Math.floor(Math.random() * 40000) + 20000, 
                department: "API Support"
            });
        });
        
        showMessage('Successfully fetched 5 users from JSONPlaceholder API!');
        displayEmployees();
    } catch (error) {
        showMessage(`Error fetching data: ${error.message}`);
    }
});