let signUpBtn = document.getElementById('signUpBtn');
let clearBtn = document.getElementById('clearBtn');

clearBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  document.getElementById('signUpForm').reset();
});
