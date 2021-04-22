# issues-tracker
[![Build Status](https://travis-ci.org/gideaopinheiro/issues-tracker.svg?branch=master)](https://travis-ci.org/gideaopinheiro/issues-tracker)
[![Coverage Status](https://coveralls.io/repos/github/gideaopinheiro/issues-tracker/badge.svg?branch=master)](https://coveralls.io/github/gideaopinheiro/issues-tracker?branch=master)


Para executar a aplicação é necessário antes criar um arquivo `.env` na raíz do projeto e inserir as seguintes variáveis:

    USER_EMAIL=<endereço de email>

    USER_PASS=<senha para o email>

    NODEMAILER_PORT=587

    HOST=smtp.gmail.com

## Instalar as dependências

    npm install

## Executar a aplicação

    npm run build
    npm start
    
    OU
    
    npm run up    #executar a aplicação dentro de container docker

## Executar testes

    npm test              #executar todos os testes
    npm run test:ci       #executar todos os testes e obter cobertura
    npm run test:verbose  #executar todos os testes e ver as saídas

## Documentação

    executar a aplicação e acessar (http://localhost:5050/docs)
