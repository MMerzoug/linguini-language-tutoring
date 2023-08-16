// Add the following Javascript code: 

// Create a new instance of the Sequelize model for the messages.
// Get all the messages for the current user.
// Render the messages view with the list of messages.
// Handle the form submission to create a new message.
// Handle the link clicks to edit or delete a message.

const Message = require('../../models/message');
const User = require('../../models/user');
const messagesView = (messages) => {
  const html = `
    <ul>
      ${messages.map((message) => {
        return `
          <li>
            <a href="/messages/${message.id}">
              ${message.sender.username}: ${message.message_text}
            </a>
          </li>
        `;
      })}
    </ul>
  `;
  return html;
};
const createMessageHandler = (event) => {
  event.preventDefault();
  const messageText = event.target.elements.messageText.value;
  Message.create({
    from_id: User.currentUser().id,
    to_id: event.target.elements.toId.value,
    message_text: messageText,
  });
  event.target.reset();
};
const editMessageHandler = (event) => {
  event.preventDefault();
  const messageId = event.target.dataset.messageId;
  const messageText = event.target.elements.messageText.value;
  Message.update({
    message_text: messageText,
  }, {
    where: {
      id: messageId,
    },
  });
  event.target.reset();
};
const deleteMessageHandler = (event) => {
  event.preventDefault();
  const messageId = event.target.dataset.messageId;
  Message.destroy({
    where: {
      id: messageId,
    },
  });
};
const messages = Message.findAll({
  where: {
    to_id: User.currentUser().id,
  },
});
const html = messagesView(messages);
const app = new Vue({
  el: '#app',
  data: {
    messages: messages,
  },
  methods: {
    createMessage: createMessageHandler,
    editMessage: editMessageHandler,
    deleteMessage: deleteMessageHandler,
  },
})