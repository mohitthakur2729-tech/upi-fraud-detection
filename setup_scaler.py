import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import joblib

# Load dataset exactly as in the training notebook
dataset = pd.read_csv('dataset/upi_fraud_dataset.csv', index_col=0)

x = dataset.iloc[:, :10].values
y = dataset.iloc[:, 10].values

# Use the exact same split as the training notebook
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.15, random_state=0)

# Fit scaler on training data only (exactly as done during model training)
scaler = StandardScaler()
x_train_scaled = scaler.fit_transform(x_train)

# Save the fitted scaler
joblib.dump(scaler, 'filesuse/scaler.pkl')

# Verify by loading it back
scaler_loaded = joblib.load('filesuse/scaler.pkl')
print("Scaler saved successfully!")
print("Scaler means:", scaler_loaded.mean_)
print("Scaler scales:", scaler_loaded.scale_)

# Quick verification: transform a sample from the training set
sample = x_train[0:1]
sample_scaled = scaler_loaded.transform(sample)
print("Sample original:", sample)
print("Sample scaled:", sample_scaled)

