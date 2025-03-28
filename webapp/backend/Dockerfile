# Use the official Python image
FROM python:3.9

# Set the working directory
WORKDIR /app

# Copy the application files
COPY . .

# Install dependencies
RUN pip install --no-cache-dir flask gunicorn

# Expose the Flask port
EXPOSE 5000

# Run the Flask application with Gunicorn
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
