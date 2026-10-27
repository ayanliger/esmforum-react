# ESM Forum: frontend do projeto final de ES1

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](src/pages/Pergunta.js) [![React 18](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](package.json) [![Bootstrap 5](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white)](package.json) [![Licença MIT](https://img.shields.io/badge/Licen%C3%A7a-MIT-3DA639?logo=opensourceinitiative&logoColor=white)](LICENSE)

Frontend da entrega concluída de Engenharia de Software 1 (FGV), derivado de [jeffsantos/esmforum-react](https://github.com/jeffsantos/esmforum-react). Utiliza-se a base didática do ESM Forum, do livro [Engenharia de Software Moderna](https://engsoftmoderna.info), com a interface de votação acrescentada durante a disciplina.

O [backend e a documentação da entrega](https://github.com/ayanliger/esmforum) ficam no repositório complementar. Ambos foram mantidos como registro do trabalho acadêmico.

## Contribuição da entrega

A página de perguntas exibe placares e botões de voto positivo e negativo. A resposta do backend atualiza a linha votada; a ordenação por placar é aplicada ao carregar a página novamente, evitando deslocar a pergunta durante a interação. Falhas de registro aparecem na própria interface.

A integração está em [src/pages/Pergunta.js](src/pages/Pergunta.js). Os votos usam o usuário fixo `1`, pois o sistema didático não implementa login. A identificação enviada ao servidor não constitui autenticação.

## Execução

Inicie primeiro o [backend desta entrega](https://github.com/ayanliger/esmforum), disponível em `http://localhost:5000`. O [guia de instalação](https://github.com/ayanliger/esmforum/blob/main/INSTALACAO.md) registra o ambiente Node.js utilizado no projeto.

Na raiz deste checkout:

```bash
npm install
npm start
```

O servidor de desenvolvimento abre em `http://localhost:3000`. O endereço do backend está definido nas chamadas de `fetch` dos componentes; frontend e backend precisam estar em execução para utilizar o fórum.

## Referências

As [decisões da votação](https://github.com/ayanliger/esmforum/blob/main/IMPLEMENTACAO_SOLID.md), os [diagramas](https://github.com/ayanliger/esmforum/blob/main/DIAGRAMAS_UML.md) e o [quadro Kanban](https://github.com/users/ayanliger/projects/3) complementam a implementação. Os créditos de Marco Tulio Valente foram preservados na [licença MIT](LICENSE).
