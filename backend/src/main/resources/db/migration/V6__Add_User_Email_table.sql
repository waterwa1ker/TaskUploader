CREATE TABLE user_email (
    token varchar primary key,
    user_id varchar references users(id)
);