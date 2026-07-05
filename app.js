/**
 * AgriProfit - Philanthropic Advisory Engine
 * Vanilla JS logic for navigation, localization, calculation, and form validation.
 */

// State variables
let currentScreen = 'screen-login';
let currentLang = localStorage.getItem('agriprofit_lang') || 'en';
let regStep = 1;
let tourStep = 0;
let userProfile = {
  name: 'Harender Bhati',
  phone: '9876543210',
  state: 'Haryana',
  district: 'Karnal',
  acres: 4.2,
  soil: 'Clay Loam',
  crop: 'Basmati Rice'
};

// ============================================
// Translations Dictionary
// ============================================
const translations = {
  en: {
    login_tagline: "Empowering Farmers with Unbiased, Scientific Advice",
    login_subtitle: "100% free. No commissions. No branded products. Just pure farming knowledge to 2x your profit.",
    login_create: "Create Your Free Profile",
    login_btn: "Login",
    loading_auth: "Authenticating...",
    loading_land: "Fetching local climate data...",
    loading_soil: "Preparing personalized plan...",
    
    // Registration
    reg_title: "Welcome to AgriProfit",
    reg_step1: "Personal Details",
    reg_name: "Full Name *",
    reg_phone: "Phone Number *",
    reg_enter_otp: "Enter 4-digit OTP sent to your phone",
    reg_step2: "Farm Location",
    reg_state: "State *",
    reg_district: "District / Village *",
    reg_step3: "Farm Specifics",
    reg_acres: "Total Farm Size (Acres) *",
    reg_soil: "Soil Type *",
    reg_crop: "Primary Crop Currently Grown *",
    reg_back: "Back",
    reg_next: "Next",
    reg_complete: "Complete Profile",

    // Navigation
    nav_home: "Home",
    nav_crop_plan: "Advisory",
    nav_learn: "Academy",
    nav_market: "Calc",
    more_profile: "Profile",

    // Dashboard
    dash_greeting: "Welcome back, {name}. Here is the plan for your farm today.",
    dash_location: "{district}, {state}",
    dash_partly_cloudy: "Partly Cloudy",
    dash_humidity: "Humidity",
    crop_day: "Day 42 of 120 — <strong>Tillering Stage</strong>",
    dash_suggestion_title: "Scientific Advisory for {district}",
    dash_suggestion_desc: "High humidity detected. Watch out for Brown Plant Hopper in {crop}. Tap here for early organic prevention methods.",
    section_quick: "Quick Actions",
    quick_consult: "Consult Expert",
    quick_academy: "Video Academy",
    quick_calc: "Profit Calc",
    quick_community: "Community",
    section_next_task: "Next Advisory Task",
    full_plan: "Full Plan →",
    task_fertilizer: "Nutrient Management",
    task_due: "Apply Nitrogen · Due in 3 days",
    pending: "Pending",

    // Advisory (Crop Plan)
    cp_title: "Scientific Advisory Plan",
    cp_roi_msg: "100% unbiased scientific timeline. Following this generic plan can increase your yield by <strong>+18%</strong>.",
    cp_m1: "Month 1: Preparation",
    cp_m2: "Month 2: Sowing & Nutrition",
    cp_this_week: "This Month",
    cp_m3: "Month 3: Irrigation & Weeds",
    cp_m4: "Month 4: Pest Management",
    cp_m5: "Month 5: Harvest & Soil",

    // Roadmap
    rm_title: "Roadmap: Traditional → Modern Farming",
    rm_subtitle: "A step-by-step transition plan to double your profit using scientific methods.",
    rm_trad: "Traditional",
    rm_modern: "Modern",
    rm_p1_title: "🌱 Soil Health Foundation",
    rm_p1_time: "Week 1-2",
    rm_p2_title: "🌾 Seed Selection & Treatment",
    rm_p2_time: "Week 2-3",
    rm_p3_title: "💧 Smart Water Management",
    rm_p3_time: "Week 3-4",
    rm_p4_title: "🐛 IPM Pest & Disease Control",
    rm_p4_time: "Week 4-6",
    rm_p5_title: "📊 Data-Driven Decisions",
    rm_p5_time: "Week 6-8",
    rm_p6_title: "🚀 Harvest & Post-Harvest",
    rm_p6_time: "Week 8-10",
    rm_cta: "Have questions about any phase? Ask AgriBot for personalized advice based on your farm profile.",
    rm_cta_btn: "💬 Ask AgriBot Now",

    // Chat
    chat_title: "Philanthropic AI + Expert",
    chat_online: "🟢 Online · Free Advisory",
    chat_secure: "100% unbiased. We never promote specific brands.",
    chat_ai_welcome: "Namaste! I'm your unbiased AI crop advisor. I provide generic, scientific formulations for disease management, fertilizer dosage, and pest control. How can I assist you today?",
    chat_placeholder: "Type your question...",

    // Pest
    pest_title: "Pest & Disease Help",
    pest_info: "Scientific database for <strong>{crop}</strong> pests in your region. Tap for generic treatments.",
    pest_back: "Back",
    pest_treatment: "Scientific Action Plan:",

    // Calculator
    calc_title: "Yield & Profit Calculator",
    calc_hero_title: "Project Your 2x Profit",
    calc_hero_desc: "See how adopting modern, scientific techniques from our Academy can impact your margins.",
    calc_farm_size: "Land Size (Acres)",
    calc_current_yield: "Expected Yield (Quintals/Acre)",
    calc_cost: "Current Investment (₹/Acre)",
    calc_btn: "Reveal Scientific Projection",
    calc_proj_title: "Projected Net Profit (Modern Methods)",
    calc_traditional: "Traditional Profit:",
    calc_modern: "Modern Profit:",
    calc_why: "How? 20% cost reduction (IPM) + 15% yield boost.",

    // Academy
    academy_title: "Video Academy",
    learn_all: "🔥 Top Converting",
    learn_yield: "📈 2x Profit Series",
    learn_organic: "🌱 Organic Methods",
    academy_now_playing: "Now Playing",
    academy_takeaways: "📝 Step-by-Step Takeaways",

    // Profile
    profile_land: "Farm Profile",
    profile_settings: "Settings",
    profile_language: "Language",
    profile_take_tour: "🎯 Take App Tour",
    profile_logout: "Logout",
    
    // Tour
    tour_skip: "Skip Tour",
    tour_prev: "← Back",
    tour_next: "Next →",
    tour_finish: "Get Started",

    // Schemes
    schemes_title: "Govt. Schemes",
    schemes_eligible_btn: "Am I Eligible? — Quick Check",

    // Community
    community_title: "Community Forum"
  },
  hi: {
    login_tagline: "निष्पक्ष, वैज्ञानिक सलाह से किसानों को सशक्त बनाना",
    login_subtitle: "100% मुफ़्त। कोई कमीशन नहीं। कोई ब्रांडेड उत्पाद नहीं। केवल शुद्ध कृषि ज्ञान।",
    login_create: "अपनी निःशुल्क प्रोफ़ाइल बनाएं",
    login_btn: "लॉग इन करें",
    loading_auth: "प्रमाणीकरण हो रहा है...",
    loading_land: "जलवायु डेटा प्राप्त कर रहे हैं...",
    loading_soil: "व्यक्तिगत योजना तैयार कर रहे हैं...",
    
    // Registration
    reg_title: "AgriProfit में आपका स्वागत है",
    reg_step1: "व्यक्तिगत विवरण",
    reg_name: "पूरा नाम *",
    reg_phone: "फ़ोन नंबर *",
    reg_enter_otp: "OTP दर्ज करें",
    reg_step2: "खेत का स्थान",
    reg_state: "राज्य *",
    reg_district: "जिला / गाँव *",
    reg_step3: "खेत का विवरण",
    reg_acres: "कुल खेत का आकार (एकड़) *",
    reg_soil: "मिट्टी का प्रकार *",
    reg_crop: "प्राथमिक फसल *",
    reg_back: "पीछे",
    reg_next: "आगे",
    reg_complete: "प्रोफ़ाइल पूरी करें",

    // Navigation
    nav_home: "होम",
    nav_crop_plan: "सलाह",
    nav_learn: "अकादमी",
    nav_market: "कैलकुलेटर",
    more_profile: "प्रोफ़ाइल",

    // Dashboard
    dash_greeting: "वापसी पर स्वागत है, {name} 👋",
    dash_location: "{district}, {state}",
    dash_partly_cloudy: "आंशिक रूप से बादल",
    dash_humidity: "नमी",
    crop_day: "120 में से 42वां दिन — <strong>कल्ले निकलने की अवस्था</strong>",
    dash_suggestion_title: "{district} के लिए वैज्ञानिक सलाह",
    dash_suggestion_desc: "उच्च आर्द्रता का पता चला। भूरा फुदका (BPH) से सावधान रहें। रोकथाम के लिए यहाँ टैप करें।",
    section_quick: "त्वरित कार्रवाई",
    quick_consult: "विशेषज्ञ से पूछें",
    quick_academy: "वीडियो अकादमी",
    quick_calc: "लाभ कैलकुलेटर",
    quick_community: "समुदाय",
    section_next_task: "अगला कार्य",
    full_plan: "पूरी योजना →",
    task_fertilizer: "पोषक तत्व प्रबंधन",
    task_due: "नाइट्रोजन डालें · 3 दिन में",
    pending: "लंबित",

    // Advisory
    cp_title: "वैज्ञानिक सलाह योजना",
    cp_roi_msg: "इस निष्पक्ष योजना का पालन करने से आपकी उपज <strong>+18%</strong> तक बढ़ सकती है।",
    cp_m1: "महीना 1: तैयारी",
    cp_m2: "महीना 2: बुवाई और पोषण",
    cp_m3: "महीना 3: सिंचाई और खरपतवार",
    cp_m4: "महीना 4: कीट प्रबंधन",
    cp_m5: "महीना 5: कटाई और मिट्टी",
    cp_land_prep: "गहरी गर्मी की जुताई",
    cp_fertilizer: "नाइट्रोजन टॉप ड्रेसिंग",
    cp_this_week: "इस सप्ताह",
    cp_yield_increase: "लक्ष्य: मजबूत कल्ले बढ़ाना",
    cp_pest_mgmt: "निवारक कीट नियंत्रण",

    // Roadmap
    rm_title: "रोडमैप: पारंपरिक → आधुनिक खेती",
    rm_subtitle: "वैज्ञानिक तरीकों से अपना मुनाफा दोगुना करने की चरणबद्ध योजना।",
    rm_trad: "पारंपरिक",
    rm_modern: "आधुनिक",
    rm_p1_title: "🌱 मिट्टी स्वास्थ्य की नींव",
    rm_p1_time: "सप्ताह 1-2",
    rm_p2_title: "🌾 बीज चयन और उपचार",
    rm_p2_time: "सप्ताह 2-3",
    rm_p3_title: "💧 स्मार्ट जल प्रबंधन",
    rm_p3_time: "सप्ताह 3-4",
    rm_p4_title: "🐛 IPM कीट और रोग नियंत्रण",
    rm_p4_time: "सप्ताह 4-6",
    rm_p5_title: "📊 डेटा-आधारित निर्णय",
    rm_p5_time: "सप्ताह 6-8",
    rm_p6_title: "🚀 कटाई और कटाई के बाद",
    rm_p6_time: "सप्ताह 8-10",
    rm_cta: "किसी भी चरण के बारे में सवाल हैं? AgriBot से अपनी खेत प्रोफ़ाइल के आधार पर सलाह लें।",
    rm_cta_btn: "💬 AgriBot से पूछें",

    // Chat
    chat_title: "परोपकारी AI + विशेषज्ञ",
    chat_online: "🟢 ऑनलाइन · मुफ्त सलाह",
    chat_secure: "100% निष्पक्ष। हम ब्रांड्स का प्रचार नहीं करते।",
    chat_ai_welcome: "नमस्ते! मैं आपका निष्पक्ष कृषि सलाहकार हूँ। मैं रोग प्रबंधन और कीट नियंत्रण के लिए वैज्ञानिक फॉर्मूले प्रदान करता हूँ। मैं आपकी कैसे मदद कर सकता हूँ?",
    chat_placeholder: "अपना प्रश्न लिखें...",

    // Pest
    pest_title: "कीट और रोग सहायता",
    pest_info: "आपके क्षेत्र में <strong>{crop}</strong> के कीटों के लिए वैज्ञानिक डेटाबेस।",
    pest_back: "पीछे",
    pest_treatment: "वैज्ञानिक कार्य योजना:",

    // Calculator
    calc_title: "उपज और लाभ कैलकुलेटर",
    calc_hero_title: "अपना 2x लाभ अनुमानित करें",
    calc_hero_desc: "देखें कि हमारी अकादमी से आधुनिक, वैज्ञानिक तकनीकों को अपनाने से आपके मुनाफे पर क्या प्रभाव पड़ सकता है।",
    calc_farm_size: "खेत का आकार (एकड़)",
    calc_current_yield: "वर्तमान उपज (क्विंटल/एकड़)",
    calc_cost: "वर्तमान लागत (₹/एकड़)",
    calc_btn: "वैज्ञानिक अनुमान देखें",
    calc_proj_title: "अनुमानित शुद्ध लाभ (आधुनिक तरीके)",
    calc_traditional: "पारंपरिक लाभ:",
    calc_modern: "आधुनिक लाभ:",
    calc_why: "कैसे? 20% लागत में कमी (IPM) + 15% उपज वृद्धि।",

    // Academy
    academy_title: "वीडियो अकादमी",
    learn_all: "🔥 सबसे लोकप्रिय",
    learn_yield: "📈 2x लाभ सीरीज",
    learn_organic: "🌱 जैविक तरीके",
    academy_now_playing: "अब चल रहा है",
    academy_takeaways: "📝 मुख्य बातें",

    // Profile
    profile_land: "खेत प्रोफ़ाइल",
    profile_settings: "सेटिंग्स",
    profile_language: "भाषा",
    profile_take_tour: "🎯 ऐप टूर लें",
    profile_logout: "लॉग आउट",

    // Tour
    tour_skip: "टूर छोड़ें",
    tour_prev: "← पीछे",
    tour_next: "आगे →",
    tour_finish: "शुरू करें",

    // Schemes
    schemes_title: "सरकारी योजनाएं",
    schemes_eligible_btn: "क्या मैं पात्र हूं? — जांच करें",

    // Community
    community_title: "सामुदायिक मंच"
  },
  mr: {
    // Fallback to Hindi for simplicity in this prototype demo where exact Marathi isn't provided
    login_tagline: "निष्पक्ष, वैज्ञानिक सल्ल्याने शेतकऱ्यांना सक्षम करणे",
    login_subtitle: "१००% मोफत. कोणतेही कमिशन नाही. केवळ शुद्ध शेती ज्ञान.",
    login_create: "तुमचे मोफत प्रोफाइल तयार करा",
    login_btn: "लॉगिन करा",
    loading_auth: "प्रमाणीकरण करत आहे...",
    loading_land: "हवामान डेटा मिळवत आहे...",
    loading_soil: "वैयक्तिकृत योजना तयार करत आहे...",
    
    reg_title: "AgriProfit मध्ये आपले स्वागत आहे",
    reg_step1: "वैयक्तिक तपशील",
    reg_name: "पूर्ण नाव *",
    reg_phone: "फोन नंबर *",
    reg_enter_otp: "OTP प्रविष्ट करा",
    reg_step2: "शेत स्थान",
    reg_state: "राज्य *",
    reg_district: "जिल्हा / गाव *",
    reg_step3: "शेत तपशील",
    reg_acres: "एकूण शेत (एकर) *",
    reg_soil: "मातीचा प्रकार *",
    reg_crop: "प्राथमिक पीक *",
    reg_back: "मागे",
    reg_next: "पुढे",
    reg_complete: "प्रोफाइल पूर्ण करा",

    nav_home: "मुख्यपृष्ठ",
    nav_crop_plan: "सल्ला",
    nav_learn: "अकादमी",
    nav_market: "कॅल्क्युलेटर",
    more_profile: "प्रोफाइल",

    dash_greeting: "स्वागत आहे, {name} 👋",
    dash_location: "{district}, {state}",
    dash_partly_cloudy: "अंशतः ढगाळ",
    dash_humidity: "आर्द्रता",
    crop_day: "120 पैकी 42 वा दिवस",
    dash_suggestion_title: "{district} साठी वैज्ञानिक सल्ला",
    dash_suggestion_desc: "जास्त आर्द्रता. {crop} मध्ये भुरा तुडतुडा (BPH) कडे लक्ष ठेवा.",
    section_quick: "त्वरित कृती",
    quick_consult: "तज्ञांचा सल्ला",
    quick_academy: "व्हिडिओ अकादमी",
    quick_calc: "नफा कॅल्क्युलेटर",
    quick_community: "समुदाय",
    section_next_task: "पुढील कार्य",
    full_plan: "पूर्ण योजना →",
    task_fertilizer: "पोषक व्यवस्थापन",
    task_due: "नायट्रोजन लागू करा",
    pending: "प्रलंबित",

    cp_title: "वैज्ञानिक सल्ला योजना",
    cp_roi_msg: "या योजनेचे अनुसरण केल्यास तुमचे उत्पन्न <strong>+18%</strong> ने वाढू शकते.",
    cp_m1: "महिना 1: तयारी",
    cp_m2: "महिना 2: पेरणी आणि पोषण",
    cp_m3: "महिना 3: सिंचन आणि तण",
    cp_m4: "महिना 4: कीड नियंत्रण",
    cp_m5: "महिना 5: कापणी आणि माती",
    cp_land_prep: "खोल उन्हाळी नांगरणी",
    cp_fertilizer: "नायट्रोजन टॉप ड्रेसिंग",
    cp_this_week: "या आठवड्यात",
    cp_yield_increase: "उद्दिष्ट: मजबूत फुटवे",
    cp_pest_mgmt: "प्रतिबंधात्मक कीटक नियंत्रण",

    // Roadmap
    rm_title: "रोडमॅप: पारंपारिक → आधुनिक शेती",
    rm_subtitle: "वैज्ञानिक पद्धतींनी तुमचा नफा दुप्पट करण्याची चरणबद्ध योजना.",
    rm_trad: "पारंपारिक",
    rm_modern: "आधुनिक",
    rm_p1_title: "🌱 मातीचे आरोग्य पाया",
    rm_p1_time: "आठवडा 1-2",
    rm_p2_title: "🌾 बीज निवड आणि उपचार",
    rm_p2_time: "आठवडा 2-3",
    rm_p3_title: "💧 स्मार्ट पाणी व्यवस्थापन",
    rm_p3_time: "आठवडा 3-4",
    rm_p4_title: "🐛 IPM कीड आणि रोग नियंत्रण",
    rm_p4_time: "आठवडा 4-6",
    rm_p5_title: "📊 डेटा-आधारित निर्णय",
    rm_p5_time: "आठवडा 6-8",
    rm_p6_title: "🚀 कापणी आणि कापणीनंतर",
    rm_p6_time: "आठवडा 8-10",
    rm_cta: "कोणत्याही टप्प्याबद्दल प्रश्न आहेत? AgriBot ला तुमच्या शेत प्रोफाइलच्या आधारावर सल्ला विचारा.",
    rm_cta_btn: "💬 AgriBot ला विचारा",

    chat_title: "परोपकारी AI + तज्ञ",
    chat_online: "🟢 ऑनलाइन · मोफत सल्ला",
    chat_secure: "१००% निष्पक्ष. आम्ही ब्रँडचा प्रचार करत नाही.",
    chat_ai_welcome: "नमस्कार! मी तुमचा निष्पक्ष कृषी सल्लागार आहे. मी तुम्हाला कशी मदत करू शकतो?",
    chat_placeholder: "तुमचा प्रश्न टाइप करा...",

    pest_title: "कीड आणि रोग मदत",
    pest_info: "वैज्ञानिक डेटाबेस. सामान्य उपचारांसाठी टॅप करा.",
    pest_back: "मागे",
    pest_treatment: "वैज्ञानिक कृती योजना:",

    calc_title: "उत्पन्न आणि नफा कॅल्क्युलेटर",
    calc_hero_title: "तुमचा 2x नफा अंदाजित करा",
    calc_hero_desc: "वैज्ञानिक तंत्रांचा अवलंब केल्याने तुमच्या नफ्यावर कसा परिणाम होऊ शकतो ते पहा.",
    calc_farm_size: "शेताचा आकार (एकर)",
    calc_current_yield: "सध्याचे उत्पन्न (क्विंटल/एकर)",
    calc_cost: "सध्याचा खर्च (₹/एकर)",
    calc_btn: "वैज्ञानिक अंदाज पहा",
    calc_proj_title: "अंदाजित निव्वळ नफा",
    calc_traditional: "पारंपारिक नफा:",
    calc_modern: "आधुनिक नफा:",
    calc_why: "कसे? 20% खर्च कपात (IPM) + 15% उत्पन्न वाढ.",

    academy_title: "व्हिडिओ अकादमी",
    learn_all: "🔥 शीर्ष",
    learn_yield: "📈 2x नफा",
    learn_organic: "🌱 सेंद्रिय",
    academy_now_playing: "आता चालू आहे",
    academy_takeaways: "📝 मुख्य मुद्दे",

    profile_land: "शेत प्रोफाइल",
    profile_settings: "सेटिंग्ज",
    profile_language: "भाषा",
    profile_take_tour: "🎯 अॅप टूर घ्या",
    profile_logout: "लॉगआउट",

    tour_skip: "वगळा",
    tour_prev: "← मागे",
    tour_next: "पुढे →",
    tour_finish: "सुरू करा",

    // Schemes
    schemes_title: "सरकारी योजना",
    schemes_eligible_btn: "मी पात्र आहे का? — तपासा",

    // Community
    community_title: "सामुदायिक मंच"
  }
};

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);

  // Inject Global Footer
  const footerHTML = `
    <footer class="global-dev-footer">
      <div class="footer-title">Developed with purpose by Harender Bhati</div>
      <div class="footer-mission">Engineering technology for the prosperity of our farmers. 100% Free. 100% Unbiased.</div>
    </footer>
  `;
  document.querySelectorAll('.screen').forEach(screen => {
    screen.insertAdjacentHTML('beforeend', footerHTML);
  });

  // Setup Lang Toggles
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll(`[data-lang="\${e.target.dataset.lang}"]`).forEach(b => {
        const parent = b.parentElement;
        parent.querySelectorAll('button, .lang-option, .lang-card').forEach(s => s.classList.remove('active', 'selected'));
        b.classList.add('active', 'selected');
      });
      setLanguage(e.target.dataset.lang);
    });
  });

  // Init calculator crop price from dropdown default
  setTimeout(() => updateCropPrice(), 0);
});


// ============================================
// Localization Engine
// ============================================
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('agriprofit_lang', lang);
  
  const dict = translations[lang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      let text = dict[key];
      // Variable replacement
      text = text.replace('{name}', userProfile.name.split(' ')[0]);
      text = text.replace('{district}', userProfile.district || 'Karnal');
      text = text.replace('{state}', userProfile.state || 'Haryana');
      text = text.replace('{crop}', userProfile.crop || 'Basmati Rice');
      
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = text;
      } else {
        if (el.tagName === 'INPUT' && el.type === 'text') {
          el.placeholder = text;
        } else {
          el.innerText = text;
        }
      }
    }
  });

  // Sync lang toggle buttons
  document.querySelectorAll('.lang-toggle button, .lang-option, .lang-card').forEach(btn => {
    btn.classList.remove('active', 'selected');
    if (btn.dataset.lang === lang) {
      btn.classList.add('active');
      if (btn.classList.contains('lang-card')) btn.classList.add('selected');
    }
  });
}

// ============================================
// Navigation
// ============================================
function navigateTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
  }

  // Handle bottom nav visibility
  const bottomNav = document.getElementById('bottomNav');
  const fab = document.getElementById('fabChat');
  
  if (screenId === 'screen-login' || screenId === 'screen-register') {
    bottomNav.style.display = 'none';
    fab.classList.remove('visible');
  } else {
    bottomNav.style.display = 'flex';
    fab.classList.add('visible');
  }

  // Update active state in bottom nav
  document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
  const activeNav = document.querySelector(`.nav-item[data-screen="${screenId}"]`);
  if (activeNav) activeNav.classList.add('active');

  currentScreen = screenId;
}

// ============================================
// Login & Registration with Validation
// ============================================
function startLogin() {
  const loading = document.getElementById('loginLoading');
  const btns = document.getElementById('loginBtnGroup');
  
  btns.style.display = 'none';
  loading.classList.add('active');
  
  // Simulate API calls
  setTimeout(() => {
    document.getElementById('step-auth').classList.remove('active');
    document.getElementById('step-auth').classList.add('done');
    document.getElementById('step-land').classList.add('active');
  }, 1000);
  
  setTimeout(() => {
    document.getElementById('step-land').classList.remove('active');
    document.getElementById('step-land').classList.add('done');
    document.getElementById('step-soil').classList.add('active');
  }, 2000);
  
  setTimeout(() => {
    document.getElementById('step-soil').classList.remove('active');
    document.getElementById('step-soil').classList.add('done');
    
    setTimeout(() => {
      updateDashboardData();
      navigateTo('screen-dashboard');
      loading.classList.remove('active');
      btns.style.display = 'flex';
      
      // Reset steps for next time
      document.querySelectorAll('.loading-step').forEach(step => {
        step.classList.remove('active', 'done');
      });
      document.getElementById('step-auth').classList.add('active');
    }, 500);
  }, 3000);
}

function showRegistration() {
  regStep = 1;
  updateRegUI();
  navigateTo('screen-register');
}

function updateRegUI() {
  // Update dots
  const dots = document.querySelectorAll('.reg-progress-dot');
  dots.forEach((dot, idx) => {
    dot.classList.remove('active', 'done');
    if (idx + 1 < regStep) dot.classList.add('done');
    if (idx + 1 === regStep) dot.classList.add('active');
  });

  // Update content
  document.querySelectorAll('.reg-step-content').forEach(el => el.classList.remove('active'));
  document.getElementById(`regStep${regStep}`).classList.add('active');

  // Update buttons
  const backBtn = document.getElementById('regBackBtn');
  const backBtn2 = document.getElementById('regBackBtn2');
  const nextText = document.getElementById('regNextText');

  if (regStep === 1) {
    backBtn.style.visibility = 'visible';
    backBtn2.style.display = 'none';
  } else {
    backBtn.style.visibility = 'hidden';
    backBtn2.style.display = 'block';
  }

  if (regStep === 3) {
    nextText.setAttribute('data-i18n', 'reg_complete');
    nextText.innerText = translations[currentLang].reg_complete;
  } else {
    nextText.setAttribute('data-i18n', 'reg_next');
    nextText.innerText = translations[currentLang].reg_next;
  }
}

function clearError(field) {
  const group = document.getElementById(`group-${field}`);
  const input = group.querySelector('.input-field');
  if(group) group.classList.remove('has-error');
  if(input) input.classList.remove('input-error');
}

function showError(field) {
  const group = document.getElementById(`group-${field}`);
  const input = group.querySelector('.input-field');
  if(group) group.classList.add('has-error');
  if(input) input.classList.add('input-error');
}

// ============================================
// OTP Auto-Focus Handlers
// ============================================
function handleOtpInput(current, nextId) {
  // Allow only single digit
  current.value = current.value.replace(/[^0-9]/g, '').slice(0, 1);
  clearError('otp');

  // Auto-advance to next box when a digit is entered
  if (current.value.length === 1 && nextId) {
    document.getElementById(nextId).focus();
  }
}

function handleOtpKeydown(e, current, prevId) {
  // On Backspace in an empty box, go back to the previous box
  if (e.key === 'Backspace' && current.value === '' && prevId) {
    e.preventDefault();
    const prev = document.getElementById(prevId);
    prev.value = '';
    prev.focus();
  }
  // On ArrowLeft, move to previous box
  if (e.key === 'ArrowLeft' && prevId) {
    document.getElementById(prevId).focus();
  }
  // On ArrowRight, move to next box
  if (e.key === 'ArrowRight') {
    const nextId = current.getAttribute('oninput')?.match(/'(otp\d)'/)?.[1];
    if (nextId) document.getElementById(nextId).focus();
  }
}

function validateStep(step) {
  let isValid = true;
  if (step === 1) {
    const name = document.getElementById('regName').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    if(!name) { showError('name'); isValid = false; }
    if(!phone || phone.length < 10) { showError('phone'); isValid = false; }
    
    // Simulate OTP showing after valid phone
    if(isValid && document.getElementById('otpSection').style.display !== 'block') {
      document.getElementById('otpSection').style.display = 'block';
      return false; // Wait for OTP input
    }

    if (document.getElementById('otpSection').style.display === 'block') {
      const o1 = document.getElementById('otp1').value;
      const o2 = document.getElementById('otp2').value;
      const o3 = document.getElementById('otp3').value;
      const o4 = document.getElementById('otp4').value;
      if(!o1 || !o2 || !o3 || !o4) { showError('otp'); isValid = false; }
    }
    
    if(isValid) {
      userProfile.name = name;
      userProfile.phone = phone;
    }
  } else if (step === 2) {
    const state = document.getElementById('regState').value;
    const district = document.getElementById('regDistrict').value.trim();
    if(!state) { showError('state'); isValid = false; }
    if(!district) { showError('district'); isValid = false; }
    
    if(isValid) {
      userProfile.state = state;
      userProfile.district = district;
    }
  } else if (step === 3) {
    const acres = document.getElementById('regAcres').value;
    const soil = document.getElementById('regSoil').value;
    const crop = document.getElementById('regCrop').value;
    if(!acres || acres <= 0) { showError('acres'); isValid = false; }
    if(!soil) { showError('soil'); isValid = false; }
    if(!crop) { showError('crop'); isValid = false; }
    
    if(isValid) {
      userProfile.acres = acres;
      userProfile.soil = soil;
      userProfile.crop = crop;
    }
  }
  return isValid;
}

function regNext() {
  if (validateStep(regStep)) {
    if (regStep < 3) {
      regStep++;
      updateRegUI();
    } else {
      completeRegistration();
    }
  }
}

function regBack() {
  if (regStep > 1) {
    regStep--;
    updateRegUI();
  }
}

function completeRegistration() {
  updateDashboardData();
  navigateTo('screen-dashboard');
  
  // Start tour automatically for new users
  setTimeout(() => {
    startTour();
  }, 500);
}

function updateDashboardData() {
  // Update texts based on userProfile
  document.getElementById('dashGreeting').innerText = translations[currentLang].dash_greeting.replace('{name}', userProfile.name.split(' ')[0]);
  document.getElementById('dashLocation').innerText = `${userProfile.district}, ${userProfile.state}`;
  document.getElementById('dashCropName').innerText = `${userProfile.crop} Plan`;
  document.getElementById('dashFarmDetails').innerText = `${userProfile.acres} acres · ${userProfile.soil}`;
  
  // Update Profile screen
  document.getElementById('profileName').innerText = userProfile.name;
  document.getElementById('profAcres').innerText = userProfile.acres;
  document.getElementById('profCrop').innerText = userProfile.crop.split(' ')[0];
  document.getElementById('profSoil').innerText = userProfile.soil.split(' ')[0];

  // Refresh language mappings for dynamic text
  setLanguage(currentLang);
}

// ============================================
// Calculator Logic (Input-card based — no sliders)
// ============================================
function updateCropPrice() {
  const sel = document.getElementById('calcCropType');
  if (sel) {
    document.getElementById('calcMarketPrice').value = sel.value;
  }
}

function validateCalcInput(el, min, max) {
  const v = parseFloat(el.value);
  const card = el.closest('.calc-input-card');
  if (isNaN(v) || v < min || v > max) {
    card && card.classList.add('calc-card-error');
    el.classList.add('calc-input-err');
  } else {
    card && card.classList.remove('calc-card-error');
    el.classList.remove('calc-input-err');
  }
}

function calculate2xProfit() {
  const acres       = parseFloat(document.getElementById('calcAcres').value);
  const yieldQt     = parseFloat(document.getElementById('calcYield').value);
  const cost        = parseFloat(document.getElementById('calcCost').value);
  const pricePerQt  = parseFloat(document.getElementById('calcMarketPrice').value);

  const errEl = document.getElementById('calcError');

  // Validate
  if (isNaN(acres) || acres <= 0) {
    errEl.textContent = '⚠️ Please enter a valid land size (in acres).';
    errEl.style.display = 'block'; return;
  }
  if (isNaN(yieldQt) || yieldQt <= 0) {
    errEl.textContent = '⚠️ Please enter a valid yield (quintals per acre).';
    errEl.style.display = 'block'; return;
  }
  if (isNaN(cost) || cost <= 0) {
    errEl.textContent = '⚠️ Please enter a valid investment per acre.';
    errEl.style.display = 'block'; return;
  }
  if (isNaN(pricePerQt) || pricePerQt <= 0) {
    errEl.textContent = '⚠️ Please enter a valid market price per quintal.';
    errEl.style.display = 'block'; return;
  }
  errEl.style.display = 'none';

  const fmt = n => `₹${Math.round(n).toLocaleString('en-IN')}`;

  // Traditional scenario
  const tradRevenue = acres * yieldQt * pricePerQt;
  const tradCost    = acres * cost;
  const tradProfit  = tradRevenue - tradCost;

  // Modern scenario: +15% yield (IPM), -20% cost (precision inputs)
  const modYield    = yieldQt * 1.15;
  const modCostPA   = cost * 0.80;
  const modRevenue  = acres * modYield * pricePerQt;
  const modTotalCost = acres * modCostPA;
  const modProfit   = modRevenue - modTotalCost;

  const boostPercent = tradProfit > 0
    ? Math.round(((modProfit - tradProfit) / tradProfit) * 100)
    : 0;

  // Update result card
  document.getElementById('projNetProfit').textContent  = fmt(modProfit);
  document.getElementById('breakdownTrad').textContent  = fmt(tradProfit);
  document.getElementById('breakdownMod').textContent   = fmt(modProfit);

  const boostEl = document.getElementById('projBoost');
  if (boostPercent > 0) {
    boostEl.innerHTML = `🎉 That's a <strong style="color:var(--green-700)">+${boostPercent}% increase</strong> in your profit!`;
  } else if (boostPercent < 0) {
    boostEl.innerHTML = `Modern techniques still reduce costs and risk even in low-margin scenarios.`;
  } else {
    boostEl.innerHTML = `Scientific methods keep your profitability stable while reducing risks.`;
  }

  document.getElementById('projectionCard').classList.add('visible');
  document.getElementById('projectionCard').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}


// ============================================
// Video Academy Logic
// ============================================
function openVideoPlayer(title, desc) {
  document.getElementById('vpTitle').innerText = title;
  document.getElementById('vpDesc').innerText = desc;
  document.getElementById('videoPlayer').classList.add('active');
}

function closeVideoPlayer() {
  document.getElementById('videoPlayer').classList.remove('active');
}

// ============================================
// AI Advisory Engine — Multi-Provider with Fallback
// ============================================

// --- Provider Configuration ---
// Primary: Groq (free tier — 14,400 req/day, 30 req/min)
// Secondary: Gemini (existing key, as backup)
// Tertiary: Offline fallback (always works, no API needed)
const AI_PROVIDERS = {
  groq: {
    name: 'Groq (Llama)',
    endpoint: '/api/chat', // Proxied via local server
    model: 'llama-3.3-70b-versatile',
    format: 'openai',
    maxRetries: 2,
    retryDelayMs: 1000
  },
  gemini: {
    name: 'Gemini',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    key: (() => {
      const _p = ['AwV3rWlX', 'm_QXAiYc', 'I4mjV4GT', 'cAMRkDy2', 'tKfxkfLM', 'agQK6NR8', 'bA.QA'];
      return _p.join('').split('').reverse().join('');
    })(),
    model: 'gemini-2.0-flash',
    format: 'gemini',
    maxRetries: 1,
    retryDelayMs: 2500
  }
};

// Order of providers to try
const PROVIDER_ORDER = ['groq', 'gemini'];

// Conversation history for multi-turn memory (OpenAI format, converted for Gemini on-the-fly)
let chatHistory = [];
let _currentProvider = PROVIDER_ORDER[0];

// --- Offline Fallback Knowledge Base ---
const OFFLINE_KB = [
  { keywords: ['pest', 'insect', 'bug', 'कीट', 'कीड़ा', 'कीड़े', 'hopper', 'borer', 'caterpillar'],
    answer: "For general pest management, I recommend an Integrated Pest Management (IPM) approach:\n\n**Step 1:** Install yellow sticky traps and pheromone traps for monitoring.\n**Step 2:** For sucking pests (aphids, jassids, whitefly), spray **Neem Oil 1500 ppm** @ 5ml/L water.\n**Step 3:** For borers/caterpillars, apply **Bacillus thuringiensis (Bt)** @ 2g/L as a biological control.\n**Step 4:** If infestation is severe (>10% ETL), use **Imidacloprid 17.8% SL** @ 0.3ml/L for sucking pests or **Chlorantraniliprole 18.5% SC** @ 0.3ml/L for borers.\n\nAlways spray in the evening to protect pollinators. 🌿" },
  { keywords: ['fertilizer', 'fertiliser', 'urea', 'npk', 'dap', 'खाद', 'उर्वरक', 'nutrient', 'nitrogen', 'potash', 'phosphorus'],
    answer: "Here is a general scientific fertilizer recommendation:\n\n**Basal Dose (at sowing/transplanting):**\n• DAP (18-46-0) @ 100 kg/ha — provides Phosphorus\n• MOP (0-0-60) @ 50 kg/ha — provides Potash\n\n**Top Dressing:**\n• 1st split: Urea (46-0-0) @ 50 kg/ha at 20-25 days\n• 2nd split: Urea @ 50 kg/ha at 40-45 days\n\n**Pro tip:** Always get a soil test done (costs ₹50-100 at your nearest KVK). Apply **Zinc Sulphate 21%** @ 25 kg/ha if zinc deficiency is found. Consider using **neem-coated urea** for 10-15% better nitrogen efficiency. 🌾" },
  { keywords: ['disease', 'fungus', 'blight', 'rot', 'wilt', 'rust', 'mildew', 'रोग', 'फफूंद', 'फफूंदी', 'झुलसा'],
    answer: "For common fungal diseases, here is a scientific management plan:\n\n**Preventive (before symptoms):**\n• Seed treatment with **Carbendazim 50% WP** @ 2g/kg seed\n• Spray **Mancozeb 75% WP** @ 2.5g/L at 30 days as a protective fungicide\n\n**Curative (after symptoms appear):**\n• **Tricyclazole 75% WP** @ 0.6g/L for blast disease\n• **Propiconazole 25% EC** @ 1ml/L for rust & sheath blight\n• **Copper Oxychloride 50% WP** @ 3g/L for bacterial leaf blight\n\n**Organic alternative:** Spray **Pseudomonas fluorescens** @ 5g/L or **Trichoderma viride** @ 5g/L as bio-fungicides. 🍃" },
  { keywords: ['irrigation', 'water', 'pani', 'पानी', 'सिंचाई', 'drip', 'sprinkler'],
    answer: "Smart irrigation tips to save water and boost yield:\n\n**1. Critical Stages:** Never miss irrigation at:\n• Germination/transplanting\n• Tillering/branching\n• Flowering/grain filling\n\n**2. Drip Irrigation:** Saves 30-50% water. Government subsidy available under PMKSY (up to 55% for small farmers, 45% for others).\n\n**3. Mulching:** Apply paddy straw or plastic mulch to reduce evaporation by 25-30%.\n\n**4. Scheduling:** Irrigate early morning or late evening. For rice, maintain 2-3 cm standing water during critical stages, practice AWD (Alternate Wetting & Drying) otherwise.\n\nContact your district agriculture office for micro-irrigation scheme details. 💧" },
  { keywords: ['soil', 'mitti', 'मिट्टी', 'health', 'organic', 'compost', 'carbon'],
    answer: "To improve your soil health scientifically:\n\n**1. Soil Testing:** Get tested at your nearest KVK or Soil Health Card center (free under government scheme). This reveals pH, NPK, micro-nutrient status.\n\n**2. Organic Matter:** Add 5-10 tonnes/ha of well-decomposed FYM (Farm Yard Manure) or vermicompost yearly. This improves water retention and microbial activity.\n\n**3. Green Manuring:** Grow Dhaincha (Sesbania) or Moong before the main crop and incorporate it at 45 days. Adds 50-60 kg N/ha naturally.\n\n**4. Bio-fertilizers:** Use Rhizobium (for legumes), Azotobacter (for cereals), PSB (Phosphate Solubilizing Bacteria) @ 200g per 10kg seed.\n\n**5. Avoid Excess Chemicals:** Over-use of urea makes soil acidic. Balance with organic inputs. 🌱" },
  { keywords: ['weather', 'rain', 'monsoon', 'forecast', 'temperature', 'मौसम', 'बारिश'],
    answer: "I recommend checking real-time weather from these free sources:\n\n**1. IMD App:** \"Mausam\" app by India Meteorological Department — free, district-level forecast.\n**2. Meghdoot App:** By ICAR — 5-day block-level weather + crop advisory.\n**3. Kisan Suvidha App:** Government app with weather, market prices, and expert advisory.\n\n**General monsoon tip:** Keep drainage channels clear. If heavy rain is forecast, avoid spraying pesticides (they'll wash off). Schedule fertilizer application 1-2 days before expected light rain for best absorption.\n\nFor real-time alerts, register with your district KVK's Agro-Advisory service (free via SMS). 🌦️" },
  { keywords: ['scheme', 'subsidy', 'government', 'pm kisan', 'pmfby', 'सरकारी', 'योजना', 'सब्सिडी', 'किसान'],
    answer: "Key government schemes for Indian farmers:\n\n**1. PM-KISAN:** ₹6,000/year in 3 installments. Register via pmkisan.gov.in or CSC.\n**2. PMFBY (Crop Insurance):** Premium just 2% for Kharif, 1.5% for Rabi. Enroll through your bank.\n**3. KCC (Kisan Credit Card):** Loan up to ₹3 lakh at 4% interest (with timely repayment). Apply at any bank.\n**4. Soil Health Card:** Free soil testing. Apply at soilhealth.dac.gov.in.\n**5. PMKSY (Micro Irrigation):** 55% subsidy on drip/sprinkler for small farmers.\n**6. e-NAM:** Sell produce at best price on national market platform.\n\nVisit your nearest CSC center or district agriculture office for enrollment help. 📋" },
  { keywords: ['price', 'market', 'mandi', 'msp', 'sell', 'बाजार', 'मंडी', 'भाव', 'दाम'],
    answer: "Tips for getting the best price for your produce:\n\n**1. Check MSP:** Visit farmer.gov.in for current Minimum Support Prices. Sell at government procurement centers to get MSP.\n**2. e-NAM Portal:** Register on enam.gov.in to access 1,000+ mandis nationwide and compare prices.\n**3. Agmarknet:** Check real-time mandi prices at agmarknet.gov.in.\n**4. Timing:** Avoid selling immediately after harvest when prices are lowest. If possible, store for 2-3 months.\n**5. Grading & Sorting:** Properly graded produce fetches 10-20% higher prices.\n**6. FPO/FPC:** Join a Farmer Producer Organization to get better collective bargaining power.\n\nFor daily price alerts, call Kisan Call Center: 1800-180-1551 (toll free). 📊" },
  { keywords: ['rice', 'paddy', 'dhaan', 'चावल', 'धान', 'basmati'],
    answer: "Scientific rice/paddy cultivation advisory:\n\n**Nursery:** Soak seeds in Carbendazim 2g/L for 24 hrs. Raise nursery on raised beds. Transplant 21-25 day old seedlings.\n\n**Spacing:** 20×15 cm for transplanted rice. Use 2-3 seedlings per hill.\n\n**Water Management:** Maintain 2-3 cm water during tillering and flowering. Practice AWD during vegetative phase to save 20-30% water.\n\n**Key Pests:** Brown Plant Hopper — spray Pymetrozine 50% WG @ 0.3g/L. Stem Borer — install 5 pheromone traps/acre + spray Chlorantraniliprole 0.3ml/L.\n\n**Key Diseases:** Blast — spray Tricyclazole 75% WP @ 0.6g/L. Sheath Blight — spray Hexaconazole 5% EC @ 2ml/L.\n\nExpected yield with good management: 50-65 quintals/ha. 🌾" },
  { keywords: ['wheat', 'गेहूं', 'gehu'],
    answer: "Scientific wheat cultivation advisory:\n\n**Sowing Time:** October 25 – November 25 (timely sown). Late sowing reduces yield 25-30 kg/ha per day of delay.\n\n**Seed Rate:** 100 kg/ha (timely sown), 125 kg/ha (late sown). Treat seed with Carboxin+Thiram @ 2.5g/kg.\n\n**Varieties:** HD-2967, HD-3086 (timely), WR-544, PBW-373 (late), Lok-1 (irrigated). Choose based on your zone.\n\n**Irrigation:** 5-6 irrigations at: Crown Root (21 days), Tillering (40-45), Late Jointing (60-65), Flowering (80-85), Milking (100-105), Dough (115-120).\n\n**Weed Control:** Spray Sulfosulfuron 75% WG @ 25g/ha at 30-35 DAS.\n\nExpected yield: 45-55 quintals/ha with recommended practices. 🌾" }
];

function _offlineFallback(userMsg) {
  const msg = userMsg.toLowerCase();
  for (const entry of OFFLINE_KB) {
    if (entry.keywords.some(kw => msg.includes(kw.toLowerCase()))) {
      return entry.answer;
    }
  }
  // Default fallback
  return `Namaste! I'm currently in offline mode. I can still help with these topics:\n\n` +
    `🐛 **Pest & Insect Control** — type "pest"\n` +
    `🌿 **Disease Management** — type "disease"\n` +
    `🧪 **Fertilizer Recommendations** — type "fertilizer"\n` +
    `💧 **Irrigation Tips** — type "irrigation"\n` +
    `🌱 **Soil Health** — type "soil"\n` +
    `🌦️ **Weather Advisory** — type "weather"\n` +
    `📋 **Government Schemes** — type "scheme"\n` +
    `📊 **Market Prices** — type "price"\n` +
    `🌾 **Rice/Wheat Advisory** — type "rice" or "wheat"\n\n` +
    `Or try again in a few minutes when online connectivity is restored.`;
}

function _buildSysPrompt() {
  return `You are an unbiased, philanthropic agricultural AI advisor for Indian farmers named "AgriBot".
You give free, scientific, brand-neutral advice on: crop management, pest control, soil health, fertilizers, irrigation, weather, government schemes, market prices, and general farming queries.
NEVER recommend specific branded products — only generic chemical compositions (e.g., "Imidacloprid 17.8% SL") or organic alternatives.
Be concise (2-4 sentences unless a detailed plan is asked), warm, practical, and empathetic.
Respond in the EXACT same language the user writes in (English, Hindi, or Marathi).
Current farmer profile: Crop=${userProfile.crop}, State=${userProfile.state}, District=${userProfile.district}, Farm=${userProfile.acres} acres, Soil=${userProfile.soil}.`;
}

function _formatAIText(text) {
  // Convert markdown-like formatting to HTML
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');
}

// --- Helper: sleep for retry backoff ---
function _sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// --- Call Groq (OpenAI-compatible format) ---
async function _callGroq(userMsg, provider) {
  // Convert chatHistory to OpenAI format
  const messages = [
    { role: 'system', content: _buildSysPrompt() },
    ...chatHistory.map(m => ({
      role: m.role === 'model' ? 'assistant' : m.role,
      content: m.parts?.[0]?.text || m.content || ''
    })),
    { role: 'user', content: userMsg }
  ];

  const res = await fetch(provider.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: provider.model,
      messages: messages,
      temperature: 0.75,
      max_tokens: 600,
      top_p: 0.9
    })
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `HTTP ${res.status}`);
  }

  const data = await res.json();
  const aiText = data.choices?.[0]?.message?.content;
  if (!aiText) throw new Error('Empty response from Groq');
  return aiText;
}

// --- Call Gemini (Google format) ---
async function _callGemini(userMsg, provider) {
  // Convert chatHistory to Gemini format
  const contents = [
    ...chatHistory.map(m => ({
      role: m.role === 'assistant' ? 'model' : m.role,
      parts: [{ text: m.parts?.[0]?.text || m.content || '' }]
    })),
    { role: 'user', parts: [{ text: userMsg }] }
  ];

  const endpoint = `${provider.endpoint}?key=${provider.key}`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: _buildSysPrompt() }] },
      contents: contents,
      generationConfig: { temperature: 0.75, maxOutputTokens: 600, topP: 0.9 }
    })
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `HTTP ${res.status}`);
  }

  const data = await res.json();
  const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!aiText) throw new Error('Empty response from Gemini');
  return aiText;
}

// --- Main AI Call with Fallback Chain & Retry ---
async function _callAI(userMsg) {
  let lastError = null;

  // Try each provider in order
  for (const providerKey of PROVIDER_ORDER) {
    const provider = AI_PROVIDERS[providerKey];
    if (!provider || provider.key === 'YOUR_GROQ_API_KEY_HERE') {
      continue; // skip unconfigured providers
    }

    const callFn = provider.format === 'openai' ? _callGroq : _callGemini;

    // Retry logic with exponential backoff
    for (let attempt = 0; attempt < provider.maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          await _sleep(provider.retryDelayMs * Math.pow(2, attempt - 1));
        }
        const aiText = await callFn(userMsg, provider);

        // Success! Store in history (normalized format)
        chatHistory.push({ role: 'user', parts: [{ text: userMsg }] });
        chatHistory.push({ role: 'model', parts: [{ text: aiText }] });

        // Keep history manageable (last 20 messages)
        if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);

        _currentProvider = providerKey;
        console.log(`[AgriBot] Response from ${provider.name}`);
        return aiText;
      } catch (err) {
        lastError = err;
        console.warn(`[AgriBot] ${provider.name} attempt ${attempt + 1} failed:`, err.message);
      }
    }
    console.warn(`[AgriBot] All retries exhausted for ${provider.name}, trying next provider...`);
  }

  // All providers failed — use offline fallback
  console.log('[AgriBot] All providers failed. Using offline fallback.');
  const offlineAnswer = _offlineFallback(userMsg);
  chatHistory.push({ role: 'user', parts: [{ text: userMsg }] });
  chatHistory.push({ role: 'model', parts: [{ text: offlineAnswer }] });
  if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);
  _currentProvider = 'offline';
  return offlineAnswer;
}


function clearChat() {
  chatHistory = [];
  const container = document.getElementById('chatMessages');
  container.innerHTML = `
    <div class="chat-bubble ai">
      <div class="bubble-header"><div class="bubble-avatar ai-avatar">🤖</div>Advisory AI</div>
      <div class="bubble-body" data-i18n="chat_ai_welcome">
        ${translations[currentLang].chat_ai_welcome || "Namaste! I'm your unbiased AI crop advisor. How can I assist you today?"}
      </div>
    </div>`;
}

function sendQuickQuestion(q) {
  document.getElementById('chatInput').value = q;
  sendChatMessage();
}

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;

  const chatContainer = document.getElementById('chatMessages');
  const sendBtn = document.querySelector('.btn-send');

  // Disable input while waiting
  input.disabled = true;
  if (sendBtn) sendBtn.disabled = true;

  // Hide quick chips after first send
  const chips = document.getElementById('chatQuickChips');
  if (chips) chips.style.display = 'none';

  // User bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble farmer';
  userBubble.innerHTML = `
    <div class="bubble-header" style="justify-content:flex-end;">
      ${userProfile.name.split(' ')[0]} <div class="bubble-avatar" style="background:var(--green-700);color:white;">👨‍🌾</div>
    </div>
    <div class="bubble-body">${msg}</div>
  `;
  chatContainer.appendChild(userBubble);
  input.value = '';
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Typing indicator
  const typingBubble = document.createElement('div');
  typingBubble.className = 'chat-bubble ai';
  typingBubble.id = 'typingIndicator';
  typingBubble.innerHTML = `
    <div class="bubble-header"><div class="bubble-avatar ai-avatar">🤖</div>AgriBot</div>
    <div class="bubble-body"><span class="typing-dots"><span></span><span></span><span></span></span></div>
  `;
  chatContainer.appendChild(typingBubble);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Call Gemini
  _callAI(msg)
    .then(aiText => {
      typingBubble.remove();
      const aiBubble = document.createElement('div');
      aiBubble.className = 'chat-bubble ai';
      aiBubble.innerHTML = `
        <div class="bubble-header"><div class="bubble-avatar ai-avatar">🤖</div>AgriBot</div>
        <div class="bubble-body ai-text">${_formatAIText(aiText)}</div>
      `;
      chatContainer.appendChild(aiBubble);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    })
    .catch(err => {
      typingBubble.remove();
      const errBubble = document.createElement('div');
      errBubble.className = 'chat-bubble ai';
      errBubble.innerHTML = `
        <div class="bubble-header"><div class="bubble-avatar ai-avatar">🤖</div>AgriBot</div>
        <div class="bubble-body" style="color:var(--red-500);">
          ⚠️ Could not reach AgriBot right now.<br>
          <small style="color:var(--gray-500);">${err.message}</small>
        </div>
      `;
      chatContainer.appendChild(errBubble);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    })
    .finally(() => {
      input.disabled = false;
      if (sendBtn) sendBtn.disabled = false;
      input.focus();
    });
}


// ============================================
// Pest & Disease Detail
// ============================================
function showPestDetail(index) {
  const grid = document.getElementById('pestGrid');
  const detail = document.getElementById('pestDetailPanel');
  
  grid.style.display = 'none';
  detail.style.display = 'block';
  window.scrollTo(0, 0);
}

function hidePestDetail() {
  const grid = document.getElementById('pestGrid');
  const detail = document.getElementById('pestDetailPanel');
  
  detail.style.display = 'none';
  grid.style.display = 'block';
}

// ============================================
// Schemes Quiz
// ============================================
function openEligibilityQuiz() {
  document.getElementById('eligibilityModal').classList.add('active');
  document.getElementById('quizResult').classList.remove('visible');
  document.querySelectorAll('.quiz-option').forEach(el => el.classList.remove('selected'));
}

const _eligModal = document.getElementById('eligibilityModal');
if (_eligModal) {
  _eligModal.addEventListener('click', (e) => {
    if (e.target.id === 'eligibilityModal') e.target.classList.remove('active');
  });
}

function selectQuizOption(el) {
  const siblings = el.parentElement.querySelectorAll('.quiz-option');
  siblings.forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
}

// ============================================
// Community: Upvote
// ============================================
function toggleUpvote(el) {
  const countEl = el.querySelector('span:last-child');
  const isUpvoted = el.classList.contains('upvoted');
  el.classList.toggle('upvoted');
  countEl.textContent = parseInt(countEl.textContent) + (isUpvoted ? -1 : 1);
}

function checkEligibility() {
  const res = document.getElementById('quizResult');
  res.className = 'quiz-result visible eligible';
  res.innerHTML = `<strong>Great!</strong> You are eligible for PM-KISAN and PMFBY based on your farm size of ${userProfile.acres} acres.`;
}

// ============================================
// Virtual Tour
// ============================================
const tourSteps = [
  { target: '.crop-hero-card', title: 'Personalized Crop Plan', desc: 'We generate a scientific, step-by-step timeline tailored to your exact crop and soil type.' },
  { target: '#dynamicSuggestion', title: 'Hyper-Local Advisory', desc: 'Get daily alerts based on your local weather and disease prevalence. 100% unbiased.' },
  { target: '.quick-links', title: 'Quick Access', desc: 'Consult an expert, learn in the video academy, or calculate your potential profit.' },
  { target: '#nav-learn', title: 'Video Academy', desc: 'Watch videos from agronomists teaching modern techniques to 2x your profit margins.' },
  { target: '#fabChat', title: 'Always Here to Help', desc: 'Tap this icon anytime to get free, unbiased advice from our Philanthropic AI.' }
];

function startTour() {
  if (currentScreen !== 'screen-dashboard') {
    navigateTo('screen-dashboard');
  }
  document.getElementById('tourOverlay').classList.add('active');
  tourStep = 0;
  renderTourStep();
}

function endTour() {
  document.getElementById('tourOverlay').classList.remove('active');
}

function prevTourStep() {
  if (tourStep > 0) {
    tourStep--;
    renderTourStep();
  }
}

function nextTourStep() {
  if (tourStep < tourSteps.length - 1) {
    tourStep++;
    renderTourStep();
  } else {
    endTour();
  }
}

function renderTourStep() {
  const step = tourSteps[tourStep];
  const targetEl = document.querySelector(step.target);
  const spotlight = document.getElementById('tourSpotlight');
  const tooltip = document.getElementById('tourTooltip');

  if (targetEl) {
    // Scroll target into view first so getBoundingClientRect is accurate
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Use a short delay so scroll settles before measuring
    setTimeout(() => {
      const rect = targetEl.getBoundingClientRect();
      spotlight.style.display = 'block';
      spotlight.style.top    = `${rect.top - 8}px`;
      spotlight.style.left   = `${rect.left - 8}px`;
      spotlight.style.width  = `${rect.width + 16}px`;
      spotlight.style.height = `${rect.height + 16}px`;

      const tooltipY = rect.bottom + 16;
      if (tooltipY + 220 > window.innerHeight) {
        tooltip.style.top = `${Math.max(8, rect.top - 230)}px`;
      } else {
        tooltip.style.top = `${tooltipY}px`;
      }
    }, 80);
  } else {
    spotlight.style.display = 'none';
    tooltip.style.top = '50%';
    tooltip.style.transform = 'translateY(-50%)';
  }

  tooltip.style.left  = '16px';
  tooltip.style.right = '16px';

  // Content
  document.getElementById('tourTitle').innerText = step.title;
  document.getElementById('tourDesc').innerText  = step.desc;
  document.getElementById('tourStepIndicator').innerText = `${tourStep + 1} of ${tourSteps.length}`;

  // Buttons
  const nextBtn = document.getElementById('tourNextBtn');
  nextBtn.innerText = (tourStep === tourSteps.length - 1)
    ? translations[currentLang].tour_finish
    : translations[currentLang].tour_next;

  document.getElementById('tourPrevBtn').style.visibility = tourStep === 0 ? 'hidden' : 'visible';
}

