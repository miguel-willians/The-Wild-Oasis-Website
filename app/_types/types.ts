export type Cabin = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description: string;
};

export type Settings = {
  id: number;
  created_at: Date;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
};

export type BookedDates = Date[];

export type User = {
  name: string;
  email: string;
  image: string;
};

export type SessionUser = User & { guestId: string };

declare module "next-auth" {
  interface Session {
    user: SessionUser;
  }
}

export type Guest = {
  id: number;
  created_at: Date;
  fullName: string;
  email: string;
  nationalID: string | null;
  nationality: string | null;
  countryFlag: string | null;
};

export type Country = {
  name: string;
  flag: string;
  independent: boolean;
};

export type NewGuest = {
  email: string;
  fullName: string;
};

export type Booking = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  guestId: number;
  cabinId: number;
  cabins: {
    name: string;
    image: string;
  };
};

export type RawBooking = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  guestId: number;
  cabinId: number;
  cabins: {
    name: string;
    image: string;
  }[];
};
