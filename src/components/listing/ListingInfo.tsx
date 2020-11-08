import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  Accessible, Wifi, Pets, Bathtub, People, SmokingRooms,
} from '@material-ui/icons';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ListingInfo = (props: any) => {
  const classes = useStyles();
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
                  <TableRow>
                    <TableCell>
                      <Accessible fontSize="large" />
                      ADA Accessible:
                      {' '}
                      {listingData.ada}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Wifi fontSize="large" />
                      Wifi:
                      {' '}
                      {listingData.internet}
                    </TableCell>

                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Pets fontSize="large" />
                      Pets:
                      {' '}
                      {listingData.pets}
                    </TableCell>
                  </TableRow>
                  <TableRow>

                    <TableCell>
                      <Bathtub fontSize="large" />
                      Private Bath:
                      {' '}
                      {listingData.privateBath}
                    </TableCell>
                  </TableRow>
                  <TableRow>

                    <TableCell>
                      <People fontSize="large" />
                      Roommates:
                      {' '}
                      {listingData.roommates}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <SmokingRooms fontSize="large" />
                      Smoking:
                      {' '}
                      {listingData.smoking}
                    </TableCell>
                  </TableRow>
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
