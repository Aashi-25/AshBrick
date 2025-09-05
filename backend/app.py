from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

model = joblib.load('flyash_pricemodel.pkl')

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Invalid input"}), 400

        df = pd.DataFrame([{
            "State": data.get("State"),
            "City": data.get("City"),
            "Grade": data.get("Grade"),
            "Purity": float(data.get("Purity", 0)),
            "Quantity": float(data.get("Quantity", 0))
        }])

    
        prediction = model.predict(df)[0]

        return jsonify({
            "predicted_price": round(float(prediction), 2),
            "unit": "INR/MT"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
