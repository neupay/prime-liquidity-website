export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-blue-50">
        {/* Slanted background */}
        <div
            className="absolute inset-0 bg-blue-100"
            style={{
            clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
            }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 text-center">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Liquidity-as-a-Service
            <br />
            for Business Continuity
            </h1>

            <p className="mt-6 text-xl text-gray-700 max-w-3xl mx-auto">
            Prime Liquidity helps businesses survive short-term cashflow gaps by
            providing direct access to essential goods and services.
            </p>

            <div className="mt-10 flex justify-center gap-4">
            <button className="rounded-full bg-blue-600 px-8 py-3 text-white font-medium hover:bg-blue-700 transition">
                Get Started
            </button>
            <button className="rounded-full border border-blue-600 px-8 py-3 text-blue-600 font-medium hover:bg-blue-50 transition">
                Learn More
            </button>
            </div>
        </div>
    </section>


  );
}
