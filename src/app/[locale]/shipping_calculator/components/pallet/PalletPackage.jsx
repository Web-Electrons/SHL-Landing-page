import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import React, { useState } from "react";
import { useFormState } from "react-hook-form";

const PalletPackage = ({ form, isLoading }) => {
  const [hazDisabled, setHazDisabled] = useState(false);
  const [stackDisabled, setStackDisabled] = useState(false);

  const handleStackableChange = (checked) => {
    const value = checked === true;
    form.setValue("package_attributes.stackable", value);
    setHazDisabled(value);

    if (value) {
      form.setValue("package_attributes.hazardous", false);
    }
  };

  const handleHazardousChange = (checked) => {
    const value = checked === true;
    form.setValue("package_attributes.hazardous", value);
    setStackDisabled(value);

    if (value) {
      form.setValue("package_attributes.stackable", false);
    }
  };

  const { errors } = useFormState({
    control: form.control,
  });

  const hazardousError = errors.hazardous;

  return (
    <div className="flex flex-col gap-2">
      <div className="start flex flex-col justify-start gap-2">
        <FormField
          control={form.control}
          name="package_attributes.condition_new"
          render={({ field }) => (
            <FormItem className="mt-1 flex w-full flex-col space-y-1">
              <FormLabel className="text-xs font-semibold">Condition</FormLabel>

              <div className="flex w-fit gap-4 rounded border border-slate-300 p-2">
                {/* NEW */}
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <Checkbox
                    checked={field.value === "NEW"}
                    onCheckedChange={() => {
                      if (field.value === "NEW") {
                        field.onChange(""); // unselect
                      } else {
                        field.onChange("NEW");
                      }
                    }}
                  />
                  <FormLabel className="cursor-pointer text-xs font-normal">New</FormLabel>
                </FormItem>

                {/* USED */}
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <Checkbox
                    checked={field.value === "USED"}
                    onCheckedChange={() => {
                      if (field.value === "USED") {
                        field.onChange(""); // unselect
                      } else {
                        field.onChange("USED");
                      }
                    }}
                  />
                  <FormLabel className="cursor-pointer text-xs font-normal">Used</FormLabel>
                </FormItem>
              </div>
            </FormItem>
          )}
        />

        <div className="mt-2 flex flex-row gap-4 px-2">
          <FormField
            control={form.control}
            name="package_attributes.stackable"
            render={({ field }) => (
              <FormItem className="relative flex flex-col">
                {isLoading ? (
                  <Skeleton className="h-[30px] w-full rounded-md" />
                ) : (
                  <div className="flex flex-row space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={!!field.value}
                        onCheckedChange={handleStackableChange}
                        disabled={stackDisabled}
                      />
                    </FormControl>
                    <FormLabel
                      className={`!mt-0 text-xs ${stackDisabled && "text-muted-foreground"} ${hazardousError && "text-red-400"}`}
                    >
                      Stackable Item
                    </FormLabel>
                  </div>
                )}
                <FormMessage className="mt-0 whitespace-nowrap text-[10px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="package_attributes.hazardous"
            render={({ field }) => (
              <FormItem className="mb-2 flex flex-col items-start">
                {isLoading ? (
                  <Skeleton className="h-[30px] w-full rounded-md" />
                ) : (
                  <div className="flex items-start space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={!!field.value}
                        onCheckedChange={handleHazardousChange}
                        disabled={hazDisabled}
                      />
                    </FormControl>
                    <FormLabel
                      className={`!mt-0 flex flex-row gap-2 text-xs ${hazDisabled && "text-muted-foreground"}`}
                    >
                      Hazardous Material{" "}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3 w-3 cursor-pointer text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p className="max-w-xs text-xs">
                              A substance or material may be classified as hazardous if the transportation of the
                              material in a particular amount and form poses an unreasonable risk to health and safety
                              or property. Hazardous materials are defined by the{" "}
                              <a
                                href="https://www.transportation.gov/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500"
                              >
                                U.S. Department of Transportation
                              </a>{" "}
                              in accordance with the Federal Hazardous Material Law and require special handling and
                              documentation. For more general information, go to the U.S. DOT website at{" "}
                              <a
                                href="https://www.phmsa.dot.gov/hazmat"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                              >
                                http://www.phmsa.dot.gov/hazmat
                              </a>
                              .
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                  </div>
                )}
                <FormMessage className="mt-0 whitespace-nowrap text-[10px]" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default PalletPackage;
