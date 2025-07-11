.PHONY: frontend backend frontend-run backend-run up down

# Сборка фронтенда
frontend:
	cd frontend && npm install && npm run build

# Сборка бэкенда
backend:
	cd backend && ./mvnw clean package

# Запуск фронтенда (dev-режим)
frontend-run:
	cd frontend && npm install && npm start

# Запуск бэкенда (dev-режим)
backend-run:
	cd backend && ./mvnw spring-boot:run

# Запуск обоих сервисов через docker-compose
up:
	docker-compose up --build -d

# Остановка docker-compose
down:
	docker-compose down