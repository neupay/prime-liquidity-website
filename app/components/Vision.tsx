export default function OurVision() {
  return (
    <section className="relative px-6 py-32 overflow-hidden bg-white">
      {/* Decorative shapes */}
      <div className="absolute -top-32 -right-32 w-[420px] h-[420px] bg-blue-100 rounded-full blur-3xl opacity-70" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-100 rounded-full blur-3xl opacity-60" />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left content */}
        <div>
          <span className="inline-block mb-4 text-sm font-medium tracking-wide text-blue-600 uppercase">
            Our Vision
          </span>

          <h2 className="text-4xl font-semibold text-gray-900 leading-tight mb-6">
            Powering businesses with liquidity that moves at the speed of trade
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
            We envision a future where access to capital is embedded directly
            into supply chains — enabling businesses to grow without delays,
            disruption, or dependence on traditional credit systems.
          </p>
        </div>

        {/* Right dynamic blocks */}
        <div className="grid gap-6">
          <div className="bg-white rounded-2xl p-8 shadow-md hover:-translate-y-1 transition-transform">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Embedded Finance
            </h3>
            <p className="text-gray-600">
              Liquidity becomes part of everyday transactions, not a separate
              process or barrier.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md hover:-translate-y-1 transition-transform">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Sustainable Growth
            </h3>
            <p className="text-gray-600">
              Businesses grow steadily through short-term, predictable funding
              instead of long-term debt.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md hover:-translate-y-1 transition-transform">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Inclusive Access
            </h3>
            <p className="text-gray-600">
              Small and medium enterprises gain the same liquidity advantages as
              large corporates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
