/** Editorial INBS articles (EN/AR). Review official sources before regulatory updates. */
export type InsightCategory = 'setup' | 'people' | 'compliance';
export type InsightSection = { heading: string; body: string };
export type InsightTranslation = { title: string; summary: string; categoryLabel: string; sections: InsightSection[] };
export type InsightArticle = { slug: string; category: InsightCategory; featured: boolean; sourceUrl: string; content: Record<'en'|'ar',InsightTranslation> };

export const insightArticles: InsightArticle[] = [
  {
    "slug": "starting-a-business-in-dubai",
    "category": "setup",
    "featured": true,
    "sourceUrl": "https://www.investindubai.gov.ae/business-setup/business-set-up-steps",
    "content": {
      "en": {
        "title": "Starting a business in Dubai: the decisions that come first",
        "summary": "A practical overview of activities, legal structures, names, premises and approvals before licensing.",
        "sections": [
          {
            "heading": "Begin with the activity, not the paperwork",
            "body": "Before choosing a licence, define what your business will actually do. Your primary and optional secondary activities determine which licensing options and approvals may apply. A clearly described activity also makes it easier to evaluate whether a mainland or free-zone structure suits your plans."
          },
          {
            "heading": "Match the legal form to the business",
            "body": "Consider ownership, the number of partners, the nature of your operations and potential expansion. The legal form influences documentation and governance. Do not assume that one structure is appropriate for every activity; check the permitted combinations with the relevant licensing authority."
          },
          {
            "heading": "Prepare the name, premises and documents",
            "body": "Trade-name reservation, initial approval, premises or office arrangements and constitutional documents are common parts of the process. Some activities need sector-specific approvals. Requirements and sequencing can vary, so treat any general checklist as a starting point rather than a guaranteed fixed procedure."
          },
          {
            "heading": "Verify before paying",
            "body": "Use Invest in Dubai or the relevant free-zone authority to confirm the activity, applicable fees, approvals and final submission requirements. Keep copies of approvals and clarify whether a quoted package covers the full operating needs of the business."
          }
        ],
        "categoryLabel": "Business setup"
      },
      "ar": {
        "title": "تأسيس شركة في دبي: القرارات الأساسية قبل بدء الإجراءات",
        "summary": "دليل عملي لاختيار النشاط والشكل القانوني والاسم التجاري والموقع والموافقات قبل إصدار الرخصة.",
        "sections": [
          {
            "heading": "ابدأ بالنشاط الاقتصادي قبل المستندات",
            "body": "حدّد طبيعة العمل الذي ستزاوله الشركة والأنشطة الرئيسية والثانوية المحتملة. يؤثر ذلك في نوع الرخصة والموافقات المطلوبة، ويساعد على اختيار التأسيس في البر الرئيسي أو إحدى المناطق الحرة وفقًا لاحتياجات المشروع."
          },
          {
            "heading": "اختر الشكل القانوني الملائم",
            "body": "راجع هيكل الملكية وعدد الشركاء وطبيعة التشغيل وخطط التوسع. يرتبط الشكل القانوني بالمستندات المطلوبة وآلية إدارة الشركة. ولا يُفترض أن يكون شكل قانوني واحد ملائمًا لجميع الأنشطة؛ لذا ينبغي التحقق من الخيارات المعتمدة لدى جهة الترخيص."
          },
          {
            "heading": "جهّز الاسم والموقع والوثائق",
            "body": "قد تتضمن الإجراءات حجز الاسم التجاري والموافقة المبدئية وتحديد مقر النشاط وتجهيز المستندات التأسيسية. وقد تحتاج بعض الأنشطة إلى موافقات إضافية. تختلف المتطلبات بحسب النشاط والجهة المختصة."
          },
          {
            "heading": "تحقق قبل دفع الرسوم",
            "body": "راجع بوابة «استثمر في دبي» أو سلطة المنطقة الحرة المعنية لمعرفة المتطلبات والرسوم والموافقات السارية. واحتفظ بنسخ من المستندات، وتحقق مما يشمله أي عرض تكلفة قبل اعتماد القرار."
          }
        ],
        "categoryLabel": "تأسيس الأعمال"
      }
    }
  },
  {
    "slug": "mainland-or-free-zone",
    "category": "setup",
    "featured": false,
    "sourceUrl": "https://www.investindubai.gov.ae/en/business-setup/company-set-up-options-in-dubai",
    "content": {
      "en": {
        "title": "Mainland or free zone? Choosing a business set-up route",
        "summary": "Compare the practical considerations behind two common establishment routes in Dubai.",
        "sections": [
          {
            "heading": "Start with where you intend to operate",
            "body": "A mainland company and a free-zone company operate under different licensing frameworks. The right choice depends on clients, permitted activities and the locations where transactions will take place—not solely on the headline price of a set-up package."
          },
          {
            "heading": "Understand market access",
            "body": "Dubai mainland licensing is managed by the Department of Economy and Tourism. Free zones operate under their own authorities, with activities and facilities that can be sector-specific. A free-zone licence does not by itself authorise every type of mainland trading; additional permissions or arrangements may be needed."
          },
          {
            "heading": "Look beyond the licence",
            "body": "Compare workspace requirements, employee and visa plans, ongoing renewals, permitted activities and likely amendments. Ownership provisions and tax treatment can depend on the legal entity and applicable rules; avoid relying on generic marketing claims."
          },
          {
            "heading": "Make a decision with verified details",
            "body": "Shortlist the jurisdictions that support your activity, then request written confirmation of licence scope, expected documents, current charges and operating restrictions from the competent authority."
          }
        ],
        "categoryLabel": "Business setup"
      },
      "ar": {
        "title": "البر الرئيسي أم المنطقة الحرة؟ كيف تختار مسار التأسيس",
        "summary": "مقارنة عملية للعوامل التي تساعدك على اختيار موقع تأسيس نشاطك التجاري في دبي.",
        "sections": [
          {
            "heading": "حدّد مكان ممارسة النشاط",
            "body": "يخضع تأسيس الشركات في البر الرئيسي والمناطق الحرة لأطر ترخيص مختلفة. يعتمد الخيار المناسب على طبيعة العملاء والأنشطة ومواقع التشغيل، وليس على تكلفة باقة التأسيس وحدها."
          },
          {
            "heading": "افهم نطاق ممارسة الأعمال",
            "body": "تختص دائرة الاقتصاد والسياحة في دبي بتراخيص البر الرئيسي، بينما تتولى كل منطقة حرة تنظيم التراخيص ضمن اختصاصها. ولا تتيح رخصة المنطقة الحرة تلقائيًا ممارسة جميع الأنشطة التجارية في البر الرئيسي؛ فقد تلزم تصاريح أو ترتيبات إضافية."
          },
          {
            "heading": "قارن متطلبات التشغيل المستمرة",
            "body": "راجع احتياجات المكتب وخطط الموظفين والإقامات وتجديد الرخصة وإمكانية تعديل الأنشطة. وقد تختلف قواعد الملكية والمعاملة الضريبية بحسب الكيان والأنظمة المطبقة؛ لذلك تجنّب الاعتماد على العبارات التسويقية العامة."
          },
          {
            "heading": "احسم القرار بناءً على معلومات موثقة",
            "body": "اختر الجهات التي تسمح بالنشاط المطلوب واطلب تفاصيل مكتوبة عن نطاق الرخصة والوثائق والرسوم والقيود التشغيلية الحالية من الجهة المختصة."
          }
        ],
        "categoryLabel": "تأسيس الأعمال"
      }
    }
  },
  {
    "slug": "understanding-uae-work-permits",
    "category": "people",
    "featured": false,
    "sourceUrl": "https://u.ae/en/information-and-services/jobs/employment-in-the-private-sector/job-offers-and-work-permits-and-contracts/work-permits",
    "content": {
      "en": {
        "title": "UAE work permits: what employers should understand",
        "summary": "A clear introduction to permit selection, employment records and compliance checks.",
        "sections": [
          {
            "heading": "A permit is not an optional formality",
            "body": "Under the UAE employment framework, eligible workers must hold the relevant work permit before starting regulated employment. Employers should confirm which authority governs the establishment and what approval is required for the role."
          },
          {
            "heading": "Choose the appropriate permit type",
            "body": "Different arrangements—including recruitment from abroad, employee transfers and part-time or temporary work—may call for different permits. A permit category should reflect the actual job arrangement, not simply the quickest available application route."
          },
          {
            "heading": "Check the establishment and job details",
            "body": "An employer should verify the validity of its business licence, the compatibility of the job with its licensed activities and any qualification or profession-specific conditions. Correct and consistent employee and company records help avoid delays."
          },
          {
            "heading": "Maintain compliance after approval",
            "body": "Permits can require renewal, amendment or cancellation as circumstances change. Employers should follow applicable employment rules and the relevant ministry or free-zone procedures, rather than assuming issuance ends their obligations."
          }
        ],
        "categoryLabel": "People & residency"
      },
      "ar": {
        "title": "تصاريح العمل في الإمارات: ما الذي ينبغي على أصحاب الأعمال معرفته؟",
        "summary": "مقدمة واضحة لأنواع تصاريح العمل وبيانات التوظيف ومتطلبات الامتثال.",
        "sections": [
          {
            "heading": "تصريح العمل متطلب أساسي",
            "body": "تتطلب علاقات العمل المشمولة بالتنظيم الحصول على تصريح العمل المناسب قبل بدء العمل وفقًا للأنظمة الإماراتية. وعلى صاحب العمل تحديد الجهة المختصة بالمنشأة وطبيعة الموافقة المطلوبة."
          },
          {
            "heading": "اختر فئة التصريح المناسبة",
            "body": "قد تختلف فئة التصريح بحسب استقدام موظف من الخارج أو انتقاله بين المنشآت أو العمل الجزئي أو المؤقت. ويجب أن تعكس الفئة المختارة طبيعة العلاقة الفعلية، لا أن تكون مجرد المسار الأسرع للتقديم."
          },
          {
            "heading": "راجع بيانات المنشأة والوظيفة",
            "body": "من المهم التحقق من سريان الرخصة التجارية وتوافق الوظيفة مع الأنشطة المرخصة، إلى جانب المتطلبات المهنية والمؤهلات الخاصة عند انطباقها. ويساعد اتساق بيانات المنشأة والموظف على تقليل التأخير."
          },
          {
            "heading": "تابع الالتزامات بعد الإصدار",
            "body": "قد تتطلب التصاريح تجديدًا أو تعديلًا أو إلغاءً عند تغير ظروف العمل. ولا ينتهي الالتزام بمجرد صدور التصريح؛ بل يستمر التقيد بإجراءات الجهة المختصة وأنظمة العمل المطبقة."
          }
        ],
        "categoryLabel": "الموظفون والإقامة"
      }
    }
  },
  {
    "slug": "family-residency-preparation",
    "category": "people",
    "featured": false,
    "sourceUrl": "https://u.ae/en/information-and-services/visa-and-emirates-id/residence-visas/residence-visa-for-family-members",
    "content": {
      "en": {
        "title": "Family residence in the UAE: preparing your documents",
        "summary": "What residents should review before starting a family sponsorship application.",
        "sections": [
          {
            "heading": "Confirm the sponsorship route",
            "body": "Eligibility for family residence depends on the sponsor’s valid residence status and other conditions set by the responsible authority. Requirements can change, so check the current rules for the emirate where the application will be processed."
          },
          {
            "heading": "Review supporting documents early",
            "body": "Applicants may need identification documents, evidence of family relationships, accommodation details and a sponsor’s residency and employment records. Some documents may require attestation or translation; prepare them before submitting the application."
          },
          {
            "heading": "Plan for medical and identity steps",
            "body": "Adult dependants may need medical fitness checks, and residence processing is connected with Emirates ID requirements. The correct order and applicable appointments depend on individual circumstances and the current authority workflow."
          },
          {
            "heading": "Keep records up to date",
            "body": "A dependant’s status may be affected by changes to the sponsor’s residency. Monitor expiry dates, retain confirmation of submissions and use the official ICP or Dubai residency channels for the latest instructions."
          }
        ],
        "categoryLabel": "People & residency"
      },
      "ar": {
        "title": "إقامة أفراد الأسرة في الإمارات: الاستعداد قبل تقديم الطلب",
        "summary": "ما ينبغي مراجعته من شروط ووثائق قبل البدء في إجراءات كفالة أفراد الأسرة.",
        "sections": [
          {
            "heading": "تحقق من أهلية الكفالة",
            "body": "ترتبط أهلية كفالة أفراد الأسرة بسريان إقامة الكفيل واستيفاء الشروط التي تحددها الجهة المختصة. وقد تتغير المتطلبات، لذا ينبغي مراجعة القواعد الحالية في الإمارة التي ستُقدَّم فيها المعاملة."
          },
          {
            "heading": "راجع المستندات مبكرًا",
            "body": "قد تشمل الوثائق المطلوبة إثبات الهوية وصلة القرابة والسكن، بالإضافة إلى بيانات إقامة الكفيل وعمله. وقد تستلزم بعض الوثائق تصديقًا أو ترجمة، لذلك يُفضَّل تجهيزها قبل تقديم الطلب."
          },
          {
            "heading": "استعد للفحص والهوية",
            "body": "قد يُطلب الفحص الطبي من بعض المعالين البالغين، وترتبط إجراءات الإقامة بمتطلبات الهوية الإماراتية. ويختلف ترتيب الخطوات والمواعيد بحسب حالة الطلب والإجراءات المعتمدة."
          },
          {
            "heading": "تابع صلاحية الوثائق والإقامة",
            "body": "قد يؤثر تغيير وضع إقامة الكفيل في إقامة أفراد أسرته. احرص على متابعة تواريخ الانتهاء والاحتفاظ بإثباتات التقديم والرجوع إلى القنوات الرسمية للهوية والجنسية أو الإقامة في دبي."
          }
        ],
        "categoryLabel": "الموظفون والإقامة"
      }
    }
  },
  {
    "slug": "vat-registration-business-planning",
    "category": "compliance",
    "featured": false,
    "sourceUrl": "https://tax.gov.ae/en/taxes/vat/vat.topics/registration.for.vat.aspx",
    "content": {
      "en": {
        "title": "VAT registration in the UAE: planning ahead",
        "summary": "Understand the registration thresholds and why businesses should monitor taxable activity.",
        "sections": [
          {
            "heading": "Know what the thresholds measure",
            "body": "The Federal Tax Authority states a mandatory VAT registration threshold of AED 375,000 for taxable supplies and imports, with a voluntary threshold of AED 187,500 under applicable conditions. These figures do not represent total company value or a blanket tax exemption."
          },
          {
            "heading": "Monitor both past and expected activity",
            "body": "The registration assessment can consider taxable supplies and imports over the preceding 12 months as well as expected levels in the next 30 days. A business should track relevant transactions and avoid waiting until the end of the financial year to review its position."
          },
          {
            "heading": "Keep supporting records organised",
            "body": "Maintain consistent invoices, transaction classifications and import records. If your circumstances include exempt or zero-rated activities, overseas transactions or connected entities, the detailed treatment may need further review."
          },
          {
            "heading": "Confirm requirements with the authority",
            "body": "Use the Federal Tax Authority’s current guidance and registration service for eligibility, timing and documentary requirements. Where treatment is unclear, seek qualified tax advice before making a filing decision."
          }
        ],
        "categoryLabel": "Tax & compliance"
      },
      "ar": {
        "title": "التسجيل في ضريبة القيمة المضافة: التخطيط المبكر للأعمال",
        "summary": "فهم حدود التسجيل الضريبي وأهمية متابعة التوريدات والواردات الخاضعة للضريبة.",
        "sections": [
          {
            "heading": "افهم ما تقيسه حدود التسجيل",
            "body": "توضح الهيئة الاتحادية للضرائب أن حد التسجيل الإلزامي لضريبة القيمة المضافة يبلغ 375,000 درهم للتوريدات والواردات الخاضعة للضريبة، بينما يبلغ حد التسجيل الاختياري 187,500 درهم وفق الشروط المطبقة. ولا تمثل هذه الحدود القيمة الإجمالية للشركة أو إعفاءً ضريبيًا عامًا."
          },
          {
            "heading": "راقب النشاط السابق والمتوقع",
            "body": "يمكن أن يعتمد تقييم التسجيل على التوريدات والواردات الخاضعة للضريبة خلال الاثني عشر شهرًا السابقة، وعلى التوقعات للأيام الثلاثين المقبلة. لذلك يُنصح بمتابعة المعاملات بانتظام بدل انتظار نهاية السنة المالية."
          },
          {
            "heading": "نظّم السجلات الداعمة",
            "body": "احتفظ بفواتير واضحة وتصنيفات دقيقة للمعاملات وسجلات الواردات. وقد تتطلب الأنشطة المعفاة أو الخاضعة لنسبة الصفر أو المعاملات الخارجية دراسة إضافية لتحديد المعاملة الضريبية الصحيحة."
          },
          {
            "heading": "تحقق من المتطلبات الرسمية",
            "body": "راجع إرشادات الهيئة الاتحادية للضرائب وخدمات التسجيل الحالية لمعرفة الأهلية والمواعيد والوثائق. وعند وجود حالة غير واضحة، يُفضَّل الرجوع إلى مختص ضريبي مؤهل قبل اتخاذ قرار التقديم."
          }
        ],
        "categoryLabel": "الضرائب والامتثال"
      }
    }
  }
];

export function findInsight(slug:string){return insightArticles.find(article=>article.slug===slug)}
