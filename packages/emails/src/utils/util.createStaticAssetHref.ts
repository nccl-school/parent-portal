export function createStaticAssetHref(path: string) {
  const root = process.env.NCCL_APP_URL;
  return `${root}/${path}`;
}
