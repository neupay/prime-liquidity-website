import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Feature from "./components/Feature";
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import HowItWorks from "./components/HowItWorks";
import Repayment from "./components/Repayment";
import Vision from "./components/Vision";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import {
  LiquidityIcon,
  SupplierIcon,
  RepaymentIcon
} from "./components/icons";

export default function Home() {
  return (
    <>
    <Navbar />
    <main>
      <Hero />
      <Feature />
      <Problem />
      <Solution />
      <HowItWorks />
      <Repayment />
      <Vision />
      <Contact />
      <Footer />
    </main>
    </>
  );
}
