import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Typography, Skeleton, Select, MenuItem, IconButton } from "@mui/material"
import { motion } from "framer-motion"
import { getExercises } from "../lib/api"
import type { MuscleGroup, DifficultyLevel } from "../types/exercise"
import { Heart } from "lucide-react"
import { useFavoriteStore } from "../store/useFavoriteStore"

const muscleGroups: MuscleGroup[] = ["abdominals", "biceps", "triceps", "chest", "legs", "back", "shoulders"]

const difficulties: DifficultyLevel[] = ["beginner", "intermediate", "expert"]

export default function Categories() {
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup>("chest")
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>("beginner")

  const {
    data: exercises,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["exercises", selectedMuscle, selectedDifficulty],
    queryFn: () =>
      getExercises({
        muscle: selectedMuscle,
        difficulty: selectedDifficulty,
      }),
  })

  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <Skeleton variant="rectangular" height={200} />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center mt-16">
        <Typography variant="h5" className="text-red-600 dark:text-red-400 mb-2">
          Error loading exercises
        </Typography>
        <Typography className="text-gray-600 dark:text-gray-400">Please try again later</Typography>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Typography variant="h4" component="h1" className="text-3xl font-bold text-gray-800 dark:text-white">
        Exercise Categories
      </Typography>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="w-full sm:w-1/2 md:w-1/3">
          <label htmlFor="muscle-group" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Muscle Group
          </label>
          <Select
            id="muscle-group"
            value={selectedMuscle}
            onChange={(e) => setSelectedMuscle(e.target.value as MuscleGroup)}
            className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {muscleGroups.map((muscle) => (
              <MenuItem key={muscle} value={muscle}>
                {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3">
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Difficulty
          </label>
          <Select
            id="difficulty"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value as DifficultyLevel)}
            className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {difficulties.map((difficulty) => (
              <MenuItem key={difficulty} value={difficulty}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      {!exercises || exercises.length === 0 ? (
        <div className="text-center mt-16">
          <Typography variant="h5" className="mb-2 text-gray-800 dark:text-white">
            No exercises found
          </Typography>
          <Typography className="text-gray-600 dark:text-gray-400">
            Try selecting a different muscle group or difficulty level
          </Typography>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {exercises.map((exercise, index) => (
            <motion.div
              key={`${exercise.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{exercise.name}</h3>
                  <IconButton
                    onClick={() => (isFavorite(exercise.name) ? removeFavorite(exercise.name) : addFavorite(exercise))}
                    className={`${isFavorite(exercise.name) ? "text-red-500" : "text-gray-400"} hover:text-red-600`}
                    size="small"
                  >
                    <Heart size={20} fill={isFavorite(exercise.name) ? "currentColor" : "none"} />
                  </IconButton>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {exercise.muscle} | {exercise.difficulty}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">{exercise.instructions}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}