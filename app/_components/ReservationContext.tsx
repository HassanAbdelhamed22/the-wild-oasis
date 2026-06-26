"use client";

import { createContext, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

interface ReservationContextType {
  range: DateRange | undefined;
  setRange: (range: DateRange | undefined) => void;
  resetRange: () => void;
}

const initialState = {
  from: undefined,
  to: undefined,
};

const ReservationContext = createContext<ReservationContextType>({
  range: initialState,
  setRange: () => {},
  resetRange: () => {},
});

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState<DateRange | undefined>(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error("useReservation must be used within ReservationProvider");
  }
  return context;
}

export { ReservationProvider, useReservation };