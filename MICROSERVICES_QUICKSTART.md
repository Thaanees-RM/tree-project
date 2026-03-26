# Microservices Quick Start Guide

## 🚀 What We Just Created

Your Tree Planting application now has a **microservices architecture** with 4 independent services:

| Service | Port | Purpose |
|---------|------|---------|
| **API Gateway** | 3010 | Single entry point for all requests |
| **Auth Service** | 3011 | User authentication & JWT validation |
| **Submission Service** | 3012 | Accepts & manages tree planting forms |
| **Certificate Service** | 3013 | Generates certificates for approved users |

Plus supporting services:
- **MongoDB** (27017) - Shared database
- **Prometheus** (9090) - Metrics collection

---

## 📊 How Services Communicate

```
Client Request → API Gateway (3010)
                    ↓
         Nginx routes to: /api/auth/*       → Auth Service (3011)
                        /api/submissions/*  → Submission Service (3012)
                        /api/certificates/* → Certificate Service (3013)
                    ↓
         Services call each other:
    - Submission Service calls Auth Service (verify JWT token)
    - Certificate Service calls Submission Service (get user data)
```

---

## 🎯 Try It Now

### 1. **Start the Microservices**
```bash
cd ~/Tree_Planting
docker compose -f docker-compose.microservices.yml up -d
docker ps  # Should show 6 containers running
```

### 2. **Test the Stack** (Try the test script)
```bash
./scripts/test-microservices.sh
```

Expected output:
```
✓ Gateway is healthy
✓ Login successful, Token: jwt_token_here
✓ Submission created, ID: 1774503457551
✓ Retrieved submissions
✓ Token is valid
```

### 3. **Manual API Testing**

**a) Login (Auth Service)**
```bash
curl -X POST http://localhost:3010/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"name":"admin","password":"admin123"}'

# Response:
{"message":"Login successful","token":"jwt_token_here"}
```

**b) Create Submission (Submission Service)**
```bash
curl -X POST http://localhost:3010/api/submissions/users \
  -H 'Content-Type: application/json' \
  -d '{
    "firstName":"John",
    "lastName":"Doe",
    "email":"john@example.com",
    "tree":"Oak",
    "location":"New York"
  }'

# Response:
{"message":"Submission created","data":{"_id":"1774503...","firstName":"John",...}}
```

**c) List Submissions**
```bash
curl http://localhost:3010/api/submissions/users

# Response:
[{"_id":"...","firstName":"John","status":"Pending",...}]
```

**d) Verify Token (Auth Service)**
```bash
curl -X POST http://localhost:3010/api/auth/verify \
  -H 'Content-Type: application/json' \
  -d '{"token":"jwt_token_here"}'

# Response:
{"valid":true}
```

---

## 📁 File Structure

```
services/
├── gateway/                    # API Gateway (Nginx reverse proxy)
│   ├── Dockerfile
│   └── nginx.conf             # Routing rules for each service
│
├── auth-service/              # Authentication microservice
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js              # Login & token verification endpoints
│
├── submission-service/        # Form submission microservice
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js              # Calls auth-service to verify requests
│
└── certificate-service/       # Certificate generation microservice
    ├── Dockerfile
    ├── package.json
    ├── package-lock.json
    └── server.js              # Calls submission-service to get user data
```

---

## 🔄 Service Interaction Example

**When you submit a form:**

1. **You send**: POST /api/submissions/users
2. **Gateway receives** it and routes to Submission Service
3. **Submission Service**:
   - Receives your data
   - Verifies token by calling Auth Service internally
   - Stores submission in memory (mock)
   - Returns success response
4. **You get back**: Confirmation with submission ID

**When you generate a certificate:**

1. **You send**: POST /api/certificates/generate/123
2. **Gateway receives** it and routes to Certificate Service
3. **Certificate Service**:
   - Calls Submission Service to get user data
   - Validates that user exists and is approved
   - Generates certificate (mock)
   - Returns certificate data
4. **You get back**: Certificate information

---

## 🛑 Stop & Cleanup

```bash
# Stop all microservices
docker compose -f docker-compose.microservices.yml down

# Stop and remove volumes (clean slate)
docker compose -f docker-compose.microservices.yml down -v

# Remove orphan containers from old setup
docker compose -f docker-compose.microservices.yml down --remove-orphans
```

---

## 📚 Next: Real Implementation

Right now services use **mock data** (stored in memory). Next steps:

### Step 1: Add MongoDB Integration
```javascript
// In each service, replace mock storage with MongoDB:
const db = require('mongodb').MongoClient;
// Store data in separate collections per service
```

### Step 2: Migrate Business Logic
- Copy `backend/controllers/authController.js` → `services/auth-service/`
- Copy `backend/controllers/userController.js` → `services/submission-service/`
- Copy `backend/utils/certificateGenerator.js` → `services/certificate-service/`

### Step 3: Add Service Discovery
Replace hardcoded service URLs:
```javascript
// Current (hardcoded):
const AUTH_SERVICE_URL = 'http://auth-service:3011';

// Future (service discovery):
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'consul.default.svc.cluster.local';
```

### Step 4: Add Message Queue (Async)
```javascript
// Certificate ready? Send event instead of sync call:
amqp.publish('certificate-ready', { userId: 123, certificateUrl: '...' });
// Notification service listens and sends email
```

---

## 🚨 Common Issues

**Problem**: Services can't reach each other
```
Error: ECONNREFUSED at submission-service:3011
```
**Solution**: Use service names (not localhost) in Docker Compose network

**Problem**: Port already in use
```
docker: Error response from daemon: Ports are not available
```
**Solution**: 
```bash
# Kill process on port 3010
lsof -i :3010 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

**Problem**: "Cannot GET /api/auth/login"
```
Make sure you're using the gateway URL: http://localhost:3010
Not the direct service URL: http://localhost:3011
```

---

## 💡 Key Learnings

1. **Independent Scaling**: Scale any service separately
   ```bash
   docker compose -f docker-compose.microservices.yml up -d --scale submission-service=3
   ```

2. **Fault Isolation**: If Auth Service fails, others still run
   ```bash
   docker pause auth-service  # See how gateway handles it
   ```

3. **Service Discovery**: Nginx gateway routes based on URL path
   - `/api/auth/*` → Auth Service
   - `/api/submissions/*` → Submission Service
   - `/api/certificates/*` → Certificate Service

4. **Inter-Service Communication**: Services call each other via HTTP
   - No direct database sharing
   - Each service owns its data (future)

---

## 📖 Related Files

- [Full Architecture Guide](./MICROSERVICES.md)
- [Docker Compose Config](./docker-compose.microservices.yml)
- [Test Script](./scripts/test-microservices.sh)
- [Original Monolith](./backend/) - Still running if needed!

---

## 🎓 Your Learning Path

**Phase 1 (You are here)**: ✅ Microservices basics with mock data
**Phase 2**: 🔄 Integrate MongoDB and real business logic
**Phase 3**: 📨 Add message queues (RabbitMQ/Kafka)
**Phase 4**: 🐳 Deploy to Kubernetes
**Phase 5**: 🔀 Add service mesh (Istio)
**Phase 6**: 📈 Implement ArgoCD for GitOps

---

**Questions?** Check the service implementation:
- `services/auth-service/server.js` - Shows how Auth Service works
- `services/submission-service/server.js` - Shows inter-service HTTP calls
- `services/certificate-service/server.js` - Shows dependency chaining
