import Team from './team';
import { TeamData } from '../interfaces/TeamData';
import { UserData } from '../interfaces/UserData';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type BattleProps = {
    context: {
        loginToken: string,
        setLoginToken: (loginToken: string) => void,
        userData: UserData,
        setUserData?: (userData: UserData) => void
    }
}

/*const getObjectById = (obj: TeamData[], id: number) => {
    for (const team of obj) {
        if (team.id === id) {
            return team;
        }
    }
    return null;
}*/

///////////////////////////////////////////////////////
//----------------Pull Enemy Teams-------------------//
///////////////////////////////////////////////////////
const pullEnemyTeams = async (): Promise<TeamData> => {
    // Fetch teams from database
    const response = await fetch('/api/team/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.status === 200) {
        const teams = await response.json();
        const selectedTeam:TeamData = teams[Math.floor(Math.random()*teams.length)];
        return(selectedTeam);
    } else {
        const selectedTeam:TeamData = {
            id: 0,
            name: "Null",
            characters: [
                {id:1, name: "Null", health: 100, attack: 10, defense: 5, speed: 5, mana: 5, plotArmor: 0},
                {id:2, name: "Null", health: 100, attack: 10, defense: 5, speed: 5, mana: 5, plotArmor: 0},
                {id:3, name: "Null", health: 100, attack: 10, defense: 5, speed: 5, mana: 5, plotArmor: 0},
                {id:4, name: "Null", health: 100, attack: 10, defense: 5, speed: 5, mana: 5, plotArmor: 0},
                {id:5, name: "Null", health: 100, attack: 10, defense: 5, speed: 5, mana: 5, plotArmor: 0}
            ]
        }
        return(selectedTeam);
    }
}

///////////////////////////////////////////////////////
//----------------Run Battle-------------------------//
///////////////////////////////////////////////////////
const runBattle = async (enemyTeamId:number, myTeamId:number) => {
    const vsSpan = document.getElementById('battleVSContainerSpan');

    if (vsSpan) {vsSpan.innerHTML = '';}

    const response = await fetch('/api/battle/battling', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            team1Id: myTeamId,
            team2Id: enemyTeamId
        })
    });

    if (response.status === 200) {
        const { team1Points, team2Points } = await response.json();
        if (team1Points > team2Points) {
            if(vsSpan) {vsSpan.innerHTML = 'VICTORY!';}
        } else if (team1Points < team2Points) {
            if(vsSpan) {vsSpan.innerHTML = 'DEFEAT!';}
        } else {
            if(vsSpan) {vsSpan.innerHTML = 'TIE!';}
        }
    } else {
        if(vsSpan) {vsSpan.innerHTML = '';}
        return 'error';
    }
}

///////////////////////////////////////////////////////
//----------------Battle Component-------------------//
///////////////////////////////////////////////////////
const Battle = (props: BattleProps) => {
    const { userData } = props.context;

    const [enemyTeam, setEnemyTeam] = useState<TeamData>({
        id: 0,
        name: "Null",
        characters: [
            {id:1, name: "Null", health: 100, attack: 10, defense: 5, speed: 5, mana: 5, plotArmor: 0},
            {id:2, name: "Null", health: 100, attack: 10, defense: 5, speed: 5, mana: 5, plotArmor: 0},
            {id:3, name: "Null", health: 100, attack: 10, defense: 5, speed: 5, mana: 5, plotArmor: 0},
            {id:4, name: "Null", health: 100, attack: 10, defense: 5, speed: 5, mana: 5, plotArmor: 0},
            {id:5, name: "Null", health: 100, attack: 10, defense: 5, speed: 5, mana: 5, plotArmor: 0}
        ]
    });

    
    let myTeam: TeamData | null = null;
    if (props.context.userData.activeTeamIndex!==null) {
        myTeam = props.context.userData.teams[props.context.userData.activeTeamIndex];
    }

    useEffect(() => {
        pullEnemyTeams().then((newEnemyTeam) => {
            setEnemyTeam (newEnemyTeam);
        });
    }, []);

    if (userData.teams && myTeam && myTeam.characters && myTeam.characters.length > 0) {
        return (
            <div id="battle">
                <h1 id="battleTitle" onClick={async () => {
                            if (props.context.userData.activeTeam) {
                                runBattle(enemyTeam.id, props.context.userData.activeTeam).then((results) => {
                                    const vsSpan = document.getElementById('battleVSContainerSpan');
                                    if (vsSpan && typeof results === 'string') {

                                        const className: any = results.toUpperCase();

                                        vsSpan.innerHTML = results.toUpperCase();
                                        
                                        if (className === 'VICTORY!') {
                                            vsSpan.style.color = 'gold';
                                        } else if (className === 'DEFEAT!') {
                                            vsSpan.style.color = 'red';

                                        } else if (className === 'TIE!') {
                                            vsSpan.style.color = 'White';
                                        }
                                    
                                    }
                                    pullEnemyTeams(). then((newEnemyTeam) => {
                                        setEnemyTeam (newEnemyTeam);
                                    });
                                });
                            }
                        }}>Battle</h1>
                <div id="battleDisplay">
                    <Team teamDisplay={0} context={props.context}/>
                    <div id="battleVSContainer">
                        <span id="battleVSContainerSpan"></span>
                        <h1 id="battleVS">VS</h1>
                    </div>
                    <Team teamDisplay={0} enemyTeam={enemyTeam} context={props.context}/>
                </div>
            </div>
        );
    } else {
        return (
            <div id="battleNoTeam">
                <h1 id="battleTitleNoTeam">
                    Please build a team in the 
                    <Link to="/teamsRoom" aria-label="Go to Locker Room">Locker Room</Link>
                    !
                </h1>
            </div>
        );
    }
}

export default Battle;