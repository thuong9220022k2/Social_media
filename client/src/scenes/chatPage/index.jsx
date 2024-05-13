import { ChatEngine } from 'react-chat-engine';

import ChatFeed from '../../components/ChatFeed';
import "../../App.css";

const chatPage = () => {
    return (
        <ChatEngine
            height="100vh"
            userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
            onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
        />
    );
};

// infinite scroll, logout, more customizations...

export default chatPage;