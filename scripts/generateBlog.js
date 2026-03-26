// generateBlog.js — Generates 1000+ SEO blog articles programmatically
const fs = require("fs");
const path = require("path");

// ─── TOPIC TEMPLATES ───
const MEDICINE_COMPARISONS = [
  ["Paracetamol", "Ibuprofen", "pain relief"],
  ["Cetirizine", "Levocetirizine", "allergy relief"],
  ["Omeprazole", "Pantoprazole", "acid reflux"],
  ["Metformin", "Glimepiride", "diabetes management"],
  ["Atorvastatin", "Rosuvastatin", "cholesterol control"],
  ["Amoxicillin", "Azithromycin", "antibiotic treatment"],
  ["Losartan", "Telmisartan", "blood pressure control"],
  ["Amlodipine", "Nifedipine", "hypertension treatment"],
  ["Clopidogrel", "Aspirin", "blood thinning"],
  ["Diclofenac", "Aceclofenac", "anti-inflammatory treatment"],
  ["Ranitidine", "Famotidine", "stomach acid reduction"],
  ["Montelukast", "Salbutamol", "asthma management"],
  ["Metoprolol", "Atenolol", "heart rate control"],
  ["Dolo 650", "Crocin Advance", "fever management"],
  ["Branded", "Generic", "medicine choice"],
];

const MEDICINE_GUIDES = [
  "Paracetamol", "Ibuprofen", "Amoxicillin", "Azithromycin", "Cetirizine", "Metformin",
  "Pantoprazole", "Omeprazole", "Atorvastatin", "Losartan", "Amlodipine", "Montelukast",
  "Dolo 650", "Crocin", "Aspirin", "Diclofenac", "Ciprofloxacin", "Doxycycline",
  "Levothyroxine", "Metoprolol", "Atenolol", "Ramipril", "Telmisartan", "Clopidogrel",
  "Ranitidine", "Domperidone", "Ondansetron", "Loperamide", "Albendazole", "Fluconazole",
  "Clotrimazole", "Betamethasone", "Hydrocortisone", "Calamine", "Mupirocin", "Acyclovir",
  "Vitamin D3", "Vitamin B12", "Folic Acid", "Iron Supplements", "Calcium Tablets", "Zinc",
  "Multivitamins", "Omega 3", "Probiotics", "Melatonin", "Biotin", "Glucosamine",
  "Antacid Gel", "ORS Powder",
];

const DISEASES = [
  { name: "Diabetes", type: "chronic" }, { name: "Hypertension", type: "chronic" },
  { name: "Asthma", type: "chronic" }, { name: "Thyroid Disorders", type: "chronic" },
  { name: "PCOD", type: "chronic" }, { name: "Arthritis", type: "chronic" },
  { name: "Migraine", type: "chronic" }, { name: "Depression", type: "mental" },
  { name: "Anxiety", type: "mental" }, { name: "Insomnia", type: "mental" },
  { name: "Common Cold", type: "acute" }, { name: "Flu", type: "acute" },
  { name: "Dengue", type: "acute" }, { name: "Malaria", type: "acute" },
  { name: "Typhoid", type: "acute" }, { name: "UTI", type: "acute" },
  { name: "Pneumonia", type: "acute" }, { name: "Gastritis", type: "acute" },
  { name: "Conjunctivitis", type: "acute" }, { name: "Sinusitis", type: "acute" },
  { name: "Bronchitis", type: "acute" }, { name: "Tonsillitis", type: "acute" },
  { name: "Kidney Stones", type: "chronic" }, { name: "Gallstones", type: "chronic" },
  { name: "Hepatitis", type: "acute" }, { name: "Jaundice", type: "acute" },
  { name: "Anemia", type: "chronic" }, { name: "Osteoporosis", type: "chronic" },
  { name: "Eczema", type: "chronic" }, { name: "Psoriasis", type: "chronic" },
  { name: "Acne", type: "chronic" }, { name: "Fungal Infections", type: "acute" },
  { name: "Food Poisoning", type: "acute" }, { name: "Acid Reflux", type: "chronic" },
  { name: "IBS", type: "chronic" }, { name: "Piles", type: "chronic" },
  { name: "Varicose Veins", type: "chronic" }, { name: "Gout", type: "chronic" },
  { name: "Vertigo", type: "acute" }, { name: "Bell's Palsy", type: "acute" },
];

const SYMPTOMS = [
  "Headache", "Stomach Pain", "Back Pain", "Chest Pain", "Joint Pain", "Neck Pain",
  "Knee Pain", "Shoulder Pain", "Fever", "Cough", "Cold", "Sore Throat",
  "Fatigue", "Dizziness", "Nausea", "Vomiting", "Diarrhea", "Constipation",
  "Bloating", "Heartburn", "Shortness of Breath", "Wheezing", "Sneezing",
  "Runny Nose", "Eye Pain", "Ear Pain", "Toothache", "Mouth Ulcers",
  "Hair Loss", "Dandruff", "Skin Rash", "Itching", "Acne", "Dark Circles",
  "Weight Gain", "Weight Loss", "Excessive Thirst", "Frequent Urination",
  "Swollen Feet", "Muscle Cramps", "Tingling Sensation", "Numbness",
  "Insomnia", "Anxiety", "Mood Swings", "Memory Loss", "Irregular Periods",
  "Heavy Bleeding", "Hot Flashes", "Night Sweats",
];

const FOODS_HEALTH = [
  "Diabetes", "High Blood Pressure", "Weight Loss", "Heart Health", "Immunity",
  "Strong Bones", "Healthy Skin", "Hair Growth", "Better Sleep", "Brain Health",
  "Gut Health", "Liver Health", "Kidney Health", "Eye Health", "Lung Health",
  "Anemia", "Thyroid", "PCOD", "Cholesterol", "Pregnancy",
  "Children Growth", "Elderly Nutrition", "Muscle Building", "Energy Boost",
  "Stress Relief",
];

const HOME_REMEDIES = [
  "Common Cold", "Cough", "Sore Throat", "Headache", "Acidity", "Bloating",
  "Constipation", "Indigestion", "Nausea", "Hiccups", "Toothache", "Mouth Ulcers",
  "Bad Breath", "Dark Circles", "Acne", "Dandruff", "Hair Fall", "Dry Skin",
  "Sunburn", "Insect Bites", "Minor Burns", "Muscle Pain", "Back Pain",
  "Period Cramps", "Fatigue", "Insomnia", "Stress", "Dehydration",
  "Body Odor", "Puffy Eyes",
];

const FITNESS = [
  "Walking 30 Minutes Daily", "Yoga for Beginners", "Yoga for Back Pain",
  "Desk Exercises", "Morning Stretching", "Breathing Exercises",
  "Pranayama Benefits", "Surya Namaskar", "Meditation for Stress",
  "Post-Pregnancy Exercise", "Exercise After 50", "Swimming Benefits",
  "Cycling Benefits", "Running for Weight Loss", "Home Workout Without Equipment",
  "Yoga for Diabetes", "Exercise for Heart Health", "Flexibility Training",
  "Balance Exercises for Elderly", "Core Strengthening", "Knee-Friendly Exercises",
  "Shoulder Exercises", "Posture Correction", "Eye Exercises for Screen Users",
  "Jaw Exercises for TMJ",
];

const LAB_TESTS = [
  "CBC", "HbA1c", "Lipid Profile", "Thyroid Profile", "Liver Function Test",
  "Kidney Function Test", "Urine Analysis", "Blood Sugar Fasting", "Blood Sugar PP",
  "Vitamin D Test", "Vitamin B12 Test", "Iron Studies", "ESR Test", "CRP Test",
  "Uric Acid Test", "Creatinine Test", "PSA Test", "Pap Smear", "Mammography",
  "ECG", "Echo Test", "Chest X-Ray", "MRI", "CT Scan", "Ultrasound",
];

const SEASONAL = [
  ["Monsoon", "monsoon", ["waterborne diseases", "dengue prevention", "food safety", "fungal infections", "humidity health"]],
  ["Summer", "summer", ["heat stroke prevention", "dehydration", "sunscreen importance", "summer diet", "AC health effects"]],
  ["Winter", "winter", ["cold prevention", "dry skin care", "joint pain", "immunity boost", "winter diet"]],
  ["Pollution Season", "pollution", ["air purifier", "lung protection", "N95 masks", "indoor plants", "breathing exercises"]],
];

const WOMENS_HEALTH = [
  "Menstrual Health", "PCOD Management", "Pregnancy Nutrition", "Iron Deficiency in Women",
  "Breast Self-Examination", "Cervical Cancer Screening", "Menopause Management",
  "UTI Prevention for Women", "Calcium Needs for Women", "Postpartum Recovery",
  "Birth Control Options", "Endometriosis", "Fibroids", "Hormonal Imbalance",
  "Fertility Tips", "Prenatal Vitamins", "Morning Sickness Remedies",
  "Gestational Diabetes", "Breastfeeding Nutrition", "Vaginal Health",
];

const CHILDRENS_HEALTH = [
  "Fever in Children", "Common Childhood Infections", "Vaccination Schedule India",
  "Child Nutrition", "Picky Eaters", "Screen Time Effects", "ADHD in Children",
  "Childhood Asthma", "Baby Teething", "Diaper Rash", "Childhood Obesity",
  "Growth Milestones", "Deworming in Children", "Ear Infections in Kids",
  "Tonsillitis in Children", "Hand Foot Mouth Disease", "Chicken Pox",
  "Measles Prevention", "Jaundice in Newborns", "Colic in Babies",
];

const ELDERLY_CARE = [
  "Joint Pain Management", "Bone Health After 60", "Memory Improvement",
  "Fall Prevention", "BP Management for Seniors", "Diabetes in Elderly",
  "Cataract Awareness", "Hearing Loss", "Denture Care", "Sleep Issues in Elderly",
  "Arthritis Management", "Osteoporosis Prevention", "Heart Health After 50",
  "Prostate Health", "Constipation in Elderly", "Medication Management",
  "Exercise for Seniors", "Nutrition for Elderly", "Dementia Awareness",
  "Loneliness and Health",
];

const MENTAL_HEALTH = [
  "Stress Management Techniques", "Anxiety Coping Strategies", "Depression Signs",
  "Meditation Benefits", "Sleep Hygiene", "Digital Detox", "Work-Life Balance",
  "Burnout Prevention", "Anger Management", "Grief and Loss",
  "Social Media and Mental Health", "Mindfulness for Beginners", "Journaling Benefits",
  "Therapy Types", "OCD Awareness", "Panic Attack Management",
  "Seasonal Affective Disorder", "Body Image Issues", "Addiction Recovery",
  "Emotional Eating",
];

const FIRST_AID = [
  "Burns", "Cuts and Wounds", "Sprains", "Fractures", "Snake Bites",
  "Insect Stings", "Drowning Rescue", "Choking", "Nosebleed", "Electric Shock",
  "Heat Stroke", "Hypothermia", "Poisoning", "Allergic Reaction", "Fainting",
  "Eye Injury", "Dog Bite", "CPR Basics", "Seizures", "Bleeding Control",
];

const SKIN_HAIR = [
  "Acne Treatment", "Anti-Aging Tips", "Sunscreen Guide", "Moisturizer Selection",
  "Dark Spots Removal", "Under Eye Care", "Lip Care", "Hand Care",
  "Foot Care", "Nail Health", "Hair Oil Benefits", "Shampoo Selection",
  "Hair Coloring Safety", "Scalp Care", "Beard Care",
  "Stretch Marks", "Cellulite", "Warts Removal", "Mole Awareness", "Vitiligo Awareness",
];

const DENTAL = [
  "Brushing Technique", "Flossing Guide", "Mouthwash Benefits", "Cavity Prevention",
  "Gum Disease", "Wisdom Tooth", "Teeth Whitening", "Bad Breath Causes",
  "Dental Implants", "Braces Care", "Root Canal", "Tooth Sensitivity",
  "Oral Cancer Signs", "Tongue Cleaning", "Jaw Pain",
];

const WORKPLACE = [
  "Desk Posture", "Eye Strain from Screens", "Carpal Tunnel Prevention",
  "Office Ergonomics", "Lunch Ideas for Office", "Walking Meetings",
  "Stress at Work", "Night Shift Health", "Standing Desk Benefits",
  "Healthy Snacking at Work", "Water Intake at Work", "Back Pain from Sitting",
  "AC and Health", "Office Air Quality", "Work From Home Health",
];

const TRAVEL = [
  "Motion Sickness", "Travel Vaccination", "Jet Lag", "Altitude Sickness",
  "Deep Vein Thrombosis", "Travel First Aid Kit", "Food Safety While Traveling",
  "Malaria Prevention for Travelers", "Traveler's Diarrhea", "Sun Protection",
];

const AYURVEDA = [
  "Turmeric Benefits", "Ashwagandha Uses", "Tulsi Health Benefits",
  "Triphala Guide", "Giloy Benefits", "Amla Benefits", "Neem Uses",
  "Brahmi for Memory", "Shatavari Benefits", "Chyawanprash Benefits",
  "Ayurvedic Morning Routine", "Oil Pulling", "Tongue Scraping",
  "Ayurvedic Diet Principles", "Dosha Types", "Panchakarma",
  "Kadha Recipe", "Ayurvedic Sleep Tips", "Ghee Benefits", "Jaggery Benefits",
];

// ─── CONTENT GENERATORS ───
function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120);
}

function generateMedicineComparison(med1, med2, purpose) {
  return {
    slug: slugify(`${med1}-vs-${med2}-which-is-better`),
    title: `${med1} vs ${med2}: Which Is Better for ${purpose.charAt(0).toUpperCase() + purpose.slice(1)}?`,
    metaDescription: `Compare ${med1} and ${med2} for ${purpose}. Learn about uses, side effects, safety, and which one is right for you. Expert guide by GoDavaii.`,
    category: "Medicine Guide",
    tags: [med1.toLowerCase(), med2.toLowerCase(), purpose, "comparison"],
    readTime: "5 min read",
    sections: [
      { heading: "Overview", content: `${med1} and ${med2} are both commonly used for ${purpose}. While they may seem similar, they have important differences in how they work, their side effects, and when each is preferred. Understanding these differences can help you and your doctor make the best choice for your health needs.` },
      { heading: `What is ${med1}?`, content: `${med1} is a widely used medication for ${purpose}. It is available in various forms including tablets, capsules, and syrups. It works by targeting specific pathways in the body to provide relief. Your doctor may prescribe it based on your specific condition and medical history.` },
      { heading: `What is ${med2}?`, content: `${med2} is another popular medication used for ${purpose}. It may work through a slightly different mechanism compared to ${med1}. It is also available in multiple forms and dosages. The choice between the two often depends on individual patient factors and response to treatment.` },
      { heading: "Key Differences", content: `The main differences between ${med1} and ${med2} lie in their onset of action, duration of effect, and side effect profiles. Some patients respond better to one over the other. Cost and availability may also vary. Always consult your doctor before switching between medications.` },
      { heading: "Side Effects Comparison", content: `Both ${med1} and ${med2} can cause side effects, though these vary from person to person. Common side effects should be monitored, and any severe reactions require immediate medical attention. Your doctor can help weigh the benefits against potential risks for your specific situation.` },
      { heading: "Which Should You Choose?", content: `The best choice between ${med1} and ${med2} depends on your individual health profile, other medications you take, and your doctor's recommendation. Never self-medicate or switch medicines without consulting a healthcare professional. Ask GoDavaii AI for more personalized guidance.` },
    ],
    faqs: [
      { q: `Can I take ${med1} and ${med2} together?`, a: `Taking ${med1} and ${med2} together should only be done under medical supervision. Consult your doctor before combining any medications.` },
      { q: `Which has fewer side effects: ${med1} or ${med2}?`, a: `Side effects vary by individual. Both medications are generally well-tolerated when used as directed. Your doctor can advise based on your health history.` },
      { q: `Is generic ${med1} as effective as branded?`, a: `Yes, generic medicines contain the same active ingredients and are equally effective. They are tested for quality and safety by regulatory authorities.` },
    ],
  };
}

function generateMedicineGuide(medicine) {
  return {
    slug: slugify(`${medicine}-uses-side-effects-dosage-guide`),
    title: `${medicine}: Uses, Side Effects, Dosage & Complete Guide`,
    metaDescription: `Complete guide to ${medicine} — uses, side effects, dosage, precautions, and interactions. Expert health information by GoDavaii AI.`,
    category: "Medicine Guide",
    tags: [medicine.toLowerCase(), "medicine guide", "uses", "side effects", "dosage"],
    readTime: "6 min read",
    sections: [
      { heading: `What is ${medicine}?`, content: `${medicine} is a commonly prescribed medication used in the treatment of various health conditions. It is available in multiple formulations and strengths. Understanding how this medicine works, its benefits, and potential risks is important for safe and effective use.` },
      { heading: "Uses and Benefits", content: `${medicine} is prescribed for specific health conditions as determined by your doctor. It works by targeting particular biological pathways to provide therapeutic benefit. The effectiveness may vary based on individual response, dosage, and adherence to the prescribed regimen.` },
      { heading: "Dosage Information", content: `The dosage of ${medicine} depends on your age, weight, health condition, and response to treatment. Always follow your doctor's prescribed dosage. Do not increase, decrease, or stop the medication without medical advice. Take it at the same time each day for best results.` },
      { heading: "Side Effects", content: `Like all medications, ${medicine} may cause side effects in some people. Common side effects are usually mild and temporary. However, if you experience any severe or persistent side effects, contact your doctor immediately. Report any unusual symptoms during treatment.` },
      { heading: "Precautions and Warnings", content: `Before taking ${medicine}, inform your doctor about all other medications you are taking, any allergies, and your complete medical history. Special caution is needed during pregnancy, breastfeeding, and in patients with liver or kidney conditions. Avoid alcohol unless your doctor says otherwise.` },
      { heading: "Storage and Handling", content: `Store ${medicine} in a cool, dry place away from direct sunlight. Keep it out of reach of children. Do not use the medicine after its expiry date. Dispose of unused medicine properly as per local regulations or ask your pharmacist for guidance.` },
    ],
    faqs: [
      { q: `What is ${medicine} used for?`, a: `${medicine} is used to treat specific health conditions as prescribed by your doctor. It works by targeting particular biological pathways. Consult your doctor for personalized advice.` },
      { q: `What are the common side effects of ${medicine}?`, a: `Common side effects may include mild digestive discomfort, headache, or dizziness. Most side effects are temporary. Consult your doctor if they persist or worsen.` },
      { q: `Can I take ${medicine} without a doctor's prescription?`, a: `It is always recommended to consult a doctor before taking any medication. Self-medication can be harmful and may mask underlying health conditions that need proper diagnosis.` },
    ],
  };
}

function generateDiseaseArticle(disease) {
  const typeText = disease.type === "chronic" ? "a long-term condition that requires ongoing management" : "a condition that can develop suddenly and requires timely treatment";
  return {
    slug: slugify(`${disease.name}-causes-symptoms-treatment-guide`),
    title: `${disease.name}: Causes, Symptoms, Treatment & Prevention Guide`,
    metaDescription: `Everything you need to know about ${disease.name} — causes, symptoms, diagnosis, treatment options, and prevention tips. Expert health guide by GoDavaii.`,
    category: "Disease Guide",
    tags: [disease.name.toLowerCase(), "symptoms", "treatment", "causes", "prevention"],
    readTime: "7 min read",
    sections: [
      { heading: `What is ${disease.name}?`, content: `${disease.name} is ${typeText}. It affects many people in India and worldwide. Understanding the condition, its risk factors, and available treatments can help you manage it effectively and improve your quality of life.` },
      { heading: "Causes and Risk Factors", content: `${disease.name} can be caused by various factors including genetics, lifestyle choices, environmental factors, and other underlying health conditions. Certain risk factors may increase your likelihood of developing this condition. Identifying and addressing these factors early can help with prevention.` },
      { heading: "Common Symptoms", content: `The symptoms of ${disease.name} can vary from person to person. Some people may experience mild symptoms while others may have more severe manifestations. Early recognition of symptoms is important for timely diagnosis and treatment. Pay attention to any changes in your health and consult a doctor promptly.` },
      { heading: "Diagnosis", content: `${disease.name} is typically diagnosed through a combination of physical examination, medical history review, and diagnostic tests. Your doctor may order blood tests, imaging studies, or other specific tests to confirm the diagnosis. Early diagnosis leads to better treatment outcomes.` },
      { heading: "Treatment Options", content: `Treatment for ${disease.name} may include medications, lifestyle modifications, and in some cases, surgical interventions. Your doctor will create a personalized treatment plan based on the severity of your condition. Adherence to the treatment plan is crucial for managing the condition effectively.` },
      { heading: "Prevention Tips", content: `While not all cases of ${disease.name} can be prevented, maintaining a healthy lifestyle can significantly reduce your risk. This includes regular exercise, a balanced diet, adequate sleep, stress management, and regular health check-ups. Ask GoDavaii AI for personalized prevention advice.` },
    ],
    faqs: [
      { q: `Is ${disease.name} curable?`, a: `${disease.type === "chronic" ? `${disease.name} is typically managed rather than cured. With proper treatment and lifestyle changes, most people can lead normal, healthy lives.` : `${disease.name} is generally treatable and most people recover fully with appropriate medical care and rest.`}` },
      { q: `What are the early signs of ${disease.name}?`, a: `Early signs can vary but may include subtle changes in how you feel. Regular health check-ups help with early detection. Consult a doctor if you notice any unusual symptoms.` },
      { q: `Can ${disease.name} be prevented?`, a: `While not all cases can be prevented, maintaining a healthy lifestyle, regular exercise, balanced diet, and routine health screenings can significantly reduce your risk.` },
    ],
  };
}

function generateSymptomArticle(symptom) {
  return {
    slug: slugify(`${symptom}-causes-when-to-see-doctor`),
    title: `${symptom}: Common Causes, Home Care & When to See a Doctor`,
    metaDescription: `Why do you have ${symptom.toLowerCase()}? Learn about common causes, home remedies, warning signs, and when to consult a doctor. Health guide by GoDavaii.`,
    category: "Health Tips",
    tags: [symptom.toLowerCase(), "causes", "home remedies", "when to see doctor"],
    readTime: "5 min read",
    sections: [
      { heading: `Why Do You Have ${symptom}?`, content: `${symptom} is one of the most common health complaints. It can be caused by various factors ranging from minor issues to conditions that need medical attention. Understanding the possible causes can help you determine the right course of action and when to seek professional help.` },
      { heading: "Common Causes", content: `${symptom} can result from lifestyle factors, infections, nutritional deficiencies, stress, or underlying health conditions. The cause often determines the appropriate treatment. Keeping track of when your symptoms occur and what makes them better or worse can be helpful for your doctor.` },
      { heading: "Home Care Tips", content: `For mild ${symptom.toLowerCase()}, some home care measures may provide relief. Rest, staying hydrated, and maintaining a healthy routine can help. However, these are supportive measures and should not replace professional medical advice, especially if symptoms persist or worsen.` },
      { heading: "Warning Signs", content: `While ${symptom.toLowerCase()} is often harmless, certain warning signs indicate you should see a doctor immediately. These include sudden onset, severe intensity, accompanying symptoms like fever or breathing difficulty, or symptoms that persist beyond a few days despite home care.` },
      { heading: "When to See a Doctor", content: `Consult a doctor if your ${symptom.toLowerCase()} is severe, persistent, recurring, or accompanied by other concerning symptoms. Early medical consultation can prevent complications and ensure proper diagnosis. You can also ask GoDavaii AI for initial guidance before your doctor visit.` },
    ],
    faqs: [
      { q: `What is the most common cause of ${symptom.toLowerCase()}?`, a: `The most common causes vary by individual but often include lifestyle factors, stress, minor infections, or nutritional issues. A doctor can determine the specific cause through proper evaluation.` },
      { q: `When should I worry about ${symptom.toLowerCase()}?`, a: `Seek medical attention if the ${symptom.toLowerCase()} is severe, lasts more than a few days, worsens over time, or is accompanied by other symptoms like high fever or difficulty breathing.` },
      { q: `Can stress cause ${symptom.toLowerCase()}?`, a: `Yes, stress can contribute to many physical symptoms including ${symptom.toLowerCase()}. Managing stress through relaxation techniques, exercise, and adequate sleep can help reduce symptoms.` },
    ],
  };
}

function generateFoodArticle(condition) {
  return {
    slug: slugify(`best-foods-for-${condition}`),
    title: `Best Foods for ${condition}: What to Eat and Avoid (Indian Diet)`,
    metaDescription: `Discover the best Indian foods for ${condition.toLowerCase()}. Learn what to eat, what to avoid, and diet tips. Nutrition guide by GoDavaii health experts.`,
    category: "Nutrition",
    tags: [condition.toLowerCase(), "diet", "nutrition", "indian food", "healthy eating"],
    readTime: "6 min read",
    sections: [
      { heading: `Diet and ${condition}`, content: `What you eat plays a crucial role in managing ${condition.toLowerCase()}. A well-planned diet can help control symptoms, prevent complications, and improve overall health. Indian cuisine offers many nutritious options that can be part of a healthy eating plan for ${condition.toLowerCase()}.` },
      { heading: "Foods to Include", content: `Include plenty of whole grains, fresh vegetables, lean proteins, and healthy fats in your diet. Traditional Indian foods like dal, sabzi, roti made from whole wheat, and curd can be excellent choices. Seasonal fruits and locally available vegetables provide essential vitamins and minerals.` },
      { heading: "Foods to Avoid", content: `Certain foods may worsen ${condition.toLowerCase()} or interfere with treatment. Processed foods, excessive sugar, refined carbohydrates, and unhealthy fats should be limited. Your specific dietary restrictions depend on your condition and should be discussed with your doctor or nutritionist.` },
      { heading: "Indian Diet Plan Tips", content: `Start your day with a nutritious breakfast including options like poha, upma, idli, or oats. Include a variety of dals and vegetables in lunch and dinner. Use healthy cooking methods like steaming, grilling, and minimal oil cooking. Stay hydrated with water, buttermilk, or coconut water.` },
      { heading: "Supplements and Superfoods", content: `Some supplements and superfoods may support ${condition.toLowerCase()} management. Turmeric, amla, flaxseeds, and nuts are commonly recommended. However, always consult your doctor before starting any supplements, as they may interact with medications you are taking.` },
    ],
    faqs: [
      { q: `What is the best Indian diet for ${condition.toLowerCase()}?`, a: `A balanced diet with whole grains, fresh vegetables, lean proteins, and healthy fats is recommended. Traditional Indian meals with dal, sabzi, and chapati can be very healthy when prepared with less oil.` },
      { q: `Should I avoid rice if I have ${condition.toLowerCase()}?`, a: `Not necessarily. Brown rice or limited portions of white rice can be part of a healthy diet. Consult a nutritionist for personalized advice based on your specific health needs.` },
      { q: `Can diet alone manage ${condition.toLowerCase()}?`, a: `Diet is an important part of management but may not be sufficient alone. A combination of proper nutrition, regular exercise, medication (if prescribed), and lifestyle changes gives the best results.` },
    ],
  };
}

function generateHomeRemedyArticle(condition) {
  return {
    slug: slugify(`home-remedies-for-${condition}`),
    title: `${condition}: 10 Effective Home Remedies That Actually Work`,
    metaDescription: `Try these proven home remedies for ${condition.toLowerCase()}. Natural relief using kitchen ingredients, Ayurvedic tips, and lifestyle changes. Safe and effective.`,
    category: "Home Remedies",
    tags: [condition.toLowerCase(), "home remedies", "natural treatment", "ayurvedic", "kitchen remedies"],
    readTime: "5 min read",
    sections: [
      { heading: `Natural Relief for ${condition}`, content: `${condition} is a common health issue that can often be managed at home with simple, natural remedies. These remedies have been used in Indian households for generations and are supported by traditional knowledge. While they can provide relief, severe cases should always be seen by a doctor.` },
      { heading: "Kitchen Remedies", content: `Your kitchen is full of ingredients with healing properties. Honey, ginger, turmeric, tulsi, black pepper, and jeera are commonly used for various ailments. These natural ingredients can be prepared as teas, pastes, or mixtures to provide relief from mild symptoms of ${condition.toLowerCase()}.` },
      { heading: "Ayurvedic Approaches", content: `Ayurveda offers time-tested approaches for ${condition.toLowerCase()}. Traditional formulations using herbs and spices can complement modern treatment. However, it is important to use these under guidance and not as a replacement for prescribed medication, especially for serious conditions.` },
      { heading: "Lifestyle Changes", content: `Simple lifestyle modifications can help prevent and manage ${condition.toLowerCase()}. This includes maintaining a regular routine, getting adequate sleep, staying physically active, managing stress, and eating a balanced diet. Small changes can make a big difference in your health.` },
      { heading: "When Home Remedies Are Not Enough", content: `While home remedies can help with mild symptoms, they are not a substitute for medical treatment. If your ${condition.toLowerCase()} is severe, persistent, or getting worse, consult a doctor. Some conditions require prescription medication or professional medical intervention.` },
    ],
    faqs: [
      { q: `Are home remedies safe for ${condition.toLowerCase()}?`, a: `Most common home remedies are safe when used appropriately. However, if you have allergies, are pregnant, or are on medication, consult your doctor before trying any home remedy.` },
      { q: `How long do home remedies take to work for ${condition.toLowerCase()}?`, a: `Home remedies may provide relief within a few hours to a few days depending on the severity. If symptoms don't improve within 2-3 days, consult a doctor.` },
      { q: `Can I use home remedies along with prescribed medicines?`, a: `Some home remedies can complement medical treatment, but always inform your doctor about any remedies you are using to avoid potential interactions.` },
    ],
  };
}

function generateFitnessArticle(topic) {
  return {
    slug: slugify(`${topic}-health-benefits-guide`),
    title: `${topic}: Health Benefits, How to Start & Expert Tips`,
    metaDescription: `Learn about the health benefits of ${topic.toLowerCase()}. Step-by-step guide for beginners, tips for consistency, and safety precautions.`,
    category: "Fitness",
    tags: [topic.toLowerCase().split(" ")[0], "fitness", "exercise", "health benefits", "beginners"],
    readTime: "5 min read",
    sections: [
      { heading: `Why ${topic}?`, content: `${topic} offers numerous health benefits including improved cardiovascular health, better mental well-being, weight management, and increased energy levels. Regular practice can help prevent chronic diseases and improve quality of life at any age.` },
      { heading: "Health Benefits", content: `Regular practice of ${topic.toLowerCase()} can improve heart health, strengthen muscles and bones, enhance flexibility, boost immunity, and reduce stress. It can also help manage conditions like diabetes, hypertension, and anxiety. The benefits increase with consistent practice over time.` },
      { heading: "How to Get Started", content: `If you are new to ${topic.toLowerCase()}, start slowly and gradually increase intensity. Begin with shorter sessions and work your way up. Proper form and technique are more important than intensity. Consider consulting a fitness professional for personalized guidance.` },
      { heading: "Tips for Consistency", content: `Consistency is key to seeing results. Set realistic goals, create a routine, track your progress, and find a workout buddy for motivation. Make ${topic.toLowerCase()} enjoyable by varying your routine and celebrating small milestones along the way.` },
      { heading: "Safety Precautions", content: `Always warm up before and cool down after exercise. Listen to your body and rest when needed. Stay hydrated and wear appropriate gear. If you have any health conditions, consult your doctor before starting a new exercise routine.` },
    ],
    faqs: [
      { q: `How often should I practice ${topic.toLowerCase()}?`, a: `For most people, 3-5 times per week is ideal. Start with 2-3 times and gradually increase. Consistency matters more than frequency.` },
      { q: `Can beginners start with ${topic.toLowerCase()}?`, a: `Absolutely! ${topic} can be adapted for all fitness levels. Start with basic movements and gradually progress as your strength and confidence improve.` },
      { q: `Is ${topic.toLowerCase()} safe for elderly people?`, a: `Yes, with proper modifications. Elderly individuals should start slowly, use support if needed, and consult their doctor before beginning any new exercise program.` },
    ],
  };
}

function generateLabTestArticle(test) {
  return {
    slug: slugify(`${test}-test-normal-range-how-to-read`),
    title: `${test} Test: Normal Range, How to Read Results & Why It's Done`,
    metaDescription: `Understand your ${test} test results. Learn about normal ranges, what abnormal values mean, preparation tips, and when this test is recommended.`,
    category: "Lab Tests",
    tags: [test.toLowerCase(), "lab test", "normal range", "blood test", "diagnosis"],
    readTime: "6 min read",
    sections: [
      { heading: `What is ${test} Test?`, content: `The ${test} test is a diagnostic test used to evaluate specific aspects of your health. It helps doctors assess organ function, detect diseases, monitor treatment effectiveness, and screen for health conditions. Understanding what this test measures can help you better communicate with your doctor.` },
      { heading: "Why Is It Done?", content: `Your doctor may order a ${test} test as part of a routine health check-up, to investigate specific symptoms, to monitor a known condition, or to check the effectiveness of treatment. Regular testing helps detect health issues early when they are most treatable.` },
      { heading: "Normal Ranges", content: `Normal ranges for ${test} can vary based on age, gender, and the laboratory performing the test. Your doctor interprets the results in the context of your overall health. Values slightly outside the normal range may not always indicate a problem, so always discuss results with your doctor.` },
      { heading: "How to Read Your Results", content: `When reading your ${test} results, look at each parameter and compare it with the reference range provided by the lab. Values marked as 'H' (high) or 'L' (low) need attention. However, a single abnormal value doesn't necessarily mean disease. Your doctor considers the complete picture.` },
      { heading: "Preparation Tips", content: `Some tests require fasting for 8-12 hours before sample collection. Avoid heavy exercise, alcohol, and certain medications before the test as advised. Stay hydrated with water unless instructed otherwise. Follow all specific instructions provided by your doctor or the lab.` },
    ],
    faqs: [
      { q: `What is the normal range for ${test}?`, a: `Normal ranges vary by age, gender, and lab. Your report will include reference ranges specific to the testing laboratory. Discuss any abnormal values with your doctor for proper interpretation.` },
      { q: `Do I need to fast before a ${test} test?`, a: `Fasting requirements depend on the specific test. Some tests require 8-12 hours of fasting while others do not. Your doctor or lab will provide specific instructions.` },
      { q: `How often should I get a ${test} test done?`, a: `The frequency depends on your age, health conditions, and risk factors. Generally, annual health check-ups include basic tests. Your doctor may recommend more frequent testing if you have specific health concerns.` },
    ],
  };
}

function generateSeasonalArticle(season, seasonSlug, topics) {
  return topics.map((topic, i) => ({
    slug: slugify(`${season}-${topic}-health-tips-india`),
    title: `${topic.charAt(0).toUpperCase() + topic.slice(1)} in ${season}: Health Tips for India`,
    metaDescription: `Essential ${season.toLowerCase()} health tips for ${topic} in India. Prevention, symptoms to watch, and practical advice for staying healthy during ${season.toLowerCase()}.`,
    category: "Health Tips",
    tags: [seasonSlug, topic.toLowerCase(), "seasonal health", "india", "prevention"],
    readTime: "4 min read",
    sections: [
      { heading: `${season} and ${topic.charAt(0).toUpperCase() + topic.slice(1)}`, content: `${season} in India brings specific health challenges related to ${topic}. Understanding these seasonal health risks and taking preventive measures can help you and your family stay healthy throughout the season. Climate, humidity, and temperature changes all play a role.` },
      { heading: "Prevention Tips", content: `Taking proactive steps to prevent ${topic}-related health issues during ${season.toLowerCase()} is essential. This includes maintaining hygiene, staying hydrated, eating fresh food, and being aware of common seasonal illnesses. Simple precautions can significantly reduce your health risks.` },
      { heading: "Symptoms to Watch", content: `During ${season.toLowerCase()}, be alert for symptoms related to ${topic}. Early recognition and treatment can prevent complications. Common warning signs include fever, body aches, digestive issues, and skin problems. Don't ignore persistent symptoms.` },
      { heading: "What to Do", content: `If you experience health issues related to ${topic} during ${season.toLowerCase()}, take appropriate home care measures and consult a doctor if symptoms are severe or persistent. Keep essential medicines at home and maintain good hygiene practices throughout the season.` },
    ],
    faqs: [
      { q: `How can I prevent ${topic} during ${season.toLowerCase()}?`, a: `Maintain hygiene, eat fresh home-cooked food, stay hydrated, and follow seasonal health guidelines. Regular hand washing and avoiding contaminated water are especially important.` },
      { q: `When should I see a doctor for ${topic} in ${season.toLowerCase()}?`, a: `See a doctor if symptoms are severe, persistent (more than 2-3 days), or accompanied by high fever, dehydration, or difficulty breathing.` },
      { q: `Are children more at risk during ${season.toLowerCase()}?`, a: `Yes, children and elderly are more vulnerable to seasonal health issues. Take extra precautions for them including proper nutrition, hydration, and timely medical consultation.` },
    ],
  }));
}

function generateGenericArticle(title, category, tags, sections, faqs) {
  return {
    slug: slugify(title),
    title,
    metaDescription: `${title}. Expert health guide with practical tips, prevention strategies, and when to consult a doctor. Trusted health information by GoDavaii.`,
    category,
    tags,
    readTime: `${Math.floor(Math.random() * 4) + 4} min read`,
    sections,
    faqs,
  };
}

function generateTopicArticle(topic, category, tagBase) {
  return {
    slug: slugify(`${topic}-complete-guide-india`),
    title: `${topic}: Complete Guide for Indians`,
    metaDescription: `Everything about ${topic.toLowerCase()} — causes, management tips, treatment options, and expert advice. Comprehensive health guide by GoDavaii.`,
    category,
    tags: [tagBase, topic.toLowerCase().split(" ")[0], "health guide", "india"],
    readTime: `${Math.floor(Math.random() * 4) + 4} min read`,
    sections: [
      { heading: `Understanding ${topic}`, content: `${topic} is an important health topic that affects many people in India. Getting the right information and understanding your options is the first step toward better health. This guide covers everything you need to know in simple, easy-to-understand language.` },
      { heading: "Key Information", content: `There are several important aspects of ${topic.toLowerCase()} that everyone should be aware of. From risk factors and early signs to available treatments and prevention strategies, being informed empowers you to make better health decisions for yourself and your family.` },
      { heading: "Management and Treatment", content: `Managing ${topic.toLowerCase()} effectively requires a combination of medical treatment, lifestyle changes, and regular monitoring. Work closely with your healthcare provider to develop a plan that works for you. Consistency in following the treatment plan is crucial for good outcomes.` },
      { heading: "Tips for Indians", content: `The Indian context brings unique considerations for ${topic.toLowerCase()}, including dietary habits, climate factors, cultural practices, and healthcare access. Traditional remedies can complement modern medicine when used wisely. Always consult qualified healthcare providers for serious concerns.` },
      { heading: "When to Seek Help", content: `Know when to seek professional medical help for ${topic.toLowerCase()}. Don't delay consulting a doctor when symptoms are severe, persistent, or getting worse. Early intervention often leads to better outcomes. You can also ask GoDavaii AI for initial guidance and information.` },
    ],
    faqs: [
      { q: `What should I know about ${topic.toLowerCase()}?`, a: `Understanding the basics, risk factors, and available treatment options is important. Stay informed through reliable sources and consult healthcare professionals for personalized advice.` },
      { q: `Is ${topic.toLowerCase()} common in India?`, a: `Yes, ${topic.toLowerCase()} is a significant health concern in India. Awareness, prevention, and early treatment are key to managing it effectively.` },
      { q: `Where can I get help for ${topic.toLowerCase()}?`, a: `Consult your doctor, visit a specialist, or ask GoDavaii AI for initial guidance. Don't hesitate to seek professional help when needed.` },
    ],
  };
}

// ─── GENERATE ALL ARTICLES ───
function generateAllArticles() {
  const all = [];
  const slugSet = new Set();

  function addArticle(article) {
    if (!slugSet.has(article.slug)) {
      slugSet.add(article.slug);
      all.push(article);
    }
  }

  // Medicine comparisons (15)
  MEDICINE_COMPARISONS.forEach(([m1, m2, purpose]) => addArticle(generateMedicineComparison(m1, m2, purpose)));

  // Medicine guides (50)
  MEDICINE_GUIDES.forEach((med) => addArticle(generateMedicineGuide(med)));

  // Disease articles (40)
  DISEASES.forEach((d) => addArticle(generateDiseaseArticle(d)));

  // Symptom articles (50)
  SYMPTOMS.forEach((s) => addArticle(generateSymptomArticle(s)));

  // Food/nutrition articles (25)
  FOODS_HEALTH.forEach((f) => addArticle(generateFoodArticle(f)));

  // Home remedies (30)
  HOME_REMEDIES.forEach((r) => addArticle(generateHomeRemedyArticle(r)));

  // Fitness articles (25)
  FITNESS.forEach((f) => addArticle(generateFitnessArticle(f)));

  // Lab test guides (25)
  LAB_TESTS.forEach((t) => addArticle(generateLabTestArticle(t)));

  // Seasonal articles (20)
  SEASONAL.forEach(([season, slug, topics]) => {
    generateSeasonalArticle(season, slug, topics).forEach((a) => addArticle(a));
  });

  // Women's health (20)
  WOMENS_HEALTH.forEach((t) => addArticle(generateTopicArticle(t, "Women's Health", "women")));

  // Children's health (20)
  CHILDRENS_HEALTH.forEach((t) => addArticle(generateTopicArticle(t, "Children's Health", "children")));

  // Elderly care (20)
  ELDERLY_CARE.forEach((t) => addArticle(generateTopicArticle(t, "Elderly Care", "elderly")));

  // Mental health (20)
  MENTAL_HEALTH.forEach((t) => addArticle(generateTopicArticle(t, "Mental Health", "mental health")));

  // First aid (20)
  FIRST_AID.forEach((t) => addArticle(generateTopicArticle(`First Aid for ${t}`, "Health Tips", "first aid")));

  // Skin & Hair (20)
  SKIN_HAIR.forEach((t) => addArticle(generateTopicArticle(t, "Health Tips", "skin care")));

  // Dental (15)
  DENTAL.forEach((t) => addArticle(generateTopicArticle(t, "Health Tips", "dental")));

  // Workplace health (15)
  WORKPLACE.forEach((t) => addArticle(generateTopicArticle(t, "Health Tips", "workplace")));

  // Travel health (10)
  TRAVEL.forEach((t) => addArticle(generateTopicArticle(t, "Health Tips", "travel")));

  // Ayurveda (20)
  AYURVEDA.forEach((t) => addArticle(generateTopicArticle(t, "Ayurveda", "ayurveda")));

  // Additional disease-specific diet articles
  DISEASES.forEach((d) => addArticle(generateFoodArticle(d.name)));

  // Additional home remedies for diseases
  DISEASES.slice(0, 20).forEach((d) => addArticle(generateHomeRemedyArticle(d.name)));

  // Fitness for specific conditions
  ["Diabetes", "Heart Disease", "Back Pain", "Arthritis", "PCOD", "Stress", "Obesity", "Hypertension", "Asthma", "Depression",
   "Knee Pain", "Insomnia", "Thyroid", "Cholesterol", "Pregnancy", "Elderly", "Children", "Office Workers", "Weight Loss", "Muscle Building"
  ].forEach((c) => addArticle(generateFitnessArticle(`Exercise for ${c}`)));

  // More symptom articles with "at night" / "in morning" variations
  ["Headache at Night", "Back Pain in Morning", "Stomach Pain After Eating", "Cough at Night", "Leg Pain While Walking",
   "Chest Pain During Exercise", "Joint Pain in Winter", "Eye Pain from Screen", "Neck Pain from Sleeping Wrong",
   "Shoulder Pain While Lifting", "Knee Pain While Climbing Stairs", "Hip Pain While Sitting", "Wrist Pain from Typing",
   "Foot Pain in Morning", "Jaw Pain While Chewing", "Rib Pain While Breathing", "Arm Pain and Numbness",
   "Lower Back Pain While Standing", "Upper Back Pain from Posture", "Thigh Pain After Walking",
  ].forEach((s) => addArticle(generateSymptomArticle(s)));

  // Indian-specific health articles
  [
    "Pollution and Health in Indian Cities", "Water Purification Methods for Indian Homes",
    "Affordable Health Checkup Packages in India", "Government Health Schemes in India",
    "Ayush Healthcare System in India", "Generic Medicine Stores in India",
    "Health Insurance Guide for Indians", "Emergency Helpline Numbers in India",
    "Blood Donation Guide India", "Organ Donation Awareness India",
    "Yoga Day Health Benefits", "Indian Spices with Medicinal Properties",
    "Junk Food Impact on Indian Youth", "Air Quality Index and Health",
    "Noise Pollution Health Effects", "Pesticides in Indian Food",
    "Safe Drinking Water Standards India", "Indian Traditional Medicine Systems",
    "Rural Healthcare Challenges India", "Telemedicine Benefits India",
    "COVID Prevention Best Practices", "Post COVID Recovery Tips",
    "Long COVID Symptoms and Management", "Vaccine Myths and Facts India",
    "Digital Health Records India", "Pharmacy Regulations India",
    "Online Medicine Ordering Safety", "AI in Healthcare India",
    "Mental Health Stigma India", "Disability Rights Healthcare India",
  ].forEach((t) => addArticle(generateTopicArticle(t, "Health Tips", "india")));

  // Medicine safety articles
  [
    "How to Read Medicine Labels", "Medicine Expiry Date Guide",
    "Drug Interaction Dangers", "Over-the-Counter Medicine Safety",
    "Antibiotic Resistance Prevention", "Pain Killer Safety Guide",
    "Sleeping Pills Risks", "Self-Medication Dangers",
    "Medicine Storage Tips", "Children Medicine Safety",
    "Pregnancy Safe Medicines", "Elderly Medicine Management",
    "Generic vs Branded Medicines India", "Online Pharmacy Safety Tips",
    "Ayurvedic Medicine Interactions", "Steroid Medicine Side Effects",
    "Blood Thinner Precautions", "Diabetes Medicine Guide",
    "BP Medicine Timing", "Thyroid Medicine Tips",
  ].forEach((t) => addArticle(generateTopicArticle(t, "Medicine Guide", "medicine safety")));

  // More nutrition articles
  [
    "Breakfast Ideas for Busy Indians", "Healthy Tiffin Ideas for Office",
    "Protein Rich Indian Vegetarian Foods", "Iron Rich Foods Indian Diet",
    "Calcium Rich Foods for Indians", "Fiber Rich Indian Foods",
    "Low Calorie Indian Snacks", "Sugar Free Desserts Indian",
    "Gluten Free Indian Food Options", "Lactose Free Diet India",
    "Keto Diet Indian Version", "Intermittent Fasting Guide India",
    "Superfoods Available in India", "Budget Healthy Eating India",
    "Meal Prep Ideas Indian", "Healthy Street Food Alternatives",
    "Detox Water Recipes", "Smoothie Recipes for Health",
    "Healthy Chai Alternatives", "Millets Benefits and Recipes",
  ].forEach((t) => addArticle(generateTopicArticle(t, "Nutrition", "nutrition")));

  // MORE MEDICINES (100+)
  [
    "Cefixime", "Levofloxacin", "Ofloxacin", "Norfloxacin", "Nitrofurantoin",
    "Rifaximin", "Tinidazole", "Secnidazole", "Ornidazole", "Ivermectin",
    "Hydroxychloroquine", "Prednisolone", "Dexamethasone", "Methylprednisolone",
    "Budesonide", "Fluticasone", "Beclomethasone", "Mometasone", "Triamcinolone",
    "Clobetasol", "Ketoconazole", "Itraconazole", "Terbinafine", "Griseofulvin",
    "Nystatin", "Miconazole", "Econazole", "Luliconazole", "Sertaconazole",
    "Gabapentin", "Pregabalin", "Carbamazepine", "Valproate", "Phenytoin",
    "Levetiracetam", "Topiramate", "Lamotrigine", "Oxcarbazepine", "Clonazepam",
    "Alprazolam", "Lorazepam", "Diazepam", "Zolpidem", "Escitalopram",
    "Sertraline", "Fluoxetine", "Paroxetine", "Venlafaxine", "Duloxetine",
    "Amitriptyline", "Mirtazapine", "Olanzapine", "Risperidone", "Quetiapine",
    "Aripiprazole", "Haloperidol", "Lithium", "Donepezil", "Memantine",
    "Sildenafil", "Tadalafil", "Tamsulosin", "Finasteride", "Dutasteride",
    "Minoxidil", "Isotretinoin", "Adapalene", "Benzoyl Peroxide", "Retinol",
    "Salicylic Acid", "Glycolic Acid", "Hyaluronic Acid", "Niacinamide",
    "Vitamin C Serum", "Sunscreen SPF 50", "Aloe Vera Gel", "Tea Tree Oil",
    "Coconut Oil", "Castor Oil",
    "Rabeprazole", "Esomeprazole", "Lansoprazole", "Sucralfate", "Bismuth",
    "Lactulose", "Polyethylene Glycol", "Senna", "Docusate", "Psyllium Husk",
    "Ondansetron", "Metoclopramide", "Itopride", "Mosapride", "Trimebutine",
    "Ursodeoxycholic Acid", "Silymarin", "Liv 52", "Hepamerz",
    "Insulin Glargine", "Insulin Aspart", "Sitagliptin", "Vildagliptin",
    "Empagliflozin", "Dapagliflozin", "Canagliflozin", "Pioglitazone",
    "Gliclazide", "Glipizide", "Acarbose", "Voglibose", "Teneligliptin",
  ].forEach((med) => addArticle(generateMedicineGuide(med)));

  // More symptoms (50+)
  [
    "Blurred Vision", "Ringing in Ears", "Difficulty Swallowing", "Excessive Sweating",
    "Loss of Appetite", "Bad Taste in Mouth", "Burning Sensation While Urinating",
    "Blood in Urine", "Blood in Stool", "Persistent Cough", "Unexplained Weight Loss",
    "Lump in Breast", "Difficulty Breathing at Night", "Snoring", "Sleep Apnea Symptoms",
    "Trembling Hands", "Stiff Neck", "Lower Abdominal Pain", "Upper Abdominal Pain",
    "Pain Behind Eyes", "Sensitivity to Light", "Dry Mouth", "Excessive Saliva",
    "Bruising Easily", "Slow Wound Healing", "Brittle Nails", "White Spots on Nails",
    "Yellow Eyes", "Pale Skin", "Rapid Heartbeat", "Slow Heartbeat", "Irregular Heartbeat",
    "Cold Hands and Feet", "Swollen Lymph Nodes", "Persistent Hiccups", "Metallic Taste",
    "Pins and Needles", "Restless Legs", "Leg Swelling", "Ankle Swelling",
    "Morning Stiffness", "Muscle Weakness", "Jaw Clicking", "Teeth Grinding",
    "Excessive Yawning", "Frequent Infections", "Chronic Fatigue", "Brain Fog",
    "Poor Concentration", "Forgetfulness",
  ].forEach((s) => addArticle(generateSymptomArticle(s)));

  // More diseases (30+)
  [
    { name: "Celiac Disease", type: "chronic" }, { name: "Crohn's Disease", type: "chronic" },
    { name: "Ulcerative Colitis", type: "chronic" }, { name: "Lupus", type: "chronic" },
    { name: "Multiple Sclerosis", type: "chronic" }, { name: "Parkinson's Disease", type: "chronic" },
    { name: "Alzheimer's Disease", type: "chronic" }, { name: "Epilepsy", type: "chronic" },
    { name: "Fibromyalgia", type: "chronic" }, { name: "Chronic Fatigue Syndrome", type: "chronic" },
    { name: "Sleep Apnea", type: "chronic" }, { name: "Restless Leg Syndrome", type: "chronic" },
    { name: "Carpal Tunnel Syndrome", type: "chronic" }, { name: "Frozen Shoulder", type: "chronic" },
    { name: "Plantar Fasciitis", type: "chronic" }, { name: "Tennis Elbow", type: "chronic" },
    { name: "Sciatica", type: "chronic" }, { name: "Herniated Disc", type: "chronic" },
    { name: "Spondylitis", type: "chronic" }, { name: "Cervical Pain", type: "chronic" },
    { name: "Tinnitus", type: "chronic" }, { name: "Glaucoma", type: "chronic" },
    { name: "Cataracts", type: "chronic" }, { name: "Macular Degeneration", type: "chronic" },
    { name: "Dry Eye Syndrome", type: "chronic" }, { name: "Lactose Intolerance", type: "chronic" },
    { name: "Fatty Liver Disease", type: "chronic" }, { name: "Cirrhosis", type: "chronic" },
    { name: "Pancreatitis", type: "acute" }, { name: "Appendicitis", type: "acute" },
  ].forEach((d) => addArticle(generateDiseaseArticle(d)));

  // More home remedies (20)
  [
    "Joint Pain", "Gas and Bloating", "Skin Dryness", "Chapped Lips",
    "Cracked Heels", "Eye Strain", "Hangover", "Motion Sickness",
    "Snoring", "Hiccups", "Warts", "Corns", "Boils", "Ringworm",
    "Athlete's Foot", "Cold Sores", "Canker Sores", "Razor Burns",
    "Ingrown Hair", "Oily Skin",
  ].forEach((r) => addArticle(generateHomeRemedyArticle(r)));

  // More nutrition (20)
  [
    "Best Fruits for Diabetics", "Anti-Inflammatory Foods India",
    "Foods That Lower Blood Pressure", "Brain Foods for Students",
    "Pre-Workout Indian Meals", "Post-Workout Indian Meals",
    "Foods for Healthy Joints", "Foods That Boost Hemoglobin",
    "Best Sources of Vitamin D India", "Probiotic Foods Indian",
    "Foods for Healthy Thyroid", "Anti-Anxiety Foods",
    "Foods for Beautiful Skin", "Foods That Reduce Cholesterol",
    "Foods for Strong Teeth", "Best Oils for Cooking India",
    "Whole Grains Benefits India", "Sprouts Benefits and Recipes",
    "Dry Fruits Benefits Guide", "Honey Benefits and Uses",
  ].forEach((t) => addArticle(generateTopicArticle(t, "Nutrition", "nutrition")));

  // Pregnancy articles (20)
  [
    "First Trimester Guide", "Second Trimester Guide", "Third Trimester Guide",
    "Pregnancy Diet Plan India", "Morning Sickness Remedies",
    "Pregnancy Exercise Guide", "Prenatal Vitamins Guide",
    "Gestational Diabetes Management", "High BP in Pregnancy",
    "Iron and Calcium in Pregnancy", "Baby Movement Tracking",
    "Birth Plan Preparation", "Labor Signs to Watch",
    "C-Section Recovery Guide", "Postpartum Depression Signs",
    "Breastfeeding Tips India", "Newborn Care First Month",
    "Post-Delivery Body Recovery", "Fertility Boosting Tips",
    "IVF Guide India",
  ].forEach((t) => addArticle(generateTopicArticle(t, "Pregnancy", "pregnancy")));

  // Men's health (15)
  [
    "Prostate Health Guide", "Testosterone and Health", "Male Pattern Baldness",
    "Erectile Dysfunction Awareness", "Testicular Health Check",
    "Men's Mental Health", "Heart Disease Risk in Men",
    "Gym Safety Tips for Men", "Protein Requirements for Men",
    "Men's Grooming Health", "Vasectomy Guide", "Male Infertility Causes",
    "Anger Management for Men", "Men's Bone Health", "Alcohol Effects on Health",
  ].forEach((t) => addArticle(generateTopicArticle(t, "Men's Health", "mens health")));

  // Doctor advice articles (20)
  [
    "How to Choose the Right Doctor", "Questions to Ask Your Doctor",
    "Understanding Your Medical Report", "Second Opinion Guide",
    "When to Visit Emergency Room", "Health Checkup Schedule by Age",
    "Preparing for Surgery", "Post-Surgery Recovery Tips",
    "Managing Chronic Pain", "Dealing with Multiple Medications",
    "Health Screening Tests by Age", "Preventive Healthcare Guide",
    "Medical Records Management", "Hospital Stay Preparation",
    "Home Healthcare Options India", "Palliative Care Guide",
    "Rehabilitation After Injury", "Physiotherapy Benefits",
    "Occupational Therapy Guide", "Speech Therapy Guide",
  ].forEach((t) => addArticle(generateTopicArticle(t, "Doctor Advice", "doctor")));

  // More medicine comparisons (20)
  [
    ["Crocin", "Dolo 650", "fever reduction"],
    ["Allegra", "Cetirizine", "allergy treatment"],
    ["Combiflam", "Flexon", "pain and fever"],
    ["Azee 500", "Azithral 500", "bacterial infection"],
    ["Pan 40", "Pantocid", "acid reflux"],
    ["Shelcal", "Calcimax", "calcium supplementation"],
    ["Becosules", "Supradyn", "multivitamin choice"],
    ["Duphaston", "Deviry", "hormonal therapy"],
    ["Sinarest", "D-Cold Total", "cold and flu"],
    ["Glycomet", "Glucophage", "diabetes treatment"],
    ["Ecosprin", "Disprin", "blood thinning"],
    ["Zifi", "Taxim O", "cephalosporin antibiotic"],
    ["Augmentin", "Clavam", "amoxicillin combination"],
    ["Monocef", "Ceftriaxone", "injectable antibiotic"],
    ["Rantac", "Zinetac", "acid reducer"],
    ["Thyronorm", "Eltroxin", "thyroid medication"],
    ["Stamlo", "Amlong", "BP medication"],
    ["Telma", "Telmikind", "angiotensin blocker"],
    ["Lipitor", "Atorlip", "statin medication"],
    ["Januvia", "Janumet", "diabetes medication"],
  ].forEach(([m1, m2, purpose]) => addArticle(generateMedicineComparison(m1, m2, purpose)));

  // Eye & Ear care (15)
  [
    "Eye Drop Usage Guide", "Contact Lens Safety", "Computer Vision Syndrome",
    "Night Vision Problems", "Color Blindness Awareness", "Eye Floaters Guide",
    "Conjunctivitis Treatment", "Stye Treatment Home Remedies",
    "Ear Wax Removal Safe Methods", "Hearing Aid Guide India",
    "Tinnitus Management", "Swimmer's Ear Prevention",
    "Ear Infection in Adults", "Eye Allergy Treatment",
    "Lazy Eye in Children",
  ].forEach((t) => addArticle(generateTopicArticle(t, "Health Tips", "eye ear care")));

  // Cancer awareness (15)
  [
    "Breast Cancer Early Signs", "Cervical Cancer Prevention",
    "Lung Cancer Risk Factors", "Colorectal Cancer Screening",
    "Skin Cancer Prevention", "Oral Cancer Awareness India",
    "Prostate Cancer Screening", "Liver Cancer Risk Factors",
    "Leukemia Awareness", "Lymphoma Symptoms Guide",
    "Stomach Cancer Prevention", "Kidney Cancer Signs",
    "Thyroid Cancer Awareness", "Pancreatic Cancer Awareness",
    "Cancer Prevention Lifestyle Tips",
  ].forEach((t) => addArticle(generateTopicArticle(t, "Disease Guide", "cancer")));

  // Diabetes deep dive (15)
  [
    "Type 1 vs Type 2 Diabetes", "Prediabetes Reversal Guide",
    "Diabetes Foot Care", "Diabetic Retinopathy Prevention",
    "Diabetic Neuropathy Management", "Diabetes and Heart Disease",
    "Continuous Glucose Monitor Guide", "Insulin Injection Technique",
    "Diabetes Emergency Signs", "HbA1c Target Ranges",
    "Diabetes and Kidney Health", "Diabetes Meal Planning India",
    "Sugar Substitutes Safety Guide", "Diabetes and Mental Health",
    "Diabetic Diet Myths Debunked",
  ].forEach((t) => addArticle(generateTopicArticle(t, "Disease Guide", "diabetes")));

  // Heart health deep dive (15)
  [
    "Heart Attack Warning Signs", "Heart Failure Management",
    "Atrial Fibrillation Guide", "Coronary Artery Disease Prevention",
    "Cholesterol Myths Debunked", "Triglycerides Guide",
    "Heart Healthy Indian Diet", "ECG Reading Basics",
    "Angioplasty Recovery Guide", "Bypass Surgery Recovery",
    "Pacemaker Living Guide", "Blood Pressure Monitor Guide",
    "Salt and Heart Health", "Exercise After Heart Attack",
    "Cardiac Rehabilitation India",
  ].forEach((t) => addArticle(generateTopicArticle(t, "Disease Guide", "heart")));

  // Extra topics to cross 1000
  [
    "How AI is Changing Healthcare in India", "Benefits of Online Medicine Delivery",
    "GoDavaii AI Health Assistant Guide", "How to Use AI for Health Questions",
    "Future of Digital Healthcare India", "Telemedicine vs In-Person Consultation",
    "Health Data Privacy in Digital Age", "Smart Health Devices Guide India",
  ].forEach((t) => addArticle(generateTopicArticle(t, "Health Tips", "digital health")));

  // Gut health (10)
  [
    "Probiotics vs Prebiotics", "Leaky Gut Syndrome Guide",
    "SIBO Symptoms and Treatment", "H Pylori Infection Guide",
    "Peptic Ulcer Management", "Gastritis Natural Remedies",
    "Irritable Bowel Syndrome Diet", "Hemorrhoids Treatment Options",
    "Fissure Home Remedies", "Colon Health Tips",
  ].forEach((t) => addArticle(generateTopicArticle(t, "Disease Guide", "gut health")));

  return all;
}

// ─── MAIN ───
const articles = generateAllArticles();
console.log(`Generated ${articles.length} unique blog articles`);

// Split into two files
const half = Math.ceil(articles.length / 2);
const batch1 = articles.slice(0, half);
const batch2 = articles.slice(half);

const outDir = path.join(__dirname, "..", "src", "data");

const file1 = `// blogArticles1.js — Auto-generated SEO blog articles (batch 1)\n// Generated: ${new Date().toISOString()}\n// Total: ${batch1.length} articles\n\nexport const articles1 = ${JSON.stringify(batch1, null, 2)};\n`;
const file2 = `// blogArticles2.js — Auto-generated SEO blog articles (batch 2)\n// Generated: ${new Date().toISOString()}\n// Total: ${batch2.length} articles\n\nexport const articles2 = ${JSON.stringify(batch2, null, 2)};\n`;

fs.writeFileSync(path.join(outDir, "blogArticles1.js"), file1);
fs.writeFileSync(path.join(outDir, "blogArticles2.js"), file2);

console.log(`Batch 1: ${batch1.length} articles → blogArticles1.js`);
console.log(`Batch 2: ${batch2.length} articles → blogArticles2.js`);
console.log(`Total file sizes: ${(file1.length / 1024).toFixed(0)}KB + ${(file2.length / 1024).toFixed(0)}KB`);
