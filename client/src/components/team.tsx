import Character from './character';
import { UserData } from '../interfaces/UserData';
import { TeamData } from '../interfaces/TeamData';
import { CharacterData } from '../interfaces/CharacterData';
import { useState, useEffect } from 'react';

type TeamProps = {
    teamDisplay: number;
    enemyTeam?: TeamData;
    context: {
        loginToken: string,
        setLoginToken: (loginToken: string) => void,
        userData: UserData,
        setUserData?: (userData: UserData) => void
    }
}

const getObjectById = (obj: TeamData[], id: number): Promise<TeamData | null> => {
    for (const team of obj) {
        if (team.id === id) {
            return Promise.resolve(team);
        }
    }
    return Promise.resolve(null);
}

//////////////////////////////////////////////
//------------Get All Characters------------//
//////////////////////////////////////////////
const getAllCharacters = async () => {
    const response = await fetch('/api/team/characters/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.status === 200) {
        const characters = await response.json();
        return characters;
    } else {
        return [];
    }
}

//////////////////////////////////////////////
//------------Add Character-----------------//
//////////////////////////////////////////////
const addCharacter = async (teamId: number, characterId: number) => {
    const response = await fetch(`/api/team/${teamId}/character/${characterId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.status === 201) {
        const character = await response.json();
        return character;
    } else {
        return response.json();
    }
}

//////////////////////////////////////////////
//----------------Add Team------------------//
//////////////////////////////////////////////
const addTeam = async (userId:number) => {
    const teamNameInput = document.getElementById('teamNameTBStats') as HTMLInputElement;

    const addTeamSpan = document.getElementById('addTeamSpanStats') as HTMLSpanElement;

    if (teamNameInput.value) {
        addTeamSpan.innerHTML = '';

        const response = await fetch('/api/team/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: teamNameInput.value,
                userId: userId.toString()
            })
        });

        if (response.status === 201) {
            const newTeam = await response.json();
            return newTeam;
        }
    } else {
        addTeamSpan.innerHTML = 'Please enter a team name';
    }
}

//////////////////////////////////////////////
//----------------Delete Team---------------//
//////////////////////////////////////////////
const deleteTeam = async (teamId: number) => {
    const response = await fetch(`/api/team/${teamId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.status === 200) {
        const teamSelect = document.getElementById('teamSelect') as HTMLSelectElement;
        teamSelect.options.remove(teamSelect.selectedIndex);
    }
}

const Team = (props:TeamProps) => {
    const [noTeam, setNoTeam] = useState(true);
    const [teamLength, setTeamLength] = useState(0);
    const [allCharacters, setAllCharacters] = useState<CharacterData[]>([]);

    const characterOptions:JSX.Element[] = [];
    useEffect(() => {
        getAllCharacters().then(characters => {
            setAllCharacters(characters)
        });
    }, []);
    
    const [team, setTeam] = useState<TeamData | null>(null);
  
    const components:JSX.Element[] = [];
    useEffect(() => {
        if (props.context.userData.teams) {
            if (props.context.userData.teams.length > 0) {
                setNoTeam(false);
            }
            if (props.context.userData.activeTeamIndex) {
                setTeam(props.context.userData.teams[props.context.userData.activeTeamIndex]);
            }
            if (props?.context?.userData?.activeTeamIndex && props?.context?.userData?.teams) {
                if (props?.context?.userData?.activeTeamIndex > -1) {
                    if (props?.context?.userData?.teams[props?.context?.userData?.activeTeamIndex]?.characters) {
                        setTeamLength(props.context.userData.teams[props.context.userData.activeTeamIndex].characters.length);
                    } 
                }
            }
        }
    }, [props.context.userData, props.enemyTeam]);

    console.log(teamLength);
    console.log(team);
    
    if (props.context.userData.teams && props.context.userData.activeTeamIndex !== null) {
        if (props.enemyTeam && props.enemyTeam.characters) {
            for (let i = 0; i < props.enemyTeam.characters.length; i++) {
                components.push(<Character statsDisplay={1} character={props.enemyTeam.characters[i]}/>);
            }
        } else {
            if (team !== null) {
                if (team && team.characters) {
                    for (let i = 0; i < team.characters.length; i++) {
                        components.push(<Character statsDisplay={props.teamDisplay === 1 ? 1 : 0} character={team.characters[i]} teamId={team.id}/>);
                    }
                }
            }
        }
    }

    if (props.teamDisplay == 1) {
        const teamOptions = [];

        if (team && team.characters && team.characters.length < 5) {
            if (Array.isArray(allCharacters)) {
                if (allCharacters.length > 0) {
                    for (let i = 0; i < allCharacters.length; i++) {
                        characterOptions.push(<option value={allCharacters[i].name}>{allCharacters[i].name}</option>);
                    }
                }
            }
        }

        if (props.context.userData.teams) {
            if (props.context.userData.teams.length > 0) {
                for (let i = 0; i < props.context.userData.teams.length; i++) {
                    teamOptions.push(<option value={props.context.userData.teams[i].name}>{props.context.userData.teams[i].name}</option>);
                }
            }
        }

        return (
            <div className="teamDisplayStats">
                <form className="addTeamContainerStats">
                    <input type="text" id="teamNameTBStats" placeholder="Team Name"/>
                    <input type="button" value="+ Team" id="addTeamStats" onClick={() => {
                        addTeam(props.context.userData.id).then(newTeam => {
                            if (props.context.setUserData) {
                                localStorage.setItem('ACTIVE_TEAM', newTeam.id.toString());
                                localStorage.setItem('ACTIVE_TEAM_INDEX', props.context.userData.teams.length.toString());
                                props.context.setUserData({ ...props.context.userData, teams: [...props.context.userData.teams, newTeam], activeTeam: newTeam.id, activeTeamIndex: props.context.userData.teams.length });
                            }
                            setNoTeam(false);
                            newTeam.characters = [];
                            setTeam(newTeam);
                        });
                    }}/>
                    <span id="addTeamSpanStats"></span>
                </form>
                <div className="teamNameContainerStats">
                    {!noTeam && <select className="teamNameStats" name="teamSelect" id="teamSelect" onChange={() => {
                        const teamSelect = document.getElementById('teamSelect') as HTMLSelectElement;
                        const selectedIndex = teamSelect.selectedIndex;
                        if (props.context.userData.teams) {
                            getObjectById(props.context.userData.teams, selectedIndex).then(selectedTeam => {
                                if (selectedTeam) {
                                    if (props.context.setUserData) {
                                        props.context.setUserData({ ...props.context.userData, activeTeam: selectedTeam.id });
                                        setTeam(selectedTeam);
                                    }
                                }
                            });
                        }
                    }}>
                        {teamOptions}
                    </select>}
                    {!noTeam && <input type="button" value="- Team" id="deleteTeam" onClick={() => {
                        const teamSelect = document.getElementById('teamSelect') as HTMLSelectElement;
                        const selectedIndex = teamSelect.selectedIndex;
                        if (props.context.userData.teams) {
                            deleteTeam(props.context.userData.teams[selectedIndex].id).then(() => {
                                if (teamSelect.options.length > 1) {
                                    let newIndex: number;
                                    if (selectedIndex > 0) {
                                        newIndex = selectedIndex - 1;
                                    } else {
                                        newIndex = selectedIndex + 1;
                                    }
                                    if (props.context.setUserData) {
                                        teamSelect.options.remove(selectedIndex);
                                        props.context.setUserData({ ...props.context.userData, activeTeam: props.context.userData.teams[newIndex].id });
                                    }
                                } else {
                                    if (props.context.setUserData) {
                                        teamSelect.remove();
                                        const deleteTeamButton = document.getElementById('deleteTeam') as HTMLInputElement;
                                        deleteTeamButton.remove();
                                        props.context.setUserData({ ...props.context.userData, activeTeam: null });
                                        setNoTeam(true);
                                    }
                                }
                            });
                        }
                    }}/>}
                </div>
                <div className="teamStats">
                    {components}
                    {(teamLength<5) && !noTeam && <select id="addCharacterSelect" name="addCharacterSelect" className="addCharacterSelect">
                            {characterOptions}
                    </select>}
                    {(teamLength<5) && !noTeam && <input type="button" value="+ Character" id="addCharacter" onClick={() => {
                        if (team) {
                            const characterSelect = document.getElementById('addCharacterSelect') as HTMLSelectElement;
                            const characterIndex = characterSelect.selectedIndex;
                            addCharacter(team.id,allCharacters[characterIndex].id).then(newCharacter => {
                                if (props.context.userData.activeTeamIndex !== null && props.context.setUserData) {
                                    const updatedTeams = [...props.context.userData.teams];
                                    updatedTeams[props.context.userData.activeTeamIndex].characters.push(newCharacter);
                                    props.context.setUserData({ ...props.context.userData, teams: updatedTeams });
                                }
                            });
                        }
                    }}/>}
                </div>
            </div>
        );
    } else {
        return (
            <div className="teamDisplayNoStats">
                {props.enemyTeam && <h3 className="teamNameNoStats" style={{textAlign: "right", marginRight: 10}}>{props.enemyTeam.name}</h3>}
                {!props.enemyTeam && team && <h3 className="teamNameNoStats" style={{textAlign: "left", marginLeft: 10}}>{team.name}</h3>}
                {components}
            </div>
        );
    }
}

export default Team;