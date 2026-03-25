// app/page.js
import HomeClient from "./HomeClient";

export const metadata = {
  title: "GoDavaii AI — Your AI Health Assistant in 16 Indian Languages",
  description:
    "Ask about symptoms, medicines, prescriptions, lab reports, X-rays. AI-powered health assistant with voice support in Hindi, Tamil, Telugu, Bengali & more. Order medicines online with 30-min delivery.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomeClient />;
}
