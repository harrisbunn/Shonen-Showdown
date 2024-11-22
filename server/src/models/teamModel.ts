import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { Character } from './characterModel.js'; // Import the Character model

// Define the attributes interface
interface TeamAttributes {
    id: number;
    userId: number;
    name: string;
}

// Define creation attributes interface, making 'id' optional for creation
interface TeamCreationAttributes extends Optional<TeamAttributes, 'id'> {}

// Teams model class
export class Teams extends Model<TeamAttributes, TeamCreationAttributes> 
    implements TeamAttributes {
    public id!: number;
    public userId!: number;
    public name!: string;

    public addCharacters!: (characters: Character) => Promise<void>;
    public removeCharacter!: (characters: Character) => Promise<void>; // singular
}

// Factory function for initializing the Teams model
export function TeamFactory(sequelize: Sequelize): typeof Teams {
  Teams.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
      tableName: 'teams',
      sequelize,
      timestamps: false,
      name: {
        singular: 'team',
        plural: 'teams'
      }
    }
  );

  return Teams;
}