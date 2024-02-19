import "./App.css";
import React, { useEffect } from "react";
import PhoneOtpForm from "./Components/phone-login";

function App() {
  const hideMarquee = () => {
    const marquee = document.querySelector("marquee");
    marquee.style.display = "none";
  };
  // Hide the welcome message on page load and show it after a delay of 1
  useEffect(() => {
    setTimeout(hideMarquee, 20000);
  }, []);

  return (
    <>
      <div className="App">
        <marquee className="marquee" behavior="" direction="left">
          you may click submit without number
        </marquee>

        <PhoneOtpForm></PhoneOtpForm>
      </div>
    </>
  );
}

export default App;
