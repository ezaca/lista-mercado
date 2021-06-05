# Lista do Mercado

*This application is available in Portuguese (Brazil). There is nothing that
 prevents its translation, but I will not focus on it for a while.*

Aplicativo para criar e utilizar lista de compras do mercado em seu celular,
quando for ao mercado. Este aplicativo foca em compras recorrentes, como comida
e itens para a casa. Pense nele como um bloco de notas, mas com um contexto
específico.

[Acesse o site](https://ezaca.github.io/lista-mercado/) (recomenda-se acesso por celular)

:warning: **ATENÇÃO: O aplicativo é melhor visto em celulares e tablets. Pode
 parecer estranho na tela de um computador.**

## Motivação

Eu utilizo um bloco de anotações básico no celular para controlar as minhas
compras, mas sinto falta de ter um pouco mais de controle sobre o histórico do
que já comprei e quanto custou. Guardo as notas fiscais, mas você já viu uma
caixa cheia delas? Não é algo exatamente motivador.

Então decidi aproveitar meu tempo de folga e um pouco do meu conhecimento de
programação para internet, de forma a fazer isto. Você pode perceber que é um
aplicativo bastante informal, não utiliza nenhuma técnica, framework ou sequer
é otimizado. Isto porque não pretendo estendê-lo demais, e o estado atual
atende bem o propósito. Eu também não quis configurar um ambiente de
desenvolvimento adequado apenas por causa dele. Por isso, seja bem-vindo,
só "não repare na bagunça".

## Situação Atual

O aplicativo não possui todas as suas funções ainda, e provavelmente demore mais
algumas semanas para isso. Por enquanto, você será capaz de criar uma lista e
marcar itens já comprados, mas não haverá histórico de preços, nem de compras
anteriores.

Neste momento, o aplicativo requer internet para ser carregado. Os dados são
armazenados apenas localmente e estão sujeitos ao limite de armazenamento
imposto pelo navegador. Nenhuma informação é enviada a servidores, isso
significa que cada navegador terá sua própria versão de dados local, e não
há *backup* dos dados. Além disso, o site utiliza recursos de terceiros por
meio de CDN.

Ainda não há tutorial ou tela de ajuda rápida exibindo como o aplicativo
funciona. Abra o site na página do aplicativo e digite a lista, onde cada linha
representa um item. No menu lateral há uma calculadora de preços para ajudar
com as multiplicações e divisões. Isto é tudo, por hora.

Feito:
- [X] Interface gráfica própria.
- [X] Tela inicial e editor da lista.
- [X] Recuperação de dados para o uso.
- [X] Manter a lista após sair do site ou fechar o aplicativo.

Pendências:

- [ ] Converter o aplicativo em um aplicativo (PWA), com funcionamento offline.
- [ ] Armazenar um histórico de compras anteriores finalizadas.
- [ ] Armazenar o número de vezes que um item foi comprado e o último preço pago.
- [ ] Permitir personalizar os emojis.
- [ ] Criar a possibilidade de backup de dados.
