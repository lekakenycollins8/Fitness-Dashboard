import { useState } from "react"
import { Typography, IconButton } from "@mui/material"
import { motion } from "framer-motion"
import { Heart, ChevronDown, ChevronUp } from "lucide-react"
import { useFavoriteStore } from "../store/useFavoriteStore"

/**
 * Favorites component displays a list of favorite exercises
 * with expandable instructions and remove functionality
 */
export default function Favorites() {
  // Get favorites and removeFavorite function from the favorite store
  const { favorites, removeFavorite } = useFavoriteStore()
  // State to track which exercise's instructions are expanded
  const [expandedInstructions, setExpandedInstructions] = useState<string | null>(null)

  // Display a message when no favorites are available
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
      {/* Page title */}
      <Typography variant="h4" component="h1" className="text-3xl font-bold text-gray-800 dark:text-white">
        Favorite Exercises
      </Typography>

      {/* Grid container with animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {/* Map through favorite exercises */}
        {favorites.map((exercise) => (
          <motion.div
            key={exercise.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg"
          >
            <div className="p-6">
              {/* Exercise header with remove button */}
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
              {/* Exercise details */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {exercise.muscle} | {exercise.difficulty}
              </p>
              {/* Expandable instructions */}
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {expandedInstructions === exercise.name
                  ? exercise.instructions
                  : `${exercise.instructions.slice(0, 100)}...`}
              </p>
              {/* Show more/less button */}
              <button
                onClick={() => setExpandedInstructions(expandedInstructions === exercise.name ? null : exercise.name)}
                className="mt-2 text-blue-500 hover:text-blue-600 flex items-center"
              >
                {expandedInstructions === exercise.name ? (
                  <>
                    <ChevronUp size={16} className="mr-1" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown size={16} className="mr-1" />
                    Show More
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}