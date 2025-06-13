export const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
      .trim()
      .replace(/-$/, "");
  }

  return digits
    .replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3")
    .trim()
    .replace(/-$/, "");
};

export const formatCEP = (value: string) => {
  return value
    .replace(/\D/g, "")
    .slice(0, 8)
    .replace(/^(\d{5})(\d{0,3})/, "$1-$2")
    .replace(/-$/, "");
};
