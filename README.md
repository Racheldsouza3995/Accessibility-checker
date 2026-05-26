# Rachel Dsouza — Portfolio

A personal portfolio site built with **React + Vite**, featuring smooth scroll animations, a clean editorial aesthetic, and data-driven components.

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open http://localhost:5173
```

## 📁 Project Structure

```
src/
├── components/         # One file + CSS module per section
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Experience.jsx
│   ├── Projects.jsx
│   └── Contact.jsx
├── data/
│   └── resume.js       # ← All your content lives here
├── hooks/
│   └── useFadeUp.js    # Scroll animation hook
├── App.jsx
├── main.jsx
└── index.css           # Global styles + CSS variables
```

## ✏️ Updating Content

All content is in **`src/data/resume.js`**. To update anything:
- Change your email, LinkedIn, GitHub URLs in `profile`
- Add projects to the `projects` array
- Update skills or experience as needed

No need to touch any component files just to update content!

## ➕ Adding a Project

In `src/data/resume.js`, add an entry to the `projects` array:

```js
{
  title: 'My Blog App',
  description: 'Full-stack blog with auth and CRUD operations.',
  tech: ['React', 'Node.js', 'PostgreSQL'],
  github: 'https://github.com/yourusername/blog-app',
  live: 'https://my-blog.vercel.app',
}
```

## 🌐 Deploying to Vercel

```bash
# 1. Push this folder to a GitHub repo
# 2. Go to vercel.com → New Project → Import your repo
# 3. Vercel auto-detects Vite — just click Deploy!
```

Your site will be live at `https://your-project.vercel.app`

## 🎨 Customization

CSS design tokens are in `src/index.css`:

```css
:root {
  --cream:      #F7F3EE;   /* background */
  --dark:       #1A1714;   /* text + dark panels */
  --accent:     #C8553D;   /* terracotta accent color */
  --muted:      #8C7B6E;   /* secondary text */
  --light-line: #E2D9D0;   /* borders */
}
```

Change `--accent` to match your personal brand color!
