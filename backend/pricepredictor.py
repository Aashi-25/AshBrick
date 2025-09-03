import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import joblib

ashdata = pd.read_csv('data/flyashorg.csv')

#  features 
x = ashdata[["State","City","Grade","Purity_%","Quantity_MT"]]
y = ashdata["Price_Per_MT_INR"]

# training
x_train,x_test,y_train,y_test = train_test_split(x,y,test_size=0.2,random_state=42)


category_col = ["State","City","Grade"]
numeric_col = ["Purity_%","Quantity_MT"]

preprocessor = ColumnTransformer(
    transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore"), category_col),
        ("num", "passthrough", numeric_col)
    ]
)

#Random forest
model = Pipeline([
    ("preprocessor",preprocessor),
    ("regressor",RandomForestRegressor(random_state=42))
])
model.fit(x_train,y_train)
print("Created!")

sample_input = pd.DataFrame([{
    "State": "Maharashtra",
    "City": "Mumbai",
    "Grade": "Class C",
    "Purity_%": 92.5,
    "Quantity_MT": 300
}])

predicted_price = model.predict(sample_input)
print(f"Predicted Price: ₹{predicted_price[0]:.2f} per MT")

joblib.dump(model, "flyash_price_model.pkl")
print("Model Saved!")