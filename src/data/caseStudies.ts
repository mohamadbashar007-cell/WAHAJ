export type CaseContent = { challenge: [string, string]; approach: [string, string]; delivery: [string, string]; role: [string, string]; stack?: string[]; gallery?: { src: string; alt: string; altAr: string }[] }
export const caseContent: Record<string, CaseContent> = {
  wesal: {
    challenge: ['A travel brand needs to communicate the feeling of a journey while keeping its bilingual website easy to navigate. The identity and digital experience need to speak the same visual language.', 'تحتاج علامة السفر إلى نقل إحساس الرحلة مع الحفاظ على سهولة تصفح الموقع بالعربية والإنجليزية. لذلك ترتبط الهوية وتجربة الموقع بلغة بصرية واحدة.'],
    approach: ['A mountain road gives the website a clear sense of direction and movement. Warm light supports the travel atmosphere, while a restrained interface keeps the landscape and message readable. The bilingual identity carries the idea of connection into the logo.', 'يمنح الطريق الجبلي الموقع إحساساً بالاتجاه والحركة. تدعم الإضاءة الدافئة أجواء السفر، وتترك الواجهة الهادئة مساحة للمشهد والرسالة. وتمتد فكرة الوصل إلى الشعار ثنائي اللغة.'],
    delivery: ['The project brings together a bilingual logo, visual identity and responsive travel website. HTML, CSS and JavaScript translate the art direction into layouts that adapt from desktop to mobile.', 'يجمع المشروع شعاراً ثنائي اللغة وهوية بصرية وموقع سفر متجاوباً. يترجم HTML وCSS وJavaScript الاتجاه الفني إلى تخطيطات تناسب الحاسوب والهاتف.'],
    role: ['Visual identity, art direction and frontend development', 'الهوية البصرية والإخراج الفني وتطوير الواجهة'], stack: ['HTML', 'CSS', 'JavaScript', 'Vite'],
    gallery: [{ src: '/projects/design/wesal-logo-identity.webp', alt: 'Wesal bilingual logo and visual identity presentation', altAr: 'عرض شعار وصال وهويته البصرية بالعربية والإنجليزية' }],
  },
  'kroma-era': {
    challenge: ['Kroma Era is a clothing brand with an identity built around modern nostalgia. Its visual system needs to connect expressive fashion imagery with a recognizable name.', 'كرومـا إيرا علامة ملابس تستلهم الحنين بروح معاصرة. تربط هويتها صور الأزياء التعبيرية باسم واضح يمكن تمييزه.'],
    approach: ['Editorial collage gives the fashion imagery variety and rhythm. Expressive typography anchors the composition so the brand name remains a focal point across the different images.', 'يمنح الكولاج التحريري صور الأزياء تنوعاً وإيقاعاً. وتثبت الكتابة التعبيرية التكوين ليظل اسم العلامة نقطة تركيز رغم اختلاف الصور.'],
    delivery: ['A logo and visual identity system for fashion communication. The presentation pairs the wordmark with an editorial image treatment, establishing a consistent relationship between type and photography.', 'شعار ونظام هوية بصرية للتواصل في مجال الأزياء. يربط العرض الشعار الكتابي بمعالجة تحريرية للصور، ويحدد علاقة متسقة بين الخط والتصوير.'],
    role: ['Logo design and visual identity', 'تصميم الشعار والهوية البصرية'],
  },
  zaman: {
    challenge: ['Zaman presents industrial supplies and food materials to different audiences. Its corporate website needs to explain those activities clearly in both Arabic and English.', 'تقدم زمان مستلزمات صناعية ومواد غذائية لجمهور متنوع. يحتاج موقعها المؤسسي إلى شرح تلك الأنشطة بوضوح بالعربية والإنجليزية.'],
    approach: ['Industrial photography establishes the company context immediately. A structured content hierarchy separates business information and product presentation, while bilingual layouts make the same content accessible in either reading direction.', 'توضح الصور الصناعية مجال الشركة من اللحظة الأولى. يفصل التسلسل المنظم للمحتوى بين معلومات النشاط وعرض المنتجات، وتتيح التخطيطات ثنائية اللغة قراءة المعلومات في الاتجاهين.'],
    delivery: ['A responsive corporate website with bilingual content, product-oriented structure and document presentation. Reusable React components support consistent navigation and interface behavior.', 'موقع مؤسسي متجاوب بمحتوى ثنائي اللغة وهيكل لعرض المنتجات والمستندات. تدعم مكونات React القابلة لإعادة الاستخدام اتساق الملاحة وسلوك الواجهة.'],
    role: ['Website design and frontend development', 'تصميم الموقع وتطوير الواجهة'], stack: ['JavaScript', 'React', 'Vite', 'CSS', 'PDF.js'],
  },
  pain: {
    challenge: ['This university book-cover study explores how an internal feeling can become a visual object. The cover must communicate an emotional subject through a single, focused composition.', 'تستكشف هذه الدراسة الجامعية لغلاف كتاب تحويل شعور داخلي إلى تعبير بصري. ينقل الغلاف موضوعاً وجدانياً عبر تكوين واحد مركز.'],
    approach: ['A sculptural profile acts as the central image. Red typography introduces tension and gives the short title a strong visual presence. The limited composition keeps attention on the relationship between the title and the figure.', 'يشكل الوجه النحتي الصورة المركزية. تضيف الكتابة الحمراء توتراً وتمنح العنوان القصير حضوراً قوياً. ويحافظ التكوين المحدود على التركيز في العلاقة بين العنوان والشكل.'],
    delivery: ['An editorial book-cover concept combining image selection, composition and typography. This is an academic design study, presented as a cover exploration rather than a commercial publication.', 'مقترح لغلاف كتاب يجمع اختيار الصورة والتكوين والتصميم الطباعي. العمل دراسة أكاديمية تستكشف تصميم الغلاف، وليس إصداراً تجارياً.'],
    role: ['Editorial cover design and art direction', 'تصميم الغلاف والإخراج الفني'],
  },
  segybc: {
    challenge: ['The Syrian Egyptian Business Council needs to present economic partnership, opportunities and council activity with institutional clarity, in Arabic and English.', 'يحتاج مجلس الأعمال السوري المصري إلى عرض الشراكة الاقتصادية والفرص وأنشطة المجلس بوضوح مؤسسي بالعربية والإنجليزية.'],
    approach: ['A structured platform gives leadership, activity and partnership content distinct places in the interface. Consistent navigation and bilingual layouts help visitors follow the council’s information without losing their place.', 'تمنح المنصة المنظمة محتوى القيادة والأنشطة والشراكة مساحات واضحة في الواجهة. وتساعد الملاحة المتسقة والتخطيطات ثنائية اللغة الزوار على متابعة المعلومات بسهولة.'],
    delivery: ['A responsive institutional website with multilingual journeys and a scalable content structure. TypeScript and React support reusable interface components across the platform.', 'موقع مؤسسي متجاوب برحلات ثنائية اللغة وهيكل محتوى قابل للتوسع. يدعم TypeScript وReact مكونات واجهة قابلة لإعادة الاستخدام عبر المنصة.'],
    role: ['Interface design and frontend development', 'تصميم الواجهات وتطويرها'], stack: ['TypeScript', 'React', 'Vite', 'Tailwind CSS'],
  },
}
