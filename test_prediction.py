import numpy as np
import pandas as pd
import joblib
import tensorflow as tf

# Load dataset to get test samples
dataset = pd.read_csv('dataset/upi_fraud_dataset.csv', index_col=0)
x = dataset.iloc[:, :10].values
y = dataset.iloc[:, 10].values

# Load the saved scaler and model
scaler = joblib.load('filesuse/scaler.pkl')
model = tf.keras.models.load_model('filesuse/project_model1.h5')

print("Testing predictions with CORRECT scaler:")
print("="*60)

# Test non-fraud samples (first few rows)
for i in [0, 1, 2]:
    sample = x[i]
    sample_scaled = scaler.transform([sample])
    pred = model.predict(sample_scaled, verbose=0)
    result = "FRAUD" if pred[0][0] > 0.5 else "SAFE"
    actual = "FRAUD" if y[i] == 1 else "SAFE"
    print(f"Row {i}: Predicted={result} (prob={pred[0][0]:.4f}), Actual={actual}")

print()

# Test known fraud samples
fraud_indices = [12, 13, 14, 22, 26]
for i in fraud_indices:
    sample = x[i]
    sample_scaled = scaler.transform([sample])
    pred = model.predict(sample_scaled, verbose=0)
    result = "FRAUD" if pred[0][0] > 0.5 else "SAFE"
    actual = "FRAUD" if y[i] == 1 else "SAFE"
    print(f"Row {i}: Predicted={result} (prob={pred[0][0]:.4f}), Actual={actual}")

print()
print("="*60)
print("If predictions match actual labels, the fix is working correctly!")

