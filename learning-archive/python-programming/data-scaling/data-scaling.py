import pandas as pd
from sklearn.preprocessing import StandardScaler

# Create a StandardScaler instance
scale = StandardScaler()

# Load the dataset
df = pd.read_csv("data.csv")

# Select the columns to scale
X = df[['Weight', 'Volume']]

# Scale the data
scaledX = scale.fit_transform(X)

# Convert scaled values to a DataFrame with the same column names
scaled_df = pd.DataFrame(scaledX, columns=['Scaled_Weight', 'Scaled_Volume'])

# Add the scaled values to the original DataFrame
df['Scaled_Weight'] = scaled_df['Scaled_Weight']
df['Scaled_Volume'] = scaled_df['Scaled_Volume']

# Write the updated DataFrame back to the CSV file
df.to_csv("data_scaled.csv", index=False)

print("Scaled values added and written to 'data_scaled.csv'")
