

import { getAuth, createUserWithEmailAndPassword ,GoogleAuthProvider,provider,signInWithPopup } from "./firebase.js";

const auth = getAuth();
//const provider = new GoogleAuthProvider();
let signupBtn = document.getElementById("signupBtn");
let userEmail = document.getElementById("email");
let userPassword = document.getElementById("password");

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email) {
  return emailRegex.test(email);
}

signupBtn.addEventListener("click", () => {
  const email = userEmail.value.trim();
  const password = userPassword.value.trim();
  
  // Validate that both fields are filled
  if (!email || !password) {
    Swal.fire({
      icon: 'warning',
      title: 'Missing Information',
      text: 'Please fill in both email and password.',
    });
    return;
  }

  // Validate email format
  if (!isValidEmail(email)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Email',
      text: 'Please enter a valid email address.',
    });
    return; // Exit the function if the email is invalid
  }
  // Validate password strength
  if (password.length < 6) {
    Swal.fire({
      icon: 'error',
      title: 'Weak Password',
      text: 'Password must be at least 6 characters long.',
    });
    return; // Exit the function if the password is too weak
  }
  signupBtn.disabled = true; // Prevent multiple clicks during signup

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up successfully
      const user = userCredential.user;
      console.log("User signed up:", user);
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have been registered successfully! Redirecting to sign-in page...',
      }).then(() => {
        // Redirect to sign-in page
        location.href = "signin.html";
      });
     
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.error("Error signing up:", errorMessage);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: `Error: ${errorMessage}`,
      });
    })
    .finally(() => {
      signupBtn.disabled = false; // Re-enable button after the process
    });
});

let googleBtn = document.getElementById("googleBtn")

googleBtn.addEventListener("click",()=>{
  signInWithPopup(auth, provider)
  .then((result) => {
    
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    
    const user = result.user;
    console.log(user);
    
   
  }).catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;
    
    const email = error.customData.email;
   
    const credential = GoogleAuthProvider.credentialFromError(error);
   console.log(errorMessage);
   
  });

})
let signInBtn=document.getElementById("directSignIn")
signInBtn.addEventListener("click",()=>{
  location.href = "signin.html";
  })