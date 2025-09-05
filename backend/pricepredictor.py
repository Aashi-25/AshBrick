import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer   
from sklearn.pipeline import Pipeline
import joblib

ashdata = pd.read_csv('data/flyashorg.csv')

# Input and target
x = ashdata[["State","City","Grade","Purity","Quantity"]]
y  = ashdata["Price"]


#  splitting
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)

category_col = ["State","City","Grade"]
numerical_col = ["Purity","Quantity"]

# preprocessing
preprocessor = ColumnTransformer(
    transformers=[
        ("cat",OneHotEncoder(handle_unknown="ignore"),category_col),
        ("num",StandardScaler(),numerical_col)
    ]
)

# randomforest
model = Pipeline(
 [
     ("preprocessor", preprocessor),
     ("regressor", RandomForestRegressor(n_estimators=100, random_state=42))
 ]
)

model.fit(x_train,y_train)
joblib.dump(model,"flyash_pricemodel.pkl")
print("Model created and trained/saved!")


