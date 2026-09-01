# Import libraries
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

# Step 1: Real-world Loan Approval Data
# Features: Income (in $1000s) and Credit Score
data = {
    "Income": [15, 18, 21, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 80],
    "Credit_Score": [500, 520, 550, 580, 600, 630, 650, 670, 700, 720, 740, 760, 780, 800],
    "Loan_Approved": [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]  # 0 = Not Approved, 1 = Approved
}

# Convert the data into a DataFrame
df = pd.DataFrame(data)

# Step 2: Separate Features (X) and Target (y)
X = df[['Income', 'Credit_Score']]  # Predictor variables
y = df['Loan_Approved']            # Target variable

# Step 3: Split the data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 4: Train the Logistic Regression Model
model = LogisticRegression()
model.fit(X_train, y_train)

# Step 5: Make Predictions on Test Data
y_pred = model.predict(X_test)
y_prob = model.predict_proba(X_test)[:, 1]  # Probabilities of approval

# Step 6: Evaluate the Model
accuracy = accuracy_score(y_test, y_pred)
confusion = confusion_matrix(y_test, y_pred)
report = classification_report(y_test, y_pred)

print("Model Accuracy:", accuracy)
print("\nConfusion Matrix:\n", confusion)
print("\nClassification Report:\n", report)

# Step 7: Visualize Results
plt.figure(figsize=(10, 6))
plt.scatter(df['Income'], df['Credit_Score'], c=df['Loan_Approved'], cmap='coolwarm', label='Actual Data')
plt.xlabel("Income (in $1000s)")
plt.ylabel("Credit Score")
plt.title("Loan Approval Decision")
plt.colorbar(label="Loan Approved (0 = No, 1 = Yes)")
plt.show()
