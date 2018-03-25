
CREATE DATABASE `quoteapp`
/

GRANT USAGE ON *.* TO `ite_user`@'%' IDENTIFIED BY 'easy0n3'
/
GRANT DELETE ON quoteapp.* TO `ite_user`@'%'
/
GRANT INDEX ON quoteapp.* TO `ite_user`@'%'
/
GRANT SELECT ON quoteapp.* TO `ite_user`@'%'
/
GRANT CREATE ROUTINE ON quoteapp.* TO `ite_user`@'%'
/
GRANT CREATE ON quoteapp.* TO `ite_user`@'%'
/
GRANT ALTER ON quoteapp.* TO `ite_user`@'%'
/
GRANT CREATE VIEW ON quoteapp.* TO `ite_user`@'%'
/
GRANT DROP ON quoteapp.* TO `ite_user`@'%'
/
GRANT ALTER ROUTINE ON quoteapp.* TO `ite_user`@'%'
/
GRANT LOCK TABLES ON quoteapp.* TO `ite_user`@'%'
/
GRANT CREATE TEMPORARY TABLES ON quoteapp.* TO `ite_user`@'%'
/
GRANT SHOW VIEW ON quoteapp.* TO `ite_user`@'%'
/
GRANT UPDATE ON quoteapp.* TO `ite_user`@'%'
/
GRANT REFERENCES ON quoteapp.* TO `ite_user`@'%'
/
GRANT INSERT ON quoteapp.* TO `ite_user`@'%'
/




drop TABLE users
/
CREATE TABLE users  (
    id          bigint(20) NOT NULL AUTO_INCREMENT,
    first_name    varchar(255) NOT NULL,
    last_name    varchar(255) NOT NULL,
    username    varchar(255) NOT NULL,
    password    varchar(255) NOT NULL, //storing bcrypt hashed value
    created     datetime    NOT NULL,
    modified    datetime    NOT NULL,
    role_id	    bigint(20) NOT NULL,
    PRIMARY KEY(id)
)
/



drop TABLE roles
/
CREATE TABLE roles  (
    id  	bigint(20) NOT NULL AUTO_INCREMENT,
    app_role	varchar(25) NOT NULL,
    PRIMARY KEY(id)
    )
/



drop TABLE functions
/
CREATE TABLE functions  (
    id      	bigint(20) NOT NULL AUTO_INCREMENT,
    app_function	varchar(100) NULL,
    PRIMARY KEY(id)
    )
/

drop TABLE role_functions
/

CREATE TABLE role_functions  (
    role_id    	bigint(20) NOT NULL,
    function_id	bigint(20) NOT NULL
    )
/

ALTER TABLE role_functions
    ADD CONSTRAINT fKey
	UNIQUE (function_id, role_id)
/



drop TABLE quotes
/
CREATE TABLE quotes  (
    id          bigint(20) NOT NULL AUTO_INCREMENT,
    quote       varchar(255) NOT NULL,
    author      varchar(255) NOT NULL DEFAULT 'anonymous',
    source      varchar(255)    ,
    year        datetime
,
    PRIMARY KEY(id)
    )
/
