# 🌍 NearWise+ – Smart Nearby Helper

**NearWise+** is a responsive, interactive web application built using modern Web APIs to help users **find essential services nearby** such as hospitals, ATMs, fuel stations, shelters, and more — in real-time — using **your location** and **smart features**. This project solves real-world accessibility and emergency-response problems using browser capabilities without installing any app.

---

## 🚀 Live Demo

🌐 [https://your-vercel-link.com](https://tap-api-assesment.vercel.app/)

---

## 📸 Screenshots

> Add images in a folder `assets/screenshots/`

| Dashboard View | Cards & Address |
|----------------|-----------------|
| ![screenshot1](./assests/Screenshot (1)) | [screenshot1](./assests/Screenshot (2)) | [screenshot1](./assests/Screenshot (3))  | [screenshot1](./assests/Screenshot (4))

---

## ✨ Key Features

- 🧭 Real-time Geolocation (with fallback)
- 🏥 Interactive cards for emergency and nearby services
- 🗺️ One-click access to Google Maps directions
- 🌐 Network speed/type info using **Network Information API**
- 🎨 Custom offline banner using **Canvas API**
- 🔍 Scroll-based animations with **Intersection Observer API**
- 💾 LocalStorage caching for last known location
- 📱 Fully responsive (desktop, tablet, mobile)
- ♿ Accessible via keyboard and semantic tags
- 🚦 Background Tasks compatible fallback (`requestIdleCallback`)

---

## 🧠 Web APIs Used

| API | Description |
|-----|-------------|
| [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) | Gets the user's live location |
| [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) | Draws an offline alert banner |
| [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) | Animates cards on scroll |
| [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API) | Detects connection type/speed |
| [Background Tasks API](https://developer.mozilla.org/en-US/docs/Web/API/Background_Tasks_API) | Idle loading and graceful fallback |

---

## 🧩 Project Structure

