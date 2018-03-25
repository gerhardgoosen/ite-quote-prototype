
drop TABLE users
/
CREATE TABLE users  (
    id          bigint(20) NOT NULL,


    first_name    varchar(255) NOT NULL,

    last_name    varchar(255) NOT NULL,

    email       varchar(255) NOT NULL,
    password    varchar(255) NOT NULL, //todo i think mysq has password type
    created     datetime    NOT NULL,
    modified    datetime    NOT NULL,
    role_id	    bigint(20) NOT NULL
    )
/