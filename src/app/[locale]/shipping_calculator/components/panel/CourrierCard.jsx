/* eslint-disable @next/next/no-img-element */
import { formatCurrency, formatDecimal } from "@/lib/utils";

export const CourrierCard = ({ data, isSelected, onSelect }) => {
  const getDisplayOwner = (item) => {
    if (!item) return "";

    const provider = item.provider?.trim();
    const owner = item.objectOwner?.trim();

    const isOnlyShiplink = provider === "ShipLink +";
    const isProviderEmpty = provider === "";

    if (isOnlyShiplink && owner === "---") return "";
    if (isProviderEmpty && owner === "---") return "";
    if (isOnlyShiplink && owner === "--") return "";
    if (isProviderEmpty && owner === "--") return "";
    if (isOnlyShiplink && owner === "-") return "";
    if (isProviderEmpty && owner === "-") return "";
    if (owner === "---") return "--";
    if (owner === "--") return "—";
    if (owner === "-") return "-";

    return "-";
  };

  return (
    <div
      className={`card cursor-pointer rounded border border-gray-300 p-2 ${isSelected ? "bg-red-100" : "hover:bg-red-100"}`}
      onClick={() => onSelect(data)}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <img
            src={data?.providerImage200 || "/Shiplink.png"}
            alt={data?.provider || "Shiplink Carrier Logo"}
            className="h-8 w-8 rounded bg-blue-100 object-contain object-center p-1"
          />
          <div className="flex w-[70%] flex-col">
            <p className="text-xs">
              {data?.provider} {data?.servicelevel?.name ? ` ${getDisplayOwner(data)} ${data?.servicelevel?.name}` : ""}{" "}
              {data?.servicelevel?.name}
            </p>
            <p className="text-[10px] text-gray-500">Estimate {data.estimatedDays || "-"} Days</p>
          </div>
        </div>
        <p className="w-[30%] text-right text-xs">{`${formatCurrency(data?.currency)} ${formatDecimal(data?.amountLocal || 0)}`}</p>
      </div>
    </div>
  );
};
