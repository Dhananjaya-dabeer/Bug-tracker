# Bug Tracker

A simple bug tracking application built with Next.js, Prisma, and Radix UI.

## Table of Contents
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Assumptions](#assumptions)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Dhananjaya-dabeer/Bug-tracker.git
    cd Bug-tracker
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up the environment variables:
    - Create a `.env` file in the root of the project.
    - Add your database connection string as `DATABASE_URL`. For example:
      ```
      DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME"
      ```
    - Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DB_NAME` with your actual database credentials.

4. Generate Prisma client:
    ```bash
    npm run prisma:generate
    ```

## Running the Project

To run the application locally, use the following command:
```bash
npm run dev
