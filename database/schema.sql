set client_min_messages to warning;
-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;
create schema "public";
CREATE TABLE "users" (
    "userId" serial NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" timestamptz NOT NULL default now(),
    CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "spots" (
    "spotId" serial NOT NULL,
    "userId" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photoFile" text NOT NULL,
    "createdAt" timestamptz NOT NULL default now(),
    "lat" TEXT NOT NULL,
    "lng" TEXT NOT NULL,
    CONSTRAINT "spots_pk" PRIMARY KEY ("spotId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "comments" (
    "userId" integer NOT NULL,
    "comment" text NOT NULL,
    "commentId" serial NOT NULL,
    "spotId" integer NOT NULL,
    CONSTRAINT "comments_pk" PRIMARY KEY ("commentId")
) WITH (
  OIDS=FALSE
);
ALTER TABLE "spots" ADD CONSTRAINT "spots_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk3" FOREIGN KEY ("spotId") REFERENCES "spots"("spotId")
