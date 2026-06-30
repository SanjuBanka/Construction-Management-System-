-- ============================================================
-- Smart Workforce & Project Manager (SWPM)
-- Normalized MySQL Schema (3NF)
-- ============================================================

DROP DATABASE IF EXISTS swpm_db;
CREATE DATABASE swpm_db;
USE swpm_db;

-- ------------------------------------------------------------
-- USERS: unified auth table for Admin / Manager / Employee / Customer
-- ------------------------------------------------------------
CREATE TABLE users (
    id                BIGINT AUTO_INCREMENT PRIMARY KEY,
    emp_id            VARCHAR(20)  UNIQUE,
    name              VARCHAR(100) NOT NULL,
    username          VARCHAR(50)  NOT NULL UNIQUE,
    email             VARCHAR(100) NOT NULL UNIQUE,
    password          VARCHAR(255) NOT NULL,
    role              ENUM('ADMIN','MANAGER','EMPLOYEE','CUSTOMER') NOT NULL,
    skill             VARCHAR(100),
    job_role          VARCHAR(100),
    experience_years  INT,
    contact_number    VARCHAR(15),
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_name  VARCHAR(150) NOT NULL,
    budget        DECIMAL(15,2),
    start_date    DATE,
    end_date      DATE,
    status        ENUM('PLANNED','IN_PROGRESS','COMPLETED','ON_HOLD') DEFAULT 'PLANNED',
    manager_id    BIGINT,
    customer_id   BIGINT,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_project_manager  FOREIGN KEY (manager_id)  REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT fk_project_customer FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE inventory (
    id             BIGINT AUTO_INCREMENT PRIMARY KEY,
    item_name      VARCHAR(100) NOT NULL,
    quantity       INT NOT NULL DEFAULT 0,
    item_desc      VARCHAR(255),
    reorder_level  INT DEFAULT 10
);

CREATE TABLE materials (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    request_id          VARCHAR(30) NOT NULL UNIQUE,
    project_id          BIGINT NOT NULL,
    item_id             BIGINT NOT NULL,
    quantity_requested  INT NOT NULL,
    status              ENUM('PENDING','APPROVED','REJECTED','FULFILLED') DEFAULT 'PENDING',
    requested_by        BIGINT,
    requested_date      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_material_project FOREIGN KEY (project_id)   REFERENCES projects(id)  ON DELETE CASCADE,
    CONSTRAINT fk_material_item    FOREIGN KEY (item_id)      REFERENCES inventory(id) ON DELETE RESTRICT,
    CONSTRAINT fk_material_user    FOREIGN KEY (requested_by) REFERENCES users(id)     ON DELETE SET NULL
);

-- Seed data (passwords are bcrypt placeholders — register real users via /api/auth/register)
INSERT INTO users (emp_id, name, username, email, password, role, skill, job_role, experience_years, contact_number) VALUES
('EMP001', 'Sanju Admin',   'admin',    'admin@swpm.com', '$2a$10$replace_with_real_bcrypt_hash', 'ADMIN',   'Administration', 'System Admin',    5, '9999900001'),
('EMP002', 'Rahul Manager', 'rmanager', 'rahul@swpm.com', '$2a$10$replace_with_real_bcrypt_hash', 'MANAGER', 'Project Mgmt',    'Project Manager', 4, '9999900002'),
('EMP003', 'Priya Employee','priya',    'priya@swpm.com', '$2a$10$replace_with_real_bcrypt_hash', 'EMPLOYEE','Java, React',     'Developer',       2, '9999900003');

INSERT INTO users (name, username, email, password, role, contact_number) VALUES
('Vikas Customer', 'vikas', 'vikas@client.com', '$2a$10$replace_with_real_bcrypt_hash', 'CUSTOMER', '9999900004');

INSERT INTO inventory (item_name, quantity, item_desc, reorder_level) VALUES
('Cement Bags', 500, '50kg OPC cement bags', 100),
('Steel Rods', 200, '12mm TMT steel rods', 50),
('Bricks', 10000, 'Red clay bricks', 2000);

INSERT INTO projects (project_name, budget, start_date, end_date, status, manager_id, customer_id) VALUES
('Riverside Apartments', 2500000.00, '2026-01-10', '2026-12-31', 'IN_PROGRESS', 2, 4);

INSERT INTO materials (request_id, project_id, item_id, quantity_requested, status, requested_by) VALUES
('REQ-1001', 1, 1, 200, 'APPROVED', 2);
