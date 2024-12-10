import React, { useState } from 'react';
import { MapPin, Search, Navigation } from 'lucide-react';

// Mock data of support centers (would typically come from a backend API)
const supportCenters = [
  {
    id: 1,
    name: "Green Fields Agricultural Support",
    address: "123 Rural Road, Farmville",
    state: "Punjab",
    district: "Ludhiana",
    services: ["Crop Consultation", "Equipment Rental", "Loan Assistance"],
    coordinates: { lat: 30.9010, lng: 75.8573 },
    contactNumber: "+91 98765 43210"
  },
  {
    id: 2,
    name: "Harvest Hope Center",
    address: "456 Agrarian Lane, Croptown",
    state: "Maharashtra",
    district: "Nashik",
    services: ["Soil Testing", "Irrigation Advice", "Market Information"],
    coordinates: { lat: 19.9975, lng: 73.7898 },
    contactNumber: "+91 87654 32109"
  },
  {
    id: 3,
    name: "Rural Development Hub",
    address: "789 Farmer's Way, Agriculture City",
    state: "Karnataka",
    district: "Belgaum",
    services: ["Training Programs", "Seed Distribution", "Government Scheme Info"],
    coordinates: { lat: 15.8497, lng: 74.4977 },
    contactNumber: "+91 76543 21098"
  }
];

const FarmerSupportCenterLocator = () => {
  // State management
  const [searchState, setSearchState] = useState('');
  const [searchDistrict, setSearchDistrict] = useState('');
  const [filteredCenters, setFilteredCenters] = useState(supportCenters);

  // Unique states and districts for dropdown
  const uniqueStates = [...new Set(supportCenters.map(center => center.state))];
  const uniqueDistricts = [...new Set(supportCenters.map(center => center.district))];

  // Search functionality
  const handleSearch = () => {
    const filtered = supportCenters.filter(center => 
      (searchState === '' || center.state === searchState) &&
      (searchDistrict === '' || center.district === searchDistrict)
    );
    setFilteredCenters(filtered);
  };

  // Get directions (would integrate with mapping service in real app)
  const getDirections = (coordinates) => {
    // Placeholder for actual navigation logic
    window.open(`https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-green-700 flex items-center justify-center">
        <MapPin className="mr-2" /> Farmer Support Center Locator
      </h1>

      {/* Search Filters */}
      <div className="flex space-x-4 mb-6">
        <select 
          value={searchState}
          onChange={(e) => setSearchState(e.target.value)}
          className="w-1/2 p-2 border rounded"
        >
          <option value="">Select State</option>
          {uniqueStates.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <select 
          value={searchDistrict}
          onChange={(e) => setSearchDistrict(e.target.value)}
          className="w-1/2 p-2 border rounded"
        >
          <option value="">Select District</option>
          {uniqueDistricts.map(district => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>

        <button 
          onClick={handleSearch}
          className="bg-green-500 text-white p-2 rounded flex items-center"
        >
          <Search className="mr-2" /> Search
        </button>
      </div>

      {/* Results */}
      {filteredCenters.length === 0 ? (
        <div className="text-center text-gray-500">
          No support centers found. Try adjusting your search.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredCenters.map(center => (
            <div 
              key={center.id} 
              className="border p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2 text-green-600">
                {center.name}
              </h2>
              <p className="text-gray-700 mb-1">
                <strong>Address:</strong> {center.address}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>State:</strong> {center.state}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>District:</strong> {center.district}
              </p>
              <div className="mb-2">
                <strong>Services:</strong>
                <ul className="list-disc list-inside text-gray-600">
                  {center.services.map(service => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-700 mb-2">
                <strong>Contact:</strong> {center.contactNumber}
              </p>
              <button
                onClick={() => getDirections(center.coordinates)}
                className="w-full bg-blue-500 text-white p-2 rounded flex items-center justify-center"
              >
                <Navigation className="mr-2" /> Get Directions
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmerSupportCenterLocator;