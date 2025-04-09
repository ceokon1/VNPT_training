from flask import Flask, redirect, url_for, render_template, request
import pyodbc

app = Flask(__name__)

conn_str = (
    "DRIVER={ODBC Driver 17 for SQL Server};"
    "SERVER=localhost\\SQLEXPRESS;"
    "DATABASE=mssql_lab;"
    "Trusted_Connection=yes;"
)
conn = pyodbc.connect(conn_str)

@app.route('/', methods=['GET'])
def search():
    safe_query = request.args.get('safe_q', '').strip()
    unsafe_query = request.args.get('unsafe_q', '').strip()
    safe_players = []
    unsafe_players = []
    cursor = conn.cursor()

    if safe_query:
        cursor.execute("EXEC SearchPlayer @name = ?", safe_query)
        safe_players = cursor.fetchall()

    if unsafe_query:
        cursor.execute(f"EXEC SearchPlayerVul @name = '{unsafe_query}'")
        unsafe_players = cursor.fetchall()

    return render_template(
        'checkinfo.html',
        safe_players=safe_players,
        unsafe_players=unsafe_players,
        safe_query=safe_query,
        unsafe_query=unsafe_query
    )


if __name__=="__main__":
    app.run(debug=True)