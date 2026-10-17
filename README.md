# Forma — Salão Feminino

Demonstração com Next.js, React, TypeScript e Tailwind CSS. Site: https://projeto-03-agendamento-online.vercel.app/

## Executar e verificar
`npm install`, `npm run dev`. Para produção: `npm run build`, `npm start`. Verificação de tipos: `npm run typecheck`.

## Reservas locais
A cliente escolhe serviços, data e horário, informa nome e telefone e clica em Reservar horário. A reserva é gravada no localStorage antes da confirmação. O período inteiro fica indisponível para outros horários neste navegador. Minhas reservas permite consultar e cancelar, liberando o período novamente.

Chaves: forma.reservations.v1 e forma.draft.v1. Rascunho e reservas são restaurados após recarregar. Eventos storage atualizam outras abas; Web Locks serializa as gravações quando suportado. A gravação relê o armazenamento e revalida disponibilidade. Falha ao salvar não confirma reserva.

## Limites da demonstração
Marca, serviços, preços e horários-base fictícios. Não envia WhatsApp, não notifica o salão e não sincroniza entre dispositivos. Limpar os dados do site remove as reservas locais. Evolution API ainda não integrada. Fotografias e fontes têm créditos em public/creditos.html e public/fonts.

## Rotas
/, /servicos, /agenda, /revisao, /confirmacao, /reservas, /sobre, /como-funciona.
