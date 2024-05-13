import { ChatEngine } from 'react-chat-engine';

import ChatFeed from '../../components/ChatFeed';
import "../../App.css";

const projectID = '84475c91-fca9-4a5a-9f64-5555f1dbe498';

const chatPage = () => {
    return (
        <ChatEngine
            height="100vh"
            projectID={projectID}
            userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
            onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
        />
    );
};

// infinite scroll, logout, more customizations...

export default chatPage;