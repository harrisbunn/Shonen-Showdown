import { Router } from 'express';
import type { Request, Response } from 'express';
import { Team, Character } from '../../models/index.js';
const router = Router();


// create team with name and userId (/api/team)
router.post('/', async (req: Request, res: Response) => {
    try {
        const team = await Team.create({
        name: req.body.name,
        userId: req.body.userId
        });
        return res.status(201).json(team);
    } catch (err) {
        return res.status(400).json(err);
    }
});

// get all characters (/api/team/characters)
router.get('/characters', async (_req: Request, res: Response) => {
    try {
        const characters = await Character.findAll();
        if (!characters) {
          throw new Error('characters not found');
        }
        console.log(`Successfully got all characters.`);
        //return res.status(200).json(characters);
        res.status(200).json(characters);
        return characters;
    } catch (err) {
        return res.status(400).json(err);
    }
});


// delete team by ID (/api/team/:teamId)
router.delete('/:teamId', async (req: Request, res: Response) => {
    try {
        const team = await Team.findByPk(req.params.teamId);
        if (!team) {
          throw new Error('Team not found');
        }
        // delete team
        await team.destroy();
        console.log(`Successfully deleted team with ID ${req.body.teamId}.`);
        res.status(201).json(team);
    } catch (err) {
        console.log(res.status(400).json(err));
    }
});

// delete character by ID (/api/team/character/:characterId)
router.delete('/character/:characterId', async (req: Request, res: Response) => {
    try {
        const character = await Character.findByPk(req.params.characterId);
        if (!character) {
          throw new Error('Character not found');
        }
        // delete character
        await character.destroy();
        console.log(`Successfully deleted character with ID ${req.body.characterId}.`);
        res.status(201).json(character);
    } catch (err) {
        res.status(400).json(err);
    }
});


// add character to team  (/api/team/:teamId/character/:characterId)
router.post('/:teamId/character/:characterId', async (req: Request, res: Response) => {
    try {
        // Find team by ID
        const team = await Team.findByPk(req.params.teamId);

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
   
        // Find character by ID
        const character = await Character.findByPk(req.params.characterId);

        if (!character) {
            return res.status(404).json({ message: 'Character not found' });
        }
   
        // Add character to team
        await team.addCharacters(character); // `addCharacter` if singular in your relationship
   
        console.log(`Successfully added character with ID ${character.id} to the team.`);
        return res.status(201).json(character);
    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({ error: err.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
});


// get all teams or get teams associated to userId (/api/team)
router.get('/', async (req: Request, res: Response) => {
    try {
        const userId = req.query.userId as string | undefined;
        if (!userId) {
            const teams = await Team.findAll();
            return res.status(200).json(teams);
        } else {
            const userTeams = await Team.findAll({ where: { userId } });
            return res.status(200).json(userTeams);
        }
    } catch (err) {
        return res.status(400).json(err);
    }
});


// get team by ID (/api/team/:teamId)
router.get('/:teamId', async (req: Request, res: Response) => {
    try {
        const team = await Team.findByPk(req.params.teamId);
        if (!team) {
            return res.status(200).json({});
        }
        return res.status(200).json(team);
    } catch (err) {
        return res.status(400).json(err);
    }
});

export { router as teamRouter };