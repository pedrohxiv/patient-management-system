"use client";

import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { cn, convertFileToUrl } from "@/lib/utils";

interface Props {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
  disabled?: boolean;
}

export const FileUploader = ({ files, onChange, disabled }: Props) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "file-upload cursor-pointer",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      {!disabled && <input {...getInputProps()} />}
      {files && files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          height={1000}
          width={1000}
          alt="upload image"
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            height={40}
            width={40}
            alt="upload"
          />
          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-green-500">Click to upload</span> or drag
              and drop
            </p>
            <p>SVG, PNG, JPG or GIF (max 800x400)</p>
          </div>
        </>
      )}
    </div>
  );
};
