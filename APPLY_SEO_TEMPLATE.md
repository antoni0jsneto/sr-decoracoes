# 📋 Template para Aplicar SEO em Outras Páginas

## Como replicar a otimização para as 6 páginas restantes

Já fizemos a otimização completa em:
- ✅ `app/servicos/lavagem-persianas-cortinas/page.tsx`

Faltam fazer:
- `app/servicos/manutencao-persianas-cortinas/page.tsx`
- `app/servicos/venda-persianas-cortinas/page.tsx`
- `app/servicos/lavagem-sofas/page.tsx`
- `app/servicos/reforma-sofas/page.tsx`
- `app/servicos/instalacao-pisos/page.tsx`
- `app/servicos/redes-de-protecao/page.tsx`

---

## 🔄 Passo a Passo (Repetir para cada página)

### 1. Abra a página (Exemplo: manutencao-persianas-cortinas/page.tsx)

### 2. Substitua o import no topo:

```tsx
// ❌ ANTES
import type { Metadata } from "next"
import { ServicePageLayout } from "@/components/service-page-layout"

export const metadata: Metadata = {
  title: "...",
  description: "...",
  // ... resto do metadata
}

const jsonLd = { ... }
```

```tsx
// ✅ DEPOIS
import type { Metadata } from "next"
import Script from "next/script"
import { ServicePageLayout } from "@/components/service-page-layout"
import { getServiceMetadata, serviceSchema } from "@/lib/seo"
import { Breadcrumbs, BreadcrumbSchema } from "@/components/breadcrumbs"

export const metadata: Metadata = getServiceMetadata("SLUG-DO-SERVICO")

const jsonLd = serviceSchema("SLUG-DO-SERVICO", {
  title: "...",
  description: "...",
  shortDescription: "...",
  keywords: [...],
  serviceType: "...",
})

const breadcrumbSchema = BreadcrumbSchema({
  items: [
    { label: "Serviços", href: "/#servicos" },
    { label: "NOME DO SERVICO" }
  ],
})
```

### 3. Substitua o export default:

```tsx
// ❌ ANTES
export default function Page() {
  return (
    <ServicePageLayout
      title="..."
      subtitle="..."
      description="..."
      heroImage="..."
      heroImageAlt="..."
      benefits={benefits}
      details={details}
      whatsappMessage="..."
      jsonLd={jsonLd}
    />
  )
}
```

```tsx
// ✅ DEPOIS
export default function Page() {
  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Breadcrumbs
        items={[
          { label: "Serviços", href: "/#servicos" },
          { label: "NOME DO SERVICO" }
        ]}
      />
      <ServicePageLayout
        title="..."
        subtitle="..."
        description="..."
        heroImage="..."
        heroImageAlt="..."
        benefits={benefits}
        details={details}
        whatsappMessage="..."
        jsonLd={jsonLd}
      />
    </>
  )
}
```

---

## 🔑 Valores para cada página

### Manutenção de Persianas e Cortinas
```
SLUG: "manutencao-persianas-cortinas"
NOME: "Manutenção de Persianas e Cortinas"
```

### Venda de Persianas e Cortinas
```
SLUG: "venda-persianas-cortinas"
NOME: "Venda de Persianas e Cortinas"
```

### Lavagem de Sofás
```
SLUG: "lavagem-sofas"
NOME: "Lavagem de Sofás"
```

### Reforma de Sofás
```
SLUG: "reforma-sofas"
NOME: "Reforma de Sofás"
```

### Instalação de Pisos
```
SLUG: "instalacao-pisos"
NOME: "Instalação de Pisos"
```

### Redes de Proteção
```
SLUG: "redes-de-protecao"
NOME: "Redes de Proteção"
```

---

## ✅ Checklist

Para cada página aplicada:
- [ ] Adicionado import de `getServiceMetadata` e `getServiceSchema`
- [ ] Adicionado import de `Breadcrumbs` e `BreadcrumbSchema`
- [ ] `export const metadata` usa `getServiceMetadata(slug)`
- [ ] `const jsonLd` usa `serviceSchema(slug, metadata)`
- [ ] `const breadcrumbSchema` está definido
- [ ] Componente renderiza `<Script>` com breadcrumb schema
- [ ] Componente renderiza `<Breadcrumbs>`
- [ ] Componente renderiza `<ServicePageLayout>`
- [ ] Testado no navegador (sem erros no console)

---

## 🎉 Resultado Final

Após aplicar em todas as 7 páginas:

✅ Cada página tem seu próprio metadata otimizado  
✅ Cada página tem seu schema.org estruturado  
✅ Cada página tem breadcrumbs funcionais  
✅ Seu site estará **100% otimizado para SEO**  

Quando alguém pesquisar no Google:
- "lavagem de persianas são paulo" → sua página aparece
- "conserto de persianas" → outra página aparece
- "reforma de sofás" → outra página aparece
- ... e assim por diante para todos os 7 serviços

**Isso = 7x mais oportunidades de aparecer no Google! 🚀**

---

## 📝 Valores já salvos em lib/seo.ts

Todos os dados de título, descrição e keywords já estão salvos em `lib/seo.ts`, então você só precisa referenciar pelo slug. Nada de repetir conteúdo!

Os valores estão em:
```typescript
const services: Record<string, ServiceMetadata> = {
  "lavagem-persianas-cortinas": { ... },
  "manutencao-persianas-cortinas": { ... },
  "venda-persianas-cortinas": { ... },
  "lavagem-sofas": { ... },
  "reforma-sofas": { ... },
  "instalacao-pisos": { ... },
  "redes-de-protecao": { ... },
}
```

---

## 🚀 Atalho: Fazer em 10 Minutos

1. Copie o código da página lavagem-persianas-cortinas
2. Cole nas 6 outras páginas
3. Substitua:
   - O slug (ex: "manutencao-persianas-cortinas")
   - O nome (ex: "Manutenção de Persianas e Cortinas")
4. Pronto! ✅

A lib/seo.ts já tem todos os dados, você só precisa referenciar.

