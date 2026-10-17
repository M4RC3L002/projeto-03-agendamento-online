# Forma — Salão Feminino

Demonstração independente, feita com Next.js, React, TypeScript e Tailwind CSS. Nome, serviços, preços e durações fictícios.

## Executar
`npm install` e `npm run dev -- --port 3003`. Abrir http://127.0.0.1:3003.

## Validar
`npm run build` e `npm run typecheck`.

## Funcionalidades
Catálogo com fotos locais, categorias, busca sem acentos, seleção de múltiplos serviços, total e duração, data/horário preferidos e prévia copiável da mensagem. Para testar o WhatsApp, informar um destinatário autorizado com DDD. Não existe telefone real configurado nem confirmação automática de reserva. Dados do formulário ficam somente na memória da página.

## Design
Watermelon UI consultado (hero-11 como referência de hierarquia, não instalado literalmente). Impeccable orientou contraste, estados, responsividade e documentação. Fotografia Pexels, créditos em public/creditos.html. Não foi usado conteúdo de outros estabelecimentos.

## Publicação
Publicado em https://projeto-03-agendamento-online.vercel.app/ com Vercel. Repositório: https://github.com/M4RC3L002/projeto-03-agendamento-online. Este diretório não altera o portfólio.

## Calendário
Agenda demonstrativa de uma atendente com dias e horários selecionáveis, duração acumulada dos serviços, pausa de almoço e janela de 60 dias. Não representa disponibilidade real. Integração administrativa pelo WhatsApp/Evolution API ainda não implementada.

## Telas do aplicativo
Início /, serviços /servicos, calendário /agenda, revisão /revisao, sobre /sobre e como agendar /como-funciona. Navegação real com Next Link/Router e estado compartilhado em BookingProvider. As escolhas são mantidas ao voltar entre telas; um recarregamento reinicia o rascunho.
