// App.js

import React, { useEffect } from 'react';
import { saveOfflineData, syncWithBackend, queueSyncRequest } from './indexedDB';

const App = () => {
  useEffect(() => {
    // Check if online and sync data
    window.addEventListener('online', () => {
      console.log('Back online - syncing data with backend.');
      syncWithBackend();
    });

    // Example function to handle saving data offline
    const handleSaveData = async () => {
      const data = { name: 'Sample Profile', age: 30 };
      try {
        if (navigator.onLine) {
          // Save directly to backend if online
          await fetch('http://10.12.37.12:8000/api/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
        } else {
          // Save offline and queue sync request
          await saveOfflineData('profiles', data);
          await queueSyncRequest('http://10.12.37.12:8000/api/save', 'POST', data);
        }
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };

    handleSaveData(); // Call the function to save data
  }, []);

  return <div>Check the console for updates on offline/online data handling!</div>;
};

export default App;