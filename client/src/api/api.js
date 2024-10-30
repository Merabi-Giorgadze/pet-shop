const API_KEY = "1vpxH5UWS87ro5SwSQVGbdaUayeNNYpWdxtqP28QkyGCEONE2A";
const API_URL_ANIMALS = "https://crudapi.co.uk/api/v1/animal"; // Full URL
const API_URL_CATEGORIES = "https://crudapi.co.uk/api/v1/categories"; // Full URL

const headers = {
  "Authorization": `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

// GET animals
export const getAnimals = async () => {
  try {
    const response = await fetch(API_URL_ANIMALS, { headers });
    if (!response.ok) throw new Error("Failed to fetch animals");
    const data = await response.json();
    console.log('Fetched animals:', data);
    return data;
  } catch (error) {
    console.error('Error fetching animals:', error);
    throw error;
  }
};

// GET animal by ID
export const getAnimalById = async (id) => {
  try {
    const response = await fetch(`${API_URL_ANIMALS}/${id}`, { headers });
    if (!response.ok) throw new Error("Failed to fetch animal");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching animal by ID:', error);
    throw error;
  }
};

// New function to fetch animal details by UUID
export const getAnimalDetails = async (uuid) => {
  try {
    const response = await fetch(`${API_URL_ANIMALS}/${uuid}`, { headers });
    if (!response.ok) throw new Error("Failed to fetch animal details");
    const data = await response.json();
    return data; // Return the fetched animal details
  } catch (error) {
    console.error('Error fetching animal details:', error);
    throw error;
  }
};

// UPDATE animal
export const updateAnimal = async (id, updatedData) => {
  try {
    const response = await fetch(`${API_URL_ANIMALS}/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error("Failed to update animal");
    return response.json();
  } catch (error) {
    console.error('Error updating animal:', error);
    throw error;
  }
};

// UPDATE ANIMAL WITH CATEGORIES
export const updateAnimalCategoryApi = async (animalId, data) => {
  try {
    const response = await fetch(`${API_URL_ANIMALS}/${animalId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update animal category');
    return response.json();
  } catch (error) {
    console.error('Error updating animal category:', error);
    throw error;
  }
};

// GET categories
export const getCategories = async () => {
  try {
    const response = await fetch(API_URL_CATEGORIES, { headers });
    if (!response.ok) throw new Error("Failed to fetch categories");
    const data = await response.json();
    console.log('Fetched categories:', data);
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// GET animals by category
export const getAnimalsByCategory = async (categoryTitle) => {
  try {
    const response = await fetch(`${API_URL_ANIMALS}?categoryTitle=${encodeURIComponent(categoryTitle)}`, {
      headers,
    });
    if (!response.ok) throw new Error("Failed to fetch animals by category");
    const data = await response.json();
    return data; // Should return only relevant animals
  } catch (error) {
    console.error('Error fetching animals by category:', error);
    throw error; // Add error logging
  }
};

// GET category details by title
export const getCategoryDetails = async (categoryTitle) => {
  try {
    const response = await fetch(`${API_URL_CATEGORIES}?title=${encodeURIComponent(categoryTitle)}`, {
      headers,
    });
    if (!response.ok) throw new Error("Failed to fetch category details");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching category details:', error);
    throw error;
  }
};
