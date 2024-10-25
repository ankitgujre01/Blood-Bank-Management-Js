// Load blood units from local storage when the page loads
function loadBloodUnits() {
    const storedUnits = localStorage.getItem("bloodUnits");
    if (storedUnits) {
        const bloodUnits = JSON.parse(storedUnits);
        const tableBody = document.querySelector("#inventoryTableBody");
        bloodUnits.forEach(unit => {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${unit.bloodType}</td>
                <td>${unit.quantity}</td>
                <td>${unit.expiryDate}</td>
                <td><button class="delete-btn">Delete</button></td>
            `;
            tableBody.appendChild(newRow);

            // Delete functionality
            newRow.querySelector(".delete-btn").addEventListener("click", function () {
                deleteBloodUnit(unit); // Call the delete function
                newRow.remove(); // Remove the row from the table
            });
        });
    }
}

// Function to delete blood unit from local storage
function deleteBloodUnit(unitToDelete) {
    const storedUnits = localStorage.getItem("bloodUnits");
    if (storedUnits) {
        let bloodUnits = JSON.parse(storedUnits);
        bloodUnits = bloodUnits.filter(unit => 
            unit.bloodType !== unitToDelete.bloodType || 
            unit.expiryDate !== unitToDelete.expiryDate // You may want to use other identifiers
        );
        localStorage.setItem("bloodUnits", JSON.stringify(bloodUnits));
    }
}

// Add event listener to the form submission
document.querySelector("#bloodUnitForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const bloodType = document.querySelector("#bloodType").value;
    const quantity = document.querySelector("#quantity").value;
    const expiryDate = document.querySelector("#expiryDate").value;

    const tableBody = document.querySelector("#inventoryTableBody");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${bloodType}</td>
        <td>${quantity}</td>
        <td>${expiryDate}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    tableBody.appendChild(newRow);

    // Clear the form fields
    document.querySelector("#bloodUnitForm").reset();

    // Add new blood unit to local storage
    addBloodUnit({ bloodType, quantity, expiryDate });

    // Delete functionality
    newRow.querySelector(".delete-btn").addEventListener("click", function () {
        deleteBloodUnit({ bloodType, expiryDate }); // Call delete function
        newRow.remove(); // Remove the row from the table
    });
});

// Function to add blood unit to local storage
function addBloodUnit(unit) {
    const storedUnits = localStorage.getItem("bloodUnits");
    let bloodUnits = storedUnits ? JSON.parse(storedUnits) : [];
    bloodUnits.push(unit);
    localStorage.setItem("bloodUnits", JSON.stringify(bloodUnits));
}

// Filtering functionality for blood type
document.querySelector("#searchBloodType").addEventListener("input", function () {
    const filterValue = this.value.toLowerCase();
    const rows = document.querySelectorAll("#inventoryTableBody tr");
    rows.forEach((row) => {
        const bloodType = row.querySelector("td").textContent.toLowerCase();
        row.style.display = bloodType.includes(filterValue) ? "" : "none";
    });
});

// Filtering functionality for expiry date
document.querySelector("#searchExpiryDate").addEventListener("input", function () {
    const filterValue = this.value;
    const rows = document.querySelectorAll("#inventoryTableBody tr");
    rows.forEach((row) => {
        const expiryDate = row.querySelector("td:nth-child(3)").textContent;
        row.style.display = expiryDate.includes(filterValue) ? "" : "none";
    });
});

// Load blood units when the page loads
loadBloodUnits();
