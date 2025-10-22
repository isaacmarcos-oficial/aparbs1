import * as Icons from 'lucide-react';
import ServiceCard from './_components/ServiceCard';
import { DatoResponse, Service } from '@/types/postTypes';
import { client } from '@/lib/datoClient';
import { GET_SERVICES } from '@/lib/datoQueries';

// <Helmet>
//   <title>Serviços Automotivos Completos em Porteirinha/MG - APARBS</title>
//   <meta
//     name="description"
//     content="Centro automotivo completo em Porteirinha: troca de óleo, freios, suspensão, alinhamento, diagnóstico eletrônico e mais. Qualidade e confiança APARBS."
//   />
//   <meta name="keywords" content="oficina mecânica Porteirinha, centro automotivo, troca de óleo, alinhamento, freios, suspensão" />
//   <link rel="canonical" href="https://aparbs.com.br/servicos" />
// </Helmet>
export default async function ServicesPage() {
  let services: Service[] = [];

  try {
    const data: DatoResponse = await client.request(GET_SERVICES);
    services = data?.allServices || [];
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
  }

  return (
    <>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Soluções automotivas completas para manter seu carro em movimento
              </h1>
              <p className="text-lg text-red-50 max-w-3xl mx-auto leading-relaxed">
                Na APARBS, cuidamos do seu veículo com a mesma dedicação que você tem com quem anda do seu lado. Segurança, eficiência e atendimento humano em cada serviço.
              </p>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nossos Serviços
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                De manutenções preventivas a reparos complexos, temos a solução completa para manter seu veículo funcionando perfeitamente.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  name={service.title}
                  shortDescription={service.shortdescription}
                  icon={service.icon}
                  slug={service.slug}
                />
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-8 md:p-12 text-white shadow-xl">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-6">
                <Icons.Heart className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-extrabold mb-4 text-[#d90000] uppercase">
                O diferencial APARBS
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Na APARBS, a gente cuida do seu carro como se fosse nosso. Mais do que serviços, entregamos confiança e tranquilidade. Cada reparo, cada ajuste, cada revisão é feito pensando na sua segurança e no seu sorriso ao volante.
              </p>
              <a
                href="https://wa.me/553832208767?text=Ol%C3%A1%21%20Estou%20no%20site%20da%20APARBS%20e%20gostaria%20de%20atendimento."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors shadow-lg"
              >
                <Icons.MessageCircle className="w-6 h-6" />
                Falar com um especialista
              </a>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
