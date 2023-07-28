import type { PassRequirement } from "../types/PassRequirement";

const requirements: PassRequirement[] = [
  { re: /[0-9]/, label: "Debe incluir al menos un número" },
  { re: /[a-z]/, label: "Debe incluir al menos una letra minuscula" },
  { re: /[A-Z]/, label: "Debe incluir al menos una letra mayuscula" },
  {
    re: /[$&+,:;=?@#|'<>.^*()%!-]/,
    label: "Debe contener al menos un caracter especial",
  },
];

// TODO: Dynamically check password length
const getStrength = (password: string): number => {
  let multiplier = password.length > 7 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 5);
};

const getColorByStrength = (strength: number): string => {
  // eslint-disable-next-line no-nested-ternary
  return strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";
};

export { requirements, getStrength, getColorByStrength };
