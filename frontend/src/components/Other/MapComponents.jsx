import { useEffect } from "react";
import L from "leaflet";

const MapComponents = () => {
  useEffect(() => {
    const map = L.map("map").setView([28.6139, 77.209], 5);

    // Add MapTiler tiles
    L.tileLayer(
      `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=guH98SuP1qEfBsrk2TPM`,
      {
        attribution:
          '<a href="https://www.maptiler.com/">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>',
      }
    ).addTo(map);


    const locations = [
      {
        lat: 28.6139,
        lng: 77.209,
        name: "Badarpur Thermal Power Plant (Delhi)",
      },
      { lat: 28.746, lng: 77.1955, name: "Rajghat Power House (Delhi)" },
      {
        lat: 29.4722,
        lng: 77.7067,
        name: "Panipat Thermal Power Station (Haryana)",
      },
      {
        lat: 25.4358,
        lng: 81.8463,
        name: "Anpara Thermal Power Plant (Uttar Pradesh)",
      },


      {
        lat: 21.1702,
        lng: 72.8311,
        name: "Ukai Thermal Power Station (Gujarat)",
      },
      {
        lat: 20.9477,
        lng: 77.7796,
        name: "Chandrapur Super Thermal Power Station (Maharashtra)",
      },
      {
        lat: 19.076,
        lng: 72.8777,
        name: "Trombay Thermal Power Station (Mumbai, Maharashtra)",
      },

      // East India
      {
        lat: 23.7957,
        lng: 86.4304,
        name: "Bokaro Thermal Power Station (Jharkhand)",
      },
      {
        lat: 23.6693,
        lng: 86.1511,
        name: "Tenughat Thermal Power Station (Jharkhand)",
      },
      {
        lat: 23.5204,
        lng: 87.3119,
        name: "Durgapur Thermal Power Station (West Bengal)",
      },
      {
        lat: 23.7451,
        lng: 87.5712,
        name: "Kolaghat Thermal Power Station (West Bengal)",
      },

     
      {
        lat: 14.4673,
        lng: 78.8242,
        name: "Rayalaseema Thermal Power Station (Andhra Pradesh)",
      },
      {
        lat: 15.4967,
        lng: 80.0499,
        name: "Nellore Thermal Power Station (Andhra Pradesh)",
      },
      {
        lat: 12.9716,
        lng: 77.5946,
        name: "Raichur Thermal Power Station (Karnataka)",
      },
      {
        lat: 13.0827,
        lng: 80.2707,
        name: "Ennore Thermal Power Station (Tamil Nadu)",
      },

     
      {
        lat: 22.7196,
        lng: 75.8577,
        name: "Satpura Thermal Power Station (Madhya Pradesh)",
      },
      {
        lat: 23.1765,
        lng: 75.7849,
        name: "Sanwara Thermal Power Station (Madhya Pradesh)",
      },
      {
        lat: 21.1904,
        lng: 81.2849,
        name: "Korba Super Thermal Power Plant (Chhattisgarh)",
      },
    ];

    locations.forEach((loc) => {
      L.marker([loc.lat, loc.lng])
        .addTo(map)
        .bindPopup(`<b>${loc.name}</b>`)
        .openPopup();
    });
  }, []);

  return <div id="map" style={{ height: "400px", width: "100%" }}></div>;
};

export default MapComponents;
