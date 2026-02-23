# Guia de Configuração - Google Search Console e Google Meu Negócio

## 📍 Google Meu Negócio (Google Business Profile)

### Passos para configurar:

1. **Acesse:** https://business.google.com/
2. **Clique em** "Gerenciar seu perfil"
3. **Faça login** com sua conta Google
4. **Clique em** "Criar negócio" ou "Adicionar local"
5. **Preencha os dados:**
   - Nome: SR Decorações
   - Categoria: Serviço de Limpeza / Decoração Interior
   - Endereço: Seu endereço completo
   - Telefone: Seu número WhatsApp
   - Site: https://srdecoracoess.com
   - Horário de funcionamento
   - Descrição: "Especialistas em lavagem profissional, manutenção especializada e venda de persianas e cortinas. Lavagem e reforma de sofás. Instalação de carpete, paviflex e redes de proteção."

6. **Adicione fotos:**
   - Logo da empresa
   - Fotos dos serviços
   - Fotos do time
   - Fotos de antes e depois

7. **Adicione os serviços:**
   - Clique em "Serviços"
   - Clique em "Adicionar serviço"
   - Para cada um dos serviços:
     - Lavagem de Persianas e Cortinas
     - Manutenção de Persianas e Cortinas
     - Venda de Persianas e Cortinas
     - Lavagem de Sofás
     - Reforma de Sofás
     - Instalação de Pisos
     - Redes de Proteção

8. **Solicite respostas de clientes** (Reviews)

---

## 🔍 Google Search Console

### Passos para configurar:

1. **Acesse:** https://search.google.com/search-console
2. **Adicione sua propriedade:**
   - Clique em "Adicionar propriedade"
   - Digite: https://srdecoracoess.com

3. **Verifique o domínio:**
   - Escolha o método: **Meta tag HTML** (mais fácil)
   - Copie a meta tag fornecida
   - Adicione em `app/layout.tsx` (já adicionamos o placeholder)
   - Abra o arquivo `c:/Labs/sr-decoracoes/app/layout.tsx`
   - Procure por: `"seu-google-site-verification-aqui"`
   - Substitua pelo código do Google

4. **Envie o Sitemap:**
   - No Search Console, vá em "Sitemaps"
   - Clique em "Adicionar novo sitemap"
   - Digite: `https://srdecoracoess.com/sitemap.xml`
   - Clique em "Enviar"

5. **Configure URLs canonicalizadas:**
   - Vá em "Configurações"
   - Defina: https://srdecoracoess.com como URL preferida

6. **Monitore performance:**
   - Verifique em "Performance" quais palavras-chave estão ranqueando
   - Analise cliques, impressões e posição média

---

## 📢 Estratégia de Palavras-chave por Serviço

### Lavagem de Persianas e Cortinas

- "lavagem de persianas são paulo"
- "limpeza de persianas profissional"
- "higienização de cortinas"
- "remover ácaros de persianas"

### Manutenção de Persianas e Cortinas

- "conserto de persianas"
- "manutenção de cortinas são paulo"
- "troca de peças de persianas"

### Venda de Persianas e Cortinas

- "venda de persianas são paulo"
- "comprar cortinas"
- "instalação de persianas"

### Lavagem de Sofás

- "lavagem de sofás são paulo"
- "limpeza de sofás profissional"
- "remover mancha de sofá"

### Reforma de Sofás

- "reforma de sofás"
- "estofamento de sofás"
- "troca de tecido sofá"

### Instalação de Pisos

- "instalação de carpete são paulo"
- "instalação de paviflex"
- "colocar carpete em casa"

### Redes de Proteção

- "redes de proteção infantil"
- "proteção de janela são paulo"
- "rede de proteção para pets"

---

## 🎯 Campanhas Google Ads

### Estrutura recomendada por serviço:

**Campanha 1: Lavagem**

- Grupo de Ads: "Lavagem de Persianas"
- Palavras-chave: "lavagem persianas são paulo", "limpeza persianas", "higienização persianas"
- Anúncio direcionado para: `/servicos/lavagem-persianas-cortinas`

**Campanha 2: Manutenção**

- Grupo de Ads: "Manutenção de Persianas"
- Palavras-chave: "conserto persianas", "manutenção persianas", "reparo cortinas"
- Anúncio direcionado para: `/servicos/manutencao-persianas-cortinas`

(Repita para cada serviço)

---

## 📊 URLs para Monitoramento

Acompanhe o desempenho dessas URLs específicas:

- Homepage: https://srdecoracoess.com/
- Lavagem de Persianas: https://srdecoracoess.com/servicos/lavagem-persianas-cortinas
- Manutenção: https://srdecoracoess.com/servicos/manutencao-persianas-cortinas
- Venda: https://srdecoracoess.com/servicos/venda-persianas-cortinas
- Lavagem de Sofás: https://srdecoracoess.com/servicos/lavagem-sofas
- Reforma de Sofás: https://srdecoracoess.com/servicos/reforma-sofas
- Instalação de Pisos: https://srdecoracoess.com/servicos/instalacao-pisos
- Redes de Proteção: https://srdecoracoess.com/servicos/redes-de-protecao

---

## ✅ Checklist de SEO

- [x] Meta tags com keywords e descrições
- [x] Structured Data (Schema.org)
- [x] Open Graph tags (redes sociais)
- [x] Sitemap XML dinâmico
- [x] Robots.txt configurado
- [x] Breadcrumbs com Schema
- [ ] Verificação Google Search Console (você faz)
- [ ] Envio de Sitemap (você faz)
- [ ] Configuração Google Meu Negócio (você faz)
- [ ] Adicionar fotos ao Google Business Profile (você faz)
- [ ] Campanha Google Ads (você configura)

---

## 💡 Dicas Extras

1. **Alterar domínio:** Substitua "srdecoracoess.com" por seu domínio real em:
   - `lib/seo.ts` (várias linhas)
   - `app/layout.tsx`
   - `public/robots.txt`

2. **Adicionar telefone correto:**
   - Busque "+5511999999999" nos arquivos
   - Substitua pelo seu número WhatsApp real

3. **Adicionar endereço real:**
   - Busque "Sua rua e número" em `app/layout.tsx`
   - Complete com o endereço da empresa

4. **Validar Schema.org:**
   - Teste em: https://schema.org/validator/

5. **Testar SEO:**
   - Google Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
   - Google PageSpeed Insights: https://pagespeed.web.dev/
   - GTmetrix: https://gtmetrix.com/

---

**Este guia foi criado para maximizar sua visibilidade no Google e gerar conversões via WhatsApp!** 🚀
