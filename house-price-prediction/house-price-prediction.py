import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression

# Load the dataset
df = pd.read_csv("houses.csv")

# Create a StandardScaler instance
scale = StandardScaler()

# Select features and target variable
X = df[['Size (sq ft)', 'Rooms']]
y = df['Price ($)']

# Scale the features
scaled_X = scale.fit_transform(X)

# Train a linear regression model
regr = LinearRegression()
regr.fit(scaled_X, y)

# Predict prices for new houses
new_houses = [[2000, 3], [3500, 4], [1200, 2]]  # Input new data
scaled_new_houses = scale.transform(new_houses)
predicted_prices = regr.predict(scaled_new_houses)

# Add new predictions to the dataset
new_data = pd.DataFrame(new_houses, columns=['Size (sq ft)', 'Rooms'])
new_data['Predicted Price ($)'] = predicted_prices

# Append to the original dataset
updated_df = pd.concat([df, new_data], ignore_index=True)

# Save to a new CSV file
updated_df.to_csv("houses_with_predictions.csv", index=False)

print("Assignment completed. Updated dataset saved to 'houses_with_predictions.csv'.")
