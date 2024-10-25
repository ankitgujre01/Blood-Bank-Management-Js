const donorForm = document.getElementById('donorForm');
const donorTableBody = document.getElementById('donorTableBody');
const searchBloodGroup = document.getElementById('searchBloodGroup');
const searchLastDonationDate = document.getElementById('searchLastDonationDate');
const donorHistory = document.getElementById('donorHistory');

let donors = [];

// Load donors from local storage
function loadDonors() {
    const storedDonors = localStorage.getItem('donors');
    if (storedDonors) {
        donors = JSON.parse(storedDonors);
        renderDonorTable();
    }
}

// Add new donor
donorForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const donorName = document.getElementById('donorName').value;
    const contact = document.getElementById('contact').value;
    const bloodGroup = document.getElementById('bloodGroup').value;
    const lastDonationDate = document.getElementById('lastDonationDate').value;

    const donor = {
        name: donorName,
        contact: contact,
        bloodGroup: bloodGroup,
        lastDonationDate: lastDonationDate,
        donations: [
            { date: lastDonationDate }
        ]
    };

    donors.push(donor);
    localStorage.setItem('donors', JSON.stringify(donors)); // Save to local storage
    renderDonorTable();
    donorForm.reset();
});

// function renderDonorTable() {
//     donorTableBody.innerHTML = '';
//     const filteredDonors = donors.filter(donor => {
//         const bloodGroupFilter = searchBloodGroup.value ? donor.bloodGroup.includes(searchBloodGroup.value) : true;
//         const dateFilter = searchLastDonationDate.value ? donor.lastDonationDate === searchLastDonationDate.value : true;
//         return bloodGroupFilter && dateFilter;
//     });

    filteredDonors.forEach((donor, index) => {
        const row = `<tr onclick="viewDonorHistory(${index})">
                        <td>${donor.name}</td>
                        <td>${donor.contact}</td>
                        <td>${donor.bloodGroup}</td>
                        <td>${donor.lastDonationDate}</td>
                     </tr>`;
        donorTableBody.insertAdjacentHTML('beforeend', row);
    });
// }

// Filter donor list by blood group and last donation date
searchBloodGroup.addEventListener('input', renderDonorTable);
searchLastDonationDate.addEventListener('input', renderDonorTable);

// View donor history
function viewDonorHistory(index) {
    const donor = donors[index];
    let historyHTML = `<h3>History of ${donor.name}</h3>
                       <ul>`;
    donor.donations.forEach(donation => {
        historyHTML += `<li>Donation Date: ${donation.date}</li>`;
    });
    historyHTML += '</ul>';
    donorHistory.innerHTML = historyHTML;
}

const row = `<tr>
                <td>${donor.name}</td>
                <td>${donor.contact}</td>
                <td>${donor.bloodGroup}</td>
                <td>${donor.lastDonationDate}</td>
                <td><button onclick="deleteDonor(${index})">Delete</button></td>
            </tr>`;

            // Delete donor
function deleteDonor(index) {
    if (confirm('Are you sure you want to delete this donor?')) {
        donors.splice(index, 1); // Remove donor from array
        localStorage.setItem('donors', JSON.stringify(donors)); // Update local storage
        renderDonorTable(); // Re-render the table
        donorHistory.innerHTML = '<p>Select a donor to view their history.</p>'; // Clear history view if a donor is deleted
    }
}

function renderDonorTable() {
    donorTableBody.innerHTML = '';
    const filteredDonors = donors.filter(donor => {
        const bloodGroupFilter = searchBloodGroup.value ? donor.bloodGroup.includes(searchBloodGroup.value) : true;
        const dateFilter = searchLastDonationDate.value ? donor.lastDonationDate === searchLastDonationDate.value : true;
        return bloodGroupFilter && dateFilter;
    });

    filteredDonors.forEach((donor, index) => {
        const row = `<tr>
                        <td>${donor.name}</td>
                        <td>${donor.contact}</td>
                        <td>${donor.bloodGroup}</td>
                        <td>${donor.lastDonationDate}</td>
                        <td><button onclick="deleteDonor(${index})">Delete</button></td>
                     </tr>`;
        donorTableBody.insertAdjacentHTML('beforeend', row);
    });
}


// Load donors when the page loads
loadDonors();
