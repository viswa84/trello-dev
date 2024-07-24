import { ModalProvider } from "@/components/providers/model-provider";
import { QueryProvider } from "@/components/providers/query-providers";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
const PlatFormLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster />
        <ModalProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
};

export default PlatFormLayout;
