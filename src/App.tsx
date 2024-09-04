import React, { FC, useState, createContext, useContext } from 'react'
import HomePage from './pages/HomePage'
import ArtItemPage from './pages/ArtItemPage'
import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import FavoritesPage from './pages/FavoritesPage';

interface ArtContextType {
  favoriteArtworks: number[];
  toggleFavorite: (artworkId: number) => void;
}

const ArtContext = createContext<ArtContextType | undefined>(undefined);

const App: FC = () => {
  const [favoriteArtworks, setFavoriteArtworks] = useState<number[]>([]);

  const toggleFavorite = (artworkId: number) => {
    setFavoriteArtworks((prevFavorites) =>
      prevFavorites.includes(artworkId)
        ? prevFavorites.filter(id => id !== artworkId)
        : [...prevFavorites, artworkId]
    );
  };

  return (
    <ArtContext.Provider value={{ favoriteArtworks, toggleFavorite }}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='favorites' element={<FavoritesPage />} />
          <Route path='favorites/:id' element={<ArtItemPage />} />
          <Route path='art/:id' element={<ArtItemPage />} />
        </Route>
      </Routes>
    </ArtContext.Provider>

  )
}

export default App

export function useArtContext() {
  const context = useContext(ArtContext);
  if (!context) {
    throw new Error('useArt must be used within an ArtProvider');
  }
  return context;
}