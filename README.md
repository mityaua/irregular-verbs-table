# 📘 English Irregular Verbs Table

[![Vue.js](https://img.shields.io/badge/Vue%203-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

**An interactive, fast, and user-friendly web app for learning English irregular verbs (V1, V2, V3 forms).** Perfect tool for English learners, ESL teachers, and anyone looking to improve their grammar and vocabulary.

🌐 **Live Demo**: [mityaua.github.io/irregular-verbs-table](https://mityaua.github.io/irregular-verbs-table)

## ✨ Features

- 📚 **Comprehensive Table**: Clean, instantly searchable list of English irregular verbs (Infinitive, Past Simple, Past Participle).
- 🎓 **Smart "Not Found" State**: Shows a random irregular verb to learn when a search query yields no results.
- 🌙 **Modern UI/UX**: Seamless light/dark theme toggle, sticky header, and smooth scroll-to-top feature.
- ⚡ **Performance Optimized**: Built with Vue 3, Vite, and Tailwind CSS for rapid loading.
- 📱 **Mobile Responsive**: Perfectly adapts to any screen size.

## 🛠 Tech Stack

| Technology                                    | Description                       |
| --------------------------------------------- | --------------------------------- |
| [Vue 3](https://vuejs.org/)                   | Reactive frontend framework       |
| [TypeScript](https://www.typescriptlang.org/) | Type safety                       |
| [Vite](https://vite.dev/)                     | Fast build tool                   |
| [Tailwind CSS](https://tailwindcss.com/)      | Utility-first CSS                 |
| [Oxlint](https://oxc.rs/)                     | The JavaScript Oxidation Compiler |

## 📆 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/mityaua/irregular-verbs-table.git
cd irregular-verbs-table
npm install
```

## 🚀 Development

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 🔧 Build

Generate a production-ready build:

```bash
npm run build
```

The compiled files will be in the `dist/` folder.

## 🚀 Deploy to GitHub Pages

```bash
npm run deploy
```

> **Note:** Ensure the `base` option in `vite.config.ts` is set correctly for GitHub Pages:
>
> ```ts
> base: "/irregular-verbs-table/";
> ```

## 📁 Project Structure

```
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, icons
│   ├── components/         # Vue components
│   ├── data/               # JSON data of verbs
│   ├── App.vue             # Root Vue component
│   └── main.ts             # App entry point
├── tailwind.config.js      # Tailwind CSS config
├── postcss.config.js       # PostCSS config
├── vite.config.ts          # Vite config
├── tsconfig.json           # TypeScript config
└── ...
```

## 🧪 Scripts

```bash
npm run lint     # Lint files
npm run format   # Format files using Prettier
npm run deploy   # Deploy to GitHub Pages
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

1. Fork the repository
2. Create your branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request

## 📄 License

This project is licensed under the [MIT License](LICENSE).
