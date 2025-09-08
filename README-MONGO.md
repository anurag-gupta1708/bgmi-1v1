# MongoDB Integration for BGMI 1v1

This adds a minimal Node/Express + Mongoose API under `server/` and updates the frontend hook to persist votes/bets in MongoDB.

## Prerequisites
- Node 18+
- MongoDB running locally (`mongodb://127.0.0.1:27017/bgmi`) or provide your own URI

## Setup

### 1) Backend API
```bash
cd server
npm i
npm run dev
# API at http://localhost:4000/api/health
```

### 2) Frontend
The frontend uses Vite. From the project root:
```bash
npm i
npm run dev
```
The hook reads `VITE_API_BASE` from `.env.local` (already created) which defaults to `http://localhost:4000/api`.

## Endpoints
- POST `/api/votes` `{ voterName, votedFor }`
- GET  `/api/votes/totals`
- GET  `/api/votes/recent?limit=200`
- POST `/api/bets` `{ betterName, betOn, amount }`
- GET  `/api/bets/totals`
- GET  `/api/bets/recent?limit=200`
- GET  `/api/users/:name`

## Notes
- One vote per `voterName` and one bet per `betterName` (unique indexes).
- Aggregation pipelines compute totals server‑side.
- Old localStorage keys are purged automatically on mount; only `bgmi-voter-name` persists locally.
