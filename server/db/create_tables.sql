-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 100001 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    username character(20) COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    display character varying COLLATE pg_catalog."default",
    roles character(10)[] COLLATE pg_catalog."default",
    org integer,
    avatar character varying COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to quataqua;


-- Table: public.watermeters

-- DROP TABLE public.watermeters;

CREATE TABLE IF NOT EXISTS public.watermeters
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1315145198 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "number" character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."C" NOT NULL,
    made_by smallint NOT NULL,
    model smallint NOT NULL,
    made_on date NOT NULL,
    serial_number character(20) COLLATE pg_catalog."default",
    misc json,
    household integer,
    update_by integer,
    update_on timestamp with time zone DEFAULT now(),
    CONSTRAINT gauges_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.watermeters
    OWNER to quataqua;


-- Table: public.work_orders

-- DROP TABLE public.work_orders;

CREATE TABLE IF NOT EXISTS public.work_orders
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1000001 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    type character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    description character varying COLLATE pg_catalog."default",
    state smallint NOT NULL DEFAULT 0,
    created_by integer,
    created_on timestamp with time zone DEFAULT now(),
    updated_on timestamp with time zone DEFAULT now(),
    CONSTRAINT work_orders_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.work_orders
    OWNER to postgres;


-- Table: public.tasks

-- DROP TABLE public.tasks;

CREATE TABLE IF NOT EXISTS public.tasks
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 100000001 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    order_id integer NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    description character varying COLLATE pg_catalog."default" NOT NULL,
    step smallint NOT NULL DEFAULT 0,
    variables json,
    assignee integer NOT NULL,
    completed boolean DEFAULT false,
    created_on timestamp with time zone DEFAULT now(),
    updated_on timestamp with time zone DEFAULT now(),
    CONSTRAINT tasks_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.tasks
    OWNER to postgres;


-- Table: public.readings

-- DROP TABLE public.readings;

CREATE TABLE IF NOT EXISTS public.readings
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 100000000001 MINVALUE 100000000001 MAXVALUE 9223372036854775807 CACHE 1 ),
    meter_id integer NOT NULL,
    reading double precision NOT NULL,
    update_on timestamp with time zone NOT NULL DEFAULT now(),
    update_by integer NOT NULL,
    CONSTRAINT readings_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.readings
    OWNER to quataqua;


-- Table: public.permissions

-- DROP TABLE public.permissions;

CREATE TABLE IF NOT EXISTS public.permissions
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1001 MINVALUE 1001 MAXVALUE 2147483647 CACHE 1 ),
    object_type character varying COLLATE pg_catalog."default" NOT NULL,
    operation "char" NOT NULL,
    roles character varying[] COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT permissions_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.permissions
    OWNER to quataqua;


-- Table: public.households

-- DROP TABLE public.households;

CREATE TABLE IF NOT EXISTS public.households
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 100001 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    longitude double precision,
    latitude double precision,
    address character varying COLLATE pg_catalog."default",
    owner character varying COLLATE pg_catalog."default" NOT NULL,
    district integer NOT NULL,
    CONSTRAINT households_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.households
    OWNER to quataqua;