import React from 'react';
import classes from './MessageInput.module.css';

const messageInput = (props) => {
  return (
    <div className={classes.inputholder}>
      <input id='msgInput' className={classes.messageinput} 
                           type='text' 
                           placeholder='Type a message' 
                           onChange={props.messageChanged} 
                           value={props.msg}
                           onKeyPress={props.returnKeyPressed}></input>
      <button className={classes.sendbutton} onClick={() => props.sendClicked('blah')}>SEND</button>
    </div>
  )
}

export default messageInput;