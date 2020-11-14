import React, { FC } from 'react';
import { RadarChartInterface } from 'goldilocksTypes';
import { Radar } from 'react-chartjs-2';

const radarChart: FC<RadarChartInterface> = ({ hostData, hostName }): JSX.Element => {
  // const blah = 'shut up';
  // console.log('host data: ', hostData);
  // console.log('host name: ', hostName);

  // TODO: get all this crap data delivered to this crap component
  // const otherData = something.something;
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
  console.log('logged in user\'s data: ', myData);
  console.log('other users data: ', otherData);
  const personalityLabels = [
    'Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Emotional Range',
  ];

  const radarData = {
    labels: personalityLabels,
    datasets: [
      {
        label: localStorage.firstName,
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
