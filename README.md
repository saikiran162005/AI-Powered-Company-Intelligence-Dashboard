# AI-Powered Company Intelligence Dashboard

An intelligent platform that combines AI capabilities with real-time company data analysis to provide comprehensive business insights.

## Features

- **Company Search & Analysis**: Search for companies and get detailed information powered by AI
- **Interactive Chat**: Ask questions about companies and get intelligent responses
- **Real-time Data**: Access up-to-date company information including financials, leadership, and industry details
- **Conversation History**: Track and manage chat history for each company
- **Responsive UI**: Modern, intuitive interface built with React and Tailwind CSS
- **Scalable Architecture**: Backend built with Express.js and PostgreSQL
- **Docker Support**: Easy deployment with Docker and Docker Compose

## Prerequisites

- Node.js 18+ or Docker
- PostgreSQL 15+ (if running locally)
- OpenAI API Key
- npm or yarn package manager

## Installation

### Option 1: Using Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/yourusername/AI-Powered-Company-Intelligence-Dashboard.git
cd AI-Powered-Company-Intelligence-Dashboard

# Create environment file
cp .env.example .env

# Update .env with your configuration
# OPENAI_API_KEY=your_api_key_here

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:5173
# Backend: http://localhost:3001
# API Docs: http://localhost:3001/api
```

### Option 2: Local Development

#### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update environment variables
# DATABASE_URL=postgresql://user:password@localhost:5432/company_intel
# OPENAI_API_KEY=your_api_key_here

# Run migrations
npm run db:migrate

# Start the backend
npm run dev
```

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start the development server
npm run dev
```

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── controllers/       # Route handlers
│   │   ├── services/          # Business logic
│   │   ├── models/            # Data models
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Express middleware
│   │   ├── utils/             # Utility functions
│   │   ├── database/          # Database connection
│   │   ├── config/            # Configuration
│   │   └── server.ts          # Entry point
│   ├── docker/
│   │   └── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── store/             # Zustand stores
│   │   ├── api/               # API client
│   │   ├── styles/            # Global styles
│   │   ├── App.tsx            # Root component
│   │   └── main.tsx           # Entry point
│   ├── public/
│   ├── Dockerfile
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
├── database/
│   └── schema.sql             # PostgreSQL schema
├── docker-compose.yml
└── README.md
```

## API Endpoints

### Company Endpoints

- `POST /api/company/search` - Search for a company
- `GET /api/company/:id` - Get company by ID
- `GET /api/company` - Get all companies (history)
- `POST /api/company/compare` - Compare two companies
- `DELETE /api/company/:id` - Delete a company

### Chat Endpoints

- `POST /api/chat/send` - Send a chat message
- `GET /api/chat/:companyId` - Get chat history
- `DELETE /api/chat/:companyId` - Clear chat history

### Health Check

- `GET /api/health` - Health check endpoint

## Environment Variables

### Backend (.env)

```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://admin:password@localhost:5432/company_intel
OPENAI_API_KEY=your_api_key_here
CORS_ORIGIN=http://localhost:5173
LOG_LEVEL=info
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Company Intelligence Platform
```

## Deployment

### Docker Deployment

```bash
# Build images
docker-compose build

# Deploy
docker-compose up -d

# View logs
docker-compose logs -f
```

### Production Considerations

- Use environment-specific `.env` files
- Enable HTTPS/SSL
- Set up proper database backups
- Configure rate limiting appropriately
- Use a reverse proxy (nginx/traefik)
- Enable CORS selectively
- Use secrets management (AWS Secrets Manager, HashiCorp Vault, etc.)

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm run test
npm run test:coverage
```

### Frontend Tests

```bash
cd frontend
npm run test
```

## 📊 Database

The application uses PostgreSQL with the following main tables:

- **companies**: Company information and metadata
- **chat_messages**: Chat history between users and AI
- **search_history**: Search query history
- **sessions**: User session tracking
- **audit_logs**: System audit trail

## AI Integration

The platform uses OpenAI's GPT API to:

- Analyze company data
- Generate intelligent responses
- Extract insights from information
- Provide business recommendations

## 🛠️ Development

### Code Quality

```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Formatting
npm run format
```

### Git Workflow

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add your feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a pull request

## API Documentation

Interactive API documentation is available at `/api-docs` when the backend is running.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests for new features
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Troubleshooting

### Database Connection Issues

```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Verify connection string
psql -U admin -d company_intel -h localhost
```

### Docker Issues

```bash
# Rebuild containers
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Check logs
docker-compose logs backend
docker-compose logs frontend
```

### API Connection Issues

- Verify backend is running: `curl http://localhost:3001/api/health`
- Check CORS settings in environment
- Verify API URL in frontend environment

## 🙏 Acknowledgments

- OpenAI for GPT API
- React community
- Express.js community
- PostgreSQL community
