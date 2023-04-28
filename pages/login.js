import styled from "styled-components"
import Head from "next/head";
import { Button } from "@mui/material";
import { auth, provider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";

function Login () {

    const signIn = () => {
        signInWithPopup(auth, provider).catch(alert);
    };

    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>

            <LoginContainer>
                <Logo src= '/whatsapp-logo.png' />
                <Button onClick={signIn} variant="outlined" >Sign in with Google</Button>
            </LoginContainer>
        </Container>
    )
}

export default Login

const Container = styled.div `
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: whitesmoke;
    border-radius: 5px;
   
`;

const LoginContainer = styled.div `
    padding: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    box-shadow: 0px 4px 14px -3px rgba(0,0,0,0.75);
`;

const Logo = styled.img`
    height: 200px;
    width: 200px;
    margin-bottom: 50px;
`;