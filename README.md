# SR Decorações

> Plataforma digital completa para prestação de serviços de decoração, limpeza profissional e reformas residenciais

**SR Decorações** é uma plataforma moderna e responsiva desenvolvida para divulgar e facilitar a contratação de serviços especializados em persianas, cortinas, sofás, pisos e redes de proteção. Com mais de 10 anos de experiência, a SR Decorações oferece soluções de qualidade para transformar espaços.

---

## 🌐 Demonstração

Acesse a aplicação online:  
👉 **[SR Decorações](https://sr-decoracoes.vercel.app/)**

---

## ✨ Características Principais

- ✅ **Landing Page Profissional**: Apresentação elegante da empresa e serviços
- ✅ **7 Serviços Especializados**: Páginas dedicadas para cada tipo de serviço
- ✅ **Integração WhatsApp**: CTA inteligente para contato direto com clientes
- ✅ **SEO Otimizado**: Estrutura preparada para melhor visibilidade nos buscadores
- ✅ **Design Responsivo**: Interface adaptada para desktop, tablet e mobile
- ✅ **Tema Claro/Escuro**: Modo visual configurável conforme preferência do usuário
- ✅ **Performance Otimizada**: Carregamento rápido com otimizações de imagem
- ✅ **Componentes Reutilizáveis**: Arquitetura escalável e fácil manutenção

---

## 🚀 Tecnologias Utilizadas

### Frontend

- **Next.js 16** (App Router com TypeScript)
- **React 19** - Interface de usuário moderna
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Estilização utilitária e responsiva
- **shadcn/ui** - Componentes UI acessíveis e personalizáveis
- **Radix UI** - Primitivos de UI com acessibilidade incorporada

### Ferramentas & Bibliotecas

- **Lucide React** - Ícones vetoriais elegantes
- **next-themes** - Gerenciamento de temas (claro/escuro)
- **date-fns** - Manipulação de datas
- **class-variance-authority** - Gerenciamento de variantes CSS
- **pnpm** - Gerenciador de pacotes rápido e eficiente

### Desenvolvimento

- **Turbopack** - Build system ultra-rápido integrado ao Next.js
- **PostCSS** - Transformações CSS avançadas
- **Autoprefixer** - Compatibilidade entre navegadores

---

## 📁 Estrutura do Projeto

```
sr-decoracoes/
├── app/                          # Aplicação Next.js App Router
│   ├── page.tsx                  # Página inicial
│   ├── layout.tsx                # Layout principal
│   ├── globals.css               # Estilos globais
│   └── servicos/                 # Páginas de serviços
│       ├── instalacao-pisos/
│       ├── lavagem-persianas-cortinas/
│       ├── lavagem-sofas/
│       ├── manutencao-persianas-cortinas/
│       ├── redes-de-protecao/
│       ├── reforma-sofas/
│       └── venda-persianas-cortinas/
│
├── components/                   # Componentes React reutilizáveis
│   ├── header.tsx                # Cabeçalho/navegação
│   ├── hero-section.tsx          # Seção hero da página inicial
│   ├── services-section.tsx      # Grade de serviços
│   ├── benefits-section.tsx      # Benefícios e diferenciais
│   ├── how-it-works.tsx          # Como funciona
│   ├── testimonials-section.tsx  # Depoimentos de clientes
│   ├── faq-section.tsx           # Perguntas frequentes
│   ├── cta-section.tsx           # Call-to-action final
│   ├── footer.tsx                # Rodapé
│   ├── whatsapp-button.tsx       # Botão flutuante WhatsApp
│   ├── service-page-layout.tsx   # Layout para páginas de serviços
│   ├── theme-provider.tsx        # Provedor de tema
│   └── ui/                       # Componentes shadcn/ui
│       └── (30+ componentes de UI reutilizáveis)
│
├── lib/                          # Funções utilitárias
│   └── utils.ts                  # Utilidades (cn, classnames, etc)
│
├── hooks/                        # Hooks React customizados
│   ├── use-mobile.tsx            # Detectar viewport mobile
│   └── use-toast.ts              # Sistema de notificações
│
├── styles/                       # Estilos globais
│   └── globals.css               # CSS global e tema
│
├── public/                       # Arquivos estáticos
│   └── images/                   # Imagens do projeto
│
└── Arquivos de Configuração
    ├── next.config.mjs           # Configuração Next.js
    ├── tailwind.config.ts        # Configuração Tailwind CSS
    ├── tsconfig.json             # Configuração TypeScript
    ├── postcss.config.mjs        # Configuração PostCSS
    ├── components.json           # Configuração shadcn/ui
    ├── package.json              # Dependências e scripts
    └── pnpm-lock.yaml            # Lock file de dependências
```

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js 18+** - [Download](https://nodejs.org/)
- **pnpm 8+** - Gerenciador de pacotes (ou use npm/yarn)
- **Git** - Para clonar o repositório

---

## 🛠️ Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/sr-decoracoes.git
cd sr-decoracoes
```

### 2. Instale as dependências

Usando **pnpm** (recomendado):

```bash
pnpm install
```

Ou usando npm:

```bash
npm install
```

Ou usando yarn:

```bash
yarn install
```

### 3. Inicie o servidor de desenvolvimento

```bash
pnpm dev
```

Ou:

```bash
npm run dev
# ou
yarn dev
```

O servidor estará disponível em [http://localhost:3000](http://localhost:3000)

---

## 📝 Scripts Disponíveis

| Comando      | Descrição                                        |
| ------------ | ------------------------------------------------ |
| `pnpm dev`   | Inicia servidor de desenvolvimento com Turbopack |
| `pnpm build` | Cria build otimizado para produção               |
| `pnpm start` | Inicia servidor em modo produção                 |
| `pnpm lint`  | Executa verificação de linting (ESLint)          |

---

## 🎨 Customização

### Configurar Cores e Tema

Edite o arquivo `tailwind.config.ts` para customizar paleta de cores:

```typescript
extend: {
  colors: {
    primary: "#seu-cor",
    secondary: "#sua-cor",
    // ...
  }
}
```

### Adicionar Novos Serviços

1. Crie uma nova pasta em `app/servicos/seu-servico/`
2. Adicione um arquivo `page.tsx` com o conteúdo
3. Use o componente `ServicePageLayout` para manter consistência visual
4. Adicione o serviço ao array de serviços em `components/services-section.tsx`

### Modificar Conteúdo

- **Textos e descrições**: Edite diretamente nos componentes
- **Imagens**: Substitua os arquivos em `public/images/`
- **Informações de contato**: Atualize dados no `footer.tsx` e `whatsapp-button.tsx`

---

## 🚢 Deploy

### Deploy na Vercel (Recomendado)

A forma mais simples de fazer deploy é usar a [Vercel](https://vercel.com):

1. Push seu código para um repositório GitHub
2. Acesse [https://vercel.com/new](https://vercel.com/new)
3. Importe o repositório
4. Clique em Deploy

A aplicação será automaticamente compilada e publicada.

### Deploy em Outros Serviços

**Netlify:**

```bash
pnpm build
# Faça upload da pasta .next e public
```

**Docker:**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

---

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints Tailwind:

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md/lg)
- **Desktop**: > 1024px (xl/2xl)

Todos os componentes foram testados e otimizados para cada dispositivo.

---

## ♿ Acessibilidade

- Componentes construídos com **Radix UI** para acessibilidade nativa
- Suporte a **leitores de tela**
- Navegação por **teclado** em todos os elementos interativos
- Contraste adequado entre cores
- Semântica HTML correta

---

## 🔍 SEO

A aplicação está preparada para SEO:

- Metadados dinâmicos por página
- URLs amigáveis e estruturadas
- Open Graph meta tags para redes sociais
- Sitemap automático
- Estrutura heading (H1, H2, H3) correta

---

## 📞 Integração WhatsApp

O projeto inclui integração WhatsApp com:

- ✅ Botão flutuante fixo na tela
- ✅ Múltiplos CTAs estratégicos na página
- ✅ Mensagens pré-configuráveis por serviço
- ✅ Tracking de cliques para análise

Atualize o número de telefone em `components/whatsapp-button.tsx`

---

## 🐛 Troubleshooting

### Porta 3000 já está em uso

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Erro ao instalar dependências

```bash
# Limpe cache e reinstale
pnpm install --force
# ou
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Build falha em produção

Verifique se todas as variáveis de ambiente estão configuradas (se houver).

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um **fork** do projeto
2. Crie uma **branch** para sua feature: `git checkout -b feature/minha-feature`
3. **Commit** suas mudanças: `git commit -m 'feat: adicionar minha feature'`
4. **Push** para a branch: `git push origin feature/minha-feature`
5. Abra um **Pull Request**

### Padrões de Commit

Usamos **Conventional Commits**:

- `feat: ` - Nova feature
- `fix: ` - Correção de bug
- `docs: ` - Alterações em documentação
- `style: ` - Formatação de código
- `refactor: ` - Refatoração sem mudanças de funcionalidade
- `perf: ` - Melhoria de performance
- `test: ` - Adição de testes

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.

---

## 📧 Suporte e Contato

- 📞 **WhatsApp**: [Envie uma mensagem](https://wa.me/5511999999999)
- 📧 **Email**: contato@srdecoracoes.com.br
- 🌐 **Website**: [sr-decoracoes.vercel.app](https://sr-decoracoes.vercel.app)

---

## 👨‍💻 Autor

Desenvolvido com ❤️ por [Seu Nome/Equipe]

---

## 📚 Recursos Úteis

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Radix UI](https://www.radix-ui.com)

---

**Última atualização**: Fevereiro de 2026
