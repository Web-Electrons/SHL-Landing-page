"use client";

import React from "react";
import PalletPackage from "./PalletPackage";
import HazardousMaterial from "./HazardousMaterial";
import HazardousMaterialDetails from "./HazardousMaterialDetails";

export const PalletDetails = ({ form, open = true }) => {
  const hazardous = form.watch("package_attributes.hazardous");

  return (
    <div className="pr-2">
      <div className="h-fit">
        <div className="pb-1">
          <p className="text-sm font-bold">Pallet Details</p>
        </div>

        <div className="mt-1 grid grid-cols-2 gap-4">
          <div className="w-full">
            <PalletPackage form={form} isLoading={false} />
          </div>

          {hazardous && <HazardousMaterial form={form} />}
        </div>

        {hazardous && (
          <div className="w-full">
            <HazardousMaterialDetails form={form} />
          </div>
        )}
      </div>
    </div>
  );
};
