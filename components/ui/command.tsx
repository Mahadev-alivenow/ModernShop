declare module "cmdk";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

function Command({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <CommandPrimitive className={`command ${className}`}>
      {children}
    </CommandPrimitive>
  );
}

export { Command };
