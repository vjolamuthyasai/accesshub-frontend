AccessiHub Frontend

AccessiHub Frontend is a Next.js web application that provides an interface for analyzing website accessibility. Users can enter a website URL, trigger an accessibility analysis (via backend API), and view structured reports on detected accessibility issues. The app also provides dashboards and downloadable reports in multiple formats.

🚀 Features

Enter any website URL for accessibility testing.

Trigger analysis powered by the AccessiHub backend.

Display results in a structured, user-friendly dashboard.

Download reports (PDF, JSON, CSV).

Responsive and optimized Next.js frontend.

Deployed on Vercel for scalability and CI/CD.

🛠️ Tech Stack

Frontend: Next.js, React, TailwindCSS

Deployment: Vercel

Backend API: AccessiHub Backend (Flask)

📦 Installation & Setup
Prerequisites

Node.js (>=18.x)

npm or yarn

Steps

Clone the repository:

git clone https://github.com/your-org/accessihub-frontend.git
cd accessihub-frontend


Install dependencies:

npm install
# or
yarn install


Create a .env.local file in the root directory with your backend API URL:

NEXT_PUBLIC_API_URL=http://localhost:5000


Run the development server:

npm run dev
# or
yarn dev


The app will be available at http://localhost:3000
.

Build for production:

npm run build
npm start

🌍 Deployment on Vercel

This project is configured for easy deployment on Vercel. Simply connect your repo to Vercel and set the required environment variables (NEXT_PUBLIC_API_URL). Vercel will handle CI/CD and preview deployments automatically.

📊 Dashboard

Visual representation of accessibility issues by category.

Filters and sorting for easy issue navigation.

Export options for further reporting.

🤝 Contributing

Contributions are welcome! Please fork the repo and create a pull request.

📄 License

MIT License – feel free to use and modify.
