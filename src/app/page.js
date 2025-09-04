// app/page.js
import HomeClient from "./HomeClient";

export const metadata = {
  title: "Medicine Delivery in Under 30 Minutes | GoDavaii",
  description:
    "Order medicines from verified local pharmacies with GoDavaii. Fast hyperlocal delivery (under 30 minutes), real-time tracking and 24x7 support.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomeClient />;
}
