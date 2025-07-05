"use client";

import classNames from "classnames";
import { Minus, Gauge, Activity, Flame } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface PriorityStyle {
  bg: string;
  text: string;
  icon: LucideIcon;
  iconColor: string;
}

const priorityStyles: Record<string, PriorityStyle> = {
  low: {
    bg: "bg-green-100",
    text: "text-green-800",
    icon: Gauge,
    iconColor: "text-green-700",
  },
  medium: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    icon: Activity,
    iconColor: "text-yellow-700",
  },
  high: {
    bg: "bg-red-100",
    text: "text-red-800",
    icon: Flame,
    iconColor: "text-red-700",
  },
};


interface PriorityBadgeProps {
  priority: string;
}

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  const key = priority.toLowerCase();
  const style = priorityStyles[key] || {
    bg: "bg-gray-100",
    text: "text-gray-800",
    icon: Minus,
    iconColor: "text-gray-600",
  };

  const Icon = style.icon;

  return (
    <span className={classNames("px-3 py-1 tracking-wide rounded-full text-[10px] font-medium inline-flex items-center gap-1", style.bg, style.text )}>
      <Icon size={10} className={style.iconColor} />
      {priority}
    </span>
  );
}
