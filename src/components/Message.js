import React from 'react';
import styled from 'styled-components';

const Message = ({ message, timestamp, user, userImage }) => {
   return (
      <MessageWrap>
         <img src={userImage && userImage} alt={user} />
         <MessageInfo>
            <h4>
               {user}{' '}
               <span> {new Date(timestamp?.toDate()).toUTCString()} </span>
            </h4>
            <p>{message}</p>
         </MessageInfo>
      </MessageWrap>
   );
};

export default Message;

const MessageWrap = styled.div`
   display: flex;
   align-items: flex-start;
   padding: 20px;

   > img {
      height: 40px;
      border-radius: 8px;
   }
`;

const MessageInfo = styled.div`
   padding-left: 10px;

   h4 {
      font-size: 15px;
      font-weight: 900;
      line-height: 22px;
      color: #1d1c1d;
   }

   > h4 > span {
      color: gray;
      font-weight: 300;
      margin-left: 4px;
      font-size: 10px;
   }

   p {
      font-size: 15px;
      line-height: 22px;
      color: #1d1c1d;
   }
`;
