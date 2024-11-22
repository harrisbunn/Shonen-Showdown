import sequelize from '../config/connection.js';
import { CharacterFactory } from './characterModel.js';
import { UserFactory } from './userModel.js';
import { TeamFactory } from './teamModel.js';
import { TeamCharactersFactory } from './teamCharactersModel.js';

const Character = CharacterFactory(sequelize);
const User = UserFactory(sequelize);
const Team = TeamFactory(sequelize);
const TeamCharacters = TeamCharactersFactory(sequelize);

// define many-to-many relationship
Team.belongsToMany(Character, { through: TeamCharacters });
Character.belongsToMany(Team, { through: TeamCharacters });

Character.hasMany(TeamCharacters, { foreignKey: 'characterId' });

Team.belongsTo(User, { foreignKey: 'userId' }); // Team has a userId foreign key
User.hasMany(Team, { foreignKey: 'userId' }); // User can have many teams

export { sequelize, Character, User, Team, TeamCharacters };