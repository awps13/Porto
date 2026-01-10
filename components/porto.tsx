import SisiKiri from "./sisiKiri";
import SisiKanan from "./sisiKanan";
import SisiTengah from "./sisiTengah";

const porto = () => {
  return (
    <div className="min-h-screen overflow-y-auto md:max-h-screen md:overflow-y-hidden">
      {/* Mobile & Tablet: Stack Vertically, Desktop: Horizontal */}
      <div className="flex flex-col md:flex-row md:justify-between h-auto md:h-screen">
        {/* SISI KIRI - Hidden on mobile, visible on tablet+ */}
        <div className="hidden md:flex">
          <SisiKiri />
        </div>
        {/* SISI TENGAH */}
        <SisiTengah />
        {/* SISI KANAN - Hidden on mobile, visible on tablet+ */}
        <div className="hidden md:flex">
          <SisiKanan />
        </div>
      </div>
    </div>
  );
};

export default porto;
