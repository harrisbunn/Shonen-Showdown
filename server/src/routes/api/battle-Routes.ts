import { Router } from 'express';
import type { Request, Response } from 'express';
import { Team, Character, User } from '../../models/index.js';
import type { Character as CharacterInstance } from '../../models/characterModel.js'; // import the type "Character"

const router = Router();

// get characters on a team
const getTeamCharacters = async (teamId: string) => {
    return await Character.findAll({
        include: [
            {
                model: Team,
                where: { id: teamId },
                through: { attributes: [] },
            },
        ], 
    });
};

// get all characters on team (GET /api/battle/:teamid/characters)
router.get('/:teamid/characters', async (req: Request, res: Response) => {
    try {
        const characters = await getTeamCharacters(req.params.teamid);
        if (!characters) {
            throw new Error('characters not found');
        }
        console.log(`Successfully got characters on the team.`);
        res.status(201).json(characters);
    } catch (err) {
        res.status(400).json(err);
    }
});


// simulate battle between two teams
const simulateBattle = async (team1: CharacterInstance[], team2: CharacterInstance[], team1Points: number, team2Points: number) => {
    const minLength = Math.min(team1.length, team2.length);

    for (let i = 0; i < minLength; i++) {
        if (team1[i].attack > team2[i].attack) {
            team1Points++;
        } else if (team1[i].attack < team2[i].attack) {
            team2Points++;
        }
    }

    let result = 'tie';
    if (team1Points > team2Points) {
        result = 'win';
    } else if (team1Points < team2Points) {
        result = 'loss';
    }

    return { result, team1Points, team2Points }; // return points for both teams
};

// POST /battling - Simulate a battle between two teams
router.post('/battling', async (req: Request, res: Response) => {
    try {
        const { team1Id, team2Id } = req.body;

        if (!team1Id || !team2Id) {
            return res.status(400).json({ message: 'Both team1Id and team2Id are required.' });
        }

        // fetch chars for both teams
        const team1characters = await getTeamCharacters(team1Id);
        const team2characters = await getTeamCharacters(team2Id);

        if (team1characters.length === 0 || team2characters.length === 0) {
            return res.status(404).json({ message: 'One or both teams not found or have no characters.' });
        }

        let t1points = 0; // initialize points for team 1
        let t2points = 0; // initialize points for team 2

        const { result, team1Points, team2Points } = await simulateBattle(team1characters, team2characters, t1points, t2points);

        const team1User = await User.findOne({ where: { id: team1Id } });
        const team2User = await User.findOne({ where: { id: team2Id } });

        if (team1User && team2User) {
            // Update the win/loss/tie records based on the result
            if (result === 'win') {
                await team1User.update({ win: team1User.win + 1 });
                await team2User.update({ loss: team2User.loss + 1 });
            } else if (result === 'loss') {
                await team1User.update({ loss: team1User.loss + 1 });
                await team2User.update({ win: team2User.win + 1 });
            } else {
                await team1User.update({ tie: team1User.tie + 1 });
                await team2User.update({ tie: team2User.tie + 1 });
            }
        }

        // return points for both teams, send back to client
        return res.status(200).json({
            team1Points: team1Points,
            team2Points: team2Points,
            result: result,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export { router as battleRouter };