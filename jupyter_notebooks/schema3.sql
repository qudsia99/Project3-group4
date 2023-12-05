CREATE TABLE "crime_data_table" (
    "Vector ID" varchar(255)   NOT NULL,
    "Year" date   NOT NULL,
    "Province" varchar   NOT NULL,
    "Crime Category" varchar   NOT NULL,
    "Crime Type" varchar   NOT NULL,
    "Coordinate" varchar   NOT NULL,
    "Value" int   NOT NULL    
);

CREATE TABLE "income_data_table" (
    "Vector ID" varchar(255)   NOT NULL,
    "Year" date   NOT NULL,
    "Province" varchar   NOT NULL,
    "Unit of Measure" varchar   NOT NULL,
    "Value" float   NOT NULL   
);

CREATE TABLE "employment_data_table" (
    "Vector ID" varchar(255)   NOT NULL,
    "Year" date   NOT NULL,
    "Labour force characteristics" varchar   NOT NULL,
    "sex" varchar   NOT NULL,
    "Unit of Measure" varchar   NOT NULL,
    "Value" float   NOT NULL,
    "Coordinate" varchar   NOT NULL    
);

