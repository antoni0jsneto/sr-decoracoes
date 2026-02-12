"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Quais serviços a SR Decorações realiza?",
    answer:
      "Realizamos lavagem, manutenção e venda de persianas e cortinas, lavagem e reforma de sofás, instalação de carpete e paviflex, e instalação de redes de proteção.",
  },
  {
    question: "Quanto tempo demora a lavagem de persianas?",
    answer:
      "O serviço de lavagem de persianas e cortinas é realizado com agilidade. O tempo médio para a lavagem é de 1 a 3 horas, dependendo da quantidade de peças. Devolvemos as persianas limpas e prontas para uso.",
  },
  {
    question: "Vocês atendem em toda São Paulo?",
    answer:
      "Sim! Atendemos residências e empresas em toda a Grande São Paulo, incluindo a capital e cidades da região metropolitana.",
  },
  {
    question: "Como faço para solicitar um orçamento?",
    answer:
      "Você pode solicitar um orçamento gratuitamente pelo nosso WhatsApp (11) 92424-0055. Basta enviar fotos dos produtos e detalhes do serviço desejado. Respondemos rapidamente!",
  },
  {
    question: "Quais formas de pagamento vocês aceitam?",
    answer:
      "Aceitamos diversas formas de pagamento incluindo PIX, dinheiro, cartão de débito e cartão de crédito. Consulte condições de parcelamento.",
  },
  {
    question: "A lavagem remove manchas e mau cheiro?",
    answer:
      "Sim, nossa lavagem profissional é eficaz na remoção de manchas e odores na maioria dos casos. Dependendo da intensidade e do tempo da mancha, fazemos o possível para remover ou amenizar significativamente.",
  },
]

export function FaqSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
            Dúvidas Frequentes
          </span>
          <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-balance">Perguntas Frequentes</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={`faq-${index}`} value={`faq-${index}`}>
              <AccordionTrigger className="text-left text-base font-semibold text-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
