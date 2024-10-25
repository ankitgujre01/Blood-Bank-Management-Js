document.getElementById('changePasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword === confirmPassword) {
        // Simulate updating the password (you would replace this with actual logic)
        alert('Password changed successfully!');
        // Reset the form
        this.reset();
    } else {
        alert('New passwords do not match!');
    }
});

document.getElementById('notificationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const emailNotifications = document.getElementById('emailNotifications').checked;
    const smsNotifications = document.getElementById('smsNotifications').checked;

    // Simulate saving notification preferences (replace with actual logic)
    alert('Notification preferences updated successfully!');
});

document.getElementById('accountInfoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    // Simulate updating account info (replace with actual logic)
    alert('Account information updated successfully!');
});
