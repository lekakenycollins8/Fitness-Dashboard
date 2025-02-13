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