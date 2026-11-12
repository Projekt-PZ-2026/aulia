create table announcement (
    id bigint generated always as identity primary key,
    text varchar(500) not null,
    created_at timestamptz not null default now()
);
