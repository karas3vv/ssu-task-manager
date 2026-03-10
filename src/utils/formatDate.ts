export const formatDate = (value: string | null): string => {
  if (!value) {
    return 'No deadline';
  }

  return new Date(value).toLocaleDateString();
};
