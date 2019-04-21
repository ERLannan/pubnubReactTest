import React from 'react';
import classes from './ChatsWindow.module.css';

const chatsWindow = (props) => {
  return (
    <div className={classes.chatlistholder}>
      <ul className={classes.chatlist}>
        {props.messages.map((msg, index) => {
          return <li key={"message"+index}>{msg.message.text}</li>
        })}
      </ul>
    </div>); 
}

export default chatsWindow;