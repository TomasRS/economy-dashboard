# Economy Dashboard
![CI/CD to Azure](https://github.com/TomasRS/economy-dashboard/workflows/CI/CD%20to%20Azure/badge.svg)
![.NET Core Version](https://img.shields.io/badge/.NET%20Core-v3.1-blue)
![Angular Version](https://img.shields.io/badge/Angular-v9.1.9-blue)

## What is it?
It's a web application that displays data from the Central Bank of Argentina with charts and it also shows the USD-ARS market exchange values with cards.

[Check it out!](https://economydashboard.z13.web.core.windows.net/)

[Check out API documentation](https://dashboardsargentina.azurewebsites.net/api/swagger)

[Check out the Trello board](https://trello.com/b/oS1XoqTg/economy-dashboard-app-mvp-1)


## Solution architecture & decisions
![Architecture Diagram](/architecture-tecnology-diagrams/architecture_diagram.jpg?raw=true "Architecture Diagram")

It is integrated with Github Actions to have an automated CI/CD pipeline to build the code and deploy the Azure functions to my personal Azure environment.

## Tech stack
![Architecture Diagram](/architecture-tecnology-diagrams/stack.jpg?raw=true "Stack")
