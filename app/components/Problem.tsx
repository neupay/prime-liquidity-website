import { ClockIcon, BankIcon, AlertIcon } from "./icons";

export default function Problem() {
  return (
    <section className="relative overflow-hidden bg-[#0B1C2D] py-32 px-6">
  {/* Striped background overlay */}
  <div
    className="absolute inset-0 opacity-20"
    style={{
      backgroundImage:
        "repeating-linear-gradient(135deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 12px)",
    }}
  />

  {/* Content */}
  <div className="relative z-10 max-w-6xl mx-auto text-center text-white">
    
    {/* Section Header */}
    <div className="max-w-3xl mx-auto mb-20">
      <h2 className="text-4xl font-bold leading-tight">
        The real problem is liquidity timing
      </h2>
      <p className="mt-5 text-lg text-blue-100 leading-relaxed">
        Many businesses don’t fail because they are broken. They fail
        because cash doesn’t arrive when operations need it most.
      </p>
    </div>

    {/* Problem Cards */}
    <div className="grid gap-10 md:grid-cols-3 text-left">

      {/* Card 1 */}
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <ClockIcon />
        </div>

        <h3 className="text-lg font-semibold text-gray-900">
          Cashflow gaps mid-cycle
        </h3>

        <p className="mt-2 text-gray-600 leading-relaxed">
          Businesses often run out of working capital before revenue cycles
          complete, even when demand exists.
        </p>
      </div>

      {/* Card 2 */}
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <BankIcon />
        </div>

        <h3 className="text-lg font-semibold text-gray-900">
          Financial systems built too slow
        </h3>

        <p className="mt-2 text-gray-600 leading-relaxed">
          Traditional banks are designed for long-term credit, not urgent
          operational needs.
        </p>
      </div>

      {/* Card 3 */}
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <AlertIcon />
        </div>

        <h3 className="text-lg font-semibold text-gray-900">
          Shutdown before recovery
        </h3>

        <p className="mt-2 text-gray-600 leading-relaxed">
          Without timely liquidity, otherwise viable businesses collapse
          before cashflow stabilizes.
        </p>
      </div>

    </div>
  </div>
</section>


  );
}
