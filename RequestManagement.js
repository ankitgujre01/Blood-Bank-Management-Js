const requestForm = document.getElementById('requestForm');
const requestTableBody = document.getElementById('requestTableBody');
const searchBloodGroup = document.getElementById('searchBloodGroup');

let requests = [];

// Load requests from local storage
function loadRequests() {
    const storedRequests = localStorage.getItem('requests');
    if (storedRequests) {
        requests = JSON.parse(storedRequests);
        renderRequestTable();
    }
}

// Add new request
requestForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const patientName = document.getElementById('patientName').value;
    const bloodGroup = document.getElementById('bloodGroup').value;
    const quantity = document.getElementById('quantity').value;
    const requestDate = document.getElementById('requestDate').value;

    const request = {
        patientName: patientName,
        bloodGroup: bloodGroup,
        quantity: quantity,
        requestDate: requestDate
    };

    requests.push(request);
    localStorage.setItem('requests', JSON.stringify(requests)); // Save to local storage
    renderRequestTable();
    requestForm.reset();
});

function renderRequestTable() {
    requestTableBody.innerHTML = '';
    const filteredRequests = requests.filter(request => {
        return searchBloodGroup.value ? request.bloodGroup.includes(searchBloodGroup.value) : true;
    });

    filteredRequests.forEach((request) => {
        const row = `<tr>
                        <td>${request.patientName}</td>
                        <td>${request.bloodGroup}</td>
                        <td>${request.quantity}</td>
                        <td>${request.requestDate}</td>
                     </tr>`;
        requestTableBody.insertAdjacentHTML('beforeend', row);
    });
}

// Filter request list by blood group
searchBloodGroup.addEventListener('input', renderRequestTable);

// Load requests when the page loads
loadRequests();
