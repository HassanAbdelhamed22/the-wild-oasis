const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

async function seed() {
  console.log("Loading environment variables from .env.local...");
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, "utf-8");
    for (const line of envConfig.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const firstEquals = trimmed.indexOf("=");
      if (firstEquals !== -1) {
        const key = trimmed.slice(0, firstEquals).trim();
        const val = trimmed
          .slice(firstEquals + 1)
          .trim()
          .replace(/^["']|["']$/g, "");
        if (key) process.env[key] = val;
      }
    }
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Error: Missing SUPABASE_URL or SUPABASE_KEY in .env.local");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log("Fetching existing cabins and guests...");

  // 1. Fetch Cabins
  let { data: cabins, error: cabinsError } = await supabase
    .from("cabins")
    .select("*");
  if (cabinsError) {
    console.error("Error fetching cabins:", cabinsError);
    process.exit(1);
  }

  if (!cabins || cabins.length === 0) {
    console.log("No cabins found. Seeding sample cabins first...");
    const sampleCabins = [
      {
        name: "001",
        maxCapacity: 2,
        regularPrice: 250,
        discount: 0,
        description: "A small cozy cabin perfect for couples.",
        image: "https://ecfiximzgiftytgqlnah.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg",
      },
      {
        name: "002",
        maxCapacity: 4,
        regularPrice: 400,
        discount: 50,
        description: "Spacious cabin with private deck.",
        image: "https://ecfiximzgiftytgqlnah.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg",
      },
      {
        name: "003",
        maxCapacity: 6,
        regularPrice: 600,
        discount: 100,
        description: "Luxury cabin with sauna.",
        image: "https://ecfiximzgiftytgqlnah.supabase.co/storage/v1/object/public/cabin-images/cabin-003.jpg",
      },
    ];
    const { data: insertedCabins, error: insertCabinsError } = await supabase
      .from("cabins")
      .insert(sampleCabins)
      .select();
    if (insertCabinsError) {
      console.error("Error seeding cabins:", insertCabinsError);
      process.exit(1);
    }
    cabins = insertedCabins;
    console.log(`Seeded ${cabins.length} cabins.`);
  } else {
    console.log(`Found ${cabins.length} cabins.`);
  }

  // 2. Fetch Guests
  let { data: guests, error: guestsError } = await supabase
    .from("guests")
    .select("*");
  if (guestsError) {
    console.error("Error fetching guests:", guestsError);
    process.exit(1);
  }

  if (!guests || guests.length === 0) {
    console.log("No guests found. Seeding a sample guest...");
    const sampleGuest = {
      fullName: "John Doe",
      email: "john.doe@example.com",
      nationality: "United States",
      nationalID: "1234567890",
      countryFlag: "https://flagcdn.com/us.svg",
    };
    const { data: insertedGuests, error: insertGuestsError } = await supabase
      .from("guests")
      .insert([sampleGuest])
      .select();
    if (insertGuestsError) {
      console.error("Error seeding guest:", insertGuestsError);
      process.exit(1);
    }
    guests = insertedGuests;
    console.log(`Seeded guest: ${guests[0].fullName} (${guests[0].email})`);
  } else {
    console.log(`Found ${guests.length} guests.`);
  }

  // 3. Generate relative bookings
  console.log("Generating relative date bookings for each guest...");

  const today = new Date();
  const formatDate = (date) => date.toISOString().split("T")[0];
  const getRelativeDate = (daysOffset) => {
    const d = new Date(today);
    d.setDate(d.getDate() + daysOffset);
    return d;
  };

  const sampleBookings = [];

  for (const guest of guests) {
    // Pick cabins
    const cabin1 = cabins[0];
    const cabin2 = cabins[1] || cabins[0];
    const cabin3 = cabins[2] || cabins[0];

    // Booking 1: Past Booking (ended 5 days ago, started 12 days ago)
    const start1 = getRelativeDate(-12);
    const end1 = getRelativeDate(-5);
    const nights1 = 7;
    const price1 = (cabin1.regularPrice - cabin1.discount) * nights1;
    const extras1 = 15 * nights1;
    sampleBookings.push({
      created_at: getRelativeDate(-20).toISOString(),
      startDate: formatDate(start1),
      endDate: formatDate(end1),
      numNights: nights1,
      numGuests: 2,
      cabinPrice: price1,
      extrasPrice: extras1,
      totalPrice: price1 + extras1,
      status: "checked-out",
      hasBreakfast: true,
      isPaid: true,
      observations: "Guest requested late check-out.",
      cabinId: cabin1.id,
      guestId: guest.id,
    });

    // Booking 2: Active/Current Booking (started 2 days ago, ends in 3 days)
    const start2 = getRelativeDate(-2);
    const end2 = getRelativeDate(3);
    const nights2 = 5;
    const price2 = (cabin2.regularPrice - cabin2.discount) * nights2;
    const extras2 = 0;
    sampleBookings.push({
      created_at: getRelativeDate(-10).toISOString(),
      startDate: formatDate(start2),
      endDate: formatDate(end2),
      numNights: nights2,
      numGuests: 1,
      cabinPrice: price2,
      extrasPrice: extras2,
      totalPrice: price2 + extras2,
      status: "checked-in",
      hasBreakfast: false,
      isPaid: true,
      observations: "",
      cabinId: cabin2.id,
      guestId: guest.id,
    });

    // Booking 3: Upcoming/Future Booking (starts in 10 days, ends in 14 days)
    const start3 = getRelativeDate(10);
    const end3 = getRelativeDate(14);
    const nights3 = 4;
    const price3 = (cabin3.regularPrice - cabin3.discount) * nights3;
    const extras3 = 15 * nights3;
    sampleBookings.push({
      created_at: today.toISOString(),
      startDate: formatDate(start3),
      endDate: formatDate(end3),
      numNights: nights3,
      numGuests: 3,
      cabinPrice: price3,
      extrasPrice: extras3,
      totalPrice: price3 + extras3,
      status: "unconfirmed",
      hasBreakfast: true,
      isPaid: false,
      observations: "Need a baby cot.",
      cabinId: cabin3.id,
      guestId: guest.id,
    });
  }

  console.log(`Inserting ${sampleBookings.length} bookings into Supabase...`);

  const { data: insertedBookings, error: insertBookingsError } = await supabase
    .from("bookings")
    .insert(sampleBookings)
    .select();

  if (insertBookingsError) {
    console.error("Error inserting bookings:", insertBookingsError);
    process.exit(1);
  }

  console.log(`Successfully seeded ${insertedBookings.length} bookings!`);
  console.log("\nSample bookings created:");
  insertedBookings.forEach((b, idx) => {
    console.log(
      `  [Booking ${idx + 1}] Guest ID: ${b.guestId}, Cabin ID: ${b.cabinId}, ${b.startDate} to ${b.endDate} (${b.status})`
    );
  });
}

seed().catch((err) => {
  console.error("Unexpected error seeding database:", err);
});
