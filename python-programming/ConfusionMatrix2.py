# Set Up the Data
# Actual emails: 1 = Spam, 0 = Not Spam
actual = [1, 0, 0, 1, 1, 0, 1, 0, 0, 1]
# AI Predictions
predicted = [1, 0, 0, 1, 0, 0, 1, 1, 0, 1]

# Generate the Confusion Matrix
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
# Create confusion matrix
cm = confusion_matrix(actual, predicted)
# Display confusion matrix as a table
display = ConfusionMatrixDisplay(cm, display_labels=["Not Spam", "Spam"])
display.plot()

# Calculate Accuracy, Precision, and Recall
from sklearn.metrics import accuracy_score
accuracy = accuracy_score(actual, predicted)
print("Accuracy:", accuracy)
from sklearn.metrics import precision_score
precision = precision_score(actual, predicted)
print("Precision:", precision)
from sklearn.metrics import recall_score
recall = recall_score(actual, predicted)
print("Recall:", recall)
from sklearn.metrics import f1_score
f1 = f1_score(actual, predicted)
print("F1-Score:", f1)
