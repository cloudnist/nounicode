import { describe, it, expect, vi } from "vitest";
import isNoUnicode, {
  isModernASCII,
  isExtendedASCII,
  isStandardASCII,
} from "../src/index"; 

describe("ASCII Utility Functions", () => {
  describe("isModernASCII", () => {
    it("returns true for values within 0–255", () => {
      expect(isModernASCII(0)).toBe(true);
      expect(isModernASCII(127)).toBe(true);
      expect(isModernASCII(200)).toBe(true);
      expect(isModernASCII(255)).toBe(true);
    });

    it("returns false for values outside 0–255", () => {
      expect(isModernASCII(-1)).toBe(false);
      expect(isModernASCII(256)).toBe(false);
      expect(isModernASCII(1000)).toBe(false);
    });
  });

  describe("isExtendedASCII", () => {
    it("returns true for values within 128–255", () => {
      expect(isExtendedASCII(128)).toBe(true);
      expect(isExtendedASCII(200)).toBe(true);
      expect(isExtendedASCII(255)).toBe(true);
    });

    it("returns false for values outside 128–255", () => {
      expect(isExtendedASCII(0)).toBe(false);
      expect(isExtendedASCII(127)).toBe(false);
      expect(isExtendedASCII(256)).toBe(false);
    });
  });

  describe("isStandardASCII", () => {
    it("returns true for values within 0–127", () => {
      expect(isStandardASCII(0)).toBe(true);
      expect(isStandardASCII(65)).toBe(true);
      expect(isStandardASCII(127)).toBe(true);
    });

    it("returns false for values outside 0–127", () => {
      expect(isStandardASCII(-10)).toBe(false);
      expect(isStandardASCII(128)).toBe(false);
      expect(isStandardASCII(255)).toBe(false);
    });
  });

  describe("isNoUnicode", () => {
    it("returns true for empty string", () => {
      expect(isNoUnicode("")).toBe(true);
    });

    it("defaults to MODERN mode (0–255)", () => {
      expect(isNoUnicode("Àéø")).toBe(true);
      expect(isNoUnicode("😊")).toBe(false);
    });

    it("validates STANDARD ASCII correctly", () => {
      expect(isNoUnicode("Hello, World!", "STANDARD")).toBe(true);
      expect(isNoUnicode("Café", "STANDARD")).toBe(false);
    });

    it("validates EXTENDED ASCII correctly", () => {
        expect(isNoUnicode("éèçà", "EXTENDED")).toBe(true);
        expect(isNoUnicode("Résumé", "EXTENDED")).toBe(false);
    });

    it("early exits on first invalid character", () => {
      const spy = vi.spyOn(String.prototype, "codePointAt");
      isNoUnicode("A😊Z", "STANDARD");
      expect(spy.mock.calls.length).toBeLessThan(5);
      spy.mockRestore();
    });
  });
});
