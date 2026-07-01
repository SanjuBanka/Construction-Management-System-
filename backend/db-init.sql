-- Database initialization for the Spring Boot backend and frontend data model

CREATE DATABASE IF NOT EXISTS construction_db;
USE construction_db;

DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS payroll;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS materials;
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL,
  skill VARCHAR(255) NOT NULL,
  experience INT NOT NULL
);

CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL,
  employee_id BIGINT NULL,
  FOREIGN KEY (employee_id) REFERENCES employees(id)
);

CREATE TABLE projects (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  status VARCHAR(100) NOT NULL DEFAULT 'Planning',
  budget DECIMAL(15,2) DEFAULT 0.00
);

CREATE TABLE tasks (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  assigned_to VARCHAR(255) NOT NULL,
  status VARCHAR(100) NOT NULL,
  deadline VARCHAR(50) NOT NULL,
  project_id BIGINT NULL,
  priority VARCHAR(50) DEFAULT 'Normal',
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

CREATE TABLE inventory (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  item_name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  unit VARCHAR(50) NOT NULL,
  location VARCHAR(255),
  unit_cost DECIMAL(12,2) DEFAULT 0.00
);

CREATE TABLE materials (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  supplier VARCHAR(255),
  quantity INT NOT NULL DEFAULT 0,
  unit_cost DECIMAL(12,2) DEFAULT 0.00,
  status VARCHAR(100) DEFAULT 'Available'
);

CREATE TABLE departments (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  manager_id BIGINT NULL,
  FOREIGN KEY (manager_id) REFERENCES employees(id)
);

CREATE TABLE attendance (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  employee_id BIGINT NOT NULL,
  attendance_date DATE NOT NULL,
  status VARCHAR(50) NOT NULL,
  hours_worked DECIMAL(5,2) DEFAULT 0.00,
  FOREIGN KEY (employee_id) REFERENCES employees(id)
);

CREATE TABLE payroll (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  employee_id BIGINT NOT NULL,
  salary DECIMAL(15,2) NOT NULL,
  bonus DECIMAL(15,2) DEFAULT 0.00,
  pay_date DATE NOT NULL,
  status VARCHAR(100) DEFAULT 'Pending',
  FOREIGN KEY (employee_id) REFERENCES employees(id)
);

CREATE TABLE clients (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  contact VARCHAR(255),
  email VARCHAR(255),
  project_id BIGINT NULL,
  address VARCHAR(512),
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

INSERT INTO projects (name, description, start_date, end_date, status, budget)
VALUES
  ('Downtown Office Renovation', 'Renovation of the downtown corporate office.', '2026-06-01', '2026-12-15', 'In Progress', 850000.00),
  ('Highway Safety Upgrade', 'Install safety barriers and signage on Route 12.', '2026-07-10', '2027-01-20', 'Planning', 420000.00);

INSERT INTO employees (name, email, role, skill, experience)
VALUES
  ('Aarav Patel', 'aarav.patel@example.com', 'Project Manager', 'Project Planning', 8),
  ('Maya Singh', 'maya.singh@example.com', 'Site Engineer', 'Structural Engineering', 5);

INSERT INTO users (name, email, password, role, employee_id)
VALUES
  ('Admin User', 'admin@construct.com', 'admin123', 'admin', NULL),
  ('Employee User', 'employee@construct.com', 'emp123', 'employee', 2),
  ('Staff User', 'staff@construct.com', 'staff123', 'staff', NULL);

INSERT INTO tasks (title, assigned_to, status, deadline, project_id, priority)
VALUES
  ('Finalize foundation plans', 'Aarav Patel', 'In Progress', '2026-07-05', 1, 'High'),
  ('Inspect material delivery', 'Maya Singh', 'Pending', '2026-07-02', 1, 'Normal');

INSERT INTO inventory (item_name, quantity, unit, location, unit_cost)
VALUES
  ('Cement Bags', 120, 'bags', 'Warehouse A', 5.75),
  ('Steel Rods', 300, 'pieces', 'Warehouse B', 12.40);

INSERT INTO materials (name, supplier, quantity, unit_cost, status)
VALUES
  ('Bricks', 'ABC Suppliers', 5000, 0.35, 'Available'),
  ('Sand', 'BuildCo', 250, 25.00, 'Available');

INSERT INTO departments (name, manager_id)
VALUES
  ('Engineering', 1),
  ('Procurement', 2);

INSERT INTO clients (name, contact, email, project_id, address)
VALUES
  ('Sunrise Developers', 'Rahul Mehta', 'rahul@sunrisedev.com', 1, '123 Main St'),
  ('Skyline Builders', 'Priya Rao', 'priya@skyline.com', 2, '456 Market Ave');

INSERT INTO attendance (employee_id, attendance_date, status, hours_worked)
VALUES
  (1, '2026-06-21', 'Present', 8.00),
  (2, '2026-06-21', 'Present', 7.50);

INSERT INTO payroll (employee_id, salary, bonus, pay_date, status)
VALUES
  (1, 4500.00, 500.00, '2026-06-30', 'Paid'),
  (2, 3200.00, 200.00, '2026-06-30', 'Paid');
