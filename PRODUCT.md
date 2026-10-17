# Forma — Salão Feminino
<!-- impeccable:product-schema 1 -->
## Platform
web
## Stack
Next.js, React, TypeScript e Tailwind, publicados no Vercel.
## Users
Clientes de salão feminino; demonstração comercial para potenciais clientes de Marcelo Andrade.
## Product Purpose
Selecionar serviços e reservar um horário de demonstração no próprio navegador.
## Capabilities and Constraints
Uma atendente. Marca, catálogo, preços e duração fictícios. Agenda de 60 dias em America/Sao_Paulo, domingo fechado e pausa de almoço. Reservas bloqueiam todos os intervalos sobrepostos à duração total dos serviços. Nome, telefone, rascunho e reservas persistem em localStorage. A confirmação só ocorre após a gravação bem-sucedida. Reservas podem ser consultadas e canceladas. Abas do mesmo navegador recebem atualizações de reservas; Web Locks serializa gravações quando disponível.
## Operating Context
Rotas: /, /servicos, /agenda, /revisao, /confirmacao, /reservas, /sobre e /como-funciona. Dados mantidos ao navegar e recarregar. Sem WhatsApp, Evolution API, servidor de reservas, pagamentos ou sincronização entre dispositivos. Limpar os dados do site remove as reservas locais. O salão não recebe notificações.
## Brand Commitments
Salão feminino com uma única atendente; identidade Forma em verde, menta e marfim, conteúdo centralizado e fotos ilustrativas.
## Product Principles
Priorizar o celular; mostrar total e duração antes de reservar; distinguir reserva local de atendimento real; preservar os outros projetos.
