//import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Battle from '../components/battle';

import { UserData } from '../interfaces/UserData';

const BattleRoom = () => {
    /*const [battleComponent, setBattleComponent] = useState<JSX.Element | null>(null);

    useEffect(() => {
        const fetchBattleComponent = async () => {
            const component = await Battle();
            setBattleComponent(component);
        };
        fetchBattleComponent();
    }, []);*/
    const context = useOutletContext<{
        loginToken: string,
        setLoginToken: (loginToken: string) => void
        userData: UserData,
        setUserData: (userData: UserData) => void
    }>();

    return (
        <div id="battlePage">
            <div id="battleImage"></div>
            <div id="battleRoom">
                <h1 id="battleRoomTitle">Battle Room</h1>
                <Battle context={context}/>
            </div>
        </div>
    );
}

export default BattleRoom;