export type MeetUpItem = {
  category: string;
  clubId: number;
  clubName: string;
  createdTime: string;
  deadline: string;
  endDate: string;
  explanationContent: string;
  explanationTitle: string;
  curParticipant: number;
  maxParticipant: number;
  meetingId: number;
  meetingName: string;
  meetingLoaction: string;
  startDate: string;
  imgUrlList: string[];
};

export type ClubItem = {
  Is_user_subscribing_club: boolean;
  club_name: string;
  club_description: string;
  club_profile_image?: [string];
};
