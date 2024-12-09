import { useEffect } from 'react';
import { openDB } from 'idb';

const useIndexedDB = () => {
  const initDB = async () => {
    const db = await openDB('crop-disease-db', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('profiles')) {
          db.createObjectStore('profiles', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('images')) {
          db.createObjectStore('images', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('sync-queue')) {
          db.createObjectStore('sync-queue', { keyPath: 'id', autoIncrement: true });
        }
      },
    });
    return db;
  };

  const saveOfflineData = async (storeName, data) => {
    const db = await initDB();
    await db.put(storeName, data);
    console.log(`Data saved offline in ${storeName}:`, data);
  };

  const syncWithBackend = async () => {
    const db = await initDB();
    const syncQueue = await db.getAll('sync-queue');
    if (syncQueue.length > 0) {
      for (let request of syncQueue) {
        // Replace this with your backend API endpoint
        fetch(request.url, {
          method: request.method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(request.body),
        })
          .then((response) => {
            if (response.ok) {
              db.delete('sync-queue', request.id); // Remove successfully synced requests from IndexedDB
              console.log(`Successfully synced request with ID ${request.id}`);
            }
          })
          .catch((error) => {
            console.error('Error syncing with backend:', error);
          });
      }
    }
  };

  const queueSyncRequest = async (url, method, body) => {
    const db = await initDB();
    await db.add('sync-queue', { url, method, body });
    console.log('Request queued for sync:', { url, method, body });
  };

  return { saveOfflineData, syncWithBackend, queueSyncRequest };
};

export default useIndexedDB;
