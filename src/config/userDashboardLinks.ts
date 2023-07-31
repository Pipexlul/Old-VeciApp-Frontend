import { IconHomeSearch, IconMail } from "@tabler/icons-react";

import type { UserDashboardLink } from "../types/UserDashboardLink";

type ConstUserDashboardLink<T> = ReadonlyArray<UserDashboardLink<T>>;

const makeConst = <T>(links: ConstUserDashboardLink<T>) => links;

const userDashboardData = makeConst([
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
] as const);

type UserLabels = (typeof userDashboardData)[number]["label"];

export type { UserLabels };
export { userDashboardData };
