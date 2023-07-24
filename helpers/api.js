export const API_CATEGORY = 'https://opentdb.com/api_category.php';
export const API_URL = (category, difficulty, type) => 
                    `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`;
                    
export const API_URL_ALT = (difficulty, type) => 
                    `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=${type}`;