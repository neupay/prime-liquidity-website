export default function RepaymentModel() {
  return (
    <section className="px-6 py-28 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Repayment Model
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our repayment structure is designed to be predictable, flexible,
            and fair — giving businesses room to breathe while staying
            accountable.
          </p>
        </div>

        {/* Key rules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white rounded-2xl p-8 shadow-sm transition duration-200 hover:bg-[#0a2240] hover:text-white hover:shadow-lg cursor-pointer group">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 transition-colors group-hover:text-white">Upfront Commitment</h3>
            <p className="text-gray-600 leading-relaxed transition-colors group-hover:text-white">
              A minimum of <span className="font-medium group-hover:text-white">20%</span> is paid
              immediately before goods are released. Customers may pay more
              upfront if they choose.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm transition duration-200 hover:bg-[#0a2240] hover:text-white hover:shadow-lg cursor-pointer group">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 transition-colors group-hover:text-white">Short Repayment Window</h3>
            <p className="text-gray-600 leading-relaxed transition-colors group-hover:text-white">
              Repayment is spread across a maximum of{" "}
              <span className="font-medium group-hover:text-white">10 weeks</span>, keeping exposure
              short and manageable.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm transition duration-200 hover:bg-[#0a2240] hover:text-white hover:shadow-lg cursor-pointer group">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 transition-colors group-hover:text-white">Fair Pricing</h3>
            <p className="text-gray-600 leading-relaxed transition-colors group-hover:text-white">
              A flat <span className="font-medium group-hover:text-white">15% service charge</span>{" "}
              applies only for the time used. Early repayment reduces total
              charges.
            </p>
          </div>
        </div>

        
      </div>
    </section>
  );
}
