import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Exercise } from '../types/exercise';

// Interface defining the structure and methods of the favorite exercises store
interface FavoriteStore {
  favorites: Exercise[];                                  // Array to store favorite exercises
  addFavorite: (exercise: Exercise) => void;             // Method to add an exercise to favorites
  removeFavorite: (exerciseName: string) => void;        // Method to remove an exercise from favorites
  isFavorite: (exerciseName: string) => boolean;         // Method to check if an exercise is favorite
}

// Create a persistent store for managing favorite exercises
export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      // Add exercise to favorites if it doesn't already exist
      addFavorite: (exercise) => {
        const { favorites } = get();
        if (!favorites.some(fav => fav.name === exercise.name)) {
          set({ favorites: [...favorites, exercise] });
        }
      },
      // Remove exercise from favorites by name
      removeFavorite: (exerciseName) => {
        const { favorites } = get();
        set({ favorites: favorites.filter(exercise => exercise.name !== exerciseName) });
      },
      // Check if an exercise is in favorites by name
      isFavorite: (exerciseName) => {
        const { favorites } = get();
        return favorites.some(exercise => exercise.name === exerciseName);
      },
    }),
    {
      name: 'favorites-storage', // Local storage key for persisting favorites
    }
  )
);