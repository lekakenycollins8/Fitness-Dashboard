import { Typography, IconButton } from "@mui/material"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { useFavoriteStore } from "../store/useFavoriteStore"

export default function Favorites() {
  const { favorites, removeFavorite } = useFavoriteStore()

  if (favorites.length === 0) {
    return (
      <div className="text-center mt-16">
        <Typography variant="h5" className="mb-2 text-gray-800 dark:text-white">
          No favorite exercises yet
        </Typography>
        <Typography className="text-gray-600 dark:text-gray-400">
          Start adding exercises to your favorites to see them here
        </Typography>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Typography variant="h4" component="h1" className="text-3xl font-bold text-gray-800 dark:text-white">
        Favorite Exercises
      </Typography>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {favorites.map((exercise) => (
          <motion.div
            key={exercise.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{exercise.name}</h3>
                <IconButton
                  onClick={() => removeFavorite(exercise.name)}
                  className="text-red-500 hover:text-red-600"
                  size="small"
                >
                  <Heart size={20} fill="currentColor" />
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
    </div>
  )
}