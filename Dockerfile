FROM node:14
WORKDIR /app
# Install global dependencies like the React Native CLI (yarn will be installed later)
RUN npm install -g react-native-cli
# Install Android development dependencies (adjust versions as needed)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    openjdk-8-jdk-headless \
    android-sdk \    
    android-tools-adb \
    build-essential \    
    ruby-full \
    rubygems \    
    curl \
    git && \    
    rm -rf /var/lib/apt/lists/*

# Set up environment variables for Android
ENV ANDROID_HOME /usr/local/android-sdk
ENV PATH $PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
# Create a new React Native app (replace "MyApp" with your app's name)
RUN react-native init MyApp
# Change working directory to the app directory
WORKDIR /app/MyApp
# Expose port 8081 for the React Native packager
EXPOSE 8081
# Check if yarn is installed, and if not, install it
RUN which yarn || npm install -g yarn
# Start the React Native packager
CMD ["npm", "start"]