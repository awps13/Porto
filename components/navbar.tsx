import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full">
      <div className="flex justify-center sm:justify-start shrink-0">
        <Image
          src="/Foto.jpeg"
          width={150}
          height={150}
          alt="passfoto"
          className="w-[200px] h-[200px] sm:w-[150px] sm:h-[150px] object-cover 2xl:w-[250px] 2xl:h-[250px]"
        />
      </div>

      <div className="p-3 sm:p-5 w-full sm:pr-0 flex flex-col justify-center">
        <h1 className="lg:text-[3rem] font-semibold text-center sm:text-left text-[2rem] 2xl:text-[5rem]">
          AHMAD WILDAN PUTRO SANTOSO
        </h1>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mt-2 sm:mt-0">
          <h3 className="text-[1.2rem] sm:text-base lg:text-[1.5rem] underline text-center sm:text-left 2xl:text-[2.5rem]">
            FRONT END DEVELOPER
          </h3>
          <div className="text-center sm:text-right sm:mt-0 mt-2 flex justify-center sm:justify-end relative">
            <div className="relative flex items-center gap-2">
              <div
                className={`transition-all duration-300 ease-out hidden sm:block ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
              >
                <Link
                  href="/CV AHMAD WILDAN PUTRO SANTOSO B_INDO.pdf"
                  target="blank"
                  className="border p-2 font-semibold shadow-[3px_3px_0px_#fff] inline-flex justify-center items-center transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[5px_5px_0_white] text-[1rem] sm:text-sm 2xl:text-3xl 2xl:hover:scale-[1.13] 2xl:hover:shadow-[10px_10px_0_white] 2xl:shadow-[6px_6px_0px_#fff] 2xl:border-2 hover:cursor-pointer"
                >
                  Indonesian
                </Link>
              </div>
              <div
                className={`transition-all duration-300 ease-out hidden sm:block ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
              >
                <Link
                  href="/CV AHMAD WILDAN PUTRO SANTOSO B_ING.pdf"
                  target="blank"
                  className="border p-2 font-semibold shadow-[3px_3px_0px_#fff] inline-flex justify-center items-center transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[5px_5px_0_white] text-[1rem] sm:text-sm 2xl:text-3xl 2xl:hover:scale-[1.13] 2xl:hover:shadow-[10px_10px_0_white] 2xl:shadow-[6px_6px_0px_#fff] 2xl:border-2 hover:cursor-pointer"
                >
                  English
                </Link>
              </div>
              <div
                className={`transition-all duration-300 ease-out sm:hidden ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
              >
                <Link
                  href="/CV AHMAD WILDAN PUTRO SANTOSO B_INDO.pdf"
                  target="blank"
                  className="border p-2 font-semibold shadow-[3px_3px_0px_#fff] inline-flex justify-center items-center transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[5px_5px_0_white] text-[1rem] sm:text-sm 2xl:text-3xl 2xl:hover:scale-[1.13] 2xl:hover:shadow-[10px_10px_0_white] 2xl:shadow-[6px_6px_0px_#fff] 2xl:border-2 hover:cursor-pointer"
                >
                  Indonesian
                </Link>
              </div>
              <button
                onClick={() => setOpen(!open)}
                className="border p-2 font-semibold shadow-[3px_3px_0px_#fff] inline-flex justify-center items-center transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[5px_5px_0_white] text-[1rem] sm:text-sm 2xl:text-3xl 2xl:hover:scale-[1.13] 2xl:hover:shadow-[10px_10px_0_white] 2xl:shadow-[6px_6px_0px_#fff] 2xl:border-2 hover:cursor-pointer"
              >
                MyCV
              </button>
              <div
                className={`transition-all duration-300 ease-out sm:hidden ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
              >
                <Link
                  href="/CV AHMAD WILDAN PUTRO SANTOSO B_ING.pdf"
                  target="blank"
                  className="border p-2 font-semibold shadow-[3px_3px_0px_#fff] inline-flex justify-center items-center transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[5px_5px_0_white] text-[1rem] sm:text-sm 2xl:text-3xl 2xl:hover:scale-[1.13] 2xl:hover:shadow-[10px_10px_0_white] 2xl:shadow-[6px_6px_0px_#fff] 2xl:border-2 hover:cursor-pointer"
                >
                  English
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default navbar;
