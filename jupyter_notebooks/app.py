# Import the dependencies.
import numpy as np
import datetime as dt

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, Table, Column, MetaData, bindparam

from flask import Flask, jsonify
from flask_cors import CORS

user = 'postgres'
password = 'postgres'
host = 'localhost'
port = '5432'
database = 'covid_crime_db'
# for creating connection engine
engine = create_engine(f'postgresql://{user}:{password}@{host}:{port}/{database}')


#################################################
# Database Setup
#################################################

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table
Crime = Base.classes.crime
Employment = Base.classes.employment
Income = Base.classes.income

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
#Runs all route to CORS allow cross origin sharing
CORS(app)

#################################################
# Flask Routes
#################################################

#Route to Welcome page 
@app.route("/")
def welcome():
    """ Welcome to the Crime Data APP """
    return (
        f"Welcome to the Crime Data from 2019-2021 Page!"
        f"Available Routes:<br/>"
        f"/api/CrimeData<br/>"
        f"/api/CrimeData/<Prov><br/>"
        f"/api/CrimeData/<Prov>/<Year><br/>"
        f"/api/EmploymentData<br/>"
        f"/api/EmploymentData/<Prov><br/>"
        f"/api/EmploymentData/<Prov>/<Year><br/>"
        f"/api/IncomeData/<br/>"
        f"/api/IncomeData/<Prov><br/>"
        f"/api/IncomeData/<Prov>/<Year><br/>"
    )


# Route to get all records from the table
@app.route('/api/CrimeData')
def get_crime_records():
    session = Session(engine)

    records = session.query(Crime).all()

    session.close()

    # Manually structure the JSON response
    response_data = {
        'CrimeData': [
            {
                'VectorID': getattr(record, 'Vector ID'),
                'Year': record.Year,
                'Month': record.Month,
                'Province': record.Province,
                'CrimeCategory': getattr(record, 'Crime Category'), 
                'CrimeType': getattr(record, 'Crime Type'), 
                'Coordinate': record.Coordinate, 
                'Value': record.Value
            }
            for record in records
        ]
    }

    # Return the JSON response
    return jsonify(response_data)

@app.route("/api/CrimeData/<Prov>")
def get_crime_records_prov(Prov):
    # Create our session (link) from Python to the DB
    session = Session(engine)

    records = session.query(Crime).filter(Crime.Province == str(Prov)).all()

    session.close()

    #Unpacks the query into seperate vairable
    response_data = {
        'CrimeData': [
            {
                'VectorID': getattr(record, 'Vector ID'),
                'Year': record.Year,
                'Month': record.Month,
                'CrimeCategory': getattr(record, 'Crime Category'), 
                'CrimeType': getattr(record, 'Crime Type'), 
                'Coordinate': record.Coordinate, 
                'Value': record.Value
            }
            for record in records
        ]
    }

    return jsonify(response_data)


@app.route("/api/CrimeData/<Prov>/<Year>")
def provandyear(Prov,Year):
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Using parameterized query to prevent SQL injection
    records = session.query(Crime).filter_by(Province=Prov, Year=Year).all()

    session.close()

    #Unpacks the query into seperate vairable
    response_data = {
        'CrimeData': [
            {
                'VectorID': getattr(record, 'Vector ID'),
                'Year': record.Year,
                'Month': record.Month,
                'CrimeCategory': getattr(record, 'Crime Category'), 
                'CrimeType': getattr(record, 'Crime Type'), 
                'Coordinate': record.Coordinate, 
                'Value': record.Value
            }
            for record in records
        ]
    }

    return jsonify(response_data)


# Route to get all records from the table
@app.route('/api/EmploymentData')
def get_employment_records():
    session = Session(engine)

    records = session.query(Employment).all()

    session.close()

    # Manually structure the JSON response
    response_data = {
        'EmploymentData': [
            {
                'VectorID': getattr(record, 'Vector ID'),
                'Year': record.Year,
                'Province': record.Province,
                'LaborForceType': getattr(record, 'Labour force characteristics'), 
                'Sex': record.Sex, 
                'UOM': getattr(record, 'Unit of Measure'), 
                'Value': record.Value,
                'Coordinate': record.Coordinate, 
            }
            for record in records
        ]
    }

    # Return the JSON response
    return jsonify(response_data)


# Route to get all records from the table
@app.route('/api/EmploymentData/<Prov>')
def get_employment_records_by_prov(Prov):
    session = Session(engine)
    records = session.query(Employment).filter(Employment.Province == str(Prov)).all()
    session.close()
    # Manually structure the JSON response
    response_data = {
        'EmploymentData': [
            {
                'VectorID': getattr(record, 'Vector ID'),
                'Year': record.Year,
                'Province': record.Province,
                'LaborForceType': getattr(record, 'Labour force characteristics'), 
                'Sex': record.Sex, 
                'UOM': getattr(record, 'Unit of Measure'), 
                'Value': record.Value,
                'Coordinate': record.Coordinate, 
            }
            for record in records
        ]
    }

    # Return the JSON response
    return jsonify(response_data)

@app.route('/api/EmploymentData/<Prov>/<Year>')
def get_employment_records_by_prov_and_year(Prov,Year):
    session = Session(engine)
    # Set up query
    records = session.query(Employment).filter(Employment.Province == str(Prov)).filter(Employment.Year == int(Year)).all()
    session.close()
    
    # Manually structure the JSON response
    response_data = {
        'EmploymentData': [
            {
                'VectorID': getattr(record, 'Vector ID'),
                'Year': record.Year,
                'Province': record.Province,
                'LaborForceType': getattr(record, 'Labour force characteristics'), 
                'Sex': record.Sex, 
                'UOM': getattr(record, 'Unit of Measure'), 
                'Value': record.Value,
                'Coordinate': record.Coordinate, 
            }
            for record in records
        ]
    }

    # Return the JSON response
    return jsonify(response_data)

# Route to get all records from the table
@app.route('/api/IncomeData')
def get_income_records():
    session = Session(engine)
    records = session.query(Income).all()
    session.close()

    # Manually structure the JSON response
    response_data = {
        'IncomeData': [
            {
                'VectorID': getattr(record, 'Vector ID'),
                'Year': record.Year,
                'Province': record.Province,
                'EmploymentType': getattr(record, 'Employment Type'), 
                'TypeOfStat': getattr(record, 'Type of Statistic'), 
                'UOM': getattr(record, 'Unit of Measure'), 
                'Value': record.Value,
            }
            for record in records
        ]
    }

    # Return the JSON response
    return jsonify(response_data)

# Route to get all records from the table by filtering by province
@app.route('/api/IncomeData/<Prov>')
def get_income_records_by_prov(Prov):
    session = Session(engine)
    records = session.query(Income).filter(Income.Province == str(Prov)).all()
    session.close()

    # Manually structure the JSON response
    response_data = {
        'IncomeData': [
            {
                'VectorID': getattr(record, 'Vector ID'),
                'Year': record.Year,
                'Province': record.Province,
                'EmploymentType': getattr(record, 'Employment Type'), 
                'TypeOfStat': getattr(record, 'Type of Statistic'), 
                'UOM': getattr(record, 'Unit of Measure'), 
                'Value': record.Value,
            }
            for record in records
        ]
    }

    # Return the JSON response
    return jsonify(response_data)

# Route to get all records from the table
@app.route('/api/IncomeData/<Prov>/<Year>')
def get_income_records_by_prov_and_year(Prov,Year):
    session = Session(engine)
    records = session.query(Income).filter(Income.Province == str(Prov)).filter(Income.Year == int(Year)).all()
    session.close()

    # Manually structure the JSON response
    response_data = {
        'IncomeData': [
            {
                'VectorID': getattr(record, 'Vector ID'),
                'Year': record.Year,
                'Province': record.Province,
                'EmploymentType': getattr(record, 'Employment Type'), 
                'TypeOfStat': getattr(record, 'Type of Statistic'), 
                'UOM': getattr(record, 'Unit of Measure'), 
                'Value': record.Value,
            }
            for record in records
        ]
    }

    # Return the JSON response
    return jsonify(response_data)


if __name__ == '__main__':
   app.run(debug=True)