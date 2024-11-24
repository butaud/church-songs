import React, { useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Scatter } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function App() {
  return (
    <div className="App">
      <Scatter
        data={{
          labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          datasets: [
            {
              label: "Hours worked",
              data: [
                {
                  x: 1,
                  y: 1,
                },
                {
                  x: 2,
                  y: 2,
                },
                {
                  x: 3,
                  y: 3,
                },
                {
                  x: 4,
                  y: 4,
                },
                {
                  x: 5,
                  y: 5,
                },
              ],
            },
          ],
        }}
      />
    </div>
  );
}

export default App;
