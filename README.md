# Aulia.pl

E-dziennik dla szkół. Projekt na przedmiot programowanie zespołowe.

## Z czego to jest zrobione

Backend to Java 25, Spring Boot 4 i Spring Modulith. jedna aplikacja podzielona na moduły (konta, szkoła, plan, frekwencja, oceny i tak dalej). Dane trzymamy w PostgreSQL, sesje i cache w Valkey (redis).

Strony www są w React z Vite i Tailwindem, aplikacje na telefon w React Native (przez Expo), z Tailwindem przez NativeWind. Kolory, klient API, tłumaczenia i logika wspólna dla www i telefonu leżą w `frontend/packages/`.

## Co trzeba mieć

- Docker Desktop
- JDK 25 (np. Temurin)
- Node 24 (najwygodniej przez nvm, wersja jest w `frontend/.nvmrc`)
- pnpm, instalowany przez `npm install -g pnpm`
- na telefonie aplikacja Expo Go z App Store albo Google Play

## Pierwsze uruchomienie

```
git clone https://github.com/Projekt-PZ-2026/aulia
cd aulia
cp .env.example .env
cd frontend
nvm use
pnpm install
```

## Backend

Z katalogu głównego:

```
docker compose up --build
```

To stawia bazę, Valkey, Grafanę i backend. Sprawdzenie, czy żyje:

```
curl http://localhost:8080/api/ping
```

Grafana jest pod http://localhost:3000.

Jeśli zmienia się kod backendu, szybciej jest odpalać go bez Dockera (baza i Valkey mogą dalej chodzić w Dockerze):

```
cd backend
./gradlew :app:bootRun
```

Migracje bazy są w `backend/app/src/main/resources/db/migration` i odpalają się same przy starcie backendu. Nowa migracja to nowy plik z kolejnym numerem, np. `V2__add_grades.sql`. Migracji, która już jest na main, nigdy nie zmieniamy, tylko dodajemy kolejną.

Role i uprawnienia w bazie zakłada `deploy/postgres/init.sh`, ale tylko przy pierwszym starcie, na pustym dysku, p o zmianie tego pliku trzeba usunąć:

```
docker compose down -v
```

## Strony www

```
cd frontend
pnpm dev --filter staff-web
```

Vite poda adres, zwykle http://localhost:5173. Zamiast `staff-web` można wpisać `family-web`. Obie strony mogą chodzić jednocześnie, druga dostanie kolejny port.

## Aplikacje na telefon

Telefon i komputer muszą być w tej samej sieci Wi-Fi, a backend musi działać.

```
cd frontend
pnpm --filter staff-mobile start
```

Zeskanuj kod QR aparatem. Aplikacja sama łączy się z backendem na tym komputerze, z którego została uruchomiona. Inny adres backendu ustawisz przez `EXPO_PUBLIC_API_URL`, np. `EXPO_PUBLIC_API_URL=http://192.168.1.23:8080 pnpm --filter staff-mobile start`.

Druga aplikacja to `family-mobile`.

## Gdzie co jest

```
backend/
  app/         aplikacja Spring Boot: start, konfiguracja, kontrolery
  core/        moduły dziennika, każdy w osobnym katalogu
frontend/
  apps/        staff-web, family-web, staff-mobile, family-mobile
  packages/    kod wspólny
    api-client   klient API generowany z openapi/
    core         logika bez widoku: pobieranie danych, walidacja
    i18n         teksty interfejsu
    theme        kolory, typografia, odstępy
    ui-web       komponenty dla stron www
    ui-native    te same komponenty dla telefonu
openapi/       opis API, z niego generuje się klient
deploy/        Dockerfile i compose
```

Kilka zasad, żeby się nie pogubić:

- Nowa funkcja backendu to nowy moduł w `backend/core/` albo nowy pakiet w istniejącym. Moduły rozmawiają ze sobą tylko przez swoje publiczne API, pilnuje tego test w `app/`.
- Nowy endpoint najpierw dopisujesz do `openapi/aulia.yaml`, potem robisz go w backendzie, a klient dla frontendu odświeża się przez `pnpm generate` w `frontend/`.
- Logika ekranu (pobieranie, zapis, walidacja) idzie do `packages/core`, a aplikacje dokładają tylko widok. Wtedy www i telefon mają ją raz.
- Komponent używany w więcej niż jednej aplikacji trafia do `ui-web` albo `ui-native`. Jeśli jest potrzebny w obu, robimy go w obu z tymi samymi nazwami i propsami.
- Teksty widoczne dla użytkownika tylko przez `packages/i18n`.

## Testy i formatowanie

```
cd backend && ./gradlew spotlessApply build
cd frontend && pnpm format && pnpm lint && pnpm typecheck && pnpm test
```

CI na GitHubie robi to samo przy każdym pull requeście i nie przepuści niesformatowanego kodu.
