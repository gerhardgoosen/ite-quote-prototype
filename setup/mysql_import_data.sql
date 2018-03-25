//ROLES
insert into roles(app_role) values("admin")
/
insert into roles(app_role) values("editor")
/
insert into roles(app_role) values("reader")
/


//FUNCTIONS
insert into functions(app_function) values("read_qoute")
/
insert into functions(app_function) values("add_qoute")
/
insert into functions(app_function) values("edit_qoute")
/
insert into functions(app_function) values("delete_qoute")
/
insert into functions(app_function) values("add_user")
/
insert into functions(app_function) values("edit_user")
/
insert into functions(app_function) values("delete_user")
/

//ROLE_FUNCTIONS
//Admin Role Functions
insert into role_functions(role_id,function_id) values((select id from roles where app_role="admin"),(select id from functions where app_function="read_qoute"))
/
insert into role_functions(role_id,function_id) values((select id from roles where app_role="admin"),(select id from functions where app_function="add_qoute"))
/
insert into role_functions(role_id,function_id) values((select id from roles where app_role="admin"),(select id from functions where app_function="edit_qoute"))
/
insert into role_functions(role_id,function_id) values((select id from roles where app_role="admin"),(select id from functions where app_function="delete_qoute"))
/
insert into role_functions(role_id,function_id) values((select id from roles where app_role="admin"),(select id from functions where app_function="add_user"))
/
insert into role_functions(role_id,function_id) values((select id from roles where app_role="admin"),(select id from functions where app_function="edit_user"))
/
insert into role_functions(role_id,function_id) values((select id from roles where app_role="admin"),(select id from functions where app_function="delete_user"))
/

//Editor Role Functions
insert into role_functions(role_id,function_id) values((select id from roles where app_role="editor"),(select id from functions where app_function="read_qoute"))
/
insert into role_functions(role_id,function_id) values((select id from roles where app_role="editor"),(select id from functions where app_function="add_qoute"))
/
insert into role_functions(role_id,function_id) values((select id from roles where app_role="editor"),(select id from functions where app_function="edit_qoute"))
/
insert into role_functions(role_id,function_id) values((select id from roles where app_role="editor"),(select id from functions where app_function="delete_qoute"))
/


//Reader Role Functions
insert into role_functions(role_id,function_id) values((select id from roles where app_role="reader"),(select id from functions where app_function="read_qoute"))
/




