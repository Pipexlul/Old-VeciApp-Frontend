interface LinkData {
  href: string;
  label: string;
}

interface NavLinksConfig {
  publicLinks: LinkData[];
  privateLinks: LinkData[];
}

export type { NavLinksConfig, LinkData };
