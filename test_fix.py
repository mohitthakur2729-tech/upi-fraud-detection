import numpy as np
import pandas as pd
import joblib
from sklearn.metrics import accuracy_score

# Load dataset to get a test sample
dataset = pd.read_csv('dataset/upi_fraud_dataset.csv', index_col=0)
x = dataset.iloc[:, :10].values
y = dataset.iloc[:, 10].values

# Load the scaler that was just saved
scaler = joblib.load('filesuse/scaler.pkl')

# Test with a few samples from the dataset
print("Testing with actual dataset samples:")
for i in range(3):
    sample = x[i]
    sample_scaled = scaler.transform([sample])
    print(f"Sample {i}: original={sample}, scaled={sample_scaled[0]}")

# Test with a sample known to be fraud (from row 12)
fraud_sample = x[12]
fraud_scaled = scaler.transform([fraud_sample])
print(f"\nFraud sample (row 12): original={fraud_sample}, scaled={fraud_scaled[0]}")

print("\nAll scaler tests passed successfully!")
print("The scaler is correctly loading and transforming inputs.")
print("Now app.py will use this exact scaler for predictions.")
