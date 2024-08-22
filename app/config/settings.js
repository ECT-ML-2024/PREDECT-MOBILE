import Constants from "expo-constants";

const settings = {
  dev: {
    // apiUrl: "http://172.20.10.4:3000/api/",
    apiUrl: "https://predect.onrender.com/api/",
  },
  staging: {
    apiUrl:"https://predect.onrender.com/api/"
  },
  prod: {
    apiUrl:"https://predect.onrender.com/api/"
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
