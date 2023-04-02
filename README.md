[![Netlify Status](https://api.netlify.com/api/v1/badges/ab75e1b3-6973-4f79-8ac6-9722e85a63a7/deploy-status)](https://app.netlify.com/sites/wondrous-cobbler-e90c6c/deploys)

# netlify-functions-template.ts

## Install

```bash
npm ci
```

## Dev

```bash
npm run dev
```

```bash
$ curl http://localhost:8888/netlify/functions/hello.

{"message":"Hello World"}
```

## Deploy

Just execute `git push`.

## Execute

```bash
$ curl https://{site_name}.netlify.app/.netlify/functions/hello

{"message":"Hello World"}
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