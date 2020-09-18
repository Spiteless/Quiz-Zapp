INSERT INTO users
(username, password, email)
VALUES($1, $2, $3);

SELECT username, email FROM users
WHERE username = $1;