export const categories = [
  'Rock',
  'Pop',
  'Electronic',
  'Indie',
  'Hiphop',
  'Mix'
];

export const generateCategoryOptions = (categories) => {
  if (!Array.isArray(categories)) {
    return '<option value="">No categories available</option>';
  }

  const options = categories
    .map((category) => `<option value="${category}">${category}</option>`)
    .join('');

  return `<option value="" selected>Selecciona una opción</option>${options}`;
};
