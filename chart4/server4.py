from flask import Flask, jsonify, render_template
import sqlite3
import pandas as pd
from sqlalchemy import create_engine , text



def create_connection(db_file):
    """
    Create a database connection to a SQLite database
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Exception as e:
        print(e)
    return conn

# df = pd.read_csv("HM-Sales-2018.csv")

# connection = create_connection("demo.db")
# df.to_sql('sales', connection, if_exists='replace')

# db_url = 'sqlite:///demo.db'
# engine = create_engine(db_url, echo=True)

# df_2 = pd.read_sql('SELECT * From sales', engine)

# print(df_2)

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index4.html')


@app.route('/get-databar')
def get_databar():

    db_url = 'sqlite:///demo.db'
    engine = create_engine(db_url, echo=True)
    query_str = " SELECT \"Sub-Category\", SUM(Sales) as TotalSales FROM \"sales\" GROUP BY \"Sub-Category\" "
    print(query_str)
    df_2 = pd.read_sql(query_str, engine)
    print(df_2)

    result = df_2.to_dict(orient='records')
    
    # Return the JSON response
    return jsonify(result)



@app.route('/get-datascatter')
def get_datachart():

    db_url = 'sqlite:///demo.db'
    engine = create_engine(db_url, echo=True)
    query_str2 = " SELECT \"Discount\", SUM(Profit) as TotalProfit FROM \"sales\" GROUP BY \"Discount\" "
    print(query_str2)
    df_3 = pd.read_sql(query_str2, engine)
    print(df_3)

    result = df_3.to_dict(orient='records')
    
    # Return the JSON response
    return jsonify(result)



@app.route('/get-datapie')
def get_databubble():
    db_url = 'sqlite:///demo.db'
    engine = create_engine(db_url, echo=True)
    query_str4 = " SELECT \"Category\", SUM(Sales) as TotalSales FROM \"sales\" GROUP BY \"Category\" "
    print(query_str4)
    df_4 = pd.read_sql(query_str4, engine)
    print(df_4)

    result4 = df_4.to_dict(orient='records')
    
    # Return the JSON response
    return jsonify(result4)



@app.route('/get-stackbar')
def get_stack():
    db_url = 'sqlite:///demo.db'
    engine = create_engine(db_url, echo=True)
    query_str5 = " SELECT \"Year\", \"Region\", SUM(Sales) as TotalSales ,  SUM(Profit) as TotalProfit FROM \"sales\" GROUP BY \" Year\" , \"Region\"  ORDER BY \"Year\" "
    
    print(query_str5)

    df_5 = pd.read_sql(query_str5, engine)


    print(df_5)

    result5 = df_5.to_dict(orient='records')
    
    # Return the JSON response
    return jsonify(result5)


@app.route('/get-datastack')
def get_bubble():
    db_url = 'sqlite:///demo.db'
    engine = create_engine(db_url, echo=True)
    query_str6 = " SELECT \"Year\", \"CustomerID\", \"Category\" ,SUM(Sales) as TotalSales  FROM \"sales\" GROUP BY \"Year\" , \"Category\" , \"CustomerID\" ORDER BY \"Year\" , \"Category\" "
    
    print(query_str6)

    df_6 = pd.read_sql(query_str6, engine)


    print(df_6)

    result6 = df_6.to_dict(orient='records')
    
    # Return the JSON response
    return jsonify(result6)



if __name__ == '__main__':
    app.run(debug=True)
