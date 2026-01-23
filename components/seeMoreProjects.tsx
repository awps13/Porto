import seeMoreProject from "@/data/seeMoreProjects.json";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const seeMoreProjects = () => {
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
            <h1 className="font-semibold text-3xl text-white pb-4 mb-6 border-b-2 border-white w-full text-center 2xl:text-[3rem]">
              All Projects
            </h1>

            {/* GRID ALL PROJECTS */}
            <div className="grid sm:grid-cols-3 gap-6 w-full mb-6">
              {seeMoreProject.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setOpenModule(project.id)}
                  className="border-2 border-white shadow-[6px_6px_0_#fff] cursor-pointer transition-all duration-200 ease-out hover:scale-[1.05] hover:shadow-[10px_10px_0_#fff]"
                >
                  <div className="w-full h-[200px] overflow-hidden flex items-center justify-center 2xl:h-[300px]">
                    <Image
                      src={project.image}
                      width={project.width}
                      height={project.height}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h2 className="font-semibold text-white text-lg 2xl:text-2xl">
                      {project.title}
                    </h2>
                    <p className="text-gray-300 text-xs mt-1 line-clamp-2 2xl:text-xl">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-5">
              <button
                onClick={() => setShowAll(false)}
                className="px-4 py-2 mb-2 mt-5
                              border p-2 shadow-[3px_3px_0px_#fff] inline-flex flex-col justify-center items-center transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[5px_5px_0_white] text-[1rem] sm:text-sm 2xl:text-3xl 2xl:hover:scale-[1.13] 2xl:hover:shadow-[10px_10px_0_white] 2xl:shadow-[6px_6px_0px_#fff] 2xl:border-2 hover:cursor-pointer 2xl:mt-12"
              >
                Close
              </button>
            </div>
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
            className="relative p-2 max-w-4xl max-h-[80vh] 2xl:max-w-7xl overflow-y-auto shadow-[12px_12px_0_#fff] border-2 flex flex-col items-center bg-gray-900"
          >
            <h1 className="font-semibold text-2xl text-white pb-2 2xl:text-[3rem]">
              {seeMoreProject.find((p) => p.id === openModule)?.title}
            </h1>

            {/* IMAGE */}
            <div className="w-full mb-3">
              <Image
                src={
                  seeMoreProject.find((p) => p.id === openModule)?.image || ""
                }
                alt={
                  seeMoreProject.find((p) => p.id === openModule)?.title || ""
                }
                width={
                  seeMoreProject.find((p) => p.id === openModule)?.width || 800
                }
                height={
                  seeMoreProject.find((p) => p.id === openModule)?.height || 600
                }
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5 text-center">
              <div>
                <h1 className="font-semibold mb-2 text-white 2xl:text-[2rem]">My Jobdesk</h1>
                <p className="text-sm text-white 2xl:text-2xl">
                  {seeMoreProject.find((p) => p.id === openModule)?.description}
                </p>
              </div>
              <div>
                <h1 className="font-semibold mb-2 text-white 2xl:text-[2rem]">
                  Tools & Technologies
                </h1>
                <div className="grid grid-cols-8 items-center justify-center gap-5">
                  {seeMoreProject
                    .find((p) => p.id === openModule)
                    ?.technologies.map((tech) => (
                      <Image
                        key={tech}
                        src={tech}
                        alt={tech}
                        width={32}
                        height={32} className="2xl:w-16 2xl:h-16"
                      />
                    ))}
                </div>
              </div>
            </div>
            <div className="flex gap-5">
              {seeMoreProject.find((p) => p.id === openModule)?.linkCode && (
                <button className="px-4 py-2 mb-2 mt-5
                              border p-2 shadow-[3px_3px_0px_#fff] inline-flex flex-col justify-center items-center transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[5px_5px_0_white] text-[1rem] sm:text-sm 2xl:text-3xl 2xl:hover:scale-[1.13] 2xl:hover:shadow-[10px_10px_0_white] 2xl:shadow-[6px_6px_0px_#fff] 2xl:border-2 hover:cursor-pointer 2xl:mt-12">
                  <Link
                    href={
                      seeMoreProject.find((p) => p.id === openModule)
                        ?.linkCode || ""
                    }
                    target="blank"
                  >
                    Code
                  </Link>
                </button>
              )}
              {seeMoreProject.find((p) => p.id === openModule)?.linkWebsite && (
                <button className="px-4 py-2 mb-2 mt-5
                              border p-2 shadow-[3px_3px_0px_#fff] inline-flex flex-col justify-center items-center transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[5px_5px_0_white] text-[1rem] sm:text-sm 2xl:text-3xl 2xl:hover:scale-[1.13] 2xl:hover:shadow-[10px_10px_0_white] 2xl:shadow-[6px_6px_0px_#fff] 2xl:border-2 hover:cursor-pointer 2xl:mt-12">
                  <Link
                    href={
                      seeMoreProject.find((p) => p.id === openModule)
                        ?.linkWebsite || ""
                    }
                    target="blank"
                  >
                    Demo
                  </Link>
                </button>
              )}
              <button
                onClick={() => setOpenModule(null)}
                className="px-4 py-2 mb-2 mt-5
                              border p-2 shadow-[3px_3px_0px_#fff] inline-flex flex-col justify-center items-center transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[5px_5px_0_white] text-[1rem] sm:text-sm 2xl:text-3xl 2xl:hover:scale-[1.13] 2xl:hover:shadow-[10px_10px_0_white] 2xl:shadow-[6px_6px_0px_#fff] 2xl:border-2 hover:cursor-pointer 2xl:mt-12"
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

export default seeMoreProjects;
