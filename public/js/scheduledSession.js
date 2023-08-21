// Get the scheduled sessions from the database.
// This function fetches the scheduled sessions from the database for the specified student ID.

const getScheduledSessions = async (studentId) => {
  // Get the scheduled sessions from the database.
  const scheduledSessions = await fetch(`/api/scheduled-sessions/student/${studentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Check if the request was successful.
  // If the request was not successful, the function throws an error.
  if (scheduledSessions.status !== 200) {
    throw new Error("Failed to get scheduled sessions");
  }

  // Parse the scheduled sessions from the response.
  // The response is a JSON object that contains an array of scheduled sessions.
  // The function assigns the value of the `scheduledSessions` property to the `scheduledSessionsData` variable.
  const scheduledSessionsData = await scheduledSessions.json();

  // Render the scheduled sessions on the front end.
  // The function loops through the `scheduledSessionsData` array and renders each scheduled session as a list item.
  const scheduledSessionsElement = document.getElementById("scheduled-sessions");
  scheduledSessionsElement.innerHTML = "";

  for (const scheduledSession of scheduledSessionsData) {
    const sessionElement = document.createElement("li");
    sessionElement.innerHTML = `
      <h3>{{ session.subject }}</h3>
      <p>{{ session.date }}</p>
      <p>{{ session.time }}</p>
    `;
    scheduledSessionsElement.appendChild(sessionElement);
  }
};

// This function creates a new scheduled session.
// The function fetches the student ID and tutor ID from the form.
const postSession = async (event) => {
  event.preventDefault();

  const studentId = document.getElementById('student-id').value;
  const tutorId = document.getElementById('tutor-id').value;
  const sessionBegin = document.getElementById('session-begin').value;
  const sessionEnd = document.getElementById('session-end').value;
  const meetingLink = document.getElementById('meeting-link').value;

// api fetch should align to the index.js in api folder
  // The `fetch()` function makes a request to the API endpoint `/api/scheduledSessions`.
  // The request method is `POST` and the body of the request is a JSON object that contains the student ID, tutor ID, session begin, session end, and meeting link.
  const response = await fetch('/api/scheduledSessions', {
    method: 'POST',
    body: JSON.stringify({ student_id:studentId, tutor_id:tutorId, session_begin: sessionBegin,  session_end:sessionEnd , meeting_link:meetingLink }),
    headers: { 'Content-Type': 'application/json' },
  });

  // Check if the request was successful.
  // If the request was successful, the function alerts the user that the session has been scheduled.
  if (response.ok) {
    alert ("Tutoring session scheduled successfully! Your tutor will provide an email with a link to the session");
    document.location.replace('/scheduledSession');
  } else {
    // If the request was not successful, the function alerts the user of the error.
    alert(response.statusText);
  }
};

const deleteSession= async (event) => {
  event.preventDefault();
  const scheduledSession_id = event.target.value;
  const response = await fetch(`/api/scheduledSessions/${scheduledSession_id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    document.location.replace('/scheduledSession');
  } else {
    alert(response.statusText);
  }
};
// This function listens for the submit event on the `scheduled-session-form` element.
// When the form is submitted, the `postSession()` function is called.
const formElm= document.getElementById("scheduled-session-form");
if (formElm) {
  formElm.addEventListener("submit", postSession)
}
document.querySelectorAll(".delete-btn").forEach((button) => {
  button.addEventListener("click", deleteSession);
});