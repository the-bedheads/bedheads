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

  interface RegisterNewUser {
    firstName: string,
    lastName: string,
    pronouns: string,
    email: string,
    password: string,
    q1: string,
    q2: string,
    q3: string,
    q4: string,
    q5: string,
    q6: string,
    q7: string,
    q8: string,
    q9: string,
    q10: string,
    onSubmitForm: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  }

  interface ConfirmSignupProps { // Multi-Step Registration Survey
    firstName: string,
    lastName: string,
    pronouns: string,
    email: string,
    password: string,
    q1: string,
    q2: string,
    q3: string,
    q4: string,
    q5: string,
    q6: string,
    q7: string,
    q8: string,
    q9: string,
    q10: string,
    nextStep: () => void,
    prevStep: () => void,
  }

}

module.exports = {
  UserType,
  UserProps,
  Availability,
  ProfileProps,
  AppType,
  AppInterface,
  RegisterNewUser,
  ConfirmSignupProps,
};
