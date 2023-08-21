// This function creates a new scheduled session.
// The function fetches the student ID and tutor ID from the form.
const postSession = async (event) => {
    event.preventDefault();
  
    const studentId = document.getElementById('student-id').value;
    const userId = document.getElementById('user-id').value;
    const tutorRating = document.getElementById('rating').value;
    const languageLevelId = document.getElementById('language-level-id').value;
    const languageId = document.getElementById('language-id').value;
  
  // api fetch should align to the index.js in api folder
    // The `fetch()` function makes a request to the API endpoint `/api/scheduledSessions`.
    // The request method is `POST` and the body of the request is a JSON object that contains the student ID, tutor ID, session begin, session end, and meeting link.
    const response = await fetch('/api/students', {
      method: 'POST',
      body: JSON.stringify({ student_id:studentId, user_id:userId, language_level_id: languageLevelId, language_id: languageId }),
      headers: { 'Content-Type': 'application/json' },
    });
  };
  
  const tutorRating= async (event) => {
    event.preventDefault();
    const tutorRating_id = event.target.value;
    const response = await fetch(`/api/tutor_ratings/${tutorRating_id}`, {
    }
  )};
