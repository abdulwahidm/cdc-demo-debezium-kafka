CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    price INT
);

INSERT INTO products (name, price) VALUES
('Apple', 10),
('Banana', 20);
