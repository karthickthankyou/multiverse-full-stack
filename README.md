# multiverse-full-stack

## Table of Contents

- [Project Overview](#project-overview)
- [Demos](#demos)
- [Key Features](#key-features)
- [Installation](#installation)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [License](#license)
- [Contact](#contact)

## Project Overview

This project aims to create an innovative marketplace for text adventure stories. It provides a platform where writers can showcase their creativity by crafting interactive narratives with branching paths and multiple outcomes. By offering readers the opportunity to explore diverse storylines and make choices that shape the outcome, the project aims to deliver a captivating and immersive storytelling experience.

## Demos

Check out the live demos of different components and applications within the project:

- **Multiverse web app:** [multiverse.iamkarthick.com](https://multiverse.iamkarthick.com)
- **Writer app:** [writer.multiverse.iamkarthick.com](https://writer.multiverse.iamkarthick.com)
- **Graphql API:** [api.multiverse.iamkarthick.com/graphql](https://api.multiverse.iamkarthick.com/graphql)
- **Rest API:** [api.multiverse.iamkarthick.com/search](https://api.multiverse.iamkarthick.com/search)
- **UI Library (Storybook):** [ui.multiverse.iamkarthick.com](https://ui.multiverse.iamkarthick.com)

Feel free to explore the demos to get a better understanding of the project and its different components.

## Key Features

The project enables writers to:

- Write captivating stories: Unleash your imagination and create engaging text adventure stories that captivate readers.
- Create alternative branches: Extend existing popular stories by creating alternative branches, allowing readers to explore different paths and outcomes.
- Foster crossovers: Seamlessly blend multiple stories together to create thrilling crossovers, merging different worlds and characters.

### Benefits for Writers

- Platform for creativity: Writers have a dedicated space to unleash their creativity and craft interactive narratives.
- Engagement and recognition: Gain recognition and build a following as readers engage with and explore your stories.
- Collaboration opportunities: Collaborate with other writers to create collaborative adventures or intertwine storylines for a unique storytelling experience.

### Benefits for Readers

- Diverse storylines: Discover a vast selection of stories with multiple beginnings and endings, providing endless possibilities and adventures.
- Immersive experience: Immerse yourself in interactive narratives that respond to your choices, allowing you to shape the outcome and experience a personalized journey.
- Explore new worlds: Encounter crossovers and interconnected storylines, where characters and worlds collide, expanding the boundaries of storytelling.

By providing a dynamic marketplace for text adventure stories, this project aims to redefine the storytelling landscape, empowering writers and delighting readers with unique and interactive narratives.

## Installation

To get started with the project, follow the steps below:

### Prerequisites

- Node.js (version 14.x or later) and npm (version 7.x or later) installed on your machine.
- Yarn package manager (version 1.x) installed globally.

### Clone the Repository

1. Open a terminal or command prompt.
2. Change to the directory where you want to clone the repository.
3. Run the following command to clone the repository:

   ```bash
   git clone https://github.com/karthickthankyou/multiverse-full-stack
   ```

### Install Dependencies

1. Change to the project root directory:

   ```bash
   cd multiverse-full-stack
   ```

2. Install the project dependencies using Yarn:

   ```bash
   yarn install
   ```

### Start the Applications

The project consists of multiple applications. Follow the instructions below to start each application:

1. **Run Database Locally (`apps/api`):**
   We use postgres and meilisearch databases.

   ```bash
   cd apps/api

   docker compose up
   ```

2. **API Application (`apps/api`):**

   ```bash
   yarn workspace apps/api start:dev
   ```

3. **Web Application (`apps/web`):**

   ```bash
   yarn workspace apps/web dev
   ```

4. **Writer Web Application (`apps/writer-web`):**

   ```bash
   yarn workspace apps/writer-web dev
   ```

5. **Multiverse Mobile Application (`standalone-projects/multiverse-mobile`):**
   I built the react native project out of the yarn workspace due to some isses related metro not being supportive with the monorepos. This might be fixed later.

   ```bash
   cd standalone-projects/multiverse-mobile

   yarn install
   yarn start
   ```

### Access the Applications

Once the applications have started, you can access them in your web browser:

- API Application: The API will be running at `http://localhost:3000`.
- Web Application: Open `http://localhost:3001` in your browser.
- Writer Web Application: Open `http://localhost:3002` in your browser.
- Multiverse Mobile Application: Follow the instructions provided in the project documentation for accessing the mobile application.

Make sure to check the project documentation for any additional configuration or setup required for specific applications or libraries.

---

## Architecture

This project follows a monorepo structure using Yarn and Nx, which enables sharing common libraries and code between the different applications within the project.

The monorepo is structured as follows:

- **apps/web**: The web application built with React and Next.js. It provides a user interface for interacting with the text adventure stories.

- **apps/writer-web**: The web-based writer application, also built with React and Next.js. It allows writers to create and extend text adventure stories, as well as manage story branches and choices.

- **apps/api**: The backend API implemented using NestJS. It serves as the central hub for managing user accounts, stories, and other data.

- **standalone-projects/multiverse-mobile**: A standalone React Native application for mobile devices. Due to the unique requirements and limitations of React Native's Metro bundler, it is kept separate from the monorepo to ensure smooth development and build processes.

By adopting a monorepo approach, the project leverages code reuse and maintainability across the different applications. It enables shared libraries, configurations, and development tooling, enhancing productivity and reducing duplication.

## Technologies Used

- Core Technologies

  - [React](https://reactjs.org/)
  - [Next.js](https://nextjs.org/)
  - [NestJS](https://nestjs.com/)
  - [GraphQL](https://graphql.org/)
  - [Apollo Client](https://www.apollographql.com/docs/react/)
  - [React Native](https://reactnative.dev/)

- UI/UX:

  - [Tailwind CSS](https://tailwindcss.com/)
  - [@mui/material](https://mui.com/)
  - [@headlessui/react](https://headlessui.dev/)
  - [Storybook](https://storybook.js.org/)
  - [ThreeJS](https://threejs.org/)

- Code Quality:

  - [ESLint](https://eslint.org/)
  - [Prettier](https://prettier.io/)
  - [Husky](https://typicode.github.io/husky/)
  - [Lint Staged](https://github.com/okonet/lint-staged)
  - [Sentry](https://sentry.io/)

- Databases & ORM

  - [Postgres](https://www.postgresql.org/)
  - [Meilisearch](https://www.meilisearch.com/)
  - [Prisma](https://www.prisma.io/)

- Form Management

  - [react-hook-form](https://react-hook-form.com/)
  - [zod](https://github.com/colinhacks/zod)

- State & "Time" Management

  - [redux](https://redux.js.org/)
  - [zustand](https://github.com/pmndrs/zustand)
  - [rxjs](https://rxjs.dev/)

- Codegen:
  - [graphql-tools](https://www.graphql-tools.com/)

## License

This project is released under the MIT License. You are free to use, modify, and distribute this project for any purpose, commercial or non-commercial, without any restrictions. While no specific license file is included in this project, the license information is stated in the root `package.json` file. Feel free to explore, customize, and contribute to this project in a way that aligns with the MIT License terms.

## Contact

For any inquiries or support, please feel free to reach out to me via [LinkedIn](https://www.linkedin.com/in/iamkarthickr/). I'm always open to connecting with fellow developers and discussing exciting opportunities.

**Job Status:** I am currently open to full-time remote full-stack developer position. Please check my job status and more details on my [LinkedIn profile](https://www.linkedin.com/in/iamkarthickr/).
