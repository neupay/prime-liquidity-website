import { LiquidityIcon, SupplierIcon, RepaymentIcon } from "./icons";

export default function Feature(){
    return (
        <section className="bg-gray-50 py-28 px-6">
            <div className="max-w-6xl mx-auto text-center">

                {/* Section Header */}
                <div className="max-w-3xl mx-auto mb-16">
                <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                    Built to keep businesses running
                </h2>
                <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                    Prime Liquidity provides short-term access to essential goods and
                    services, helping businesses survive cashflow gaps without
                    traditional loans.
                </p>
                </div>

                {/* Feature Cards */}
                <div className="grid gap-10 md:grid-cols-3 text-left">
                
                {/* Card 1 */}
                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-lg">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 mx-auto">
                    <LiquidityIcon />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 text-center">
                    Short-Term Liquidity
                    </h3>

                    <p className="mt-3 text-gray-600 leading-relaxed text-center">
                    Access critical business inputs exactly when cashflow tightens,
                    without taking traditional loans.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-lg">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 mx-auto">
                    <SupplierIcon />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 text-center">
                    Direct Supplier Payments
                    </h3>

                    <p className="mt-3 text-gray-600 leading-relaxed text-center">
                    Payments go straight to vetted suppliers, ensuring funds are used
                    strictly for business continuity.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-lg">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 mx-auto">
                    <RepaymentIcon />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 text-center">
                    Flexible Weekly Repayment
                    </h3>

                    <p className="mt-3 text-gray-600 leading-relaxed text-center">
                    Repay weekly with transparent pricing. Pay more anytime and
                    reduce total charges without penalties.
                    </p>
                </div>

                </div>
            </div>
        </section>



    )
}