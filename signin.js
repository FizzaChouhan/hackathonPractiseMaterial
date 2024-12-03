import { getAuth, signInWithEmailAndPassword } from "./firebase.js";

const auth = getAuth();

let siginpass = document.getElementById("signinpassword");
let siginemail = document.getElementById("signinemail");
let loginBtn = document.getElementById("signinBtn");

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email) {
  return emailRegex.test(email);
}

loginBtn.addEventListener("click", () => {
  const email = siginemail.value.trim();
  const password = siginpass.value.trim();

  if (email && password) {
    // Validate email format
    if (!isValidEmail(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
      });
      return; // Exit the function if the email is invalid
    }
      // Validate password length
      if (password.length < 6) {
        Swal.fire({
          icon: 'error',
          title: 'Weak Password',
          text: 'Password must be at least 6 characters long.',
        });
        return; // Exit the function if the password is too short
      }

    loginBtn.disabled = true; // Prevent multiple clicks during login

    signInWithEmailAndPassword(auth, email, password)

      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in:", user);
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'You have been signed in successfully!',
        }).then(() => {
          location.href = "profile.html"; 
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing in:", errorMessage);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: `Error: ${errorMessage}`,
        });
      })
      .finally(() => {
        loginBtn.disabled = false; 
      });
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Missing Fields',
      text: 'Please fill in both email and password.',
    });
  }

 
});