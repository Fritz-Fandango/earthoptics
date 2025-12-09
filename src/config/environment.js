/**
 * Environment Configuration
 * Validates that all required environment variables are set
 */

import { validateEnvironmentVariables } from "./validation";

// Required environment variables
const REQUIRED_ENV_VARS = ["REACT_APP_SATELLITE_DATA_TOKEN"];

/**
 * Initialize and validate environment configuration
 * Throws error if required environment variables are missing
 */
export const initializeEnvironment = () => {
  const validation = validateEnvironmentVariables(REQUIRED_ENV_VARS);

  if (!validation.isValid) {
    console.error(
      "Missing required environment variables:",
      validation.missing.join(", ")
    );

    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "Application cannot start: required environment variables are not configured. " +
          "Contact your system administrator."
      );
    } else {
      console.warn(
        "WARNING: Application running with incomplete environment configuration. " +
          "Some features may not work correctly."
      );
    }
  }

  return validation;
};

/**
 * Get safe configuration object for use in application
 * @returns {Object} - Safe configuration object
 */
export const getConfig = () => {
  return {
    mapboxToken: process.env.REACT_APP_SATELLITE_DATA_TOKEN || "",
    isDevelopment: process.env.NODE_ENV === "development",
    isProduction: process.env.NODE_ENV === "production",
  };
};

const environmentConfig = {
  initializeEnvironment,
  getConfig,
};

export default environmentConfig;
