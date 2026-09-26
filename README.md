# Green API Chat

React-интерфейс для отправки и получения текстовых сообщений в MAX через GREEN-API. Визуально ориентирован на интерфейс MAX.

## Stack

- React
- TypeScript
- Vite
- MUI

## Features

- Ввод `idInstance` и `apiTokenInstance`.
- Создание чата по номеру телефона.
- Отправка текстовых сообщений.
- Получение входящих сообщений через polling.
- Отображение диалога в MAX-like UI.

Для работы нужен авторизованный MAX-инстанс GREEN-API с включёнными уведомлениями о входящих сообщениях.

## Local development

Требуются Node.js и npm. Все команды приложения выполняются из директории `client`.

Установка зависимостей — из корня репозитория:

```bash
cd client
npm install
```

Запуск dev server:

```bash
npm run dev
```

Production build с проверкой TypeScript:

```bash
npm run build
```

Локальный preview production build — после сборки:

```bash
npm run preview
```

Адрес приложения будет указан в терминале. Введите credentials на стартовом экране.
