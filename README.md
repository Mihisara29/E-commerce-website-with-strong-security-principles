# 🛡️ E-Commerce Web Application — Secure Submission Readme

**Repository:** [https://github.com/Mihisara29/E-commerce-website-with-strong-security-principles](https://github.com/Mihisara29/E-commerce-website-with-strong-security-principles)
**Frontend origin:** `https://localhost:5173`
**Backend URL (default):** `https://localhost:8443/`
**Author:** Induwara Mihisara — `SE2021025`

This README explains how to run, configure, secure, test, and submit your assessment. It also documents how you satisfied the assignment requirements (OWASP Top 10 mitigations, OIDC authentication, access control, DB script and Tomcat deployment).

---

# Overview

This project is a small e-commerce web application focused on security.
Key features implemented for the assessment:

* User authentication & logout with **OIDC** (Auth0).
* Display of authenticated user profile (username, name, email, contact, country).
* Create/view/manage product purchase orders (users can manage only their own orders).
* Input validation for purchases: date , time (10 AM/11 AM/12 PM),location, product list, quantity, message.
* HTTPS enabled (local keystore).
* OWASP Top 10 mitigations applied (see Security section).
* Configurable via environment variables (`.env.example` included).

---

# Tech Stack

* Backend: **Spring Boot** (embedded Tomcat by default)
* Security: **Spring Security** with **OAuth2/OIDC (Auth0)**
* Database: **MySQL** (can replace with other DBs)
* Frontend: **React** (dev server runs at `https://localhost:5173`)
* Build: **Maven**

---

# Quick Start (development)

## Prerequisites

* Java 17+ (or project JDK)
* Maven 3.6+
* MySQL 8+
* Node.js + npm (for frontend)
* A local keystore (`keystore.p12`) for HTTPS 

## 1. Clone

```bash
git clone https://github.com/Mihisara29/E-commerce-website-with-strong-security-principles.git
cd E-commerce-website-with-strong-security-principles
```

## 2. Create database

Run the SQL in `db/schema.sql` (example provided below).
Example:

```sql
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 06, 2025 at 08:10 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` bigint(20) NOT NULL,
  `added_date` datetime(6) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `image_url`, `name`, `price`) VALUES
(1, 'https://storage.cloud.google.com/my-ecommerce-images-123/Sport_Items/Swimming_goggles.jpg', 'Swimming Goggles', 900),
(2, 'https://storage.cloud.google.com/my-ecommerce-images-123/Sport_Items/base_ball_bat.jpg', 'Baseball Bat', 3000),
(3, 'https://storage.cloud.google.com/my-ecommerce-images-123/Sport_Items/basket_ball.jpg', 'Basketball', 4500),
(4, 'https://storage.cloud.google.com/my-ecommerce-images-123/Sport_Items/beach_volleyball.jpg', 'Beach Volleyball', 5000),
(5, 'https://storage.cloud.google.com/my-ecommerce-images-123/Sport_Items/cricket_bat.jpg', 'Cricket Bat', 11000),
(6, 'https://storage.cloud.google.com/my-ecommerce-images-123/Sport_Items/cricket_gloves.jpg', 'Cricket Gloves', 4000),
(7, 'https://storage.cloud.google.com/my-ecommerce-images-123/Sport_Items/cricket_helmet.jpg', 'Cricket Helmet', 6000),
(8, 'https://storage.cloud.google.com/my-ecommerce-images-123/Sport_Items/foot_ball.jpg', 'Football', 5000),
(9, 'https://storage.cloud.google.com/my-ecommerce-images-123/Sport_Items/football_shoe.jpg', 'Football Shoes', 15000),
(10, 'https://storage.cloud.google.com/my-ecommerce-images-123/Sport_Items/volleyball_net.jpg', 'Volleyball Net', 8000);

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `id` bigint(20) NOT NULL,
  `delivery_location` varchar(255) DEFAULT NULL,
  `delivery_time` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `total_price` double NOT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  ADD UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
```

## 3. Configure environment variables

Create a local `.env` (do **not** commit). Use `.env.example` as template. Required variables:

```
DB_URL=jdbc:mysql://localhost:3306/ecommerce_db
DB_USERNAME=root
DB_PASSWORD=your_db_password

AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
AUTH0_ISSUER=https://<your-tenant>.us.auth0.com/

FRONTEND_URL=https://localhost:5173
SERVER_PORT=8443

KEYSTORE_PATH=classpath:keystore.p12
KEYSTORE_PASSWORD=your_keystore_password
KEYSTORE_ALIAS=myapp
```

### IntelliJ Run Configuration

* Run → Edit Configurations → select Spring Boot run → Environment variables → paste keys above.

## 4. Run backend

```bash
mvn clean spring-boot:run
```

Visit: `https://localhost:8443/`

## 5. Run frontend (React)

Go to frontend folder (if included) and run dev server (example):

```bash
cd frontend
npm install
npm start
# React dev server is expected at https://localhost:5173
```

Make sure the frontend uses HTTPS (`https://localhost:5173`) and the backend CORS allows that origin.

---

# How authentication + access control works

* Users authenticate via **Auth0** OIDC. Configure allowed callback URL:

  ```
  https://localhost:8443/login/oauth2/code/auth0
  ```

  and logout redirect URLs (to frontend): `https://localhost:5173`

# Security — OWASP Top 10 mitigation summary

Below is how the project addresses common OWASP Top 10 items (show this in your blog too):

* **A1 Injection** (SQLi): use **Spring Data JPA** / prepared statements only; never concatenate SQL from user input. Validate inputs.
* **A2 Broken Authentication**: use **Auth0 (OIDC)** for secure auth; do not roll your own password handling. Ensure secure cookies, session timeouts.
* **A3 Sensitive Data Exposure**: HTTPS enforced (keystore), secrets in env vars (not in VCS), do not log secrets.
* **A4 XML External Entities (XXE)**: avoid parsing untrusted XML; do not accept XML uploads.
* **A5 Broken Access Control**: every order query is filtered by username from token; update/delete check ownership and return `403` when unauthorized.
* **A6 Security Misconfiguration**: disable debug in production, do not expose actuator endpoints without auth, set secure headers (HSTS), CORS restricted to `https://localhost:5173`.
* **A7 Cross-Site Scripting (XSS)**: sanitize any stored user-generated content, use output encoding in views, allow React frontend to escape content by default.
* **A8 Insecure Deserialization**: do not accept serialized Java objects from clients.
* **A9 Using Components with Known Vulnerabilities**: keep dependencies updated; scan with `mvn dependency:tree` or SCA tools.
* **A10 Insufficient Logging & Monitoring**: log security-relevant events (login/logout failures), avoid logging PII and secrets.

---

# Preventing common mistakes before submitting

* Remove any real secrets:

  * Replace `application.properties` values with placeholders like `${DB_USERNAME}` etc.
  * Add `.env.example` that documents required variables.
  * Add `.gitignore` entries for `.env`, `*.p12`, `*.jks`, `target/`, `.idea/`, `.crt`, `.key`.

* If you previously committed secrets:

  * **Rotate** the compromised secrets (Auth0 secret, DB password, keystore password).
  * Remove secrets from git history (use `git filter-repo` or BFG repo cleaner).

* Verify before push:

```bash
git grep -n "AUTH0_CLIENT_SECRET"
git grep -n "KEYSTORE_PASSWORD"
git grep -n "password="
```

No matches should show secret values.

---

# Packaging & Tomcat deployment (for examiner)

> **Note:** Spring Boot uses embedded Tomcat by default. The repo includes instructions for both embedded and standalone Tomcat.

## Build WAR

1. Set `<packaging>war</packaging>` in `pom.xml` and mark the embedded Tomcat dependency as `provided`.
2. Change main application to extend `SpringBootServletInitializer`.

## Deploy to standalone Tomcat

1. Build:

```bash
mvn clean package
```

2. Copy WAR:

```bash
cp target/<appname>.war $TOMCAT_HOME/webapps/
```

3. Configure Tomcat environment variables:

**Linux/macOS** — create `$TOMCAT_HOME/bin/setenv.sh`

```bash
export DB_USERNAME=root
export DB_PASSWORD=...
export AUTH0_CLIENT_ID=...
export AUTH0_CLIENT_SECRET=...
export KEYSTORE_PASSWORD=...
```

`chmod +x $TOMCAT_HOME/bin/setenv.sh`

**Windows** — create `setenv.bat` with `set` commands.

4. Start Tomcat:

```bash
$TOMCAT_HOME/bin/startup.sh
```

5. Access:

```
https://localhost:8443/<context-path>/
```

---

## 📝 Blog

Read about my experience building a secure e-commerce web application on Medium:  
[Building a Secure E-Commerce Web Application: My Experience](https://medium.com/@induwaramihisara/building-a-secure-e-commerce-web-application-my-experience-02c76661b8e0)

## 🎥 The video of the project

Watch the full demo on LinkedIn:  
[[Watch Video]](https://www.linkedin.com/posts/induwara-mihisara-9572712a4_webdevelopment-ecommerce-cybersecurity-activity-7370027231512948736-fG0c?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEldmxMBnPOO2hlV1Sy_92H2m4wVZYUOrNU)
