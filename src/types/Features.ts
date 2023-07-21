import type { TablerIconsProps } from "@tabler/icons-react";

interface FeatureData {
  title: string;
  description: string;
  icon: (props: TablerIconsProps) => JSX.Element;
}

export type { FeatureData };
