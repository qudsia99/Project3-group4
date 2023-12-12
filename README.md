# Canadian Provincial Crime Stats during COVID-19 Prime Years Dashboard

### General Information 

This dashboard created by a team of four individuals, utilizes reported 9-1-1 calls made by Canadian households between the years 2019-2021, along with labour force and income data from Statistics Canada to transform the data into unique visuals for better visualization of trends, patterns and potential correlation among subtopics, such as wether the increase in unemployment after COVID-19 was declared a pandemic may have affected the 9-1-1 calls made overtime, and what the income distribution looked in for canadians among the same years. 

### Features

A dynamic map of Canadian provinces with markers that displays the top 3 call categories made, percentage of persons with annual income under $5,000 and mean unemployement rate per province. A bar graph that displays the years and employment across provinces via a drop-down, as well as another bar graph that displays different crime types reported per province, also filtered by year. Finally a visualization of mean income across all provinces by years, displayed by a line graph.  


### Development 

#### Back-End ETL (Extraction, Transformation, and Load):

All CSV files were first cleaned individually and pushed as output, which was engineered in a PostGres database using sqlalchemy, psycopg2, on jupyter notebooks then loaded into a local FLASK APP, with routes relevant to the dashboard.

PREVIEW:
```
http://127.0.0.1:5000/api/CrimeData
http://127.0.0.1:5000/api/IncomeData
http://127.0.0.1:5000/api/EmploymentData
```

#### Front-End Web Dev:

After all data was successfully available inside the API routes, Javascript, HTML and CSS files were utilized to create the map, graphs and any other visualizations respectively. Languages that were used for any layouts were the following: ```Leaflet, D3.JS, Chart.JS```

##### Languages Used:

```
import pandas as pd
import numpy as np
import csv 
import matplotlib.pyplot as plt
from pathlib import Path
import scipy.stats as st
import numpy as np
import datetime as dt
import psycopg2
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify
from flask_cors import CORS

```


Contributors can be found under 'Contributors' section on repository page. 
