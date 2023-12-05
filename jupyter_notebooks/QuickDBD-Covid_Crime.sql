-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/GlOIWa
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "crime_data_table" (
    "vector_id" varchar   NOT NULL,
    "year" datetime   NOT NULL,
    "month" datetime   NOT NULL,
    "province" varchar   NOT NULL,
    "crime_category" varchar   NOT NULL,
    "crime_type" varchar   NOT NULL,
    "coordinate" varchar   NOT NULL,
    "value" int   NOT NULL,
    CONSTRAINT "pk_crime_data_table" PRIMARY KEY (
        "crime_type"
     )
);

CREATE TABLE "income_data_table" (
    "vector_id" varchar   NOT NULL,
    "year" datetime   NOT NULL,
    "province" varchar   NOT NULL,
    "employment_type" varchar   NOT NULL,
    "type_of_statistic" varchar   NOT NULL,
    "unit_of_measure" varchar   NOT NULL,
    "value" float   NOT NULL,
    CONSTRAINT "pk_income_data_table" PRIMARY KEY (
        "employment_type"
     )
);

ALTER TABLE "crime_data_table" ADD CONSTRAINT "fk_crime_data_table_vector_id_year_province" FOREIGN KEY("vector_id", "year", "province")
REFERENCES "income_data_table" ("vector_id", "year", "province");

