export interface ResponseBP {
  data: Datum[];
}

export interface Datum {
  id:            string;
  name:          string;
  description:   string;
  logo:          string;
  date_release:  Date;
  date_revision: Date;
}
