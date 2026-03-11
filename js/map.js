// Map initialization and marker management
let map;
let markers = [];

// Custom red pin icon matching brand
const pinIcon = L.divIcon({
  className: "custom-pin",
  html: `
    <svg width="32" height="44" viewBox="0 0 32 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 28 16 28s16-16 16-28C32 7.163 24.837 0 16 0z" fill="#B22222"/>
      <circle cx="16" cy="15" r="7" fill="#fff"/>
      <text x="16" y="19" text-anchor="middle" font-size="11" font-weight="bold" fill="#B22222" font-family="Inter, sans-serif">dk</text>
    </svg>
  `,
  iconSize: [32, 44],
  iconAnchor: [16, 44],
  popupAnchor: [0, -44],
});

function initMap() {
  // Center on Denmark
  map = L.map("map", {
    center: [56.0, 10.5],
    zoom: 7,
    minZoom: 6,
    maxZoom: 15,
    zoomControl: false,
  });

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(map);

  // Zoom controls at bottom-right
  L.control.zoom({ position: "bottomright" }).addTo(map);

  // Add markers for each location
  trailerLocations.forEach((loc) => {
    const marker = L.marker(loc.coords, { icon: pinIcon }).addTo(map);

    marker.on("click", () => {
      openModal(loc.id);
      // Pan map to center on marker
      map.flyTo(loc.coords, 10, { duration: 0.8 });
    });

    // Tooltip on hover
    marker.bindTooltip(loc.name, {
      direction: "top",
      offset: [0, -44],
      className: "pin-tooltip",
    });

    markers.push({ marker, location: loc });
  });
}
