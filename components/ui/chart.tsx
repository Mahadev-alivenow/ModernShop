import * as React from "react";
import { ResponsiveContainer } from "recharts";

function ChartContainer({
  children,
  className,
}: {
  children: React.ReactElement;
  className?: string;
}) {
  return (
    <div className={className}>
      <ResponsiveContainer>{children}</ResponsiveContainer>
    </div>
  );
}

export { ChartContainer };
