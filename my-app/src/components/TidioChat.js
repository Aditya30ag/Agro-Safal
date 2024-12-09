import React, { useEffect } from "react";

const TidioChat = () => {
  useEffect(() => {
    // Embedded chatbot config
    window.embeddedChatbotConfig = {
      chatbotId: "KQsKTS8teAiF4IAdFC8vP",
      domain: "www.chatbase.co",
    };

    // Create script element
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.async = true;
    script.defer = true;
    script.setAttribute("chatbotId", "WFstMZKdEyyuwbjxfxKei");
    script.setAttribute("domain", "www.chatbase.co");

    // Append script to the document body
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array to ensure this runs only on mount/unmount

  return (
    <div style={{ width: "100%", height: "100%", minHeight: "700px" }}>
      {/* <iframe
        src="https://www.chatbase.co/chatbot-iframe/WFstMZKdEyyuwbjxfxKei"
        width="100%"
        style={{ height: "100%", minHeight: "700px" }}
        frameBorder="0"
      ></iframe> */}
    </div>
  );
};

export default TidioChat;