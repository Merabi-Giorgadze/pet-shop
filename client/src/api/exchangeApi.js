// exchangeApi.js
export const fetchExchangeRate = async () => {
 const API_URL = "http://apilayer.net/api/live";
 const ACCESS_KEY = "a15977377fd2537863b90ccaae4c0ea9";

 try {
   const response = await fetch(`${API_URL}?access_key=${ACCESS_KEY}&currencies=GEL&source=USD&format=1`);
   const data = await response.json();

   if (data.success) {
     return data.quotes.USDGEL;
   } else {
     console.error('Error fetching exchange rate:', data.error.info);
     return 2.6;
   }
 } catch (error) {
   console.error('Network error:', error.message);
   return 2.6;
 }
};