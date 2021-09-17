const STORAGE_KEY = 'burger-queen-api-client';

const isLogged = () => !!localStorage.getItem(STORAGE_KEY);

export { STORAGE_KEY, isLogged };