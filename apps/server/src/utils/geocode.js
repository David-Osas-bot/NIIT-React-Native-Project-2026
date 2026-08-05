// OpenStreetMap's Nominatim service — free, no API key required. Their usage
// policy requires a descriptive User-Agent and asks for max ~1 request/sec,
// which is fine at school-project scale.
const BASE_URL = "https://nominatim.openstreetmap.org";
const USER_AGENT = "niit-food-delivery-app (school project)";

async function geocodeAddress(query) {
  const url = `${BASE_URL}/search?q=${encodeURIComponent(query)}&format=json&limit=1`;
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  const results = await response.json();

  if (!results.length) return null;

  return { lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) };
}

function haversineDistanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

module.exports = { geocodeAddress, haversineDistanceKm };
