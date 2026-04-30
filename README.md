# UPI Fraud Detection

## Overview

This project focuses on detecting fraudulent transactions within the Unified Payments Interface (UPI) system using a Convolutional Neural Network (CNN). Given the increasing prevalence of digital payments, ensuring the security of such platforms is paramount. This system aims to identify and prevent potential fraudulent activities by analyzing transaction patterns and anomalies.

## Abstract

UPI Fraud is becoming more and more prevalent in financial transactions, and at the same time, frauds are increasing. Conventional methods use rule-based expert systems to detect fraud behaviors, neglecting diverse situations and the extreme imbalance of positive and negative samples. In this paper, we propose a CNN-based fraud detection framework, to capture the intrinsic patterns of fraud behaviors learned from labeled data. Abundant transaction data is represented by a feature matrix, on which a convolutional neural network is applied to identify a set of latent patterns for each sample. Experiments on real-world massive transactions of a major commercial bank demonstrate its superior performance compared with some state-of-the-art methods.

## Features

- **Data Analysis**: Examination of transaction data to identify patterns indicative of fraud.
- **CNN Model**: Implementation of a Convolutional Neural Network to classify transactions as legitimate or fraudulent.
- **Interactive Dashboard**: A user-friendly interface for real-time monitoring and analysis of transaction data.

## Project Structure

- **`dataset/`**: Contains the UPI transaction data used for analysis and model training.
- **`src/`**: Includes the source code for data processing, CNN model training, and evaluation.
- **`static/`**: Houses static files such as CSS and images for the web interface.
- **`templates/`**: Contains HTML templates for the web application's frontend.
- **`app.py`**: The main Flask application file that integrates all components and runs the web server.
- **`upi_fraud_dataset.csv`**: The dataset comprising UPI transaction records used for model training and testing.

## Installation

1. **Clone the Repository**:

2. **Create a Virtual Environment**:

3. **Install Dependencies**:

4. **Set Up the Dataset**:
   Ensure that the `upi_fraud_dataset.csv` file is placed in the `dataset/` directory. This dataset will be used for training and evaluating the CNN model.

## Usage

1. **Run the Application**:

2. **Access the Web Interface**:
   Open your web browser and navigate to `http://127.0.0.1:5000/`. Here, you can upload transaction data, view analysis results, and monitor potential fraudulent activities.

## Example Transactions

Use these sample values on the **Check** page to test both prediction outcomes.

### Valid Transaction Example

Expected result: **VALID TRANSACTION**

| Field | Value |
| --- | --- |
| UPI number | `9957000001` |
| Date of birth | `1968-01-01` |
| State | `22` |
| Pin code | `49879` |
| Transaction date and time | `2022-01-01T00:00` |
| Transaction amount | `66.21` |
| Merchant category | `12` |

### Fraud Transaction Example

Expected result: **FRAUD TRANSACTION**

| Field | Value |
| --- | --- |
| UPI number | `9957000013` |
| Date of birth | `1992-02-01` |
| State | `27` |
| Pin code | `28611` |
| Transaction date and time | `2022-02-01T01:00` |
| Transaction amount | `281.06` |
| Merchant category | `4` |

## How It Works

1. **Data Collection**:
   - The system uses a dataset of UPI transactions containing details such as transaction ID, amount, timestamp, sender and receiver details, and status.

2. **Data Preprocessing**:
   - The raw transaction data undergoes cleaning and transformation, including handling missing values, encoding categorical variables, and normalizing numerical fields.

3. **Feature Engineering**:
   - Important features such as transaction frequency, amount deviation, and user behavior patterns are extracted to improve model accuracy.

4. **CNN Model Training & Prediction**:
   - A Convolutional Neural Network is trained on labeled transaction data.
   - The trained CNN model classifies new transactions as either "Legitimate" or "Fraudulent."

5. **Fraud Detection & Alerting**:
   - When a transaction is classified as fraudulent, an alert is generated, notifying the user or the system administrator.

6. **Dashboard & Visualization**:
   - The results are displayed on an interactive dashboard that provides insights into fraud trends and high-risk transactions.
