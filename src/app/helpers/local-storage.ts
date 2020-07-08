export const getItemOnStorage = <T = any>(key: string): T | null => {
  try {
    const itemOnStorage = localStorage.getItem(key);
    if( !itemOnStorage ) return null;
    return JSON.parse(itemOnStorage) as T;
  } catch (ex) {
    return null;
  }
}

export const setItemOnStorage = <T = any>(key: string, item: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(item));
  } catch (ex) {
    console.error('Error while storing item');
  }
}

export const clearStorage = () => {
  localStorage.clear();
}