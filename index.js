const signupTab = document.getElementById('signup-tab');
const signinTab = document.getElementById('signin-tab');
const signupForm = document.getElementById('signup-form');
const signinForm = document.getElementById('signin-form');

signupTab.addEventListener('click', () => {
  signinForm.classList.add('hidden');
  signupForm.classList.remove('hidden');
  signupTab.classList.add('text-gray-800', 'border-b-2', 'border-blue-500');
  signinTab.classList.remove('text-gray-800', 'border-b-2', 'border-blue-500');
  signinTab.classList.add('text-gray-500');
});

signinTab.addEventListener('click', () => {
  signupForm.classList.add('hidden');
  signinForm.classList.remove('hidden');
  signinTab.classList.add('text-gray-800', 'border-b-2', 'border-blue-500');
  signupTab.classList.remove('text-gray-800', 'border-b-2', 'border-blue-500');
  signupTab.classList.add('text-gray-500');
});