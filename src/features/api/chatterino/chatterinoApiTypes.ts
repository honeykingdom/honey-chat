export type ChatterinoRawBadge = {
  tooltip: string;
  image1: string;
  image2: string;
  image3: string;
  users: string[];
};

export type ChatterinoBadge = Omit<ChatterinoRawBadge, 'users'>;

export type ChatterinoBadgesResponse = {
  badges: ChatterinoRawBadge[];
};
