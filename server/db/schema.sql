DROP DATABASE IF EXISTS characters_db;

CREATE DATABASE "characters_db";

/*\c characters_db;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    wins INT,
    losses INT,
    ties INT,
    password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS character (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    health INT,
    attack INT,
    defense INT,
    speed INT,
    mana INT,
    plot_armor INT
);

CREATE TABLE IF NOT EXISTS team (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    user_id INT REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS team_character (
    team_id INT REFERENCES team(id) ON DELETE CASCADE,
    character_id INT REFERENCES character(id) ON DELETE CASCADE,
    PRIMARY KEY (team_id, character_id)
);*/