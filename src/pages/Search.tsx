"use client"

import { useState, useCallback } from "react"
import { useQuery } from "@tanstack/react-query"
import debounce from "lodash/debounce"
import { Typography, TextField, Skeleton, IconButton } from "@mui/material"
import { motion } from "framer-motion"
import { getExercises } from "../lib/api"
import { Heart } from "lucide-react"
import { useFavoriteStore } from "../store/useFavoriteStore"

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("")

  const { data: exercises, isLoading } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () => getExercises({ name: searchTerm }),
    enabled: searchTerm.length >= 2,
  })

  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore()

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setSearchTerm(term)
    }, 500),
    [],
  )

  return (
    <div className="space-y-8">
      <Typography variant="h4" component="h1" className="text-3xl font-bold text-gray-800 dark:text-white">
        Search Exercises
      </Typography>

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

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <Skeleton variant="rectangular" height={200} />
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {exercises?.map((exercise) => (
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