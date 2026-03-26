# Microservices Architecture Guide

## Overview
This is a microservices version of the Tree Planting application split into independent services.

## Services

### 1. API Gateway (Port 3010)
- **Role**: Entry point for all client requests
- **Tech**: Nginx reverse proxy
- **Routes**:
  - `/api/auth/*` → Auth Service
  - `/api/submissions/*` → Submission Service
  - `/api/certificates/*` → Certificate Service

### 2. Auth Service (Port 3011)
- **Role**: Handles admin authentication and JWT verification
- **Endpoints**:
  - `POST /login` - Admin login
  - `POST /verify` - Verify JWT token
- **Dependencies**: None (independent)

### 3. Submission Service (Port 3012)
- **Role**: Handles user tree planting form submissions
- **Endpoints**:
  - `POST /users` - Create new submission
  - `GET /users` - List all submissions
  - `PUT /users/:id/:action` - Update status (approve/reject/pending)
- **Dependencies**: Auth Service (for token verification)

### 4. Certificate Service (Port 3013)
- **Role**: Generates certificates for approved users
- **Endpoints**:
  - `POST /generate/:userId` - Generate certificate
  - `GET /certificate/:userId` - Get certificate details
- **Dependencies**: Submission Service (get user data)

### 5. MongoDB (Port 27017)
- **Role**: Shared database for all services
- **Strategy**: Each service has its own collection

## Architecture Diagram
```
Client (3005)
     ↓
API Gateway (3010)
  ├→ Auth Service (3011)
  ├→ Submission Service (3012) → (calls Auth Service for verification)
  └→ Certificate Service (3013) → (calls Submission Service for user data)
     ↓
  Shared MongoDB (27017)
```

## How to Run

### Start Microservices Stack
```bash
docker compose -f docker-compose.microservices.yml up -d

# Check all services are running
docker compose -f docker-compose.microservices.yml ps
```

### Access Services
- API Gateway: http://localhost:3010
- Auth Service (direct): http://localhost:3011
- Submission Service (direct): http://localhost:3012
- Certificate Service (direct): http://localhost:3013
- MongoDB: mongodb://localhost:27017
- Prometheus: http://localhost:9090

### Test API Calls

**1. Login via Gateway**
```bash
curl -X POST http://localhost:3010/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"name":"admin","password":"admin123"}'
```

**2. Create Submission via Gateway**
```bash
curl -X POST http://localhost:3010/api/submissions/users \
  -H "Content-Type: application/json" \
  -d '{
    "firstName":"John",
    "lastName":"Doe",
    "email":"john@example.com",
    "tree":"Oak",
    "location":"NYC"
  }'
```

**3. Get All Submissions**
```bash
curl http://localhost:3010/api/submissions/users
```

## Key Learning Points

### Service Communication
- **Synchronous**: Submission Service calls Auth Service to verify tokens
- **Error Handling**: If Auth Service is down, submission requests fail (demonstrate resilience later)

### Database Strategy
- Currently: Shared MongoDB
- Future: Separate DB per service (when you scale)

### Scalability
```bash
# Scale Submission Service to 3 instances
docker compose -f docker-compose.microservices.yml up -d --scale submission-service=3
```

## Next Steps (After Learning)

1. **Service Discovery**: Use Consul/Eureka instead of hard-coded URLs
2. **Message Queue**: Add RabbitMQ/Kafka for async communication (e.g., Certificate→Notification)
3. **API Versioning**: Add `/v1/`, `/v2/` prefixes to APIs
4. **Logging**: Add ELK stack (Elasticsearch, Logstash, Kibana)
5. **Tracing**: Add Jaeger for distributed tracing
6. **Kubernetes**: Deploy each service in K8s pods instead of Docker Compose

## File Structure
```
services/
├── gateway/
│   ├── Dockerfile
│   └── nginx.conf
├── auth-service/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── submission-service/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
└── certificate-service/
    ├── Dockerfile
    ├── package.json
    └── server.js
```

---

**Your current monolithic backend (in `backend/`) can coexist with this.**
**This is for learning. You can migrate gradually or keep both running.**
