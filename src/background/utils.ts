export async function isExtensionEnabled(): Promise<boolean> {
  const result = await chrome.storage.session.get([__KEY_IS_ENABLED__]);
  return result[__KEY_IS_ENABLED__] ?? false;
}

export async function setExtensionEnabled(enabled: boolean): Promise<void> {
  await chrome.storage.session.set({ [__KEY_IS_ENABLED__]: enabled });
}
