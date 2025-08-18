export function getNameInitials(fullName: string): string {
  if (!fullName.trim()) return "";

  return fullName
    .trim()
    .split(/\s+/) // Split on one or more spaces
    .map((name) => name[0].toUpperCase()) // Take first letter of each part
    .join("");
}
