
//ADMIN USER with null password first login should set password
insert into users(first_name, last_name, username, password ,created, modified, role_id) values("admin","admin","admin", null, now(),now(),(select id from roles where app_role="admin") )
/


