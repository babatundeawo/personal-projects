import numpy as np
import matplotlib.pyplot as plt
from scipy.cluster.hierarchy import dendrogram, linkage


# Example Data: Customer Spending
spending = np.array([[100], [110], [500], [520], [530]])

# Perform Hierarchical Clustering
linkage_matrix = linkage(spending, method='ward')

# Plot the Dendrogram
plt.figure(figsize=(8, 5))
dendrogram(linkage_matrix, labels=["C1", "C2", "C3", "C4", "C5"])
plt.title("Customer Spending Clustering Dendrogram")
plt.xlabel("Customers")
plt.ylabel("Distance")
plt.show()
