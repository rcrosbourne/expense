type Periods = {
  "One-time payment": true;
  "Every Day": true;
  "Every Week": true;
  "Every 2 Weeks": true;
  "Every 4 weeks": true;
  "Every month": true;
  "Every 2 months": true;
  "Every 3 months": true;
  "Every 6 months": true;
  "Every year": true;
};
export type Periodicity = keyof Periods;
