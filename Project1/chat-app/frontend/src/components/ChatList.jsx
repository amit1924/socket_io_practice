/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const ChatList = ({ chats }) => {
  const user = localStorage.getItem("user");
  // eslint-disable-next-line react/prop-types
  function SenderChat({ message, username, avatar }) {
    return (
      <div className="chat_sender">
        <img src={avatar} alt="" />
        <p>
          <strong>{username}</strong> <br />
          {message}
        </p>
      </div>
    );
  }
  // eslint-disable-next-line react/prop-types
  function ReceiverChat({ message, username, avatar }) {
    return (
      <div className="chat_receiver">
        <img src={avatar} alt="" />
        <p>
          <strong>{username}</strong> <br />
          {message}
        </p>
      </div>
    );
  }
  return (
    <div className="chats_list">
      {chats.map((chat, index) => {
        if (chat.user === user) {
          return (
            <SenderChat
              key={index}
              message={chat.message}
              username={chat.user}
              avatar={chat.avatar}
            />
          );
        } else {
          return (
            <ReceiverChat
              key={index}
              message={chat.message}
              username={chat.user}
              avatar={chat.avatar}
            />
          );
        }
      })}
    </div>
  );
};

export default ChatList;
