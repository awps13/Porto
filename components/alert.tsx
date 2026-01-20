import { useState } from "react";

const alert = () => {
  const [showAlert, setShowAlert] = useState(true);

  if (!showAlert) return null;

  return (
    showAlert && (
      <div className="fixed inset-0 z-50 bg-black/50">
        <div
          className="fixed z-50
    top-1/2 left-1/2
    -translate-x-1/2 -translate-y-1/2
    w-[90%] max-w-md
    bg-black p-4 sm:p-6
    text-center border shadow-[5px_5px_0_#fff]"
        >
          <h1 className="underline font-semibold  sm:text-[1rem] xl:text-3xl 2xl:text-[3rem] mb-3">PENGUMUMAN</h1>
          <h1>
            Bukanya di Handphone atau PC dulu ya, belum bisa di tablet. Akan aku
            update secepatnya agar bisa responsive ygy
          </h1>
          <button
            onClick={() => setShowAlert(false)}
            className="px-4 py-2 mb-2 mt-5
                              border text-white
                              shadow-[3px_3px_0_#fff]
                              hover:scale-[1.03]
                              hover:shadow-[6px_6px_0_#fff]
                              transition-all duration-200 ease-out
                              hover:cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default alert;
