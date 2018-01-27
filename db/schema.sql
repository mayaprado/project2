\c mars_db

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL
);

DROP TABLE IF EXISTS houses CASCADE;

CREATE TABLE houses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  image VARCHAR(255),
  address VARCHAR(255),
  description VARCHAR(255),
  price VARCHAR(255)
);

DROP TABLE IF EXISTS neighbors CASCADE;

CREATE TABLE neighbors (
  id SERIAL PRIMARY KEY,
  nei_name VARCHAR(255),
  species VARCHAR(255),
  nei_image VARCHAR(255),
  lifestyle VARCHAR(255),
  house_id INTEGER REFERENCES houses
);

DROP TABLE IF EXISTS fav_houses CASCADE;

CREATE TABLE fav_houses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users,
  house_id INTEGER REFERENCES houses
);