import type { TablerIconsProps } from "@tabler/icons-react";

interface UserDashboardLink<T> {
  path: string;
  label: T;
  icon: (props: TablerIconsProps) => JSX.Element;
}

export type { UserDashboardLink };
