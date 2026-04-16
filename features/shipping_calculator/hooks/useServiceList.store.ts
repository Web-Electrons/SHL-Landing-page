import { useCallback, useEffect, useState } from "react";
import { PACKAGE_SERVICES, SERVICE_DESCRIPTIONS, SERVICES_TO_REPLACE } from "../constants/services";
import { fetchMainServiceList, fetchWarehouseServiceList } from "../services/shipping.api";
import { deduplicateBy } from "../services/shipping.helpers";
import type { ServiceItem } from "../types/shipping.types";
import { useShippingStore } from "./useshipping.store";

interface ServiceListState {
  packageServices: ServiceItem[];
  otherServices: ServiceItem[];
  warehouseServices: ServiceItem[] | null;
}

export const useServiceList = () => {
  const { warehouseId, setIsLoadingService } = useShippingStore();

  const [services, setServices] = useState<ServiceListState>({
    packageServices: [],
    otherServices: [],
    warehouseServices: null,
  });

  const attachDescription = (item: ServiceItem): ServiceItem => ({
    ...item,
    description: SERVICE_DESCRIPTIONS[item.service] ?? "No description available.",
  });

  /** Load and merge main service list with warehouse-specific services */
  const loadServices = useCallback(async () => {
    if (!warehouseId) return;
    setIsLoadingService(true);

    try {
      const [mainList, warehouseList] = await Promise.all([
        fetchMainServiceList(),
        fetchWarehouseServiceList(warehouseId),
      ]);

      const filteredMain = mainList
        .filter((item) => item.status === "Active")
        .filter((item) => !SERVICES_TO_REPLACE.includes(item.service))
        .map(attachDescription);

      const warehouseWithDesc = warehouseList.map(attachDescription);

      const combined = [...filteredMain, ...warehouseWithDesc];

      const packageList = deduplicateBy(
        combined.filter((item) => PACKAGE_SERVICES.includes(item.service)),
        (item) => item.service
      );

      const otherList = deduplicateBy(
        combined.filter((item) => !PACKAGE_SERVICES.includes(item.service)),
        (item) => item.service
      );

      setServices({
        packageServices: packageList,
        otherServices: otherList,
        warehouseServices: warehouseList,
      });
    } catch (error) {
      console.error("[useServiceList] Failed to load services:", error);
    } finally {
      setIsLoadingService(false);
    }
  }, [warehouseId, setIsLoadingService]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  return { ...services, reloadServices: loadServices };
};
