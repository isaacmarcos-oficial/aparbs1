import { DatoResponse } from '@/types/postTypes';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { client } from '@/lib/datoClient';
import { GET_SERVICES_BY_SLUG } from '@/lib/datoQueries';

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let service = null;

  try {
    const data: DatoResponse = await client.request(GET_SERVICES_BY_SLUG, { slug });
    service = data?.service || null;
  } catch (error) {
    console.error("Erro ao buscar o post:", error);
  }

  if (!service) {
    return (
      <div className="flex flex-col items-center w-full p-8 gap-4">
        <h2 className="text-3xl font-extrabold text-center text-[#d90000] mt-5">
          Serviço não encontrado
        </h2>
      </div>
    )
  }

  const Icon = (Icons[service.icon as keyof typeof Icons] || Icons.Wrench) as LucideIcon;

  // const jsonLd = {
  //   "@context": "https://schema.org",
  //   "@type": "Service",
  //   "name": service.name,
  //   "description": service.metaDescription,
  //   "provider": {
  //     "@type": "LocalBusiness",
  //     "name": "APARBS Soluções Automotivas",
  //     "address": {
  //       "@type": "PostalAddress",
  //       "addressLocality": "Porteirinha",
  //       "addressRegion": "MG",
  //       "addressCountry": "BR"
  //     }
  //   },
  //   "areaServed": {
  //     "@type": "City",
  //     "name": "Porteirinha"
  //   }
  // };

  // <Helmet>
  //   <title>{service.metaTitle}</title>
  //   <meta name="description" content={service.metaDescription} />
  //   <link rel="canonical" href={`https://aparbs.com.br/servicos/${service.slug}`} />
  //   <script type="application/ld+json">
  //     {JSON.stringify(jsonLd)}
  //   </script>
  // </Helmet>

  function parseTextList(raw: string): string[] {
    return raw
      .replace(/```/g, '') // remove backticks
      .split('\n') // separa por quebra de linha
      .map(item => item.replace(/^\*\s*/, '').trim()) // remove "* " do início
      .filter(item => item.length > 0); // remove vazios
  }

  function parseFaqMarkdown(raw: string): { question: string; answer: string }[] {
    const blocks = raw
      .replace(/```/g, '') // remove backticks
      .split(/\n(?=\*\*)/) // separa cada FAQ pelo início da pergunta (**)

    return blocks.map(block => {
      const [questionLine, ...answerLines] = block.trim().split('\n');
      const question = questionLine.replace(/^\*\*(.+?)\*\*$/, '$1').trim();
      const answer = answerLines.join(' ').trim();
      return { question, answer };
    });
  }

  const whatInvolves = parseTextList(service.whatinvolves);
  const whyDoList = parseTextList(service.whydo);
  const faq = parseFaqMarkdown(service.faq);

  return (
    <>
      <div className="w-full  min-h-screen bg-zinc-50">
        <nav className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/servicos"
              className="inline-flex items-center gap-2 text-zinc-600 hover:text-red-600 transition-colors font-medium"
            >
              <Icons.ArrowLeft className="w-5 h-5" />
              Voltar para serviços
            </Link>
          </div>
        </nav>

        <header className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Icon className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {service.title}
              </h1>
            </div>
            <p className="text-xl text-red-50 leading-relaxed">
              {service.shortdescription}
            </p>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-zinc-700 leading-relaxed text-lg mb-8">
                {service.introduction}
              </p>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-3 uppercase">
                  <div className="w-8 h-1 bg-red-600 rounded"></div>
                  O que é
                </h2>
                <p className="text-zinc-700 leading-relaxed text-lg">
                  {service.whatis}
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-3 uppercase">
                  <div className="w-8 h-1 bg-red-600 rounded"></div>
                  O que envolve
                </h2>
                <ul className="space-y-3">
                  {whatInvolves.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Icons.Star className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-700 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-3 uppercase">
                  <div className="w-8 h-1 bg-red-600 rounded"></div>
                  Por que fazer
                </h2>
                <ul className="space-y-3">
                  {whyDoList.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Icons.Star className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-700 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-3 uppercase">
                  <div className="w-8 h-1 bg-red-600 rounded"></div>
                  Quando fazer
                </h2>
                <p className="text-zinc-700 leading-relaxed text-lg">
                  {service.whentodo}
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-3 uppercase">
                  <div className="w-8 h-1 bg-red-600 rounded"></div>
                  Como fazemos
                </h2>
                <p className="text-zinc-700 leading-relaxed text-lg">
                  {service.howwedo}
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-3 uppercase">
                  <div className="w-8 h-1 bg-red-600 rounded"></div>
                  Por que escolher a APARBS
                </h2>
                <p className="text-zinc-700 leading-relaxed text-lg">
                  {service.whychooseus}
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-3 uppercase">
                  <div className="w-8 h-1 bg-red-600 rounded"></div>
                  Perguntas frequentes
                </h2>
                <div className="space-y-6">
                  {faq.map((faq, index) => (
                    <div key={index} className="flex flex-col border-l-4 border-red-600 pl-6 py-2">
                      <h3 className="text-lg font-bold text-white mb-2 bg-red-600 rounded-lg px-4 py-2 inline-block">
                        {faq.question}
                      </h3>
                      <p className="text-zinc-700 leading-relaxed text-lg">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </article>

          {/* {relatedServices.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-red-600 mb-6">
                Serviços relacionados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedServices.map((relatedService) => {
                  const RelatedIcon = (Icons[relatedService.icon as keyof typeof Icons] || Icons.Wrench) as LucideIcon;
                  return (
                    <Link
                      key={relatedService.id}
                      href={`/servicos/${relatedService.slug}`}
                      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-6 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors flex-shrink-0">
                          <RelatedIcon className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-red-600 mb-1 group-hover:text-red-600 transition-colors">
                            {relatedService.name}
                          </h3>
                          <p className="text-sm text-zinc-600">
                            {relatedService.shortDescription}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )} */}

          <section className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-8 md:p-10 text-white shadow-xl text-center">
            <Icons.MessageCircle className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">
              Notou algo diferente no carro?
            </h2>
            <p className="text-lg text-green-50 mb-6 leading-relaxed">
              Chama a gente no WhatsApp e tira a dúvida sem compromisso. Estamos aqui para ajudar.
            </p>
            <a
              href="https://wa.me/553832208767?text=Ol%C3%A1!%20Estou%20no%20site%20e%20gostaria%20de%20solicitar%20um%20atendimento."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-colors shadow-lg"
            >
              <Icons.MessageCircle className="w-6 h-6" />
              Falar com um especialista
            </a>
          </section>
        </main>
      </div>
    </>
  );
}
