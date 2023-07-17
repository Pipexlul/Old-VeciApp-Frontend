import type { NavLinksConfig, LinkData } from "../types/NavLinksConfig";

const publicLinks: LinkData[] = [
  {
    href: "/home",
    label: "Home",
  },
  {
    href: "/features",
    label: "Caracteristicas",
  },
  {
    href: "/contact",
    label: "Contacto",
  },
];

const privateLinks: LinkData[] = [];

const config: NavLinksConfig = {
  publicLinks,
  privateLinks,
};

export default config;
