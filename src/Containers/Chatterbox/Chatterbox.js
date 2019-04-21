import React,{Component} from 'react';
import classes from './Chatterbox.module.css';
import PubNubReact from 'pubnub-react';
import ChatsWindow from '../../Components/ChatsWindow/ChatsWindow';
import Aux from '../../HOC/Aux/Aux';

class Chatterbox extends Component {
  
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


  render() {
    const messages = this.pubnub.getMessage('channel1');

    return (
      <div className={classes.chatterbox}>
        <div className={classes.sidepanel}>Left column</div>
        <div className={classes.chatContainer}>
          <div className={classes.messages}>
          <ChatsWindow messages={messages}/>
          </div>
          <div className={classes.input}>Input</div>
        </div>
      </div>
    )
  }
}

export default Chatterbox;