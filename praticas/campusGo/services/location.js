import * as Location from 'expo-location';
export async function getCurrentPlace() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;
  const position = await Location.getCurrentPositionAsync({});
  const places = await Location.reverseGeocodeAsync(position.coords);
  const p = places[0];
  return { label: [p?.street, p?.city, p?.region].filter(Boolean).join(', ') || 'Localização atual' };
}
