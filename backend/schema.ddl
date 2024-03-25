CREATE SCHEMA IF NOT EXISTS edu_connect;
SET SEARCH_PATH TO edu_connect;

CREATE TABLE IF NOT EXISTS edu_user (
    id serial NOT NULL,
    username text NOT NULL UNIQUE,
    email text NOT NULL,
    password text NOT NULL,
    picture text NOT NULL DEFAULT 'static/__default_pic.jpg',
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS edu_group (
    id serial NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    owner integer NOT NULL REFERENCES edu_user(id),
    creation_date timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    picture text NOT NULL DEFAULT 'static/__default_pic.jpg',
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS group_rating (
    rater integer NOT NULL REFERENCES edu_user(id),
    group_id integer NOT NULL REFERENCES edu_group(id),
    rating integer NOT NULL,
    PRIMARY KEY(rater, group_id)
);

CREATE TABLE IF NOT EXISTS announcement (
    id serial NOT NULL,
    poster_id integer NOT NULL REFERENCES edu_user(id),
    group_id integer NOT NULL REFERENCES edu_group(id),
    message text NOT NULL,
    date timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS group_member (
    group_id integer NOT NULL REFERENCES edu_group(id),
    member_id integer NOT NULL REFERENCES edu_user(id),
    join_date timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(group_id, member_id)
);

CREATE TABLE IF NOT EXISTS event (
    id serial NOT NULL,
    group_id integer NOT NULL REFERENCES edu_group(id),
    creator_id integer NOT NULL REFERENCES edu_user(id),
    event_date timestamptz NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS event_attend (
    event_id integer NOT NULL REFERENCES event(id),
    member_id integer NOT NULL REFERENCES edu_user(id),
    PRIMARY KEY(event_id, member_id)
);

CREATE TABLE IF NOT EXISTS group_chat (
    id serial NOT NULL,
    content text NOT NULL,
    sender_id integer NOT NULL REFERENCES edu_user(id),
    group_id integer NOT NULL REFERENCES edu_group(id),
    creation_date timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS personal_rooms (
    id serial NOT NULL UNIQUE,
    user_1 integer NOT NULL REFERENCES edu_user(id),
    user_2 integer NOT NULL REFERENCES edu_user(id),
    PRIMARY KEY (user_1, user_2)
);

CREATE TABLE IF NOT EXISTS personal_chat (
    id serial NOT NULL,
    room_id integer NOT NULL REFERENCES personal_rooms(id),
    sender_id integer NOT NULL REFERENCES edu_user(id),
    receiver_id integer NOT NULL REFERENCES edu_user(id),
    content text NOT NULL,
    creation_date timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS announcement_comments (
    id serial NOT NULL,
    announcement_id integer NOT NULL REFERENCES announcement(id),
    commenter_id integer NOT NULL REFERENCES edu_user(id),
    content text NOT NULL,
    date timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS announcement_upvotes (
    announcement integer NOT NULL REFERENCES announcement(id),
    voter integer NOT NULL REFERENCES edu_user(id),
    PRIMARY KEY(announcement, voter)
);

CREATE TABLE IF NOT EXISTS announcement_downvotes (
    announcement integer NOT NULL REFERENCES announcement(id),
    voter integer NOT NULL REFERENCES edu_user(id),
    PRIMARY KEY(announcement, voter)
);