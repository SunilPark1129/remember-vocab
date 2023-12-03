export type Upgrade = {
  trigger: boolean;
  isUp?: boolean;
  isLeft?: boolean;
};

export type Update = {
  hasUpgraded: Upgrade;
  hasShuffled: boolean;
  hasMovedLeft: Upgrade;
};

export type Payload = {
  title: string;
  description: string;
  id: number;
};
