console.log("map.js loaded");
document.addEventListener("DOMContentLoaded", () => {

    const mapDiv = document.getElementById("map");

    if (!mapDiv) return;

    const lat = parseFloat(mapDiv.dataset.lat);
    const lng = parseFloat(mapDiv.dataset.lng);

    const map = L.map("map").setView([lat, lng], 13);
    console.log(map);

    const tiles = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors",
    }
);

tiles.addTo(map);

console.log(tiles);
    L.marker([lat, lng]).addTo(map);

});