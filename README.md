# React Jam

## React App Setup

This README provides two options for setting up and creating a React application:

1. **Using Vite (Recommended)**: This method leverages Vite, a fast build tool, to create a React project quickly.

2. **Manual Installation with `react-scripts`**: This method involves creating a React project manually using `react-scripts`, which is the default tool for bootstrapping React applications.

## Prerequisites

Before you begin, make sure you have the following prerequisites installed on your system:

- **Node.js**: Vite requires Node.js version 12 or higher. You can download and install Node.js from [nodejs.org](https://nodejs.org/).

- **npm** or **Yarn**: npm (Node Package Manager) is included with Node.js, while Yarn is an alternative package manager. You can choose either one.

## Option 1: Using Vite (Recommended)

### Step 1: Create a New Vite Project

Now that Vite is installed globally, you can create a new React application using Vite. Open your terminal (Command Prompt in Windows or Bash in Linux) and run the following command:

**Windows (Command Prompt):**

```bash
npm create vite@latest
```

**Linux (Bash):**

```bash
npm create vite@latest
```

This command initializes a new Vite project named and asks a series of question to setup the project.

![Alt text](https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2023/03/select-vite-options.jpg?q=50&fit=crop&w=1500&dpr=1.5 'Vite Installation')

### Step 3: Navigate to the Project Directory

Navigate to the newly created project directory using the following command:

```bash
cd <your-app-name/>
```

### Step 4: Install Dependencies

In your project directory, install the project dependencies by running:

```bash
npm install
```

### Step 5: Start the Development Server

You can start the development server by running the following command:

```bash
npm run dev
```

![Alt text](https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2023/03/vite-react-homepage.jpg?q=50&fit=crop&w=1500&dpr=1.5 'Vite Installation')

This will start the Vite development server. The server will automatically reload the application when you make changes to your code.

### Step 6: Building for Production

When you are ready to build your React application for production, run the following command:

```bash
npm run build
```

This command will generate an optimized production build of your application in the `dist` directory.

## Option 2: Manual Installation with `react-scripts`

### Step 1: Create a New Directory for Your Project

Open your terminal (Command Prompt in Windows or Bash in Linux) and create a new directory for your React project. You can name it whatever you like:

```bash
mkdir my-react-app
cd my-react-app
```

### Step 2: Initialize a New Node.js Project

Inside your project directory, initialize a new Node.js project by running:

**Windows (Command Prompt):**

```bash
npm init -y
```

**Linux (Bash):**

```bash
npm init -y
```

This command creates a `package.json` file with default settings.

### Step 3: Install React and `react-scripts`

Next, install React and `react-scripts` as project dependencies by running the following command:

**Windows (Command Prompt):**

```bash
npm install react react-dom react-scripts
```

**Linux (Bash):**

```bash
npm install react react-dom react-scripts
```

### Step 4: Create a Basic React Application

Now that you have React and `react-scripts` installed, create a basic React application. You can create a new JavaScript file, e.g., `src/index.js`, inside your project directory and add the following code:

```jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')).render(<App />)
```

### Step 5: Create a Basic React Component

Create a React component in a separate file, e.g., `src/App.js`, with the following code:

```jsx
import React from 'react'

function App() {
  return (
    <div>
      <h1>Hello, React!</h1>
    </div>
  )
}

export default App
```

### Step 6: Create an HTML File

Create an HTML file, e.g., `public/index.html`, and add the following code:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

This HTML file sets up a root `<div>` where your React app will be rendered.

### Step 7: Configure npm Scripts

In your package.json file, add the following scripts to the "scripts" section:

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

These scripts allow you to start, build, test, and eject your React application using react-scripts.

### Step 8: Start the Development Server

You can start the development server provided by `react-scripts` by running the following command:

**Windows (Command Prompt):**

```bash
npm start
```

**Linux (Bash):**

```bash
npm start
```

This will start the development server, and your React application will be available at `http://localhost:3000`. The server will automatically reload the application when you make changes to your code.

## File Structure (Manual Installation)

Here's the file structure for a manually created React project using `react-scripts`:

```
my-react-app/
├── node_modules/
├── public/
│   ├── index.html
│   ├── favicon.ico
├── src/
│   ├── App.js
│   ├── index.js
├── package.json
├── package-lock.json (or yarn.lock if you use Yarn)
└── README.md
```

- `node_modules/`: This directory contains the installed npm packages and their dependencies.

- `public/`: This directory contains public assets like HTML files and images.

  - `index.html`: The HTML file where your React application is mounted. It includes a `<div id="root"></div>` element for rendering your app.

  - `favicon.ico`: The favicon for your application (the small icon that appears in the browser tab).

- `src/`: This directory contains your application's source code.

  - `App.js`: The main React component of your application.

  - `index.js`: The entry point of your application where the React app is rendered.

- `package.json`: The configuration file for your Node.js project. It includes dependencies, scripts, and other project metadata.

- `package-lock.json` (or `yarn.lock`): These files lock the versions of your project's dependencies to ensure consistency across different environments.

- `README.md`: This README file contains project documentation and setup instructions.

React components and additional files can be added to the `src/` directory as our project grows.

Happy coding!
