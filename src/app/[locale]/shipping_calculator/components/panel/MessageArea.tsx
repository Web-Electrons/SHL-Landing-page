import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle } from "lucide-react";

export const MessageArea = ({ ratesMessage = [] }) => {
  if (!ratesMessage?.length) return null;

  return (
    <div className="relative shrink-0 rounded-md border px-3">
      <Accordion type="single" collapsible>
        <AccordionItem value="messages" className="border-b-0">
          <AccordionTrigger className="py-2 hover:no-underline">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />

              <p className="text-xs font-medium">Carrier Messages ({ratesMessage.length})</p>
            </div>
          </AccordionTrigger>

          <AccordionContent className="pb-2">
            <div className="h-[200px] overflow-y-auto pr-2">
              <div className="flex flex-col gap-1">
                {ratesMessage.map((message, index) => (
                  <div key={index} className="shrink-0 rounded-md border p-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium">{message?.source || "Unknown"}</p>

                      {message?.code && <span className="text-[10px] text-muted-foreground">{message.code}</span>}
                    </div>

                    <p className="mt-1 text-[10px] leading-3 text-muted-foreground">{message?.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
