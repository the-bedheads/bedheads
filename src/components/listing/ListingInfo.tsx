import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/styles';
import {
  Accessible, Wifi, Pets, Bathtub, People, SmokingRooms,
} from '@material-ui/icons';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface ListingProps {
  listingId: number
}

const ListingInfo: React.FC<ListingProps> = ({ listingId }) => {
  const classes = useStyles();
  const [listingData, setListingData] = useState({
    listingTitle: null,
    listingDescription: null,
    listingAddress: null,
    ada: true,
    internet: true,
    pets: true,
    privateBath: false,
    roommates: true,
    smoking: true,
  });
  const [accommodations, setAccommodations] = useState(['']);

  const displayAccommodations = async () => {
    const iconsToRender = [];
    const {
      ada, internet, pets, privateBath, roommates, smoking,
    } = listingData;
    if (ada) iconsToRender.push('ada');
    if (internet) iconsToRender.push('wifi');
    if (pets) iconsToRender.push('pets');
    if (privateBath) iconsToRender.push('bath');
    if (roommates) iconsToRender.push('roommates');
    if (smoking) iconsToRender.push('smoking');
    setAccommodations(iconsToRender);
  };

  const renderIcons = () => {
    const icons: { [key: string]: string } = {
      wifi: 'M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z',
      ada: 'M18.4,11.2L14.3,11.4L16.6,8.8C16.8,8.5 16.9,8 16.8,7.5C16.7,7.2 16.6,6.9 16.3,6.7L10.9,3.5C10.5,3.2 9.9,3.3 9.5,3.6L6.8,6.1C6.3,6.6 6.2,7.3 6.7,7.8C7.1,8.3 7.9,8.3 8.4,7.9L10.4,6.1L12.3,7.2L8.1,11.5C8,11.6 8,11.7 7.9,11.7C7.4,11.9 6.9,12.1 6.5,12.4L8,13.9C8.5,13.7 9,13.5 9.5,13.5C11.4,13.5 13,15.1 13,17C13,17.6 12.9,18.1 12.6,18.5L14.1,20C14.7,19.1 15,18.1 15,17C15,15.8 14.6,14.6 13.9,13.7L17.2,13.4L17,18.2C16.9,18.9 17.4,19.4 18.1,19.5H18.2C18.8,19.5 19.3,19 19.4,18.4L19.6,12.5C19.6,12.2 19.5,11.8 19.3,11.6C19,11.3 18.7,11.2 18.4,11.2M18,5.5A2,2 0 0,0 20,3.5A2,2 0 0,0 18,1.5A2,2 0 0,0 16,3.5A2,2 0 0,0 18,5.5M12.5,21.6C11.6,22.2 10.6,22.5 9.5,22.5C6.5,22.5 4,20 4,17C4,15.9 4.3,14.9 4.9,14L6.4,15.5C6.2,16 6,16.5 6,17C6,18.9 7.6,20.5 9.5,20.5C10.1,20.5 10.6,20.4 11,20.1L12.5,21.6Z',
      pets: 'M8.35,3C9.53,2.83 10.78,4.12 11.14,5.9C11.5,7.67 10.85,9.25 9.67,9.43C8.5,9.61 7.24,8.32 6.87,6.54C6.5,4.77 7.17,3.19 8.35,3M15.5,3C16.69,3.19 17.35,4.77 17,6.54C16.62,8.32 15.37,9.61 14.19,9.43C13,9.25 12.35,7.67 12.72,5.9C13.08,4.12 14.33,2.83 15.5,3M3,7.6C4.14,7.11 5.69,8 6.5,9.55C7.26,11.13 7,12.79 5.87,13.28C4.74,13.77 3.2,12.89 2.41,11.32C1.62,9.75 1.9,8.08 3,7.6M21,7.6C22.1,8.08 22.38,9.75 21.59,11.32C20.8,12.89 19.26,13.77 18.13,13.28C17,12.79 16.74,11.13 17.5,9.55C18.31,8 19.86,7.11 21,7.6M19.33,18.38C19.37,19.32 18.65,20.36 17.79,20.75C16,21.57 13.88,19.87 11.89,19.87C9.9,19.87 7.76,21.64 6,20.75C5,20.26 4.31,18.96 4.44,17.88C4.62,16.39 6.41,15.59 7.47,14.5C8.88,13.09 9.88,10.44 11.89,10.44C13.89,10.44 14.95,13.05 16.3,14.5C17.41,15.72 19.26,16.75 19.33,18.38Z',
      bath: 'M9 3C5.69 3 3.14 5.69 3 9V21H12V13.46C13.1 14.45 14.5 15 16 15C19.31 15 22 12.31 22 9C22 5.69 19.31 3 16 3H9M16 5C18.21 5 20 6.79 20 9C20 11.21 18.21 13 16 13C13.79 13 12 11.21 12 9C12 6.79 13.79 5 16 5M16 7.25C15.03 7.25 14.25 8.03 14.25 9C14.25 9.97 15.03 10.75 16 10.75C16.97 10.75 17.75 9.97 17.75 9C17.75 8.03 16.97 7.25 16 7.25M4 12H5V13H4V12M6 12H7V13H6V12M8 12H9V13H8V12M10 12H11V13H10V12Z',
      roommates: 'M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z',
      smoking: 'M2,16H17V19H2V16M20.5,16H22V19H20.5V16M18,16H19.5V19H18V16M18.85,7.73C19.47,7.12 19.85,6.28 19.85,5.35C19.85,3.5 18.35,2 16.5,2V3.5C17.5,3.5 18.35,4.33 18.35,5.35C18.35,6.37 17.5,7.2 16.5,7.2V8.7C18.74,8.7 20.5,10.53 20.5,12.77V15H22V12.76C22,10.54 20.72,8.62 18.85,7.73M16.03,10.2H14.5C13.5,10.2 12.65,9.22 12.65,8.2C12.65,7.18 13.5,6.45 14.5,6.45V4.95C12.65,4.95 11.15,6.45 11.15,8.3A3.35,3.35 0 0,0 14.5,11.65H16.03C17.08,11.65 18,12.39 18,13.7V15H19.5V13.36C19.5,11.55 17.9,10.2 16.03,10.2Z',
    };
    return accommodations.map((amenity: string) => (
      <SvgIcon>
        <path d={icons[amenity]} />
      </SvgIcon>
    ));
  };

  const getListing = () => {
    axios.get(`/listing/user/${listingId}`)
      .then((listingInfo) => {
        const {
          listingTitle,
          listingDescription,
          listingAddress,
          ada,
          internet,
          pets,
          privateBath,
          roommates,
          smoking,
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
        displayAccommodations();
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getListing();
  }, []);

  return (
    <div className="listing-info">
      <Grid container spacing={2} direction="row" justify="center">
        <Paper>
          <br />
          <Typography variant="h5" align="center">{listingData.listingTitle}</Typography>
          <br />
          <Paper>
            <Typography>
              Enter Listing Photos Here.
            </Typography>
          </Paper>
          <br />
          <Typography variant="h6" align="center">{listingData.listingAddress}</Typography>
          <br />
          <Typography>{`Description: ${listingData.listingDescription}`}</Typography>
          <br />
          <Grid>
            <Typography variant="h5" align="center">Accommodations</Typography>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableHead>
                  {renderIcons()}
                </TableHead>
              </TableBody>
            </Table>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default ListingInfo;
