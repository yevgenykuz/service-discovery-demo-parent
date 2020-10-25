FROM mcr.microsoft.com/dotnet/core/sdk:2.2
RUN apt-get update
RUN apt-get install zip unzip
WORKDIR /app
COPY . /app
RUN dotnet build

EXPOSE 5551

COPY start.sh ./start.sh
CMD ./start.sh