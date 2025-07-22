# Check SDK Api Spotlight

A demo spotlight session to show how the check API works.
More details on [Beefree SDK API Overview](docs/spotlight_overview.md).

## Environment Setup
Before running the project, copy the environment template and populate it:

```bash
cp env_template .env
```

Then, fill out the following required variables in .env:

```bash
BEEPLUGIN_AUTH_EMAIL_CLIENT_ID=
BEEPLUGIN_AUTH_EMAIL_CLIENT_SECRET=
CONTENT_SERVICE_API_SECRET=
```

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the demo.

## Features

- Check API functionality demonstration
- SDK commands SCROLL, HIGHLIGHT, SELECT, FOCUS

## Tech Stack

- Next.js
- React
- Beefree SDK
