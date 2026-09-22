# Project Card

> Output ของ Stage 0 — structured version ของ raw PM brief

---

## Section 1 — Project Identity

**Project name:** `D Deal Inspector & Interior — Corporate Website (Frontend)`
**Client:** `D Deal Inspector & Interior`
**PM:** `TBD`
**Designer (lead):** `Krittiya W.`
**Date received:** `2026-09-21`
**Brief source:** `Jira card WMMT-1599 (content pasted by requester)`

---

## Section 2 — Tier & Classification

**Project tier:**
- [ ] S — landing page / single screen / < 1 week
- [x] M — multi-screen / 1-3 weeks
- [ ] L — multi-module / 1-3 months
- [ ] Enterprise — large scope / 3+ months / multiple teams

**Tier rationale:**
7 screen templates (Home, Services index, Service detail ×2 families, Blog list, Blog detail, Contact) แต่เป็น marketing site แบบ static, ไม่มี API integration, ไม่มี auth, decision maker 1-2 คน, brief ~500 words → signal ส่วนใหญ่ตกที่ M. Deliverable count แตะขอบล่างของ L แต่ไม่มี Enterprise signal เลย จึงไม่เข้าเกณฑ์ L (ต้องมี 5+ L signals AND ≥1 Enterprise)

**Client relationship:**
- [x] First-time client
- [ ] Returning client (ครั้งที่ N)
- [ ] Long-term retainer

**Urgency:**
- [ ] Hard deadline: `YYYY-MM-DD`
- [ ] Soft deadline / flexible
- [x] No deadline (timeline TBD) — ⚠ ไม่ระบุใน brief, ต้องถาม PM (Q1)

---

## Section 3 — Objective & Deliverable

**Client's objective (in their words):**
> "บริการตรวจสอบบ้านและคอนโด พร้อมกับบริการตกแต่งครบวงจร"
> "อยากให้นำเสนอบริการ Inspection เป็นหลัก และเราก็มีบริการตกแต่งครบวงจรด้วย"
> "การตรวจสอบนั้นเราใช้วิศวกรโยธาในการตรวจสอบ มีใบประกอบวิชาชีพรับรองโดยสภาวิศวกร — ปลอดภัยแน่นอน"

**Translated objective (1 line):**
เว็บไซต์ mobile-first ที่เปลี่ยนผู้เข้าชมจากโซเชียลให้กลายเป็น lead ผ่าน Line/โทร โดยใช้ "วิศวกรโยธามีใบอนุญาต" เป็นแกนความน่าเชื่อถือนำ แล้วต่อยอดขายบริการตกแต่ง

**Business model insight (designer's read — ต้องยืนยันกับ PM):**
สองบริการนี้เป็น funnel เดียวกัน ไม่ใช่สองธุรกิจแยก — ลูกค้าตรวจบ้านก่อนโอน → เจอ defect → ต้องแก้/ตกแต่ง → ซื้อบริการ Interior ต่อ
Inspection = ประตูหน้า (trust-led), Interior = ตัวทำกำไร (visual-led)
**ข้อนี้ควรสะท้อนใน IA ของหน้าแรก** — ไม่ใช่วาง 2 บริการขนานกันเฉย ๆ

**End users:**
| Segment | Context | ต้องการอะไร |
|---|---|---|
| **Primary — คนกำลังจะโอนบ้าน/คอนโด** | เจอเพจจาก IG/TikTok/FB บนมือถือ, กังวลว่าจะโดนโกง, มี deadline วันโอนบีบ | ความมั่นใจว่าคนตรวจเป็นมืออาชีพจริง + ราคา + จองเร็ว |
| **Secondary — เจ้าของบ้านที่อยากตกแต่ง** | หาไอเดีย, เทียบราคา, ดูผลงาน | ภาพผลงานจริง เยอะ ๆ + ประเมินราคา |
| **Tertiary — ลูกค้าเก่าจาก Inspection** | ตรวจเจอปัญหา อยากให้แก้ต่อ | ความต่อเนื่อง เจ้าเดียวจบ |

**Deliverable list (in scope — frontend only):**
- [ ] Visual identity direction (color / type / spacing scale) — brand alignment
- [ ] **หน้าแรก** — Inspection-led hero, credential proof, บริการทั้งหมด, ผลงาน, CTA
- [ ] **หน้าบริการ (index)** — แยก 2 กลุ่ม: Inspection / Interior
- [ ] **หน้าบริการย่อย — Inspection** (บ้าน / คอนโด / ต่อเติม-ผรม.)
- [ ] **หน้าบริการย่อย — Interior** (9 บริการ)
- [ ] **หน้าบทความ (list)** — 2 หมวด: ความรู้ตรวจบ้าน / สไตล์ตกแต่ง
- [ ] **หน้าบทความ (detail)**
- [ ] **หน้าติดต่อเรา** — ช่องทางครบ + แผนที่ + เวลาทำการ
- [ ] **Floating Action Button** — โทร / Line, ค้างทุกหน้า ทุก breakpoint
- [ ] Responsive: mobile-first → tablet → desktop
- [ ] Code repo + README
- [ ] Staging deploy (Vercel)
- [ ] Handoff doc

**Out of scope (explicit):**
- Backend / API / database ทุกชนิด
- CMS จริง — บทความใช้ static content หรือ markdown (ดู Q4)
- ระบบจองออนไลน์ / ชำระเงิน / ปฏิทินนัดหมาย
- ระบบสมาชิก / login
- SEO content writing (เขียนบทความจริง) — เราทำแค่ template
- ถ่ายภาพผลงาน / retouch — ใช้ของลูกค้า (ดู Q3)
- แปลภาษาอังกฤษ (ดู Q5)

---

## Section 4 — Tech Stack (locked at Stage 1)

**Stack choice:**
- [ ] Client's existing stack
- [x] **Modern default (greenfield, client neutral):** Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- [ ] Custom modern stack

**Proposed detail:**
| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js App Router (SSG) | SEO สำคัญมาก — หน้าบทความคือเครื่องมือหา organic traffic |
| Language | TypeScript | — |
| Styling | Tailwind CSS | mobile-first เป็น default ของ Tailwind อยู่แล้ว |
| Primitives | shadcn/ui | accessible, copy-paste ownership, ลูกค้า maintain ต่อได้ |
| Motion | Framer Motion | marketing site ต้องการ polish แต่ใช้แบบประหยัด (มือถือ + เน็ตช้า) |
| Fonts | Thai-first pairing (เลือกที่ Stage 2) | เนื้อหาไทยล้วน — ห้ามใช้ font ที่ render ไทยแตก |
| Images | next/image + AVIF/WebP | ผลงาน Interior = ภาพเยอะ, มือถือเน็ตมือถือ |

> ⚠ ห้ามใช้ Sellsuki DS 1.0 / DS 2.0 ใน project track

**Rationale:**
Greenfield ไม่มี codebase เดิม, client neutral, เป็น marketing site ที่ SEO + mobile performance คือ KPI → Next.js SSG + Tailwind ตรงตาม `tech-stack-guide.md` quick reference ("Client neutral, marketing site")

**Deploy target:**
- [x] Vercel (default)

---

## Section 5 — Milestone (filled at Stage 1)

**Total estimated timeline:** `~2 สัปดาห์ (ประมาณการ — รอ deadline จริงจาก PM)`

| Stage | Day(s) | Deliverable | Client checkpoint? |
|---|---|---|---|
| 0 Brief Intake | Day 1 | PM Card | — |
| 1 Research & Plan | Day 1-2 | research-plan + IA + milestone | optional |
| 2 Vibe Design | Day 3-5 | **2 variants** | ✓ variant pick |
| 3 Vibe Code | Day 6-10 | working frontend | — |
| 4 Deploy | Day 11 | staging URL | — |
| 5 Test & Improve | Day 12-16 | iterated build | ✓ UAT ×2 |
| 6 Handoff | Day 17 | handoff package | ✓ sign-off |

**Buffer:** `2 วัน`

---

## Section 6 — UAT Round Budget

**Budgeted rounds:** `2 (M tier)`

| Round | Status | Date | Findings (B/I/CR/OOS) |
|---|---|---|---|
| 1 | not started | | |
| 2 | not started | | |

**Overage policy:** Round 3 ขึ้นไป trigger scope conversation กับ PM

---

## Section 7 — Open Questions

| # | Question | Owner | Asked | Status | Blocking? |
|---|---|---|---|---|---|
| 1 | Deadline จริงคือเมื่อไหร่? มี event/แคมเปญผูกอยู่ไหม | PM | 2026-09-21 | open | ⚠ blocks milestone |
| 2 | มี logo / brand color / font เดิมไหม (ดูจาก IG/TikTok น่าจะมี logo แล้ว) | Client | 2026-09-21 | open | ⚠ blocks Stage 2 |
| 3 | มีภาพผลงานจริงกี่ชุด? คุณภาพพอใช้บนเว็บไหม | Client | 2026-09-21 | open | non-blocking (ใช้ placeholder ได้) |
| 4 | บทความ — ใครเขียน/อัปเดต? ต้องแก้เองได้ผ่าน CMS หรือ dev แก้ให้ | PM | 2026-09-21 | open | ⚠ กระทบ stack decision |
| 5 | ต้องมีภาษาอังกฤษไหม | Client | 2026-09-21 | open | non-blocking |
| 6 | แสดงราคาบนเว็บไหม (เริ่มต้น X บาท) หรือให้ติดต่อขอใบเสนอราคาอย่างเดียว | Client | 2026-09-21 | open | non-blocking แต่กระทบ conversion มาก |
| 7 | มีใบอนุญาตวิศวกร/เลขที่ สภาวิศวกร ที่โชว์บนเว็บได้ไหม | Client | 2026-09-21 | open | non-blocking แต่เป็นแกนของ trust |
| 8 | ต้องการ form ส่งข้อมูลไหม หรือ Line/โทร พอแล้ว (frontend-only = form ต้องมี endpoint) | PM | 2026-09-21 | open | ⚠ กระทบ scope |

---

## Section 8 — Risks

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | ไม่มีภาพผลงานคุณภาพดี — Interior ขายด้วยภาพล้วน ๆ | high | high | Stage 2 ออกแบบ layout ที่ทำงานได้กับภาพจำนวนน้อย + ระบุ shot list ให้ลูกค้าถ่ายเพิ่ม |
| 2 | บทความว่างเปล่าตอน launch → หน้าบทความดูร้าง + ไม่ได้ SEO | high | med | เตรียม 3-5 บทความ seed เป็น requirement ฝั่งลูกค้า, design empty state ที่ไม่น่าเกลียด |
| 3 | ไม่มี CMS แต่ลูกค้าคาดหวังว่าจะแก้เองได้ | med | high | เคลียร์ที่ Q4 **ก่อน** lock stack ที่ Stage 1 |
| 4 | 12 บริการ ยัดลงเมนูมือถือ → IA รก หาไม่เจอ | high | med | จัดกลุ่ม 2 ชั้น (Inspection / Interior) + mega-menu แบบ mobile-friendly, ทดสอบที่ Stage 5 |
| 5 | FAB บังปุ่มอื่น / บังเนื้อหาท้ายหน้า บนจอเล็ก | med | med | reserve safe-area padding ท้ายหน้า, ทดสอบจริงบน iOS Safari (แถบ URL เลื่อน) |
| 6 | Trust claim "รับรองโดยสภาวิศวกร" ไม่มีหลักฐานแสดง → เสียน้ำหนัก | med | high | Q7 — ขอเลขใบอนุญาต/ภาพใบรับรองมาแสดง |
| 7 | 2 บริการคนละ mood (Inspection=น่าเชื่อถือ / Interior=สวยงาม) ตีกันในระบบดีไซน์เดียว | high | med | Stage 2 แก้ด้วย dual-accent system ไม่ใช่ 2 ธีมแยก — ทดสอบใน variant |

---

## Section 9 — Links

- Brief source (original): `https://sellsuki.atlassian.net/browse/WMMT-1599`
- Research plan: `research-plan.md` (Stage 1)
- Design spec: `vibe-design-spec.md` (Stage 2)
- Code repo: `TBD`
- Staging URL: `TBD`
- Handoff doc: `TBD`

**Client channels (from brief):**
- Email: ddealservice@gmail.com
- Tel: 086-388-6226, 085-509-5831
- Hours: 9.00-17.00 ทุกวัน
- Address: K.Riz Town Chatuchot-Ramintra No.237/69, Thai Raman Road, Sam Wa Tawan Tok, Khlong Sam Wa, Bangkok 10510
- Line OA: https://lin.ee/YuAmDGQF
- IG: https://www.instagram.com/d_deal_inspector/
- TikTok: https://www.tiktok.com/@ddealinspector

---

## Status

- [x] Stage 0 — Brief Intake
- [ ] Stage 1 — Research & Plan
- [ ] Stage 2 — Vibe Design
- [ ] Stage 3 — Vibe Code
- [ ] Stage 4 — Deploy
- [ ] Stage 5 — Test & Improve
- [ ] Stage 6 — Handoff
- [ ] Closed

**Last updated:** `2026-09-21`
