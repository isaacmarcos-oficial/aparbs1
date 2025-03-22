import { Ri24HoursLine } from "react-icons/ri";
import { IoRocketSharp } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { Card, CardTitle } from "@/components/ui/card";

export default function Destaque() {
  return (
    <Card className="grid grid-cols-4 text-white w-full my-4 py-10 lg:mx-0 bg-[#d90000] rounded-xl max-w-screen-xl">
      <div className="flex items-center justify-center flex-col gap-2 text-center font-black">
        <Ri24HoursLine className="lg:w-10 lg:h-10 w-6 h-6" />
        <CardTitle className="text-xs lg:text-base">
          Auto Socorro <br /> 24horas
        </CardTitle>
      </div>
      <div className="flex items-center justify-center flex-col gap-2">
        <IoRocketSharp className="lg:w-10 lg:h-10 w-6 h-6" />
        <CardTitle className="text-xs lg:text-base">
          Serviço rápido
        </CardTitle>
      </div>
      <div className="flex items-center justify-center flex-col gap-2">
        <MdOutlineSecurity className="lg:w-10 lg:h-10 w-6 h-6" />
        <CardTitle className="text-xs lg:text-base">
          Serviço seguro
        </CardTitle>
      </div>
      <div className="flex items-center justify-center flex-col gap-2">
        <FaTools className="lg:w-10 lg:h-10 w-6 h-6" />
        <CardTitle className="text-xs lg:text-base">
          Profissionais <br /> especializados
        </CardTitle>
      </div>
    </Card>
  );
}