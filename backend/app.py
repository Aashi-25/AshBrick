from flask import Flask, request, jsonify
import joblib
import pandas as pd

model = joblib.load('flyash_price_model.pkl')

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Invalid input"}), 400

        df = pd.DataFrame([data])

        prediction = model.predict(df)

        result = [
            {"predicted_price": round(float(price), 2), "unit": "INR/MT"}
            for price in prediction
        ]

        return jsonify({"predicted_prices": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
