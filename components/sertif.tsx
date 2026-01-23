import certifications from "@/data/certifications.json";
import Image from "next/image";
import { useState } from "react";
import SeeMoreSertif from "./seeMoreSertif";
import Link from "next/link";

const sertif = () => {
  const [openCert, setOpenCert] = useState<number | null>(null);
  return (
    <div className="mt-5">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-5 sm:gap-0 sm:items-center">
        <h1 className="underline font-semibold  sm:text-[1rem] xl:text-base 2xl:text-[2rem]">
          CERTIFICATES
        </h1>
        <SeeMoreSertif />
      </div>
      {/* Responsive grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-5 mt-3 w-full lg:w-[calc(200px*3+40px)] 2xl:w-[calc(300px*3+60px)]">
        {certifications.map((cert) => (
          <div key={cert.id}>
            <div
              onClick={() => setOpenCert(cert.id)}
              className="relative border shadow-[6px_6px_0_#fff] w-full lg:w-[200px] transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[10px_10px_0_white] hover:cursor-pointer 2xl:w-[300px] 2xl:text-3xl 2xl:hover:scale-[1.13] 2xl:hover:shadow-[12px_12px_0_white] 2xl:shadow-[9px_9px_0px_#fff] 2xl:border-2"
            >
              <div className="w-full h-[120px] overflow-hidden flex items-center justify-center 2xl:h-[200px]">
                <Image
                  src={cert.image}
                  width={cert.width}
                  height={cert.height}
                  alt={cert.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="p-2 font-bold text-center text-sm 2xl:text-lg">{cert.title}</p>
            </div>
            {openCert === cert.id && (
              <div
                onClick={() => setOpenCert(null)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative p-2 max-w-4xl max-h-[80vh] 2xl:max-w-7xl overflow-y-auto shadow-[12px_12px_0_#fff] border-2 flex flex-col items-center bg-gray-900"
                >
                  <h1 className="font-semibold text-2xl text-white pb-2 2xl:text-[3rem]">
                    {cert.title}
                  </h1>

                  {/* IMAGE */}
                  <div className="w-full mb-3">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      width={cert.width}
                      height={cert.height}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  <div className="text-center">
                    <h1 className="font-semibold mb-2 2xl:text-[2rem]">{cert.subtitle}</h1>
                    <p className="text-sm text-white 2xl:text-2xl">{cert.description}</p>
                  </div>
                  <div className="flex gap-5">
                     <button
                      className="
                              px-4 py-2 mb-2 mt-5 border p-2 shadow-[3px_3px_0px_#fff] inline-flex flex-col justify-center items-center transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[5px_5px_0_white] text-[1rem] sm:text-sm 2xl:text-3xl 2xl:hover:scale-[1.13] 2xl:hover:shadow-[10px_10px_0_white] 2xl:shadow-[6px_6px_0px_#fff] 2xl:border-2 hover:cursor-pointer 2xl:mt-12
                              "
                    >
                      <Link href={cert.certif} target="blank">View Certificate</Link>
                    </button>
                    <button
                      onClick={() => setOpenCert(null)}
                      className="
                              px-4 py-2 mb-2 mt-5 border p-2 shadow-[3px_3px_0px_#fff] inline-flex flex-col justify-center items-center transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[5px_5px_0_white] text-[1rem] sm:text-sm 2xl:text-3xl 2xl:hover:scale-[1.13] 2xl:hover:shadow-[10px_10px_0_white] 2xl:shadow-[6px_6px_0px_#fff] 2xl:border-2 hover:cursor-pointer 2xl:mt-12
                              "
                    >
                      Close
                    </button>
                  </div>
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
