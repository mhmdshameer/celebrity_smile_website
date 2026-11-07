/** Title-cases a Latin name typed entirely in capitals ("DR SOHAIB SHAHED" → "Dr Sohaib Shahed"). */
export const formatDoctorName = (name: string): string => {
  if (!/[A-Z]/.test(name) || name !== name.toUpperCase()) return name;
  return name.toLowerCase().replace(/(^|[\s.-])([a-z])/g, (_, sep: string, ch: string) => sep + ch.toUpperCase());
};
