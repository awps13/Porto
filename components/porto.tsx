import SisiKiri from "./sisiKiri";
import SisiKanan from "./sisiKanan";
import SisiTengah from "./sisiTengah";

const porto = () => {
  return (
    <div className="min-h-screen overflow-y-auto xl:max-h-screen xl:overflow-y-hidden">
      {/* Mobile & Tablet: Stack Vertically, Desktop: Horizontal */}
      <div className="flex flex-col xl:flex-row xl:justify-between h-auto xl:h-screen">
        {/* SISI KIRI - Hidden on mobile & tablet, visible on desktop+ */}
        <div className="hidden xl:flex">
          <SisiKiri />
        </div>
        {/* SISI TENGAH */}
        <SisiTengah />
        {/* SISI KANAN - Hidden on mobile & tablet, visible on desktop+ */}
        <div className="hidden xl:flex">
          <SisiKanan />
        </div>
      </div>
    </div>
  );
};

export default porto;
