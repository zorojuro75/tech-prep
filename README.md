# TechPrep

<!-- ![TechPrep Logo](./public/logo-placeholder.png) -->

**AI-Powered MCQ & Coding Test Preparation Platform for Developers**

---

## 🚀 Overview

**TechPrep** is an AI-driven platform designed to help software developers prepare for technical interviews. It generates personalized multiple-choice and coding assessments tailored to your target role and experience level, leveraging the power of Google's Gemini API. Instantly receive detailed feedback and actionable learning roadmaps to accelerate your career.

---

## ✨ Features

- Role-based and custom MCQ/coding assessments
- AI-generated questions using Gemini API
- Multiple experience levels (Fresher, Junior, Mid-level, Senior)
- Instant scoring and detailed feedback
- Personalized improvement plans and career roadmaps
- Modern, responsive UI with dark mode
- Print and retake test options

---

## 🛠️ Technologies Used

- [Next.js](https://nextjs.org/) (App Router, SSR)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/UI](https://ui.shadcn.com/) (UI components)
- [Google Gemini API](https://ai.google.dev/gemini-api/docs) (AI question/feedback generation)
- [Vercel](https://vercel.com/) (deployment)

---

## 📁 Folder Structure

```
tech-prep/
├── app/                # Next.js app routes and pages
├── components/         # Reusable React components
├── lib/                # Utility functions and Gemini API integration
├── public/             # Static assets (logo, images)
├── styles/             # Global styles (Tailwind)
├── README.md           # Project documentation
├── package.json
└── ...
```

---

## ⚡ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/tech-prep.git
   cd tech-prep
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key-here
   ```

---

## 🤖 Using Gemini API in TechPrep

- All AI-powered features (question generation, feedback, roadmaps) use the Gemini API.
- The API key is securely loaded from environment variables.
- See [`lib/gemini.ts`](./lib/gemini.ts) for integration details.
- **Note:** You must have access to the Gemini API and a valid API key.

---

## 🏃 Running the Development Server

```bash
pnpm dev
# or
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🗺️ Roadmap

- [x] Role-based MCQ assessments
- [x] Custom topic/category tests
- [x] Gemini-powered question and feedback generation
- [x] Personalized feedback and improvement plans
- [x] Responsive, accessible UI
- [ ] Coding question editor and grader
- [ ] User authentication and progress tracking
- [ ] Admin dashboard for question review
- [ ] More roles and technology stacks
- [ ] Community-contributed questions

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or pull request to discuss improvements or new features.

<!--
- Fork the repo
- Create a feature branch
- Submit a PR with a clear description
-->

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

## 🙋‍♂️ Author & Portfolio Note

**TechPrep** is part of the author's portfolio and was created to enhance their CV and demonstrate skills for job applications. If you find this project useful or want to collaborate, feel free to reach out!

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
