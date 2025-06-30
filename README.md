## Prerequisites

- Node.js >=20 (Recommended)

## Installation

**Using Yarn (Recommended)**

```sh
yarn install
yarn dev
```

**Using Npm**

```sh
npm i
npm run dev
```

## Configuration

### Environment Variables

Copy the example environment file and configure it:

```sh
cp .env.example .env.local
```

### Skip Authentication (Development)

For development purposes, you can skip authentication and access the dashboard directly:

1. Set `NEXT_PUBLIC_SKIP_AUTH=true` in your `.env.local` file
2. Restart your development server

**Note:** This should only be used in development environments. Never enable this in production.

## Build

```sh
yarn build
# or
npm run build
```

## Mock server

By default we provide demo data from : `https://api-dev-minimal-[version].vercel.app`

To set up your local server:

- **Guide:** [https://docs.minimals.cc/mock-server](https://docs.minimals.cc/mock-server).

- **Resource:** [Download](https://www.dropbox.com/sh/6ojn099upi105tf/AACpmlqrNUacwbBfVdtt2t6va?dl=0).

## Project Structure

```
├── docs/                  # 📚 Documentation files
├── scripts/              # 🔧 Automation scripts  
├── tests/                # 🧪 Test files
├── src/                  # 🎯 Source code
├── public/               # 📁 Static assets
└── ...config files
```

For detailed information about each directory, check the README.md files in:
- [`docs/README.md`](./docs/README.md) - Documentation guidelines
- [`scripts/README.md`](./scripts/README.md) - Script usage
- [`tests/README.md`](./tests/README.md) - Testing guidelines

## Full version

- Create React App ([migrate to CRA](https://docs.minimals.cc/migrate-to-cra/)).
- Next.js
- Vite.js

## Starter version

- To remove unnecessary components. This is a simplified version ([https://starter.minimals.cc/](https://starter.minimals.cc/))
- Good to start a new project. You can copy components from the full version.
- Make sure to install the dependencies exactly as compared to the full version.

---

**NOTE:**
_When copying folders remember to also copy hidden files like .env. This is important because .env files often contain environment variables that are crucial for the application to run correctly._
