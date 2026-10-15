---
name: Forma
description: Catálogo fotográfico de cuidados com revisão de solicitação pelo WhatsApp.
colors:
  ink: "#193b32"
  green: "#205e4c"
  mint: "#dcece4"
  paper: "#f8f9f5"
  muted: "#52665e"
  line: "#dce3db"
  white: "#ffffff"
  green-hover: "#143f32"
  focus: "#499e85"
typography:
  display:
    fontFamily: "Bodoni, Georgia, serif"
    fontSize: "clamp(42px,4.9vw,68px)"
    fontWeight: 400
    lineHeight: 1.03
    letterSpacing: "-.035em"
  headline:
    fontFamily: "Bodoni, Georgia, serif"
    fontSize: "34px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-.025em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "14px"
  title:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 750
  label:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 650
rounded:
  surface: "16px"
  button: "8px"
  input: "7px"
  filter: "24px"
spacing:
  card: "18px"
  grid: "24px"
  summary: "24px"
  desktop-gutter: "48px"
  mobile-gutter: "18px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: "0 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.green-hover}"
  button-add:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.green}"
    rounded: "{rounded.input}"
    padding: "9px 10px"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.input}"
    padding: "12px"
  filter:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.filter}"
    padding: "11px 16px"
  service-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
---

# Design System: Forma

## Overview

**Creative North Star: "Estúdio botânico contemporâneo"**

Verde profundo, menta e marfim criam uma experiência acolhedora e contida. A tipografia editorial acompanha fotografias de cuidados; textos e controles permanecem precisos e legíveis.

A seleção mantém preço e duração visíveis, com resumo persistente e revisão antes de abrir o WhatsApp. A identidade pertence a uma demonstração fictícia; não sugere equipe, disponibilidade ou reservas reais.

**Key Characteristics:**
- Fotografia como orientação do catálogo.
- Bodoni Moda editorial e Manrope funcional.
- Superfícies claras, verde sólido e bordas suaves.

## Colors

### Primary

Verde profundo (`green`) conduz ações e seleção; tinta verde (`ink`) sustenta texto e identidade. O estado de hover usa `green-hover`, e o foco usa `focus`.

### Secondary

Menta (`mint`) distingue ações secundárias, revisão da mensagem e detalhes de apoio.

### Neutral

Marfim (`paper`) forma o fundo; branco (`white`) destaca cartões e campos. `muted` reserva-se ao texto auxiliar e `line` às divisórias.

## Typography

Bodoni Moda é servida localmente como família CSS `Bodoni`, com arquivos normal e itálico e fallback Georgia. Manrope local usa Arial como fallback. O itálico marca a última linha do título principal.

A hierarquia normativa está no frontmatter. No celular, títulos de seção passam a (27px); o título principal usa (42px), com (44px) entre 371–600px e (45px) até 370px. Não aplicar o tamanho base do corpo aos controles: rótulos e metadados usam a escala compacta observada no CSS.

## Layout

Contêiner central com largura máxima (1320px), incluindo margens internas de (48px). O hero divide texto e fotografia em (44% / 56%). Catálogo desktop usa duas colunas de cartões e resumo lateral de (285px), com intervalo (30px); o resumo acompanha a rolagem a (24px) do topo.

Em até (1050px), margens laterais passam a (28px), resumo a (255px) e intervalo a (22px). Em até (760px), navegação textual e resumo lateral desaparecem; margens do conteúdo passam a (18px), e uma barra inferior fixa mostra contagem, total e continuidade, respeitando a área segura. O rodapé reserva (120px) inferiores. Catálogo e hero tornam-se uma coluna até (600px); entre (601px) e (760px), conservam composição lado a lado. Revisão passa de duas colunas para uma até (760px).

## Elevation & Depth

Superfícies são planas, sem sombras. Bordas finas, diferenças de tom e fotografia estabelecem profundidade. Legenda sobre a fotografia usa fundo verde translúcido e desfoque (12px); barra móvel usa marfim translúcido e desfoque (16px). O diálogo cobre a tela com véu verde escuro.

## Shapes

Superfícies principais arredondadas usam `surface`; ações usam `button`, campos e adição usam `input`. Filtros são pílulas. Emblemas e controles de fechar são circulares. Fotografias ocupam toda a largura e recortam por `object-fit: cover`, sem distorção.

## Components

- **Ação principal:** verde sólido, texto branco, altura mínima (48px); hover escurece. Desabilitada usa opacidade (.45) e cursor de indisponibilidade.
- **Adicionar:** menta e verde; ao selecionar, inverte para verde e branco, com marca de confirmação e texto “Adicionado”.
- **Filtros:** fundo transparente; hover menta; ativo verde e branco. A categoria ativa também expõe `aria-pressed`.
- **Cartão de serviço:** foto, categoria, nome, duração, descrição, preço e adição. Selecionado recebe borda verde e selo textual com marca de confirmação. Foto desktop tem altura (180px), ampliada para (210px) a partir de (1400px); entre 371–600px usa (215px).
- **Campos:** revisão usa fundo branco, borda discreta e altura mínima (44px); no celular, fonte (16px). Busca usa sublinhado em vez de caixa.
- **Navegação:** links compactos, hover verde; marca editorial e chamada sublinhada. Navegação textual é ocultada até (760px).
- **Resumo e revisão:** total estimado e duração acompanham a seleção. Revisão apresenta preferências e mensagem completa; não representa disponibilidade confirmada. Diálogo fecha com Escape, contém o foco e o devolve ao controle anterior.

Foco de teclado: contorno verde (3px), afastado (4px). Mudanças de cor duram (.2s). Preferência por movimento reduzido desliga transições e rolagem suave.

## Do's and Don'ts

### Do:
- Do manter títulos em Bodoni Moda e controles em Manrope locais.
- Do mostrar seleção por texto, ícone e cor.
- Do preservar revisão da mensagem e confirmação humana.

### Don't:
- Don't substituir fotos por ilustrações decorativas.
- Don't tratar solicitação como reserva confirmada.
- Don't introduzir sombras em cartões planos.

