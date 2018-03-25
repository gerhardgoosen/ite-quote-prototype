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
