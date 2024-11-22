/*import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)*/

import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import App from './App.tsx';
import BattleRoom from './pages/BattleRoom.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Login from './pages/Login.tsx';
import TeamsRoom from './pages/TeamsRoom.tsx';
import SignUp from './pages/SignUp.tsx';
import ErrorPage from './pages/ErrorPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />
      }, 
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/teamsRoom',
        element: <TeamsRoom />
      },
      {
        path: '/battleRoom',
        element: <BattleRoom />
      },
      {
        path: '/signUp',
        element: <SignUp />
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if(rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}

