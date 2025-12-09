import {
  sanitizeString,
  validateApiResponse,
  validateCoordinatePair,
  validateCoordinates,
  validateCoordinatesArray,
  validateCurrencyAmount,
  validateDate,
  validateEnvironmentVariables,
  validateRedirectUrl,
} from "./validation";

describe("Validation Utilities", () => {
  describe("validateCoordinates", () => {
    test("returns true for valid coordinates", () => {
      expect(validateCoordinates(42.704868, -92.658805)).toBe(true);
      expect(validateCoordinates(0, 0)).toBe(true);
      expect(validateCoordinates(-90, -180)).toBe(true);
      expect(validateCoordinates(90, 180)).toBe(true);
    });

    test("returns false for invalid latitude", () => {
      expect(validateCoordinates(91, 0)).toBe(false);
      expect(validateCoordinates(-91, 0)).toBe(false);
      expect(validateCoordinates(NaN, 0)).toBe(false);
    });

    test("returns false for invalid longitude", () => {
      expect(validateCoordinates(0, 181)).toBe(false);
      expect(validateCoordinates(0, -181)).toBe(false);
      expect(validateCoordinates(0, NaN)).toBe(false);
    });

    test("returns false for non-number types", () => {
      expect(validateCoordinates("42", -92)).toBe(false);
      expect(validateCoordinates(42, null)).toBe(false);
      expect(validateCoordinates(undefined, 0)).toBe(false);
    });
  });

  describe("validateCoordinatePair", () => {
    test("returns true for valid coordinate pair", () => {
      expect(validateCoordinatePair([42.704868, -92.658805])).toBe(true);
    });

    test("returns false for non-array", () => {
      expect(validateCoordinatePair({ lat: 42, lon: -92 })).toBe(false);
    });

    test("returns false for array with wrong length", () => {
      expect(validateCoordinatePair([42])).toBe(false);
      expect(validateCoordinatePair([42, -92, 0])).toBe(false);
    });

    test("returns false for invalid coordinates in pair", () => {
      expect(validateCoordinatePair([91, -92])).toBe(false);
      expect(validateCoordinatePair([42, -181])).toBe(false);
    });
  });

  describe("sanitizeString", () => {
    test("returns empty string for non-string input", () => {
      expect(sanitizeString(123)).toBe("");
      expect(sanitizeString(null)).toBe("");
      expect(sanitizeString(undefined)).toBe("");
    });

    test("sanitizes XSS attempts", () => {
      const xssAttempt = '<script>alert("xss")</script>';
      const result = sanitizeString(xssAttempt);
      expect(result).not.toContain("<script>");
    });

    test("preserves safe strings", () => {
      const safeString = "Hello, World!";
      expect(sanitizeString(safeString)).toBe(safeString);
    });
  });

  describe("validateCurrencyAmount", () => {
    test("returns true for valid amounts", () => {
      expect(validateCurrencyAmount(100)).toBe(true);
      expect(validateCurrencyAmount(3024.0)).toBe(true);
      expect(validateCurrencyAmount(0)).toBe(true);
    });

    test("returns false for negative amounts by default", () => {
      expect(validateCurrencyAmount(-100)).toBe(false);
    });

    test("returns false for amounts outside range", () => {
      expect(validateCurrencyAmount(1000000000)).toBe(false);
    });

    test("returns false for non-number types", () => {
      expect(validateCurrencyAmount("100")).toBe(false);
      expect(validateCurrencyAmount(null)).toBe(false);
    });

    test("handles custom min/max amounts", () => {
      expect(validateCurrencyAmount(50, 100, 200)).toBe(false);
      expect(validateCurrencyAmount(150, 100, 200)).toBe(true);
    });
  });

  describe("validateDate", () => {
    test("returns true for valid dates", () => {
      expect(validateDate(new Date())).toBe(true);
      expect(validateDate("2024-01-01")).toBe(true);
      expect(validateDate(Date.now())).toBe(true);
    });

    test("returns false for invalid dates", () => {
      expect(validateDate("invalid date")).toBe(false);
      expect(validateDate(NaN)).toBe(false);
    });
  });

  describe("validateCoordinatesArray", () => {
    test("returns validated array of valid coordinates", () => {
      const coords = [
        [42.704, -92.658],
        [42.705, -92.659],
      ];
      const result = validateCoordinatesArray(coords);
      expect(result.length).toBe(2);
    });

    test("filters out invalid coordinates", () => {
      const coords = [
        [42.704, -92.658],
        [91, -92.658], // Invalid latitude
        [42.705, -92.659],
      ];
      const result = validateCoordinatesArray(coords);
      expect(result.length).toBe(2);
    });

    test("returns empty array for non-array input", () => {
      expect(validateCoordinatesArray("not an array")).toEqual([]);
      expect(validateCoordinatesArray(null)).toEqual([]);
    });
  });

  describe("validateRedirectUrl", () => {
    test("returns true for valid http urls", () => {
      expect(validateRedirectUrl("https://example.com")).toBe(true);
      expect(validateRedirectUrl("http://example.com")).toBe(true);
    });

    test("returns false for invalid protocols", () => {
      // eslint-disable-next-line no-script-url
      expect(validateRedirectUrl('javascript:alert("xss")')).toBe(false);
      expect(
        validateRedirectUrl('data:text/html,<script>alert("xss")</script>')
      ).toBe(false);
    });

    test("filters by allowed domains", () => {
      expect(validateRedirectUrl("https://example.com", ["example.com"])).toBe(
        true
      );
      expect(validateRedirectUrl("https://evil.com", ["example.com"])).toBe(
        false
      );
    });

    test("returns false for invalid urls", () => {
      expect(validateRedirectUrl("not a valid url")).toBe(false);
    });
  });

  describe("validateEnvironmentVariables", () => {
    test("returns validation result object", () => {
      const result = validateEnvironmentVariables(["NODE_ENV"]);
      expect(result).toHaveProperty("isValid");
      expect(result).toHaveProperty("missing");
      expect(result).toHaveProperty("available");
    });

    test("identifies missing variables", () => {
      const result = validateEnvironmentVariables(["NONEXISTENT_VAR_XYZ"]);
      expect(result.isValid).toBe(false);
      expect(result.missing).toContain("NONEXISTENT_VAR_XYZ");
    });

    test("identifies available variables", () => {
      const result = validateEnvironmentVariables(["NODE_ENV"]);
      expect(result.isValid).toBe(true);
      expect(result.available).toContain("NODE_ENV");
    });
  });

  describe("validateApiResponse", () => {
    test("returns true for valid response with required fields", () => {
      const response = { id: 1, name: "Test", data: [] };
      expect(validateApiResponse(response, ["id", "name"])).toBe(true);
    });

    test("returns false for missing required fields", () => {
      const response = { id: 1 };
      expect(validateApiResponse(response, ["id", "name"])).toBe(false);
    });

    test("returns false for non-object response", () => {
      expect(validateApiResponse("string", ["id"])).toBe(false);
      expect(validateApiResponse(null, ["id"])).toBe(false);
      expect(validateApiResponse(undefined, ["id"])).toBe(false);
    });

    test("returns true for response with no required fields specified", () => {
      expect(validateApiResponse({ id: 1 })).toBe(true);
      expect(validateApiResponse({})).toBe(true);
    });
  });
});
