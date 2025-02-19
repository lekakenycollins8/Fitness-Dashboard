"use client"

import { useState, useCallback } from "react"
import { useQuery } from "@tanstack/react-query"
import debounce from "lodash/debounce"
import { Typography, TextField, Skeleton, IconButton } from "@mui/material"
import { motion } from "framer-motion"
import { getExercises } from "../lib/api"
import { Heart, ChevronDown, ChevronUp } from "lucide-react"
import { useFavoriteStore } from "../store/useFavoriteStore"

export default function Search() {
  // State for search input and expanded exercise instructions
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedInstructions, setExpandedInstructions] = useState<string | null>(null)

  // Fetch exercises based on search term using React Query
  const { data: exercises, isLoading } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () => getExercises({ name: searchTerm }),
    enabled: searchTerm.length >= 2, // Only fetch when search term is at least 2 characters
  })

  // Get favorite functionality from custom store
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore()

  // Debounce search input to prevent excessive API calls
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setSearchTerm(term)
    }, 500),
    [],
  )

  return (
    <div className="space-y-8">
      {/* Page title */}
      <Typography variant="h4" component="h1" className="text-3xl font-bold text-gray-800 dark:text-white">
        Search Exercises
      </Typography>

      {/* Search input field */}
      <TextField
        fullWidth
        label="Search exercises"
        variant="outlined"
        onChange={(e) => debouncedSearch(e.target.value)}
        className="bg-white dark:bg-gray-700"
        InputProps={{
          className: "text-gray-900 dark:text-white",
        }}
        InputLabelProps={{
          className: "text-gray-600 dark:text-gray-300",
        }}
      />

      {/* Loading state with skeleton cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <Skeleton variant="rectangular" height={200} />
            </div>
          ))}
        </div>
      ) : (
        // Grid of exercise cards with animation
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {exercises?.map((exercise) => (
            // Individual exercise card with animation
            <motion.div
              key={exercise.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg"
            >
              <div className="p-6">
                {/* Exercise header with favorite button */}
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
      )}
    </div>
  )
}