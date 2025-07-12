DELETE FROM users;

INSERT INTO users (id, username, password, role, email)
VALUES
    (gen_random_uuid()::varchar, 'user', '$2a$10$VSN8iJowORCnQW8Ept5iSe.0RYTx4su6QL3VADi/OiTFGJ8MY1kM2', 'USER', 'user@mail.ru'),
    (gen_random_uuid()::varchar, 'admin', '$2a$10$WzqFLT./I35AbkZUB5gicuHH913BnFbhQAE4qN.gDM4jL7GatEiY6', 'ADMIN', 'admin@mail.ru');