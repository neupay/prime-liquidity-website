export default function Contact() {
  return (
    <section className="px-6 py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-10 gap-12 items-center">

          {/* LEFT: Logo (30%) */}
          <div className="md:col-span-3">
            <div className="h-full flex items-center justify-center bg-white rounded-2xl shadow-sm border p-10">
              {/* Replace with your actual logo */}
              <img
                src="/images/prime-logo.png"
                alt="Prime Liquidity by Neupay"
                className="max-h-32 object-contain"
              />
            </div>
          </div>

          {/* RIGHT: Contact Content (70%) */}
          <div className="md:col-span-7">
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">
              Get in Touch
            </h2>

            <p className="text-slate-600 max-w-2xl mb-8">
              Whether you’re a feed distributor, supplier, or business seeking
              flexible liquidity, Prime Liquidity is here to help you grow
              sustainably. Reach out to start a conversation.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  📧
                </span>
                <span className="text-slate-700">
                  primeliquidity@neupay.co
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  📞
                </span>
                <span className="text-slate-700">
                  +234 805 838 7906
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
                Talk to Us
              </button>

              <button className="px-6 py-3 rounded-full border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition">
                Become a Partner
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
