const userForm = document.getElementById('userForm');
const userTableBody = document.getElementById('userTableBody');
const searchRole = document.getElementById('searchRole');

let users = [];

// Load users from local storage
function loadUsers() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
        renderUserTable();
    }
}

// Add new user
userForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const userName = document.getElementById('userName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userRole = document.getElementById('userRole').value;

    const user = {
        name: userName,
        email: email,
        password: password,  // You may want to encrypt or hash this in a real system
        role: userRole
    };

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users)); // Save to local storage
    renderUserTable();
    userForm.reset();
});

function renderUserTable() {
    userTableBody.innerHTML = '';
    const filteredUsers = users.filter(user => {
        return searchRole.value ? user.role.includes(searchRole.value) : true;
    });

    filteredUsers.forEach((user) => {
        const row = `<tr>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.role}</td>
                     </tr>`;
        userTableBody.insertAdjacentHTML('beforeend', row);
    });
}

// Filter user list by role
searchRole.addEventListener('input', renderUserTable);

// Load users when the page loads
loadUsers();

