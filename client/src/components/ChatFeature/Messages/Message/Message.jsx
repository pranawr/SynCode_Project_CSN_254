import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, sender }, nameOfUser }) => {
  let isSentByCurrentUser = false;

  

  if(sender === nameOfUser) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd pr-1">
          <p className="sentText pr-10 mb-0 mt-3">{nameOfUser}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart pl-1">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10 mb-0 mt-3">{sender}</p>
          </div>
        )
  );
}

export default Message;