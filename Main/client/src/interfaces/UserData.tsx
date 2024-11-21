import {TeamData} from './TeamData';

export interface UserData {
    userName: string;
    id: number;
    activeTeam: number | null;
    activeTeamIndex: number | null;
    teams: TeamData[];
}