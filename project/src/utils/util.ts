
export const superTranslator = (word: string) => {
  switch(word) {
    case 'horror':
      return 'Ужасы';
    case 'advature':
      return 'Приключения';
    case 'detective':
      return 'Детектив';
    case 'mystic':
      return 'Мистика';
    case 'sci-fi':
      return 'Sci-fi';
    case 'easy':
      return 'Лёгкий';
    case 'medium':
      return 'Средний';
    case 'hard':
      return 'Тяжелый';
  }
};
