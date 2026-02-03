export default function Solution() {
  return (

    <section className="relative px-6 py-24 bg-slate-50 overflow-hidden">
      
      {/* Wavy blue background */}
      {/* <div className="absolute bottom-0 right-0 w-[100%] h-[100%] pointer-events-none">
        <svg
          viewBox="0 0 400 300"
          preserveAspectRatio="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,80 C120,160 240,0 400,80 L400,300 L0,300 Z"
            fill="#2563eb"
            opacity="0.12"
          />
        </svg>
      </div>
 */}

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        {/* LEFT: Text */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Our Solution
          </h2>

          <p className="text-gray-700 leading-relaxed mb-5">
            Prime Liquidity embeds liquidity directly into supply chains by
            paying vetted suppliers upfront. Businesses receive essential
            inputs without touching cash.
          </p>

          <p className="text-gray-700 leading-relaxed mb-10">
            This keeps operations running during low-cash periods while
            repayments happen gradually over a short, predictable timeline.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            {/* Primary */}
            <a
              href="#get-started"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
              </svg>
              Get Started
            </a>

            {/* Secondary */}
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              How It Works
            </a>
          </div>
        </div>

        {/* RIGHT: Roll-up banner illustration */}
        <div className="relative flex justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[400px]">
            <img
              src="/images/banner2.png"
              alt="Prime Liquidity roll-up banner"
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
