import sharp from "sharp";
import z from "zod/v4";

export const CropSchema = z.object({
  file: z.file(),
  x: z.coerce.number(),
  y: z.coerce.number(),
  width: z.coerce.number(),
  height: z.coerce.number(),
});

export async function crop(args: z.infer<typeof CropSchema>) {
  const options = CropSchema.safeParse(args);
  if (!options.success) {
    const errors = z.prettifyError(options.error);
    throw new Error(errors);
  }
  const { file, ...cropData } = options.data;

  const arrayBuffer = await file.arrayBuffer();
  const originalBuffer = Buffer.from(arrayBuffer);

  const croppedBuffer = await sharp(originalBuffer)
    .extract({
      left: cropData.x,
      top: cropData.y,
      width: cropData.width,
      height: cropData.height,
    })
    .png()
    .toBuffer();

  return { croppedBuffer, originalBuffer };
}
