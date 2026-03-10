import Link from 'next/link';

const integrations = [
  { name: 'AWS', logo: '/logos/aws.svg' },
  { name: 'Azure', logo: '/logos/azure.svg' },
  { name: 'GitHub', logo: '/logos/github.svg' },
  { name: 'Databricks', logo: '/logos/databricks.svg' },
  { name: 'Snowflake', logo: '/logos/snowflake.svg' },
  { name: 'Google Cloud', logo: '/logos/gcp.svg' },
];

export default function IntegrationsRow() {
  return (
    <div className="border-t border-gray-200 py-8 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-sm text-gray-600 uppercase tracking-wider font-medium">
            INTEGRATIONS
          </span>

          <div className="flex items-center justify-center gap-8 flex-wrap">
            {integrations.map((integration) => (
              <div
                key={integration.name}
                className="h-8 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all flex items-center min-w-[80px] justify-center"
              >
                <img
                  src={integration.logo}
                  alt={integration.name}
                  className="h-full w-auto object-contain max-w-[100px]"
                />
              </div>
            ))}
          </div>

          <Link
            href="/integrations"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex-shrink-0"
          >
            See all →
          </Link>
        </div>
      </div>
    </div>
  );
}
