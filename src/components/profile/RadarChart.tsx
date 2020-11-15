import React, { FC } from 'react';
import { RadarChartInterface } from 'goldilocksTypes';
import { Radar } from 'react-chartjs-2';

const radarChart: FC<RadarChartInterface> = ({ hostData, hostName }): JSX.Element => {
  const otherData = [
    hostData.openness,
    hostData.conscientiousness,
    hostData.extraversion,
    hostData.agreeableness,
    hostData.neuroticism,
  ];
  const myData = [
    localStorage.openness,
    localStorage.conscientiousness,
    localStorage.extraversion,
    localStorage.agreeableness,
    localStorage.neuroticism,
  ];
  const personalityLabels = [
    'O', 'C', 'Ex', 'A', 'Em',
  ];

  const radarData = {
    labels: personalityLabels,
    datasets: [
      {
        label: 'You',
        backgroundColor: 'rgba(0, 0, 255, 0.3)',
        hoverBackgroundColor: 'rgba(0, 0, 255, 0.5)',
        borderColor: 'rgba(0, 0, 255, 1)',
        pointBorderColor: 'rgba(0, 0, 255, 1)',
        pointBackgroundColor: 'rgba(0, 0, 255, 1)',
        pointRadius: 'rgba(0, 0, 255, 1)',
        borderWidth: 1.5,
        data: myData,
      },
      {
        label: hostName,
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        hoverBackgroundColor: 'rgba(255, 0, 0, 0.5)',
        borderColor: 'rgba(255, 0, 0, 1)',
        pointBorderColor: 'rgba(255, 0, 0, 1)',
        pointBackgroundColor: 'rgba(255, 0, 0, 1)',
        pointRadius: 'rgba(255, 0, 0, 1)',
        borderWidth: 1.5,
        data: otherData,
      },
    ],
  };

  return (
    <>
      <Radar data={radarData} />
    </>
  );
};

export default radarChart;
