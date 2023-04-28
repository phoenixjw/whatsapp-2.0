import { Avatar,Button,IconButton, SvgIcon } from "@mui/material";
import styled from "styled-components";
import {ChatBubbleLeftIcon, EllipsisVerticalIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import * as EmailValidator from "email-validator"
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from 'react-firebase-hooks/firestore';
import { addDoc, collection, where, query } from "firebase/firestore";
import { db } from "@/firebase";
import Chat from "./Chat";



function Sidebar() {
    const [user] = useAuthState(auth);
    const chatRef = collection(db, "chats")
    const userChatRef = query(chatRef, where("user", "array-contains", user.email));
    const [chatSnapshot] = useCollection(userChatRef)
    console.log(user.photoURL)


const createChat = () => {
    const input = prompt(
        "Please enter an email for the user you wish to chat with"
        );

    if (!input) return null;
  
    if (EmailValidator.validate(input) &&!chatAlreadyExists(input) && input !== user.email) {

        // Added into DB 'chats collection if chat doesnt already exists and is valid
        addDoc(collection(db, 'chats'), {
            user: [user.email, input],
        });

    }
 };    


 const chatAlreadyExists = (recipientEmail) => {
    !!chatSnapshot?.docs.find(chat => chat.data().user.find((users) => users === recipientEmail))?.length > 0

 }


  
   

    return (
        <Container>
            <Header>
                <UserAvatar src={user.photoURL} onClick={() => auth.signOut()}/> 
                <IconsContainer>
                    <IconButton>
                    {/* Message Icon */}
                    <SvgIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </SvgIcon> 
                    </IconButton>

                    <IconButton>
                    {/* Vertical Dot Icon */}
                    <SvgIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </SvgIcon>
                    </IconButton>
                </IconsContainer>
            </Header>

            <Search>
                <SvgIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </SvgIcon>
                <SearchInput placeholder="Search in chats"/>
            </Search>

            <SidebarButton onClick={createChat}>Start a new chat </SidebarButton>


            {chatSnapshot?.docs.map(chat=>(
                <Chat
                key = {chat.id}
                id = {chat.id}
                users = {chat.data().user}
                />
            )
                )}

            

        </Container>
    )
}

export default Sidebar;

const Container = styled.div`
    flex: 0%.45;
    border-right: 1px solid whitesmoke;
    height: 100vh;
    min-height: 300px;
    max-width: 350px;
    overflow-y: scroll;
    /* Stops emails from descending past the InputContainer on ChatScreen*/

    ::-webkit-scrollbar{
        display:none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;

    /* Hide scrollbar next to emails */
`;

const Header = styled.div ` 
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar) `
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }

`;

const IconsContainer = styled.div`
`;

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
`;

const SearchInput = styled.input`
    outline-width:0;
    border: none;
    flex:1;
`;

const SidebarButton = styled(Button) `
    width: 100%;
    color: black;

    &&& {
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;

    }
`;
