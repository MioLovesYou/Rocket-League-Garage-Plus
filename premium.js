const extensionCode = "RLGPLUS";
const planID = 108;

var bB = new BrowserBill(extensionCode);


document.addEventListener('DOMContentLoaded', () => {
    // Get user data
    bB.getUser().then((data) => {
        // Change view based on payment status
        if (data.paid) {
            document.getElementById("paymentButton").style.display = "none";
            document.getElementById("manageButton").style.display = "inline";
            document.getElementById("paidStatus").innerHTML = "Paid! 🔥";
        }
    });

    // Payment button handler
    document.getElementById("paymentButton").onclick = () => {
        bB.openPaymentPage(planID);
    }

    // Manage button handler
    document.getElementById("manageButton").onclick = () => {
        bB.openManagementPage();
    }

    // Home
    document.getElementById(`back`).addEventListener('click', function() {
        window.location.href='/popup.html'; 
        chrome.action.setPopup({popup: '/popup.html'});
        console.log(`Redirecting to home page.`);
    });
});