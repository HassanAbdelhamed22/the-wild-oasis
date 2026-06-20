export interface Country {
  name: string;
  flag: string;
}

export async function getCountries(): Promise<Country[]> {
  try {
    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/flag/images"
    );
    if (!res.ok) throw new Error("Could not fetch countries");
    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error(error);
    throw new Error("Countries could not be loaded");
  }
}
