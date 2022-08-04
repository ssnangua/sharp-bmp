import { Sharp, SharpOptions } from "sharp";

/**
 * ABGR Buffer
 */
export declare type BmpBuffer = Buffer;

/**
 * RGBA Buffer
 */
export declare type SharpBuffer = Buffer;

export declare interface ImageData {
  fileSize: number;
  reserved: number;
  offset: number;
  headerSize: number;
  width: number;
  height: number;
  planes: number;
  bitPP: number;
  compress: number;
  rawSize: number;
  hr: number;
  vr: number;
  colors: number;
  importantColors: number;
  is_with_alpha: Boolean;
  buffer: BmpBuffer;
  data: SharpBuffer;
  image?: Sharp;
}

export declare interface EncodeInput {
  data: SharpBuffer;
  width: number;
  height: number;
}

export declare interface EncodeOutput {
  data: BmpBuffer;
  width: number;
  height: number;
}

export declare interface OutputInfo {
  width: number;
  height: number;
  size: number;
}

/**
 * Decode BMP
 */
export declare function decode(buffer: BmpBuffer): ImageData;

/**
 * Encode BMP
 */
export declare function encode(bitmap: EncodeInput): EncodeOutput;

/**
 * Create an instance of sharp from a BMP image
 */
export declare function sharpFromBmp(
  input: string | Buffer,
  options?: SharpOptions,
  resolveWithObject?: Boolean
): Sharp | ImageData;

/**
 * Write output image data to a BMP file
 */
export declare function sharpToBmp(
  image: Sharp,
  fileOut: string
): Promise<OutputInfo>;
