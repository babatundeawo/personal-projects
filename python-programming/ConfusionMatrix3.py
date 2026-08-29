from sklearn.metrics import precision_recall_curve, average_precision_score
import matplotlib.pyplot as plt

# True labels and predictions (example)
y_true = [0, 1, 1, 1, 0, 1, 0, 0, 1, 1]
y_scores = [0.1, 0.6, 0.8, 0.9, 0.4, 0.7, 0.3, 0.2, 0.95, 0.85]

# Calculate Precision-Recall
precision, recall, _ = precision_recall_curve(y_true, y_scores)

# Average Precision Score
ap_score = average_precision_score(y_true, y_scores)

# Plot Precision-Recall Curve
plt.plot(recall, precision, marker='.')
plt.title('Precision-Recall Curve')
plt.xlabel('Recall')
plt.ylabel('Precision')
plt.show()

print("Average Precision Score:", ap_score)
