export default function convertObjectToFile(object, filename) {
  const json = JSON.stringify(object);
  const blob = new Blob([json], { type: 'application/json' });
  const file = new File([blob], filename, { type: 'application/json' });
  return file;
}
