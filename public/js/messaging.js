// Post the message new message
const postMessage= async (event) => {
    event.preventDefault();
    const message_text = document.getElementById("message_text").value
    const to_id = document.getElementById("to_id").value
    console.log(message_text, to_id)
    const response = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({ message_text, to_id }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/messages');
    } else {
      alert(response.statusText);
    }
};
const deleteMessage= async (event) => {
  event.preventDefault();
  // const message_id = document.querySelector(".delete-btn").value;
  const message_id = event.target.value;
  const response = await fetch(`/api/messages/${message_id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    document.location.replace('/messages');
  } else {
    alert(response.statusText);
  }
};

document.getElementById ("new-post-form").addEventListener ("submit", postMessage)
// document.getElementById ("message-delete").addEventListener ("click", deleteMessage)
document.querySelectorAll(".delete-btn").forEach(button => button.addEventListener("click", deleteMessage));