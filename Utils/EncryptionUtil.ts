/**
 * Utility functions for Base64 encoding and decoding
 */

export class EncryptionUtil {
    /**
     * Encrypt text using Base64 encoding
     * @param text - Text to encrypt
     * @returns Base64 encoded string
     */
    public static encryptBase64(text: string): string {
        try {
            return Buffer.from(text).toString('base64');
        } catch (error) {
            console.error('Error encrypting text:', error);
            throw error;
        }
    }

    /**
     * Decrypt Base64 encoded text
     * @param encryptedText - Base64 encoded string
     * @returns Decrypted text
     */
    public static decryptBase64(encryptedText: string): string {
        try {
            return Buffer.from(encryptedText, 'base64').toString('utf-8');
        } catch (error) {
            console.error('Error decrypting text:', error);
            throw error;
        }
    }
}
