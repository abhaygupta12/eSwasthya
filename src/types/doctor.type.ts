export interface DoctorType {
  docID: string;
  fName: string;
  lName: string;
  Doj: Date | null;
  emailID: string;
  phone: number | null;
  city: string;
  state: string;
  department: string;
  imageHash: string;
  document: string;
  hasAccess?: boolean;
}
