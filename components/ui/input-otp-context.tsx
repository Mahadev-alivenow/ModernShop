import React from "react";

// Define the context type
export type OTPInputContextType = {
  slots: { char: string; hasFakeCaret: boolean }[];
};

// Create the context
export const OTPInputContext = React.createContext<OTPInputContextType | null>(null);
