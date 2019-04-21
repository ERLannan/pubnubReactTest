import React,{Component} from 'react';
import PubNubReact from 'pubnub-react';

import ChatsWindow from '../../Components/Chat/MessagesHolder/MessagesHolder';
import MessageInput from '../../Components/Chat/MessageInput/MessageInput';

import classes from './Chatterbox.module.css';

class Chatterbox extends Component {

  state = {
    currentMessage:''
  }
  
  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({
        publishKey: 'demo',
        subscribeKey: 'demo'
    });
    this.pubnub.init(this);
}

componentWillMount() {
    this.pubnub.subscribe({
        channels: ['channel1'],
        withPresence: true
    });

    this.pubnub.getMessage('channel1', (msg) => {
        console.log(msg);
    });

    this.pubnub.getStatus((st) => {
        this.pubnub.publish({
            message: {'text':'hello world from react'},
            channel: 'channel1'
        });
    });
}

componentWillUnmount() {
    this.pubnub.unsubscribe({
        channels: ['channel1']
    });
}

messageChangedHandler = (event) => {
  this.setState({currentMessage:event.target.value});
} 

sendClickedHandler = () => {
  this.sendMessage();
}

sendKeyPressHandler = (event) => {
  if(event.key === 'Enter') {
    this.sendMessage();
  }
}

sendMessage = () => {
  if(this.state.currentMessage.length>0){
    this.pubnub.publish({
      message: {'text':this.state.currentMessage},
      channel: 'channel1'
    });
    this.setState({currentMessage:''});
  }
}

render() {
   const messages = this.pubnub.getMessage('channel1');

   return (
    <div className={classes.chatterbox}>
      <div className={classes.sidepanel}>Left column</div>
      <div className={classes.chatContainer}>
        <div className={classes.messages}>
          <ChatsWindow messages={messages}/>
        </div>
        <div className={classes.input}>
          <MessageInput sendClicked={this.sendClickedHandler} 
                        msg={this.state.currentMessage}
                        messageChanged={this.messageChangedHandler}
                        returnKeyPressed={this.sendKeyPressHandler}/>
        </div>
      </div>
    </div>)
  }
}

export default Chatterbox;