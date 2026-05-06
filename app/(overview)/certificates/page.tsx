import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function CertificatesPage() {
  const certificates = await prisma.certificate.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-headline-lg uppercase mb-2">Certificates</h1>
        <p className="text-body-md text-fg-muted">
          View and manage your certifications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.length === 0 ? (
          <p className="text-fg-muted">No certificates found</p>
        ) : (
          certificates.map((cert) => (
            <div
              key={cert.id}
              className="border border-white/15 bg-surface-low overflow-hidden transition-colors hover:border-white/30"
            >
              {cert.image && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-headline-md uppercase mb-2">
                  {cert.title}
                </h3>
                {cert.issuer && (
                  <p className="text-body-md text-fg-muted mb-2">
                    Issued by: {cert.issuer}
                  </p>
                )}
                {cert.issuedAt && (
                  <p className="text-label-caps text-fg-muted uppercase">
                    {cert.issuedAt.toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
