console.log('it worked');

let loginBtn = document.getElementById('loginBtn');

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
      await fetch(`/studentProfile/${res.user.id}`);
    } else {
      await fetch(`/tutorProfile/${res.user.id}`);
    }
  } else {
    console.log('error');
  }
});
