# Express Build

A simple CLI tool to quickly scaffold modern Express.js projects in JavaScript or TypeScript with up-to-date dependencies and recommended setup.

- [NPM Package](https://www.npmjs.com/package/@lahirudesilva/express-build)
- [Github](https://github.com/RashmithaDeSilva/Express_Build)

---

### Features
- Choose between JavaScript and TypeScript templates
- Automatically installs latest dependencies & devDependencies
- Shows a clean loading spinner while creating the project
- Easy to use and customize

---

### Installation

You can run without installing globally using npx:

```sh
npx @lahirudesilva/express-build
```

Or install globally:

```sh
npm i @lahirudesilva/express-build
```

Then run:

```sh
express-build
```

---

### Usage

After running the command, you will be prompted to enter:
1. **Project name** — the directory name for your new project
2. **Language** — choose between JavaScript or TypeScript template
The CLI will create the project folder, copy the template files, and install all dependencies automatically.

---

### Getting Started

```sh
# Create a new project
npx express-build

# Navigate into your new project
cd your-project-name

# Start development server (depends on template scripts)
npm run dev
```

---

### Project Structure

- `templates/javascript/` — JavaScript starter template

- `templates/typescript/` — TypeScript starter template

- `index.js` — main CLI entry point

---

### Contributing

Contributions and suggestions are welcome! Feel free to open issues or submit pull requests.

---

### License

MIT License © Lahiru De Silva

---
