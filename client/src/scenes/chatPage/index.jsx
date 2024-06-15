import { ChatEngine } from 'react-chat-engine';
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import ChatFeed from '../../components/ChatFeed';
import "../../App.css";

const projectID = '5bb6a19d-b362-40cb-bb5a-2d100d8e077e';

const ChatPage = (props) => {
    return (
        <Box paddingLeft="2rem" paddingRight="2rem" paddingHorizontal="6%">
            <Navbar />
            < ChatEngine
                height="90vh"
                projectID={projectID}
                userName="Cris"
                userSecret="$2b$10$60mtK5Gt1T4puucbq5xAVu/4aMvH145aTQ7ZmQqLQ7.FzodRRoAqO\"
                renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
                onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
            />
        </Box>
    );
};

export default ChatPage;