import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';

const Login = () => {
   const signIn = async (e) => {
      await signInWithPopup(auth, provider).catch((error) => {
         alert(error.message);
      });
   };

   return (
      <LoginWrap>
         <LoginInnerWrap>
            <img
               src='https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg'
               alt=''
            />
            <h1>Sign in to DevUbong</h1>
            <Button onClick={signIn}>Sign in with Google</Button>
         </LoginInnerWrap>
      </LoginWrap>
   );
};

export default Login;

const LoginWrap = styled.div`
   background-color: #f8f8f8;
   height: 100vh;
   display: grid;
   place-items: center;
   padding: 2rem;
`;

const LoginInnerWrap = styled.div`
   padding: 100px;
   background-color: white;
   text-align: center;
   border-radius: 10px;
   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.025);

   > img {
      object-fit: contain;
      width: 150px;
      margin-bottom: 1rem;
   }

   > h1 {
      font-size: 1rem;
   }

   > button {
      margin-top: 1rem;
      text-transform: inherit !important;
      background-color: #2eb67d !important;
      color: white;
   }
`;
