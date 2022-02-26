import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useState } from 'react';

const ChatInput = ({ channelName, channelId }) => {
   const [input, setInput] = useState('');
   const user = useAuthState(auth);

   const sendMessage = async (e) => {
      e.preventDefault();

      if (!channelId) {
         return false;
      }

      await addDoc(collection(db, 'rooms', channelId, 'messages'), {
         message: input,
         timestamp: serverTimestamp(),
         user: user[0]?.displayName,
         userImage: user[0]?.photoURL,
      }).then(() => {
         setInput('');
      });
   };

   return (
      <ChatInputWrap onSubmit={sendMessage}>
         <form>
            <input
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder={`Message #${channelName}`}
            />
            <Button type='submit' hidden>
               SEND
            </Button>
         </form>
      </ChatInputWrap>
   );
};

export default ChatInput;

const ChatInputWrap = styled.div`
   position: sticky;
   bottom: 20px;
   border-radius: 20px;
   padding: 20px;

   > form {
      display: flex;
      width: 100%;
      justify-content: center;
   }

   > form > input {
      width: 100%;
      border: 1px solid #dadada;
      box-shadow: 0 1px 3px rgb(0 0 0 / 8%);
      border-radius: 5px;
      padding: 0 20px 20px 20px;
      min-height: 60px;
      outline: none;
   }

   > form > button {
      display: none;
   }
`;
