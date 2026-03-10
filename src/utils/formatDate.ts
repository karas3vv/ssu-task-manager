export const formatDate = (value: string | null): string => {
  if (!value) {
    return 'Без срока';
  }

  return new Date(value).toLocaleDateString('ru-RU');
};
