DROP TABLE IF EXISTS users;

CREATE TABLE users(
  id varchar primary key,
  username varchar not null unique,
  password varchar not null,
  role char(20) not null,
  email varchar unique,
  created_at timestamp DEFAULT current_timestamp
);

CREATE INDEX idx_users_username ON users(username);

INSERT INTO users (id, username, password, role, email)
VALUES
    (gen_random_uuid()::varchar, 'user', 'user', 'USER', 'user@mail.ru'),
    (gen_random_uuid()::varchar, 'admin', 'admin', 'ADMIN', 'admin@mail.ru');