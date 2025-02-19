# Fitness Dashboard

A modern web application that helps users discover, search, and save their favorite exercises. Built with React and designed for both desktop and mobile devices.

## 🏃 Features

- **Exercise Categories**: Browse exercises by muscle groups (abs, biceps, triceps, etc.) and difficulty levels
- **Smart Search**: Quickly find specific exercises with real-time search functionality
- **Favorites System**: Save your preferred exercises for quick access later
- **Responsive Design**: Works seamlessly on phones, tablets, and desktop computers
- **Detailed Instructions**: Each exercise comes with clear, step-by-step instructions

## 💪 Why Use Fitness Dashboard?

Whether you're a beginner starting your fitness journey or an experienced athlete, Fitness Dashboard helps you:

- Discover new exercises for different muscle groups
- Learn proper exercise techniques through detailed instructions
- Create a personalized collection of favorite exercises
- Access your workout information on any device

## 🚀 Getting Started

1. Visit the website (or if running locally, follow these steps):
    ```bash
    git clone https://github.com/lekakenycollins8/Fitness-Dashboard.git
    cd Fitness-Dashboard
    npm install
    npm run dev
    ```

2. Browse exercises by category or use the search feature
3. Click the heart icon to save exercises to your favorites
4. Access your saved exercises anytime in the Favorites section

## 🛠️ Technical Details

Built with modern web technologies:

- React for the user interface
- Tailwind CSS for styling
- Zustand for state management
- React Query for data fetching
- TypeScript for type safety
- Vite for fast development

### API Integration

This project uses the Exercise API to fetch comprehensive exercise data including:

- Exercise names and descriptions
- Muscle group targeting information
- Difficulty levels
- Step-by-step instructions

The API integration is handled through the `api.ts` file using Axios for HTTP requests. API authentication is managed using environment variables:

- `VITE_EXERCISES_API_KEY`: Your API key
- `VITE_EXERCISES_API_URL`: API base URL: https://api.api-ninjas.com/v1

> Note: To run this project locally, you'll need to obtain an API key and set up these environment variables in your `.env` file.

## 📱 Available Pages

- **Home**: Featured strength exercises
- **Categories**: Browse exercises by muscle group and difficulty
- **Search**: Find specific exercises
- **Favorites**: Access your saved exercises

## 📄 License

This project is licensed under the [MIT License](./LICENSE) - see the [LICENSE](./LICENSE) file for details.

## 👤 Author

Collins Lekakeny (Leky)

Built with ❤️ for fitness enthusiasts