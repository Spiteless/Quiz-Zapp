INSERT INTO users
(username, password, email, score, questions, correct)
VALUES($1, $2, $3, 0, 0, 0);

SELECT username, email FROM users
WHERE username = $1;