import React from 'react';
import classes from './MessagesHolder.module.css';

const chatsWindow = (props) => {
  return (
    <div className={classes.chatlistholder}>
      <ul className={classes.chatlist}>
        {props.messages.map((msg, index) => {
          return <li key={"message"+index}>{msg.message.text}</li>
        }).reverse()}
      </ul>
    </div>); 
}

export default chatsWindow;