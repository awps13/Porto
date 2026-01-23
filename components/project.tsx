import projects from "@/data/projects.json";
import Image from "next/image";
import { useState } from "react";
import SeeMoreProjects from "./seeMoreProjects";
import Link from "next/link";

const project = () => {
  const [openModule, setOpenModule] = useState<number | null>(null);
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-0 mt-0 sm:items-center">
        <h1 className="underline font-semibold  sm:text-[1rem] xl:text-base 2xl:text-[2rem]">
          PROJECTS
        </h1>
        <SeeMoreProjects />
      </div>
      {/* Responsive grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-5 mt-3 w-full lg:w-[calc(200px*3+40px)] 2xl:w-[calc(300px*3+60px)]">
        {projects.map((project) => (
          <div key={project.id}>
            <div
              onClick={() => setOpenModule(project.id)}
              className="relative border shadow-[6px_6px_0_#fff] w-full lg:w-[200px] transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[10px_10px_0_white] hover:cursor-pointer 2xl:w-[300px] 2xl:text-3xl 2xl:hover:scale-[1.13] 2xl:hover:shadow-[12px_12px_0_white] 2xl:shadow-[9px_9px_0px_#fff] 2xl:border-2"
            >
              <div className="w-full h-[120px] overflow-hidden flex items-center justify-center 2xl:h-[200px]">
                <Image
                  src={project.image}
                  width={project.width}
                  height={project.height}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="p-2 font-bold text-center text-sm 2xl:text-lg">
                {project.title}
              </p>
            </div>
            {openModule === project.id && (
              <div
                onClick={() => setOpenModule(null)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative p-2 max-w-4xl max-h-[80vh] 2xl:max-w-7xl overflow-y-auto shadow-[12px_12px_0_#fff] border-2 flex flex-col items-center bg-gray-900"
                >
                  <h1 className="font-semibold text-2xl text-white pb-2 2xl:text-[3rem]">
                    {project.title}
                  </h1>

                  {/* IMAGE */}
                  <div className="w-full mb-3">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={project.width}
                      height={project.height}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5 text-center">
                    <div>
                      <h1 className="font-semibold mb-2 2xl:text-[2rem]">My Jobdesk</h1>
                      <p className="text-sm text-white 2xl:text-2xl">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <h1 className="font-semibold mb-2 2xl:text-[2rem]">
                        Tools & Technologies
                      </h1>
                      <div className="grid grid-cols-4 sm:grid-cols-8 gap-5 items-center justify-center">
                        {project.technologies.map((path) => (
                          <Image
                            key={path}
                            src={path}
                            alt={path}
                            width={32}
                            height={32} className="2xl:w-16 2xl:h-16"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <button
                      className="
                              px-4 py-2 mb-2 mt-5
                              border p-2 shadow-[3px_3px_0px_#fff] inline-flex flex-col justify-center items-center transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[5px_5px_0_white] text-[1rem] sm:text-sm 2xl:text-3xl 2xl:hover:scale-[1.13] 2xl:hover:shadow-[10px_10px_0_white] 2xl:shadow-[6px_6px_0px_#fff] 2xl:border-2 hover:cursor-pointer 2xl:mt-12
                              "
                    >
                      <Link href={project.linkCode!} target="blank">
                        Code
                      </Link>
                    </button>

                    {project.linkWebsite && (
                      <button
                        className="
                              px-4 py-2 mb-2 mt-5
                              border p-2 shadow-[3px_3px_0px_#fff] inline-flex flex-col justify-center items-center transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[5px_5px_0_white] text-[1rem] sm:text-sm 2xl:text-3xl 2xl:hover:scale-[1.13] 2xl:hover:shadow-[10px_10px_0_white] 2xl:shadow-[6px_6px_0px_#fff] 2xl:border-2 hover:cursor-pointer 2xl:mt-12
                              "
                      >
                        <Link href={project.linkWebsite!} target="blank">
                          Demo
                        </Link>
                      </button>
                    )}
                    <button
                      onClick={() => setOpenModule(null)}
                      className="
                              px-4 py-2 mb-2 mt-5
                              border p-2 shadow-[3px_3px_0px_#fff] inline-flex flex-col justify-center items-center transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[5px_5px_0_white] text-[1rem] sm:text-sm 2xl:text-3xl 2xl:hover:scale-[1.13] 2xl:hover:shadow-[10px_10px_0_white] 2xl:shadow-[6px_6px_0px_#fff] 2xl:border-2 hover:cursor-pointer 2xl:mt-12 
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

export default project;
