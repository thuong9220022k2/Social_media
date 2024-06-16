import { ChatEngine } from 'react-chat-engine';
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import ChatFeed from '../../components/ChatFeed';
import { useDispatch, useSelector } from "react-redux";
import "../../App.css";

const projectID = 'dbfd82da-9160-477a-896b-1e29d60ab129';

const ChatPage = () => {
    // const dispatch = useDispatch();
    // const token = useSelector((state) => state.token);
    const userName = useSelector((state) => state.user.firstName);
    console.log("loggedInUserId", userName)

    return (
        <Box paddingLeft="2rem" paddingRight="2rem" paddingHorizontal="6%">
            <Navbar />
            < ChatEngine
                height="90vh"
                projectID={projectID}
                userName={userName}
                userSecret="$2b$10$InS7bUsy7KkHVULtmAQwburGtUU1oHbk3ssVoVz50AWsgkOHJuNKy"
                renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
                onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
                renderOptionsSettings={(creds, chat) => (null)}
                renderPeopleSettings={(creds, chat) => (null)}
            />
        </Box>
    );
};

export default ChatPage;