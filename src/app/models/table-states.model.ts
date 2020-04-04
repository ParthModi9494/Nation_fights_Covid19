export interface StateModel {
  active: string;
  confirmed: string;
  deaths: string;
  delta: { active: number, confirmed: number, deaths: number, recovered: number };
  deltaconfirmed: string;
  deltadeaths: string;
  deltarecovered: string;
  lastupdatedtime: string;
  recovered: string;
  state: string;
  statecode: string;
  isSelected?: boolean;
}

export interface DistrictResponseModel {
  state: string;
  districtData: {
    district: string,
    confirmed: number,
    lastupdatedtime: string,
    delta: { confirmed: number }
  }[];
}
