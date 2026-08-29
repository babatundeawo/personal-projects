import numpy  # To create data
from sklearn import metrics  # To create a confusion matrix
import matplotlib.pyplot as plt  # To display the matrix as a picture

# Create random guesses for actual and predicted values
actual = numpy.random.binomial(1, 0.9, size=10)  # Actual values (1=Apple, 0=Orange)
predicted = numpy.random.binomial(1, 0.9, size=10)  # Predicted values
print("Actual: ", actual)
print("Predicted: ", predicted)

confusion_matrix = metrics.confusion_matrix(actual, predicted)
print("Confusion Matrix: \n", confusion_matrix)

cm_display = metrics.ConfusionMatrixDisplay(confusion_matrix, display_labels=["Orange", "Apple"])
cm_display.plot()
plt.show()

# Accuracy: How many predictions were correct?
accuracy = metrics.accuracy_score(actual, predicted)
print("Accuracy:", accuracy)

# Precision: Of all the times the robot said "Apple," how many were correct?
precision = metrics.precision_score(actual, predicted)
print("Precision:", precision)

# Recall (Sensitivity): How many apples did the robot correctly identify?
recall = metrics.recall_score(actual, predicted)
print("Recall:", recall)

# Specificity: How many oranges were correctly predicted?
specificity = metrics.recall_score(actual, predicted, pos_label=0)
print("Specificity:", specificity)

# F1-Score: A balance between Precision and Recall.
f1_score = metrics.f1_score(actual, predicted)
print("F1-Score:", f1_score)
