
CREATE DATABASE `quoteapp`;

GRANT USAGE ON *.* TO `ite_user`@'%' IDENTIFIED BY 'easy0n3';
GRANT DELETE ON quoteapp.* TO `ite_user`@'%' ;
GRANT INDEX ON quoteapp.* TO `ite_user`@'%' ;
GRANT SELECT ON quoteapp.* TO `ite_user`@'%' ;
GRANT CREATE ROUTINE ON quoteapp.* TO `ite_user`@'%' ;
GRANT CREATE ON quoteapp.* TO `ite_user`@'%' ;
GRANT ALTER ON quoteapp.* TO `ite_user`@'%' ;
GRANT CREATE VIEW ON quoteapp.* TO `ite_user`@'%' ;
GRANT DROP ON quoteapp.* TO `ite_user`@'%' ;
GRANT ALTER ROUTINE ON quoteapp.* TO `ite_user`@'%' ;
GRANT LOCK TABLES ON quoteapp.* TO `ite_user`@'%' ;
GRANT CREATE TEMPORARY TABLES ON quoteapp.* TO `ite_user`@'%' ;
GRANT SHOW VIEW ON quoteapp.* TO `ite_user`@'%' ;
GRANT UPDATE ON quoteapp.* TO `ite_user`@'%' ;
GRANT REFERENCES ON quoteapp.* TO `ite_user`@'%' ;
GRANT INSERT ON quoteapp.* TO `ite_user`@'%';