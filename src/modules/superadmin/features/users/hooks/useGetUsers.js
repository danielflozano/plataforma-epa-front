import { useState } from "react"

export const useGetUsers = () => {
  const [filterValue, setFilterValue] = useState();

  const handleSearch = () => {

  }

  const handleKeyDown = () => {

  }

  return {
    // Properties
    filterValue,

    // Methods
    handleKeyDown,
    handleSearch,
    setFilterValue,
  }
}