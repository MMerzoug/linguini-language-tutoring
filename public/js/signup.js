let signUpBtn = document.getElementById('signUpBtn');
let clearBtn = document.getElementById('clearBtn');

// signUpBtn.addEventListener('click', async (event) => {
//   event.preventDefault();
//   const response = await fetch('/api/');
// });

clearBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  document.getElementById('signUpForm').reset();
});
