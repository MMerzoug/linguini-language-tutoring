// Handle the form submission event
// const form = document.getElementById('schedule-tutoring-session');

// form.addEventListener('submit', async (event) => {
//   event.preventDefault();

// Get the student ID, tutor ID, session time, and topic from the form
// const studentId = document.getElementById('student-id').value;
// const tutorId = document.getElementById('tutor-id').value;
// const sessionTime = document.getElementById('session-time').value;
// const topic = document.getElementById('topic').value;

// Create a new Tutor object
// const tutor = new Tutor({
//   name: 'John Doe',
//   email: 'johndoe@example.com',
//   phone: '123-456-7890',
//   availability: ['Monday 10am-12pm', 'Wednesday 2pm-4pm'],
// });

// Save the Tutor object
// await tutor.save();

// Create a new ScheduledSession object
// const scheduledSession = new ScheduledSession({
//   studentId,
//   tutorId,
//   sessionTime,
//   topic,
// });

// Save the ScheduledSession object
// await scheduledSession.save();

// Display a success message
//   alert('Tutoring session scheduled successfully! Your tutor will provide an email with a link to the session.');
// });

const postSession = async (event) => {
  event.preventDefault();

  const studentId = document.getElementById('student-id').value;
  const tutorId = document.getElementById('tutor-id').value;
  const sessionBegin = document.getElementById('session-begin').value;
  const sessionEnd = document.getElementById('session-end').value;
  const meetingLink = document.getElementById('meeting-link').value;

// api fetch should align to the index.js in api folder
  const response = await fetch('/api/scheduledSessions', {
    method: 'POST',
    body: JSON.stringify({ student_id:studentId, tutor_id:tutorId, session_begin: sessionBegin,  session_end:sessionEnd , meeting_link:meetingLink }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    alert ("Tutoring session scheduled successfully! Your tutor will provide an email with a link to the session");
    document.location.replace('/scheuledSession');
  } else {
    alert(response.statusText);
  }
};

document.getElementById("scheduled-session-form").addEventListener("submit", postSession)