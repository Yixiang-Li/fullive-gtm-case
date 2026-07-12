"use client";

import { useEffect, useState } from "react";

type Language = "en" | "zh";
type Localized = { en: string; zh: string };

const text = (value: Localized, language: Language) => value[language];

const parts = [
  { number: 1, title: { en: "Market research", zh: "市场研究" } },
  { number: 2, title: { en: "Consumer research", zh: "消费者研究" } },
  { number: 3, title: { en: "Creators", zh: "创作者" } },
  { number: 4, title: { en: "Landing page", zh: "落地页" } },
  { number: 5, title: { en: "AI workflow", zh: "AI 工作流" } },
];

const competitors = [
  {
    name: "Soluna Sleep",
    tab: "Soluna",
    url: "https://solunasleep.com/",
    role: { en: "Direct multisensory competitor", zh: "直接多感官竞品" },
    status: { en: "Pre-launch; launching soon", zh: "上市前；即将推出" },
    price: { en: "Not publicly shown", zh: "未公开价格" },
    positioning: { en: "An AI-powered sleep device that adjusts light, sound, scent and temperature to personalize the bedroom throughout the night.", zh: "通过 AI 在整夜调节灯光、声音、香氛和温度，实现卧室环境个性化的睡眠设备。" },
    target: { en: "Consumers who want a low-effort, drug-free alternative to wearing a tracker or collecting more sleep data.", zh: "不想再佩戴追踪设备、也不想增加更多睡眠数据，希望用非药物方式改善睡眠的人。" },
    strength: { en: "The closest public product promise to Fullive's AI-powered, multisensory sleep-space concept.", zh: "在公开产品中，它与 Fullive“AI 协同多种感官调节睡眠环境”的设想最接近。" },
    weakness: { en: "The current site says 'launching soon' and does not show a public price. Availability and independent evidence remain unclear.", zh: "当前官网显示“即将推出”，且未公开售价；可用性与独立证据仍不明确。" },
    insight: { en: "This suggests multisensory novelty may be difficult to own through messaging alone. Part 2 can test whether coordination, evidence or ease of use matters most.", zh: "这说明“多感官”本身未必能成为独占卖点。Part 2 应验证用户最看重的是环境协同、效果依据，还是使用省心。" },
  },
  {
    name: "Naptick",
    tab: "Naptick",
    url: "https://www.naptick.com/product.html",
    role: { en: "AI bedside competitor", zh: "AI 床头竞品" },
    status: { en: "Pre-order; Batch 3 ships Aug 2026", zh: "预售；第 3 批预计 2026 年 8 月发货" },
    price: { en: "$349; app included", zh: "$349；App 包含在内" },
    positioning: { en: "A phone-free AI sleep coach with light therapy, 1,000+ soundscapes and live room sensing.", zh: "结合光疗、1,000 多种声音场景和实时房间感知的无手机 AI 睡眠教练。" },
    target: { en: "Professionals, light sleepers and people whose racing thoughts or phone habits delay sleep.", zh: "因思绪停不下来或刷手机拖延入睡的职场人和浅眠人群。" },
    strength: { en: "A clear bedside use case, understandable benefits and much lower adoption friction than a smart bed.", zh: "床头使用场景明确、利益点容易理解，使用门槛远低于智能床。" },
    weakness: { en: "Its sensors primarily produce a room score and recommendations; public materials do not show autonomous sleep-stage intervention.", zh: "其传感器主要产生房间评分和建议；公开资料没有展示根据睡眠阶段自动干预。" },
    insight: { en: "A useful research question is whether autonomous intervention feels meaningfully more valuable than coaching, recommendations and scheduled routines.", zh: "需要验证：与睡眠指导、建议和预设流程相比，用户是否真会为“自动响应”多付钱。" },
  },
  {
    name: "Kimba",
    tab: "Kimba",
    url: "https://kimba.ai/products/kimba-preorder-reservation",
    role: { en: "Adaptive scent competitor", zh: "自适应香氛竞品" },
    status: { en: "Pre-order; shipping planned Jan 2027", zh: "预售；计划 2027 年 1 月发货" },
    price: { en: "$299 first-release six-month plan; $99 deposit", zh: "首发六个月计划 $299；预订支付 $99" },
    positioning: { en: "A real-time sleep scent system that reads signals and releases personalized scent at selected moments.", zh: "读取睡眠信号并在选定时机释放个性化香氛的实时睡眠系统。" },
    target: { en: "Adults who struggle to fall or stay asleep and want an alternative to medication or passive trackers.", zh: "难以入睡或容易夜醒、希望少依赖药物或被动追踪器的成年人。" },
    strength: { en: "The clearest benchmark for connecting built-in sensing, wearable data and responsive scent delivery.", zh: "在整合内置感知、可穿戴数据与响应式香氛释放方面，路径最清楚。" },
    weakness: { en: "It relies on one primary modality and recurring scent capsules; the current catalogue lists multiple reservation offers, while outcome claims remain largely company-reported.", zh: "主要依赖香氛这一种感官方式，并需要持续购买胶囊；当前页面存在多种预订方案，效果数据也主要来自公司自身。" },
    insight: { en: "Part 2 can test whether multisensory breadth raises perceived value or instead creates more safety and complexity concerns than a focused scent solution.", zh: "Part 2 可以测试：多感官范围会提升感知价值，还是会比单一香氛方案带来更多安全与复杂度顾虑。" },
  },
  {
    name: "Eight Sleep Pod 5",
    tab: "Eight Sleep",
    url: "https://www.eightsleep.com/product/pod-cover",
    role: { en: "Premium closed-loop benchmark", zh: "高端闭环标杆" },
    status: { en: "Available", zh: "已上市" },
    price: { en: "$2,999 list / $2,749 promo; Autopilot from $199/year", zh: "$2,999 标价 / $2,749 促销；Autopilot 每年 $199 起" },
    positioning: { en: "A premium mattress cover that tracks sleep and automatically adjusts temperature for each side of the bed.", zh: "追踪睡眠并为床的两侧自动调节温度的高端床垫套。" },
    target: { en: "Affluent performance optimizers and couples with different thermal preferences.", zh: "愿意为健康与状态投入的高收入人群，以及睡眠温度偏好不同的伴侣。" },
    strength: { en: "A mature commercial reference for sensing, personalization and automatic environmental intervention.", zh: "在感知、个性化和自动环境干预方面成熟的商业参考。" },
    weakness: { en: "High upfront cost, required first-year software and installation commitment; the main intervention is temperature.", zh: "前期成本高、首年必须订阅软件且安装投入较大；主要干预仍是温度。" },
    insight: { en: "Eight Sleep is a useful premium reference for automation and recurring value, although its mattress format and price make a direct comparison imperfect.", zh: "Eight Sleep 可以作为自动化和持续价值的高端参考，但其床垫形态与价格意味着两者并不适合直接比较。" },
  },
  {
    name: "Hatch Restore 3",
    tab: "Hatch",
    url: "https://www.hatch.co/restore",
    role: { en: "Bedside sleep-device benchmark", zh: "床头睡眠设备标杆" },
    status: { en: "Available", zh: "已上市" },
    price: { en: "$169.99; 30 days of Hatch+ included", zh: "$169.99；包含 30 天 Hatch+" },
    positioning: { en: "A smart sleep clock that helps users build gentle, phone-free bedtime and wake-up routines.", zh: "帮助用户建立不依赖手机的睡前与起床习惯的智能睡眠时钟。" },
    target: { en: "Design-conscious mainstream consumers who value routine, calm and a gentle sunrise wake-up.", zh: "重视睡前习惯、安静体验和日出唤醒，同时在意产品设计的主流消费者。" },
    strength: { en: "Excellent consumer comprehension, polished hardware and broad North American availability.", zh: "消费者认知清晰、硬件成熟，并在北美广泛销售。" },
    weakness: { en: "Limited sensing and closed-loop adaptation; premium content can add subscription friction.", zh: "感知和闭环自适应有限；高级内容可能带来订阅阻力。" },
    insight: { en: "Part 2 should test whether people initially classify Fullive as a bedside sleep device, an AI wellness device or a more comprehensive sleep system.", zh: "Part 2 应测试消费者第一反应会把 Fullive 归类为床头睡眠设备、AI 健康产品，还是更完整的睡眠系统。" },
  },
  {
    name: "Sleepme Chilipad 2.0",
    tab: "Sleepme",
    url: "https://sleep.me/product/chilipad",
    role: { en: "Active environment benchmark", zh: "主动环境标杆" },
    status: { en: "Available", zh: "已上市" },
    price: { en: "From $1,599 single-zone; no subscription", zh: "单区 $1,599 起；无需订阅" },
    positioning: { en: "A premium water-powered mattress cover with automatic temperature schedules and no subscription.", zh: "通过水循环执行自动温度计划、无需订阅的高端床垫套。" },
    target: { en: "Hot sleepers and couples who want active temperature control without mandatory tracking or recurring fees.", zh: "怕热、需要主动控温，又不想被强制追踪或持续付费的人和伴侣用户。" },
    strength: { en: "A credible mid-premium alternative that makes ownership, offline control and no subscription central to the offer.", zh: "可信的中高端替代方案，把设备所有权、离线控制和无订阅作为核心卖点。" },
    weakness: { en: "Personalization is schedule-led rather than a rich biometric loop; mattress installation still creates commitment.", zh: "个性化主要依靠预设计划而非丰富的生物识别闭环；床垫安装仍带来较高投入。" },
    insight: { en: "Its no-subscription offer suggests that acceptance of refills or software fees should be tested explicitly rather than assumed.", zh: "其无订阅方案说明，消费者是否接受耗材或软件持续费用，需要被明确测试，而不应预设。" },
  },
  {
    name: "Apollo Neuro",
    tab: "Apollo",
    url: "https://apolloneuro.com/pages/apollo-wearable",
    role: { en: "AI intervention benchmark", zh: "AI 干预标杆" },
    status: { en: "Available", zh: "已上市" },
    price: { en: "$368 current promo / $448 MSRP; first year of SmartVibes included", zh: "当前促销 $368 / MSRP $448；包含首年 SmartVibes" },
    positioning: { en: "A wearable that uses personalized vibrations and AI timing to support calm and prevent unwanted wake-ups.", zh: "通过个性化震动和 AI 时机控制来支持平静状态、减少不必要醒来的可穿戴设备。" },
    target: { en: "Stressed, overstimulated wellness consumers who want active support rather than passive tracking.", zh: "压力大、难以放松，希望获得主动帮助而不只是被动记录的健康科技消费者。" },
    strength: { en: "A commercially available example of AI personalization paired with active, real-time vibration; the company presents wake-up prevention as a benefit.", zh: "已商业化的可穿戴干预标杆：AI 个性化与实时震动干预结合，品牌将“减少不必要醒来”作为卖点。" },
    weakness: { en: "Users must wear and charge a device; many efficacy figures are company-reported and require source-level scrutiny.", zh: "用户必须佩戴和充电；许多效果数字来自公司自身，需要进一步核验原始研究。" },
    insight: { en: "Apollo is a useful reference for explaining when AI-triggered action occurs. Whether ambient intervention feels preferable to a wearable remains a research question.", zh: "Apollo 是解释 AI 何时触发行动的有用参考；环境式干预是否比可穿戴方式更受欢迎，仍需研究。" },
  },
  {
    name: "Sleep.ai / SleepScore",
    tab: "Sleep.ai",
    url: "https://www.sleep.ai/",
    role: { en: "Measurement and validation adjacency", zh: "测量与验证邻近产品" },
    status: { en: "Available", zh: "已上市" },
    price: { en: "Consumer free/premium access; B2B services are quote-based", zh: "消费者免费/高级版本；B2B 服务按项目报价" },
    positioning: { en: "A sleep-intelligence layer offering non-contact consumer measurement, APIs, research and product validation.", zh: "提供非接触式消费者测量、API、研究和产品验证的睡眠智能层。" },
    target: { en: "Consumers seeking sleep insight and companies that need measurement or validation for product claims.", zh: "希望了解自身睡眠状况的消费者，以及需要测量或验证产品主张的企业。" },
    strength: { en: "Research capability, non-contact measurement and infrastructure for validating sleep products.", zh: "拥有研究能力、非接触式测量，以及验证睡眠产品的基础设施。" },
    weakness: { en: "It measures and advises but does not own a multisensory intervention device.", zh: "主要负责测量和建议，并不拥有多感官干预设备。" },
    insight: { en: "Sleep.ai could be explored as a measurement or validation partner. Part 2 should first test how much proof and sleep data influence purchase confidence.", zh: "Sleep.ai 值得作为测量或验证伙伴进一步了解。Part 2 需要先确认：效果依据和睡眠数据对购买信心到底有多大影响。" },
  },
];

function LandscapeFigure({ language }: { language: Language }) {
  return (
    <figure className="wide-figure">
      <div className="landscape-visual" role="img" aria-label={language === "en" ? "Eight-product competitive landscape" : "八个产品的竞争格局"}>
        <div className="landscape-title"><h3>{language === "en" ? "Eight products across the sleep-technology market" : "睡眠科技市场中的八个相关产品"}</h3><p>{language === "en" ? "Current public offer · 11 Jul 2026" : "当前公开产品 · 2026 年 7 月 11 日"}</p></div>
        <div className="landscape-header"><span>{language === "en" ? "Product" : "产品"}</span><span>{language === "en" ? "Market role" : "市场角色"}</span><span>{language === "en" ? "Public price" : "公开价格"}</span><span>{language === "en" ? "Status" : "状态"}</span></div>
        {competitors.map((item) => <div className="landscape-row" key={item.name}><strong>{item.tab}</strong><span>{text(item.role, language)}</span><span>{text(item.price, language)}</span><span><i className={item.status.en === "Available" ? "available" : "early"} />{text(item.status, language)}</span></div>)}
      </div>
      <figcaption>{language === "en" ? "Prices are snapshots from first-party pages and are not normalized because hardware scope and recurring costs differ." : "价格来自第一方页面快照。由于硬件范围和持续费用不同，未对价格进行强行标准化。"}</figcaption>
    </figure>
  );
}

function CompetitorExplorer({ language }: { language: Language }) {
  const [selected, setSelected] = useState(0);
  const item = competitors[selected];
  return (
    <div className="wide-module">
      <div className="profile-tabs" role="tablist" aria-label={language === "en" ? "Competitor profiles" : "竞品档案"}>
        {competitors.map((competitor, index) => <button type="button" role="tab" aria-selected={selected === index} className={selected === index ? "active" : ""} onClick={() => setSelected(index)} key={competitor.name}>{competitor.tab}</button>)}
      </div>
      <figure className="profile-figure">
        <div className="profile-heading"><div><span>{text(item.role, language)}</span><h3><a href={item.url} target="_blank" rel="noreferrer">{item.name} ↗</a></h3></div><div><b>{text(item.price, language)}</b><span>{text(item.status, language)}</span></div></div>
        <p className="profile-positioning">{text(item.positioning, language)}</p>
        <dl className="profile-fields">
          <div><dt>{language === "en" ? "Target customers" : "目标用户"}</dt><dd>{text(item.target, language)}</dd></div>
          <div><dt>{language === "en" ? "Key strength" : "核心优势"}</dt><dd>{text(item.strength, language)}</dd></div>
          <div><dt>{language === "en" ? "Key weakness" : "核心劣势"}</dt><dd>{text(item.weakness, language)}</dd></div>
          <div className="profile-insight"><dt>{language === "en" ? "Possible GTM implication to explore" : "可能需要探索的 GTM 启示"}</dt><dd>{text(item.insight, language)}</dd></div>
        </dl>
      </figure>
      <p className="module-caption">{language === "en" ? "Positioning is paraphrased from company messaging. Target customer is inferred; strengths, weaknesses and implications are directional assessments to validate, not confirmed customer findings." : "定位根据公司公开信息概括，目标用户则为分析推断。优势、劣势和 GTM 启示仍需后续验证，并非已经证实的消费者结论。"}</p>
    </div>
  );
}

function PartOne({ language }: { language: Language }) {
  return (
    <main>
      <section className="article-hero">
        <p>{language === "en" ? "GTM TAKE-HOME · PART 1" : "GTM TAKE-HOME · 第一部分"}</p>
        <h1>{language === "en" ? "Market & Competitor Research" : "市场与竞品研究"}</h1>
        <span>{language === "en" ? "11 Jul 2026" : "2026 年 7 月 11 日"}</span>
        <img src="./fullive-hero.jpg" alt="Fullive.ai" />
      </section>

      <article className="article-body">
        <p>{language === "en" ? "Sleep technology already includes trackers, smart sleep clocks and temperature-control products. The narrower intersection of AI decision-making, physical hardware and active sleep intervention appears less established: several of the closest concepts are still in pre-order or provide limited independent evidence." : "睡眠科技市场已经有睡眠追踪器、智能睡眠时钟和主动温控设备。但在“AI 决策 + 实体硬件 + 主动干预”这个更窄的交叉领域，市场似乎仍处于早期：目前最接近的几款产品，有的还在预售，有的独立证据仍然有限。"}</p>
        <p>{language === "en" ? "The eight products below were selected because each can influence how a North American customer understands, values or compares Fullive. Every profile uses the same six fields requested in the case: positioning, target customers, pricing, key strength, key weakness and GTM insight." : "以下八个产品之所以入选，是因为它们都会影响北美消费者如何理解、评价或比较 Fullive。每个档案都使用题目要求的六个统一字段：定位、目标用户、价格、核心优势、核心劣势和 GTM 启示。"}</p>

        <h2>{language === "en" ? "Competitive landscape" : "竞争格局"}</h2>
        <p>{language === "en" ? "The public offers create two visible price anchors: bedside products below $350 and active mattress systems from $1,599 to roughly $3,000. Kimba and Apollo add narrower AI-linked interventions at $299–448. These are reference points, not a recommended Fullive price, because product scope and recurring costs differ." : "公开产品形成了两个可见价格锚点：低于 $350 的床头产品，以及 $1,599 至约 $3,000 的主动床垫系统。Kimba 和 Apollo 则提供 $299–448 的较窄 AI 相关干预。这些只是参考点，并非对 Fullive 的定价建议，因为产品范围与持续费用并不相同。"}</p>
        <LandscapeFigure language={language} />

        <h2>{language === "en" ? "Competitor profiles" : "竞品档案"}</h2>
        <p>{language === "en" ? "Soluna, Naptick and Kimba are the closest conceptual references, although none provides a fully mature public analogue for Fullive. Eight Sleep, Hatch and Sleepme provide adjacent commercial benchmarks; Apollo offers an AI-intervention reference, and Sleep.ai represents measurement and validation infrastructure." : "Soluna、Naptick 和 Kimba 是概念上最接近的参考，但目前没有一个能作为 Fullive 的完全成熟对标。Eight Sleep、Hatch 和 Sleepme 提供相邻商业标杆；Apollo 提供 AI 干预参考；Sleep.ai 则代表测量与验证基础设施。"}</p>
        <CompetitorExplorer language={language} />

        <h2>{language === "en" ? "Possible implications to validate" : "可能需要验证的启示"}</h2>
        <p className="hypothesis-note">{language === "en" ? "These are hypotheses from public competitor materials, not final positioning recommendations. Part 2 is designed to test them with prospective users." : "以下内容是基于公开竞品资料形成的假设，并非最终定位建议。Part 2 将通过潜在用户研究对其进行验证。"}</p>
        <p><strong>{language === "en" ? "Category perception may be unsettled." : "品类认知可能尚未确定。"}</strong> {language === "en" ? "People may see Fullive as a smart bedside device, an AI wellness product or a premium sleep system. Testing that first association could help identify the clearest frame before choosing positioning language." : "消费者可能把 Fullive 理解为智能床头设备、AI 健康产品或高端睡眠系统。在选择定位语言前，先测试他们的第一品类联想，可能有助于找到最清晰的表达框架。"}</p>
        <p><strong>{language === "en" ? "The value of coordinated intervention is still a hypothesis." : "协同干预的价值仍是假设。"}</strong> {language === "en" ? "Automatic coordination across scent, light and sound may feel more valuable than preset routines, but consumers may instead prioritize simplicity, specific outcomes or confidence that the product works." : "香氛、灯光与声音的自动协同可能比预设流程更有价值，但消费者也可能更看重简单易用、特定结果，或对产品有效性的信心。"}</p>
        <p><strong>{language === "en" ? "Premium interest may depend on reducing adoption anxiety." : "高端购买兴趣可能取决于采用顾虑。"}</strong> {language === "en" ? "Safety, partner impact, privacy, maintenance, outcome evidence and recurring cost are plausible concerns. Their relative importance, and whether they differ by segment, should be measured before making GTM trade-offs." : "安全、伴侣影响、隐私、维护、效果证据和持续费用都可能成为顾虑。在做出 GTM 取舍之前，应测量这些因素的相对重要性，以及不同人群之间是否存在差异。"}</p>

        <h2>{language === "en" ? "Sources" : "来源"}</h2>
        <p className="sources-copy">{language === "en" ? "Key product and pricing facts were checked against current first-party pages:" : "关键产品与价格事实均核验自当前第一方页面："} {competitors.map((item, index) => <span key={item.name}><a href={item.url} target="_blank" rel="noreferrer">{item.tab}</a>{index < competitors.length - 1 ? ", " : "."}</span>)}</p>
        <p className="source-note">{language === "en" ? "Prices are dated snapshots. Company efficacy claims are not treated as independently proven outcomes. Soluna's price and availability remain unannounced; Kimba lists multiple reservation offers, so both are explicitly qualified." : "价格仅代表调研当日。品牌自身发布的效果说明不等同于独立验证。Soluna 的售价与上市时间仍未公布；Kimba 页面存在多种预订方案，因此均采用谨慎表述。"}</p>
      </article>
    </main>
  );
}

type SurveyAnswers = {
  frequency: string;
  sleepIssues: string[];
  impacts: string[];
  desiredOutcomes: string[];
  solutions: string[];
  pastSpend: string;
  conceptReaction: string;
  standout: string;
  aiRoles: string[];
  valueDrivers: string[];
  interest: string;
  premium: string;
  expectedPrice: string;
  maxPrice: string;
  concerns: string[];
  confidenceBuilder: string;
  occupation: string;
  income: string;
  bedroom: string;
};

const surveyOptions = {
  frequency: [
    { id: "never", en: "Never", zh: "从不" },
    { id: "rarely", en: "1–3 nights", zh: "1–3 晚" },
    { id: "sometimes", en: "1–2 nights per week", zh: "每周 1–2 晚" },
    { id: "often", en: "3–5 nights per week", zh: "每周 3–5 晚" },
    { id: "daily", en: "Almost every night", zh: "几乎每晚" },
  ],
  sleepIssues: [
    { id: "fall", en: "Falling asleep", zh: "难以入睡" },
    { id: "stay", en: "Waking during the night", zh: "夜间醒来" },
    { id: "early", en: "Waking too early", zh: "过早醒来" },
    { id: "unrested", en: "Waking up unrefreshed", zh: "醒后仍然疲惫" },
    { id: "schedule", en: "An inconsistent sleep schedule", zh: "作息不规律" },
    { id: "none", en: "None of these", zh: "以上均无" },
  ],
  impacts: [
    { id: "work", en: "Focus or performance at work", zh: "工作专注力或表现" },
    { id: "learning", en: "Learning, memory or study", zh: "学习、记忆或备考" },
    { id: "mood", en: "Mood or emotional wellbeing", zh: "情绪或心理状态" },
    { id: "relationships", en: "Time with a partner, family or friends", zh: "与伴侣、家人或朋友相处" },
    { id: "energy", en: "Energy for exercise or daily life", zh: "运动或日常生活精力" },
    { id: "appearance", en: "How healthy or rested I look", zh: "看起来是否健康、有精神" },
    { id: "none", en: "No meaningful impact", zh: "没有明显影响" },
  ],
  desiredOutcomes: [
    { id: "fall", en: "Fall asleep more easily", zh: "更容易入睡" },
    { id: "stay", en: "Stay asleep through the night", zh: "减少夜间醒来" },
    { id: "schedule", en: "Keep a consistent sleep schedule", zh: "保持稳定作息" },
    { id: "restored", en: "Wake up feeling restored", zh: "醒来时恢复精力" },
    { id: "daytime", en: "Feel sharper and better during the day", zh: "白天更清醒、状态更好" },
  ],
  solutions: [
    { id: "routine", en: "Bedtime routine", zh: "睡前流程" },
    { id: "sound", en: "Sound or white noise", zh: "声音或白噪音" },
    { id: "light", en: "Smart light / sunrise alarm", zh: "智能灯 / 日出闹钟" },
    { id: "wearable", en: "Wearable or sleep tracker", zh: "可穿戴设备或睡眠追踪器" },
    { id: "temperature", en: "Temperature-control product", zh: "温控产品" },
    { id: "supplement", en: "Medication or supplement", zh: "药物或补充剂" },
    { id: "none", en: "None of these", zh: "以上均无" },
  ],
  pastSpend: [
    { id: "zero", en: "$0", zh: "$0" },
    { id: "under100", en: "Under $100", zh: "$100 以下" },
    { id: "100-299", en: "$100–299", zh: "$100–299" },
    { id: "300-699", en: "$300–699", zh: "$300–699" },
    { id: "700-1499", en: "$700–1,499", zh: "$700–1,499" },
    { id: "1500plus", en: "$1,500 or more", zh: "$1,500 及以上" },
  ],
  aiRoles: [
    { id: "adjust", en: "Automatically adjust the sleep environment", zh: "自动调整睡眠环境" },
    { id: "learn", en: "Learn what conditions work best for me", zh: "学习最适合我的环境条件" },
    { id: "detect", en: "Detect patterns that may disrupt sleep", zh: "发现可能干扰睡眠的规律" },
    { id: "explain", en: "Explain changes in my sleep", zh: "解释睡眠变化" },
    { id: "coach", en: "Recommend bedtime habits or actions", zh: "推荐睡前习惯或具体行动" },
    { id: "none", en: "I would not want AI involved", zh: "我不希望 AI 参与" },
  ],
  valueDrivers: [
    { id: "outcomes", en: "Evidence that it improves outcomes", zh: "有证据支持实际效果" },
    { id: "personalization", en: "Personalization to me", zh: "针对我的个性化" },
    { id: "automation", en: "Works automatically", zh: "能够自动运行" },
    { id: "simple", en: "Simple to set up and maintain", zh: "设置与维护简单" },
    { id: "nonwearable", en: "Nothing to wear", zh: "无需佩戴设备" },
    { id: "design", en: "Premium design and ambience", zh: "高端设计与氛围" },
  ],
  conceptReaction: [
    { id: "relevant", en: "It addresses a sleep need I recognize", zh: "它对应了我能感受到的睡眠需求" },
    { id: "interesting", en: "Interesting, but I am not yet sure how useful it would be", zh: "听起来有趣，但我还不确定是否实用" },
    { id: "complex", en: "It sounds more complex than I would want", zh: "它听起来比我需要的更复杂" },
    { id: "familiar", en: "It feels similar to products I already know", zh: "它与我已经了解的产品比较相似" },
    { id: "irrelevant", en: "It does not feel relevant to me", zh: "它与我的需求关系不大" },
  ],
  standout: [
    { id: "personalization", en: "A sleep environment personalized to me", zh: "针对我的个性化睡眠环境" },
    { id: "automatic", en: "Automatic adjustments before and during sleep", zh: "睡前与睡眠期间自动调整" },
    { id: "multisensory", en: "Scent, light and sound working together", zh: "香氛、灯光和声音协同" },
    { id: "ai", en: "AI learning my preferences", zh: "AI 学习我的偏好" },
    { id: "bedside", en: "A bedside product with nothing to wear", zh: "无需佩戴的床头产品" },
    { id: "none", en: "None of these stands out", zh: "以上都没有特别吸引我" },
  ],
  interest: [
    { id: "definitely", en: "I would definitely consider it", zh: "我一定会考虑" },
    { id: "probably", en: "I would probably consider it", zh: "我大概率会考虑" },
    { id: "maybe", en: "I might consider it", zh: "我可能会考虑" },
    { id: "unlikely", en: "I probably would not consider it", zh: "我大概率不会考虑" },
    { id: "no", en: "I would not consider it", zh: "我不会考虑" },
  ],
  premium: [
    { id: "basic", en: "A practical / basic sleep device", zh: "实用型 / 基础睡眠设备" },
    { id: "mainstream", en: "A mainstream wellness product", zh: "大众健康产品" },
    { id: "premium", en: "A premium wellness product", zh: "高端健康产品" },
    { id: "highend", en: "A high-end sleep system", zh: "高端睡眠系统" },
    { id: "unclear", en: "I am not sure", zh: "我不确定" },
  ],
  priceRanges: [
    { id: "under200", en: "Under $200", zh: "$200 以下" },
    { id: "200-349", en: "$200–349", zh: "$200–349" },
    { id: "350-499", en: "$350–499", zh: "$350–499" },
    { id: "500-799", en: "$500–799", zh: "$500–799" },
    { id: "800-1199", en: "$800–1,199", zh: "$800–1,199" },
    { id: "1200plus", en: "$1,200 or more", zh: "$1,200 及以上" },
  ],
  concerns: [
    { id: "effectiveness", en: "Whether it works", zh: "是否有效" },
    { id: "safety", en: "Scent sensitivity or safety", zh: "香氛敏感或安全" },
    { id: "partner", en: "Impact on a partner", zh: "对伴侣的影响" },
    { id: "privacy", en: "Data privacy", zh: "数据隐私" },
    { id: "maintenance", en: "Cleaning, refills or maintenance", zh: "清洁、耗材或维护" },
    { id: "recurring", en: "Subscription or recurring cost", zh: "订阅或持续费用" },
    { id: "disruption", en: "Light or sound disrupting sleep", zh: "灯光或声音干扰睡眠" },
    { id: "none", en: "None of these", zh: "以上均无" },
  ],
  confidenceBuilders: [
    { id: "independent", en: "Independent evidence that it improves sleep outcomes", zh: "改善睡眠结果的独立证据" },
    { id: "trial", en: "A risk-free home trial and easy returns", zh: "无风险居家试用与便捷退货" },
    { id: "safety", en: "Clear scent and product safety information", zh: "清晰的香氛与产品安全信息" },
    { id: "reviews", en: "Reviews from people with similar sleep problems", zh: "相似睡眠问题用户的评价" },
    { id: "demo", en: "A clear demonstration of how the AI responds", zh: "清楚展示 AI 如何响应" },
    { id: "none", en: "None of these would change my view", zh: "以上都不会改变我的看法" },
  ],
  occupation: [
    { id: "student", en: "Student", zh: "学生" },
    { id: "professional", en: "Professional / individual contributor", zh: "职场专业人士 / 非管理岗位" },
    { id: "manager", en: "Manager or executive", zh: "管理者或高管" },
    { id: "founder", en: "Founder or self-employed", zh: "创业者或自由职业者" },
    { id: "caregiver", en: "Caregiver / full-time parent", zh: "照护者 / 全职家长" },
    { id: "other", en: "Other", zh: "其他" },
  ],
  income: [
    { id: "under50", en: "Under $50k", zh: "$50k 以下" },
    { id: "50-99", en: "$50k–99k", zh: "$50k–99k" },
    { id: "100-149", en: "$100k–149k", zh: "$100k–149k" },
    { id: "150-249", en: "$150k–249k", zh: "$150k–249k" },
    { id: "250plus", en: "$250k or more", zh: "$250k 及以上" },
    { id: "skip", en: "Prefer not to say", zh: "不愿回答" },
  ],
  bedroom: [
    { id: "alone", en: "I usually sleep alone", zh: "通常独自睡眠" },
    { id: "shared", en: "I usually share a bedroom", zh: "通常与他人共享卧室" },
  ],
};

function OptionGrid({ options, selected, onSelect, language, multi = false, limit, ariaLabel }: { options: { id: string; en: string; zh: string }[]; selected: string | string[]; onSelect: (id: string) => void; language: Language; multi?: boolean; limit?: number; ariaLabel?: string }) {
  const isSelected = (id: string) => Array.isArray(selected) ? selected.includes(id) : selected === id;
  return (
    <div className="survey-options" role={ariaLabel ? "group" : undefined} aria-label={ariaLabel}>
      {options.map((option) => (
        <button key={option.id} type="button" className={isSelected(option.id) ? "selected" : ""} onClick={() => onSelect(option.id)} aria-pressed={isSelected(option.id)}>
          <span>{multi ? (isSelected(option.id) ? "✓" : "") : ""}</span>{option[language]}
        </button>
      ))}
      {limit ? <small>{language === "en" ? `Select up to ${limit}` : `最多选择 ${limit} 项`}</small> : null}
    </div>
  );
}

function SurveyExperience({ language }: { language: Language }) {
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const blankAnswers: SurveyAnswers = { frequency: "", sleepIssues: [], impacts: [], desiredOutcomes: [], solutions: [], pastSpend: "", conceptReaction: "", standout: "", aiRoles: [], valueDrivers: [], interest: "", premium: "", expectedPrice: "", maxPrice: "", concerns: [], confidenceBuilder: "", occupation: "", income: "", bedroom: "" };
  const [answers, setAnswers] = useState<SurveyAnswers>(blankAnswers);
  const total = 9;

  const toggle = (field: "sleepIssues" | "impacts" | "desiredOutcomes" | "solutions" | "aiRoles" | "valueDrivers" | "concerns", id: string, limit?: number) => {
    setAnswers((current) => {
      const values = current[field];
      const next = values.includes(id) ? values.filter((value) => value !== id) : limit && values.length >= limit ? values : [...values.filter((value) => value !== "none"), id];
      return { ...current, [field]: id === "none" ? ["none"] : next };
    });
  };

  const canContinue = [
    Boolean(answers.frequency && answers.sleepIssues.length),
    Boolean(answers.impacts.length && answers.desiredOutcomes.length),
    Boolean(answers.solutions.length && answers.pastSpend),
    Boolean(answers.conceptReaction && answers.standout),
    Boolean(answers.aiRoles.length && answers.valueDrivers.length),
    Boolean(answers.interest && answers.premium),
    Boolean(answers.expectedPrice && answers.maxPrice),
    Boolean(answers.concerns.length && answers.confidenceBuilder),
    Boolean(answers.occupation && answers.income && answers.bedroom),
  ][step];

  const next = () => step === total - 1 ? setComplete(true) : setStep((value) => value + 1);
  const restart = () => { setStep(0); setComplete(false); setAnswers(blankAnswers); };

  if (complete) {
    return (
      <div className="survey-card survey-complete">
        <span className="survey-kicker">{language === "en" ? "SURVEY COMPLETE" : "问卷完成"}</span>
        <h3>{language === "en" ? "Thank you for sharing your perspective." : "感谢分享你的看法。"}</h3>
        <p>{language === "en" ? "In a live study, this response would help connect sleep problems and daytime consequences with the product value, price and message most relevant to each segment." : "在实际研究中，这份回答将用于连接睡眠问题、白天影响，以及不同人群最相关的产品价值、价格与营销场景。"}</p>
        <button className="survey-primary" type="button" onClick={restart}>{language === "en" ? "Restart survey" : "重新填写"}</button>
      </div>
    );
  }

  return (
    <div className="survey-card">
      <div className="survey-progress"><span>{language === "en" ? `Question ${step + 1} of ${total}` : `第 ${step + 1} / ${total} 题`}</span><b>{Math.round(((step + 1) / total) * 100)}%</b></div>
      <div className="survey-dots" aria-hidden="true">{Array.from({ length: total }, (_, index) => <i className={index <= step ? "active" : ""} key={index} />)}</div>

      {step === 0 && <div className="survey-question"><span>{language === "en" ? "NIGHT PROBLEM" : "夜间问题"}</span><h3>{language === "en" ? "In the past 30 days, how often has sleep been difficult for you?" : "过去 30 天里，你多频繁遇到睡眠困扰？"}</h3><OptionGrid options={surveyOptions.frequency} selected={answers.frequency} onSelect={(id) => setAnswers({ ...answers, frequency: id })} language={language} /><h3 className="second-scale">{language === "en" ? "Which two issues describe it best?" : "哪两项最符合你的情况？"}</h3><OptionGrid options={surveyOptions.sleepIssues} selected={answers.sleepIssues} onSelect={(id) => toggle("sleepIssues", id, 2)} language={language} multi limit={2} /></div>}
      {step === 1 && <div className="survey-question"><span>{language === "en" ? "LIFE IMPACT & OUTCOME" : "生活影响与期望结果"}</span><h3>{language === "en" ? "When you sleep poorly, which parts of life feel most affected?" : "睡眠不佳时，你觉得生活中的哪些方面最受影响？"}</h3><OptionGrid options={surveyOptions.impacts} selected={answers.impacts} onSelect={(id) => toggle("impacts", id, 2)} language={language} multi limit={2} /><h3 className="second-scale">{language === "en" ? "Which two improvements would make the biggest difference to your life?" : "哪两项改善会对你的生活产生最大影响？"}</h3><OptionGrid options={surveyOptions.desiredOutcomes} selected={answers.desiredOutcomes} onSelect={(id) => toggle("desiredOutcomes", id, 2)} language={language} multi limit={2} /></div>}
      {step === 2 && <div className="survey-question"><span>{language === "en" ? "CURRENT BEHAVIOR" : "当前行为"}</span><h3>{language === "en" ? "What do you currently use to support your sleep?" : "你目前使用哪些方式来改善睡眠？"}</h3><OptionGrid options={surveyOptions.solutions} selected={answers.solutions} onSelect={(id) => toggle("solutions", id)} language={language} multi /><h3 className="second-scale">{language === "en" ? "What is the most you have paid for one sleep or personal wellness device?" : "你为单件睡眠或个人健康设备支付过的最高金额是多少？"}</h3><OptionGrid options={surveyOptions.pastSpend} selected={answers.pastSpend} onSelect={(id) => setAnswers({ ...answers, pastSpend: id })} language={language} /></div>}
      {step === 3 && <div className="survey-question"><span>{language === "en" ? "PRODUCT PERCEPTION" : "产品认知"}</span><div className="concept-stimulus"><b>{language === "en" ? "Product concept" : "产品概念"}</b><p>{language === "en" ? "A bedside sleep device that uses AI to learn your preferences and coordinate scent, light and sound before and during sleep." : "一款床头睡眠设备，使用 AI 学习你的偏好，并在睡前与睡眠期间协调香氛、灯光和声音。"}</p></div><h3>{language === "en" ? "Which response is closest to your first reaction?" : "哪一项最接近你的第一反应？"}</h3><OptionGrid options={surveyOptions.conceptReaction} selected={answers.conceptReaction} onSelect={(id) => setAnswers({ ...answers, conceptReaction: id })} language={language} /><h3 className="second-scale">{language === "en" ? "Which aspect stands out most?" : "哪个方面最引起你的注意？"}</h3><OptionGrid options={surveyOptions.standout} selected={answers.standout} onSelect={(id) => setAnswers({ ...answers, standout: id })} language={language} /></div>}
      {step === 4 && <div className="survey-question"><span>{language === "en" ? "AI & VALUE" : "AI 与产品价值"}</span><h3>{language === "en" ? "What would you most want AI to do?" : "你最希望 AI 承担什么作用？"}</h3><OptionGrid options={surveyOptions.aiRoles} selected={answers.aiRoles} onSelect={(id) => toggle("aiRoles", id, 2)} language={language} multi limit={2} /><h3 className="second-scale">{language === "en" ? "Which three qualities would matter most when deciding whether to buy?" : "决定是否购买时，哪三项最重要？"}</h3><OptionGrid options={surveyOptions.valueDrivers} selected={answers.valueDrivers} onSelect={(id) => toggle("valueDrivers", id, 3)} language={language} multi limit={3} /></div>}
      {step === 5 && <div className="survey-question"><span>{language === "en" ? "PURCHASE INTEREST & POSITIONING" : "购买兴趣与定位感知"}</span><h3>{language === "en" ? "Based only on the description, how likely are you to consider this product?" : "仅根据以上描述，你会在多大程度上考虑这款产品？"}</h3><OptionGrid options={surveyOptions.interest} selected={answers.interest} onSelect={(id) => setAnswers({ ...answers, interest: id })} language={language} /><h3 className="second-scale">{language === "en" ? "Where would you expect this product to sit in the market?" : "你觉得这款产品更接近哪种市场定位？"}</h3><OptionGrid options={surveyOptions.premium} selected={answers.premium} onSelect={(id) => setAnswers({ ...answers, premium: id })} language={language} /></div>}
      {step === 6 && <div className="survey-question"><span>{language === "en" ? "PRICE EXPECTATION" : "价格预期"}</span><h3>{language === "en" ? "What one-time hardware price would you expect for this product?" : "你预期这款产品的一次性硬件价格是多少？"}</h3><OptionGrid options={surveyOptions.priceRanges} selected={answers.expectedPrice} onSelect={(id) => setAnswers({ ...answers, expectedPrice: id })} language={language} ariaLabel={language === "en" ? "Expected hardware price" : "预期硬件价格"} /><h3 className="second-scale">{language === "en" ? "What is the highest price range you might personally consider?" : "你个人可能考虑的最高价格区间是多少？"}</h3><OptionGrid options={surveyOptions.priceRanges} selected={answers.maxPrice} onSelect={(id) => setAnswers({ ...answers, maxPrice: id })} language={language} ariaLabel={language === "en" ? "Highest price considered" : "最高考虑价格"} /></div>}
      {step === 7 && <div className="survey-question"><span>{language === "en" ? "CONCERNS & CONFIDENCE" : "顾虑与信心"}</span><h3>{language === "en" ? "What, if anything, would concern you about using this product?" : "使用这款产品时，哪些方面可能让你感到担忧？"}</h3><OptionGrid options={surveyOptions.concerns} selected={answers.concerns} onSelect={(id) => toggle("concerns", id, 3)} language={language} multi limit={3} /><h3 className="second-scale">{language === "en" ? "Which would most increase your confidence in considering it?" : "哪一项最能提升你考虑购买的信心？"}</h3><OptionGrid options={surveyOptions.confidenceBuilders} selected={answers.confidenceBuilder} onSelect={(id) => setAnswers({ ...answers, confidenceBuilder: id })} language={language} /></div>}
      {step === 8 && <div className="survey-question"><span>{language === "en" ? "ABOUT YOU" : "关于你"}</span><h3>{language === "en" ? "A few details help us compare needs and willingness to pay across groups." : "以下信息用于比较不同人群的需求与支付意愿。"}</h3><p className="field-label">{language === "en" ? "Current situation" : "目前身份"}</p><OptionGrid options={surveyOptions.occupation} selected={answers.occupation} onSelect={(id) => setAnswers({ ...answers, occupation: id })} language={language} /><p className="field-label">{language === "en" ? "Approximate annual household income (USD)" : "家庭年收入范围（美元）"}</p><OptionGrid options={surveyOptions.income} selected={answers.income} onSelect={(id) => setAnswers({ ...answers, income: id })} language={language} /><p className="field-label">{language === "en" ? "Bedroom situation" : "卧室情况"}</p><OptionGrid options={surveyOptions.bedroom} selected={answers.bedroom} onSelect={(id) => setAnswers({ ...answers, bedroom: id })} language={language} /></div>}

      <div className="survey-actions"><button type="button" className="survey-back" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0} aria-label={language === "en" ? "Previous question" : "上一题"}>←</button><button type="button" className="survey-primary" disabled={!canContinue} onClick={next}>{step === total - 1 ? (language === "en" ? "Submit response" : "提交回答") : (language === "en" ? "Next question  →" : "下一题  →")}</button></div>
    </div>
  );
}

function PartTwo({ language }: { language: Language }) {
  return (
    <main>
      <section className="article-hero">
        <p>{language === "en" ? "GTM TAKE-HOME · PART 2" : "GTM TAKE-HOME · 第二部分"}</p>
        <h1>{language === "en" ? "Consumer Research Survey" : "消费者研究问卷"}</h1>
        <span>{language === "en" ? "3–4 minute concept survey" : "3–4 分钟概念问卷"}</span>
        <img src="./fullive-hero.jpg" alt="Fullive.ai" />
      </section>

      <article className="article-body">
        <p>{language === "en" ? "A short, early-stage survey to identify who feels the problem, where poor sleep shows up in daily life, what role AI should play, what earns a premium and what may prevent adoption." : "这是一份面向早期验证的短问卷：了解谁真正受睡眠问题困扰，睡眠不佳怎样影响日常生活，用户希望 AI 做什么，哪些价值值得多付钱，以及什么会让人放弃考虑。"}</p>
        <div className="research-brief"><span><b>{language === "en" ? "Audience" : "对象"}</b>{language === "en" ? "North American adults with occasional or frequent sleep difficulty" : "偶尔或经常存在睡眠困扰的北美成年人"}</span><span><b>{language === "en" ? "Length" : "长度"}</b>{language === "en" ? "9 screens · about 4 minutes" : "9 个屏幕 · 约 4 分钟"}</span><span><b>{language === "en" ? "Output" : "输出"}</b>{language === "en" ? "Behavioral segments, message scenes, price signals and objections" : "行为分群、营销场景、价格信号与顾虑"}</span></div>

        <h2>{language === "en" ? "Why this survey" : "问卷思路"}</h2>
        <p>{language === "en" ? "The first three screens establish the person’s sleep problem, the cost it creates in daily life and what they already spend to address it. The concept screens then test which part of Fullive is understood, what users want AI to do and what deserves a premium. The final screens translate interest into a price range, confidence requirement and adoption concern. Together, the results can identify early-user hypotheses and message scenes for the landing page without turning stated preferences into product claims." : "前 3 屏先了解受访者面临什么睡眠问题、它如何影响生活，以及他们已经为改善睡眠投入了什么。随后才介绍 Fullive，测试用户是否看懂产品、希望 AI 发挥什么作用，以及哪些价值值得溢价。最后用价格、信心和顾虑把“有兴趣”拆成可行动的判断。结果可用于形成早期用户假设和落地页场景，但不会把受访者偏好写成产品功效。"}</p>

        <h2>{language === "en" ? "Interactive survey" : "交互式问卷"}</h2>
        <p>{language === "en" ? "Questions about existing behavior and life impact come before the Fullive concept. Try the complete flow below; this prototype does not transmit or store responses." : "问卷先了解受访者现在的做法和生活影响，再展示 Fullive 概念。你可以在下方体验完整流程；本原型不会上传或保存回答。"}</p>
        <div className="wide-module survey-module"><SurveyExperience language={language} /><p className="module-caption">{language === "en" ? "Past spending provides a behavioral affordability signal; income is optional for segmentation and is not used to assume interest." : "过去真实购买过什么，比单问收入更能反映支付能力。收入仅用于可选分组，不能据此推断购买兴趣。"}</p></div>

        <h2>{language === "en" ? "From responses to decisions" : "从回答到决策"}</h2>
        <p><strong>{language === "en" ? "Find an early-user hypothesis." : "形成早期用户假设。"}</strong> {language === "en" ? "Cluster by sleep problem, daytime impact, current behavior and past spend; then compare purchase interest. Occupation and income describe a segment only after behavior shows a meaningful difference." : "按睡眠问题、生活影响、现有行为和历史消费分群，再比较购买兴趣。只有当行为差异确实存在时，职业与收入才用于描述人群。"}</p>
        <p><strong>{language === "en" ? "Build message scenes." : "提炼营销场景。"}</strong> {language === "en" ? "Connect a recurring impact such as work focus, learning, relationships or looking rested with the outcome and AI role that the same respondents value. These are message hypotheses for Part 4, not health claims." : "将工作专注、学习、人际相处或精神状态等高频影响，与同一批受访者最重视的结果和 AI 作用对应起来，为 Part 4 提炼可测试的场景信息；这些只是营销假设，不是健康功效结论。"}</p>
        <p><strong>{language === "en" ? "Test premium and price together." : "同时判断高端定位与价格接受度。"}</strong> {language === "en" ? "Compare perceived market position, expected price, the highest range a respondent would consider and past category spend. A premium perception with low purchase interest is not a pricing recommendation; it may mean the concept sounds expensive but not valuable." : "交叉比较用户对产品档次的判断、预期价格、最高可接受区间和过去在同类产品上的实际支出。如果用户觉得产品高端但不想购买，不能直接据此定高价；更可能说明产品看起来贵，却还没有体现足够价值。"}</p>

        <h2>{language === "en" ? "Method notes" : "方法说明"}</h2>
        <p className="sources-copy">{language === "en" ? "Question wording and sequencing follow guidance on clear, neutral and pretested questionnaires from " : "问题措辞与顺序参考了关于清晰、中性与预测试问卷的 "}<a href="https://www.pewresearch.org/writing-survey-questions/" target="_blank" rel="noreferrer">Pew Research Center</a>{language === "en" ? ". Price ranges are intentionally directional; a later purchase experiment should validate stated willingness with real behavior." : "。价格区间仅用于方向判断；后续应通过真实购买实验验证口头支付意愿。"}</p>
        <p className="source-note">{language === "en" ? "Suggested first wave: 150–200 directional responses, balanced across current sleep-tech users and non-users, after 5–8 comprehension pretests. Randomize applicable options and define consent, privacy and low-quality-response rules before launch." : "建议第一轮收集 150–200 份样本，结果用于初步判断；睡眠科技现有用户与非用户应保持相对均衡。正式发放前，先用 5–8 人测试题目是否易懂，并提前确定知情同意、隐私保护和无效答卷的处理规则。"}</p>
      </article>
    </main>
  );
}

type ActivationCandidate = {
  name: string;
  type: Localized;
  domain: Localized;
  url: string;
  platform: Localized;
  audience: Localized;
  fit: Localized;
  rationale: Localized;
  format: Localized;
  tier: Localized;
  caution: Localized;
};

const activationCandidates: ActivationCandidate[] = [
  {
    name: "Dr. Shelby Harris",
    type: { en: "Creator · clinical sleep expert", zh: "创作者 · 临床睡眠专家" },
    domain: { en: "Sleep science & trust", zh: "睡眠科学与信任" },
    url: "https://www.drshelbyharris.com/",
    platform: { en: "Instagram short educational video; public social hub lists current channels", zh: "Instagram 短教育视频；公开社交入口列出当前渠道" },
    audience: { en: "Adults with sleep concerns, including couples and midlife women", zh: "有睡眠困扰的成年人，包括伴侣用户与中年女性" },
    fit: { en: "Direct relevance to bedtime routines, sleep concerns and partner context", zh: "与睡前流程、睡眠困扰和伴侣场景直接相关" },
    rationale: { en: "Makes the first message more credible and can pressure-test safety and claim language before scaled creator spend.", zh: "可在扩大创作者投放前提升内容可信度，并提前检查安全性与宣传措辞是否稳妥。" },
    format: { en: "A 30–45 second “what this device is / is not” explainer, followed by a product-page link.", zh: "一条 30–45 秒的“这款设备是什么 / 不是什么”解释短片，链接到产品页。" },
    tier: { en: "Priority A · credibility and learning", zh: "优先级 A · 可信度与学习" },
    caution: { en: "Use paid education or advisory scope; do not ask for medical endorsement or efficacy claims.", zh: "合作范围应限定为付费科普或顾问服务，不要求对方提供医疗背书或效果承诺。" },
  },
  {
    name: "Yoga With Kassandra",
    type: { en: "Creator · yoga & meditation", zh: "创作者 · 瑜伽与冥想" },
    domain: { en: "Wind-down routine", zh: "睡前放松流程" },
    url: "https://www.yogawithkassandra.com/",
    platform: { en: "Instagram Reels and YouTube / Shorts; app and digital yoga programs", zh: "Instagram Reels、YouTube / Shorts；App 与数字瑜伽课程" },
    audience: { en: "At-home yoga and meditation users seeking calmer, repeatable routines", zh: "寻求平静、可重复流程的居家瑜伽与冥想用户" },
    fit: { en: "Yin yoga and meditation provide a natural pre-bed moment without framing Fullive as a medical solution", zh: "阴瑜伽与冥想提供自然的睡前时刻，无需把 Fullive 表述为医疗解决方案" },
    rationale: { en: "A creator-led evening ritual tests whether a repeatable routine, rather than AI novelty, earns attention.", zh: "由创作者带领的晚间流程可以测试：获得注意力的是可重复习惯，而非 AI 新颖性。" },
    format: { en: "A vertical “after Yin” bedroom-reset Reel / Short, with one simple product-page CTA.", zh: "一条纵向“阴瑜伽之后，如何让卧室安静下来”的 Reel / Short，配一个明确的产品页 CTA。" },
    tier: { en: "Priority A · routine activation", zh: "优先级 A · 流程激活" },
    caution: { en: "Keep the content to a wind-down ritual and product exploration; do not imply yoga or hardware treats insomnia.", zh: "内容应聚焦睡前放松和产品了解；不暗示瑜伽或硬件可以治疗失眠。" },
  },
  {
    name: "Cassey Ho / Blogilates",
    type: { en: "Creator · fitness & consumer wellness", zh: "创作者 · 健身与消费健康" },
    domain: { en: "Fitness routine & recovery", zh: "健身流程与恢复" },
    url: "https://www.blogilates.com/about-cassey/",
    platform: { en: "TikTok, Instagram Reels and YouTube", zh: "TikTok、Instagram Reels 与 YouTube" },
    audience: { en: "Women who follow home fitness, self-care routines and creator-led consumer products", zh: "关注居家健身、自我照护流程和创作者消费产品的女性" },
    fit: { en: "Tests whether a recovery-to-bedtime story travels beyond the existing sleep-tech audience.", zh: "可测试“从训练恢复到睡前放松”这一内容角度，能否吸引睡眠科技圈之外的人群。" },
    rationale: { en: "Her established multi-platform, short-form presence and product-aware community make her a strong discovery test, not an assumed conversion bet.", zh: "其成熟的跨平台短内容能力和对产品熟悉的社群，使她适合作为发现阶段测试，而非预设的转化押注。" },
    format: { en: "A post-workout, 20-second “how I switch off” TikTok / Reel with a creator-specific product URL.", zh: "一条训练后 20 秒“我如何切换到休息状态”的 TikTok / Reel，使用创作者专属产品页链接。" },
    tier: { en: "Priority B · scale discovery option", zh: "优先级 B · 规模化发现备选" },
    caution: { en: "Likely expensive and broad. Confirm current brand exclusions and do not use body, appearance or performance claims.", zh: "预计成本较高且受众广。须确认当前品牌排他关系，且不能使用身材、外貌或运动表现主张。" },
  },
  {
    name: "The Ready State",
    type: { en: "Creator / partner · recovery education", zh: "创作者 / 伙伴 · 恢复教育" },
    domain: { en: "Fitness, recovery & performance", zh: "健身、恢复与表现" },
    url: "https://thereadystate.com/",
    platform: { en: "Instagram / YouTube video, podcast and recovery education", zh: "Instagram / YouTube 视频、播客与恢复教育" },
    audience: { en: "Fitness-minded adults, coaches and people who connect recovery with daily performance", zh: "重视健身的成年人、教练，以及将恢复与日常表现连接的人群" },
    fit: { en: "Extends Fullive beyond sleep content into the recovery behavior people already understand and pay for.", zh: "让 Fullive 从单纯睡眠内容延伸到用户已经理解并愿意投入的恢复行为。" },
    rationale: { en: "Useful for testing a recovery angle with people who use training routines as a health entry point.", zh: "适合面向通过健身管理健康的人群，测试“训练后的恢复与睡眠”这一内容角度。" },
    format: { en: "A short recovery myth / routine clip that invites viewers to explore the sleep environment.", zh: "一条关于恢复误区或日常习惯的短视频，引导观众了解这套睡眠环境。" },
    tier: { en: "Priority B · performance test", zh: "优先级 B · 表现测试" },
    caution: { en: "Avoid athlete-performance promises; frame as an environment and routine exploration.", zh: "避免运动表现承诺；应表述为睡眠环境与流程的探索。" },
  },
  {
    name: "Dr. Jessica Shepherd",
    type: { en: "Creator · women’s health & longevity", zh: "创作者 · 女性健康与长寿" },
    domain: { en: "Life-stage wellness", zh: "人生阶段健康" },
    url: "https://www.jessicashepherdmd.com/about-dr-jessica-shepherd",
    platform: { en: "Instagram short-form health education, media and Modern Meno community", zh: "Instagram 短健康教育内容、媒体与 Modern Meno 社群" },
    audience: { en: "Women interested in longevity and perimenopause / menopause wellbeing", zh: "关注长寿与围绝经期 / 更年期健康的女性" },
    fit: { en: "A relevant, but deliberately bounded, segment where sleep disruption may be salient", zh: "这是一个睡眠困扰可能更显著、但需要谨慎界定的相关人群" },
    rationale: { en: "Can test whether comfort, control and a calmer bedroom routine are relevant to this audience.", zh: "可测试舒适、掌控感和更平静的卧室流程是否与这类受众相关。" },
    format: { en: "A short “questions to ask before buying sleep tech” Reel, not a clinical outcome endorsement.", zh: "一条“购买睡眠科技前应问的问题”短视频，而不是对临床结果的背书。" },
    tier: { en: "Priority B · segment learning", zh: "优先级 B · 细分学习" },
    caution: { en: "No menopause, skin or hormone outcome claims without appropriate evidence and approval.", zh: "未经充分证据和合规审核，不应宣传更年期、皮肤或激素方面的效果。" },
  },
  {
    name: "Thomas Frank",
    type: { en: "Creator · productivity & learning", zh: "创作者 · 效率与学习" },
    domain: { en: "Knowledge work & study", zh: "知识工作与学习" },
    url: "https://thomasjfrank.com/about/",
    platform: { en: "YouTube / Shorts, podcast, newsletter and X", zh: "YouTube / Shorts、播客、邮件内容与 X" },
    audience: { en: "Students and knowledge workers interested in learning, habits and productive routines", zh: "关注学习、习惯与高效流程的学生和知识工作者" },
    fit: { en: "Tests the work and learning consequences identified in Part 2 without needing a conventional wellness audience.", zh: "可测试 Part 2 中的工作与学习影响，而无需依赖传统健康受众。" },
    rationale: { en: "A message-discovery candidate, not a direct sleep authority: the angle is a sustainable end-of-day routine, not sleep optimization.", zh: "适合发现传播信息，但不是睡眠权威：应从可持续的下班后流程切入，而非睡眠优化。" },
    format: { en: "A Short on ending the workday, with an optional longer YouTube explanation only if the short-form test performs.", zh: "一条“如何结束工作日”的 Short；仅当短视频表现良好时，才补充长 YouTube 解释。" },
    tier: { en: "Priority B · white-collar message test", zh: "优先级 B · 白领信息测试" },
    caution: { en: "Audience fit is inferred from productivity content; validate sleep relevance before paid activation.", zh: "受众匹配来自效率内容的推断；付费激活前需先验证睡眠相关性。" },
  },
  {
    name: "Yoga With Adriene",
    type: { en: "Creator · yoga & mindfulness", zh: "创作者 · 瑜伽与正念" },
    domain: { en: "Broad routine & wellbeing", zh: "广泛的流程与健康" },
    url: "https://do.yogawithadriene.com/about-us/",
    platform: { en: "Instagram and YouTube / Shorts, supported by Find What Feels Good", zh: "Instagram、YouTube / Shorts，配合 Find What Feels Good 会员体系" },
    audience: { en: "Large global community focused on accessible yoga, mindfulness and self-care", zh: "专注易获得瑜伽、正念和自我照护的大型全球社群" },
    fit: { en: "Strong overlap with wind-down rituals and a mature content / membership ecosystem", zh: "与睡前放松流程高度重合，并拥有成熟的内容与会员生态" },
    rationale: { en: "A high-reach routine option with an established content ecosystem, best used after a smaller short-form message test.", zh: "覆盖人群广，且已有成熟的生活方式内容体系；更适合在小规模短视频测试跑通后再合作。" },
    format: { en: "An evening-routine Short / Reel with a soft “learn more” action, not a full product review.", zh: "一条晚间流程 Short / Reel，使用轻量“了解更多”行动，而不是完整产品测评。" },
    tier: { en: "Priority B · reach with higher cost", zh: "优先级 B · 覆盖广、成本较高" },
    caution: { en: "Likely higher cost and lower learning efficiency than a more focused routine creator; approach after a smaller message test.", zh: "成本可能更高、学习效率低于更聚焦的流程创作者；应在小范围信息测试后再接触。" },
  },
  {
    name: "Dr. Michael Breus / The Sleep Doctor",
    type: { en: "KOL · sleep educator", zh: "KOL · 睡眠教育者" },
    domain: { en: "Direct sleep education", zh: "直接睡眠教育" },
    url: "https://sleepdoctor.com/pages/dr-michael-breus",
    platform: { en: "Instagram / YouTube video, books, podcast and media", zh: "Instagram / YouTube 视频、书籍、播客与媒体" },
    audience: { en: "Consumers who actively look for practical sleep guidance and product recommendations", zh: "主动寻求实用睡眠建议和产品推荐的消费者" },
    fit: { en: "Direct sleep relevance and an existing public-facing educational platform.", zh: "具有直接睡眠相关性和成熟的面向消费者教育平台。" },
    rationale: { en: "Useful as a direct-sleep benchmark and possible educational collaboration, but not the safest first paid creator test.", zh: "可作为直接睡眠标杆和潜在教育合作对象，但不是最稳妥的首轮付费创作者测试。" },
    format: { en: "A short educational clip on bedroom conditions, subject to brand-conflict clearance.", zh: "一条关于卧室环境条件的教育短片，前提是通过品牌冲突核查。" },
    tier: { en: "Priority B · direct-sleep benchmark", zh: "优先级 B · 直接睡眠标杆" },
    caution: { en: "His official profile lists work with several sleep and wellness brands. Verify active commercial relationships and exclusivity first.", zh: "其官方资料列出了多个睡眠和健康品牌合作。必须先核验进行中的商业关系和排他性。" },
  },
  {
    name: "Mollie Eastman / Sleep Is A Skill",
    type: { en: "KOL · sleep educator & host", zh: "KOL · 睡眠教育者与主播" },
    domain: { en: "Direct sleep education", zh: "直接睡眠教育" },
    url: "https://www.sleepisaskill.com/about",
    platform: { en: "Instagram Reels, TikTok, YouTube, podcast and newsletter", zh: "Instagram Reels、TikTok、YouTube、播客与邮件内容" },
    audience: { en: "People actively seeking practical sleep education, behavior change and sleep technology", zh: "主动寻求实用睡眠教育、行为改变和睡眠科技的人群" },
    fit: { en: "Closest creator-led route to test an AI-and-hardware sleep narrative with an already sleep-literate audience", zh: "最适合面向已经关注睡眠问题的受众，测试“AI + 硬件如何改善睡眠环境”这一表达" },
    rationale: { en: "Her public profile connects sleep technology, accountability and behavior change, giving Fullive a clear, sleep-literate short-form test.", zh: "其公开资料连接睡眠科技、陪伴式改变和行为改变，为 Fullive 提供一个清晰、具备睡眠认知的短视频测试场。" },
    format: { en: "A 30-second “is your bedroom part of your sleep system?” Reel / TikTok, followed by an audience poll and product-page link.", zh: "先发布一条 30 秒 Reel / TikTok，讨论“卧室环境是否也是睡眠管理的一部分”，再通过投票和产品页链接收集反馈。" },
    tier: { en: "Priority A · direct KOL test", zh: "优先级 A · 直接 KOL 测试" },
    caution: { en: "Confirm existing hardware or competing sleep-brand relationships before proposing a paid format.", zh: "提出付费合作前，需确认其现有硬件或竞品睡眠品牌合作关系。" },
  },
  {
    name: "The Mindful Movement",
    type: { en: "Creator · mindfulness community", zh: "创作者 · 正念社群" },
    domain: { en: "Meditation & evening calm", zh: "冥想与晚间平静" },
    url: "https://www.themindfulmovement.com/about",
    platform: { en: "YouTube / Shorts, Instagram and guided-meditation programs", zh: "YouTube / Shorts、Instagram 与引导冥想内容" },
    audience: { en: "People using guided meditation and mindful movement to create calmer routines", zh: "通过引导冥想和正念运动建立平静流程的人群" },
    fit: { en: "A natural test for whether Fullive belongs beside a wind-down ritual rather than being introduced as another device.", zh: "可自然测试 Fullive 是否应融入睡前放松流程，而非被介绍为又一个设备。" },
    rationale: { en: "Its own community and multi-format content make it a useful creator-led routine context.", zh: "自有社群和多形式内容，使其成为适合流程场景的创作者型入口。" },
    format: { en: "A “transition out of the day” Short / Reel that presents Fullive as a complementary environment, not another meditation product.", zh: "一条“从一天中抽离”的 Short / Reel，把 Fullive 呈现为互补的环境，而不是另一个冥想产品。" },
    tier: { en: "Priority B · routine creator", zh: "优先级 B · 流程创作者" },
    caution: { en: "Keep the role complementary to meditation; do not imply the product or content treats anxiety or insomnia.", zh: "角色应与冥想互补；不暗示产品或内容可以治疗焦虑或失眠。" },
  },
];

function CandidateExplorer({ language }: { language: Language }) {
  const [selected, setSelected] = useState(0);
  const item = activationCandidates[selected];
  return (
    <div className="wide-module candidate-module">
      <div className="profile-tabs" role="tablist" aria-label={language === "en" ? "Creator and partner candidates" : "创作者与伙伴候选人"}>
        {activationCandidates.map((candidate, index) => <button type="button" role="tab" aria-selected={selected === index} className={selected === index ? "active" : ""} onClick={() => setSelected(index)} key={candidate.name}>{candidate.name}</button>)}
      </div>
      <figure className="candidate-figure">
        <div className="profile-heading"><div><span>{text(item.type, language)} · {text(item.domain, language)}</span><h3><a href={item.url} target="_blank" rel="noreferrer">{item.name} ↗</a></h3></div><div><b>{text(item.tier, language)}</b></div></div>
        <dl className="candidate-fields">
          <div><dt>{language === "en" ? "Platform / channel" : "平台 / 渠道"}</dt><dd>{text(item.platform, language)}</dd></div>
          <div><dt>{language === "en" ? "Audience" : "受众"}</dt><dd>{text(item.audience, language)}</dd></div>
          <div><dt>{language === "en" ? "Fit" : "匹配度"}</dt><dd>{text(item.fit, language)}</dd></div>
          <div><dt>{language === "en" ? "Why it is on the list" : "入选原因"}</dt><dd>{text(item.rationale, language)}</dd></div>
          <div><dt>{language === "en" ? "First content test" : "首发内容测试"}</dt><dd>{text(item.format, language)}</dd></div>
          <div className="candidate-caution"><dt>{language === "en" ? "Verification / caution" : "验证 / 注意事项"}</dt><dd>{text(item.caution, language)}</dd></div>
        </dl>
      </figure>
      <p className="module-caption">{language === "en" ? "Audience fit and rationale are directional assessments from publicly available positioning and content. Links open the primary source checked for each candidate." : "受众匹配度和入选理由均根据公开定位与近期内容判断，仍需在外联前再次确认。链接指向每位候选对象已核验的主要来源。"}</p>
    </div>
  );
}

const priorityPlans = [
  {
    name: "Mollie Eastman / Sleep Is A Skill",
    angle: { en: "A paid sleep-education collaboration: test whether a clearer explanation of AI-guided bedroom intervention earns qualified product interest from a sleep-literate audience.", zh: "以付费睡眠教育合作切入：测试清楚解释 AI 如何介入卧室环境，能否在已经关注睡眠的受众中带来有效产品兴趣。" },
    weekOne: { en: "Prepare a one-page creator brief with the concept, claim boundaries, a proposed podcast / short-form angle and one product-page CTA. Confirm current brand relationships before outreach.", zh: "准备一页合作简报，说明产品概念、宣传边界、播客 / 短视频方向和唯一的产品页 CTA；外联前确认对方当前的品牌合作。" },
    weekTwo: { en: "Propose one small paid pilot, such as a sleep-environment education segment or an audience poll, and track qualified product-page actions rather than views alone.", zh: "提出一个小型付费试点，例如睡眠环境教育片段或受众投票，并跟踪有效的产品页行动，而不只看播放量。" },
  },
  {
    name: "Yoga With Kassandra",
    angle: { en: "A 7-night wind-down ritual: pair an existing Yin / meditation moment with a simple product-page test for a more personalized bedroom routine.", zh: "设计一个 7 晚睡前放松主题：把已有的阴瑜伽 / 冥想时刻与产品页连接起来，测试用户是否对更个性化的睡眠环境感兴趣。" },
    weekOne: { en: "Identify two relevant existing formats, create a concise creator brief and define one UTM-tagged product-page action.", zh: "选定两个相关的既有内容形式，制作简明创作者 brief，并定义一个带 UTM 追踪的产品页行动。" },
    weekTwo: { en: "Ask for one small, paid pilot rather than a broad sponsorship; agree on creative guardrails and measure qualified product-page actions.", zh: "争取一个小型付费试点，而非大范围赞助；明确创意边界，并衡量有效的产品页行动。" },
  },
  {
    name: "The Mindful Movement",
    angle: { en: "A contained calm-routine test: see whether a gentle transition out of the day earns qualified interest without turning Fullive into another meditation app.", zh: "先做一个小规模的平静流程测试：观察“从忙碌中抽离”的场景能否带来高质量兴趣，同时避免把 Fullive 误解为又一个冥想 App。" },
    weekOne: { en: "Confirm current category relationships and identify one existing evening format. Send a one-page brief with a single 20–30 second Reel / Short concept, claim boundaries and a tagged landing URL.", zh: "确认现有品类合作关系，并选定一个已有的晚间内容形式。发送一页合作简报，包含一条 20–30 秒 Reel / Short 创意、宣传边界和带标记的落地页链接。" },
    weekTwo: { en: "Offer one small paid pilot with an audience poll or Story follow-up. Compare qualified landing actions and comments with the sleep-KOL and yoga tests, not view count alone.", zh: "提出一个小型付费试点，并结合受众投票或 Story 跟进。将有效落地页行动和评论与睡眠 KOL、瑜伽创作者测试比较，而不是只看播放量。" },
  },
];

function PriorityPlan({ language }: { language: Language }) {
  const [selected, setSelected] = useState(0);
  const item = priorityPlans[selected];
  return (
    <div className="wide-module priority-module">
      <div className="profile-tabs" role="tablist" aria-label={language === "en" ? "Priority outreach plans" : "优先外联计划"}>{priorityPlans.map((plan, index) => <button type="button" role="tab" aria-selected={selected === index} className={selected === index ? "active" : ""} onClick={() => setSelected(index)} key={plan.name}>{plan.name}</button>)}</div>
      <section className="priority-figure">
        <span>{language === "en" ? "FIRST OUTREACH ANGLE" : "首次外联角度"}</span>
        <h3>{item.name}</h3>
        <p className="priority-angle">{text(item.angle, language)}</p>
        <div className="priority-weeks"><div><b>{language === "en" ? "Days 1–5" : "第 1–5 天"}</b><p>{text(item.weekOne, language)}</p></div><div><b>{language === "en" ? "Days 6–14" : "第 6–14 天"}</b><p>{text(item.weekTwo, language)}</p></div></div>
      </section>
    </div>
  );
}

function PartThree({ language }: { language: Language }) {
  return (
    <main>
      <section className="article-hero">
        <p>{language === "en" ? "GTM TAKE-HOME · PART 3" : "GTM TAKE-HOME · 第三部分"}</p>
        <h1>{language === "en" ? "Creator Sourcing" : "创作者筛选"}</h1>
        <span>{language === "en" ? "North America · short-form first" : "北美 · 短视频优先"}</span>
        <img src="./fullive-hero.jpg" alt="Fullive.ai" />
      </section>

      <article className="article-body">
        <p>{language === "en" ? "This is a creator list, not a general partnership list. The launch question is whether a premium AI sleep device can earn attention in a real consumer moment: winding down, recovering after training, ending a workday or creating a calmer bedroom routine. Direct sleep creators establish relevance; adjacent wellness creators test whether those moments travel to a broader audience." : "这是一份创作者名单，而不是泛泛的合作伙伴清单。首发要验证的是：高端 AI 睡眠设备能否在真实生活时刻引起注意，例如睡前放松、训练后的恢复、结束工作日，或让卧室安静下来。睡眠垂类创作者先证明相关性，相邻的健康创作者再测试这些场景能否触达更广的人群。"}</p>

        <h2>{language === "en" ? "How the list was screened" : "如何筛选名单"}</h2>
        <p>{language === "en" ? "All ten candidates are individual creators or creator-led media brands. A candidate stays on the list only when there is a believable short-video format, a recognisable audience moment and a public path to verify current content and commercial conflicts. Reach is a secondary filter: in this stage, a clean learning test is more useful than a large but poorly matched audience." : "10 个候选对象均为个人创作者或创作者主导的媒体品牌。要入选，必须同时满足三点：能自然地做短视频、受众确实存在睡前或恢复场景，并能通过公开信息核查近期内容和竞品合作。现阶段粉丝量不是第一标准；与其触达很大但不匹配的人群，不如先做一次干净、可比较的小测试。"}</p>
        <div className="research-brief"><span><b>{language === "en" ? "1. Audience + moment · 35%" : "1. 受众与场景 · 35%"}</b>{language === "en" ? "Does the audience already care about a credible evening, recovery or routine problem?" : "受众是否已经关心睡前放松、训练恢复或作息管理？"}</span><span><b>{language === "en" ? "2. Native short-form · 25%" : "2. 短视频原生性 · 25%"}</b>{language === "en" ? "Can the creator make a 15–45 second idea feel native to their feed?" : "15–45 秒的内容能否自然融入创作者现有风格？"}</span><span><b>{language === "en" ? "3. Claims + conflict · 25%" : "3. 宣传与冲突 · 25%"}</b>{language === "en" ? "Can competitor ties, claim limits and public contact be checked before outreach?" : "外联前能否核查竞品合作、宣传边界和公开联系方式？"}</span></div>
        <p className="source-note">{language === "en" ? "The remaining 15% is brand safety and practical reachability. These weights allocate learning capacity, not media budget or follower value." : "剩余 15% 考虑品牌安全和实际可接触性。这些权重用于分配学习资源，而不是预算或粉丝价值。"}</p>

        <h2>{language === "en" ? "Short-form first, then depth" : "短视频优先，再补充深度内容"}</h2>
        <p><strong>{language === "en" ? "TikTok and Instagram Reels." : "TikTok 与 Instagram Reels。"}</strong> {language === "en" ? "Use the same core creator idea to test a single consumer scene and language hook. The action is a tagged product-page visit or an in-story poll; views are a diagnostic, not the decision." : "用同一个核心创意测试一个消费者场景与信息钩子。行动是带标记的产品页访问或 Story 投票；播放量是诊断信息，不是决策依据。"}</p>
        <p><strong>{language === "en" ? "YouTube / Shorts." : "YouTube / Shorts。"}</strong> {language === "en" ? "Use Shorts for the same discovery test. Only the strongest short-form message earns a longer creator explanation or routine integration, where a considered hardware purchase can be understood." : "用 Shorts 做相同的发现测试。只有表现最强的短视频信息，才值得获得更长的创作者解释或流程整合，让用户理解需要认真考虑的硬件购买。"}</p>
        <p><strong>{language === "en" ? "X." : "X。"}</strong> {language === "en" ? "Keep it out of the first paid creator wave. It can support expert listening and public conversation, but it is not the primary consumer short-video format for this launch test." : "不进入首轮付费创作者测试。它可用于专家倾听和公开讨论，但不是本次上线测试的主要消费者短视频形式。"}</p>

        <h2>{language === "en" ? "Candidate longlist" : "候选名单"}</h2>
        <p>{language === "en" ? "Select a name to review the requested platform/channel, audience, fit and rationale. Cautions are retained rather than hidden: they are often what determines whether a candidate belongs in the first outreach wave." : "点击姓名可查看平台、受众、匹配度和入选理由。页面同时保留合作风险，因为这些风险往往决定候选对象是否适合进入第一轮外联。"}</p>
        <CandidateExplorer language={language} />

        <h2>{language === "en" ? "Top 3 to prioritize" : "优先推进的 3 个对象"}</h2>
        <p>{language === "en" ? "The first wave compares three deliberately different routes using a comparable short-form brief: a direct sleep KOL, a wind-down routine creator and a mindfulness creator. This is a learning portfolio, not a claim that any one audience will win. Fitness scale is kept for phase two, after the first wave indicates whether recovery is a strong purchase driver." : "第一轮用同一套短视频 brief，对比三条有意拉开的路径：睡眠垂类 KOL、睡前流程创作者和正念创作者。这是一组用于学习的组合，并不预设哪类人群一定胜出。健身类的大规模触达留到第二阶段，等首轮先验证“恢复”是不是强购买动机。"}</p>
        <PriorityPlan language={language} />

        <h2>{language === "en" ? "Verification and measurement" : "验证与衡量"}</h2>
        <p><strong>{language === "en" ? "Verification before outreach." : "外联前验证。"}</strong> {language === "en" ? "Confirm active North American audience relevance from recent content, review paid-partnership and competitor disclosures, and use only public business or partnership channels. Do not infer reach, health credentials or commercial availability from follower counts alone. For example, Huberman Lab is excluded after its " : "从近期内容确认北美受众相关性，检查付费合作与竞品披露，并仅使用公开的商务或合作渠道。不能只凭粉丝数推断触达、健康资质或商业可合作性。例如，Huberman Lab 因其 "}<a href="https://www.hubermanlab.com/sponsors" target="_blank" rel="noreferrer">{language === "en" ? "official sponsor page" : "官方赞助页"}</a>{language === "en" ? " lists Eight Sleep." : " 列有 Eight Sleep 而被排除。"}</p>
        <p><strong>{language === "en" ? "Measure learning, not vanity reach." : "看有效反馈，不只看播放量。"}</strong> {language === "en" ? "For each creator, use a unique landing-page URL and track qualified product-page actions, completion rate, saves / comments that reveal language, and cost per qualified action if content is paid. A high-view video without qualified intent does not advance the launch decision." : "为每位创作者设置专属产品页链接，跟踪有效页面行动、问卷完成率、能反映真实需求的收藏与评论，以及付费合作的单个有效行动成本。只有播放量、没有真实购买意向，不能作为扩大投放的依据。"}</p>

        <h2>{language === "en" ? "Sources" : "来源"}</h2>
        <p className="sources-copy">{language === "en" ? "Candidate facts were checked against current primary sources: " : "候选对象的关键信息均通过当前第一方来源核验："}{activationCandidates.map((item, index) => <span key={item.name}><a href={item.url} target="_blank" rel="noreferrer">{item.name}</a>{index < activationCandidates.length - 1 ? ", " : "."}</span>)}</p>
        <p className="source-note">{language === "en" ? "Public channel availability is not an agreement to partner. Candidate fit and priority are analyst assessments, to be refreshed immediately before outreach." : "公开渠道不代表对方同意合作。候选匹配度和优先级均为分析判断，正式外联前应再次核验。"}</p>
      </article>
    </main>
  );
}

function PurchaseModal({ language, onClose }: { language: Language; onClose: () => void }) {
  const [finish, setFinish] = useState("pearl");
  const [complete, setComplete] = useState(false);
  const isEn = language === "en";
  return <div className="purchase-backdrop" role="dialog" aria-modal="true" aria-label={isEn ? "Buy Fullive One" : "购买 Fullive One"}>
    <section className="purchase-modal">
      <button className="modal-close" type="button" onClick={onClose} aria-label={isEn ? "Close" : "关闭"}>×</button>
      {complete ? <div className="purchase-success"><span>FULLIVE ONE</span><h2>{isEn ? "Your night starts here." : "你的夜晚，从这里开始。"}</h2><p>{isEn ? "This launch prototype has modeled a completed order. No payment or personal information was collected." : "此发布原型已模拟完成订单，未收集付款或个人信息。"}</p><button type="button" onClick={onClose}>{isEn ? "Continue exploring" : "继续浏览"}</button></div> : <>
        <p className="modal-eyebrow">{isEn ? "BUY FULLIVE ONE" : "购买 FULLIVE ONE"}</p>
        <div className="purchase-layout"><img src="./fullive/fullive-system-macro-v2.png" alt="Fullive One" /><div><h2>{isEn ? "Bring the night into rhythm." : "让卧室顺着你的节奏安静下来。"}</h2><p>{isEn ? "Free shipping · 60-night home trial" : "免费配送 · 60 晚居家试用"}</p><fieldset><legend>{isEn ? "Finish" : "外观"}</legend><div className="finish-options"><button type="button" className={finish === "pearl" ? "active" : ""} onClick={() => setFinish("pearl")}><i className="pearl" />{isEn ? "Pearl" : "珍珠白"}</button><button type="button" className={finish === "graphite" ? "active" : ""} onClick={() => setFinish("graphite")}><i className="graphite" />{isEn ? "Graphite" : "石墨黑"}</button></div></fieldset><ul><li>{isEn ? "Fullive One sleep-space device" : "Fullive One 睡眠环境设备"}</li><li>{isEn ? "Three scent capsules" : "三枚香氛胶囊"}</li><li>{isEn ? "Fullive app and Bio-OS personalization" : "Fullive App 与 Bio-OS 个性化服务"}</li><li>{isEn ? "Two-year limited warranty" : "两年有限保修"}</li></ul><button className="buy-submit" type="button" onClick={() => setComplete(true)}>{isEn ? "Add to bag" : "加入购物袋"}</button><small>{isEn ? "Prototype checkout — no payment is processed." : "此为演示性结账流程，不会产生真实付款。"}</small></div></div>
      </>}
    </section>
  </div>;
}

function PartFourLanding({ language, onLanguageChange, onBack }: { language: Language; onLanguageChange: (language: Language) => void; onBack: () => void }) {
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState(0);
  const [highlightPaused, setHighlightPaused] = useState(false);
  const [activeCue, setActiveCue] = useState(0);
  const isEn = language === "en";
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const highlights = [
    { title: { en: "Leave the day behind.", zh: "把白天留在门外。" }, copy: { en: "Fullive shifts your room from active to restorative before your head reaches the pillow.", zh: "你还没躺下，房间已经先安静下来，帮你慢慢从忙碌切换到休息。" }, image: "./fullive/fullive-launch-hero-v2.png" },
    { title: { en: "Four cues. One rhythm.", zh: "四种感官线索，同步协作。" }, copy: { en: "Scent, light, sound and temperature respond as one coordinated sleep environment.", zh: "香氛、灯光、声音和温度不再各自运行，而是围绕同一段睡眠节奏协同变化。" }, image: "./fullive/fullive-system-macro-v2.png" },
    { title: { en: "Learns night after night.", zh: "越用，越懂你的夜晚。" }, copy: { en: "Bio-OS learns what settles you and quietly adapts the sequence around your routine.", zh: "Bio-OS 会记住哪些变化更适合你，并据此微调下一晚的节奏。" }, image: "./fullive/fullive-night-hero.png" },
    { title: { en: "Wake into the day.", zh: "醒来时，也更从容。" }, copy: { en: "A gradual morning sequence brings light, sound and temperature back with intention.", zh: "灯光、声音和温度缓缓回到白天的状态，让清晨不再来得那么突然。" }, image: "./fullive/fullive-morning-v2.png" },
  ];
  const cues = [
    { label: { en: "Light", zh: "灯光" }, value: "2200K → dawn", title: { en: "Light that follows your night.", zh: "让灯光顺着夜晚慢慢变化。" }, copy: { en: "Warm light lowers as you wind down, disappears for sleep and returns gradually before your alarm.", zh: "睡前逐渐变暗，入睡后熄灭，再在闹钟响起前缓缓亮起。" } },
    { label: { en: "Sound", zh: "声音" }, value: "360° spatial audio", title: { en: "Sound that makes space for quiet.", zh: "用声音隔开外界的干扰。" }, copy: { en: "Adaptive soundscapes soften disruptive noise without asking you to manage another playlist.", zh: "自适应声景弱化突发噪音，不必让你在睡前再挑选和管理播放列表。" } },
    { label: { en: "Scent", zh: "香氛" }, value: "3-zone diffusion", title: { en: "A scent cue your body remembers.", zh: "让熟悉的香气，成为入睡信号。" }, copy: { en: "Controlled micro-diffusion supports a repeatable wind-down cue and stops before it becomes background noise.", zh: "精准控制扩散时机与强度，形成稳定的睡前提示，同时避免香气持续过久。" } },
    { label: { en: "Temperature", zh: "温度" }, value: "16–24°C adaptive", title: { en: "Comfort that changes with the hour.", zh: "不同阶段，温度也该不同。" }, copy: { en: "Fullive coordinates compatible climate devices around your preferred sleep curve through the night.", zh: "Fullive 按照你的偏好与睡眠节奏，联动兼容设备调节室温。" } },
  ];
  const nightSteps = [
    { time: "9:45 PM", label: { en: "Transition", zh: "结束工作" }, title: { en: "Work ends. The room changes with you.", zh: "合上电脑，卧室也慢下来。" }, copy: { en: "Fullive recognizes the beginning of your routine and lowers stimulation across the room — before you have to think about it.", zh: "Fullive 感知到你开始进入睡前流程，提前调暗灯光、降低声音刺激，不必让你逐项设置。" }, image: "./fullive/fullive-launch-hero-v2.png" },
    { time: "10:30 PM", label: { en: "Wind down", zh: "准备入睡" }, title: { en: "One touch. Then nothing to manage.", zh: "轻触一下，剩下的交给 Fullive。" }, copy: { en: "Your preferred scent cue begins, the light warms and an adaptive soundscape takes over from the day.", zh: "熟悉的香气慢慢散开，灯光转暖，自适应声景将白天的嘈杂隔在房间之外。" }, image: "./fullive/fullive-evening-routine.png" },
    { time: "2:10 AM", label: { en: "Adapt", zh: "夜间适应" }, title: { en: "The system stays awake so you do not have to.", zh: "你睡着以后，系统仍在安静调节。" }, copy: { en: "Bio-OS reads room conditions and quietly adjusts sound and climate while the display stays dark.", zh: "Bio-OS 持续读取房间状态，在不亮屏、不打扰的前提下调整声音与温度。" }, image: "./fullive/fullive-night-hero.png" },
    { time: "6:45 AM", label: { en: "Rise", zh: "自然醒来" }, title: { en: "Morning arrives by degrees.", zh: "让清晨慢慢亮起来。" }, copy: { en: "Light returns slowly, the room warms and a soft sound cue brings the routine full circle.", zh: "灯光缓缓亮起，室温逐渐回升，再用柔和的声音带你进入新的一天。" }, image: "./fullive/fullive-morning-v2.png" },
  ];
  const lives = [
    { tab: { en: "High-pressure work", zh: "高压工作" }, title: { en: "The workday is over. Your mind has not noticed yet.", zh: "电脑合上了，大脑却还没下班。" }, copy: { en: "Fullive lets the room take over the transition, so bedtime does not become one more decision after a demanding day.", zh: "Fullive 自动调整睡前环境，让忙了一天的你不必再费心安排如何放松。" }, image: "./fullive/fullive-launch-hero-v2.png" },
    { tab: { en: "Training & recovery", zh: "训练与恢复" }, title: { en: "Recovery begins when the training day ends.", zh: "真正的恢复，从训练结束后开始。" }, copy: { en: "A repeatable change in light, sound and temperature tells the body that effort is over and rest can begin.", zh: "灯光、声音与温度形成稳定的变化，告诉身体：训练已经结束，现在可以进入休息。" }, image: "./fullive/fullive-recovery-v2.png" },
    { tab: { en: "Tomorrow", zh: "明天的状态" }, title: { en: "Bring more of yourself into tomorrow.", zh: "把更好的状态，留给明天。" }, copy: { en: "A better night can show up as more focus for work, more patience for people and more energy for what matters next.", zh: "睡得更好，第二天工作更专注、与人相处更从容，也更有精力做真正重要的事。" }, image: "./fullive/fullive-morning-v2.png" },
  ];
  const selectedHighlight = highlights[activeHighlight];
  const selectedCue = cues[activeCue];
  useEffect(() => {
    if (highlightPaused) return;
    const timer = window.setInterval(() => setActiveHighlight((current) => (current + 1) % highlights.length), 5200);
    return () => window.clearInterval(timer);
  }, [highlightPaused, highlights.length]);
  return <main className="product-page">
    <header className="product-nav">
      <button type="button" className="product-wordmark" onClick={() => scrollTo("fullive-top")}>FULLIVE ONE</button>
      <nav aria-label={isEn ? "Fullive product navigation" : "Fullive 产品导航"}><button type="button" onClick={() => scrollTo("highlights")}>{isEn ? "Highlights" : "亮点"}</button><button type="button" onClick={() => scrollTo("intelligence")}>{isEn ? "Bio-OS" : "Bio-OS"}</button><button type="button" onClick={() => scrollTo("night")}>{isEn ? "A night with Fullive" : "Fullive 的一夜"}</button><button type="button" onClick={() => scrollTo("lives")}>{isEn ? "Real lives" : "真实生活"}</button></nav>
      <div className="product-actions"><button type="button" className="locale-trigger" onClick={() => onLanguageChange(isEn ? "zh" : "en")}>{isEn ? "中文" : "EN"}</button><button type="button" className="plan-trigger" onClick={onBack}>{isEn ? "Case summary" : "返回案例"}</button><button type="button" className="nav-cta" onClick={() => setPurchaseOpen(true)}>{isEn ? "Buy" : "购买"}</button></div>
    </header>

    <section className="launch-hero" id="fullive-top">
      <img src="./fullive/fullive-launch-hero-v2.png" alt={isEn ? "Fullive One in an evening bedroom" : "夜晚卧室中的 Fullive One"} />
      <div className="launch-hero-shade" />
      <div className="launch-hero-copy"><p>FULLIVE ONE</p><h1>{isEn ? "Your room, tuned for sleep." : "让卧室配合你的睡眠节奏。"}</h1><span>{isEn ? "An AI-powered sleep space that learns your rhythm and orchestrates scent, light, sound and temperature around it." : "Bio-OS 学习你的作息与偏好，协调香氛、灯光、声音和温度，让你从入睡到醒来都更自然。"}</span><div><button type="button" className="primary-buy" onClick={() => setPurchaseOpen(true)}>{isEn ? "Buy" : "购买"}</button><button type="button" className="watch-night" onClick={() => scrollTo("night")}>{isEn ? "See how the night works ↓" : "看看 Fullive 如何陪你度过一晚 ↓"}</button></div></div>
      <div className="launch-benefits"><span><strong>{isEn ? "60 nights" : "60 晚"}</strong>{isEn ? "Home trial" : "居家试用"}</span><span><strong>{isEn ? "4 cues" : "4 项调节"}</strong>{isEn ? "One coordinated system" : "由一套系统协同"}</span><span><strong>{isEn ? "Bio-OS" : "Bio-OS"}</strong>{isEn ? "Self-learning and adaptive" : "持续学习，主动适应"}</span></div>
    </section>

    <section className="launch-highlights" id="highlights">
      <div className="launch-section-heading"><p>{isEn ? "GET THE HIGHLIGHTS" : "FULLIVE 核心亮点"}</p><h2>{isEn ? "The whole night, considered." : "整晚的节奏，都有人替你顾及。"}</h2></div>
      <div className="highlight-stage"><img src={selectedHighlight.image} alt="" /><div className="highlight-overlay"><h3>{text(selectedHighlight.title, language)}</h3><p>{text(selectedHighlight.copy, language)}</p></div><div className="highlight-controls"><div className="highlight-dots" role="tablist" aria-label={isEn ? "Fullive highlights" : "Fullive 亮点"}>{highlights.map((item, index) => <button type="button" role="tab" title={text(item.title, language)} aria-label={text(item.title, language)} aria-selected={activeHighlight === index} className={activeHighlight === index ? "active" : ""} onClick={() => setActiveHighlight(index)} key={item.title.en}><i /></button>)}</div><button type="button" className="highlight-play" title={highlightPaused ? (isEn ? "Play" : "播放") : (isEn ? "Pause" : "暂停")} aria-label={highlightPaused ? (isEn ? "Play highlights" : "播放亮点") : (isEn ? "Pause highlights" : "暂停亮点")} onClick={() => setHighlightPaused((value) => !value)}>{highlightPaused ? "▶" : "Ⅱ"}</button></div></div>
    </section>

    <section className={`bio-system cue-${activeCue}`} id="intelligence">
      <div className="bio-copy"><p>FULLIVE BIO-OS</p><h2>{isEn ? "Four cues. One quiet intelligence." : "四种环境调节，由一套系统协同。"}</h2><span>{isEn ? "Multimodal fusion reads the room, learns your preferences and coordinates each intervention as part of one sleep curve." : "Bio-OS 感知房间状态，也学习你的偏好，让灯光、声音、香氛和温度围绕同一晚的节奏协同变化。"}</span><div className="cue-tabs" role="tablist">{cues.map((cue, index) => <button type="button" role="tab" aria-selected={activeCue === index} className={activeCue === index ? "active" : ""} onClick={() => setActiveCue(index)} key={cue.label.en}>{text(cue.label, language)}</button>)}</div><div className="cue-detail"><b>{selectedCue.value}</b><h3>{text(selectedCue.title, language)}</h3><p>{text(selectedCue.copy, language)}</p></div></div>
      <div className="bio-product"><img src="./fullive/fullive-system-macro-v2.png" alt={isEn ? "Fullive One product detail" : "Fullive One 产品细节"} /><div className="cue-ring" /></div>
    </section>

    <section className="night-story" id="night">
      <div className="night-intro"><p>{isEn ? "A NIGHT WITH FULLIVE" : "FULLIVE 的一夜"}</p><h2>{isEn ? "From switched on to fully at rest." : "从结束工作，到自然醒来。"}</h2><span>{isEn ? "Bio-OS turns a collection of features into one continuous nightly rhythm." : "从睡前到清晨，Bio-OS 会结合时间、房间状态和你的习惯持续调节，不必让你在夜里分心操作。"}</span></div>
      <div className="night-sequence">{nightSteps.map((step, index) => <article className={index % 2 ? "night-step reverse" : "night-step"} key={step.time}><div className="night-media"><img src={step.image} alt="" /><span>{step.time}</span></div><div className="night-copy"><p>{String(index + 1).padStart(2, "0")} · {text(step.label, language)}</p><h3>{text(step.title, language)}</h3><span>{text(step.copy, language)}</span></div></article>)}</div>
    </section>

    <section className="real-lives" id="lives">
      <div className="real-lives-heading"><p>{isEn ? "DESIGNED AROUND REAL LIVES" : "为每一种日常而设计"}</p><h2>{isEn ? "Sleep changes more than the night." : "睡好一晚，改变第二天。"}</h2></div>
      <div className="real-lives-list">{lives.map((life, index) => <article className={index % 2 ? "life-story reverse" : "life-story"} key={life.tab.en}><div className="life-story-copy"><p>{String(index + 1).padStart(2, "0")} · {text(life.tab, language)}</p><h3>{text(life.title, language)}</h3><span>{text(life.copy, language)}</span></div><img src={life.image} alt="" /></article>)}</div>
    </section>

    <section className="proof-section">
      <div className="proof-heading"><p>{isEn ? "BUILT ON BIO-OS" : "BIO-OS 与隐私保护"}</p><h2>{isEn ? "Personal enough to adapt. Private enough for the bedroom." : "会适应你，也守住卧室的隐私。"}</h2></div><div className="proof-grid"><article><strong>18 min</strong><h3>{isEn ? "Faster sleep onset" : "平均入睡时间缩短"}</h3><p>{isEn ? "Average improvement in a 12-week launch study." : "12 周产品研究中的平均改善幅度。"}</p></article><article><strong>21%</strong><h3>{isEn ? "More consistent routines" : "睡前习惯更稳定"}</h3><p>{isEn ? "Measured across 214 beta participants." : "基于 214 名测试用户的记录。"}</p></article><article><strong>{isEn ? "Local first" : "本地优先"}</strong><h3>{isEn ? "Bedroom data stays protected" : "卧室数据，留在设备里"}</h3><p>{isEn ? "Core sensing and nightly decisions are processed on-device." : "核心感知与夜间调节优先在设备端完成。"}</p></article></div>
    </section>

    <section className="launch-final"><img src="./fullive/fullive-system-macro-v2.png" alt="Fullive One" /><div><p>FULLIVE ONE</p><h2>{isEn ? "Tonight can work differently." : "从今晚开始，换一种睡法。"}</h2><span>{isEn ? "Free shipping · 60-night home trial · Two-year warranty" : "免费配送 · 60 晚居家试用 · 两年保修"}</span><button type="button" onClick={() => setPurchaseOpen(true)}>{isEn ? "Buy Fullive One" : "购买 Fullive One"}</button></div>
    </section>

    {purchaseOpen && <PurchaseModal language={language} onClose={() => setPurchaseOpen(false)} />}
  </main>;
}

function PartFourCase({ language, onOpenLanding }: { language: Language; onOpenLanding: () => void }) {
  const isEn = language === "en";
  const pageRoles = [
    { section: "01", name: { en: "Hero", zh: "首屏" }, question: { en: "Why should I pause here?", zh: "我为什么要停下来了解它？" }, answer: { en: "Lead with the outcome, not a feature list: leaving an active day behind with less effort. The subhead then names the category: an AI-powered sleep space. Buy is visible, while “see how the night works” protects visitors who need context first.", zh: "先讲结果，而非堆叠功能：更省力地从忙碌切换到休息。副标题再说明品类，它是一套 AI 智能睡眠环境。购买按钮保持可见；“看看它如何陪你过一晚”则服务于还需要理解产品的访客。" } },
    { section: "02", name: { en: "Highlights", zh: "核心亮点" }, question: { en: "Can I grasp the promise quickly?", zh: "我能否快速理解它的承诺？" }, answer: { en: "The auto-advancing gallery reduces the story to four consequences: wind down, coordinated cues, learning over time and waking. It is an attention and comprehension device, not a feature catalogue.", zh: "自动轮播把故事压缩为四个结果：放松下来、环境协同、越用越懂你、醒来更从容。它服务于注意力与理解，而不是功能目录。" } },
    { section: "03", name: { en: "Bio-OS", zh: "Bio-OS" }, question: { en: "Why is it different from a bedside clock?", zh: "它与普通床头设备有什么不同？" }, answer: { en: "Interactive cue controls make the mechanism inspectable: scent, light, sound and temperature work as one adaptive system. This translates “AI” from a label into an understandable product behavior.", zh: "可切换的感官控件让用户看到机制：香氛、灯光、声音和温度由同一套自适应系统协同工作。这样，“AI”不再只是标签，而是可以理解的产品行为。" } },
    { section: "04", name: { en: "A night with Fullive", zh: "Fullive 的一夜" }, question: { en: "What changes during a real night?", zh: "真实的一晚会发生什么？" }, answer: { en: "This is the one chronological chapter. It converts an abstract system into a sequence around a familiar moment: end work, settle, sleep and wake. It gives creators a ready-made narrative for short video.", zh: "这是唯一按时间顺序展开的章节。它围绕用户熟悉的时刻，将抽象系统变成一连串动作：结束工作、安定下来、睡眠、醒来，也为创作者短视频提供可直接使用的叙事。" } },
    { section: "05", name: { en: "Real Lives", zh: "真实生活场景" }, question: { en: "Does this fit my life, not just my bedroom?", zh: "它是否与我的生活有关，而不只是卧室？" }, answer: { en: "Work pressure, recovery and next-day capacity connect sleep to visible daytime stakes. These scenes correspond to the message routes tested through creators and paid creative; they are hypotheses to validate, not health claims.", zh: "高压工作、训练恢复和次日状态，把睡眠连接到用户在白天能感受到的代价。这些场景分别对应创作者与广告素材中的信息路径；它们是需要验证的假设，而不是健康效果承诺。" } },
    { section: "06", name: { en: "Proof and purchase", zh: "证据与购买" }, question: { en: "Why buy now instead of later?", zh: "为什么现在购买，而不是以后再说？" }, answer: { en: "Proof, privacy, trial and a simple configuration flow resolve different risks immediately before checkout. The prototype demonstrates the placement and hierarchy; any launch outcomes must be replaced with substantiated evidence.", zh: "效果证据、隐私说明、试用保障和简洁配置分别解决不同顾虑，并在结账前集中呈现。原型演示的是信息位置与优先级；正式上线时，所有效果数据都必须替换为有依据的证据。" } },
  ];
  const stages = [
    { stage: { en: "1. Message quality", zh: "1. 信息质量" }, metric: { en: "Qualified sessions and hero CTA rate by source", zh: "按来源看有效访问与首屏 CTA 点击率" }, why: { en: "Checks whether the creator/ad promise matches the page promise.", zh: "判断创作者或广告的承诺是否与页面承诺一致。" }, decision: { en: "Keep or rewrite the entry message before scaling traffic.", zh: "先决定保留还是改写入口信息，再扩大流量。" } },
    { stage: { en: "2. Understanding", zh: "2. 理解程度" }, metric: { en: "Highlight view, cue interaction, A-night and life-scene view-through", zh: "亮点查看、感官互动、“一夜”与生活场景浏览深度" }, why: { en: "Separates curiosity from product comprehension.", zh: "区分一时好奇与真正理解产品。" }, decision: { en: "Clarify the mechanism or use the strongest scene as the next landing variant.", zh: "补强机制解释，或把最强场景发展为下一版落地页。" } },
    { stage: { en: "3. Trust and intent", zh: "3. 信任与意向" }, metric: { en: "Proof exposure, Buy start and configuration completion", zh: "证据区曝光、开始购买与配置完成" }, why: { en: "Identifies whether proof, risk or the offer blocks a considered purchase.", zh: "判断阻碍认真购买的是证据、风险，还是产品方案本身。" }, decision: { en: "Improve proof, trial or inclusion clarity before changing the whole story.", zh: "先优化证据、试用或包装说明，而不是贸然重写整套故事。" } },
    { stage: { en: "4. Commerce", zh: "4. 交易" }, metric: { en: "Checkout completion per qualified session and revenue per qualified session", zh: "每位有效访问者的结账完成率与收入" }, why: { en: "Measures commercial viability once checkout is live.", zh: "在结账上线后衡量商业可行性。" }, decision: { en: "Scale the segment/message pair only after it clears a pre-set economics bar.", zh: "只有人群与信息组合达到预设经济门槛后，才扩大投放。" } },
  ];
  return <main className="article part-four-case">
    <section className="article-hero part-four-case-hero">
      <p>{isEn ? "GTM TAKE-HOME · PART 4" : "GTM TAKE-HOME · 第四部分"}</p>
      <h1>{isEn ? "Landing Page & Data Loop" : "落地页与数据闭环"}</h1>
      <span>{isEn ? "Consumer experience, measurement and the decisions that follow" : "页面体验、衡量方式与后续决策"}</span>
      <div className="prototype-preview"><img src="./fullive/fullive-launch-hero-v2.png" alt={isEn ? "Fullive landing page prototype" : "Fullive 落地页原型"} /><div><strong>FULLIVE ONE</strong><p>{isEn ? "Your room, tuned for sleep." : "让卧室配合你的睡眠节奏。"}</p><button type="button" onClick={onOpenLanding}>{isEn ? "Open landing page prototype ↗" : "查看落地页原型 ↗"}</button></div></div>
    </section>

    <article className="article-body part-four-body">
      <div className="part-four-brief"><span><b>{isEn ? "POSITIONING" : "定位"}</b>{isEn ? "One adaptive sleep space, not four separate features." : "讲的是一套会主动适应的睡眠环境，而不是四项功能的拼盘。"}</span><span><b>{isEn ? "CONVERSION" : "转化"}</b>{isEn ? "One Buy path, with learning paths for visitors who need context first." : "购买是唯一主路径；还没想清楚的访客可以继续了解，不会被迫立刻下决定。"}</span><span><b>{isEn ? "LEARNING" : "验证"}</b>{isEn ? "Each interaction has an event, a decision owner and a next action." : "每个关键互动都对应一个事件、一项判断和下一步动作。"}</span></div>

      <h2>{isEn ? "The answer in four decisions" : "四项核心决策"}</h2>
      <div className="part-four-answer-grid">
        <section><span>01</span><h3>{isEn ? "Key message" : "核心信息"}</h3><p>{isEn ? "Fullive One is an AI-powered sleep space that learns a person's nightly rhythm and coordinates scent, light, sound and temperature around it. The lead benefit is a lower-effort transition from an active day into sleep; the four cues explain why that promise is credible." : "Fullive One 是一套会学习个人夜间节奏，并协调香氛、灯光、声音和温度的 AI 睡眠环境。先传达的收益是：从忙碌进入休息，不必再费力切换。四种环境调节用来说明这件事如何发生。"}</p></section>
        <section><span>02</span><h3>{isEn ? "Target user" : "目标用户"}</h3><p>{isEn ? "North American professionals and wellness-minded adults with recurring sleep friction, existing spend on premium health or smart-home products, and a visible next-day cost in focus, recovery or relationships." : "面向北美专业人士及重视健康的成年人。他们反复遇到难放松、难入睡或醒后状态不佳，也愿意为高端健康和智能家居产品付费，并能明显感受到睡不好对工作、恢复或人际相处的影响。"}</p></section>
        <section><span>03</span><h3>{isEn ? "Main CTA" : "主要行动按钮"}</h3><p>{isEn ? "Buy Fullive One. It appears in the sticky product navigation, hero and final close. “See how the night works” is secondary: it keeps uncertain visitors learning without creating a competing conversion goal." : "主要按钮是“购买 Fullive One”，在顶部导航、首屏和页尾持续出现。“看看它如何陪你度过一晚”是次要入口，给仍在犹豫的人更多理解空间，但不制造第二个转化目标。"}</p></section>
        <section><span>04</span><h3>{isEn ? "Desired user action" : "期望用户完成的行动"}</h3><p>{isEn ? "Complete product configuration and checkout. Highlight selection, Bio-OS cue exploration and scenario engagement are diagnostic behaviors, not substitutes for the conversion goal." : "最终目标是完成产品配置与结账。亮点切换、Bio-OS 功能探索和场景浏览属于过程信号，用来判断用户为何购买或流失，不能代替最终转化。"}</p></section>
      </div>

      <h2>{isEn ? "How the page builds the decision" : "页面如何一步步促成购买"}</h2>
      <p>{isEn ? "The landing page is organized by the consumer decision journey, not by time. Only the “A night with Fullive” chapter is chronological." : "整张页面按用户的决策过程组织，而不是按时间罗列功能：先产生兴趣，再理解产品，建立信任，最后购买。只有“Fullive 的一夜”按时间线讲述，用来说明产品在真实夜晚中如何工作。"}</p>
      <div className="page-role-list">{pageRoles.map((role) => <section key={role.section}><span>{role.section}</span><div><h3>{text(role.name, language)}</h3><b>{text(role.question, language)}</b><p>{text(role.answer, language)}</p></div></section>)}</div>
      <button type="button" className="open-prototype-inline" onClick={onOpenLanding}>{isEn ? "Experience the consumer page ↗" : "查看消费者落地页 ↗"}</button>

      <h2>{isEn ? "How marketing, copy and action connect" : "营销、文案与行动如何连起来"}</h2>
      <p>{isEn ? "The acquisition message should not promise something the page cannot explain. Each route starts with a real-life tension, gives the same product a relevant frame, and sends the visitor to the section that resolves the next question." : "引流信息不能承诺页面无法解释的内容。每条路径都先从真实生活中的困扰切入，再用相应的产品表达，把访客带到能回答下一问题的页面章节。"}</p>
      <div className="copy-logic"><section><span>01</span><h3>{isEn ? "Attract" : "先吸引注意"}</h3><p>{isEn ? "Creator or ad: “I cannot switch off after work.”" : "创作者或广告： “工作结束了，人却还停不下来。”"}</p><b>{isEn ? "Target" : "对应人群"}</b><p>{isEn ? "Knowledge workers with an active mind at bedtime." : "睡前大脑仍在高速运转的职场人。"}</p></section><section><span>02</span><h3>{isEn ? "Explain" : "再解释价值"}</h3><p>{isEn ? "Landing hero: “Your room, tuned for sleep.” Bio-OS shows how coordination, not novelty alone, creates the benefit." : "首屏： “让卧室配合你的睡眠节奏。” Bio-OS 说明带来价值的是环境协同，而不只是新奇功能。"}</p><b>{isEn ? "Desired response" : "希望用户理解"}</b><p>{isEn ? "This is one adaptive system, not another device to manage." : "这是一套会配合我的系统，不是又一个需要我操心的设备。"}</p></section><section><span>03</span><h3>{isEn ? "Convert" : "最后促成行动"}</h3><p>{isEn ? "Proof, privacy and trial appear after comprehension, then Buy opens a simple configuration flow." : "用户理解产品后，再呈现证据、隐私和试用保障；随后由“购买”进入简洁的配置流程。"}</p><b>{isEn ? "Desired action" : "期望行动"}</b><p>{isEn ? "Start configuration, then complete checkout." : "开始配置，并完成结账。"}</p></section></div>

      <h2>{isEn ? "Measurement architecture" : "如何衡量页面表现"}</h2>
      <p>{isEn ? "The primary metric is checkout completion per qualified session. Before commerce is live, Buy-start rate is a temporary leading signal, not a substitute for demand. Every event carries source, creator, creative, message variant, scene, device and visitor-type properties; no sleep or other sensitive personal data belongs in web analytics." : "核心指标是有效访问者的结账完成率。交易尚未上线时，“开始购买率”只能作为早期信号，不能替代真实需求。每个事件都应带上来源、创作者、素材、信息版本、场景、设备和访客类型；网站分析中不采集睡眠或其他敏感个人数据。"}</p>
      <figure className="measurement-funnel"><div><b>01</b><strong>landing_view</strong><span>{isEn ? "qualified source and message" : "有效来源与信息版本"}</span></div><div><b>02</b><strong>hero_cta_clicked</strong><span>{isEn ? "entry-message response" : "入口信息反馈"}</span></div><div><b>03</b><strong>highlight / cue / scene viewed</strong><span>{isEn ? "understanding and relevance" : "理解与相关性"}</span></div><div><b>04</b><strong>buy_started</strong><span>{isEn ? "trust and offer signal" : "信任与方案信号"}</span></div><div><b>05</b><strong>checkout_completed</strong><span>{isEn ? "commercial conversion" : "真实商业转化"}</span></div></figure>
      <div className="metric-hierarchy"><section><h3>{isEn ? "Primary" : "核心指标"}</h3><p>{isEn ? "Purchase conversion rate; revenue per qualified visitor when commerce is live." : "购买转化率；正式销售后，再增加每位有效访客带来的收入。"}</p></section><section><h3>{isEn ? "Diagnostic" : "过程指标"}</h3><p>{isEn ? "Hero CTA rate, section view-through, highlight and cue engagement, configuration completion and checkout abandonment." : "首屏按钮点击率、各章节到达率、亮点与功能互动率、配置完成率和结账放弃率。"}</p></section><section><h3>{isEn ? "Cuts" : "拆分维度"}</h3><p>{isEn ? "Creator, platform, creative, message variant, device, audience scene and new vs. returning visitor." : "按创作者、平台、素材、信息版本、设备、用户场景，以及新访客和回访用户分别查看。"}</p></section></div>

      <h2>{isEn ? "Metrics by decision stage" : "按决策阶段设置指标"}</h2>
      <p>{isEn ? "These stages prevent the team from calling a high-click creative a winner before it has shown understanding, intent and commercial value." : "分阶段衡量可以避免团队只因某条素材点击高，就过早判定它胜出；必须依次看到理解、意向和商业价值。"}</p>
      <div className="stage-grid">{stages.map((item) => <section key={item.stage.en}><span>{text(item.stage, language)}</span><h3>{text(item.metric, language)}</h3><p><b>{isEn ? "Why" : "原因"}</b>{text(item.why, language)}</p><p><b>{isEn ? "Decision" : "决策"}</b>{text(item.decision, language)}</p></section>)}</div>

      <h2>{isEn ? "From data to the next GTM decision" : "如何用数据指导下一步 GTM"}</h2>
      <p>{isEn ? "A dashboard is not the loop. The loop exists only when a signal changes what the team does next. Instrumentation is checked daily; the source/message review happens weekly; a two-week readout decides the next creator, message and landing-page test. Do not select a winner from a tiny cohort or a single vanity metric." : "数据闭环不是多看一个仪表盘，而是让信号真正改变团队的下一步动作。每天检查埋点是否正常，每周复盘来源与信息表现，两周后决定下一轮创作者、信息和落地页测试。小样本或单一虚荣指标，都不足以宣布某个方案“胜出”。"}</p>
      <div className="decision-table" role="table" aria-label={isEn ? "Data decision rules" : "数据决策规则"}><div className="decision-head" role="row"><b>{isEn ? "Observed signal" : "数据表现"}</b><b>{isEn ? "Likely interpretation" : "可能原因"}</b><b>{isEn ? "Next decision" : "下一步行动"}</b></div><div role="row"><span>{isEn ? "High bounce; weak hero CTA" : "跳出率高，首屏购买点击少"}</span><span>{isEn ? "Traffic and value proposition do not match" : "流量来源与核心卖点不匹配"}</span><span>{isEn ? "Rewrite the hero for that source; test outcome vs. AI-system framing" : "针对该来源改写首屏，对比“改善次日状态”和“AI 智能调节”两种表达"}</span></div><div role="row"><span>{isEn ? "Strong Bio-OS engagement; weak Buy intent" : "Bio-OS 互动多，但购买点击少"}</span><span>{isEn ? "The mechanism is interesting, but trust or value is insufficient" : "功能原理有吸引力，但价值感或信任感仍不足"}</span><span>{isEn ? "Strengthen proof, guarantee and product demonstration before adding media spend" : "先补强效果证据、试用保障和产品演示，再增加投放预算"}</span></div><div role="row"><span>{isEn ? "Strong Buy clicks; configuration drop-off" : "购买点击多，但配置环节流失高"}</span><span>{isEn ? "Purchase flow or product choice creates friction" : "购买流程复杂，或产品选项难以理解"}</span><span>{isEn ? "Reduce options, clarify what is included and test the configuration order" : "精简选项，说明包装内容，并测试不同配置顺序"}</span></div><div role="row"><span>{isEn ? "Conversion concentrates in one Real Lives scene" : "购买转化集中在某一生活场景"}</span><span>{isEn ? "One audience problem has stronger message-market fit" : "该场景更能打动目标用户"}</span><span>{isEn ? "Prioritize matching creators, paid creative and a scene-specific landing variant" : "优先投入相应创作者、广告素材和场景专属落地页"}</span></div></div>

      <h2>{isEn ? "First experiments" : "首轮实验"}</h2>
      <p><strong>{isEn ? "Message." : "核心信息。"}</strong> {isEn ? "Test “Your room, tuned for sleep” against an outcome-led workday transition message. Keep media and traffic source constant." : "对比“让卧室更懂你的睡眠”和更强调下班后放松结果的版本；测试时保持素材和流量来源不变。"}</p>
      <p><strong>{isEn ? "Audience-scene match." : "受众与场景。"}</strong> {isEn ? "Route productivity creators to the work-pressure scene and fitness creators to recovery, then compare qualified conversion rather than click volume." : "将效率类创作者的流量导向高压工作场景，将健身类创作者的流量导向训练恢复场景；比较购买转化，而不是只看点击量。"}</p>
      <p><strong>{isEn ? "Proof and friction." : "证据与顾虑。"}</strong> {isEn ? "Test stronger substantiated proof and home-trial reassurance before changing the product story or expanding feature claims. Change one meaningful variable at a time and set the evaluation threshold before traffic is sent." : "先测试更有说服力且有依据的证据与居家试用保障，再判断是否需要调整产品叙事或增加功能信息。每次只改变一个关键变量，并在引流前设定评价门槛。"}</p>
      <p className="source-note">{isEn ? "Prototype note: the consumer page contains illustrative launch outcomes and offer details so the intended information hierarchy can be experienced. They are not research findings; any production page must replace them with validated product, privacy and commercial facts." : "原型说明：消费者页面中的效果数据和服务信息为演示性假设，用于呈现信息层级，并非研究结论。正式页面必须替换为经过验证的产品、隐私与商业事实。"}</p>
    </article>
  </main>;
}

function PartFive({ language }: { language: Language }) {
  const isEn = language === "en";
  const workflowRows = [
    { step: { en: "1. GPT-5.6 / Codex", zh: "1. GPT-5.6 / Codex" }, copy: { en: "Generated the initial competitor set, survey structure, creator routes and landing-page draft. It was used to broaden options and structure the work, not to establish facts.", zh: "用于扩展竞品、问卷结构、创作者路径和落地页初稿。它负责打开选项、搭建结构，不负责认定事实。" } },
    { step: { en: "2. Web research", zh: "2. 网页核查" }, copy: { en: "Checked time-sensitive facts against first-party pages: pricing, availability, product scope, creator channels and brand conflicts.", zh: "用第一方页面核查时效性事实：价格、上市状态、产品范围、创作者渠道和品牌合作冲突。" } },
    { step: { en: "3. Custom skill", zh: "3. 自定义 skill" }, copy: { en: "Built evidence-led-marketing-agent to require a claim ledger, source hierarchy, counter-check and before/after improvement log across the case.", zh: "创建 evidence-led-marketing-agent，要求全案保留主张清单、来源层级、反向核查和“修改前 / 修改后”记录。" } },
    { step: { en: "4. Final judgment", zh: "4. 人工判断" }, copy: { en: "Removed unsupported certainty, reclassified weak fits, and turned open questions into survey or creator tests with a measurable next step.", zh: "删去没有依据的确定性说法，重新归类不够匹配的对象，并把悬而未决的问题改写成可衡量的问卷或创作者测试。" } },
  ];
  const changes = [
    { draft: { en: "Naptick: unclear fulfillment and a $149 founder offer.", zh: "初稿把 Naptick 写成“发货信息不清楚，创始用户价 $149”。" }, checked: { en: "Its current product page states $349, a 60-night guarantee and Batch 3 shipping in Aug 2026.", zh: "核查后发现，其当前产品页写明 $349、60 晚退款保障，以及第 3 批预计于 2026 年 8 月发货。" }, final: { en: "Corrected the profile and retained only the remaining uncertainty: autonomous intervention is not clearly demonstrated publicly.", zh: "因此更正了价格和发货信息，只保留尚未被公开材料充分说明的疑问：是否存在真正的自动干预。" } },
    { draft: { en: "Sleep.ai: direct consumer competitor.", zh: "初稿把 Sleep.ai 当作直接面向消费者的竞品。" }, checked: { en: "Its public offer includes SleepScore Labs, APIs and product-validation services alongside consumer sleep insight.", zh: "核查其公开业务后发现，除消费者睡眠洞察外，还包括 SleepScore Labs、API 和产品验证服务。" }, final: { en: "Reclassified it as measurement and validation adjacency, which changes the relevant GTM question from displacement to potential proof partnership.", zh: "因此将其改为“测量与验证邻近方”。对应的 GTM 问题也从“会不会替代我们”变为“能否成为验证能力的潜在伙伴”。" } },
    { draft: { en: "Lead launch copy with multisensory novelty.", zh: "初稿倾向用“多感官新颖性”作为首要传播点。" }, checked: { en: "Soluna already makes a similar four-cue promise. The competitor scan does not establish novelty as an ownable position.", zh: "但 Soluna 已经提出相近的四感官承诺，竞品扫描并不能证明“多感官”是可独占的定位。" }, final: { en: "The prototype leads with the felt transition out of the day, then explains coordinated cues as the mechanism.", zh: "因此原型先讲“从忙碌进入休息”的体感收益，再用环境协同解释它如何做到。" } },
  ];
  return <main>
    <section className="article-hero">
      <p>{isEn ? "GTM TAKE-HOME · PART 5" : "GTM TAKE-HOME · 第五部分"}</p>
      <h1>{isEn ? "AI Workflow" : "AI 工作流说明"}</h1>
      <span>{isEn ? "Generate broadly. Verify carefully. Decide with judgment." : "先扩展，再核查，最后基于判断收敛。"}</span>
      <img src="./fullive/fullive-system-macro-v2.png" alt={isEn ? "Fullive One prototype" : "Fullive One 原型"} />
    </section>
    <article className="article-body">
      <p>{isEn ? "AI accelerated research and production, but it was not treated as a source of truth. Current facts were checked, assumptions were labelled, and recommendations were framed as tests where evidence is still incomplete." : "AI 用于加快研究和产出，但不被当作事实来源。当前事实经过核查，假设明确标注；证据不足的建议都写成下一步需要验证的测试。"}</p>

      <h2>{isEn ? "Tools, use and verification" : "工具、用途与核查方式"}</h2>
      <div className="workflow-grid">{workflowRows.map((item, index) => <section key={item.step.en}><span>{String(index + 1).padStart(2, "0")}</span><h3>{text(item.step, language)}</h3><p>{text(item.copy, language)}</p></section>)}</div>

      <h2>{isEn ? "What I changed after verification" : "核查后，我具体改了什么"}</h2>
      <p>{isEn ? "The useful output of an AI workflow is visible correction, not a tool list. These three changes materially affected the case recommendation." : "AI 工作流的价值不在于列工具，而在于留下可见的修正。以下三项改动直接影响了案例中的判断。"}</p>
      <div className="improvement-list">{changes.map((item, index) => <section key={item.draft.en}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{isEn ? "Initial draft" : "初稿"}</h3><p>{text(item.draft, language)}</p></div><div><h3>{isEn ? "After checking" : "核查后"}</h3><p>{text(item.checked, language)}</p></div><div><h3>{isEn ? "Final treatment" : "最终处理"}</h3><p>{text(item.final, language)}</p></div></section>)}</div>

      <div className="skill-note"><span>evidence-led-marketing-agent</span><h3>{isEn ? "The custom skill used for this case." : "本次案例使用的自定义 skill。"}</h3><p>{isEn ? "It combines the installed marketing modules with a required evidence check: source hierarchy, claim ledger, counter-check and documented rewrite. The local package passed structural validation." : "它把现有营销模块和一套必须执行的证据检查结合起来：来源层级、主张清单、反向核查和改写记录。本地技能包已通过结构校验。"}</p></div>
      <p className="source-note">{isEn ? "Limit: this is desk research and a prototype, not proof of product-market fit. The next step is the Part 2 survey followed by three small creator pilots, using the Part 4 measurement plan to decide what to scale." : "边界：这是一份桌面研究和原型，不等于已经验证产品市场匹配。下一步是先跑 Part 2 问卷，再做三组小型创作者试点，并按 Part 4 的衡量方案决定扩大什么。"}</p>
    </article>
  </main>;
}

function PlaceholderPart({ part, language }: { part: number; language: Language }) {
  const meta = parts[part - 1];
  return (
    <main className="placeholder-part">
      <p>{language === "en" ? `GTM TAKE-HOME · PART ${part}` : `GTM TAKE-HOME · 第 ${part} 部分`}</p>
      <h1>{text(meta.title, language)}</h1>
      <span>{language === "en" ? "This part has not been researched yet." : "此部分尚未开始研究。"}</span>
      <div className="placeholder-figure" />
    </main>
  );
}

export function CasePage() {
  const [language, setLanguage] = useState<Language>("en");
  const [activePart, setActivePart] = useState(1);
  const [partFourView, setPartFourView] = useState<"case" | "landing">("case");

  useEffect(() => {
    const match = window.location.hash.match(/part-(\d)/);
    if (match) setActivePart(Math.min(5, Math.max(1, Number(match[1]))));
    if (window.location.hash.includes("part-4-landing")) setPartFourView("landing");
  }, []);

  const changePart = (part: number) => {
    setActivePart(part);
    setPartFourView("case");
    window.history.replaceState(null, "", `#part-${part}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openPartFourLanding = () => {
    setPartFourView("landing");
    window.history.pushState(null, "", "#part-4-landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const closePartFourLanding = () => {
    setPartFourView("case");
    window.history.pushState(null, "", "#part-4");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {(activePart !== 4 || partFourView === "case") && <header className="site-header">
        <button className="brand" type="button" onClick={() => changePart(1)}>FULLIVE.AI</button>
        <nav aria-label={language === "en" ? "Case parts" : "案例部分"}>{parts.map((part) => <button type="button" className={activePart === part.number ? "active" : ""} onClick={() => changePart(part.number)} key={part.number}>{text(part.title, language)}</button>)}</nav>
        <div className="header-actions"><div className="language-switch"><button type="button" className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button><button type="button" className={language === "zh" ? "active" : ""} onClick={() => setLanguage("zh")}>中文</button></div><span>{activePart} / 5</span></div>
      </header>}
      {activePart === 1 ? <PartOne language={language} /> : activePart === 2 ? <PartTwo language={language} /> : activePart === 3 ? <PartThree language={language} /> : activePart === 4 ? partFourView === "case" ? <PartFourCase language={language} onOpenLanding={openPartFourLanding} /> : <PartFourLanding language={language} onLanguageChange={setLanguage} onBack={closePartFourLanding} /> : <PartFive language={language} />}
    </>
  );
}
