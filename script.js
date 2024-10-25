// Simulated data
const bloodData = {
    totalBloodUnits: 350,
    expiringBloodUnits: 12,
    donationsToday: 15,
    donationsWeek: 50,
    donationsMonth: 200,
    totalRequestsFulfilled: 145,
    bloodGroupAvailability: [50, 40, 60, 30, 20, 35, 45, 70], // A+, A-, B+, B-, AB+, AB-, O+, O-
    donationsTrend: [5, 10, 15, 20, 25, 30, 35],
    requestTrend: { fulfilled: [30, 40, 50, 60], pending: [10, 15, 20, 25] }
};

function animateValue(id, start, end, duration) {
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let obj = document.querySelector(`#${id}`);

    let timer = setInterval(function() {
        current += increment;
        obj.querySelector('h2').textContent = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}
document.addEventListener("DOMContentLoaded", function() {
    animateValue("bloodUnits", 0, bloodData.totalBloodUnits, 2000);
    animateValue("expiringUnits", 0, bloodData.expiringBloodUnits, 2000);
    animateValue("donationsToday", 0, bloodData.donationsToday, 2000);
    animateValue("donationsWeek", 0, bloodData.donationsWeek, 2000);
    animateValue("donationsMonth", 0, bloodData.donationsMonth, 2000);
    animateValue("requestsFulfilled", 0, bloodData.totalRequestsFulfilled, 2000);

    const ctx1 = document.querySelector('#bloodGroupChart').getContext('2d');
    const bloodGroupChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            datasets: [{
                label: 'Blood Units',
                data: bloodData.bloodGroupAvailability,
                backgroundColor: '#e63946'
            }]
        }
    });

    // Donations Trend Chart
    const ctx2 = document.querySelector('#donationsTrendChart').getContext('2d');
    const donationsTrendChart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [{
                label: 'Donations',
                data: bloodData.donationsTrend,
                borderColor: '#457b9d',
                fill: false
            }]
        }
    });

    
    const ctx3 = document.querySelector('#requestTrendChart').getContext('2d');
    const requestTrendChart = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [
                {
                    label: 'Fulfilled Requests',
                    data: bloodData.requestTrend.fulfilled,
                    backgroundColor: '#1d3557'
                },
                {
                    label: 'Pending Requests',
                    data: bloodData.requestTrend.pending,
                    backgroundColor: '#e63946'
                }
            ]
        }
    });
});
