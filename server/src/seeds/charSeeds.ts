import { Character } from '../models/index.js';

export const seedChars = async () => { 
    await Character.bulkCreate([
                {
                  name: 'Goku',
                  anime: 'Dragon Ball Z',
                  health_points: 10000,
                  attack: 9000,
                  defense: 8500,
                  speed: 7500,
                  mana: 2000,
                  plot_armor: 10
                },
                {
                  name: 'Naruto Uzumaki',
                  anime: 'Naruto',
                  health_points: 8500,
                  attack: 7500,
                  defense: 7200,
                  speed: 6500,
                  mana: 3000,
                  plot_armor: 9
                },
                {
                  name: 'Luffy',
                  anime: 'One Piece',
                  health_points: 8000,
                  attack: 7000,
                  defense: 6500,
                  speed: 7500,
                  mana: 0,
                  plot_armor: 8
                },
                {
                  name: 'Saitama',
                  anime: 'One Punch',
                  health_points: 9999,
                  attack: 9999,
                  defense: 9999,
                  speed: 9999,
                  mana: 0,
                  plot_armor: 10
                },
                {
                  name: 'Ichigo Kurosaki',
                  anime: 'Bleach',
                  health_points: 8200,
                  attack: 7700,
                  defense: 6800,
                  speed: 7200,
                  mana: 3500,
                  plot_armor: 9
                },
                {
                  name: 'Eren Yeager',
                  anime: 'Attack on Titan',
                  health_points: 7500,
                  attack: 7000,
                  defense: 6000,
                  speed: 5500,
                  mana: 0,
                  plot_armor: 8
                },
                {
                  name: 'Edward Elric',
                  anime: 'Fullmetal Alchemist',
                  health_points: 6800,
                  attack: 6400,
                  defense: 5900,
                  speed: 6100,
                  mana: 3000,
                  plot_armor: 8
                },
                {
                  name: 'Gon Freecss',
                  anime: 'Hunter x Hunter',
                  health_points: 6700,
                  attack: 6400,
                  defense: 5500,
                  speed: 6300,
                  mana: 2500,
                  plot_armor: 7
                },
                {
                  name: 'Yusuke Urameshi',
                  anime: 'Yu Yu Hakusho',
                  health_points: 7500,
                  attack: 6800,
                  defense: 6200,
                  speed: 7000,
                  mana: 2800,
                  plot_armor: 8
                },
                {
                  name: 'Sasuke Uchiha',
                  anime: 'Naruto',
                  health_points: 8200,
                  attack: 7500,
                  defense: 6900,
                  speed: 7200,
                  mana: 3000,
                  plot_armor: 9
                },
                {
                  name: 'Levi Ackerman',
                  anime: 'Attack on Titan',
                  health_points: 7000,
                  attack: 6800,
                  defense: 6600,
                  speed: 7500,
                  mana: 0,
                  plot_armor: 8
                },
                {
                  name: 'Natsu Dragneel',
                  anime: 'Fairy Tail',
                  health_points: 8000,
                  attack: 7800,
                  defense: 6900,
                  speed: 7100,
                  mana: 3500,
                  plot_armor: 8
                },
                {
                  name: 'Jotaro Kujo',
                  anime: 'JoJos Bizarre Adventure',
                  health_points: 7500,
                  attack: 7800,
                  defense: 7400,
                  speed: 7200,
                  mana: 0,
                  plot_armor: 9
                },
                {
                  name: 'Light Yagami',
                  anime: 'Death Note',
                  health_points: 4000,
                  attack: 3000,
                  defense: 2000,
                  speed: 2500,
                  mana: 0,
                  plot_armor: 7
                },
                {
                  name: 'Killua Zoldyck',
                  anime: 'Hunter x Hunter',
                  health_points: 6500,
                  attack: 6200,
                  defense: 6000,
                  speed: 8000,
                  mana: 2500,
                  plot_armor: 8
                },
                {
                  name: 'Saber',
                  anime: 'Fate/stay night',
                  health_points: 7500,
                  attack: 7800,
                  defense: 7300,
                  speed: 7000,
                  mana: 4000,
                  plot_armor: 8
                },
                {
                  name: 'Gintoki Sakata',
                  anime: 'Gintama',
                  health_points: 7000,
                  attack: 6500,
                  defense: 6800,
                  speed: 7000,
                  mana: 0,
                  plot_armor: 9
                },
                {
                  name: 'Meliodas',
                  anime: 'The Seven Deadly Sins',
                  health_points: 8500,
                  attack: 8000,
                  defense: 7800,
                  speed: 7200,
                  mana: 3500,
                  plot_armor: 9
                },
                {
                  name: 'Kenshin Himura',
                  anime: 'Rurouni Kenshin',
                  health_points: 6900,
                  attack: 6700,
                  defense: 6400,
                  speed: 7400,
                  mana: 0,
                  plot_armor: 8
                },
                {
                  name: 'Tanjiro Kamado',
                  anime: 'Demon Slayer',
                  health_points: 6800,
                  attack: 6600,
                  defense: 6300,
                  speed: 7200,
                  mana: 1000,
                  plot_armor: 8
                },
                {
                  name: 'Shoto Todoroki',
                  anime: 'My Hero Academia',
                  health_points: 7100,
                  attack: 7000,
                  defense: 6700,
                  speed: 6500,
                  mana: 3000,
                  plot_armor: 8
                },
                {
                  name: 'Alucard',
                  anime: 'Hellsing',
                  health_points: 9999,
                  attack: 9500,
                  defense: 9000,
                  speed: 7000,
                  mana: 0,
                  plot_armor: 10
                },
                {
                  name: 'Spike Spiegel',
                  anime: 'Cowboy Bebop',
                  health_points: 6200,
                  attack: 6500,
                  defense: 6000,
                  speed: 6700,
                  mana: 0,
                  plot_armor: 7
                }
              ]  , { returning: true });     
}