export const isModernASCII = (cc: number) => {
  return cc >= 0 && cc < 256;
};

export const isExtendedASCII = (cc: number) => {
  return cc >= 128 && cc < 256;
};

export const isStandardASCII = (cc: number) => {
  return cc >= 0 && cc < 128;
};

export type ASCIIType = "MODERN" | "EXTENDED" | "STANDARD";

export const isNoUnicode = (data: string, type: ASCIIType = "MODERN") => {
  const len = data.length;
  for (let i = 0; i < len; i++) {
    const cc = data.codePointAt(i);
    let ret = false;
    if (cc !== undefined) {
      switch (type) {
        case "MODERN":
          ret = isModernASCII(cc);
          break;
        case "EXTENDED":
          ret = isExtendedASCII(cc);
          break;
        case "STANDARD":
          ret = isStandardASCII(cc);
          break;
        default:
          break;
      }
    }
    if (!ret) {
      return ret;
    }
  }
  return true;
};

export default isNoUnicode;
