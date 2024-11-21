import Team from '../components/team';
import { UserData } from '../interfaces/UserData';
import { useOutletContext } from 'react-router-dom';

const TeamsRoom = () => {
    const context = useOutletContext<{
        loginToken: string,
        setLoginToken: (loginToken: string) => void
        userData: UserData,
        setUserData: (userData: UserData) => void
    }>();

    return (
        <div id="teamsPage">
            <div id="teamsImage"></div>
            <div id="teamsRoom">
                <h1 id="teamsRoomTitle">Locker Room</h1>
                <div id="teamsRoomDisplay">
                    <Team teamDisplay={1} context={context}/>
                </div>
            </div>
        </div>
    );
}

export default TeamsRoom;