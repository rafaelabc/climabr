# ClimaBR
## Sobre o projeto

Uma aplicação simples para consulta à previsão do tempo de cidades brasileiras.

Desenvolvido para disciplina de Modelagem e Implementação de Software

Os usuários encontrarão as seguintes funcionalidades:
- Buscar por cidade
- Ver histórico de busca
- Limpar histórico de busca
- Ver a previsão do tempo para cidade buscada
  
## Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Ionic Framework](https://ionicframework.com/)
- [Angular](https://angular.io/)

## Como executar o projeto

Clone este repositório.

Entre na pasta do projeto e execute o comando abaixo para instalar as dependências:

```bash
  npm install
``` 

Acesse o site https://openweathermap.org/api, faça seu cadastro e crie uma chave de API.

Crie um arquivo chamado `api-config.ts` no diretório `src/environment` do projeto, contendo o conteúdo abaixo (não se esqueça de alterar a propriedade `api_key` para a sua chave de API):

```ts
export const OPEN_WEATHER_CONFIG = {
  api_key: '<your-api-key>',
  api_url: 'https://api.openweathermap.org/data/2.5/onecall',
  api_icon_url: 'http://openweathermap.org/img/wn',
};
```

Para abrir a aplicação, execute o comando:

```bash
  ionic serve
``` 

Enjoy!
