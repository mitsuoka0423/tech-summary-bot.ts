# tech-summary-bot.ts

## Install

```bash
npm ci
```

## Prepare

```bash
cp .env.sample .env
```

Update `.env` file.

- `DISCORD_WEBHOOK_URL`
  - https://support.discord.com/hc/ja/articles/228383668-%E3%82%BF%E3%82%A4%E3%83%88%E3%83%AB-Webhooks%E3%81%B8%E3%81%AE%E5%BA%8F%E7%AB%A0
- `DISCORD_TOKEN`
- `DISCORD_GUILD_ID`
- `OPEN_AI_API_KEY`
  - https://platform.openai.com/account/api-keys

## Run

### Local

```bash
npm run exec
```

### Build

```bash
npm run build
node ./dist/index.js
```

## Lint/Format

```bash
npm run lint
```

```bash
npm run lint:fix
```

## Architecture

```mermaid
graph LR
  subgraph main
    client
    application
    persistence
  end
  subgraph adaptor
    client-adaptor
    persistence-adaptor
  end

  client -.-> application -.-> persistence
  client --> client-adaptor
  application --> client-adaptor
  application --> persistence-adaptor
  persistence --> persistence-adaptor
```

```mermaid
graph
  subgraph client
    Web
    Cron
  end
  subgraph application
    subgraph adaptor
      subgraph client-adaptor
        HttpAdapter
        CronAdapter
      end
      subgraph persistence-adaptor
        DbAdapter
        ApiAdapter
      end
    end
    subgraph Service
      HogeService
      subgraph Domain
        HogeDomain
      end
    end
  end
  subgraph persistence
    DB
    API
  end

  Web --> HttpAdapter
  Cron --> CronAdapter

  DB --> DbAdapter
  API --> ApiAdapter

  HogeService --> HttpAdapter 
  HogeService --> DbAdapter
  HogeService --> ApiAdapter
  HogeService --> HogeDomain
```