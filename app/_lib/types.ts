export interface Cabin {
  id: number;
  created_at: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}

export interface Guest {
  id: number;
  created_at: string;
  fullName: string;
  email: string;
  nationalID?: string;
  nationality?: string;
  countryFlag?: string;
}

export interface Booking {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice?: number;
  extrasPrice?: number;
  totalPrice: number;
  status?: string;
  hasBreakfast?: boolean;
  isPaid?: boolean;
  observations?: string;
  cabinId: number;
  guestId: number;
  cabins?: Pick<Cabin, 'name' | 'image'>;
}

export interface Settings {
  id: number;
  created_at: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

export interface Country {
  name: string;
  flag: string;
}
