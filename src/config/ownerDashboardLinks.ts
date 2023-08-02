import {
  IconHomeSearch,
  IconMail,
  IconSettings,
  IconBasketFilled,
} from "@tabler/icons-react";

import type { OwnerDashboardLink } from "../types/OwnerDashboardLink";

type ConstOwnerDashboardLink<T> = ReadonlyArray<OwnerDashboardLink<T>>;

const makeConst = <T>(links: ConstOwnerDashboardLink<T>) => links;

const ownerDashboardData = makeConst([
  {
    path: ".",
    label: "Home",
    icon: IconHomeSearch,
  },
  {
    path: "./messages",
    label: "Mensajes",
    icon: IconMail,
  },
  {
    path: "./products",
    label: "Productos",
    icon: IconBasketFilled,
  },
  {
    path: "./settings",
    label: "Ajustes",
    icon: IconSettings,
  },
] as const);

type UserLabels = (typeof ownerDashboardData)[number]["label"];

export type { UserLabels };
export { ownerDashboardData };
