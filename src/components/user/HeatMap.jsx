import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import "./HeatMap.css";

const HeatMapProfile = () => {

  const [activityData, setActivityData] = useState([]);

  useEffect(() => {

    const fetchActivity = async () => {

      const userId = localStorage.getItem("userId");

      try {

        const response = await fetch(
          `http://13.234.30.254:5000/activity/${userId}`
        );

        const data = await response.json();

        setActivityData(data);

      } catch (error) {
        console.log("Activity error:", error);
      }

    };

    fetchActivity();

  }, []);

  return (

    <div className="heatmap-container">

      <h2 className="heatmap-title">
        Contributions
      </h2>

      <HeatMap
        style={{ maxWidth: "600px", height: "150px" }}
        value={activityData}
        startDate={new Date("2025-01-01")}
        endDate={new Date()}
        weekLabels={["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}
        panelColors={{
          0: "#ebedf0",
          1: "#9be9a8",
          2: "#40c463",
          3: "#30a14e",
          4: "#216e39",
          5: "#216e39",
          6: "#216e39",
          7: "#216e39",
          8: "#216e39",
          9: "#216e39",
          10: "#216e39",
          11: "#216e39",
          12: "#216e39",
        }}
      />

    </div>
  );
};

export default HeatMapProfile;