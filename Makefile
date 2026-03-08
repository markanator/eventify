.PHONY: up down down-clean run dev

up:
	docker compose up -d

down:
	docker compose down

down-clean:
	docker compose down -v

run:
	dotnet run --project API

dev:
	dotnet watch run --project API --non-interactive
