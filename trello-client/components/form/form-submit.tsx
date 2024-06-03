"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "ghost"
    | "link"
    | "primary";
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant="default",
}: FormSubmitProps) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending || disabled} type="submit" variant={variant} className={cn(className )}>
      {children}
    </Button>
  );
};
