import seeMoreProject from "@/data/seeMoreProjects.json";
import { useState } from "react";
import Image from "next/image";

const seeMoreProjects = () => {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="">
      <button
        onClick={() => setShowAll(true)}
        className="border p-2 font-semibold shadow-[3px_3px_0px_#fff] inline-flex flex-col justify-center items-center transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[5px_5px_0_white] text-[1rem] sm:text-sm hover:cursor-pointer"
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
            className="relative p-6 max-w-6xl max-h-[90vh] overflow-y-auto sm:shadow-[12px_12px_0_#fff] border-2 flex flex-col items-center bg-black"
          >
            <h1 className="font-semibold text-3xl text-white pb-4 mb-6 border-b-2 border-white w-full text-center">
              All Projects
            </h1>

            {/* GRID ALL PROJECTS */}
            <div className="grid sm:grid-cols-3  gap-6 w-full mb-6">
              {seeMoreProject.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setOpenModule(project.id)}
                  className="border-2 border-white shadow-[6px_6px_0_#fff] cursor-pointer transition-all duration-200 ease-out hover:scale-[1.05] hover:shadow-[10px_10px_0_#fff]"
                >
                  <div className="w-full h-[200px] overflow-hidden flex items-center justify-center">
                    <Image
                      src={project.image}
                      width={project.width}
                      height={project.height}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h2 className="font-semibold text-white text-lg">
                      {project.title}
                    </h2>
                    <p className="text-gray-300 text-xs mt-1 line-clamp-2">
                      {project.description}
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

            <div className="grid grid-cols-2 gap-5 text-center">
              <div>
                <h1 className="font-semibold mb-2 text-white">Description</h1>
                <p className="text-sm text-white">
                  {seeMoreProject.find((p) => p.id === openModule)?.description}
                </p>
              </div>
              <div>
                <h1 className="font-semibold mb-2 text-white">
                  Tools & Technologies
                </h1>
                <div className="grid grid-cols-8 items-center justify-center">
                  {seeMoreProject
                    .find((p) => p.id === openModule)
                    ?.technologies.map((tech, index) => (
                      <Image
                        key={index}
                        src="/react.svg"
                        alt={tech}
                        width={32}
                        height={32}
                      />
                    ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setOpenModule(null)}
              className="px-4 py-2 mb-2 mt-5 border text-white shadow-[3px_3px_0_#fff] hover:scale-[1.03] hover:shadow-[6px_6px_0_#fff] transition-all duration-200 ease-out hover:cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default seeMoreProjects;
