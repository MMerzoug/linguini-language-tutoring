let signUpBtn = document.getElementById('signUpBtn');
let clearBtn = document.getElementById('clearBtn');

signUpBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  let createStudent = '/api/students/create';
  let createTutor = '/api/tutors/create';
  let userType = document.getElementById('type').value;
  let url = '';
  let body = {};

  if (userType == 'student') {
    url = createStudent;
    body = JSON.stringify({
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      first_name: document.getElementById('firstName').value,
      last_name: document.getElementById('lastName').value,
      language: document.getElementById('language').value,
      language_level: 'Beginner',
    });
  } else {
    url = createTutor;
    body = JSON.stringify({
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      first_name: document.getElementById('firstName').value,
      last_name: document.getElementById('lastName').value,
      language: document.getElementById('language').value,
      rating: 5,
    });
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: body,
  });
  if (response.ok) {
    document.location.replace('/login');
  } else {
    console.log('error');
  }
});

clearBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  document.getElementById('signUpForm').reset();
});
