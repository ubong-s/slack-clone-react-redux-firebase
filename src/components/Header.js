import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import { Search, AccessTime, HelpOutline } from '@material-ui/icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function Header() {
   const user = useAuthState(auth);

   return (
      <HeaderWrap>
         <HeaderLeft>
            <AccessTime />
         </HeaderLeft>
         <HeaderSearch>
            <input type='text' placeholder='Search DevUbong' />
            <Search />
         </HeaderSearch>

         <HeaderRight>
            <HelpOutline />
            <HeaderAvatar
               onClick={async () => await signOut(auth)}
               src={user && user[0].photoURL}
               alt={user && user[0].displayName}
            />
            <p>{user && user[0].displayName}</p>
         </HeaderRight>
      </HeaderWrap>
   );
}

export default Header;

const HeaderWrap = styled.header`
   display: grid;
   grid-template-columns: auto 1fr auto;
   gap: 1rem;
   position: fixed;
   top: 0;
   height: 40px;
   width: 100%;
   align-items: center;
   background-color: #350d36;
   color: white;

   @media screen and (min-width: 1024px) {
      grid-template-columns: 1fr 2fr 1fr;
   }
`;

const HeaderLeft = styled.div`
   margin-left: 20px;

   @media screen and (min-width: 1024px) {
      justify-self: flex-end;
   }
`;

const HeaderAvatar = styled(Avatar)`
   cursor: pointer;

   > .MuiAvatar-img {
      height: 80%;
      object-fit: contain;
   }

   :hover {
      opacity: 0.8;
   }
`;

const HeaderSearch = styled.div`
   position: relative;
   display: flex;
   justify-content: space-between;
   opacity: 1;
   border-radius: 4px;
   background-color: #644565;
   text-align: center;
   padding: 3px 0;

   > .MuiSvgIcon-root {
      position: absolute;
      right: 2px;
      top: 50%;
      transform: translateY(-50%);
      height: 75%;
   }

   > input {
      background-color: transparent;
      border: none;
      padding: 2px 10px;
      outline: none;
      width: 100%;
      height: 100%;
      color: white;
      font-size: 0.8rem;
      font-weight: 400;

      ::placeholder {
         color: white;
      }
   }
`;

const HeaderRight = styled.div`
   display: flex;
   gap: 0.5rem;
   align-items: center;
   margin-right: 10px;

   > p {
      display: none;
      font-size: 10px;
   }

   @media screen and (min-width: 1024px) {
      justify-content: flex-end;
      margin-right: 20px;

      > p {
         display: block;
      }
   }
`;
