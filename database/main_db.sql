CREATE TABLE "staff"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "role" INTEGER NOT NULL
);
ALTER TABLE
    "staff" ADD PRIMARY KEY("id");
CREATE TABLE "auth"(
    "id" BIGINT NOT NULL,
    "token" BIGINT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "ip" VARCHAR(12) NOT NULL
);
ALTER TABLE
    "auth" ADD PRIMARY KEY("id");
CREATE TABLE "prefs"(
    "id" BIGINT NOT NULL,
    "lang_code" VARCHAR(2) NOT NULL,
    "themes" INTEGER NOT NULL
);
ALTER TABLE
    "prefs" ADD PRIMARY KEY("id");
CREATE TABLE "brands"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "brands" ADD PRIMARY KEY("id");
CREATE TABLE "fuel"(
    "id" BIGINT NOT NULL,
    "name" BIGINT NOT NULL
);
ALTER TABLE
    "fuel" ADD PRIMARY KEY("id");
CREATE TABLE "cars"(
    "id" BIGINT NOT NULL,
    "year" BIGINT NOT NULL,
    "seats" BIGINT NOT NULL,
    "miles" BIGINT NOT NULL,
    "ac" BOOLEAN NOT NULL,
    "gear" BOOLEAN NOT NULL,
    "trunk_size" INTEGER NOT NULL
);
ALTER TABLE
    "cars" ADD PRIMARY KEY("id");
CREATE TABLE "car_images"(
    "id" BIGINT NOT NULL,
    "original" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "small" BIGINT NOT NULL
);
ALTER TABLE
    "car_images" ADD PRIMARY KEY("id");
CREATE TABLE "renters"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "driver_license" VARCHAR(255) NOT NULL,
    "image" TEXT NOT NULL,
    "address" VARCHAR(500) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "phone" VARCHAR(10) NOT NULL
);
ALTER TABLE
    "renters" ADD PRIMARY KEY("id");
CREATE TABLE "rentals"("id" BIGINT NOT NULL);
ALTER TABLE
    "rentals" ADD PRIMARY KEY("id");
CREATE TABLE "models"(
    "id" BIGINT NOT NULL,
    "name" BIGINT NOT NULL
);
ALTER TABLE
    "models" ADD PRIMARY KEY("id");
CREATE TABLE "agencies"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(500) NOT NULL,
    "rc" VARCHAR(16) NOT NULL,
    "email" BIGINT NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "address" VARCHAR(500) NOT NULL,
    "image" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "phone" VARCHAR(10) NOT NULL
);
ALTER TABLE
    "agencies" ADD PRIMARY KEY("id");
ALTER TABLE
    "staff" ADD CONSTRAINT "staff_id_foreign" FOREIGN KEY("id") REFERENCES "agencies"("id");
ALTER TABLE
    "cars" ADD CONSTRAINT "cars_fuel_id_foreign" FOREIGN KEY("id") REFERENCES "fuel"("id");
ALTER TABLE
    "prefs" ADD CONSTRAINT "prefs_agencies_id_foreign" FOREIGN KEY("id") REFERENCES "agencies"("id");
ALTER TABLE
    "cars" ADD CONSTRAINT "cars_agencies_id_foreign" FOREIGN KEY("id") REFERENCES "agencies"("id");
ALTER TABLE
    "brands" ADD CONSTRAINT "brands_id_foreign" FOREIGN KEY("id") REFERENCES "cars"("id");
ALTER TABLE
    "prefs" ADD CONSTRAINT "prefs_renters_id_foreign" FOREIGN KEY("id") REFERENCES "renters"("id");
ALTER TABLE
    "prefs" ADD CONSTRAINT "prefs_staff_id_foreign" FOREIGN KEY("id") REFERENCES "staff"("id");
ALTER TABLE
    "auth" ADD CONSTRAINT "auth_renters_id_foreign" FOREIGN KEY("id") REFERENCES "renters"("id");
ALTER TABLE
    "auth" ADD CONSTRAINT "auth_staff_id_foreign" FOREIGN KEY("id") REFERENCES "staff"("id");
ALTER TABLE
    "auth" ADD CONSTRAINT "auth_agencies_id_foreign" FOREIGN KEY("id") REFERENCES "agencies"("id");
ALTER TABLE
    "car_images" ADD CONSTRAINT "car_images_id_foreign" FOREIGN KEY("id") REFERENCES "cars"("id");
ALTER TABLE
    "models" ADD CONSTRAINT "models_id_foreign" FOREIGN KEY("id") REFERENCES "brands"("id");
ALTER TABLE
    "cars" ADD CONSTRAINT "cars_rentals_id_foreign" FOREIGN KEY("id") REFERENCES "rentals"("id");
ALTER TABLE
    "rentals" ADD CONSTRAINT "rentals_id_foreign" FOREIGN KEY("id") REFERENCES "renters"("id");