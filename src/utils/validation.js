/**
 * Data Validation Utilities
 * Provides secure validation functions for coordinates, amounts, and other data
 */

/**
 * Validates geographic coordinates
 * @param {number} latitude - Latitude value (-90 to 90)
 * @param {number} longitude - Longitude value (-180 to 180)
 * @returns {boolean} - True if coordinates are valid
 */
export const validateCoordinates = (latitude, longitude) => {
  // Check if values are numbers
  if (typeof latitude !== "number" || typeof longitude !== "number") {
    console.warn("Invalid coordinate types:", { latitude, longitude });
    return false;
  }

  // Check if values are finite numbers
  if (!isFinite(latitude) || !isFinite(longitude)) {
    console.warn("Coordinates are not finite:", { latitude, longitude });
    return false;
  }

  // Check latitude range
  if (latitude < -90 || latitude > 90) {
    console.warn("Latitude out of range:", latitude);
    return false;
  }

  // Check longitude range
  if (longitude < -180 || longitude > 180) {
    console.warn("Longitude out of range:", longitude);
    return false;
  }

  return true;
};

/**
 * Validates coordinate pair (array format)
 * @param {Array} coordinates - [latitude, longitude]
 * @returns {boolean} - True if coordinates are valid
 */
export const validateCoordinatePair = (coordinates) => {
  if (!Array.isArray(coordinates) || coordinates.length !== 2) {
    console.warn("Invalid coordinate pair format:", coordinates);
    return false;
  }

  const [lat, lon] = coordinates;
  return validateCoordinates(lat, lon);
};

/**
 * Sanitizes string input to prevent XSS
 * @param {string} input - String to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeString = (input) => {
  if (typeof input !== "string") {
    return "";
  }

  // Remove potentially dangerous HTML/script content
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
};

/**
 * Validates currency amount
 * @param {number} amount - Amount value
 * @param {number} minAmount - Minimum allowed amount
 * @param {number} maxAmount - Maximum allowed amount
 * @returns {boolean} - True if amount is valid
 */
export const validateCurrencyAmount = (
  amount,
  minAmount = 0,
  maxAmount = 999999999.99
) => {
  if (typeof amount !== "number") {
    console.warn("Invalid amount type:", amount);
    return false;
  }

  if (!isFinite(amount)) {
    console.warn("Amount is not finite:", amount);
    return false;
  }

  if (amount < minAmount || amount > maxAmount) {
    console.warn("Amount out of range:", { amount, minAmount, maxAmount });
    return false;
  }

  // Check decimal places (max 2 for currency)
  if (Math.round(amount * 100) / 100 !== amount) {
    console.warn("Amount has too many decimal places:", amount);
    return false;
  }

  return true;
};

/**
 * Validates date value
 * @param {string|Date|number} dateValue - Date to validate
 * @returns {boolean} - True if date is valid
 */
export const validateDate = (dateValue) => {
  try {
    const date = new Date(dateValue);
    return date instanceof Date && !isNaN(date.getTime());
  } catch (e) {
    console.warn("Invalid date value:", dateValue);
    return false;
  }
};

/**
 * Validates array of coordinates
 * @param {Array} coordinatesArray - Array of coordinate pairs
 * @returns {Array} - Array of validated coordinates
 */
export const validateCoordinatesArray = (coordinatesArray) => {
  if (!Array.isArray(coordinatesArray)) {
    console.warn("Coordinates is not an array:", coordinatesArray);
    return [];
  }

  return coordinatesArray.filter((coord) => {
    if (!Array.isArray(coord) || coord.length !== 2) {
      console.warn("Invalid coordinate in array:", coord);
      return false;
    }
    return validateCoordinates(coord[0], coord[1]);
  });
};

/**
 * Validates URL for safe redirection
 * @param {string} url - URL to validate
 * @param {Array} allowedDomains - List of allowed domains
 * @returns {boolean} - True if URL is valid and safe
 */
export const validateRedirectUrl = (url, allowedDomains = []) => {
  try {
    const urlObj = new URL(url, window.location.origin);

    // Check if protocol is safe
    if (!["http:", "https:"].includes(urlObj.protocol)) {
      console.warn("Unsafe URL protocol:", urlObj.protocol);
      return false;
    }

    // If allowedDomains is specified, check domain
    if (allowedDomains.length > 0) {
      const isAllowed = allowedDomains.some((domain) => {
        return (
          urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`)
        );
      });

      if (!isAllowed) {
        console.warn("URL domain not in allowed list:", urlObj.hostname);
        return false;
      }
    }

    return true;
  } catch (e) {
    console.warn("Invalid URL:", url);
    return false;
  }
};

/**
 * Validates environment variables are properly set
 * @param {Array} requiredEnvVars - Required environment variable names
 * @returns {Object} - Object with validation results
 */
export const validateEnvironmentVariables = (requiredEnvVars = []) => {
  const missing = [];
  const available = [];

  requiredEnvVars.forEach((envVar) => {
    if (process.env[envVar]) {
      available.push(envVar);
    } else {
      missing.push(envVar);
    }
  });

  return {
    isValid: missing.length === 0,
    missing,
    available,
  };
};

/**
 * Validates API response object
 * @param {Object} response - API response object
 * @param {Array} requiredFields - Required field names
 * @returns {boolean} - True if response is valid
 */
export const validateApiResponse = (response, requiredFields = []) => {
  if (typeof response !== "object" || response === null) {
    console.warn("Invalid API response: not an object");
    return false;
  }

  // Check for required fields
  const hasAllFields = requiredFields.every((field) => field in response);
  if (!hasAllFields) {
    const missing = requiredFields.filter((field) => !(field in response));
    console.warn("API response missing required fields:", missing);
    return false;
  }

  return true;
};

const validationUtils = {
  validateCoordinates,
  validateCoordinatePair,
  sanitizeString,
  validateCurrencyAmount,
  validateDate,
  validateCoordinatesArray,
  validateRedirectUrl,
  validateEnvironmentVariables,
  validateApiResponse,
};

export default validationUtils;
