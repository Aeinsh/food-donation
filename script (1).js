let foodDonations = [];
let wasteEntries = [];

// Registration function
function registerUser() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (username && email && password) {
        alert("Registration successful!");
        document.getElementById("registrationForm").style.display = "none";
        document.getElementById("donationForm").style.display = "block";
        document.getElementById("wasteEntryForm").style.display = "block";
        document.getElementById("foodList").style.display = "block";
        document.getElementById("wasteList").style.display = "block";
        document.getElementById("analytics").style.display = "block";
        document.getElementById("mapView").style.display = "block";
    } else {
        alert("Please fill in all fields.");
    }
}

// Food donation submission
function submitDonation() {
    const foodType = document.getElementById("foodType").value;
    const foodQuantity = document.getElementById("foodQuantity").value;
    const foodLocation = document.getElementById("foodLocation").value;
    const nearbyAreas = document.getElementById("nearbyAreas").value;
    const contactInfo = document.getElementById("contactInfo").value;

    if (foodType && foodQuantity && foodLocation && nearbyAreas && contactInfo) {
        const donation = { foodType, foodQuantity, foodLocation, nearbyAreas, contactInfo, status: "Available" };
        foodDonations.push(donation);
        saveToDatabase();
        displayDonations();
        alert("Food donation submitted!");
        document.getElementById("donationForm").reset();
    } else {
        alert("Please fill in all fields.");
    }
}

// Waste entry submission
function submitWasteEntry() {
    const wasteType = document.getElementById("wasteType").value;
    const wasteQuantity = document.getElementById("wasteQuantity").value;

    if (wasteType && wasteQuantity) {
        const waste = { wasteType, wasteQuantity };
        wasteEntries.push(waste);
        saveToDatabase();
        displayWasteEntries();
        alert("Waste entry submitted!");
        document.getElementById("wasteEntryForm").reset();
    } else {
        alert("Please fill in all fields.");
    }
}

// Display donations and waste entries
function displayDonations() {
    const foodEntries = document.getElementById("foodEntries");
    foodEntries.innerHTML = "";
    foodDonations.forEach((donation, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${donation.foodType}</td>
            <td>${donation.foodQuantity}</td>
            <td>${donation.foodLocation}</td>
            <td>${donation.nearbyAreas}</td>
            <td>${donation.contactInfo}</td>
            <td>${donation.status}</td>
            <td><button onclick="deleteDonation(${index})">Delete</button></td>
        `;
        foodEntries.appendChild(row);
    });
    updateAnalytics();
}

function displayWasteEntries() {
    const wasteEntriesTable = document.getElementById("wasteEntries");
    wasteEntriesTable.innerHTML = "";
    wasteEntries.forEach((waste, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${waste.wasteType}</td>
            <td>${waste.wasteQuantity}</td>
            <td><button onclick="deleteWaste(${index})">Delete</button></td>
        `;
        wasteEntriesTable.appendChild(row);
    });
    updateAnalytics();
}

// Delete entries
function deleteDonation(index) {
    foodDonations.splice(index, 1);
    saveToDatabase();
    displayDonations();
}

function deleteWaste(index) {
    wasteEntries.splice(index, 1);
    saveToDatabase();
    displayWasteEntries();
}

// Save to local storage
function saveToDatabase() {
    localStorage.setItem("foodDonations", JSON.stringify(foodDonations));
    localStorage.setItem("wasteEntries", JSON.stringify(wasteEntries));
}

// Analytics calculation
function updateAnalytics() {
    const analyticsData = document.getElementById("analyticsData");
    const foodCount = foodDonations.length;
    const wasteCount = wasteEntries.length;
    analyticsData.innerText = `Total Donations: ${foodCount}, Total Waste Entries: ${wasteCount}`;
}

// Initialize from local storage
function initializeData() {
    foodDonations = JSON.parse(localStorage.getItem("foodDonations")) || [];
    wasteEntries = JSON.parse(localStorage.getItem("wasteEntries")) || [];
    displayDonations();
    displayWasteEntries();
}

// Initialize data on page load
initializeData();
