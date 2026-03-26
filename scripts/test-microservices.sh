#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Microservices API Testing ===${NC}\n"

# 1. Gateway Health Check
echo -e "${BLUE}1. Testing API Gateway Health${NC}"
RESPONSE=$(curl -s http://localhost:3010/health)
echo "Response: $RESPONSE"
if [[ $RESPONSE == *"OK"* ]]; then
    echo -e "${GREEN}✓ Gateway is healthy${NC}\n"
else
    echo -e "${RED}✗ Gateway health check failed${NC}\n"
    exit 1
fi

# 2. Auth Service - Login
echo -e "${BLUE}2. Testing Auth Service - Login${NC}"
AUTH_RESPONSE=$(curl -s -X POST http://localhost:3010/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"name":"admin","password":"admin123"}')
echo "Response: $AUTH_RESPONSE"
TOKEN=$(echo $AUTH_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
if [[ ! -z "$TOKEN" ]]; then
    echo -e "${GREEN}✓ Login successful, Token: $TOKEN${NC}\n"
else
    echo -e "${RED}✗ Login failed${NC}\n"
    exit 1
fi

# 3. Submission Service - Create
echo -e "${BLUE}3. Testing Submission Service - Create Submission${NC}"
SUBMIT_RESPONSE=$(curl -s -X POST http://localhost:3010/api/submissions/users \
  -H 'Content-Type: application/json' \
  -d '{
    "firstName":"Test",
    "lastName":"User",
    "email":"test@example.com",
    "tree":"Maple",
    "location":"Boston",
    "token":"'$TOKEN'"
  }')
echo "Response: $SUBMIT_RESPONSE"
SUBMISSION_ID=$(echo $SUBMIT_RESPONSE | grep -o '"_id":"[^"]*' | cut -d'"' -f4 | head -1)
if [[ ! -z "$SUBMISSION_ID" ]]; then
    echo -e "${GREEN}✓ Submission created, ID: $SUBMISSION_ID${NC}\n"
else
    echo -e "${RED}✗ Submission creation failed${NC}\n"
    exit 1
fi

# 4. Submission Service - List All
echo -e "${BLUE}4. Testing Submission Service - List All${NC}"
LIST_RESPONSE=$(curl -s http://localhost:3010/api/submissions/users)
COUNT=$(echo $LIST_RESPONSE | grep -o '"_id"' | wc -l)
echo "Total submissions: $COUNT"
if [[ $COUNT -gt 0 ]]; then
    echo -e "${GREEN}✓ Retrieved submissions${NC}\n"
else
    echo -e "${RED}✗ No submissions found${NC}\n"
fi

# 5. Auth Service - Verify Token
echo -e "${BLUE}5. Testing Auth Service - Verify Token${NC}"
VERIFY_RESPONSE=$(curl -s -X POST http://localhost:3010/api/auth/verify \
  -H 'Content-Type: application/json' \
  -d '{"token":"'$TOKEN'"}')
echo "Response: $VERIFY_RESPONSE"
if [[ $VERIFY_RESPONSE == *"valid"* ]]; then
    echo -e "${GREEN}✓ Token is valid${NC}\n"
else
    echo -e "${RED}✗ Token verification failed${NC}\n"
fi

echo -e "${GREEN}=== All tests completed ===${NC}"
