-- Drop existing tables and sequences if they exist
DROP TABLE IF EXISTS public.cats;
DROP TABLE IF EXISTS public.dogs;
DROP SEQUENCE IF EXISTS public.cats_id_seq;
DROP SEQUENCE IF EXISTS public.dogs_id_seq;

-- Create the database structure
CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';

CREATE TABLE public.cats (
    id integer NOT NULL,
    name text NOT NULL,
    age integer
);

CREATE SEQUENCE public.cats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.cats_id_seq OWNED BY public.cats.id;

CREATE TABLE public.dogs (
    id integer NOT NULL,
    name text NOT NULL,
    age integer
);

CREATE SEQUENCE public.dogs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.dogs_id_seq OWNED BY public.dogs.id;

ALTER TABLE ONLY public.cats
    ALTER COLUMN id SET DEFAULT nextval('public.cats_id_seq'::regclass);

ALTER TABLE ONLY public.dogs
    ALTER COLUMN id SET DEFAULT nextval('public.dogs_id_seq'::regclass);

-- Copy data using tab-delimited format
COPY public.cats(id, name, age) FROM stdin DELIMITER E'\t';
1	Fluffy	7
2	Madame Meow	9
3	Pawsley	2
\.

COPY public.dogs(id, name, age) FROM stdin DELIMITER E'\t';
1	Whiskey	6
2	Woofles	3
\.

-- Set sequences to the correct values
SELECT pg_catalog.setval('public.cats_id_seq', 3, true);
SELECT pg_catalog.setval('public.dogs_id_seq', 2, true);

-- Add primary keys
ALTER TABLE ONLY public.cats
    ADD CONSTRAINT cats_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.dogs
    ADD CONSTRAINT dogs_pkey PRIMARY KEY (id);

GRANT ALL ON SCHEMA public TO PUBLIC;

