import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

// Define the attributes interface
interface UserAttributes {
    id: number;
    username: string;
    win: number;
    loss: number;
    tie: number;
    password: string;
}

// Define creation attributes interface, making 'id' optional for creation
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Users model class
export class Users extends Model<UserAttributes, UserCreationAttributes> 
    implements UserAttributes {
    public id!: number;
    public username!: string;
    public win!: number;
    public loss!: number;
    public tie!: number;
    public password!: string;
}

// Factory function for initializing the Users model
export function UserFactory(sequelize: Sequelize): typeof Users {
  Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        win: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        loss: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tie: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
      tableName: 'users',
      sequelize,
    });

  return Users;
}
