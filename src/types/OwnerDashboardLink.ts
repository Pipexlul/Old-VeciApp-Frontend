import type { TablerIconsProps } from "@tabler/icons-react";

interface OwnerDashboardLink<T> {
  path: string;
  label: T;
  icon: (props: TablerIconsProps) => JSX.Element;
}

export type { OwnerDashboardLink };
