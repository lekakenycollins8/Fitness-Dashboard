import { useQuery } from "@tanstack/react-query"
import { Typography, Skeleton } from "@mui/material"
import { motion } from "framer-motion"
import { getExercises } from "../lib/api"
import type { ExerciseType } from "../types/exercise"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Home() {
  const {
    data: exercises = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featured-exercises"],
    queryFn: () => getExercises({ type: "strength" as ExerciseType }),
  })

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

  if (exercises.length === 0) {
    return (
      <div className="text-center mt-16">
        <Typography variant="h5" className="mb-2">
          No exercises found
        </Typography>
        <Typography className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria</Typography>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Typography variant="h4" component="h1" className="text-3xl font-bold text-gray-800 dark:text-white">
        Featured Exercises
      </Typography>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {exercises.slice(0, 6).map((exercise) => (
          <motion.div
            key={exercise.name}
            variants={item}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{exercise.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {exercise.muscle} | {exercise.difficulty}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">{exercise.instructions}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}