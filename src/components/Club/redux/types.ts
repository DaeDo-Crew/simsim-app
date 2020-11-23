export type ClubItem = {
  Is_user_subscribing_club: boolean;
  club_name: string;
  NumSubscribe: number;
  club_description: string;
  club_profile_image?: string | null;
};

export type ClubNoticeData = {
  noticeId: number;
  clubId: number;
  title: string;
  content: string;
  createdTime: string;
};
