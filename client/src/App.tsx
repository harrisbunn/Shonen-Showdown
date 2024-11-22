import { Outlet } from "react-router-dom"
import {useState, useEffect} from "react"

import { Buffer } from "buffer"

import Navbar from "./components/navbar"
import Footer from "./components/footer"

import './App.css'

import { UserData } from './interfaces/UserData'
import { TeamData } from './interfaces/TeamData'
import { CharacterData } from './interfaces/CharacterData'

type Context = {
  loginToken: string | null,
  setLoginToken: (loginToken: string | null) => void,
  userData?: UserData | null,
  setUserData?: (userData: UserData) => void
}

////////////////////////////////////////////////////
//----------------Get Teams-----------------------//
////////////////////////////////////////////////////
const getTeams = async (userId:number): Promise<TeamData[] | null> => {
  const response = await fetch(`/api/team/${userId}`);
  
  if (response.status === 200) {
      const teams = await response.json();
      return teams;
  } else {
      return null;
  }
}

////////////////////////////////////////////////////
//-----------Get Characters On Team---------------//
////////////////////////////////////////////////////
const getCharactersOnTeam = async (teamId:number): Promise<CharacterData[] | []> => {
  const response = await fetch(`/api/battle/${teamId}/characters`);
  
  if (response.status === 200) {
      const characters = await response.json();
      return characters;
  } else {
      return [];
  }
}

function App() {
  const [ loginToken, setLoginToken ] = useState(localStorage.getItem('LOGIN_TOKEN'));

  const context: Context = {
    loginToken: loginToken,
    setLoginToken: setLoginToken,
  };

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (loginToken) {
        const payload = JSON.parse(Buffer.from(loginToken.split('.')[1], 'base64').toString());
        const activeTeamStr = localStorage.getItem('ACTIVE_TEAM');
        const activeTeamIndexStr = localStorage.getItem('ACTIVE_TEAM_INDEX');

        let activeTeam: number | null;
        let activeTeamIndex: number | null;

        if (activeTeamStr && activeTeamIndexStr) {
          activeTeam = parseInt(activeTeamStr);
          activeTeamIndex = parseInt(activeTeamIndexStr);
        } else {
          activeTeam = null;
          activeTeamIndex = null;
        }

        const userId = parseInt(payload.userId);
        const userName = (payload.username).toString();

        const rawUserData: UserData = {
          id: userId,
          userName: userName,
          activeTeam: activeTeam,
          activeTeamIndex: activeTeamIndex,
          teams: []
        };

        const rawTeams = await getTeams(rawUserData.id);

        if (rawTeams && Array.isArray(rawTeams)) {
          for (const team of rawTeams) {
            delete team.userId;
            team.characters = await getCharactersOnTeam(team.id);
          }

          rawUserData.teams = rawTeams;
        }

        setUserData(rawUserData);
      }
    };

    fetchData();
  }, [loginToken]);

  context.userData = userData;
  context.setUserData = setUserData;

  
  context.loginToken = loginToken;
  context.setLoginToken = setLoginToken;

  return (
    <>
      <Navbar context={ context }/>
      <Outlet context={ context } />
      <Footer />
    </>
  )
}

export default App

