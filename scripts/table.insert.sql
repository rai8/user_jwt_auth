-- Role insert 
INSERT INTO "Role" ("roleId","roleName","isArchived") VALUES (1,'Admin',false);
INSERT INTO "Role" ("roleId","roleName","isArchived") VALUES (2,'User',false);


INSERT INTO "User" ("userId","firstName", "lastName", "roleId","email", "password", "isArchived")
VALUES (DEFAULT, 'Admin', 'User', 1, 'admin@gmail.com','$2a$10$L/kJFootOsEzpPnPtyvuku7BaxF0gMLr1/CohhVZH81x3PX9QdSeq', false );