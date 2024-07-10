import Image from "next/image";

import { Button } from "@/components/ui/button";

interface Props {
  children: React.ReactNode;
  isLoading: boolean;
  className?: string;
}

export const SubmitButton = ({ children, isLoading, className }: Props) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            height={24}
            width={24}
            alt="loader"
            className="animate-spin"
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};
