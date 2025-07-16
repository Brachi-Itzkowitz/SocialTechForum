# 🌐 SocialTechForum

---

## 📝 Overview

**SocialTechForum** is a full-stack social forum platform built for the high-tech community.

It combines a **React** frontend with a robust **ASP.NET Core** backend, following a clean 5-layer architecture for maintainability and scalability.

---

## 🔧 Features

- 👥 User registration and authentication with role management  
- 🗂️ Categories, topics, and threaded messages  
- 👍 Feedback system (likes, reactions) on messages  
- 🔔 Real-time updates and notifications  
- 📱 Responsive and user-friendly UI  

---

## 🛠️ Technologies Used

- 🎨 Frontend: React, Material-UI  
- 🖥️ Backend: ASP.NET Core, Entity Framework Core  
- 🗃️ Database: SQL Server (or compatible)  
- 🗂️ Version Control: GitHub  

---

## 🚀 Getting Started

### 📌 Prerequisites

Ensure the following tools are installed:

- ✅ [Node.js](https://nodejs.org/) and npm (for the client)  
- ✅ [.NET SDK](https://dotnet.microsoft.com/download) (for the server)  



### Installation

---

#### 1. 🚀 Clone the Repository

```bash
git clone https://github.com/Brachi-Itzkowitz/SocialTechForum.git
cd SocialTechForum
```

---

#### 2. 🖥️ Set Up the Server

##### ➤ Navigate to the server folder:
```bash
cd server
```

##### ➤ Restore server packages:
```bash
dotnet restore
```

##### ➤ 🔐 Create `appsettings.json` in the Web API project
1. Open the `SocialNetwork` folder (the API layer).
2. Create a new file named `appsettings.json`.
3. Paste the following content and replace placeholders with your own credentials:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "Jwt": {
    "Key": "your-secret-key-here",
    "Issuer": "https://localhost:7147",
    "Audience": "https://localhost:7147"
  },
  "MailJet": {
    "ApiKey": "your-mailjet-api-key",
    "ApiSecret": "your-mailjet-secret",
    "SenderEmail": "your-email@gmail.com",
    "SmtpHost": "in-v3.mailjet.com",
    "SmtpPort": "587"
  }
}
```

> ⚠️ **Note**: `appsettings.json` is ignored by Git (`.gitignore`). You must create it manually.

##### ➤ 📬 Register with MailJet and configure

1. Visit [https://www.mailjet.com](https://www.mailjet.com)
2. Sign up for a free account
3. Go to **Account → API Keys**
4. Copy the **API Key** and **Secret Key**
5. Insert them into the `MailJet` section in `appsettings.json`

##### ➤ Configure the database connection:

1. Open the file `Mock/database.cs`
2. Replace the connection string with your local SQL Server instance. Example:

```csharp
optionsBuilder.UseSqlServer("server=localSqlServer;database=SocialNetwork;trusted_connection=true;TrustServerCertificate=True");
```

✅ **Ensure SQL Server is running and the connection string is valid before proceeding.**

##### ➤ Run the server:
```bash
dotnet run
```

---

#### 3. 🌐 Set Up the Client

##### ➤ Open a new terminal and navigate to the client folder:
```bash
cd client
```

##### ➤ Install client dependencies:
```bash
npm install
```

##### ➤ Run the client:
```bash
npm start
```

---

You are now ready to develop and test the SocialTechForum platform locally 🎉
