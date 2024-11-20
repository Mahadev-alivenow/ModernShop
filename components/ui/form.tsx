import * as React from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";

function Form({ children }: { children: React.ReactNode }) {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
}

export { Form, Controller };
