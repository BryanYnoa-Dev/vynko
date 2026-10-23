Create table users(
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    display_name VARCHAR(80) NOT NULL,
    bio TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);




create table posts(
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
user_id BIGINT NOT NULL,
content TEXT NOT NULL,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),


CONSTRAINT fk_posts_user
FOREIGN KEY (user_id)
REFERENCES users(id)
);