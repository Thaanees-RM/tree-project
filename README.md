# Tree Planting Application

A full-stack web application for managing tree planting initiatives with authentication, form submissions, certificate generation, and monitoring.

## 🌳 Project Overview

This project demonstrates both **monolithic** and **microservices** architectures:

### **Monolithic (Traditional)**
Single backend API serving the frontend apps.
- Good for: Getting started, simple deployments
- Location: `backend/`, `Client/`, `admin/`

### **Microservices (Modern)** ⭐ NEW
Split into independent services with API Gateway.
- Good for: Scaling, independent deployment, team separation
- Location: `services/`
- Quick Start: [MICROSERVICES_QUICKSTART.md](./MICROSERVICES_QUICKSTART.md)

---

## 🚀 Quick Start

### Option 1: Run Monolithic (Original Stack)
```bash
# Start all services including backend
docker compose up -d

# Access:
# - Client: http://localhost:3005
# - Admin: http://localhost:3001
# - Backend API: http://localhost:5001
# - Grafana: http://localhost:3000 (admin/Admin@12345)
```

### Option 2: Run Microservices (Learning Mode) ⭐ Recommended
```bash
# Start microservices stack
docker compose -f docker-compose.microservices.yml up -d

# Test all services
./scripts/test-microservices.sh

# Access:
# - API Gateway: http://localhost:3010
# - Auth Service: http://localhost:3011
# - Submission Service: http://localhost:3012
# - Certificate Service: http://localhost:3013
# - MongoDB: localhost:27017
# - Prometheus: http://localhost:9090
```

### Option 3: Start Cloud-Native Learning Track (AKS)
```bash
# 1) Prepare env branches (already safe to re-run)
./scripts/git-env-setup.sh

# 2) Plan Azure infra for thaanees env
./scripts/azure-bootstrap.sh <AZURE_SUBSCRIPTION_ID> thaanees

# 3) Apply Terraform manually after reviewing plan
cd infra/terraform
terraform apply -var "subscription_id=<AZURE_SUBSCRIPTION_ID>" -var-file envs/thaanees.tfvars
```

---

## 📁 Project Structure

```
Tree_Planting/
├── Client/                        # React frontend (Vite)
│   ├── src/
│   │   ├── components/           # Form & UI components
│   │   ├── pages/                # Home, About, Privacy
│   │   └── main.jsx
│   ├── Dockerfile
│   ├── nginx.conf
│   └── vite.config.js
│
├── admin/                         # React admin dashboard (Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Dashboard.jsx    # Approve/reject submissions
│   │   └── main.jsx
│   ├── Dockerfile
│   ├── nginx.conf
│   └── vite.config.js
│
├── backend/                       # Express.js monolithic API
│   ├── server.js
│   ├── controllers/
│   │   ├── authController.js     # Admin login logic
│   │   └── userController.js     # Submission CRUD
│   ├── models/                   # MongoDB schemas
│   ├── routes/
│   ├── configs/
│   │   └── db.js                 # MongoDB connection
│   ├── utils/
│   │   └── certificateGenerator.js
│   ├── Dockerfile
│   └── package.json
│
├── services/                      # Microservices (NEW)
│   ├── gateway/                  # Nginx reverse proxy
│   ├── auth-service/             # Auth microservice (port 3011)
│   ├── submission-service/       # Form microservice (port 3012)
│   └── certificate-service/      # Certificate microservice (port 3013)
│
├── infra/terraform/               # AKS + ACR + budget IaC (NEW)
│   ├── envs/
│   │   ├── thaanees.tfvars
│   │   ├── qa.tfvars
│   │   └── production.tfvars
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── versions.tf
│
├── k8s/                           # Kubernetes manifests (NEW)
│   ├── base/
│   └── overlays/
│       ├── thaanees/
│       ├── qa/
│       └── production/
│
├── argocd/apps/                   # ArgoCD Applications (NEW)
│   ├── thaanees-app.yaml
│   ├── qa-app.yaml
│   └── production-app.yaml
│
├── ansible/                       # AKS addons bootstrap (NEW)
│   ├── cluster-bootstrap.yml
│   └── requirements.yml
│
├── docker-compose.yml            # Monolithic stack
├── docker-compose.microservices.yml  # Microservices stack
├── azure-pipelines.yml           # Azure DevOps CI/CD (NEW)
│
├── grafana/                       # Monitoring dashboards
│   ├── dashboards/
│   └── provisioning/
│
├── prometheus/                    # Metrics collection
│   ├── prometheus.yml
│   └── alertmanager.yml          # Email/webhook alert routing (NEW)
│
├── scripts/
│   ├── local-ci.sh              # Local linting & building
│   ├── local-cd.sh              # Local Docker deployment
│   ├── local-cicd.sh            # Combined CI/CD
│   ├── test-microservices.sh    # Test microservices API
│   ├── azure-bootstrap.sh       # Terraform plan helper for Azure
│   └── git-env-setup.sh         # Setup thaanees/qa/production branches
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml            # GitHub Actions pipeline
│
├── MICROSERVICES.md             # Detailed microservices guide
├── MICROSERVICES_QUICKSTART.md  # Get started with microservices
└── README.md                    # This file
```

---

## 🎯 Key Features

### Frontend (Client App)
- ✅ Tree planting form (3 steps)
- ✅ Certificate display
- ✅ Responsive design
- ✅ Form validation

### Admin Dashboard
- ✅ Login authentication
- ✅ View all submissions
- ✅ Approve/reject submissions
- ✅ Certificate management

### Backend / Microservices
- ✅ User authentication (JWT)
- ✅ Submission CRUD operations
- ✅ Certificate generation
- ✅ RESTful API endpoints
- ✅ Inter-service communication (microservices only)

### DevOps / Monitoring
- ✅ Docker & Docker Compose
- ✅ Prometheus metrics collection
- ✅ Grafana dashboards
- ✅ GitHub Actions CI/CD pipeline
- ✅ Local testing scripts
- ✅ Terraform IaC for AKS/ACR/Budgets
- ✅ ArgoCD GitOps environment apps
- ✅ Azure Pipelines for ACR image automation
- ✅ Branch-based promotion: `thaanees` -> `qa` -> `production`

---

## 🔧 Technology Stack

### Frontend
- **Framework**: React 19
- **Build**: Vite 7.0
- **Styling**: CSS3
- **Server**: Nginx (production)

### Backend
- **Runtime**: Node.js 20 (Alpine)
- **Framework**: Express 5.1
- **Database**: MongoDB 6
- **Reverse Proxy**: Nginx (gateway in microservices)

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose, AKS (Kubernetes)
- **Infrastructure as Code**: Terraform
- **Configuration/Bootstrap**: Ansible + Helm
- **GitOps**: ArgoCD + Kustomize overlays
- **CI/CD**: GitHub Actions, Azure Pipelines
- **Monitoring/Alerting**: Prometheus + Grafana + Alertmanager Webhook

---

## 📊 Architecture Comparison

### Monolithic
```
Client → Admin   Backend API ← MongoDB
           ↗       ↙
       Routes Handlers
```

### Microservices
```
Client  →  API Gateway → Auth Service (3011)
            ↓
       Submission Service (3012) → Auth Service
            ↓
       Certificate Service (3013) → Submission Service
            ↓
          MongoDB (27017)
```

---

## 🌐 API Endpoints

### Monolithic (Backend on port 5001)
```
POST   /api/login                    # Admin login
POST   /api/users                    # Create submission
GET    /api/users                    # List submissions
PUT    /api/users/:id/:action        # Approve/reject/pending
```

### Microservices (Via Gateway on port 3010)
```
POST   /api/auth/login               # → Auth Service
POST   /api/auth/verify              # → Auth Service

POST   /api/submissions/users        # → Submission Service
GET    /api/submissions/users        # → Submission Service
PUT    /api/submissions/users/:id/:action

POST   /api/certificates/generate/:userId    # → Certificate Service
GET    /api/certificates/certificate/:userId # → Certificate Service
```

---

## 🚀 Deployment

### Local Development
```bash
# Run full stack (monolithic)
docker compose up -d

# Run microservices
docker compose -f docker-compose.microservices.yml up -d

# Run CI/CD locally
./scripts/local-cicd.sh
```

### GitHub Actions (Cloud)
```
Push to main/thaanees → GitHub Actions → Build → Deploy (if secrets set)
```

**Required GitHub Secrets:**
- `DEPLOY_HOST` - Server IP/hostname
- `DEPLOY_USER` - SSH user
- `DEPLOY_SSH_KEY` - Private SSH key
- `DEPLOY_PORT` - SSH port (optional, default: 22)

### Azure AKS + GitOps (Learning Track)
- Branch to environment mapping:
  - `thaanees` -> Dev/Test AKS overlay (`k8s/overlays/thaanees`)
  - `qa` -> QA AKS overlay (`k8s/overlays/qa`)
  - `production` -> Production AKS overlay (`k8s/overlays/production`)
- Azure Pipelines builds and pushes container images to ACR.
- Pipeline updates Kustomize image tags in the matching branch overlay.
- ArgoCD watches each branch and syncs changes to AKS.
- Promotion flow: merge `thaanees` -> `qa` -> `production`.

### Budget Plan (Student-Friendly)
- Target budget: ~$200/month total.
- Suggested split:
  - `thaanees`: $60
  - `qa`: $60
  - `production`: $80
- Budget alerts are defined in Terraform (`azurerm_consumption_budget_resource_group`).

---

## 📝 Credentials

### Admin Dashboard
- **Username**: admin
- **Password**: Admin@12345

### Grafana
- **Username**: admin
- **Password**: Admin@12345

### MongoDB
- **Connection**: mongodb://localhost:27017
- **Database**: tree-plantation

---

## 📚 Learning Paths

### Path 1: Get It Running (5 min)
1. [Run Docker Compose](#quick-start-option-1-run-monolithic)
2. Open http://localhost:3005
3. Fill in the form
4. See data in admin dashboard (http://localhost:3001)

### Path 2: Learn Microservices (30 min)
1. [Start microservices stack](#quick-start-option-2-run-microservices-learning-mode)
2. [Run test script](#quick-start-option-2-run-microservices-learning-mode)
3. Read [MICROSERVICES_QUICKSTART.md](./MICROSERVICES_QUICKSTART.md)
4. Modify service code in `services/` and rebuild

### Path 3: Deploy to Cloud (1-2 hours)
1. Create Azure resources with Terraform (`infra/terraform/`)
2. Install ingress + monitoring + ArgoCD using Ansible (`ansible/cluster-bootstrap.yml`)
3. Configure Azure Pipeline (`azure-pipelines.yml`) service connections
4. Push to `thaanees` and validate AKS deployment via ArgoCD

### Path 4: Scale to Production (Advanced)
1. Promote from `thaanees` to `qa` via PR and validate
2. Promote from `qa` to `production` via PR with approvals
3. Add autoscaling and hard resource requests/limits
4. Add message queue (RabbitMQ/Kafka)
5. Add SLO alerts and cost review cadence

---

## 🧪 Testing

### Test Monolithic Backend
```bash
curl -X POST http://localhost:5001/api/login \
  -H 'Content-Type: application/json' \
  -d '{"name":"admin","password":"Admin@12345"}'
```

### Test Microservices
```bash
./scripts/test-microservices.sh    # Full test
# or
curl http://localhost:3010/health  # Gateway health
```

---

## 📊 Monitoring

### Prometheus (Metrics)
```
http://localhost:9090
```

### Grafana (Dashboards)
```
http://localhost:3000
Username: admin
Password: Admin@12345

Dashboard: Backend API Overview
- API status
- Request rate
- Error rate
- Memory/CPU usage
```

### Alerting (Email + Webhook)
- Template file: `prometheus/alertmanager.yml`
- Email alerts: configure SMTP values.
- Webhook alerts: configure a webhook receiver for chat/automation.
- WhatsApp (free-friendly practice): use webhook -> small bridge service -> WhatsApp API provider.

---

## 🐛 Troubleshooting

### Container won't start
```bash
# Check logs
docker compose logs backend

# Rebuild images
docker compose build --no-cache backend

# Remove dangling images
docker image prune -af
```

### Port already in use
```bash
# Find process on port
lsof -i :3010

# Kill it
kill -9 <PID>
```

### MongoDB connection error
```bash
# Check MongoDB is running
docker compose ps mongodb

# Reset database
docker compose down -v
docker compose up -d
```

### Microservices can't reach each other
```
Error: ECONNREFUSED 127.0.0.1:3011

Solution: Use service names (docker-compose internal DNS)
  ✗ http://localhost:3011
  ✓ http://auth-service:3011
```

---

## 📖 Documentation

- [Full Microservices Guide](./MICROSERVICES.md) - Architecture details
- [Quick Start (Microservices)](./MICROSERVICES_QUICKSTART.md) - Get started fast
- [GitHub Actions Workflow](./.github/workflows/ci-cd.yml) - CI/CD pipeline
- [Azure Pipelines](./azure-pipelines.yml) - Build/push images + GitOps tag updates
- [Terraform IaC](./infra/terraform/main.tf) - AKS/ACR/Budget resources
- [ArgoCD Apps](./argocd/apps/thaanees-app.yaml) - GitOps per environment
- [Ansible Bootstrap](./ansible/cluster-bootstrap.yml) - Ingress/monitoring/ArgoCD install
- [Backend README](./backend/README.md) - API documentation
- [Client README](./Client/README.md) - Frontend setup

---

## 👨‍💻 Development

### Edit Code & Test Locally
```bash
# Make changes to services/auth-service/server.js
# Then rebuild
docker compose -f docker-compose.microservices.yml build auth-service
docker compose -f docker-compose.microservices.yml up -d auth-service

# Test
curl http://localhost:3011/verify
```

### Local CI/CD Pipeline
```bash
# Run linting + building locally
./scripts/local-ci.sh

# Deploy via Docker Compose
./scripts/local-cd.sh

# Both together
./scripts/local-cicd.sh
```

---

## 🎓 What You'll Learn

✅ Docker containerization & Docker Compose  
✅ Microservices architecture & design patterns  
✅ Service-to-service communication (HTTP)  
✅ API Gateway pattern (Nginx reverse proxy)  
✅ MongoDB database operations  
✅ GitHub Actions CI/CD  
✅ Prometheus metrics & Grafana dashboards  
✅ React + Vite frontend development  
✅ Express.js backend development  

*Plus advanced topics:* Service discovery, message queues, Kubernetes, Istio, ArgoCD

---

## 📄 License

This project is part of a learning initiative for microservices and DevOps practices.

---

## 🤝 Contributing

Feel free to fork and modify! This is a learning project.

---

**Need help?**  
Check [MICROSERVICES_QUICKSTART.md](./MICROSERVICES_QUICKSTART.md) or open an issue.
