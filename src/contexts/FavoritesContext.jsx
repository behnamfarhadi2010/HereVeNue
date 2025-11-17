import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const savedFavorites = localStorage.getItem("userFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    } else {
      setFavorites([]);
    }
  };

  // Add venue to favorites
  const addToFavorites = (venueId) => {
    if (!favorites.includes(venueId)) {
      const updatedFavorites = [...favorites, venueId];
      setFavorites(updatedFavorites);
      localStorage.setItem("userFavorites", JSON.stringify(updatedFavorites));
      console.log(`Venue ${venueId} added to favorites`);
    }
  };

  // Remove venue from favorites
  const removeFromFavorites = (venueId) => {
    const updatedFavorites = favorites.filter((id) => id !== venueId);
    setFavorites(updatedFavorites);
    localStorage.setItem("userFavorites", JSON.stringify(updatedFavorites));
    console.log(`Venue ${venueId} removed from favorites`);
  };

  // Toggle favorite status
  const toggleFavorite = (venueId) => {
    if (favorites.includes(venueId)) {
      removeFromFavorites(venueId);
    } else {
      addToFavorites(venueId);
    }
  };

  // Check if venue is favorited
  const isFavorited = (venueId) => {
    return favorites.includes(venueId);
  };

  // Get count of favorites
  const favoritesCount = favorites.length;

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorited,
    favoritesCount,
    loadFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
