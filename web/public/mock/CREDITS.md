# Mock images — ภาพชั่วคราว ห้ามขึ้น production

ภาพทั้งหมดในโฟลเดอร์นี้เป็นภาพ stock จาก Unsplash ใช้แทนภาพผลงานจริงระหว่างรอไฟล์จากลูกค้า
**ไม่ใช่ผลงานของ D Deal Inspector & Interior** — ต้องเปลี่ยนเป็นภาพจริงทั้งหมดก่อน deploy production

License: [Unsplash License](https://unsplash.com/license) — ใช้เชิงพาณิชย์ได้ฟรี ไม่บังคับเครดิต
(บันทึกเครดิตไว้เพื่อให้ตรวจสอบย้อนกลับได้เท่านั้น)

| ไฟล์ | ช่างภาพ | ต้นทาง |
|---|---|---|
| `hero.jpg` | Andrej Lišakov | [Unsplash](https://unsplash.com/photos/a-woman-in-a-hard-hat-and-overalls-holding-a-piece-of-paper-PVipdL8shT4) |
| `report.jpg` | Arisa Chattasa | [Unsplash](https://unsplash.com/photos/restaurant-menus-on-clipboards-close-up-0LaBRkmH4fM) |
| `inspection-hero.jpg` | Curated Lifestyle | [Unsplash](https://unsplash.com/photos/architecture-construction-safety-first-career-concept-yHeqgswv2qw) |
| `interior-hero.jpg` | Prydumano Design | [Unsplash](https://unsplash.com/photos/a-modern-living-room-with-a-large-window-vIbxvHj9m9g) |
| `curtain.jpg` | EZcurtain Life | [Unsplash](https://unsplash.com/photos/modern-living-room-with-neutral-color-scheme-and-minimalist-decor-tIgnjxFh720) |
| `wallpaper.jpg` | Nik | [Unsplash](https://unsplash.com/photos/three-vases-sitting-on-a-couch-in-front-of-a-wall-SAuS0ms1E8M) |
| `spc-floor.jpg` | Getty Images | [Unsplash](https://unsplash.com/photos/man-installing-new-laminate-wood-flooring-abstract-ClGlmS-CrJ4) |
| `window-film.jpg` | Jay Lo | [Unsplash](https://unsplash.com/photos/the-sun-is-shining-through-the-windows-of-a-house-uMNO8s_bDVs) |
| `bird-net.jpg` | Sebastien Devocelle | [Unsplash](https://unsplash.com/photos/city-skyline-seen-through-a-metal-fence-Z4DJ1q28w1o) |
| `extension.jpg` | Brett Jordan | [Unsplash](https://unsplash.com/photos/brown-wooden-ladder-beside-brown-wooden-wall-nz-cBSChvUw) |
| `glass-partition.jpg` | Getty Images | [Unsplash](https://unsplash.com/photos/3d-render-of-luxury-bathroom-IcxGHnqoy-Y) |
| `drying-rack.jpg` | Trương Tuyết Ly | [Unsplash](https://unsplash.com/photos/clothes-drying-on-a-balcony-railing-f_h-C6JmGew) |
| `built-in.jpg` | Ali Moradi | [Unsplash](https://unsplash.com/photos/a-walk-in-closet-filled-with-lots-of-clothes-9KVtDmNnFP4) |
| `article-condo.jpg` | Point3D Commercial Imaging Ltd. | [Unsplash](https://unsplash.com/photos/white-wooden-framed-glass-door-nQlVMCHPysY) |
| `article-crack.jpg` | Lallaoke | [Unsplash](https://unsplash.com/photos/a-crack-in-the-side-of-a-white-wall-v01rpdnjTg0) |
| `article-defect.jpg` | Getty Images | [Unsplash](https://unsplash.com/photos/real-estate-agent-doing-contract-with-new-client-signing-house-insurance-rent-house-investment-HjZ9R3PWHIc) |
| `article-curtain.jpg` | Leohoho | [Unsplash](https://unsplash.com/photos/white-window-curtain-during-daytime-pPcKyqUEmcs) |
| `cross-sell.jpg` | Getty Images | [Unsplash](https://unsplash.com/photos/home-renovation-in-room-full-of-painting-tools-YcKl6DZ5WsU) |

## วิธีเปลี่ยนเป็นภาพจริง

วางภาพจริงทับไฟล์ชื่อเดิมในโฟลเดอร์นี้ได้เลย ไม่ต้องแก้โค้ด
ถ้าภาพจริงมาไม่ครบ ให้ลบเฉพาะไฟล์ที่ยังไม่มีออกและเอา `<MockImage>` จุดนั้นออกด้วย
อย่าปล่อยภาพ stock ทิ้งไว้ปนกับภาพจริง
