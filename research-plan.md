# Research & Plan

> Output ของ Stage 1 — foundation ที่ Stage 2 และทั้ง project ใช้

**Project:** D Deal Inspector & Interior — Corporate Website (Frontend)
**Date:** 2026-09-21
**Designer:** Krittiya W.

---

## Section 1 — Domain Research

**Industry:** บริการตรวจสอบบ้าน/คอนโดก่อนโอน (home inspection) + บริการตกแต่งภายใน — ตลาดไทย, SME, lead-gen ผ่านโซเชียล

### Domain norms ที่ยืนยันแล้วจากการสแกนตลาด

| Norm | หลักฐาน | ผลต่อการออกแบบ |
|---|---|---|
| **เปิดเผยราคาเป็นมาตรฐาน** | 10/10 บริษัทใน roundup ของ Pass Engineering ระบุราคาหรือช่วงราคา; N.S.Plus ลงตารางราคาละเอียดตามขนาดพื้นที่ | ถ้าเราไม่โชว์ราคา = ดูเลี่ยง เสียเปรียบทันที |
| **ราคาเป็นขั้นบันไดตามพื้นที่ใช้สอย ไม่ใช่ต่อ ตร.ม.** | N.S.Plus: คอนโด <40 ตร.ม. ฿4,000 → <320 ตร.ม. ฿11,000 / บ้าน <140 ตร.ม. ฿6,000 → <820 ตร.ม. ฿23,000 | ตารางราคาควรเป็น tier ไม่ใช่เครื่องคิดเลข |
| **อุปกรณ์คือจุดขาย** | กล้องอินฟราเรด, โดรนตรวจหลังคา, กล้องงูส่องท่อ, laser level ถูกยกเป็น differentiator แทบทุกเจ้า | ต้องมี section อุปกรณ์พร้อมภาพจริง |
| **ใบอนุญาตวิศวกรตรวจสอบได้จริง** | สภาวิศวกรเปิดระบบค้นหาสาธารณะ `service.coe.or.th` — ลูกค้ากรอกเลขที่ใบอนุญาตเช็กเองได้ | ⭐ โชว์เลข กว. + ลิงก์ไปหน้าตรวจสอบ = trust signal ที่แข็งที่สุดและคู่แข่งส่วนใหญ่ยังไม่ทำ |
| **รายงานตัวอย่างให้ดาวน์โหลด** | N.S.Plus มีให้โหลดแยกตามประเภท (บ้านเดี่ยว/คอนโด/ทาวน์เฮาส์/มือสอง) | ลด perceived risk ก่อนตัดสินใจ — ควรมี |
| **ความเร็วรายงานเป็นจุดขาย** | checkhomeservice ชู "รายงานภายใน 24 ชม." | ถ้าเราทำได้ ต้องพูด |
| **จำนวนงานสะสมเป็น proof** | "6,000+ ยูนิต", "500+ งาน", "ประสบการณ์ 10-18 ปี" | ต้องมีตัวเลขจริง (ถามลูกค้า) |

### Benchmark ราคาตลาด

| ระดับ | ช่วงราคา | ตัวอย่าง |
|---|---|---|
| Entry / แพลตฟอร์มรวมช่าง | ฿2,500 เริ่มต้น | Fastwork, Q-CHANG, Pass Engineering (2,500–4,000) |
| Mid | ฿3,000–3,500 เริ่มต้น | Bluehomethai, Allwecheck, checkhomeservice |
| Standard | ฿4,000–7,000 | Thomeinspector, Sinspectors, squareone, checkhousesthai |
| Premium / tiered | ฿4,000–23,000 ตามขนาด | N.S.Plus Engineering |

→ **ช่วงที่ลูกค้าคาดหวังคือ 3,000–7,000** สำหรับบ้าน/คอนโดทั่วไป

### คำถามที่ห่วงที่สุดได้คำตอบแล้ว — cross-sell ตรวจ+ซ่อม ไม่ใช่เรื่องแปลกในตลาดไทย

| บริษัท | ทำอะไรควบ |
|---|---|
| **Allwecheck** | ตรวจครบตั้งแต่โครงสร้างถึง interior design + ที่ปรึกษางานก่อสร้าง |
| **Bluehomethai** | ตรวจ + มีบริการแก้ไข/ดัดแปลงในตัว |
| **N.S.Plus** | ตรวจ + ซ่อมโครงสร้าง/แก้อาคารทรุด (ไม่แตะ interior) |

**สรุป:** ตลาดไทยไม่ได้มองว่า "ตรวจแล้วรับซ่อมเอง" เป็น conflict of interest แบบตลาดตะวันตก → **D Deal ทำ funnel นี้ได้เต็มที่** แต่ต้องวางลำดับให้ถูก: ขายความเป็นกลางของการตรวจก่อน แล้วค่อยเสนอบริการแก้ทีหลัง ไม่ใช่โชว์คู่กันตั้งแต่ hero
*ข้อควรระวัง:* ไม่มีเจ้าไหนนำด้วย interior เต็มรูปแบบแบบ D Deal (ผ้าม่าน วอลเปเปอร์ SPC ฟิล์ม built-in) → **นี่คือช่องว่างที่เป็นจุดต่างจริง** ไม่ใช่จุดอ่อน

### Common UI patterns ของ domain นี้
- Hero: pain-led headline + ปุ่ม LINE เด่น
- ตารางราคาแบบ tier ตามขนาดพื้นที่
- Grid รายการสิ่งที่ตรวจ (แยกเป็นระบบ เช่น โครงสร้าง / ไฟฟ้า / ประปา / สุขาภิบาล)
- Section อุปกรณ์ + ภาพวิศวกรทำงานจริง
- ตัวอย่างรายงาน (ภาพ + ปุ่มดาวน์โหลด)
- Before/After สำหรับงานตกแต่ง
- FAQ
- Floating LINE/โทร

---

## Section 2 — Reference Scan

| # | Reference | URL | เอาอะไรมา | จะทำต่างยังไง |
|---|---|---|---|---|
| 1 | N.S.Plus Engineering | nsplusengineering.com/homeinspection | ตารางราคา tier ชัดมาก, รายงานตัวอย่างโหลดได้, ลงเลขทะเบียนนิติบุคคลควบคุม | หน้าหนาแน่นไปและ mobile ไม่ได้ออกแบบมาก่อน — เราทำ mobile-first และตัดให้อ่านง่ายกว่า |
| 2 | Sinspectors | sinspectors.com | คอนเทนต์ SEO แข็ง (บทความ "วิศวกรตรวจบ้านเป็นใคร", "5 เหตุผลที่ต้องจ้าง") | เราใช้โครงบทความคล้ายกันแต่ผูก CTA เข้าทุกบทความ |
| 3 | Pass Engineering | pass-engineering.com | ทำ roundup คู่แข่งเพื่อกิน keyword "บริษัทตรวจบ้านที่ไหนดี" | กลยุทธ์คอนเทนต์ที่ควรลอก — จดไว้ใน backlog หลัง launch |
| 4 | Allwecheck | — | ครอบคลุมตรวจ→interior เหมือนเรา | เขาพูดแบบผ่าน ๆ เราจะทำ funnel นี้ให้ชัดเป็นเรื่องเล่า |
| 5 | สภาวิศวกร (COE) | service.coe.or.th | ระบบตรวจสอบใบอนุญาตสาธารณะ | ลิงก์ตรงจากหน้าเว็บเรา = ท้าให้ลูกค้าเช็ก ไม่มีใครกล้าทำ |

**Synthesis:**
ตลาดนี้แข่งกันที่ **"พิสูจน์ได้"** ไม่ใช่ความสวย — ทุกเจ้าหน้าตาคล้ายกันหมด (เทมเพลตสำเร็จรูป, desktop-first, ภาพ stock) สิ่งที่แยกเราออกมามี 3 อย่าง: (1) โชว์เลข กว. พร้อมลิงก์ตรวจสอบ (2) mobile-first จริง ๆ เพราะทราฟฟิกมาจาก IG/TikTok (3) มี interior ครบวงจรที่ไม่มีคู่แข่งตรวจบ้านเจ้าไหนมี
เราจะไม่ทำเว็บให้ "สวยกว่า" อย่างเดียว แต่ทำให้ **ตรวจสอบได้มากกว่า**

---

## Section 3 — User Mental Model

**Primary user:** คนกำลังจะรับโอนบ้าน/คอนโด
- Frequency: **ครั้งเดียวในชีวิต (หรือไม่กี่ครั้ง)** — ไม่มีความรู้สะสม ไม่รู้ศัพท์ช่าง
- Tech savvy: กลาง — ใช้ LINE/IG คล่อง แต่ไม่ชอบกรอกฟอร์มยาว
- Device: **มือถือ ≥80%** เข้ามาจาก IG/TikTok/FB
- Mindset: **กลัวโดนหลอก + มี deadline วันโอนบีบ** → ตัดสินใจเร็ว เทียบ 2-3 เจ้าแล้วทักไลน์

**Mental model:** ผู้ใช้คิดว่านี่คือ *"จ้างคนที่รู้จริงมาช่วยดูแทนเรา ก่อนเซ็นรับของที่แพงที่สุดในชีวิต"*
เขาไม่ได้ซื้อ "การตรวจสอบ" — เขาซื้อ **อำนาจต่อรองกับโครงการ** และ **ความสบายใจ**

**Top tasks (เรียงตามความถี่จริง)**
1. "ราคาเท่าไหร่" — หาให้เจอใน 10 วินาที
2. "คนตรวจเชื่อถือได้จริงไหม" — หาหลักฐาน
3. "ตรวจอะไรให้บ้าง / ได้อะไรกลับมา" — ขอบเขต + ตัวอย่างรายงาน
4. "จองยังไง ว่างวันไหน" — ทักไลน์
5. (ทีหลัง) "เจอปัญหาแล้วซ่อมยังไง" — ประตูเข้าสู่ Interior

**Frustrations to avoid**
- ราคาซ่อนอยู่หลัง "ติดต่อสอบถาม" → เด้งออกทันที
- ศัพท์วิศวกรรมล้วน ๆ โดยไม่แปล
- ฟอร์มยาวทั้งที่แค่อยากทักไลน์
- ภาพ stock ฝรั่งในบ้านที่ไม่ใช่บริบทไทย → ความน่าเชื่อถือหายทันที
- หน้าเว็บ desktop ย่อส่วน — ตัวหนังสือเล็ก ปุ่มกดยาก

---

## Section 4 — Brand Assimilation

**Brand assets received:**
- [x] ชื่อแบรนด์ + คำโปรย: "บริการตรวจสอบ บ้าน คอนโด ก่อนโอน" (จาก FB page)
- [ ] Logo — ⚠ ดึงไม่ได้ (FB บังรูปหลัง login, Chrome extension ไม่ connect) — **รอ screenshot จากผู้ใช้**
- [ ] Color palette — ยังไม่ทราบ
- [ ] Font family — ยังไม่ทราบ
- [x] Voice/tone จาก brief: น่าเชื่อถือ ชัดเจน มืออาชีพ + ทันสมัย สะอาดตา

### ระบบสีที่เสนอ — dual-accent บนฐานกลางเดียว

ปัญหา: Inspection ต้องการ "น่าเชื่อถือ" / Interior ต้องการ "สวยงาม" — ถ้าแยกเป็น 2 ธีม เว็บจะเหมือน 2 บริษัท
ทางแก้: **neutral base ชุดเดียว + accent 2 ตัวแยกตามโดเมน**

| Token | Value | ใช้ที่ไหน |
|---|---|---|
| `--primary` | `#0F172A` slate-900 | ฐานทั้งเว็บ — nav, heading, footer |
| `--secondary` | `#334155` slate-700 | ข้อความรอง |
| `--accent-inspect` | `#0369A1` sky-700 | CTA + badge ฝั่งตรวจบ้าน (สื่อความแม่นยำ เทคนิค) |
| `--accent-interior` | `#D97706` amber-600 | CTA + badge ฝั่งตกแต่ง (สื่อความอบอุ่น งานไม้ งานผ้า) |
| `--background` | `#F8FAFC` | พื้นหลังฝั่ง Inspection — เย็น สะอาด |
| `--background-warm` | `#FAF5F2` | พื้นหลังฝั่ง Interior — อุ่นขึ้นเล็กน้อย |
| `--muted` | `#E8ECF1` | — |
| `--border` | `#E2E8F0` | — |
| `--destructive` | `#DC2626` | ใช้กับ defect/ปัญหาที่ตรวจเจอ |
| `--success` | `#15803D` | ใช้กับผลตรวจผ่าน |

> ที่มา: ui-ux-pro-max — palette "Trust & Authority" (navy+blue) สำหรับ Inspection, "Home Decoration & Interior Design" (warm grey + `#D97706`) สำหรับ Interior
> ⚠ ทั้งชุดนี้เป็น **placeholder จนกว่าจะได้โลโก้** ถ้าแบรนด์มีสีเดิมอยู่แล้ว จะ remap ที่ Stage 2

### Typography — ต้องรองรับไทย (ข้อบังคับ)

ฟอนต์ที่ ui-ux-pro-max แนะนำตอนแรก (Lexend + Source Sans 3) **ใช้ไม่ได้ — ไม่มี subset ไทย** เลือกใหม่จาก google-fonts ที่มี `thai` subset:

| ตัวเลือก | Heading | Body | คาแรกเตอร์ |
|---|---|---|---|
| **A — Technical Trust** | IBM Plex Sans Thai (7 น้ำหนัก) | Sarabun (16 สไตล์, rank 205) | เนี้ยบ วิศวกรรม ราชการ-ทางการนิดหน่อย |
| **B — Modern Clean** | Anuphan (7 น้ำหนัก, rank 628) | Noto Sans Thai (9 น้ำหนัก, variable, rank 144) | ไม่มีหัว ทันสมัย สะอาด ยังไม่เกลื่อน |

**ไม่เลือก Kanit / Prompt** ทั้งที่ยอดนิยมสูงสุด (rank 41 / 50) เพราะเกลื่อนเว็บ SME ไทยจนไม่มีคาแรกเตอร์ — จะดูเหมือนคู่แข่งทันที
Base 16px, line-height 1.6 (ไทยต้องการมากกว่าละติน เพราะสระบน-ล่าง)

---

## Section 5 — Tech Feasibility

**API readiness:** ไม่มี API — frontend only ตาม scope
**Integration points:**
- LINE OA deep link `https://lin.ee/YuAmDGQF` (เปิดแอปตรงจากมือถือ)
- `tel:` links → 086-388-6226, 085-509-5831
- Google Maps embed (ที่อยู่ Khlong Sam Wa)
- ลิงก์ออกไป COE license verification
- IG / TikTok / Facebook

**Performance considerations:**
- ภาพผลงาน Interior คือ payload ก้อนใหญ่ที่สุด → next/image + AVIF + lazy load ใต้ fold
- เป้า: LCP < 2.5s บน 4G, CLS < 0.1
- ผู้ใช้มาจากในแอป (IG/TikTok in-app browser) → ต้องเทสต์ใน webview จริง ไม่ใช่แค่ Chrome

**Support claim:** iOS Safari 15+, Chrome Android 100+, in-app browser ของ IG/TikTok/FB

---

## Section 6 — Tech Stack (🔒 LOCKED)

**Choice:** Modern default — greenfield, client neutral

| Layer | Locked |
|---|---|
| Framework | Next.js 15 App Router, SSG |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Primitives | shadcn/ui |
| Motion | Framer Motion (ใช้อย่างประหยัด) |
| Content | Markdown/MDX ใน repo — **ยืนยันแล้วว่า dev ไปต่อเอง ไม่ต้องมี CMS** |
| Forms | ไม่มี — CTA ทั้งหมดเป็น LINE / โทร |
| Deploy | Vercel |

**Rationale:** SEO คือเหตุผลหลักที่หน้าบทความมีอยู่ → ต้อง SSG/SSR. ไม่มี backend, ไม่มี auth, ไม่มี realtime → ไม่ต้องใช้ของหนักกว่านี้. Tailwind mobile-first by default ตรงกับข้อบังคับของ brief. shadcn/ui เป็น copy-paste ownership → ทีม dev ลูกค้ารับไปดูแลต่อได้โดยไม่ผูกกับ vendor

---

## Section 7 — Information Architecture

โจทย์ยากที่สุดของงานนี้: **12 บริการ ต้องไม่ทำให้เมนูมือถือรก**

```
หน้าแรก
├── บริการตรวจสอบ (Inspection)          ← ประตูหน้า, trust-led
│   ├── ตรวจบ้านก่อนโอน
│   ├── ตรวจคอนโดก่อนโอน
│   └── ตรวจต่อเติม / ระหว่างก่อสร้าง (ตรวจ ผรม.)
├── บริการตกแต่ง (Interior)              ← ตัวทำกำไร, visual-led
│   ├── ผ้าม่าน มู่ลี่ ฉากกั้น พรม มุ้งจีบ
│   ├── วอลเปเปอร์
│   ├── พื้น SPC (Glue Down / Click Lock — ปูตรง / ก้างปลา)
│   ├── ฟิล์มกรองแสง
│   ├── ตาข่ายกันนก
│   ├── ต่อเติมบ้าน
│   ├── กระจกกั้นห้อง / ห้องน้ำ
│   ├── ราวตากผ้า + ชั้นวางจาน
│   └── Interior Design & Built-in
├── บทความ
│   ├── ความรู้ตรวจบ้าน / ปัญหาในบ้าน
│   └── สไตล์การตกแต่งบ้าน
└── ติดต่อเรา
```

**หลักการที่ใช้ตัดสินใจ**
1. **เมนูมือถือ 2 ชั้นเท่านั้น** — ชั้นแรก 2 กลุ่ม (ตรวจสอบ / ตกแต่ง) ชั้นสอง = รายการบริการ ไม่ลงลึกกว่านี้
2. **หน้าแรกไม่ลิสต์ 12 บริการ** — โชว์ Inspection 3 อันเต็ม ๆ แล้วมัด Interior เป็นบล็อกเดียว "ตกแต่งครบวงจร 9 บริการ →"
3. **บริการตกแต่ง 9 อันอยู่ในหน้าเดียว** แยกเป็น anchor section ไม่ใช่ 9 หน้าแยก — เนื้อหาต่ออันไม่พอสำหรับหน้าเต็ม และแยกแล้ว SEO จะบางทุกหน้า
4. **จุดเชื่อม funnel** — ท้ายหน้า Inspection ทุกหน้ามีบล็อก *"ตรวจเจอปัญหาแล้วซ่อมที่ไหน?"* → พาไป Interior นี่คือจุดที่ทำเงินและเป็นสิ่งที่คู่แข่งไม่มี

---

## Section 8 — Milestone Plan

```
สัปดาห์ 1
  Day 1: ✓ Stage 0 — PM Card
  Day 1-2: ✓ Stage 1 — Research & Plan (เอกสารนี้)
  Day 3-5: Stage 2 — Vibe Design 2 variants
  → 🛑 Client checkpoint #1: เลือก variant (สิ้น Day 5)

สัปดาห์ 2
  Day 6-10: Stage 3 — Vibe Code
  Day 11: Stage 4 — Deploy staging
  Day 12-13: Stage 5 — UAT รอบ 1
  Day 14-15: Stage 5 — แก้ตาม UAT

สัปดาห์ 3
  Day 16: UAT รอบ 2
  Day 17: แก้รอบสุดท้าย
  Day 18: Stage 6 — Handoff
  → 🛑 Client checkpoint #2: sign-off
```
**Buffer:** 2 วัน

---

## Section 9 — Risks & Mitigations

| # | Risk | Mitigation |
|---|---|---|
| 1 | ไม่มีภาพผลงาน Interior คุณภาพดี | Stage 2 ออกแบบให้ทำงานได้กับภาพน้อย + ส่ง shot list ให้ลูกค้าถ่ายเพิ่ม |
| 2 | บทความว่างตอน launch | ขอ 3-5 บทความ seed เป็น requirement; ออกแบบ empty state ที่ไม่ดูร้าง |
| 3 | ไม่ได้โลโก้/สีแบรนด์ | เริ่ม Stage 2 ด้วย token ชุด placebo ข้างบน, remap ทีหลัง — ไม่ block |
| 4 | 12 บริการทำ IA รก | แก้แล้วที่ Section 7 — เมนู 2 ชั้น + Interior รวมหน้าเดียว, ทดสอบจริงที่ Stage 5 |
| 5 | FAB บังเนื้อหาท้ายหน้า | reserve safe-area padding; ทดสอบบน iOS Safari + in-app browser ของ IG/TikTok |
| 6 | ไม่มีเลข กว. ให้แสดง | ถ้าไม่มี = เสีย differentiator ที่แข็งที่สุด — ดัน Q7 เป็นเรื่องด่วน |
| 7 | 2 mood ตีกัน | แก้ด้วย dual-accent บน neutral เดียว (Section 4) — ทดสอบใน variant |
| 8 | ลูกค้าไม่ยอมโชว์ราคา | มีข้อมูลตลาดยืนยันแล้วว่า 10/10 เจ้าโชว์ — เอาไปคุยกับลูกค้า |

---

## Section 10 — Open Questions (update จาก Stage 0)

| # | คำถาม | สถานะ |
|---|---|---|
| 1 | Deadline | assumption: ~2 สัปดาห์ (ยังไม่ยืนยัน) |
| 2 | Logo / สี / font | ⚠ **open** — รอ screenshot เพจ FB |
| 3 | ภาพผลงาน | open |
| 4 | บทความใครดูแล | ✅ **ปิดแล้ว** — dev ทำต่อเอง → markdown ใน repo, ไม่ต้องมี CMS |
| 5 | ภาษาอังกฤษ | open (non-blocking) |
| 6 | แสดงราคาไหม | 🔵 **มีคำตอบเชิงข้อมูลแล้ว** — ตลาดโชว์หมด แนะนำโชว์ "เริ่มต้น ฿X,XXX" ขอราคาจริงจากลูกค้า |
| 7 | เลขใบอนุญาตวิศวกร | 🔴 **ยกระดับเป็นสำคัญ** — COE มีระบบให้ลูกค้าเช็กเอง = จุดต่างที่แข็งที่สุด |
| 8 | ต้องมี form ไหม | ✅ **ปิดแล้ว** — ไม่มี, ใช้ LINE/โทร |

---

## Gate to Stage 2

- [x] Domain understood, references scanned (5 refs + ข้อมูลราคาจริง)
- [x] User model documented
- [~] Brand assets — workaround agreed (placeholder tokens จนกว่าจะได้โลโก้)
- [x] Stack locked + rationale
- [x] Milestone plan + checkpoints
- [x] Risks identified + mitigation
- [~] Open questions — 2 ปิด, 1 ยกระดับ, ที่เหลือ non-blocking

**→ ผ่าน gate, ไปต่อ Stage 2 ได้**
