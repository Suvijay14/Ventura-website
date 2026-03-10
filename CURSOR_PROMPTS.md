# Ventura Website Improvement Prompts

Ready-to-use Cursor prompts for implementing remaining improvements from the Ventura Website Improvement Guide.

---

## ✅ COMPLETED (Week 1)

- [x] Trust indicators section — Already on homepage
- [x] How It Works 3-step section — Added to homepage
- [x] Before/after code comparison — Added to homepage
- [x] Hero layout (center content, stats in row) — Updated
- [x] Integration cards grid with orbital viz — Already on /integrations

---

## 1. Pricing Page

**Prompt:**

```
Create a /pricing page for the Ventura EU AI Act compliance product. Include:

- Free Tier: CLI access, 10 scans/month, community support
- Team: $99/mo, unlimited scans, GitHub integration, email support
- Enterprise: Custom pricing, dedicated support, SSO, SLA

Use the existing design system (colors: #0f172a, #64748b, #e2e8f0, etc.).
Include a "Schedule Consultation" CTA for Enterprise.
Add a comparison table and "Most Popular" badge on Team tier.
Route: app/pricing/page.tsx
```

---

## 2. Testimonials Section (Expand)

**Prompt:**

```
Expand the testimonials section on app/page.tsx to support multiple testimonials in a carousel or grid.

- Add 2–3 more testimonial cards with placeholder quotes
- Include: quote, attribution (role + company type), optional avatar placeholder
- Make it responsive (1 col mobile, 3 col desktop)
- Consider adding a subtle fade/slide animation on hover
```

---

## 3. Integration Cards (Add Logos)

**Prompt:**

```
Update the IntegrationCard component in app/integrations/page.tsx to display actual logos for each integration.

- Add logo paths to lib/integrations.ts (use public/logos/ or external CDN URLs)
- Fallback to initials (current behavior) if logo missing
- Logos should be ~40x40px, grayscale by default, color on hover
- Add logos for: GitHub, GitLab, VS Code, JetBrains, Slack, Jira, Jenkins, etc.
```

---

## 4. Compliance Calculator (Interactive Widget)

**Prompt:**

```
Create an interactive "Calculate Your Compliance Gap" widget. Add it as a new section or page.

Inputs:
- How many AI systems do you have? (number)
- Industry? (dropdown: Healthcare, Finance, Employment, Biometric, Other)
- Developer team size? (dropdown or number)

Output:
- Estimated days to compliance
- Brief explanation of requirements
- "Schedule Assessment" CTA

Use client component with useState. Style with existing Ventura design tokens.
Consider: app/get-started/page.tsx or a dedicated app/calculator/page.tsx
```

---

## 5. Article Explorer (Interactive Component)

**Prompt:**

```
Create an EU AI Act Article Explorer component/page.

- Search or browse by category (Chapter I: General, Chapter II: Prohibited, Chapter III: High-Risk, etc.)
- Each article shows: number, title, summary, what Ventura checks
- Use expandable/collapsible sections for chapters
- Route: app/glossary (expand) or new app/articles/page.tsx
- Include schema for ~20 key articles (9, 10, 11, 12, 13, 14, 15, 17, etc.) as seed data
```

---

## 6. Industry Landing Pages (Template)

**Prompt:**

```
Create industry-specific landing page template and pages for:
- /healthcare
- /finance
- /employment
- /biometric

Each page should have:
- Industry-specific headline and value prop
- EU AI Act classification (High-risk, Limited, etc.)
- Common use cases for that industry
- Specific requirements (GDPR + AI Act overlap)
- Example violations Ventura catches
- "Schedule Industry Consultation" CTA

Use a shared layout component. Create lib/industries.ts with industry data.
```

---

## 7. Risk Classification Tool

**Prompt:**

```
Create an "Is Your AI System High-Risk?" interactive tool.

- Dropdown: What does it do? (e.g., Recruitment automation, Credit scoring, Medical diagnosis, etc.)
- Output: HIGH-RISK / LIMITED-RISK / MINIMAL-RISK with Annex reference
- Show which articles apply (e.g., Articles 9–15 for high-risk)
- "Learn More" and "Schedule Assessment" CTAs

Route: app/assessment (expand) or app/risk-tool/page.tsx
Use client component with conditional rendering based on selection.
```

---

## 8. Trust Indicators (Add Logo Placeholders)

**Prompt:**

```
Update the trust indicators section on app/page.tsx to use actual company logos instead of text.

- Add placeholder image slots in public/logos/ for: Mistral AI, Shift Technology, Dataiku, Hugging Face
- Use Next.js Image component, grayscale filter, hover to color
- Add "As featured in" section with placeholder logos for: TechCrunch, VentureBeat (or similar)
- Keep the certification badges (SOC 2, GDPR, Zero Data) as-is
```

---

## 9. SEO & Meta Improvements

**Prompt:**

```
Add SEO improvements across the Ventura site:

1. app/layout.tsx: Expand metadata with:
   - description: "Automated EU AI Act compliance for AI systems. Scan code, detect violations, get expert guidance. Schedule consultation."
   - openGraph and twitter card meta
   - canonical URL

2. Create app/sitemap.ts and app/robots.ts for Next.js

3. Add JSON-LD schema (SoftwareApplication) to layout or a dedicated component

4. Per-page meta: Add generateMetadata() to key pages (pricing, demo, get-started, capabilities)
```

---

## Quick Reference: Design Tokens

```
--navy: #0f172a      (primary text, buttons)
--charcoal: #1e293b  (secondary)
--warm-gray: #64748b (muted text)
--slate: #475569
--border: #e2e8f0
--bg-subtle: #f8fafc
```

---

## Suggested Order (Week 2–3)

1. **Pricing page** — High impact, relatively simple
2. **SEO & meta** — Quick wins, important for launch
3. **Industry landing pages** — Good for targeted traffic
4. **Compliance calculator** — Differentiating interactive feature
5. **Risk classification tool** — Complements assessment flow
6. **Article explorer** — Content-heavy, good for SEO
7. **Integration logos** — Polish for existing page
8. **Trust indicator logos** — Polish for homepage
9. **Expand testimonials** — Add more social proof
