#!/bin/sh
set -e

psql -v ON_ERROR_STOP=1 -v app_password="$APP_DB_PASSWORD" --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<'SQL'
create role aulia_app login nobypassrls password :'app_password';

alter default privileges in schema public
    grant select, insert, update, delete on tables to aulia_app;

alter default privileges in schema public
    grant usage on sequences to aulia_app;
SQL
