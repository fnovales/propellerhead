# Propellerhead Developer Technical Test

The application is implemented in Typescript with Postgres as persistent repository. It uses Loopback 4 framework to provide a REST API.
Note's endpoint has an optimistic blocking aproach because more than one user could be editing one note. 
When a note is creaed an ETag hash is added. Then to modify (PATCH, PUT) a note a valid ETag should be send in a "if-match" header. 
To delete a note, an ETag header is not required.
Customer's endpoint doesn't need a ETag hash because I don't think is convenient.


# Dockerize Postgres

docker pull postgres

docker run -d -p 5432:5432 --name propellerhead -e POSTGRES_PASSWORD=123456 postgres

* To configure a different connection string:
/src/datasources/db.datasource.config.json

# Postgres Database Script

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
	CONSTRAINT customers_pk PRIMARY KEY (id),
	CONSTRAINT customers_fk FOREIGN KEY (status_id) REFERENCES customers_status(id)
);

CREATE TABLE public.notes (
	id serial NOT NULL,
	description text NOT NULL,
	creation timestamptz NOT NULL DEFAULT now(),
	customer_id int4 NOT NULL,
	etag text NOT NULL,
	CONSTRAINT notes_pk PRIMARY KEY (id),
	CONSTRAINT notes_fk FOREIGN KEY (customer_id) REFERENCES customers(id)
);

INSERT INTO public.customers_status
(id, "name")
values
(1, 'prospective'),
(2, 'current'),
(3, 'non-active');

INSERT INTO public.customers
(status_id, "name", email, phone_number)
VALUES(1, 'test2', 'test1@gmail.com', '123456789');

INSERT INTO public.notes
(description, customer_id, etag)
values
('note 1', 1, 'etag1'),
('note 2', 1, 'etag2');

# Nodejs 

https://nodejs.org/en/download/

Downloads

Latest LTS Version: 12.16.1 (includes npm 6.13.4)

# Build and run

Move to propellerhead folder

npm install

npm start

http://localhost:3000/explorer/

* You can make almost all the transactions with this OneApi administrator
* You have to use another tool to make requests with headers

# Get customer status

GET http://localhost:3000/customers/status

# Add a customer

POST http://localhost:3000/customers
{
  "statusId": 1,
  "name": "test 2",
  "email": "test2@gmail.com",
  "phoneNumber": "123123123"
}

# Get a list of customers and sort

To get all customers

GET http://localhost:3000/customers

To get all the customer that contains the word "test" in theirs names and ordered by id 

GET http://localhost:3000/customers?filter={"where": { "name": {"like":"%25test%25"}},"order":"id DESC"}

* "%" character has to be escaped in like expression
* More information about filtering in loopback: https://loopback.io/doc/en/lb2/Where-filter
* More information about filtering in loopback: https://loopback.io/doc/en/lb2/Order-filter.html

# Get only one customer

GET http://localhost:3000/customers/1

# Modify customer's status

PATCH http://localhost:3000/customers/1
{
  "statusId": 2
}

# Add a note

POST http://localhost:3000/customers/notes
{
  "description": "note 3",
  "customerId": 1
}

# Get customer's notes

GET http://localhost:3000/customers/notes?filter={"where": {"customerId": 1}}

# Modify a note

PATCH http://localhost:3000/customers/notes/1
HEADER If-Match: etag property from note details
{
  "description": "change 1",
  "customerId": 1
}

* Notes have an etag property that is generated when is created. Then this etag property must be sent in a "If-Match" header in every PATCH or PUT request.

# Delete a note

DELETE http://localhost:3000/customers/notes/1

# Summary

It took me 1 day of work to implement the solution.
To update a note you have to send the customerId because is required field but if I had more time I could find a solution to this issue that is related to Loopback