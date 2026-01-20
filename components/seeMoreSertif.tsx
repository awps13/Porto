import seeMoreCertifications from "@/data/seeMoreCertifications.json";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const seeMoreSertif = () => {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="">
      <button
        onClick={() => setShowAll(true)}
        className="border p-2 font-semibold shadow-[3px_3px_0px_#fff] inline-flex flex-col justify-center items-center transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[5px_5px_0_white] text-[1rem] sm:text-sm 2xl:text-3xl 2xl:hover:scale-[1.13] 2xl:hover:shadow-[10px_10px_0_white] 2xl:shadow-[6px_6px_0px_#fff] 2xl:border-2 hover:cursor-pointer"
      >
        See More
      </button>

      {showAll && (
        <div
          onClick={() => setShowAll(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative p-6 max-w-6xl max-h-[90vh] overflow-y-auto sm:shadow-[12px_12px_0_#fff] border-2 flex flex-col items-center bg-black 2xl:max-w-392 2xl:p-8 "
          >
            <h1 className="font-semibold text-3xl text-white pb-4 mb-6 border-b-2 border-white w-full text-center">
              All Certifications
            </h1>

            {/* GRID ALL CERTIFICATIONS */}
            <div className="grid sm:grid-cols-3 gap-6 w-full mb-6">
              {seeMoreCertifications.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => setOpenModule(cert.id)}
                  className="border-2 border-white shadow-[6px_6px_0_#fff] cursor-pointer transition-all duration-200 ease-out hover:scale-[1.05] hover:shadow-[10px_10px_0_#fff]"
                >
                  <div className="w-full h-[200px] overflow-hidden flex items-center justify-center">
                    <Image
                      src={cert.image}
                      width={cert.width}
                      height={cert.height}
                      alt={cert.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h2 className="font-semibold text-white text-lg">
                      {cert.title}
                    </h2>
                    <p className="text-gray-300 text-xs mt-1 line-clamp-2">
                      {cert.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAll(false)}
              className="px-4 py-2 border text-white shadow-[3px_3px_0_#fff] hover:scale-[1.03] hover:shadow-[6px_6px_0_#fff] transition-all duration-200 ease-out hover:cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {openModule && (
        <div
          onClick={() => setOpenModule(null)}
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative p-2 max-w-4xl max-h-[80vh] overflow-y-auto shadow-[12px_12px_0_#fff] border-2 flex flex-col items-center bg-black"
          >
            <h1 className="font-semibold text-2xl text-white pb-2">
              {seeMoreCertifications.find((c) => c.id === openModule)?.title}
            </h1>

            {/* IMAGE */}
            <div className="w-full mb-3">
              <Image
                src={
                  seeMoreCertifications.find((c) => c.id === openModule)
                    ?.image || ""
                }
                alt={
                  seeMoreCertifications.find((c) => c.id === openModule)
                    ?.title || ""
                }
                width={seeMoreCertifications.find((c) => c.id === openModule)?.width}
                height={seeMoreCertifications.find((c) => c.id === openModule)?.height}
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="text-center">
              <h1 className="font-semibold mb-2 text-white">{seeMoreCertifications.find((c) => c.id === openModule)?.subtitle}</h1>
              <p className="text-sm text-white">
                {
                  seeMoreCertifications.find((c) => c.id === openModule)
                    ?.description
                }
              </p>
            </div>
            <div className="flex gap-5">
              <button className="px-4 py-2 mb-2 mt-5 border text-white shadow-[3px_3px_0_#fff] hover:scale-[1.03] hover:shadow-[6px_6px_0_#fff] transition-all duration-200 ease-out hover:cursor-pointer"><Link href={seeMoreCertifications.find((c)=> c.id === openModule)?.certif!} target="blank">View Certificate</Link>
                
              </button>
              <button
                onClick={() => setOpenModule(null)}
                className="px-4 py-2 mb-2 mt-5 border text-white shadow-[3px_3px_0_#fff] hover:scale-[1.03] hover:shadow-[6px_6px_0_#fff] transition-all duration-200 ease-out hover:cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default seeMoreSertif;
