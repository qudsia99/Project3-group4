CREATE TABLE "crime_data_table" (
    "vector_id" varchar   NOT NULL,
    "year" date   NOT NULL,
    "month" date   NOT NULL,
    "province" varchar   NOT NULL,
    "crime_category" varchar   NOT NULL,
    "crime_type" varchar   NOT NULL,
    "coordinate" varchar   NOT NULL,
    "value" int   NOT NULL
);

CREATE TABLE "income_data_table" (
    "vector_id" varchar   NOT NULL,
    "year" date  NOT NULL,
    "province" varchar   NOT NULL,
    "employment_type" varchar   NOT NULL,
    "type_of_statistic" varchar   NOT NULL,
    "unit_of_measure" varchar   NOT NULL,
    "value" float   NOT NULL
);

CREATE TABLE "employment_data_table" (
    "vector_id" varchar   NOT NULL,
    "year" date   NOT NULL,
    "labour_force_characteristics" varchar   NOT NULL,
    "sex" varchar   NOT NULL,
    "unit_of_measure" varchar   NOT NULL,
    "value" float   NOT NULL,
    "coordinate" varchar   NOT NULL
);

ALTER TABLE "crime_data_table" ADD CONSTRAINT "fk_crime_data_table_vector_id_year_province" FOREIGN KEY("vector_id", "year", "province")
REFERENCES "income_data_table" ("vector_id", "year", "province");

ALTER TABLE "crime_data_table" ADD CONSTRAINT "fk_crime_data_table_coordinate" FOREIGN KEY("coordinate")
REFERENCES "employment_data_table" ("coordinate");

ALTER TABLE "income_data_table" ADD CONSTRAINT "fk_income_data_table_vector_id_year" FOREIGN KEY("vector_id", "year")
REFERENCES "employment_data_table" ("vector_id", "year");

