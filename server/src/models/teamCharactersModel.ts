import { DataTypes, Sequelize, Model} from 'sequelize';

// Define the attributes interface
interface TeamCharactersAttributes {
    characterId: number;
}

// Teams model class
export class TeamCharacters extends Model<TeamCharactersAttributes> 
    implements TeamCharactersAttributes {
    public characterId!: number;
}

export function TeamCharactersFactory(sequelize: Sequelize): typeof TeamCharacters {
    TeamCharacters.init(
      {
        characterId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
      },
      {
        tableName: 'team_characters',
        sequelize,
        timestamps: false
      }
    );
  
    return TeamCharacters;
  }
  