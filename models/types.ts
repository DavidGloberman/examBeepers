export enum Status {
  MANUFACTURED = "manufactured",
  ASSEMBLED = "assembled",
  SHIPPED = "shipped",
  DEPLOYED = "deployed",
  DETONATED = "detonated",
}

export interface Beeper {
  id: string;
  name: string;
  status: Status;
  created_at: Date;
  detonated_at: Date;
  latitude: Number;
  longitude: Number;
}
