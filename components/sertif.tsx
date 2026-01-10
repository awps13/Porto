import { useState } from "react";
import Image from "next/image";
import certifications from "@/data/certifications.json";
import SeeMoreSertif from "./seeMoreSertif";

const sertif = () => {
  const [openCert, setOpenCert] = useState<number | null>(null);
  return (
    <div className="mt-5">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-5 sm:gap-0 sm:items-center">
        <h1 className="font-semibold underline text-sm md:text-base text-[2rem] sm:text-[1rem] sm:mt-0 mt-5">
          CERTIFICATIONS
        </h1>
        <SeeMoreSertif />
      </div>
      {/* Responsive grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-5 mt-3 w-full lg:w-[calc(200px*3+40px)]">
        {certifications.map((cert) => (
          <div key={cert.id}>
            <div
              onClick={() => setOpenCert(cert.id)}
              className="relative border shadow-[6px_6px_0_#fff] w-full lg:w-[200px] transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[10px_10px_0_white] hover:cursor-pointer"
            >
              <Image
                src={cert.image}
                width={200}
                height={100}
                alt={cert.title}
                className="w-full h-auto"
              />
              <p className="p-2 text-center text-sm">{cert.title}</p>
            </div>
            {openCert === cert.id && (
              <div
                onClick={() => setOpenCert(null)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative p-2 max-w-4xl max-h-[80vh] overflow-y-auto shadow-[12px_12px_0_#fff] border-2 flex flex-col items-center bg-black"
                >
                  <h1 className="font-semibold text-2xl text-white pb-2">
                    {cert.title}
                  </h1>

                  {/* IMAGE */}
                  <div className="w-full mb-3">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  <div className="text-center">
                    <h1 className="font-semibold mb-2">Description</h1>
                    <p className="text-sm text-white">{cert.description}</p>
                  </div>

                  <button
                    onClick={() => setOpenCert(null)}
                    className="
                              px-4 py-2 mb-2 mt-5
                              border text-white
                              shadow-[3px_3px_0_#fff]
                              hover:scale-[1.03]
                              hover:shadow-[6px_6px_0_#fff]
                              transition-all duration-200 ease-out
                              hover:cursor-pointer
                              "
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default sertif;
