let loginBtn = document.getElementById('loginBtn');
let clearBtn = document.getElementById('clearBtn');

loginBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const response = await fetch('/api/authorization/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    }),
  });
  if (response.ok) {
    let res = await response.json();
    if (res.userType == 'student') {
      console.log('student profile');
      document.location.replace(`/studentProfile/${res.user.id}`);
    } else {
      console.log('tutor profile');
      document.location.replace(`/tutorProfile/${res.user.id}`);
    }
  } else {
    console.log('error');
  }
});

clearBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  document.getElementById('loginForm').reset();
});
