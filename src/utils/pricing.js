

const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const getMoviePricing = (movie) => {

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 2020;
  const currentYear = new Date().getFullYear();
  const age = Math.max(0, currentYear - releaseYear);

  const randomFactor = seededRandom(movie.id);

  let basePrice;
  if (age < 2) {
    basePrice = 14 + Math.floor(randomFactor * 6); // 14 a 19
  } else if (age < 10) {
    basePrice = 9 + Math.floor(randomFactor * 6); // 9 a 14
  } else if (age < 25) {
    basePrice = 5 + Math.floor(randomFactor * 5); // 5 a 9
  } else {
    basePrice = 3 + Math.floor(randomFactor * 3); // 3 a 5
  }
  const purchasePrice = basePrice + 0.99;

  let rentBase = Math.max(1, Math.floor(purchasePrice / 3.5));

  if (seededRandom(movie.id + 2) > 0.5) rentBase += 1;
  const rentPrice = rentBase + 0.99;

  const isDiscounted = movie.vote_average > 7.5;

  const possibleDiscounts = [10, 15, 20, 25, 30, 35, 40];
  const discountIndex = Math.floor(seededRandom(movie.id + 1) * possibleDiscounts.length);
  const discountPercentage = possibleDiscounts[discountIndex];

  const discountedPrice = isDiscounted 
    ? parseFloat((purchasePrice * (1 - discountPercentage / 100)).toFixed(2))
    : purchasePrice;

  const discountedRentPrice = isDiscounted
    ? parseFloat((rentPrice * (1 - discountPercentage / 100)).toFixed(2))
    : rentPrice;

  return {
    purchasePrice,
    rentPrice,
    isDiscounted,
    discountPercentage,
    finalPurchasePrice: discountedPrice,
    finalRentPrice: discountedRentPrice
  };
};
