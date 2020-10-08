CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    score INT,
    questions INT,
    correct INT
);

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100)
);

CREATE TABLE games (
    game_id SERIAL PRIMARY KEY,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    player_count INT
);

CREATE TABLE scorecard (
    scorecard_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    game_id INT REFERENCES games(game_id),
    category_id INT REFERENCES categories(category_id),
    total_q INT,
    correct_q INT
);