# Import necessary libraries
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

# Data: Hours studied and Pass/Fail results
X = np.array([[1], [2], [3], [4], [5], [6]])  # Hours studied
y = np.array([0, 0, 0, 1, 1, 1])   # Pass (1) / Fail (0)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

# Create and train the Logistic Regression model
model = LogisticRegression()
model.fit(X_train, y_train)

# Predict probabilities for test data
probabilities = model.predict_proba(X_test)
predictions = model.predict(X_test)

# Print the results
print("Test Data (Hours):", X_test.flatten())
print("Predicted Probabilities:", probabilities)
print("Predicted Classes (Pass/Fail):", predictions)

# Plot the sigmoid curve
hours = np.linspace(0, 7, 100).reshape(-1, 1)
sigmoid_curve = model.predict_proba(hours)[:, 1]
plt.plot(hours, sigmoid_curve, color='blue', label="Probability of Passing")
plt.scatter(X, y, color='red', label="Actual Data")
plt.xlabel("Hours Studied")
plt.ylabel("Probability of Passing")
plt.title("Logistic Regression: Pass/Fail Prediction")
plt.legend()
plt.show()
