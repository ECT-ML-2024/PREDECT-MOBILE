import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "http://192.168.1.7:3000/api/",
    // apiUrl: "https://predect-server.onrender.com/api/",
  },
  staging: {
    apiUrl:"https://predect-server.onrender.com/api/"
  },
  prod: {
    apiUrl:"https://predect-server.onrender.com/api/"
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
