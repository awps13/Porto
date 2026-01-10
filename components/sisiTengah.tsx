import Project from "./project";
import Navbar from "./navbar";
import Sertif from "./sertif";
import AboutContacts from "./aboutContacts";

const sisiTengah = () => {
  return (
    <div className="w-full md:w-auto m-auto px-4 md:px-10 py-10 md:py-0">
      <Navbar />
      {/* Mobile: Stack Vertically, Desktop: Horizontal */}
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 mt-3 mx-3 sm:mx-0">
        {/* About Me and Contacts */}
        <div className="w-full lg:w-auto">
          <AboutContacts />
        </div>
        <div className="w-full lg:w-auto">
          <Project />
          <Sertif />
        </div>
      </div>
    </div>
  );
};

export default sisiTengah;
