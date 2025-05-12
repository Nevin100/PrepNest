import React from "react";
import Features from "./_components/Features";
import History from "./_components/History";
import Feedback from "./_components/Feedback";

const Dashboard = () => {
  return (
    <div>
      <Features />

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-25 gap-10 md:mt-20 mt-14">
        <History />
        <Feedback />
      </div>
    </div>
  );
};

export default Dashboard;
