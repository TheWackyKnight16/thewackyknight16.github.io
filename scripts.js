const exercises = {
    'Squat': 'squatTM',
    'Bench Press': 'benchTM',
    'Deadlift': 'deadliftTM',
    'Overhead Press': 'ohpTM'
};

const weekDetails = [
    {
        week: 1,
        days: [
            { day: 'Monday, Friday', lifts: [
                { type: 'Squat', sets: [65, 75, 85, 65], reps: ['5', '5', '5+', '5x5'] },
                { type: 'Bench Press', sets: [65, 75, 85, 65], reps: ['5', '5', '5+', '5x5'] }
            ]},
            { day: 'Wednesday', lifts: [
                { type: 'Deadlift', sets: [65, 75, 85, 65], reps: ['5', '5', '5+', '5x5'] },
                { type: 'Overhead Press', sets: [65, 75, 85, 65], reps: ['5', '5', '5+', '5x5'] }
            ]}
        ]
    },
    {
        week: 2,
        days: [
            { day: 'Monday, Friday', lifts: [
                { type: 'Squat', sets: [70, 80, 90, 70], reps: ['3', '3', '3+', '5x5'] },
                { type: 'Bench Press', sets: [70, 80, 90, 70], reps: ['3', '3', '3+', '5x5'] }
            ]},
            { day: 'Wednesday', lifts: [
                { type: 'Deadlift', sets: [70, 80, 90, 70], reps: ['3', '3', '3+', '5x5'] },
                { type: 'Overhead Press', sets: [70, 80, 90, 70], reps: ['3', '3', '3+', '5x5'] }
            ]}
        ]
    },
    {
        week: 3,
        days: [
            { day: 'Monday, Friday', lifts: [
                { type: 'Squat', sets: [75, 85, 95, 75], reps: ['5', '3', '1+', '5x5'] },
                { type: 'Bench Press', sets: [75, 85, 95, 75], reps: ['5', '3', '1+', '5x5'] }
            ]},
            { day: 'Wednesday', lifts: [
                { type: 'Deadlift', sets: [75, 85, 95, 75], reps: ['5', '3', '1+', '5x5'] },
                { type: 'Overhead Press', sets: [75, 85, 95, 75], reps: ['5', '3', '1+', '5x5'] }
            ]}
        ]
    }
];

function updateWeights() {
    saveTMs();
    const container = document.getElementById('weekCycles');
    container.innerHTML = '';

    weekDetails.forEach((week, weekIndex) => {
        const weekDiv = document.createElement('div');
        weekDiv.className = 'week-div';

        // Create a clickable header for each week
        const weekHeader = document.createElement('h2');
        weekHeader.innerText = `Week ${week.week}`;
        weekHeader.className = 'week-header';
        weekHeader.onclick = function() { toggleWeekDetails(weekIndex); };
        weekDiv.appendChild(weekHeader);

        // Container for the week tables, initially hidden
        const weekTableContainer = document.createElement('div');
        weekTableContainer.className = 'week-table';
        weekTableContainer.id = `week-${weekIndex}-details`;
        weekTableContainer.style.display = 'none'; // Start with the details hidden

        week.days.forEach((day, dayIndex) => {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'table-container';
            const dayTable = document.createElement('table');
            dayTable.innerHTML = `<tr><th colspan="6">${day.day}</th></tr>`;
            dayTable.innerHTML += `<tr><th>Lift</th><th>Set 1</th><th>Set 2</th><th>Set 3</th><th>Sets 4,5,6,7,8</th></tr>`;

            day.lifts.forEach((lift, liftIndex) => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${lift.type}</td>` +
                    lift.sets.map((percent, setIndex) => {
                        const setId = `checkbox-${weekIndex}-${dayIndex}-${liftIndex}-${setIndex}`;
                        const weight = calculateWeight(document.getElementById(exercises[lift.type]).value, percent);
                        const checkboxHTML = `<input type="checkbox" id="${setId}" class="set-checkbox" onclick="saveCheckboxState('${setId}')">`;
                        return `<td>${weight} x ${lift.reps[setIndex]} ${checkboxHTML}</td>`;
                    }).join('');
                dayTable.appendChild(row);
            });

            dayDiv.appendChild(dayTable);
            weekTableContainer.appendChild(dayDiv);
        });

        weekDiv.appendChild(weekTableContainer);
        container.appendChild(weekDiv);
    });

    loadCheckboxState();
}

function calculateWeight(tm, percent) {
    return Math.floor(tm * (percent / 100));
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('updateWeightsBtn').addEventListener('click', updateWeights);
});



function toggleWeekDetails(weekIndex) {
    const details = document.getElementById(`week-${weekIndex}-details`);
    const isHidden = details.style.display === 'none';

    // Toggle display state
    details.style.display = isHidden ? 'block' : 'none';

    // Save the new state to localStorage
    localStorage.setItem(`week-${weekIndex}-collapsed`, !isHidden);
}

function loadWeekStates() {
    weekDetails.forEach((_, weekIndex) => {
        const details = document.getElementById(`week-${weekIndex}-details`);
        const isCollapsed = localStorage.getItem(`week-${weekIndex}-collapsed`) === 'true';

        // Set the display based on the saved state
        details.style.display = isCollapsed ? 'none' : 'block';
    });
}

// Saves the TMs to localStorage
function saveTMs() {
    const squatTM = document.getElementById('squatTM').value;
    const benchTM = document.getElementById('benchTM').value;
    const deadliftTM = document.getElementById('deadliftTM').value;
    const ohpTM = document.getElementById('ohpTM').value;
    
    localStorage.setItem('squatTM', squatTM);
    localStorage.setItem('benchTM', benchTM);
    localStorage.setItem('deadliftTM', deadliftTM);
    localStorage.setItem('ohpTM', ohpTM);

    // Save checkbox states
    const checkboxes = document.querySelectorAll('.set-checkbox');
    checkboxes.forEach((checkbox, index) => {
        localStorage.setItem(`checkbox-${index}`, checkbox.checked);
    });
}

// Loads the TMs and updates the display if TMs are found when the page is loaded
function loadTMs() {
    const squatTM = localStorage.getItem('squatTM');
    const benchTM = localStorage.getItem('benchTM');
    const deadliftTM = localStorage.getItem('deadliftTM');
    const ohpTM = localStorage.getItem('ohpTM');

    if (squatTM) document.getElementById('squatTM').value = squatTM;
    if (benchTM) document.getElementById('benchTM').value = benchTM;
    if (deadliftTM) document.getElementById('deadliftTM').value = deadliftTM;
    if (ohpTM) document.getElementById('ohpTM').value = ohpTM;

    // If any TM is found, automatically update the weights
    if (squatTM || benchTM || deadliftTM || ohpTM) {
        updateWeights();
    }
}

// Restore checkbox states
function loadCheckboxState() {
    const checkboxes = document.querySelectorAll('.set-checkbox');
    checkboxes.forEach((checkbox, index) => {
        const checkedState = localStorage.getItem(`checkbox-${index}`) === 'true';
        checkbox.checked = checkedState;
    });
}

function saveCheckboxState(id) {
    const checkbox = document.getElementById(id);
    localStorage.setItem(`checkbox-${id}`, checkbox.checked);

    updateWeights();
    toggleWeekDetails(parseInt(id.split('-')[1]));
}

function resetCheckboxes() {
    if (confirm('Are you sure you want to reset all progress?')) {
        const checkboxes = document.querySelectorAll('.set-checkbox');
        checkboxes.forEach((checkbox, index) => {
            checkbox.checked = false;
            localStorage.removeItem(`checkbox-${index}`);
        });
    }
}

function signUp(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // You can save user details or navigate to another page
            console.log('User created and signed in!');
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // Handle errors here
            console.error(errorCode, errorMessage);
        });
}

function signIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // Redirect or display user info
            console.log('User signed in!');
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // Handle errors here
            console.error(errorCode, errorMessage);
        });
}

function signOut() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log('User signed out!');
    }).catch((error) => {
        // An error happened.
        console.error('Error signing out', error);
    });
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, show the main content or redirect
        console.log('User is signed in:', user);
    } else {
        // No user is signed in, show login or signup forms
        console.log('No user is signed in.');
    }
});


// Call loadCheckboxStates on window load
window.onload = function() {
    loadTMs(); // Existing TM load function
    loadCheckboxState();
    loadWeekStates();
};
