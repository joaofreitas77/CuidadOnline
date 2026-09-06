# CuidadOnline

Educação contra golpes digitais, em JavaScript + React Native + Expo. Telas compartilhadas entre web, Android e iOS.

## Executar

Pré-requisitos: Node.js 22.13 ou superior e Git instalados.

```sh
git clone https://github.com/joaofreitas77/CuidadOnline.git
cd CuidadOnline
npm ci
npm run web
```

Para mobile: `npm start` e um dispositivo compatível com o SDK do Expo ou emulador. O simulador iOS exige macOS.

## Primeira versão

- Login e cadastro demonstrativos, validação, confirmação e visibilidade da senha.
- Entrada sem conta, dashboard responsivo, leituras sobre Pix, boletos, WhatsApp e lojas falsas.
- Simulador com três perguntas, explicações e resultado.
- Progresso das leituras apenas na memória da visita; sair ou recarregar reinicia.

Não há backend nem autenticação real. Os formulários não enviam nem armazenam credenciais. Use dados fictícios. Próxima etapa: integrar autenticação, recuperação de senha e persistência de progresso com políticas de acesso. Nunca guardar senhas no navegador.

O nome CuidadOnline une as palavras cuidado e online, compartilhando o O entre elas. A interface usa uma paleta azul e clara, com foco em leitura simples e acessibilidade.

## Estrutura

- App.js: componentes e telas.
- src/styles.js: tema e estilos.
- src/content.js: conteúdo educativo e perguntas.
- src/validation.js: validação dos formulários.

## Verificar

```sh
node --test tests/validation.test.mjs
npx expo install --check
npx expo export --platform web
```


Validação inicial: 5 testes de formulário passaram e o build web foi gerado. O npm audit aponta 10 alertas moderados na cadeia de ferramentas Expo/xcode/uuid; a correção automática sugere downgrade incompatível, por isso não foi aplicada. Mobile ainda não foi validado em dispositivo.


## Arquivos versionados

O repositório inclui código, imagens do app, testes, configurações compartilhadas e package-lock.json. Dependências instaladas, builds, caches, logs, credenciais e configurações locais ficam fora do Git. Arquivos .env.example só devem conter valores fictícios. Variáveis EXPO_PUBLIC_ ficam visíveis no aplicativo e nunca devem conter segredos.
