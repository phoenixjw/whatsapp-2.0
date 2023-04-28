import { auth } from "@/firebase";
import getRecipientEmail from "@/utils/getRecipientEmail";
import { Avatar } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { collection, where, query } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/router";

function Chat({id, users}) {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const chatRef = collection(db, "users")
    const userChatRef = query(chatRef, where("email", "==", getRecipientEmail(users, user)));
    const [recipientSnapshot] = useCollection(userChatRef);

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }
    const recipient = recipientSnapshot?.docs?.[0]?.data();

    const recipientEmail = getRecipientEmail(users, user);

    return(
        <Container onClick={enterChat}>

        {recipient ? (
        <UserAvatar src={recipient.photoURL} />
     ) : (
        <UserAvatar>{recipientEmail[0]}</UserAvatar>
      )}
      
            <p>{recipientEmail}</p>

        </Container>
    )
}

export default Chat;

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 15px;
    word-break: break-word;

    :hover {
        background-color: #e9eaeb;
    }
    

`;

const UserAvatar = styled(Avatar)`
    margin: 5px;
    margin-right: 15px;

`;