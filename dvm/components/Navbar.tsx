import Image from "next/image";

function Navbar() {
  return (
    <nav className="bg-slate-50 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-2xl flex flex-wrap justify-between mx-auto p-3">
        <a
          href="https://www.creditacceptance.com/"
          className="flex items-center"
        >
          <Image
            src="/ca_logo.svg"
            width={140}
            height={140}
            alt="Credit Acceptance"
            priority
          />
        </a>
        <div className="bg-orange-500 px-3 py-2 rounded-t-lg">
          <p className="text-white font-medium text-lg">We're driving possibility</p>
        </div>
      </div>
      <div className="border-t-3 border-orange-400"></div>
    </nav>
  );
}

export default Navbar;
