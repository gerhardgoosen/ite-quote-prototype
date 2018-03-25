
drop TABLE quotes
/
CREATE TABLE quotes  (
    id          bigint(20) NOT NULL,
    quote       varchar(255) NOT NULL,
    author      varchar(255) NOT NULL DEFAULT 'anonymous',
    source      varchar(255)    ,
    year        datetime        ,
    )
/