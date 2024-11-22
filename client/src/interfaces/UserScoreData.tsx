export interface UserScoreData {
    wins: number;
    losses: number;
    ties: number;
    gamesPlayed?: number;
    winRate?: number;
    curWinStreak?: number;
    bigWinStreak?: number;
    bigLoseStreak?: number;
}