-- Role Table
CREATE TABLE IF NOT EXISTS "Role" (
    "roleId"  SERIAL , 
    "roleName" VARCHAR(100) NOT NULL, 
    "isArchived" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), 
    PRIMARY KEY ("roleId")
    );

-- User Table
CREATE TABLE IF NOT EXISTS "User" (
    "userId"  SERIAL , 
    "firstName" VARCHAR(100), 
    "lastName" VARCHAR(100), 
    "roleId" INTEGER REFERENCES "Role" ("roleId") ON DELETE NO ACTION ON UPDATE CASCADE,
    "email" VARCHAR(50), 
    "password" VARCHAR(225), 
    "isArchived" BOOLEAN NOT NULL, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), 
    PRIMARY KEY ("userId")
    );

-- Session table
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
