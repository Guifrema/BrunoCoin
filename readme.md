
# Relatório do Trabalho de Sistemas Distribuídos: Implementação de um Token na Ethereum Virtual Machine

## Introdução

Este trabalho teve como objetivo aplicar conceitos de sistemas distribuídos na criação de um token utilizando a **Ethereum Virtual Machine (EVM)** na rede **Polygon**, uma solução de segunda camada que oferece alta escalabilidade e baixo custo para transações. Escolhemos essa rede devido à possibilidade de operar em um ambiente de teste com moedas gratuitas para deploy de contratos, o que facilitou o desenvolvimento e testes.

O token criado, chamado **Brunocoin**, segue o padrão **ERC-20**, amplamente utilizado para tokens fungíveis em redes baseadas na Ethereum. Este padrão nos permitiu implementar funcionalidades padrão, garantindo compatibilidade e segurança.

## Desenvolvimento

### Configuração do Ambiente
Utilizamos as seguintes ferramentas e frameworks para o desenvolvimento:
- **Hardhat Toolbox**: framework para desenvolvimento, testes e deploy de contratos inteligentes.
- **OpenZeppelin**: biblioteca de contratos inteligentes padrão para garantir segurança e compatibilidade.
- **Dotenv**: gerenciamento de variáveis de ambiente, como chaves privadas e endpoints da rede Polygon.

### Funcionalidades Implementadas
Nosso token, **Brunocoin**, foi configurado com as seguintes características:
- **Quantidade Inicial**: 1.000.000 Brunocoins, atribuídos a uma carteira administradora.
- **Acesso Restrito**: Apenas o administrador tem permissões avançadas, como a emissão e destruição de tokens.
- **Padrão ERC-20**: Seguindo as especificações do padrão, implementamos as funções:
  - **`totalSupply()`**: retorna a quantidade total de tokens em circulação.
  - **`balanceOf(address)`**: retorna o saldo de uma carteira.
  - **`transfer(address, uint256)`**: permite transferências de tokens entre carteiras.
  - **Funções adicionais**: 
    - **Burn**: para destruir tokens, reduzindo o total em circulação.
    - **Mint**: para criar novos tokens, limitado ao administrador.

### Processo de Deploy
1. Configuramos a rede Polygon com o endpoint da rede de testes e utilizamos moedas nativas (POL) para o pagamento de taxas.
2. Realizamos o deploy do contrato inteligente utilizando o Hardhat, integrando as bibliotecas do OpenZeppelin para funções padrões do ERC-20.

## Resultados

O contrato foi implantado com sucesso na rede de teste da Polygon. Após o deploy, realizamos uma série de testes para validar o funcionamento das funções implementadas:
- **Criação e distribuição de tokens**: o administrador pôde emitir novos tokens sem problemas.
- **Transferências entre carteiras**: verificamos que apenas carteiras com saldo suficiente podiam transferir tokens.
- **Restrição de acesso**: garantimos que apenas o administrador tinha permissões para emitir ou destruir tokens.

Além disso, implementamos uma funcionalidade para obter informações gerais sobre todas as carteiras que possuem **Brunocoins** na rede, permitindo monitorar a adoção e movimentação do token.

## Conclusão

A implementação da **Brunocoin** nos proporcionou uma experiência prática no desenvolvimento de sistemas distribuídos utilizando blockchain. Trabalhar com a EVM na rede Polygon mostrou-se eficiente e econômico, facilitando o aprendizado sem custos significativos. A utilização das ferramentas Hardhat e OpenZeppelin garantiu um desenvolvimento seguro e compatível com padrões amplamente aceitos.

Com este projeto, adquirimos conhecimento prático sobre:
- Estruturação de contratos inteligentes seguindo padrões reconhecidos.
- Configuração de ambientes de desenvolvimento para blockchain.
- Manipulação de tokens fungíveis e controle de permissões em sistemas descentralizados.

O projeto pode ser expandido futuramente para incluir funcionalidades adicionais, como integração com plataformas externas ou a migração para redes principais, com aplicações reais.
