require('dotenv').config();

const {
  User,
  Survey,
  Request,
  ListingPhotos,
  Listing,
  Invite,
  Availability
} = require('../db/index');

const seed = () => {
  User.bulkCreate([
    {
      firstName: 'Kyle',
      lastName: 'Hellstrom',
      pronouns: 'he/him',
      dob: new Date(1992, 3, 11),
      email: 'khellstorm@gmail.com',
      password: '1234',
      profilePhoto: '',
      swapCount: 4,
      guestRating: 3.75,
      hostRating: 1.75,
      inviteCount: 2
    },
    {
      firstName: 'Katherine',
      lastName: 'Hughes',
      pronouns: 'she/her',
      dob: new Date(1991, 12, 17),
      email: 'khughes@gmail.com',
      password: '12345678',
      profilePhoto: '',
      swapCount: 20,
      guestRating: 4.95,
      hostRating: 4.9,
      inviteCount: 18
    },
    {
      firstName: 'Patty',
      lastName: 'Lopez',
      pronouns: 'she/her',
      dob: new Date(1992, 5, 29),
      email: 'pattyklopez@gmail.com',
      password: 'abc123',
      profilePhoto: '',
      swapCount: 2,
      guestRating: 5,
      hostRating: 4.5,
      inviteCount: 1
    },
    {
      firstName: 'Shamit',
      lastName: 'Dua',
      pronouns: 'they/them',
      dob: new Date(1993, 4, 21),
      email: 'sdua@gmail.com',
      password: 'pw123',
      profilePhoto: '',
      swapCount: 3,
      guestRating: 4.67,
      hostRating: 4.67,
      inviteCount: 2
    },
    {
      firstName: 'Uday',
      lastName: 'Nandipati',
      pronouns: 'he/him',
      dob: new Date(1992, 10, 25),
      email: 'udaynan@gmail.com',
      password: 'pw1234',
      profilePhoto: '',
      swapCount: 0,
      guestRating: 0,
      hostRating: 0,
      inviteCount: 0
    }
  ])
  .then(results => {
    // console.log("USERS:", results);
    if (results.length) {
      // console.log('Users added to DB:', results);
      console.log(`✅🎃✅ ${results.length} users successfully added to DB`);
    } else {
      console.log('❌☠️❌ USERS not added');
    }
  })
  .then(() => {
    Listing.bulkCreate([
      {
        user_id: 1,
        listingAddress: '4411 Iberville St, New Orleans, LA 70119',
        listingTitle: 'Musty basement in a great neighborhood',
        listingDescription: 'Enjoy all that Mid City has to offer. Just blocks from City Park and everyone’s favorite ice cream spot, Angelo Brocato’s, staying here will make you the envy of all New Orleanians. Just know that you’ll be in a musty, funky basement.',
        pets: false,
        ada: true,
        smoking: false,
        roommates: false,
        internet: true,
        privateBath: true
      },
      {
        user_id: 2,
        listingAddress: '2037 S Chippewa St, New Orleans, LA 70130',
        listingTitle: 'An awesome bedroom in a great NOLA neighborhood',
        listingDescription: 'This place is super close to New Orleans’ wonderful Lower Garden District neighborhood. A quick waltz down Jackson will bring you to the famous St. Charles Streetcar line, where you can enjoy a ride through the most beautiful parts of the city. Great restaurants aplenty near this location!',
        pets: false,
        ada: false,
        smoking: false,
        roommates: true,
        internet: true,
        privateBath: false
      },
      {
        user_id: 3,
        listingAddress: '2033 S Chippewa St, New Orleans, LA 70130',
        listingTitle: 'A Lower Garden District Beauty',
        listingDescription: 'Enjoy a huge place in the heart of the Lower Garden District. Super close to several great restaurants and the famous St. Charles Streetcar line. Also just a quick skip from Mardi Gras World and many things that are happening downtown!',
        pets: true,
        ada: false,
        smoking: true,
        roommates: false,
        internet: true,
        privateBath: true
      },
      {
        user_id: 4,
        listingAddress: '2515 Folsom St., San Francisco, CA 94110',
        listingTitle: 'A great place in the hopping Mission District',
        listingDescription: 'Right next door to a great restaurant and wonderful bakery. Take in all that the Mission District has to offer in this luxurious San Francisco spot.',
        pets: false,
        ada: true,
        smoking: false,
        roommates: false,
        internet: false,
        privateBath: true
      },
      {
        user_id: 5,
        listingAddress: '2230 3rd St, San Francisco, CA 94107',
        listingTitle: 'More than a patch of grass in Dogpatch',
        listingDescription: 'Right around the corner from Esprit Park, where dogs are being walked at all hours. Several good restaurants can be found within walking distance, and you’ll be staying just a block away from the trolley line. I have a great desk that would be great for anyone that is travelling for work.',
        pets: true,
        ada: true,
        smoking: false,
        roommates: true,
        internet: true,
        privateBath: false
      }
    ])
    .then(results => {
      if (results.length) {
        // console.log('Listings added to DB:', results);
        console.log(`✅🎃✅ ${results.length} listings successfully added to DB`);
      } else {
        console.log('❌☠️❌ LISTINGS NOT ADDED');
      }
    });
  })
  .catch(err => console.error('Database falied to give results. Error:', err));
}

seed();
