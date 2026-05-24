import crypto from "crypto";

/**
 * Hashes a password using SHA-256 algorithm.
 * Since this runs on the server, we use Node's built-in crypto module.
 */
export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}
