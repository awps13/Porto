import Image from "next/image";
import Link from "next/link";
const navbar = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full">
      <div className="flex justify-center sm:justify-start shrink-0">
        <Image
          src="/Foto.jpeg"
          width={150}
          height={150}
          alt="passfoto"
          className="w-[200px] h-[200px] sm:w-[150px] sm:h-[150px] object-cover"
        />
      </div>
      <div className="p-3 sm:p-5 w-full sm:pr-0">
        <h1 className="lg:text-[3rem] font-semibold text-center sm:text-left text-[2rem]">
          AHMAD WILDAN PUTRO SANTOSO
        </h1>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mt-2 sm:mt-0">
          <h3 className="text-[1.2rem] sm:text-base lg:text-[1.5rem] underline text-center sm:text-left">
            FRONT END DEVELOPER
          </h3>
          <div className="text-center sm:text-right sm:mt-0 mt-2">
            <Link
              href="/mycv.pdf"
              target="blank"
              className=" border p-2 font-semibold shadow-[3px_3px_0px_#fff] inline-flex flex-col justify-center items-center transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[5px_5px_0_white] text-[1rem] sm:text-sm"
            >
              MyCV
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default navbar