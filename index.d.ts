import { Sharp } from "sharp";

export declare interface ImageData {
  data: Buffer;
  height: number;
  width: number;
}

export declare interface OutputInfo {
  height: number;
  width: number;
  size: number;
}

/**
 * Decode BMP
 */
export declare function decode(buffer: Buffer): ImageData;

/**
 * Encode BMP
 */
export declare function encode(bitmap: ImageData): ImageData;

/**
 * Create an instance of sharp from a BMP image
 */
export declare function sharpFromBmp(input: string): Sharp;

/**
 * Write output image data to a BMP file
 */
export declare function sharpToBmp(
  image: Sharp,
  fileOut: string
): Promise<OutputInfo>;
