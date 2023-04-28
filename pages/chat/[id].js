import styled from "styled-components";
import Head from "next/head";
import Sidebar from "@/Components/Sidebar";
import ChatScreen from "@/Components/ChatScreen";
import { auth, db } from "@/firebase";
import { collection, doc, query, getDocs, orderBy, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "@/utils/getRecipientEmail";

function Chat({ chat, messages }) {
    const [user] = useAuthState(auth);
    return(
        <Container>
            <Head>
                <title>Chat with {getRecipientEmail(chat.user, user)}</title>
            </Head>

            <Sidebar/>
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages}/>
            </ChatContainer>
        </Container>
    )
}

export default Chat;

export async function getServerSideProps(context) {
    const ref = doc(db, `chats/${context.query.id}`);
    const colRef = collection(db, `chats/${context.query.id}/messages`);

    // prep the messages on the server

    const messagesQuery = query(colRef, orderBy("timestamp", "asc"));
    const messagesRes = await getDocs(messagesQuery);

    const messages = messagesRes.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })).map(messages => ({
        ...messages,
        timestamp: messages.timestamp

    }));

    // Prep the chats

    const chatRes = await getDoc(ref);
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    };

    console.log(chat, messages)

    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat
        }

    }
    

};
 

const Container = styled.div`
    display: flex;
`;

const ChatContainer = styled.div`
    flex: 1;
    overflow: scroll;
    height: 100vh;

    ::-webkit-scrollbar{
        display: none;
    }
    -ms-overflow-style: none; /* Internet Explorer and Microsoft Edge Browsers */
    scrollbar-width: none; /* Firefox */

`;