export function ifUserIsOwner(currentUserId: number, assetUserId: number): boolean {
  if (currentUserId === assetUserId) {
    return true;
  }
  return false;
}
