import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

const HostInfo = (props: any) => {
  const { hostId } = props;
  const [hostData, setHostData] = useState({
    firstName: '',
    lastName: '',
    pronouns: '',
    hostRating: '',
  });

  const getHost = () => {
    axios.get(`/user/${hostId}`)
      .then((hostInfo) => {
        const {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          first_name, last_name, pronouns, hostRating,
        } = hostInfo.data;
        setHostData({
          firstName: first_name,
          lastName: last_name,
          pronouns,
          hostRating,
        });
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getHost();
  }, []);

  return (
    <div className="host-info">
      <h3>host info</h3>
      <img src="https://i.ibb.co/ZMtTcsm/bettythedog.jpg" alt="dog portrait" width="150" />
      <br />
      {hostData.firstName}
      {' '}
      {hostData.lastName}
      {' '}
      (
      {hostData.pronouns}
      )
      <br />
      host rating:
      {' '}
      {hostData.hostRating}
      <br />
      <Button variant="outlined" color="secondary">
        message host
      </Button>
      <br />
      <br />
      <Button variant="outlined" color="secondary">
        request swap
      </Button>
    </div>
  );
};

export default HostInfo;
