.PHONY: frontend backend frontend-run backend-run up down rebuild

frontend:
	cd frontend && npm install && npm run build

backend:
	cd backend && ./mvnw clean package

frontend-run:
	cd frontend && npm install && npm start

backend-run:
	cd backend && ./mvnw spring-boot:run

up:
	docker-compose up --build -d

down:
	docker-compose down

rebuild:
	docker-compose down -v
	docker-compose build --no-cache
	docker-compose up -d