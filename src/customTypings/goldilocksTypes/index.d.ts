declare module 'goldilocksTypes' {
  type UserType = {
    dob: string,
    email: string,
    firstName: string,
    guestRating: number,
    hostRating: number,
    id: number,
    inviteCount: number,
    lastName: string,
    password: string,
    profilePhoto: string,
    pronouns: string,
    swapCount: number,
    userBio: string,
  };

  interface UserProps {
    user: UserType,
  }

  type Availability = {
    start: string,
    end: string,
    title: string,
    backgroundColor: string,
    id: number,
    listingId: number,
    type: string,
    guestId: number,
    availability_id: number,
    requester_ids: Array<number>,
  };

  interface ProfileProps {
    location: LocationProps
  }

  interface LocationProps {
    state: StateProps
  }

  interface StateProps {
    hostData: UserType
  }

  interface AppProps {
    localStorage: number | string | null,
  }

  type AppType = {
    email: localStorage,
    firstName: localStorage,
    guestRating: localStorage,
    hostRating: localStorage,
    id: localStorage,
    inviteCount: localStorage,
    profilePhoto: localStorage,
    pronouns: localStorage,
    swapCount: localStorage,
    userBio: localStorage,
  };

  interface AppInterface {
    user: AppType,
  }
  type RegisterNewUser = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    verification_code: number;
  };
}

module.exports = {
  UserType,
  UserProps,
  Availability,
  ProfileProps,
  AppType,
  AppInterface,
  RegisterNewUser,
};
