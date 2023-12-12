CREATE TABLE `crime` (
    `Index` int  NOT NULL ,
    `VectorID` str  NOT NULL ,
    `Year` int  NOT NULL ,
    `Month` int  NOT NULL ,
    `Province` str  NOT NULL ,
    `CrimeCategory` str  NOT NULL ,
    `CrimeType` str  NOT NULL ,
    `Coordinate` str  NOT NULL ,
    `Value` float  NOT NULL ,
    PRIMARY KEY (
        `Index`,`Coordinate`
    )
);

CREATE TABLE `income` (
    `Index` int  NOT NULL ,
    `VectorID` str  NOT NULL ,
    `Year` int  NOT NULL ,
    `Province` str  NOT NULL ,
    `EmploymentType` str  NOT NULL ,
    `TypeOfStatistic` str  NOT NULL ,
    `UnitOfMeasure` str  NOT NULL ,
    `Value` float  NOT NULL ,
    PRIMARY KEY (
        `Index`
    )
);

CREATE TABLE `employment` (
    `Index` int  NOT NULL ,
    `VectorID` str  NOT NULL ,
    `Year` int  NOT NULL ,
    `Province` str  NOT NULL ,
    `LabourForceCharacteristics` str  NOT NULL ,
    `Sex` str  NOT NULL ,
    `UnitOfMeasure` str  NOT NULL ,
    `Value` float  NOT NULL ,
    `Coordinate` str  NOT NULL ,
    PRIMARY KEY (
        `Index`
    )
);

