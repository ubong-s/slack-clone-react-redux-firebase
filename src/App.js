import React from 'react';
import styled from 'styled-components';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { useSelector } from 'react-redux';
import { selectSidebar } from './features/globalSlice';

function App() {
   const [user, loading] = useAuthState(auth);
   const sidebarOpen = useSelector(selectSidebar);

   if (loading) {
      return (
         <AppLoading>
            <AppLoadingContents>
               <img
                  src='https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg'
                  alt=''
               />
            </AppLoadingContents>
         </AppLoading>
      );
   }

   return (
      <div className='app'>
         <Router>
            {!user ? (
               <Login />
            ) : (
               <>
                  <Header />
                  <AppBody className={!sidebarOpen && 'hidden'}>
                     <Sidebar />
                     <Routes>
                        <Route exact path='/' element={<Chat />} />
                     </Routes>
                  </AppBody>
               </>
            )}
         </Router>
      </div>
   );
}

export default App;

const AppBody = styled.div`
   display: grid;
   grid-template-columns: auto 1fr;
   align-items: flex-start;
   height: calc(100vh - 40px);
   padding-top: 40px;
   transition: 0.3s ease;

   &.hidden {
      grid-template-columns: 0 1fr;
      transition: 0.3s ease;
   }

   @media screen and (min-width: 768px) {
      &.hidden {
         grid-template-columns: auto 1fr;
      }
   }
`;

const AppLoading = styled.div`
   display: grid;
   height: 100vh;
   place-items: center;
   text-align: center;
   padding: 2rem;
`;

const AppLoadingContents = styled.div`
   > img {
      max-width: 150px;
      margin-bottom: 1rem;
      animation: zoom 1s ease infinite;
   }

   @keyframes zoom {
      0% {
         transform: scale(1);
      }

      50% {
         transform: scale(1.1);
      }

      100% {
         transform: scale(1);
      }
   }
`;
