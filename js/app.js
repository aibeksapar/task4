'use strict';

const loginForm = document.querySelector('.login-form');
const regForm = document.querySelector('.registration-form');
const switchFormButtons = document.querySelectorAll('.switch-form');
const statusDiv = document.querySelector('.status');

let users = [];

// Function to switch between login and registration forms
function handleFormSwitch() {
    loginForm.reset();
    regForm.reset();
    statusDiv.innerHTML = '';
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        regForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        regForm.style.display = 'block';
    }
}

// Function to check if a user with the same login already exists
function isLoginTaken(login) {
    return users.some(user => user.login === login);
}

// Function to handle registration form submission
function handleRegistrationSubmit(event) {
    event.preventDefault();
    const name = event.target.elements['name'].value.trim();
    const login = event.target.elements['login'].value.trim();
    const password = event.target.elements['password'].value;
    const passwordVerify = event.target.elements['password-verify'].value;

    // Check if login is already taken
    if (isLoginTaken(login)) {
        statusDiv.innerHTML = 'Login is already taken.';
        return;
    }

    // Check if passwords match
    if (password !== passwordVerify) {
        statusDiv.innerHTML = 'Passwords do not match.';
        return;
    }

    // Add new user to the users array
    const newUser = { id: users.length + 1, name, login, password };
    users.push(newUser);

    // Display success message and switch to login form
    statusDiv.innerHTML = 'Registration successful. Please log in.';
    handleFormSwitch();
}

// Function to handle login form submission
function handleLoginSubmit(event) {
    event.preventDefault();
    const login = event.target.elements['login'].value.trim();
    const password = event.target.elements['password'].value;

    // Find user with the matching login and password
    const user = users.find(user => user.login === login && user.password === password);

    if (user) {
        // Remember the authenticated user
        localStorage.setItem('authenticatedUser', JSON.stringify(user));

        // Display user name and sign out button
        const userNameSpan = document.createElement('span');
        userNameSpan.innerHTML = user.name;
        const signOutButton = document.createElement('button');
        signOutButton.innerHTML = 'Sign Out';
        signOutButton.addEventListener('click', handleSignOut);

        const userAccountDiv = document.createElement('div');
        userAccountDiv.appendChild(userNameSpan);
        userAccountDiv.appendChild(signOutButton);
        userAccountDiv.classList.add('user-account');
        document.body.appendChild(userAccountDiv);

        // Hide login form
        loginForm.style.display = 'none';
    } else {
        statusDiv.innerHTML = 'Invalid login or password.';
    }
}

// Function to handle sign out button click
function handleSignOut() {
    localStorage.removeItem('authenticatedUser');
    document.querySelector('.user-account').remove();
    loginForm.style.display = 'block';
}

// Add event listeners
switchFormButtons.forEach(button => button.addEventListener('click', handleFormSwitch));
regForm.addEventListener('submit', handleRegistrationSubmit);
loginForm.addEventListener('submit', handleLoginSubmit);

// Check if there is an authenticated user
const authenticatedUser = localStorage.getItem('authenticatedUser');
if (authenticatedUser) {
    const user = JSON.parse(authenticatedUser);

    // Display user name and sign out button
    const userNameSpan = document.createElement('span');
    userNameSpan.innerHTML = user.name;
    const signOutButton = document.createElement('button');
	 signOutButton.innerHTML = 'Sign Out';
	 signOutButton.addEventListener('click', handleSignOut);

	 const userAccountDiv = document.createElement('div');
	 userAccountDiv.appendChild(userNameSpan);
	 userAccountDiv.appendChild(signOutButton);
	 userAccountDiv.classList.add('user-account');
	 document.body.appendChild(userAccountDiv);

	 // Hide login form
	 loginForm.style.display = 'none';
		} else {
		// There is no authenticated user, display login form
		loginForm.style.display = 'block';
		}
