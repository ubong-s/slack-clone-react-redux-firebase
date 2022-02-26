import React from 'react';
import styled from 'styled-components';
import {
   FiberManualRecord,
   Create,
   InsertComment,
   Inbox,
   Drafts,
   BookmarkBorder,
   PeopleAlt,
   Apps,
   FileCopy,
   ExpandLess,
   ExpandMore,
   Add,
} from '@material-ui/icons';
import SidebarOption from './SidebarOption';
import { db } from '../firebase';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { selectSidebar } from '../features/globalSlice';
import { useSelector } from 'react-redux';

function Sidebar() {
   const [channels] = useCollection(collection(db, 'rooms'), {
      snapshotListenOptions: { includeMetadataChanges: true },
   });

   const sidebarOpen = useSelector(selectSidebar);

   return (
      <SidebarWrap className={!sidebarOpen ? 'hidden' : ''}>
         <SidebarHeader>
            <SidebarInfo>
               <h2>DevUbong</h2>
            </SidebarInfo>
            <Create />
         </SidebarHeader>
         <SidebarOption Icon={InsertComment} title='Threads' />
         <SidebarOption Icon={Inbox} title='Mentions & reactions' />
         <SidebarOption Icon={Drafts} title='Saved Items' />
         <SidebarOption Icon={BookmarkBorder} title='Channel Browser' />
         <SidebarOption Icon={PeopleAlt} title='People & user groups' />
         <SidebarOption Icon={Apps} title='Apps' />
         <SidebarOption Icon={FileCopy} title='File Browser' />
         <SidebarOption Icon={ExpandLess} title='Show Less' />

         <hr />

         <SidebarOption Icon={ExpandMore} title='Channels' />

         <hr />

         <SidebarOption Icon={Add} addChannelOption title='Add Channel' />

         {channels?.docs.map((doc) => (
            <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
         ))}
      </SidebarWrap>
   );
}

export default Sidebar;

const SidebarWrap = styled.aside`
   background-color: #3f0e40;
   color: white;
   flex: 0.3;
   border-top: 1px solid #49274b;
   width: 200px;
   height: 100%;
   z-index: 2;
   transition: ease 0.3s;

   > hr {
      margin-top: 10px;
      margin-bottom: 10px;
      border: 1px solid #49274b;
   }

   &.hidden {
      transform: translateX(-100%);
      transition: ease 0.3s;
   }

   @media screen and (min-width: 768px) {
      &.hidden {
         transform: translateX(0);
         transition: ease 0.3s;
         width: 260px;
      }
   }
`;

const SidebarHeader = styled.div`
   border-bottom: 1px solid #49274b;
   display: flex;
   align-items: center;
   height: 50px;
   padding: 0 13px;
   margin-bottom: 1rem;

   > .MuiSvgIcon-root {
      padding: 8px;
      color: #bcabbc;
      font-size: 18px;
      background-color: white;
      border-radius: 50%;
   }
`;
const SidebarInfo = styled.div`
   flex: 1;

   > h2 {
      margin-bottom: 5px;
      font-weight: 900;
      font-size: 18px;
   }

   > h3 {
      display: flex;
      font-weight: 400;
      font-size: 13px;
      align-items: center;
   }

   > h3 > .MuiSvgIcon-root {
      margin-top: 1px;
      margin-right: 2px;
      font-size: 14px;
      color: green;
   }
`;
