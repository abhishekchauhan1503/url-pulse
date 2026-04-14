# url-pulse

A lightweight URL health-check API built with Node.js, TypeScript, Express, and SQLite. Send it a URL and it performs an outbound HTTP GET, measures the response time with nanosecond precision, stores the result, and returns it as JSON. All check history is queryable through two read endpoints.

## Install and run

```bash
npm install
npm run build
npm start
```

The server listens on port 3000 by default.

## Endpoints

### POST /check

Check a URL and persist the result.

```bash
curl -X POST http://localhost:3000/check \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

**Response (200):**
```json
{
  "id": 1,
  "url": "https://example.com",
  "status_code": 200,
  "response_time_ms": 142.3,
  "error": null,
  "checked_at": "2026-04-13T10:00:00.000Z"
}
```

### GET /history

Return all past check records, newest first.

```bash
curl http://localhost:3000/history
```

### GET /history/:id

Return a single check record by id.

```bash
curl http://localhost:3000/history/1
```

Returns `404` if the id does not exist.

## Environment variables

| Variable        | Default             | Description                        |
|-----------------|---------------------|------------------------------------|
| `PORT`          | `3000`              | Port the server listens on         |
| `DATABASE_PATH` | `./data/checks.db`  | Path to the SQLite database file   |

## How it was built

url-pulse was built entirely using [dark-factory-orchestrator](https://github.com/abhishekchauhan1503/dark-factory-orchestrator) — an AI agent orchestration system that drives a structured Requirements → Spec → Tasks → Execute pipeline with no human-written code.

The full artifact trail — requirements, architecture outline, component specs, and task lists — is preserved in the [`specs/`](./specs/) directory.
