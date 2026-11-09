import {
  CalendarCheck,
  Camera,
  CloudFog,
  Droplets,
  HeartPulse,
  House,
  Lock,
  MessageCircle,
  MoveHorizontal,
  Ruler,
  ShieldCheck,
  Sparkles,
  Unlink,
  Wallet,
  Wind,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/lib/landing-pages";

const ICONS: Record<IconName, LucideIcon> = {
  dust: Wind,
  allergy: HeartPulse,
  odor: CloudFog,
  stain: Droplets,
  wallet: Wallet,
  home: House,
  ruler: Ruler,
  wrench: Wrench,
  cord: Unlink,
  stuck: Lock,
  track: MoveHorizontal,
  shield: ShieldCheck,
  camera: Camera,
  chat: MessageCircle,
  calendar: CalendarCheck,
  sparkles: Sparkles,
};

export function LpIcon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Icon = ICONS[name];
  return <Icon aria-hidden="true" className={className} />;
}
