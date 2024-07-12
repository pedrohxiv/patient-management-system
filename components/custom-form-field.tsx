"use client";

import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Control } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

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
              case FormFieldType.CHECKBOX:
                return (
                  <div className="flex items-center gap-4">
                    <Checkbox
                      id={name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={disabled}
                    />
                    <label htmlFor={name} className="checkbox-label">
                      {label}
                    </label>
                  </div>
                );
              case FormFieldType.DATE_PICKER:
                return (
                  <div
                    className={cn(
                      "flex rounded-md border border-dark-500 bg-dark-400",
                      disabled && "cursor-not-allowed opacity-50"
                    )}
                  >
                    <Image
                      src="/assets/icons/calendar.svg"
                      height={24}
                      width={24}
                      alt="calendar"
                      className="ml-2"
                    />
                    <FormControl>
                      <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        dateFormat={dateFormat ?? "MM/dd/yyyy"}
                        showTimeSelect={showTimeSelect ?? false}
                        timeInputLabel="Time:"
                        wrapperClassName="date-picker"
                        disabled={disabled}
                      />
                    </FormControl>
                  </div>
                );
              case FormFieldType.INPUT:
                return (
                  <div
                    className={cn(
                      "flex rounded-md border border-dark-500 bg-dark-400",
                      disabled && "cursor-not-allowed opacity-50"
                    )}
                  >
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
                        disabled={disabled}
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
                      disabled={disabled}
                    />
                  </FormControl>
                );
              case FormFieldType.SELECT:
                return (
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={disabled}
                    >
                      <SelectTrigger className="shad-select-trigger">
                        <SelectValue placeholder={placeholder} />
                      </SelectTrigger>
                      <SelectContent className="shad-select-content">
                        {children}
                      </SelectContent>
                    </Select>
                  </FormControl>
                );
              case FormFieldType.SKELETON:
                return renderSkeleton && renderSkeleton(field);
              case FormFieldType.TEXTAREA:
                return (
                  <FormControl>
                    <Textarea
                      placeholder={placeholder}
                      {...field}
                      className="shad-textarea"
                      disabled={disabled}
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
