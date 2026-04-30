import os
import numpy as np
import pandas as pd
import joblib
import tensorflow as tf
from flask import Flask, request, render_template

ALLOWED_UPLOAD_EXTENSIONS = {".csv"}
TRAINING_COLUMNS = [
    "trans_hour",
    "trans_day",
    "trans_month",
    "trans_year",
    "category",
    "upi_number",
    "age",
    "trans_amount",
    "state",
    "zip",
    "fraud_risk",
]

# Load the pre-fitted scaler (must match the one used during model training)
scaler = joblib.load('filesuse/scaler.pkl')

# Load the trained model
model = tf.keras.models.load_model('filesuse/project_model1.h5')

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024

def is_csv_file(filename):
    return os.path.splitext(filename.lower())[1] in ALLOWED_UPLOAD_EXTENSIONS

def read_training_csv(file_storage):
    if not file_storage or not file_storage.filename:
        raise ValueError("Please choose a CSV file to upload.")

    if not is_csv_file(file_storage.filename):
        raise ValueError("Only CSV files are allowed for model training.")

    try:
        df = pd.read_csv(file_storage, encoding='unicode_escape')
    except Exception as exc:
        raise ValueError("The selected file could not be read as a CSV dataset.") from exc

    missing_columns = [column for column in TRAINING_COLUMNS if column not in df.columns]
    if missing_columns:
        raise ValueError("CSV is missing required training columns: " + ", ".join(missing_columns))

    return df[TRAINING_COLUMNS]

def build_prediction_features(form):
    trans_datetime = pd.to_datetime(form.get("trans_datetime"), errors="coerce")
    dob = pd.to_datetime(form.get("dob"), errors="coerce")

    if pd.isna(trans_datetime) or pd.isna(dob):
        raise ValueError("Please enter valid transaction and birth dates.")

    age = np.floor((trans_datetime - dob).days / 365.25)
    if age < 0:
        raise ValueError("Date of birth cannot be after the transaction date.")

    values = [
        trans_datetime.hour,
        trans_datetime.day,
        trans_datetime.month,
        trans_datetime.year,
        int(form.get("category")),
        float(form.get("card_number")),
        age,
        float(form.get("trans_amount")),
        int(form.get("state")),
        int(form.get("zip")),
    ]

    return np.array(values, dtype=float).reshape(1, -1)

@app.route('/')
@app.route('/first')
def first():
    return render_template('first.html')
@app.route('/login')
def login():
    return render_template('login.html')
@app.route('/home')
def home():
    return render_template('home.html')
@app.route('/upload')
def upload():
    return render_template('upload.html')  
@app.route('/preview',methods=["POST"])
def preview():
    dataset = request.files.get('datasetfile')
    try:
        df = read_training_csv(dataset)
    except ValueError as exc:
        return render_template('upload.html', error=str(exc)), 400

    return render_template("preview.html", df_view=df)


@app.route('/prediction1', methods=['GET'])
def prediction1():
    return render_template('index.html')

@app.route('/chart')
def chart():
    return render_template('chart.html')

@app.route('/detect', methods=['POST'])
def detect():
    try:
        x_test = build_prediction_features(request.form)
    except (TypeError, ValueError):
        return render_template('index.html', error="Please enter valid values for every transaction field."), 400

    scaled_features = scaler.transform(x_test)
    fraud_probability = float(model.predict(scaled_features, verbose=0)[0][0])
    if fraud_probability <= 0.5:
        result = "VALID TRANSACTION"
    else:
        result = "FRAUD TRANSACTION"
    return render_template('result.html', OUTPUT=result)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Render assigns a port dynamically
    app.run(host="0.0.0.0", port=port)


