// main.js - NearWise+ – Smart Nearby Helper

// ========== Global Variables ========== //
let lat = null, lon = null;
const addressEl = document.getElementById("address");
const coordsEl = document.getElementById("coordinates");
const networkStatus = document.getElementById("network-status");
const connectionType = document.getElementById("connectionType");
const downlinkSpeed = document.getElementById("downlinkSpeed");
const canvas = document.getElementById("offlineCanvas");
const ctx = canvas.getContext("2d");

// ========== Geolocation & Address Detection ========== //
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      coordsEl.textContent = `Latitude: ${lat.toFixed(5)}, Longitude: ${lon.toFixed(5)}`;
      await fetchAddress(lat, lon);
    }, error => {
      coordsEl.textContent = "Location access denied.";
    });
  } else {
    coordsEl.textContent = "Geolocation is not supported.";
  }
}

async function fetchAddress(latitude, longitude) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const address = data.display_name;
    addressEl.textContent = `Address: ${address}`;
  } catch (e) {
    addressEl.textContent = "Address not available (API limit?).";
  }
}

// ========== Canvas: Offline Alert Banner ========== //
function drawOfflineBanner() {
  ctx.fillStyle = "#ff4d4d";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("⚠️ You're Offline. Some features may not work.", 10, 30);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ========== Network Information API ========== //
function checkNetworkInfo() {
  if (navigator.onLine) {
    clearCanvas();
    networkStatus.innerHTML = "<span style='color:green;'>🟢 Online</span>";
  } else {
    drawOfflineBanner();
    networkStatus.innerHTML = "<span style='color:red;'>🔴 Offline</span>";
  }

  if ('connection' in navigator) {
    const connection = navigator.connection;
    connectionType.textContent = `Type: ${connection.effectiveType}`;
    downlinkSpeed.textContent = `Speed: ${connection.downlink} Mbps`;
  }
}

window.addEventListener("online", checkNetworkInfo);
window.addEventListener("offline", checkNetworkInfo);

// ========== Intersection Observer Animations ========== //
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll(".observer").forEach(el => observer.observe(el));

// ========== Open Nearby Services in Google Maps ========== //
function openService(type) {
  if (!lat || !lon) {
    alert("Location not ready yet. Please wait...");
    return;
  }
  const queryMap = {
    hospital: "hospitals",
    police: "police stations",
    petrol: "petrol pumps",
    atm: "ATMs",
    mechanic: "vehicle repair",
    repair: "mobile laptop repair",
    wifi: "public wifi",
    pharmacy: "24x7 pharmacies",
    shelter: "emergency shelter"
  };
  const query = queryMap[type];
  const mapsURL = `https://www.google.com/maps/search/${encodeURIComponent(query)}/@${lat},${lon},15z`;
  window.open(mapsURL, "_blank");
}

// ========== Background Task Fallback ========== //
if ("requestIdleCallback" in window) {
  requestIdleCallback(() => {
    getLocation();
    checkNetworkInfo();
  });
} else {
  window.onload = () => {
    getLocation();
    checkNetworkInfo();
  };
}

document.getElementById("refresh-location").addEventListener("click", () => {
  getLocation();
});

// ========== Extra Features ========== //
// Location caching in localStorage
window.addEventListener("beforeunload", () => {
  if (lat && lon) {
    localStorage.setItem("lastLat", lat);
    localStorage.setItem("lastLon", lon);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const lastLat = localStorage.getItem("lastLat");
  const lastLon = localStorage.getItem("lastLon");
  if (lastLat && lastLon) {
    lat = parseFloat(lastLat);
    lon = parseFloat(lastLon);
    coordsEl.textContent = `Last Location: Latitude ${lat}, Longitude ${lon}`;
    fetchAddress(lat, lon);
  }
});

// Keyboard accessibility for cards
const buttons = document.querySelectorAll(".card button");
buttons.forEach(btn => {
  btn.setAttribute("tabindex", "0");
});
