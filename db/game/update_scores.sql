UPDATE users
SET questions = questions + $3,
    correct = correct + $4,
    score = score + $2
WHERE user_id = $1