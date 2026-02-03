export default function HowItWorks() {
  const steps = [
    {
      title: "Apply at Partner Store",
      description:
        "Businesses apply through a Prime Liquidity agent stationed at an approved distribution or service location.",
    },
    {
      title: "On-site Verification",
      description:
        "Our agent visits the business to verify operations, assess viability, and capture required documentation.",
    },
    {
      title: "Supplier Payment",
      description:
        "Once approved, Prime Liquidity pays the supplier directly and goods or services are released.",
    },
    {
      title: "Flexible Repayment",
      description:
        "Repayment happens weekly over a short period, with the freedom to pay more or settle early.",
    },
  ];

  return (
    <section className="relative px-6 py-28 bg-white overflow-hidden">
     
      {/* Slanted navy background with dots */}
      <div className="absolute top-0 right-0 w-[38%] h-full pointer-events-none">
        <svg
          viewBox="0 0 400 600"
          preserveAspectRatio="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dotPattern"
              width="18"
              height="18"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.5" fill="#e5e7eb" opacity="0.25" />
            </pattern>
          </defs>

          <polygon
            points="120,0 400,0 400,600 0,600"
            fill="#0f172a"
          />

          <polygon
            points="120,0 400,0 400,600 0,600"
            fill="url(#dotPattern)"
          />
        </svg>
      </div>


      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-20">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600">
            A simple, transparent process designed to keep businesses operating
            during short-term liquidity gaps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex gap-6 bg-slate-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition"
            >
              {/* Basic number */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-700 font-medium shrink-0">
                {index + 1}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
