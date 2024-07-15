"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";

export const PasskeyModal = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [passkey, setPasskey] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();
  const pathname = usePathname();

  const encryptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessKey")
      : null;

  const closeModal = () => {
    setOpen(false);

    router.push("/");
  };

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      localStorage.setItem("accessKey", encryptKey(passkey));

      setOpen(false);
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);

    if (pathname) {
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setOpen(false);

        router.push("/admin");
      } else {
        setOpen(true);
      }
    }
  }, [encryptedKey]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="shad-passkey-dialog">
        <DialogHeader>
          <DialogTitle className="flex items-start justify-between">
            Admin Access Verification
            <Image
              src="/assets/icons/close.svg"
              height={16}
              width={16}
              alt="close"
              className="cursor-pointer"
              onClick={closeModal}
            />
          </DialogTitle>
          <DialogDescription>
            To access the admin page, please enter the passkey.
          </DialogDescription>
        </DialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPasskey(value)}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <p className="shad-error text-14-regular mt-4 flex justify-center">
              {error}
            </p>
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={(e) => validatePasskey(e)}
            className="shad-primary-btn w-full"
          >
            Enter Admin Passkey
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
