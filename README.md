# Anime Team Builder  

Anime Team Builder is a web application where users can assemble a team of anime characters and engage them in battles. 
The project leverages modern web development tools and is designed for seamless deployment on Render.  

## Features  
- **Character Selection**: Choose your favorite anime characters to form your team.  
- **Team Battles**: Engage in simulated battles between teams.  
- **Customizable Teams**: Strategize and customize your team for the best performance.  

## Tech Stack  
- **Frontend**: Built with [Vite](https://vitejs.dev/) for a fast and modern development experience.  
- **Backend**: Powered by [Node.js](https://nodejs.org/).  
- **Database**: Managed using [Sequelize ORM](https://sequelize.org/).  
- **Deployment**: Hosted on [Render](https://render.com/).  
- **Package Manager**: Managed with [npm](https://www.npmjs.com/).  

## Getting Started  

### Prerequisites  
- [Node.js](https://nodejs.org/) (v16 or later)  
- [npm](https://www.npmjs.com/)  

### Installation  

1. Clone the repository:  
   [Github Repo](https://github.com/harrisbunn/Shonen-Showdown)
   ```bash  
   git clone https://github.com/harrisbunn/Shonen-Showdown.git
   cd anime-team-builder  

2. Install dependencies:
* npm install  

3. Set up database
* Configure your database settings in .env.

4. Start the development server:
* npm run dev  
* Access the app at http://localhost:3001

### Deployment
The app is deployed on Render. To deploy your version:

* Push your changes to the main branch of your GitHub repository.
* Connect the repository to your Render account.
* Set up your environment variables for the database and other configurations.
* Deploy the app through the Render dashboard.

* Current Deployment
[Deployed on Render](https://shonen-showdown.onrender.com/)

### Contributing
Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request.





























This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
