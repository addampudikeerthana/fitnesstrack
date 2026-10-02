// ========================================
// LOGIN PROTECTION
// ========================================

const currentPage =
    window.location.pathname.split("/").pop();

const protectedPages = [
    "user.html",
    "workout.html",
    "food.html",
    "water.html",
    "reminders.html",
    "goals.html",
    "progress.html",
    "admin.html"
];

if (protectedPages.includes(currentPage)) {

    const loggedInUser =
        JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        window.location.href = "login.html";
    }

    if (
        currentPage === "admin.html" &&
        loggedInUser &&
        loggedInUser.role !== "admin"
    ) {
        window.location.href = "user.html";
    }

    if (
        currentPage !== "admin.html" &&
        loggedInUser &&
        loggedInUser.role === "admin"
    ) {
        window.location.href = "admin.html";
    }
}


// ========================================
// SIGN UP
// ========================================

const signupForm =
    document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("signupName")
                .value.trim();

        const email =
            document.getElementById("signupEmail")
                .value.trim();

        const password =
            document.getElementById("signupPassword")
                .value;

        let users =
            JSON.parse(
                localStorage.getItem("fitnessUsers")
            ) || [];

        const existingUser =
            users.find(
                user =>
                    user.email.toLowerCase() ===
                    email.toLowerCase()
            );

        if (existingUser) {
            alert("Email already registered.");
            return;
        }

        const newUser = {
            name: name,
            email: email,
            password: password,
            role: "user"
        };

        users.push(newUser);

        localStorage.setItem(
            "fitnessUsers",
            JSON.stringify(users)
        );

        alert("Account created successfully!");

        window.location.href = "login.html";
    });
}


// ========================================
// LOGIN
// ========================================

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail")
                .value.trim();

        const password =
            document.getElementById("loginPassword")
                .value;


        // DEMO ADMIN LOGIN

        if (
            email === "admin@fitnesstrack.com" &&
            password === "admin123"
        ) {

            const admin = {
                name: "Admin",
                email: email,
                role: "admin"
            };

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(admin)
            );

            window.location.href = "admin.html";

            return;
        }


        // NORMAL USER LOGIN

        const users =
            JSON.parse(
                localStorage.getItem("fitnessUsers")
            ) || [];

        const user =
            users.find(
                item =>
                    item.email.toLowerCase() ===
                    email.toLowerCase() &&
                    item.password === password
            );

        if (!user) {
            alert("Invalid email or password.");
            return;
        }

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
        );

        window.location.href = "user.html";
    });
}


// ========================================
// GET LOGGED-IN USER
// ========================================

function getLoggedUser() {

    return JSON.parse(
        localStorage.getItem("loggedInUser")
    );
}


// ========================================
// USER FITNESS DATA
// ========================================

function getUserData() {

    const user = getLoggedUser();

    if (!user) {

        return {
            water: 0,
            calories: 0,
            goals: 0,
            reminders: []
        };
    }

    let allData =
        JSON.parse(
            localStorage.getItem("fitnessData")
        ) || {};

    if (!allData[user.email]) {

        allData[user.email] = {
            water: 0,
            calories: 0,
            goals: 0,
            reminders: []
        };

        localStorage.setItem(
            "fitnessData",
            JSON.stringify(allData)
        );
    }

    return allData[user.email];
}


function saveUserData(data) {

    const user = getLoggedUser();

    if (!user) {
        return;
    }

    let allData =
        JSON.parse(
            localStorage.getItem("fitnessData")
        ) || {};

    allData[user.email] = data;

    localStorage.setItem(
        "fitnessData",
        JSON.stringify(allData)
    );
}


// ========================================
// NAVIGATION
// ========================================

function openPage(page) {
    window.location.href = page;
}


function goDashboard() {
    window.location.href = "user.html";
}


function logout() {

    localStorage.removeItem("loggedInUser");

    window.location.href = "index.html";
}


// ========================================
// USER WELCOME
// ========================================

const welcomeUser =
    document.getElementById("welcomeUser");

if (welcomeUser) {

    const user = getLoggedUser();

    if (user) {

        welcomeUser.textContent =
            "Welcome, " + user.name;
    }
}


// ========================================
// WATER
// ========================================

function updateWater() {

    const data = getUserData();

    const count =
        document.getElementById("waterCount");

    const progress =
        document.getElementById("waterProgress");

    if (count) {

        count.textContent =
            data.water;
    }

    if (progress) {

        let percentage =
            (data.water / 8) * 100;

        if (percentage > 100) {
            percentage = 100;
        }

        progress.style.width =
            percentage + "%";
    }
}


function addWater() {

    const data = getUserData();

    if (data.water < 8) {

        data.water++;

        saveUserData(data);

        updateWater();

    } else {

        alert("Daily water goal completed!");
    }
}


function resetWater() {

    const data = getUserData();

    data.water = 0;

    saveUserData(data);

    updateWater();
}


if (
    document.getElementById("waterCount")
) {

    updateWater();
}


// ========================================
// WORKOUT
// ========================================

function completeWorkout(calories) {

    const data = getUserData();

    data.calories += calories;

    saveUserData(data);

    alert(
        "Workout completed! " +
        calories +
        " calories added."
    );
}


// ========================================
// GOALS
// ========================================

function saveGoals() {

    const checkboxes =
        document.querySelectorAll(".goal");

    let completed = 0;

    checkboxes.forEach(function(box) {

        if (box.checked) {
            completed++;
        }
    });

    const data = getUserData();

    data.goals = completed;

    saveUserData(data);

    const message =
        document.getElementById("goalMessage");

    if (message) {

        message.textContent =
            completed +
            " out of 5 goals completed!";
    }
}


// ========================================
// REMINDERS
// ========================================

function saveReminder(
    inputId,
    reminderName
) {

    const input =
        document.getElementById(inputId);

    if (!input || !input.value) {

        alert("Please select a time.");

        return;
    }

    const data = getUserData();

    const reminder = {
        name: reminderName,
        time: input.value
    };

    data.reminders =
        data.reminders.filter(
            item =>
                item.name !== reminderName
        );

    data.reminders.push(reminder);

    saveUserData(data);

    displayReminders();

    alert(
        reminderName +
        " reminder saved for " +
        input.value
    );
}


function displayReminders() {

    const container =
        document.getElementById(
            "savedReminders"
        );

    if (!container) {
        return;
    }

    const data = getUserData();

    container.innerHTML = "";

    if (
        !data.reminders ||
        data.reminders.length === 0
    ) {

        container.innerHTML =
            "<p>No reminders saved.</p>";

        return;
    }

    data.reminders.forEach(
        function(reminder) {

            const div =
                document.createElement("div");

            div.className =
                "reminder-item";

            div.innerHTML =
                "<span>" +
                reminder.name +
                "</span>" +
                "<strong>" +
                reminder.time +
                "</strong>";

            container.appendChild(div);
        }
    );
}


if (
    document.getElementById(
        "savedReminders"
    )
) {

    displayReminders();
}


// ========================================
// PROGRESS
// ========================================

function updateProgress() {

    const data = getUserData();

    const water =
        document.getElementById(
            "progressWater"
        );

    const calories =
        document.getElementById(
            "progressCalories"
        );

    const goals =
        document.getElementById(
            "progressGoals"
        );

    const overall =
        document.getElementById(
            "overallProgress"
        );

    const overallBar =
        document.getElementById(
            "overallProgressBar"
        );

    const status =
        document.getElementById(
            "progressStatus"
        );


    if (water) {

        water.textContent =
            data.water + " / 8";
    }


    if (calories) {

        calories.textContent =
            data.calories;
    }


    if (goals) {

        goals.textContent =
            data.goals + " / 5";
    }


    const waterScore =
        Math.min(
            data.water / 8,
            1
        );

    const workoutScore =
        Math.min(
            data.calories / 100,
            1
        );

    const goalScore =
        Math.min(
            data.goals / 5,
            1
        );


    const progress =
        Math.round(
            (
                waterScore +
                workoutScore +
                goalScore
            ) / 3 * 100
        );


    if (overall) {

        overall.textContent =
            progress + "%";
    }


    if (overallBar) {

        overallBar.style.width =
            progress + "%";
    }


    if (status) {

        if (progress === 0) {

            status.textContent =
                "Start your fitness activities today!";

        } else if (progress < 40) {

            status.textContent =
                "Good start! Keep going.";

        } else if (progress < 70) {

            status.textContent =
                "Great progress! Keep it up.";

        } else if (progress < 100) {

            status.textContent =
                "Almost there! Complete your goals.";

        } else {

            status.textContent =
                "Excellent! You completed today's progress.";
        }
    }
}


if (
    document.getElementById(
        "overallProgress"
    )
) {

    updateProgress();
}


// ========================================
// ADMIN
// ========================================

function loadUsers() {

    const list =
        document.getElementById(
            "userList"
        );

    const total =
        document.getElementById(
            "totalUsers"
        );

    if (!list) {
        return;
    }

    const users =
        JSON.parse(
            localStorage.getItem(
                "fitnessUsers"
            )
        ) || [];


    if (total) {

        total.textContent =
            users.length;
    }


    list.innerHTML = "";


    if (users.length === 0) {

        list.innerHTML =
            "<p>No registered users.</p>";

        return;
    }


    users.forEach(
        function(user) {

            const div =
                document.createElement("div");

            div.className =
                "user-item";

            div.innerHTML =
                "<strong>" +
                user.name +
                "</strong><br>" +
                user.email;

            list.appendChild(div);
        }
    );
}


if (
    document.getElementById(
        "userList"
    )
) {

    loadUsers();
}