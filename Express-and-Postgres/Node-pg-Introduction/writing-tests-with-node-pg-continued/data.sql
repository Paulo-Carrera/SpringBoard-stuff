-- Connect to a different database first
\c postgres;

-- Drop the database if it exists
DROP DATABASE IF EXISTS usersdb;

-- Create the database
CREATE DATABASE usersdb;

-- Connect to the newly created database
\c usersdb;

-- Drop the table if it exists
DROP TABLE IF EXISTS users;

-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL 
);

-- Insert records into the users table
INSERT INTO users (name, type) VALUES ('Juanita', 'admin');
INSERT INTO users (name, type) VALUES ('Jenny', 'staff');
INSERT INTO users (name, type) VALUES ('Jeff', 'user');
INSERT INTO users (name, type) VALUES ('Jasmine', 'user');
INSERT INTO users (name, type) VALUES ('James', 'staff');
INSERT INTO users (name, type) VALUES ('Jaimee', 'admin');
