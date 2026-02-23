import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="breadcrumb"
      className="flex items-center gap-1 px-4 py-2 text-sm text-muted-foreground lg:px-8"
    >
      <Link href="/" className="hover:text-primary">
        Início
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          <ChevronRight className="h-4 w-4" />
          {item.href ? (
            <Link href={item.href} className="hover:text-primary">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schemaItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Início",
      item: "https://srdecoracoess.com/",
    },
    ...items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: item.label,
      item: item.href ? `https://srdecoracoess.com${item.href}` : undefined,
    })),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: schemaItems.filter((item) => item.item),
  };
}
