import axios from 'axios';
import type { Exercise, ExerciseFilters } from '../types/exercise';

const API_KEY = import.meta.env.VITE_EXERCISES_API_KEY;
const API_URL = import.meta.env.VITE_EXERCISES_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'X-Api-Key': API_KEY,
  },
});

/**
 * Fetches exercises from the API based on provided filters
 * 
 * @param filters - Optional filters to apply to the exercise search
 * @param filters.name - Optional name to filter exercises
 * @param filters.type - Optional exercise type filter
 * @param filters.muscle - Optional target muscle filter  
 * @param filters.difficulty - Optional difficulty level filter
 * 
 * @returns Promise resolving to an array of Exercise objects. Returns empty array if request fails.
 * 
 * @throws Never throws - Failed requests return empty array instead
 * 
 * @example
 * // Get all exercises
 * const exercises = await getExercises();
 * 
 * // Get exercises filtered by name and type
 * const filteredExercises = await getExercises({
 *   name: 'push-up',
 *   type: 'strength'
 * });
 */
export async function getExercises(filters: ExerciseFilters = {}): Promise<Exercise[]> {
  try {
    const params = new URLSearchParams();
    
    // Only add defined filters to the params
    if (filters.name) params.append('name', filters.name);
    if (filters.type) params.append('type', filters.type);
    if (filters.muscle) params.append('muscle', filters.muscle);
    if (filters.difficulty) params.append('difficulty', filters.difficulty);

    const { data } = await api.get<Exercise[]>('/exercises', { params });
    
    // Ensure we always return an array, even if empty
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching exercises:', error);
    // Return empty array instead of throwing to prevent null errors
    return [];
  }
}