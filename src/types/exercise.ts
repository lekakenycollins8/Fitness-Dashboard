export type MuscleGroup = 
  | 'abdominals'
  | 'biceps'
  | 'triceps'
  | 'chest'
  | 'legs'
  | 'back'
  | 'shoulders';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'expert';

export type ExerciseType = 'strength' | 'stretching' | 'plyometrics' | 'cardio' | 'powerlifting';

export interface Exercise {
  name: string;
  type: ExerciseType;
  muscle: MuscleGroup;
  equipment: string;
  difficulty: DifficultyLevel;
  instructions: string;
}

export interface ExerciseFilters {
  name?: string;
  type?: ExerciseType;
  muscle?: MuscleGroup;
  difficulty?: DifficultyLevel;
}