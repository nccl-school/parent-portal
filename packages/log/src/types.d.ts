declare global {
  interface Window {
    __NCCL_LOGS__: Logger;
  }
}
export {};
