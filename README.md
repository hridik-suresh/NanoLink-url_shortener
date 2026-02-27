# 🛠️ NanoLink API (Backend)

The robust engine behind NanoLink, a professional-grade URL shortening and analytics platform. Built with **Node.js** and **Express 5**, this API manages secure authentication, geographic visitor tracking, and automated email delivery systems.



## 🔗 Related Repositories
> **The user interface:** [NanoLink-UI (Frontend)](https://github.com/hridik-suresh/NanoLink)

---

## ✨ Key Features

### 🔐 Advanced Authentication
* **OAuth 2.0 (Google Login)**: Seamless social authentication integrated via `Passport.js`.
* **Gmail API Verification**: Custom verification flow using Google’s official API for high-reputation email delivery.
* **JWT Security**: Stateless session management with `jsonwebtoken` and `bcryptjs` password encryption.

### 📈 Data Intelligence & Analytics
* **Geographic Tracking**: IP-to-Location mapping (City/Country) using `geoip-lite`.
* **Device Fingerprinting**: Detailed device, browser, and OS detection via `ua-parser-js`.
* **Collision-Resistant IDs**: Fast, URL-friendly short ID generation using `nanoid`.

### 🗄️ Database & Performance
* **Mongoose ODM**: Structured MongoDB schemas with automated timestamping and indexing.
* **Paginated Analytics**: Efficient data retrieval for high-traffic links to ensure low-latency responses.

---

## 🛠️ Technical Stack

* **Runtime**: Node.js & Express v5
* **Database**: MongoDB (Mongoose)
* **Identity**: Passport.js (Google OAuth 2.0)
* **Communications**: Google APIs (Gmail v1)
* **Analytics**: GeoIP-lite & UA-Parser-JS
* **Environment**: Cross-env for consistent development/production flows

---
