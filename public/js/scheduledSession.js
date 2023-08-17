// Handle the form submission event
const form = document.getElementById('schedule-tutoring-session');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get the student ID, tutor ID, session time, and topic from the form
  const studentId = document.getElementById('student-id').value;
  const tutorId = document.getElementById('tutor-id').value;
  const sessionTime = document.getElementById('session-time').value;
  const topic = document.getElementById('topic').value;

  // Create a new Tutor object
  const tutor = new Tutor({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    availability: ['Monday 10am-12pm', 'Wednesday 2pm-4pm'],
  });

  // Save the Tutor object
  await tutor.save();

  // Create a new ScheduledSession object
  const scheduledSession = new ScheduledSession({
    studentId,
    tutorId,
    sessionTime,
    topic,
  });

  // Save the ScheduledSession object
  await scheduledSession.save();

  // Display a success message
  alert('Tutoring session scheduled successfully! Your tutor will provide an email with a link to the session.');
});