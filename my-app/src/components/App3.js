import React from 'react';
import TidioChat from './TidioChat'; // Import the TidioChat component

const App3 = () => {
  return (
    <div className="App" style={{position:"absolute",bottom:"60px",right:"10px"}}>
      {/* Other components */}
      <TidioChat /> {/* Load the Tidio Chatbot */}
    </div>
  );
};

export default App3;
