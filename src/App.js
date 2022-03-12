import React from 'react';
import styled from 'styled-components';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './routes/index';
import { auth } from './configs/firebaseConfiguration';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './components/Login';
// import Spinner from 'react-spinkit';
var Spinner = require('react-spinkit');

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img
            src={'https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg'}
            alt=''
          />
          <Spinner name='ball-spin-fade-loader' color='purple' fadeIn='none' />
        </AppLoadingContents>
      </AppLoading>
    );
  }
  return (
    <BrowserRouter>
      <AppBody>
        {!user ? (
          <Login />
        ) : (
          <Routes>
            {routes.map((route, key) => (
              <Route
                key={key}
                exact={route.exact}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        )}
      </AppBody>
    </BrowserRouter>
  );
}

export default App;


const AppLoading = styled.div`
  display: flex;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
