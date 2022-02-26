import React from 'react';
import styled from 'styled-components';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { enterRoom } from '../features/appSlice';

function SidebarOption({ Icon, title, addChannelOption, id }) {
   const dispatch = useDispatch();

   const addChannel = async () => {
      const channelName = prompt('please enter the channel name');

      if (channelName) {
         try {
            const docRef = await addDoc(collection(db, 'rooms'), {
               name: channelName,
            });
            console.log('Document written with ID: ', docRef.id);
         } catch (e) {
            console.error('Error adding document: ', e);
         }
      }
   };
   const selectChannel = () => {
      if (id) {
         dispatch(
            enterRoom({
               roomId: id,
            })
         );
      }
   };

   return (
      <SidebarOptionWrap
         onClick={addChannelOption ? addChannel : selectChannel}
      >
         {Icon && (
            <Icon fontSize='small' style={{ padding: 10, fontSize: '15px' }} />
         )}
         {Icon ? (
            <h3>{title}</h3>
         ) : (
            <SiderbarOptionChannel>
               <span>#</span> {title}
            </SiderbarOptionChannel>
         )}
      </SidebarOptionWrap>
   );
}

export default SidebarOption;

const SidebarOptionWrap = styled.div`
   display: flex;
   font-size: 12px;
   align-items: center;
   cursor: pointer;
   color: #eaeaea;

   :hover {
      opacity: 1.9;
      background-color: #340e36;
   }

   > h3 {
      font-weight: 500;
   }
`;

const SiderbarOptionChannel = styled.h3`
   padding: 10px 0;
   font-weight: 300;

   > span {
      padding: 10px;
   }
`;
