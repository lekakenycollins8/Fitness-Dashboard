import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Exercise } from '../types/exercise';

interface FavoriteStore {
  favorites: Exercise[];
  addFavorite: (exercise: Exercise) => void;
  removeFavorite: (exerciseName: string) => void;
  isFavorite: (exerciseName: string) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (exercise) => {
        const { favorites } = get();
        if (!favorites.some(fav => fav.name === exercise.name)) {
          set({ favorites: [...favorites, exercise] });
        }
      },
      removeFavorite: (exerciseName) => {
        const { favorites } = get();
        set({ favorites: favorites.filter(exercise => exercise.name !== exerciseName) });
      },
      isFavorite: (exerciseName) => {
        const { favorites } = get();
        return favorites.some(exercise => exercise.name === exerciseName);
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
);