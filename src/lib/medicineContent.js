// Rich medicine content generator — creates unique, SEO-optimized content per medicine
// based on composition, category, and type. No API calls needed.

// ─── INGREDIENT KNOWLEDGE BASE ───
const INGREDIENT_DATA = {
  paracetamol: { uses: "fever, headache, body pain, toothache, cold and flu symptoms", mechanism: "blocks pain signals and reduces fever by acting on the brain's heat-regulating center", sideEffects: "nausea, stomach pain, liver damage (overdose), allergic skin rash, loss of appetite", safetyNote: "Do not exceed 4g/day. Avoid with alcohol. Use with caution in liver disease." },
  ibuprofen: { uses: "pain, inflammation, fever, arthritis, menstrual cramps, dental pain", mechanism: "reduces prostaglandins that cause pain, swelling, and fever", sideEffects: "stomach irritation, heartburn, nausea, dizziness, increased bleeding risk", safetyNote: "Take with food. Avoid in kidney disease and heart conditions. Not for long-term use without medical supervision." },
  amoxicillin: { uses: "bacterial infections of ear, nose, throat, urinary tract, skin, and respiratory tract", mechanism: "kills bacteria by preventing them from forming cell walls", sideEffects: "diarrhea, nausea, vomiting, skin rash, allergic reactions", safetyNote: "Complete the full course. Not effective against viral infections. Inform doctor about penicillin allergy." },
  azithromycin: { uses: "respiratory infections, ear infections, skin infections, sexually transmitted infections", mechanism: "stops bacterial growth by interfering with protein synthesis", sideEffects: "diarrhea, nausea, abdominal pain, vomiting, headache", safetyNote: "Take on empty stomach. Complete full course. May interact with antacids." },
  cetirizine: { uses: "allergies, hay fever, runny nose, sneezing, itchy/watery eyes, hives, skin itching", mechanism: "blocks histamine receptors to reduce allergic symptoms", sideEffects: "drowsiness, dry mouth, headache, fatigue, dizziness", safetyNote: "May cause drowsiness. Avoid driving if affected. Safe for most adults and children over 6." },
  metformin: { uses: "type 2 diabetes, blood sugar control, insulin resistance, PCOS", mechanism: "reduces glucose production in liver and improves insulin sensitivity", sideEffects: "nausea, diarrhea, stomach upset, metallic taste, vitamin B12 deficiency (long-term)", safetyNote: "Take with meals. Monitor kidney function regularly. Stop before contrast dye procedures." },
  pantoprazole: { uses: "acid reflux, GERD, stomach ulcers, heartburn, Zollinger-Ellison syndrome", mechanism: "blocks the proton pump in stomach cells to reduce acid production", sideEffects: "headache, nausea, abdominal pain, diarrhea, vitamin B12 deficiency (long-term)", safetyNote: "Take before meals. Not for long-term use without medical advice. May affect calcium absorption." },
  omeprazole: { uses: "acid reflux, peptic ulcers, GERD, heartburn, H. pylori infection (with antibiotics)", mechanism: "irreversibly blocks stomach acid pumps to reduce acid secretion", sideEffects: "headache, nausea, diarrhea, stomach pain, increased infection risk (long-term)", safetyNote: "Take 30 minutes before breakfast. Short-term use preferred. May interact with blood thinners." },
  atorvastatin: { uses: "high cholesterol, cardiovascular disease prevention, heart attack prevention, stroke prevention", mechanism: "blocks HMG-CoA reductase enzyme to reduce cholesterol production in liver", sideEffects: "muscle pain, headache, nausea, liver enzyme changes, memory issues (rare)", safetyNote: "Take at night for best effect. Report unexplained muscle pain immediately. Regular liver tests needed." },
  montelukast: { uses: "asthma prevention, allergic rhinitis, exercise-induced bronchoconstriction", mechanism: "blocks leukotriene receptors to reduce airway inflammation and bronchoconstriction", sideEffects: "headache, stomach pain, fatigue, mood changes, upper respiratory infection", safetyNote: "Take in the evening. Not for acute asthma attacks. Monitor for mood/behavior changes." },
  losartan: { uses: "hypertension, diabetic kidney disease, heart failure, stroke prevention", mechanism: "blocks angiotensin II receptors to relax blood vessels and lower blood pressure", sideEffects: "dizziness, fatigue, hyperkalemia, low blood pressure, muscle cramps", safetyNote: "Avoid in pregnancy. Monitor potassium levels. Do not use with ACE inhibitors." },
  amlodipine: { uses: "hypertension, chest pain (angina), coronary artery disease", mechanism: "relaxes blood vessel muscles by blocking calcium channels, reducing blood pressure", sideEffects: "ankle swelling, flushing, headache, dizziness, fatigue", safetyNote: "Can be taken with or without food. Do not stop suddenly. Avoid grapefruit juice." },
  diclofenac: { uses: "pain, inflammation, arthritis, muscle strains, dental pain, post-surgical pain", mechanism: "inhibits COX enzymes to reduce pain-causing prostaglandins", sideEffects: "stomach pain, nausea, heartburn, increased cardiovascular risk, liver damage (rare)", safetyNote: "Take with food. Avoid in heart disease. Not for long-term use without supervision." },
  ciprofloxacin: { uses: "urinary tract infections, respiratory infections, skin infections, bone infections", mechanism: "kills bacteria by inhibiting DNA gyrase enzyme needed for bacterial replication", sideEffects: "nausea, diarrhea, headache, tendon damage (rare), photosensitivity", safetyNote: "Avoid dairy products near dosing time. Stay hydrated. Report tendon pain immediately." },
  doxycycline: { uses: "acne, respiratory infections, urinary infections, malaria prevention, Lyme disease", mechanism: "prevents bacterial protein synthesis to stop bacterial growth", sideEffects: "nausea, sun sensitivity, esophageal irritation, tooth discoloration (children)", safetyNote: "Take upright with water. Avoid sun exposure. Not for pregnant women or children under 8." },
  levothyroxine: { uses: "hypothyroidism, thyroid hormone replacement, goiter, thyroid cancer (post-surgery)", mechanism: "replaces or supplements natural thyroid hormone T4", sideEffects: "weight changes, tremor, palpitations, insomnia, headache (dosage-related)", safetyNote: "Take on empty stomach, 30-60 min before breakfast. Consistent daily timing is important." },
  aspirin: { uses: "pain, fever, inflammation, heart attack prevention, blood clot prevention", mechanism: "irreversibly inhibits COX enzymes, reducing pain signals and preventing platelet aggregation", sideEffects: "stomach bleeding, nausea, heartburn, increased bruising, tinnitus (high dose)", safetyNote: "Avoid in children under 16 (Reye's syndrome). Take with food. Inform surgeon before procedures." },
};

// ─── CATEGORY TEMPLATES ───
const CATEGORY_INFO = {
  "Pain Relief": { context: "pain management", caution: "prolonged use may cause gastrointestinal issues" },
  "Fever": { context: "fever reduction and symptom management", caution: "persistent fever beyond 3 days needs medical evaluation" },
  "Antibiotics": { context: "bacterial infection treatment", caution: "always complete the full course as prescribed" },
  "Diabetes Care": { context: "blood sugar management and diabetes control", caution: "regular blood sugar monitoring is essential" },
  "Heart Care": { context: "cardiovascular health management", caution: "regular cardiac check-ups are recommended" },
  "Gastric Care": { context: "digestive health and acid-related disorder management", caution: "lifestyle changes alongside medication improve outcomes" },
  "Anti Allergic": { context: "allergy symptom relief", caution: "identify and avoid allergen triggers when possible" },
  "Skin Care": { context: "dermatological treatment", caution: "patch test recommended for topical applications" },
  "Respiratory Care": { context: "respiratory and breathing disorder management", caution: "keep rescue inhaler accessible" },
  "Mental Health": { context: "mental wellness support", caution: "do not stop medication abruptly without medical advice" },
  "Eye Care": { context: "ophthalmic treatment", caution: "maintain hygiene when applying eye preparations" },
  "Vitamins": { context: "nutritional supplementation", caution: "excessive intake may cause adverse effects" },
};

// ─── FORM-SPECIFIC INFO ───
const FORM_INFO = {
  tablet: { how: "Swallow the tablet whole with a glass of water. Do not crush or chew unless specifically directed. Can be taken with or without food unless otherwise stated.", storage: "Store in a cool, dry place below 30°C. Keep away from direct sunlight and moisture. Keep out of reach of children." },
  capsule: { how: "Swallow the capsule whole with water. Do not open, crush, or chew. Take as directed by your doctor.", storage: "Store in a cool, dry place. Protect from heat and humidity. Do not refrigerate unless specified." },
  syrup: { how: "Measure the prescribed dose using the measuring cup provided. Shake the bottle well before use. Can be taken directly or mixed with water.", storage: "Store in a cool place. Use within 30 days of opening. Do not freeze. Keep the cap tightly closed." },
  injection: { how: "To be administered by a healthcare professional only. Do not self-inject unless trained. Follow the prescribed route of administration.", storage: "Store as per label instructions. Some injections require refrigeration. Check expiry before use." },
  cream: { how: "Clean and dry the affected area. Apply a thin layer and gently rub in. Wash hands after application unless treating the hands.", storage: "Store below 25°C. Do not freeze. Keep the tube tightly closed after use." },
  drops: { how: "Tilt your head back (for eye drops) or to the side (for ear drops). Instill the prescribed number of drops. Avoid touching the dropper tip to any surface.", storage: "Store in a cool, dry place. Some drops require refrigeration after opening. Check expiry date." },
  ointment: { how: "Apply a thin layer to the affected area as directed. Cover with a dressing if advised. Wash hands before and after application.", storage: "Store at room temperature. Protect from heat. Keep away from children." },
  inhaler: { how: "Shake the inhaler well. Breathe out fully, then press the inhaler while breathing in slowly. Hold breath for 10 seconds. Rinse mouth after using steroid inhalers.", storage: "Store at room temperature. Protect from extreme temperatures. Replace when counter reaches zero." },
  powder: { how: "Mix the prescribed amount with water or as directed. Take immediately after preparation. Follow specific mixing instructions on the label.", storage: "Store in an airtight container. Keep dry. Protect from moisture and humidity." },
};

// ─── MAIN CONTENT GENERATOR ───
export function generateMedicineContent(med) {
  const name = med.name || "This medicine";
  const composition = med.composition || "";
  const category = Array.isArray(med.category) ? med.category[0] : (med.category || "General");
  const type = (med.type || "tablet").toLowerCase();
  const isRx = med.prescriptionRequired;

  // Find matching ingredient data
  const compositionLower = composition.toLowerCase();
  let ingredientInfo = null;
  for (const [key, data] of Object.entries(INGREDIENT_DATA)) {
    if (compositionLower.includes(key)) {
      ingredientInfo = data;
      break;
    }
  }

  const catInfo = CATEGORY_INFO[category] || { context: "health management", caution: "use as directed by your healthcare provider" };
  const formInfo = FORM_INFO[type] || FORM_INFO.tablet;

  // ─── ABOUT / DESCRIPTION ───
  const aboutLines = [];
  if (ingredientInfo) {
    aboutLines.push(`${name} is used for ${ingredientInfo.uses}.`);
    aboutLines.push(`It works by ${ingredientInfo.mechanism}.`);
    aboutLines.push(`This medicine belongs to the ${category.toLowerCase()} category and is commonly prescribed for ${catInfo.context}.`);
  } else {
    aboutLines.push(`${name} is a ${type} used in ${catInfo.context}.`);
    if (composition) aboutLines.push(`It contains ${composition} as the active ingredient${composition.includes("+") ? "s" : ""}.`);
    aboutLines.push(`This medicine is manufactured for effective relief and is available through verified pharmacies on GoDavaii.`);
  }
  if (isRx) {
    aboutLines.push(`This is a prescription medicine. A valid prescription from a registered doctor is required to purchase ${name}.`);
  }
  aboutLines.push(`Always use ${name} as directed by your doctor. Do not exceed the recommended dose.`);

  // ─── USES & BENEFITS ───
  const uses = ingredientInfo
    ? ingredientInfo.uses.split(", ").map(u => u.charAt(0).toUpperCase() + u.slice(1))
    : [`${catInfo.context.charAt(0).toUpperCase() + catInfo.context.slice(1)}`, "Symptom relief as directed by doctor"];

  // ─── SIDE EFFECTS ───
  const sideEffects = ingredientInfo
    ? ingredientInfo.sideEffects.split(", ").map(s => s.charAt(0).toUpperCase() + s.slice(1))
    : ["Nausea", "Headache", "Stomach discomfort", "Allergic reactions (rare)"];

  // ─── HOW TO USE ───
  const howToUse = formInfo.how;

  // ─── SAFETY ADVICE ───
  const safetyAdvice = [];
  if (ingredientInfo?.safetyNote) {
    safetyAdvice.push(ingredientInfo.safetyNote);
  }
  safetyAdvice.push(`Inform your doctor about all other medications you are taking to avoid drug interactions.`);
  safetyAdvice.push(`${catInfo.caution.charAt(0).toUpperCase() + catInfo.caution.slice(1)}.`);
  safetyAdvice.push(`Consult your doctor before use during pregnancy or breastfeeding.`);

  // ─── STORAGE ───
  const storage = formInfo.storage;

  // ─── RICH FAQs ───
  const faqs = [
    {
      q: `What is ${name} used for?`,
      a: ingredientInfo
        ? `${name} is primarily used for ${ingredientInfo.uses}. It works by ${ingredientInfo.mechanism}. Always consult your doctor before starting this medication to ensure it is appropriate for your condition.`
        : `${name} is used in ${catInfo.context}. It contains ${composition || "active ingredients"} and is available through verified pharmacies on GoDavaii. Ask GoDavaii AI or consult your doctor for detailed usage information.`,
    },
    {
      q: `What are the side effects of ${name}?`,
      a: ingredientInfo
        ? `Common side effects of ${name} may include ${ingredientInfo.sideEffects}. Most side effects are mild and temporary. If you experience severe or persistent side effects, stop taking the medicine and consult your doctor immediately. ${ingredientInfo.safetyNote}`
        : `Side effects may vary by individual. Common side effects of ${category.toLowerCase()} medicines include nausea, headache, and stomach discomfort. Serious side effects are rare. Consult your doctor if you experience any unusual symptoms.`,
    },
    {
      q: `What is the price of ${name}?`,
      a: med.price
        ? `${name} is available at ₹${med.price}${med.mrp && med.mrp > med.price ? ` (MRP ₹${med.mrp}, you save ${Math.round(((med.mrp - med.price) / med.mrp) * 100)}%)` : ""}${med.packCount ? ` for a pack of ${med.packCount} ${med.packUnit || "units"}` : ""}. Prices may vary by pharmacy. Order on GoDavaii for competitive pricing and fast delivery from verified local pharmacies.`
        : `Check the latest price on the GoDavaii app. We offer competitive pricing from verified pharmacies.`,
    },
    {
      q: `Is ${name} available without prescription?`,
      a: isRx
        ? `No, ${name} requires a valid prescription from a registered medical practitioner. You can upload your prescription on GoDavaii app and our team will process your order. This requirement ensures safe and appropriate use of the medication.`
        : `Yes, ${name} is available as an over-the-counter (OTC) medicine and does not require a prescription. You can order it directly through GoDavaii for fast delivery. However, it is always advisable to consult a healthcare professional before starting any new medication.`,
    },
    {
      q: `How should I take ${name}?`,
      a: `${howToUse} The exact dosage and frequency should be determined by your doctor based on your condition, age, and other factors. Do not change the dose without consulting your doctor.`,
    },
    {
      q: `Can I take ${name} during pregnancy?`,
      a: `Consult your doctor before taking ${name} during pregnancy or breastfeeding. Your doctor will assess the benefits versus risks for your specific situation. Self-medication during pregnancy is not recommended.`,
    },
  ];

  return {
    about: aboutLines.join("\n\n"),
    uses,
    sideEffects,
    howToUse,
    safetyAdvice,
    storage,
    faqs,
  };
}
