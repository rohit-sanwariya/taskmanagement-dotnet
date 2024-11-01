# Dockerfile for WebAPI
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
EXPOSE 5165
EXPOSE 7280

# Set ASPNETCORE_URLS to bind to the desired port
 

# Install dotnet-ef tool
RUN dotnet tool install --global dotnet-ef
# RUN dotnet tool update -g linux-dev-certs
# RUN dotnet linux-dev-certs install
RUN dotnet dev-certs https
ENV PATH="$PATH:/root/.dotnet/tools"

# Install Netcat (nc)
RUN apt-get update && apt-get install -y netcat-openbsd

# Copy solution and project files
COPY ["taskmanagement.sln", "./"]
COPY ["taskmanagement.Core/taskmanagement.Core.csproj", "taskmanagement.Core/"]
COPY ["taskmanagement.Data/taskmanagement.Data.csproj", "taskmanagement.Data/"]
COPY ["taskmanagement.Services/taskmanagement.Services.csproj", "taskmanagement.Services/"]
COPY ["taskmanagement.API/taskmanagement.API.csproj", "taskmanagement.API/"]

# Restore dependencies
RUN dotnet restore "/src/taskmanagement.API/taskmanagement.API.csproj"

# Copy the entire source code
COPY . .

# Build and publish the project
WORKDIR "/src/taskmanagement.API"
RUN dotnet build -c Release
RUN dotnet publish -c Release -o /app/publish

# Set working directory to published location
WORKDIR "/app/publish"

# List the contents of the publish directory for verification
RUN ls -al /app/publish

# Wait for the database to be available and run migrations
COPY wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh

# Run migrations
CMD ["/wait-for-db.sh", "dotnet", "ef", "database", "update", "--project", "../taskmanagement.Data", "--startup-project", "/app/publish", "&&", "dotnet", "taskmanagement.API.dll"]

# Set entry point to published DLL
ENTRYPOINT ["dotnet", "taskmanagement.API.dll"]
