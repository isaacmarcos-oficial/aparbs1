import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
  name: string;
  shortDescription: string;
  icon: string;
  slug: string;
}

export default function ServiceCard({ name, shortDescription, icon, slug }: ServiceCardProps) {
  const Icon = (Icons[icon as keyof typeof Icons] || Icons.Wrench) as LucideIcon;

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
            <Icon className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
              {name}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {shortDescription}
            </p>
            <Link
              href={`/servicos/${slug}`}
              className="inline-flex items-center gap-2 text-red-600 font-semibold text-sm hover:gap-3 transition-all"
            >
              Saiba mais
              <Icons.ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
