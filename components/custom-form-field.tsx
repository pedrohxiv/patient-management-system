"use client";

import Image from "next/image";
import { Control } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export enum FormFieldType {
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  INPUT = "input",
  PHONE_INPUT = "phoneinput",
  SELECT = "select",
  SKELETON = "skeleton",
  TEXTAREA = "textarea",
}

interface Props {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  children?: React.ReactNode;
  dateFormat?: string;
  disabled?: boolean;
  iconAlt?: string;
  iconSrc?: string;
  label?: string;
  placeholder?: string;
  renderSkeleton?: (field: any) => React.ReactNode;
  showTimeSelect?: boolean;
}

export const CustomFormField = ({
  control,
  fieldType,
  name,
  children,
  dateFormat,
  disabled,
  iconAlt,
  iconSrc,
  label,
  placeholder,
  renderSkeleton,
  showTimeSelect,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          {(() => {
            switch (fieldType) {
              case FormFieldType.INPUT:
                return (
                  <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {iconSrc && (
                      <Image
                        src={iconSrc}
                        height={24}
                        width={24}
                        alt={iconAlt || "icon"}
                        className="ml-2"
                      />
                    )}
                    <FormControl>
                      <Input
                        placeholder={placeholder}
                        {...field}
                        className="shad-input border-0"
                      />
                    </FormControl>
                  </div>
                );
              case FormFieldType.PHONE_INPUT:
                return (
                  <FormControl>
                    <PhoneInput
                      international
                      withCountryCallingCode
                      value={field.value}
                      onChange={field.onChange}
                      className="input-phone"
                    />
                  </FormControl>
                );
            }
          })()}
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};
