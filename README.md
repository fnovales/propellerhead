# propellerhead

# Postgres Database script

CREATE TABLE public.customers_status (
	id int2 NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT customers_status_pk PRIMARY KEY (id)
);

CREATE TABLE public.customers (
	id serial NOT NULL,
	status_id int2 NOT NULL,
	creation timestamptz NOT NULL DEFAULT now(),
	"name" text NOT NULL,
	email text NULL,
	phone_number text NULL,
	CONSTRAINT customers_pk PRIMARY KEY (id)
);

ALTER TABLE public.customers ADD CONSTRAINT customers_fk FOREIGN KEY (status_id) REFERENCES customers_status(id);

CREATE TABLE public.notes (
	id serial NOT NULL,
	description text NOT NULL,
	creation timestamptz NOT NULL DEFAULT now(),
	customer_id int4 NOT NULL,
	CONSTRAINT notes_pk PRIMARY KEY (id)
);

ALTER TABLE public.notes ADD CONSTRAINT notes_fk FOREIGN KEY (customer_id) REFERENCES customers(id);

INSERT INTO public.customers_status
(id, "name")
values
(1, 'prospective'),
(2, 'current'),
(3, 'non-active');

INSERT INTO public.customers
(status_id, "name", email, phone_number)
VALUES(1, 'test1', 'test1@gmail.com', '123456789');

INSERT INTO public.notes
(description, customer_id)
values
('note1', 1),
('note2', 1);