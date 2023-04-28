import { auth, db } from "@/firebase";
import { Avatar, IconButton, SvgIcon } from "@mui/material";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, doc, setDoc, Timestamp , addDoc, where} from "firebase/firestore";
import Message from "./Message";
import { useRef, useState } from "react";
import getRecipientEmail from "@/utils/getRecipientEmail";
import TimeAgo from "timeago-react";

function ChatScreen({ chat, messages }) {
    const [user] = useAuthState(auth);
    const[input, setInput] = useState("");
    const endOfMessagesRef = useRef(null);
    const router = useRouter();
    const [messagesSnapshot] = useCollection(query(collection(db, `chats/${router.query.id}/messages`), orderBy("timestamp", "asc")));

    const recipientEmail = getRecipientEmail(chat.user, user)

    const [recipientSnapshot] = useCollection(query(collection(db, "users"), where("email", "==", recipientEmail)))

    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map(message => (
                <Message
                    key ={message.id}
                    user={message.data().user}
                    message ={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
                />
            ));
        } else {
            return JSON.parse(messages).map((message) => (
                <Message key={message.id} user={message.user} message={message} />
              ));
        }
    };

    const scrollToBottom = () => {
        endOfMessagesRef.current.scrollIntoView({
            behaviour: "smooth",
            block: "start",
        });
    }

    const sendMessage = (e) => {
        e.preventDefault();

        const docRef = doc(db, `chats/${user.uid}`);

        setDoc(docRef, {lastSeen: Timestamp.now(), }, {merge: true});

        const colRef = collection(db, `chats/${router.query.id}/messages`);

        addDoc(colRef, {
            timestamp: Timestamp.now(),
            message: input,
            user: user.email,
            photoURL: user.photoURL,
          });

          setInput("");
          scrollToBottom();
        
    };

    const recipient = recipientSnapshot?.docs?.[0]?.data()

    return(
        <Container>

            <Header>
                {recipient ? (
                    <Avatar src={recipient.photoURL}/>

                ) : (
                    <Avatar>{recipientEmail[0]}</Avatar>
                )
                    

                }
                <HeaderInformation>
                <h3>{recipientEmail}</h3>
                {recipientSnapshot ? (
                    <p>
                        Last active:{" "}
                        {recipient?.lastSeen?.toDate() ? (
                        <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                        ) : (
                        "Unavailable"
                        )}
                    </p>
                        ) : (
                    <p>Loading last active...</p>
                )}
                </HeaderInformation>
                <HeaderIcons>
                    <IconButton>
                    {/* Attach file Icon */}
                    <SvgIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  stroke="currentColor" class="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                    </SvgIcon>
                    </IconButton>

                    <IconButton>
                     {/* Vertical Dot Icon */}
                    <SvgIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </SvgIcon>
                    </IconButton>
                </HeaderIcons>
            </Header>

            <MessageContainer>
                {showMessages()}
                <EndOfMessage ref={endOfMessagesRef}/>
            </MessageContainer>


            <InputContainer>
            {/* Emote Button */}
            <SvgIcon xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5}  className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
            </SvgIcon>

            <Input value={input} onChange={e => setInput(e.target.value)}/>
            <button hidden disabled={!input} type="submit" onClick={sendMessage}></button>

            </InputContainer>
        </Container>
    )
}
export default ChatScreen;

const Container = styled.div`
`;

const Input = styled.input`
    flex: 1;
    outline: 0;
    border: none;
    border-radius: 10px;
    background-color: whitesmoke;
    padding: 20px;
    margin-left: 15px;
    margin-right: 15px;

    
`;

const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 10px;
    position: sticky;
    /* postion sticky- avoids padding issues */
    bottom: 0;
    background-color: white;
    z-index: 100;
    
    `;



const Header = styled.div`
    position: sticky;
    background-color: white;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 11px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
    margin-left: 15px;
    flex: 1;

    > h3 {
        margin-bottom: 3px;
    }

    > p {
        font-size: 14px;
        color: grey;
    }

`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
    padding: 30px;
    background-color: #e5ded8;
    min-height: 90vh;
`;

const EndOfMessage = styled.div`
    margin-bottom: 50px;
`;