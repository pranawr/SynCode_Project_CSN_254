import React from 'react';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import IconButton from '@material-ui/core/IconButton';

import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form d-flex">
    <input
      className="input mr-auto"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <IconButton className="ml-auto" color="primary" onClick={e => sendMessage(e)} title="Send">
      <SendRoundedIcon/>
    </IconButton>
    {/* <button className="sendButton" onClick={e => sendMessage(e)}>Send</button> */}
  </form>
)

export default Input;