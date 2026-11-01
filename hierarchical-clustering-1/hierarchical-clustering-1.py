import numpy as np
import matplotlib.pyplot as plt
from scipy.cluster.hierarchy import dendrogram, linkage

# Example Data: Test Scores of Students
data = np.array([[10], [20], [25], [50], [60]])

# Perform Hierarchical Clustering
linkage_matrix = linkage(data, method='ward')  # 'ward' minimizes cluster variance

# Plot the Dendrogram
plt.figure(figsize=(8, 5))
dendrogram(linkage_matrix, labels=["A", "B", "C", "D", "E"])
plt.title("Hierarchical Clustering Dendrogram")
plt.xlabel("Students")
plt.ylabel("Distance")
plt.show()
