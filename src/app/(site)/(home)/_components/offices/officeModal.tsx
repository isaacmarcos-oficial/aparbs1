import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode } from "react";
import { FaCheck } from "react-icons/fa";

interface ServicesProps {
  title: string;
  description?: string;
  serviceIcon: ReactNode;
  checklist?: string[];
  children?: [];
}

export default function OfficeModal({ title, serviceIcon, description, checklist }: ServicesProps) {

  return (
    <Dialog>
      <DialogTrigger
        className="gap-3 flex cursor-pointer"
        asChild role="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="dialog-element"
      >
        <div className="">
          <div className="flex items-center justify-center text-[#d90000] hover:text-white hover:bg-[#d90000] w-20 h-20 border-2 border-[#d90000] rounded transition-all text-3xl">
            {serviceIcon}
          </div>
          <div className="flex-1 flex-col">
            <h3 className="text-[#d90000] text-lg font-bold">
              {title}
            </h3>
            <p className="text-zinc-600 text-sm">
              {description}
            </p>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent id="dialog-element" color="gray.800" className="max-w-xl" >
        <DialogTitle className="text-[#d90000] font-bold">
          {title}
        </DialogTitle>
        <div>
          {checklist && (
            <div className="flex-col gap-2">
              {checklist.map((item, index) => (
                <div className="flex leading-8 text-center items-center gap-2" key={index}>
                  <FaCheck className="text-[#d90000]" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
}