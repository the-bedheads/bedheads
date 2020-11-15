import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Container,
  Divider,
  Box,
} from '@material-ui/core';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Accessible, Wifi, Pets, Bathtub, People, SmokingRooms,
} from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    padding: '25px',
    // alignItems: 'center',
  },
  table: {
    minWidth: 650,
    alignItems: 'left',
  },
  imgStyle: {
    height: '100%',
    width: '100%',
    padding: '10px 10px 5px',
  },
  msg: {
    padding: 10,
    textAlign: 'center',
    marginBottom: 10,
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

interface ListingProps {
  listingId: number
}

const ListingInfo: React.FC<ListingProps> = ({ listingId }) => {
  const classes = useStyles();
  const [listingData, setListingData] = useState<any>({
    listingTitle: null,
    listingDescription: null,
    listingAddress: null,
    listingCity: null,
    listingState: null,
    ada: null,
    internet: null,
    pets: null,
    privateBath: null,
    roommates: null,
    smoking: null,
    hostId: null,
  });
  const [accommodations, setAccommodations] = useState<any>(['']);
  const [listingPhoto, setListingPhoto] = useState<string>('');

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

  const getListing = () => {
    axios.get(`/listing/user/${listingId}`)
      .then((listingInfo) => {
        console.info(listingInfo.data);
        const {
          listingTitle,
          listingDescription,
          listingAddress,
          listingCity,
          listingState,
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
          listingCity,
          listingState,
          ada,
          internet,
          pets,
          privateBath,
          roommates,
          smoking,
        });
        displayAccommodations();
        axios.get(`/listingPhotos/${listingInfo.data.userId}`)
          .then((results) => {
            setListingPhoto(results.data.url);
          });
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getListing();
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Typography variant="h4">
          <Box
            borderColor="transparent"
            m={2}
          >
            {listingData.listingTitle}
          </Box>
        </Typography>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
          xs={12}
        >
          <br />
          <Grid item xs={4}>
            <Typography
              variant="overline"
              display="block"
              component="legend"
            >
              <Box
                fontWeight="fontWeightBold"
                borderColor="transparent"
                textAlign="left"
                alignContent="center"
                m={1}
              >
                {`${listingData.listingAddress}, `}
              </Box>
              <Box
                // fontWeight="fontWeightBold"
                textAlign="left"
                alignContent="center"
                m={3}
              >
                {`${listingData.listingCity}, ${listingData.listingState}`}
              </Box>
            </Typography>
            <Typography
              variant="caption"
            >
              <Box
                textAlign="left"
              // m={3}
              >
                {listingData.listingDescription}
              </Box>
            </Typography>
            <br />
            <Typography
              variant="overline"
              display="block"
              component="legend"
            >
              <Box
                fontWeight="fontWeightBold"
                borderColor="transparent"
                textAlign="left"
                // alignContent="center"
                m={1}
              >
                Accommodations
              </Box>
            </Typography>
            <Box
              textAlign="left"
            >
              <Table className={classes.table} aria-label="simple table">
                <TableBody>
                  <TableHead>
                    <TableRow>
                      <SmokingRooms />
                      :
                      {listingData.smoking ? ' Smoking Allowed' : ' No Smoking Allowed'}
                    </TableRow>
                    <TableRow>
                      <Bathtub />
                      :
                      {listingData.privateBath ? ' Private Bathroom'
                        : ' Shared Bathroom'}
                    </TableRow>
                    <TableRow>
                      <Pets />
                      :
                      {listingData.pets ? ' Pets allowed' : ' No Pets Allowed'}
                    </TableRow>
                    <TableRow>
                      <People />
                      :
                      {listingData.roommates ? ' Roommates' : ' No Roommates'}
                    </TableRow>
                    <TableRow>
                      <Wifi />
                      :
                      {listingData.internet ? ' Wifi Access' : ' No Wifi Available'}
                    </TableRow>
                    <TableRow>
                      <Accessible />
                      :
                      {listingData.ada ? ' ADA Accessible' : ' Not ADA Accessible'}
                    </TableRow>
                  </TableHead>
                </TableBody>
              </Table>
            </Box>
          </Grid>
          <Grid
            item
            alignItems="center"
            xs={8}
            justify="center"
          >
            <img
              src={listingPhoto}
              alt="This person hasn't uploaded any pics of their place yet!"
              className={classes.imgStyle}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ListingInfo;
