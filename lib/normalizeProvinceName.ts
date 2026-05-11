export const normalizeProvinceName = (str: string) => {
  if (!str) return "";

  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accent
    .replace(/[–—]/g, "-") // unify dash
    .replace(/[`’']/g, "") // remove apostrophe entirely
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "") // 🔥 remove all non-alphanumeric
    .trim();
};
