import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListingInfo = (props: any) => {
  const { listingId } = props;
  const [listingData, setListingData] = useState({
    listingTitle: null,
    listingDescription: null,
    listingAddress: null,
    ada: null,
    internet: null,
    pets: null,
    privateBath: null,
    roommates: null,
    smoking: null,
  });

  const getListing = () => {
    axios.get(`/listing/user/${listingId}`)
      .then((listingInfo) => {
        const {
          listingTitle, listingDescription, listingAddress, ada,
          internet, pets, privateBath, roommates, smoking,
        } = listingInfo.data;
        setListingData({
          listingTitle,
          listingDescription,
          listingAddress,
          ada,
          internet,
          pets,
          privateBath,
          roommates,
          smoking,
        });
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getListing();
  }, []);

  return (
    <div className="listing-info">
      <h3>LISTING INFO</h3>
      {listingData.listingTitle}
      {listingData.listingAddress}
      {listingData.listingDescription}
      ada accessible:
      {' '}
      {listingData.ada}
      internet:
      {' '}
      {listingData.internet}
      pets:
      {' '}
      {listingData.pets}
      privateBath:
      {' '}
      {listingData.privateBath}
      roommates:
      {' '}
      {listingData.roommates}
      smoking:
      {' '}
      {listingData.smoking}
    </div>
  );
};

export default ListingInfo;
