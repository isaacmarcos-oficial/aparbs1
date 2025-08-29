const locadora = {
  name: "APARBS Transportes LTDA" as string,
  address: "Avenida Gabriel Mendes Santos, 330, Paciência, Porteirinha/MG" as string,
  cnpj: "51.494.204/0001-67" as string,
  representative: "Aldiney Vieira Silva" as string
}

const locatario = {
  name: "Pedro Paulo Moreira Santos" as string,
  address: "Rua Manoel Barreto Lima, Residencial Geraldo Cruz, Riacho dos Machados/MG" as string,
  cpfOrCnpj: "074.798.416-63" as string,
  phone: "(38) 99987-9397" as string,
}

const vehicle = {
  voyage: {
    model: "Volkswagem Voyage 1.6" as string,
    year: "2016/2017" as string,
    plate: "GDZ-7I85" as string,
    color: "CINZA" as string,
    chassis: "9BWDB45U5HT033347" as string,
  },
};

const contract = {
  startDate: "28/04/2025" as string,
  startHour: "08:00" as string,
  endDate: "03/05/2025" as string,
  endHour: "08:00" as string,
  dailyValue: 100 as number
}

function calculateDays(startDate: string, startHour: string, endDate: string, endHour: string): number {
  const [startDay, startMonth, startYear] = startDate.split("/").map(Number);
  const [startHourValue, startMinute] = startHour.split(":" ).map(Number);
  const [endDay, endMonth, endYear] = endDate.split("/").map(Number);
  const [endHourValue, endMinute] = endHour.split(":" ).map(Number);

  const start = new Date(startYear, startMonth , startDay, startHourValue, startMinute);
  const end = new Date(endYear, endMonth , endDay, endHourValue, endMinute);

  const diffTime = end.getTime() - start.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export default function ContractContent() {
  const selectedVehicle = vehicle.voyage;
  const totalDays = calculateDays(contract.startDate, contract.startHour, contract.endDate, contract.endHour);

  const currencyPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className="max-w-4xl mx-auto p-8 text-justify text-gray-800 leading-7">
      <h1 className="text-2xl font-bold mb-6 text-center text-[#d90000]">
        CONTRATO DE LOCAÇÃO DE VEÍCULO SEM CONDUTOR
      </h1>

      <section className="flex flex-col gap-2 mb-6">
        <h2 className="text-xl font-semibold mb-2 uppercase">Identificação das Partes Contratantes:</h2>

        <p><strong>LOCADORA: {locadora.name}</strong>, com sede em <strong>{locadora.address}</strong>, inscrita no CNPJ sob o nº <strong>{locadora.cnpj}</strong>, neste ato representada por <strong>{locadora.representative}</strong>, doravante denominada <strong>LOCADORA</strong></p>

        <p className=""><strong>LOCATÁRIO: {locatario.name},</strong>, residente e domiciliado em <strong>{locatario.address}</strong>, portador do CPF nº <strong>{locatario.cpfOrCnpj}</strong>, telefone <strong>{locatario.phone}</strong>, doravante denominado <strong>LOCATÁRIO</strong>.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 uppercase">Objeto do Contrato:</h2>
        <p>A <strong>LOCADORA</strong> aluga ao <strong>LOCATÁRIO</strong> o veículo de sua propriedade, conforme descrito abaixo, sem a prestação de serviços de condutor:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Marca/Modelo: <strong>{selectedVehicle.model}</strong></li>
          <li>Ano: <strong>{selectedVehicle.year}</strong></li>
          <li>Placa: <strong>{selectedVehicle.plate}</strong></li>
          <li>Cor: <strong>{selectedVehicle.color}</strong></li>
          <li>Chassi: <strong>{selectedVehicle.chassis}</strong></li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-[#d90000]">1. Prazo de Locação</h2>
        <p>1.1. O presente contrato terá início em {contract.startDate} as {contract.startHour} e término em {contract.endDate} as {contract.endHour}, podendo ser prorrogado mediante acordo entre as partes.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-[#d90000]">2. Valor e Forma de Pagamento</h2>
        <p>2.1. O valor da locação será de {currencyPrice.format(contract.dailyValue)} por dia, totalizando {currencyPrice.format(totalDays * contract.dailyValue)} para o período {totalDays} acordado..</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Responsabilidades do Locatário</h2>
        <ul className="list-disc list-inside ml-4">
          <li>Bom uso e conservação do veículo.</li>
          <li>Devolução nas mesmas condições (salvo desgaste natural).</li>
          <li>Proibição de modificações sem autorização.</li>
          <li>Responsabilidade por combustível, pedágios, multas e custos decorrentes do uso.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Manutenção e Reparos</h2>
        <p>Veículo entregue em perfeitas condições, com manutenção preventiva. Defeitos deverão ser comunicados imediatamente à locadora.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Seguro</h2>
        <p>Seguro com cobertura básica. Franquia a ser paga pelo locatário em caso de sinistro.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Rescisão Contratual</h2>
        <ul className="list-disc list-inside ml-4">
          <li>Rescisão mediante notificação de 1 dia.</li>
          <li>Descumprimento das cláusulas autoriza rescisão imediata e reparos de danos.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Foro</h2>
        <p>Comarca de Porteirinha/MG.</p>
      </section>

      <section className="mt-10">
        <p className="mb-6 text-center">Porteirinha/MG, 28/04/2025</p>

        <div className="flex flex-col gap-8">
          <div className="border-t border-gray-400 pt-2">
            <p className="text-center">LOCADORA</p>
          </div>
          <div className="border-t border-gray-400 pt-2">
            <p className="text-center">LOCATÁRIO</p>
          </div>
        </div>

        <div className="mt-10">
          <p className="font-semibold mb-2">Testemunhas:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Nome: _______________________________________ CPF: ___________________________</li>
            <li>Nome: _______________________________________ CPF: ___________________________</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
