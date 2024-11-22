import sequelize from "../config/connection.js";
import { seedChars } from "./charSeeds.js";
import { seedUsers } from "./userSeeds.js";
import { seedTeams } from "./teamSeeds.js";

const seedAll = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('\n----- DATABASE SYNCED -----\n');
        
        await seedChars();
        console.log('\n----- CHARACTERS SEEDED -----\n');

        await seedUsers();
        console.log('\n----- USERS SEEDED -----\n');
   
        await seedTeams();
        console.log('\n----- TEAMS SEEDED -----\n');
        
        process.exit(0);
      } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
      }
};

seedAll();
