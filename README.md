# ⚙️ ShopSphere Core | E-Commerce API Engine

---

### 🚀 Overview
The high-performance, asynchronous server-side engine powering the ShopSphere e-commerce ecosystem. This application is structured around isolated controller modules that handle authentication pipelines, catalog streams, shopping cart memory tracking, and order checkout pipelines cleanly.

🔗 **Base API Endpoint:** https://ecomerence-backened.onrender.com/

---

### 🛠️ System Core Controllers

| Controller Module | Core Responsibilities |
| :--- | :--- |
| **🔐 Authentication** | Manages `register`, `login`, and `logout` operations to protect user data. |
| **📦 Product Collection** | Controls catalog flows including fetching whole arrays, sorting categories, and mutations. |
| **🛒 Shopping Cart** | Modifies user cart instances dynamically through fetching, posting, updating, and splicing data. |
| **📋 Order Processing** | Compiles item selections, updates delivery records, and cleans up historical transaction instances. |
| **💳 Payment Gateway** | Finalizes order transactions securely upon verifying checkout status. |

---

### 🗄️ Database Integration

*   **Engine Connection:** Modular structural initialization via an explicit asynchronous `mongoconnect()` method.
*   **Driver Layer:** Uses `mongoose` Object Data Modeling (ODM) to communicate fluidly with cloud-hosted Mongo clusters.
*   **Environment Safety:** Encapsulates connection strings and app constants within strict `dotenv` configuration schemas.

---

### 💻 Local Server Setup

1. **Clone the backend repository:**
   ```bash
   git clone https://github.com
   ```

2. **Configure your environment file (`.env`):**
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

3. **Initialize dependencies & start:**
   ```bash
   npm install
   npm start
   ```
