import {
  FileCheck2,
  HandHeart,
  ReceiptText,
  Store,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  "file-check": FileCheck2,
  store: Store,
  "hand-heart": HandHeart,
  receipt: ReceiptText,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? FileCheck2;
  return <Icon className={className} />;
}
