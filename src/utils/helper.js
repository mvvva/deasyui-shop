
export function saveToLocalStorage(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
  }
  
  export function getFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null; 
  }
  
  
  export function removeFromLocalStorage(name) {
    localStorage.removeItem(name);
  }
  