// import React, { useState, useEffect } from 'react';
// import { 
//   Bell, 
//   Info, 
//   AlertCircle, 
//   X, 
//   ChevronRight 
// } from 'lucide-react';

// // Mock data for notifications (would typically come from backend/API)
// const initialNotifications = [
//   {
//     id: 1,
//     type: 'scheme',
//     title: 'New PM-KISAN Installment Released',
//     description: 'The latest installment of ₹2,000 has been credited to eligible farmers\' accounts.',
//     date: '2024-03-15',
//     priority: 'high',
//     link: 'https://pmkisan.gov.in/'
//   },
//   {
//     id: 2,
//     type: 'weather',
//     title: 'Monsoon Advisory for Kharif Crop Season',
//     description: 'Predicted above-average rainfall in key agricultural regions. Prepare for sowing.',
//     date: '2024-05-20',
//     priority: 'medium',
//     link: 'https://mausam.imd.gov.in/'
//   },
//   {
//     id: 3,
//     type: 'market',
//     title: 'Minimum Support Price (MSP) Update',
//     description: 'Government announces increased MSP for key agricultural commodities.',
//     date: '2024-02-10',
//     priority: 'low',
//     link: 'https://agricoop.gov.in/'
//   }
// ];

// const NotificationBar = () => {
//   const [notifications, setNotifications] = useState(initialNotifications);
//   const [expandedNotification, setExpandedNotification] = useState(null);
//   const [isMinimized, setIsMinimized] = useState(false);

//   // Notification type color and icon mapping
//   const notificationStyles = {
//     scheme: { 
//       color: 'bg-green-100 border-green-300', 
//       icon: <Info className="text-green-600" /> 
//     },
//     weather: { 
//       color: 'bg-blue-100 border-blue-300', 
//       icon: <AlertCircle className="text-blue-600" /> 
//     },
//     market: { 
//       color: 'bg-yellow-100 border-yellow-300', 
//       icon: <Bell className="text-yellow-600" /> 
//     }
//   };

//   // Real-time notification simulation (would be replaced by WebSocket/API in production)
//   useEffect(() => {
//     const simulateNewNotification = () => {
//       const newNotification = {
//         id: notifications.length + 1,
//         type: ['scheme', 'weather', 'market'][Math.floor(Math.random() * 3)],
//         title: 'Simulated Real-Time Notification',
//         description: 'This is a simulated notification to demonstrate real-time updates.',
//         date: new Date().toISOString().split('T')[0],
//         priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
//         link: 'https://agricoop.gov.in/'
//       };

//       setNotifications(prev => [newNotification, ...prev]);
//     };

//     // Simulate new notification every 2 minutes
//     const intervalId = setInterval(simulateNewNotification, 120000);

//     return () => clearInterval(intervalId);
//   }, []);

//   // Remove a specific notification
//   const removeNotification = (id) => {
//     setNotifications(prev => prev.filter(notification => notification.id !== id));
//   };

//   // Render individual notification
//   const renderNotification = (notification) => {
//     const { color, icon } = notificationStyles[notification.type] || notificationStyles.scheme;

//     return (
//       <div 
//         key={notification.id}
//         className={`relative border rounded-lg mb-2 p-3 ${color} flex items-start`}
//       >
//         <div className="mr-3 mt-1">
//           {icon}
//         </div>
//         <div className="flex-grow">
//           <div className="flex justify-between items-center mb-1">
//             <h3 className="font-semibold text-gray-800">{notification.title}</h3>
//             <span className="text-xs text-gray-500">{notification.date}</span>
//           </div>
//           {expandedNotification === notification.id ? (
//             <>
//               <p className="text-gray-700 mb-2">{notification.description}</p>
//               <div className="flex justify-between items-center">
//                 <a 
//                   href={notification.link} 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:underline text-sm"
//                 >
//                   Learn More
//                 </a>
//               </div>
//             </>
//           ) : (
//             <p className="text-gray-600 text-sm truncate">{notification.description}</p>
//           )}
//         </div>
//         <div className="ml-3 flex flex-col space-y-1">
//           <button 
//             onClick={() => setExpandedNotification(
//               expandedNotification === notification.id ? null : notification.id
//             )}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             {expandedNotification === notification.id ? 'Collapse' : 'Expand'}
//           </button>
//           <button 
//             onClick={() => removeNotification(notification.id)}
//             className="text-red-500 hover:text-red-700"
//           >
//             <X size={16} />
//           </button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className={`fixed bottom-4 right-4 w-96 ${isMinimized ? 'h-12' : 'h-auto'} bg-white shadow-lg rounded-lg border transition-all duration-300`}>
//       {/* Header */}
//       <div 
//         className="bg-green-600 text-white p-3 rounded-t-lg flex justify-between items-center cursor-pointer"
//         onClick={() => setIsMinimized(!isMinimized)}
//       >
//         <div className="flex items-center">
//           <Bell className="mr-2" />
//           <h2 className="font-semibold">Government Notifications</h2>
//           <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
//             {notifications.length}
//           </span>
//         </div>
//         <button onClick={() => setIsMinimized(!isMinimized)}>
//           {isMinimized ? <ChevronRight /> : <X />}
//         </button>
//       </div>

//       {/* Notification List */}
//       {!isMinimized && (
//         <div className="p-4 max-h-96 overflow-y-auto">
//           {notifications.length === 0 ? (
//             <div className="text-center text-gray-500">
//               No new notifications
//             </div>
//           ) : (
//             notifications.map(renderNotification)
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NotificationBar;