from flask import Flask, jsonify, request
import os
import requests

app = Flask(__name__)


incomes = [
  { 'description': 'salary', 'amount': 5000 },
{ 'description': 'salary', 'amount': 6000 },
{ 'description': 'salary', 'amount': 7000 },
{ 'description': 'salary', 'amount': 8000 }
]


@app.route('/incomes', methods=['GET'])
def get_incomes():
  low = 0 if request.args.get('low') is None else int(request.args.get('low'))
  high = max(income['amount'] for income in incomes) if request.args.get('high') is None else int(request.args.get('high'))
  res = [income for income in incomes if income['amount']>=low and income['amount']<=high]
  print("HEADERS:\n"+str(request.headers)+"\n")
  print("PARAMETERS:" + "low="+str(low)+", high="+str(high)+"\n")
  print("METHOD: GET\n")
  print("URL: "+request.path+"\n")
  url = os.environ["URL"]
  print("URL "+url)
  #send request to the next app
  requests.get(url)

  #print("URL environment"+os.environ.get('URL'))
  return jsonify(res)


@app.route('/incomes', methods=['POST'])
def add_income():
  incomes.append(request.get_json())
  return '', 20

def main():
  app.run(host='0.0.0.0')
if __name__ == '__main__':
  main()