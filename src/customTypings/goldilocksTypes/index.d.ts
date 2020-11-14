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

  type PersonalityType = {
    openness: number,
    conscientiousness: number,
    extraversion: number,
    agreeableness: number,
    neuroticism: number,
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
    location: LocationProps,
    user: AppType,
  }

  interface MessageProps {
    location?: LocationProps,
    user: AppType,
  }

  interface LocationProps {
    state: StateProps
  }

  interface StateProps {
    hostData: UserType,
    userId: string,
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
    openness: localStorage,
    conscientiousness: localStorage,
    extraversion: localStorage,
    agreeableness: localStorage,
    neuroticism: localStorage,
  };

  interface AppInterface {
    user: AppType,
  }

  interface CalendarInterface {
    user: AppType,
    listingId: number,
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
    profilePhotoUrl: string,
    setProfilePhotoUrl: React.Dispatch<React.SetStateAction<string>>,
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

  interface TestProps {
    firstName: string,
    lastName: string,
    pronouns: string,
    dob: string,
    email: string,
    password: string,
    profilePhotoUrl: string,
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
    onSubmitForm: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  }

  interface MyProps {
    firstName: string,
    lastName: string,
    pronouns: string,
    dob: string,
    email: string,
    password: string,
    nextStep: () => void,
    handleChange: (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
      type: string
    ) => void,
  }

  type HostDataType = {
    firstName: string,
    lastName: string,
    pronouns: string,
    hostRating: number,
    id: number,
    profilePhoto: string,
    userBio: string,
  };

  interface ProfileSidebarInterface {
    host: HostDataType,
    userId: string,
  }

  interface RadarChartInterface {
    hostData: PersonalityType,
    hostName: string,
  }

  interface HostInfoInterface {
    hostId: string,
    userId: string,
    avbId: number,
  }

  interface ProfileInfoInterface {
    host: HostDataType
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
  CalendarInterface,
  TestProps,
  MyProps,
  MessageProps,
  HostDataType,
  ProfileSidebarInterface,
  HostInfoInterface,
  ProfileInfoInterface,
};
