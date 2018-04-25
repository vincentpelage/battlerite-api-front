const getQuote = (arrayOfQuotes) => {
   return arrayOfQuotes[Math.floor(Math.random() * arrayOfQuotes.length)];
}

export default getQuote;
