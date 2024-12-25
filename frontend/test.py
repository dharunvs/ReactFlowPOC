import matplotlib
matplotlib.use('TkAgg')  # Use 'Agg' for non-GUI environments
import matplotlib.pyplot as plt



root = (500, 100)










x = []
y = []

# Plotting the points
plt.scatter(x, y, color='blue', label='Points')

# Adding labels and title
plt.xlabel('X-axis')
plt.ylabel('Y-axis')
plt.title('Scatter Plot of Points')

# Show grid
plt.grid(True)

# Display the legend
plt.legend()

# Show the plot
plt.show()
