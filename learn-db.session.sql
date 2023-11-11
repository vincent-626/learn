-- @block
CREATE TABLE Users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    university VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    isTutor BOOLEAN NOT NULL DEFAULT FALSE
    isLearner BOOLEAN NOT NULL DEFAULT FALSE
    photo VARCHAR(255) NOT NULL DEFAULT 'default.png';
);

-- @block
CREATE TABLE Learners(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    topic VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    rate INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- @block
CREATE TABLE Tutors(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    skills VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    rate INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- @block
SELECT * FROM Users;

-- @block
SELECT * FROM Learners;

-- @block
SELECT * FROM Tutors;