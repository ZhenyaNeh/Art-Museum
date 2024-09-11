export class LocalStorageManager {
  constructor() {
    if (!localStorage.getItem('favorites')) {
      localStorage.setItem('favorites', JSON.stringify([]));
    }
  }

  saveToFavorites(id: string): void {
    const favorites: string[] = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
    if (!favorites.includes(id)) {
      favorites.push(id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }

  removeFromFavorites(id: string): void {
    const favorites: string[] = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
    const updatedFavorites = favorites.filter((favId) => favId !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }

  getFavorites(): string[] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  clearFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify([]));
  }
}
