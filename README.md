# SocialTechForum

## Overview
SocialTechForum is a full-stack social forum platform designed for the high-tech community.  
Built with React on the client side and ASP.NET Core on the server side, following a clean 5-layer architecture.

## Features
- User registration and authentication with role management  
- Categories, topics, and threaded messages  
- Feedback system (likes, reactions) on messages  
- Real-time updates and notifications  
- Responsive and user-friendly UI  

## Technologies
- Frontend: React, Material-UI  
- Backend: ASP.NET Core, Entity Framework Core  
- Database: SQL Server (or your choice)  
- Version Control: GitHub  

## Getting Started
### Prerequisites
- Node.js and npm (for client)  
- .NET SDK (for server)  


### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Brachi-Itzkowitz/SocialTechForum.git
   cd SocialTechForum
   ```

2. Set up the server:
   - Navigate to the server folder:
     ```bash
     cd server
     ```
   - Restore server packages:
     ```bash
     dotnet restore
     ```
   - Configure database connection:
     * Open the file `Mock/database.cs`.
     * Update the connection string to point to your local SQL Server instance.
       For example:
       ```csharp
       optionsBuilder.UseSqlServer("server=localSqlServer;database=SocialNetwork;trusted_connection=true;TrustServerCertificate=True");
       ```
     ✅ Make sure SQL Server is running and the connection string is correct before starting the server.
       
   - Run the server:
     ```bash
     dotnet run
     ```

3. Set up the client:
   - Open a new terminal window and navigate to the client folder:
     ```bash
     cd client
     ```
   - Install client dependencies:
     ```bash
     npm install
     ```
   - Run the client:
     ```bash
     npm start
     ```
