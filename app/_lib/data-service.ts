import { eachDayOfInterval } from "date-fns";
import { supabase } from "./supabase";
import { Booking, Cabin, Country, Guest, Settings } from "./types";
import { notFound } from "next/navigation";
/////////////
// GET

export async function getCabin(id: number | string): Promise<Cabin> {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    notFound();
  }

  return data;
}

export async function getCabinPrice(
  id: number | string,
): Promise<Pick<Cabin, "regularPrice" | "discount"> | null> {
  const { data, error } = await supabase
    .from("cabins")
    .select("regularPrice, discount")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export const getCabins = async function (): Promise<
  Pick<
    Cabin,
    "id" | "name" | "maxCapacity" | "regularPrice" | "discount" | "image"
  >[]
> {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data || [];
};

// Guests are uniquely identified by their email address
export async function getGuest(email: string): Promise<Guest | null> {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  return data;
}

export async function getBooking(id: number | string): Promise<Booking | null> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not get loaded");
  }

  return data;
}

export async function getBookings(
  guestId: number | string,
): Promise<Booking[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)",
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return (data as unknown as Booking[]) || [];
}

export async function getBookedDatesByCabinId(
  cabinId: number | string,
): Promise<Date[]> {
  const todayDate = new Date();
  todayDate.setUTCHours(0, 0, 0, 0);
  const today = todayDate.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = (data || [])
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings(): Promise<Settings | null> {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

export async function getCountries(): Promise<Country[]> {
  try {
    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/flag/images",
    );
    if (!res.ok) throw new Error("Could not fetch countries");
    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error(error);
    throw new Error("Could not fetch countries");
  }
}

/////////////
// CREATE

export async function createGuest(
  newGuest: Omit<Guest, "id" | "created_at">,
): Promise<any> {
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

// export async function createBooking(
//   newBooking: Omit<Booking, "id" | "created_at">,
// ): Promise<Booking | null> {
//   const { data, error } = await supabase
//     .from("bookings")
//     .insert([newBooking])
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be created");
//   }

//   return data;
// }

/////////////
// UPDATE

// export async function updateGuest(
//   id: number | string,
//   updatedFields: Partial<Omit<Guest, "id" | "created_at">>,
// ): Promise<Guest | null> {
//   const { data, error } = await supabase
//     .from("guests")
//     .update(updatedFields)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Guest could not be updated");
//   }
//   return data;
// }

// export async function updateBooking(
//   id: number | string,
//   updatedFields: Partial<Omit<Booking, "id" | "created_at">>,
// ): Promise<Booking | null> {
//   const { data, error } = await supabase
//     .from("bookings")
//     .update(updatedFields)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be updated");
//   }
//   return data;
// }

// /////////////
// // DELETE

// export async function deleteBooking(id: number | string): Promise<any> {
//   const { data, error } = await supabase.from("bookings").delete().eq("id", id);

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be deleted");
//   }
//   return data;
// }
