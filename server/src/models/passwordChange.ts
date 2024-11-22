import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index.js';
import { Users } from './userModel.js';

export class PasswordChange extends Model {
  public id!: number;
  public userId!: number;
  public password!: string;
}

PasswordChange.init(
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'password_changes',
    sequelize,
  }
);

PasswordChange.belongsTo(Users, {
  foreignKey: 'userId',
});

// Update user password function
export async function findByIdAndUpdate(
  userId: number,
  update: { password: string }
): Promise<Users | null> {
  const user = await Users.findByPk(userId);

  if (user) {
    await user.update(update);
    return user.reload(); 
  }

  return null; 
}
