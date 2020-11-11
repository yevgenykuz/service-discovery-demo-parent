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


@app.route('/name', methods=['GET'])
def get_incomes():
  low = 0
  name = request.args.get('name')
  high = max(income['amount'] for income in incomes)
  res = [income for income in incomes if income['amount']>=low and income['amount']<=high]
  app.logger.info("\nHEADERS:\n"+str(request.headers)+"\n")
  app.logger.info("PARAMETERS:" + "name="+name+"\n")
  app.logger.info("METHOD: GET\n")
  app.logger.info("URL: "+request.path+"\n")
  url = os.environ["URL"]
  app.logger.info("URL "+url)
  #send request to the next app
  requests.get(url+"/middleman?name="+name)

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