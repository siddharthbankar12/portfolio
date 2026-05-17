# Portfolio Backend - Visitor Tracking

A Node.js/Express/MongoDB backend for tracking visitors to your portfolio website.

## Architecture

```
backend/
├── server.js              # Entry point, Express app setup
├── package.json           # Dependencies
├── models/
│   └── Visitor.js         # Mongoose schema
├── controllers/
│   └── VisitorController.js # Request handlers
├── services/
│   └── VisitorService.js   # Business logic
├── routes/
│   └── visit.js           # API routes
└── middleware/
    └── visitorLogger.js   # Auto-logging middleware
```

## Setup

1. **Install dependencies**

```bash
cd backend
npm install
```

2. **Configure environment**

```bash
cp .env.example .env
# Edit .env with your MongoDB connection string
```

3. **Start the server**

```bash
npm start
```

## API Endpoints

| Method | Endpoint                   | Description               |
| ------ | -------------------------- | ------------------------- |
| POST   | `/api/track-visit`         | Track a page visit        |
| GET    | `/api/visitor-count`       | Get total unique visitors |
| GET    | `/api/visitor-count/today` | Get today's visitors      |
| GET    | `/api/recent-visitors`     | Get recent visitors       |
| GET    | `/health`                  | Health check              |

## Data Collected

When a visitor accesses your site, the following data is collected:

- **IP Address** - User's public IP (anonymized)
- **User Agent** - Browser, OS, and device information
- **Referrer** - How they arrived (which site/link)
- **Language** - Browser's preferred language
- **Page** - Which page they visited
- **Timestamp** - Exact time of visit
- **Geolocation** - Country, region, city (via IP lookup)

## Privacy Features

- Bots automatically filtered
- Rate limiting (same IP = 1 visit per 5 min)
- No PII stored
- GDPR/CCPA compliant

## Deployment

### Quick Deploy to Render.com

1. Create account at [render.com](https://render.com)
2. Create Web Service from this repository
3. Set environment variables:
   - `MONGO_URI` = your MongoDB Atlas connection string
   - `PORT` = 10000
   - `NODE_ENV` = production
   - `FRONTEND_URL` = https://siddharthbankar12.github.io
4. Deploy!

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

### MongoDB Atlas Setup

1. Create free cluster at [mongodb.com](https://www.mongodb.com/cloud/atlas)
2. Create a database user
3. Add IP `0.0.0.0/0` to whitelist
4. Get the connection string and add to `.env`

### Environment Variables

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
PORT=5000
NODE_ENV=production
```
