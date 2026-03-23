export interface CollageFormModel {
  username: string;
  collageSize: number;
  tileSize: number;
}

export interface CollageFormLimitsModel {
  collageSize: {
    min: number;
    max: number;
  };
  tileSize: {
    min: number;
    max: number;
  };
}

