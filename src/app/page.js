// app/page.js
import HomeClient from "./HomeClient";

export const metadata = {
  title: "GoDavaii AI — Buy Medicines Online | AI Health Assistant | 30-Min Delivery India",
  description:
    "Buy medicines online at best prices. AI health assistant in Hindi, Tamil, Telugu & 16 Indian languages. Compare generic alternatives, upload prescriptions, get 30-min delivery from verified pharmacies near you.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "GoDavaii AI — Buy Medicines Online | AI Health Assistant India",
    description: "India's smartest healthcare platform. Buy medicines online, compare prices, find generics, get AI health advice in your language. Fast delivery from local pharmacies.",
  },
};

export default function Page() {
  return <HomeClient />;
}
