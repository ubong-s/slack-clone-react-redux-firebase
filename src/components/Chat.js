import React, { useRef } from 'react';
import {
   InfoOutlined,
   StarBorderOutlined,
   MenuOpenSharp,
} from '@material-ui/icons';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import ChatInput from './ChatInput';
import Message from './Message';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { doc, collection, orderBy, query } from 'firebase/firestore';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../features/globalSlice';

const Chat = () => {
   const chatRef = useRef(null);
   const roomId = useSelector(selectRoomId);
   const dispatch = useDispatch();

   const [roomDetails] = useDocument(roomId && doc(db, 'rooms', roomId), {
      snapshotListenOptions: { includeMetadataChanges: true },
   });

   const [roomMessages, loading] = useCollection(
      roomId &&
         query(
            collection(db, 'rooms', roomId, 'messages'),
            orderBy('timestamp', 'asc')
         )
   );

   useEffect(() => {
      chatRef?.current?.scrollIntoView({
         behaviour: 'smooth',
      });
   }, [roomId, loading, roomMessages]);

   return (
      <ChatWrap>
         {roomMessages && (
            <>
               <Header>
                  <HeaderLeft>
                     <MenuOpenSharp onClick={() => dispatch(toggleSidebar())} />
                     <h4>
                        <strong># {roomDetails?.data().name}</strong>
                     </h4>
                     <StarBorderOutlined />
                  </HeaderLeft>
                  <HeaderRight>
                     <p>
                        <InfoOutlined />
                     </p>
                  </HeaderRight>
               </Header>

               <ChatMessages>
                  {roomMessages?.docs.map((doc) => {
                     return <Message key={doc.id} {...doc.data()} />;
                  })}
                  <ChatBottom ref={chatRef} />
               </ChatMessages>

               <ChatInput
                  channelName={roomDetails?.data().name}
                  channelId={roomId}
               />
            </>
         )}
      </ChatWrap>
   );
};

export default Chat;

const ChatWrap = styled.div`
   position: relative;
   overflow-y: scroll;
   height: 100%;
`;

const Header = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   height: 50px;
   padding: 0 20px;
   border-bottom: 1px solid lightgray;
   position: sticky;
   top: 0;
   background-color: white;
`;

const HeaderLeft = styled.div`
   display: flex;
   align-items: center;
   gap: 1rem;

   > h4 {
      display: flex;
      text-transform: capitalize;
      margin-right: 10px;
   }

   > h4 > .MuiSvgIcon-root {
      margin-left: 10px;
      font-size: 18px;
   }

   @media screen and (min-width: 768px) {
      > .MuiSvgIcon-root {
         display: none;
      }
   }
`;

const HeaderRight = styled.div`
   > p {
      display: flex;
      text-transform: lowercase;
      font-size: 14px;
   }

   > p > .MuiSvgIcon-root {
      margin-left: 5px !important;
      font-size: 16px;
   }
`;

const ChatMessages = styled.div`
   min-height: calc(100% - 200px);
   text-align: left;
`;

const ChatBottom = styled.div`
   height: 50px;
`;
