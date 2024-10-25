// Function to load data from local storage
function loadData() {
    const storedDonors = JSON.parse(localStorage.getItem('donors')) || [];
    const storedBloodUnits = JSON.parse(localStorage.getItem('bloodUnits')) || [];
    const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];

    return { storedDonors, storedBloodUnits, storedRequests };
}

// Calculate data for the charts
function calculateReportData() {
    const { storedDonors, storedBloodUnits, storedRequests } = loadData();

    // Example: Calculate Monthly Donations (grouped by month)
    const monthlyDonations = Array(12).fill(0); // Initialize an array for 12 months
    storedDonors.forEach(donor => {
        const donationDate = new Date(donor.lastDonationDate);
        const month = donationDate.getMonth(); // 0 is January, 11 is December
        monthlyDonations[month]++;
    });

    // Example: Calculate Blood Group Distribution
    const bloodGroupDistribution = { "A+": 0, "A-": 0, "B+": 0, "B-": 0, "AB+": 0, "AB-": 0, "O+": 0, "O-": 0 };
    storedDonors.forEach(donor => {
        if (bloodGroupDistribution[donor.bloodGroup] !== undefined) {
            bloodGroupDistribution[donor.bloodGroup]++;
        }
    });

    // Example: Calculate Requests Fulfilled vs Pending
    let fulfilledRequests = 0;
    let pendingRequests = 0;
    storedRequests.forEach(request => {
        if (request.status === "fulfilled") {
            fulfilledRequests++;
        } else {
            pendingRequests++;
        }
    });

    // Example: Calculate Donor Growth (by month)
    const donorGrowth = Array(12).fill(0);
    storedDonors.forEach(donor => {
        const joinDate = new Date(donor.joinDate); // Assuming donor data has a join date
        const month = joinDate.getMonth();
        donorGrowth[month]++;
    });

    return { monthlyDonations, bloodGroupDistribution, fulfilledRequests, pendingRequests, donorGrowth };
}

// Function to update the charts
function updateCharts() {
    const reportData = calculateReportData();

    // Update Monthly Donations Chart
    const ctx1 = document.querySelector('#monthlyDonationsChart').getContext('2d');
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Monthly Donations',
                data: reportData.monthlyDonations,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        }
    });

    // Update Blood Group Distribution Chart
    const ctx2 = document.querySelector('#bloodGroupDistributionChart').getContext('2d');
    new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            datasets: [{
                label: 'Blood Group Distribution',
                data: Object.values(reportData.bloodGroupDistribution),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB']
            }]
        }
    });

    // Update Blood Requests Chart
    const ctx3 = document.querySelector('#bloodRequestsChart').getContext('2d');
    new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ['Fulfilled', 'Pending'],
            datasets: [{
                label: 'Blood Requests',
                data: [reportData.fulfilledRequests, reportData.pendingRequests],
                backgroundColor: ['#4BC0C0', '#FF9F40']
            }]
        }
    });

    // Update Donor Growth Chart
    const ctx4 = document.querySelector('#donorGrowthChart').getContext('2d');
    new Chart(ctx4, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Donor Growth',
                data: reportData.donorGrowth,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        }
    });
}

// Load the charts when the page loads
document.addEventListener('DOMContentLoaded', function() {
    updateCharts();
});
