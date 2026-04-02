/**
 * Recursively converts snake_case object keys to camelCase.
 * Also uppercases known enum values (status, plan, healthBadge, vegStatus).
 */

const UPPERCASE_FIELDS = new Set(["status", "plan", "healthBadge", "vegStatus", "health_badge", "veg_status"]);

export const toCamelCase = (obj: any): any => {
  if (obj === null || obj === undefined) return obj;
  if (obj instanceof Date) return obj.toISOString();
  if (Array.isArray(obj)) return obj.map(toCamelCase);
  if (typeof obj !== "object") return obj;

  const result: any = {};
  for (const key of Object.keys(obj)) {
    const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    let value = obj[key];

    // Uppercase enum string values for known fields
    if (UPPERCASE_FIELDS.has(key) && typeof value === "string") {
      value = value.toUpperCase();
    }

    result[camelKey] = toCamelCase(value);
  }
  return result;
};
