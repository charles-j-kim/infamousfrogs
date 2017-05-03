DROP DATABASE IF EXISTS test;

CREATE DATABASE test;

USE test;

CREATE TABLE users (
  id SERIAL,
  username VARCHAR(50) NOT NULL,
  user_ig_id VARCHAR(50) NOT NULL,
  profile_url VARCHAR(250),
  PRIMARY KEY (id),
  UNIQUE (username)
);


CREATE TABLE recipes (
  id SERIAL,
  recipe_name VARCHAR(100),
  link VARCHAR(250),
  user_id INT,
  PRIMARY KEY (id),
  UNIQUE (photo_id)
);

-- test cases
INSERT INTO users (username, user_ig_id, profile_url) VALUES ('charles_kim', '123345g', 'http://www.google.com');

