export enum Status {
  MANUFACTURED,
  ASSEMBLED,
  SHIPPED,
  DEPLOYED,
  DETONATED,
}

export interface Beeper {
  id: string;
  name: string;
  status: Status;
  created_at: Date;
  detonated_at?: Date;
  latitude?: Number;
  longitude?: Number;
}

export interface BeeperDTO extends Omit<Beeper, "status"> {
  status: string;
}
