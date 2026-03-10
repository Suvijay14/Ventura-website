# 3D Company Breakdown Visualization Module

**Status:** Experimental - Not currently deployed
**Created:** March 2026
**Purpose:** Interactive 3D visualization showing company breakdown into Contracts, Consulting, Compliance

---

## Description

Sophisticated Three.js-based 3D visualization that shows:
- A unified corporate building (assembled state)
- Breaking apart into 3 distinct layers (separated state)
- Interactive controls (rotate, zoom, separate/assemble)

---

## Components

### 1. CompanyBreakdownVisualization.tsx
**Sophisticated version** - Full corporate building with:
- Ground floor (Contracts - dark navy)
- Middle floors (Consulting - blue glass)
- Top floor (Compliance - green with roof)
- Gold "V" logo on top
- Premium lighting and materials

### 2. ComplianceVisualization.tsx
**Original version** - Basic geometric layers:
- Code layer (bottom - gray blocks)
- Compliance layer (middle - blue shields)
- Consulting layer (top - green gems)
- Code → Compliance → Consulting workflow focus

---

## Dependencies

```bash
npm install three @types/three
```

Uses shared utility: `@/lib/three-scene` (animatePosition, easeInOutQuad)

---

## How to Use (When Ready)

### Option 1: Import on Homepage
```typescript
// app/page.tsx
import CompanyBreakdownVisualization from '@/modules/experimental/3d-visualization/CompanyBreakdownVisualization';

export default function HomePage() {
  return (
    <main>
      <CompanyBreakdownVisualization />
      {/* Rest of content */}
    </main>
  );
}
```

### Option 2: Create Dedicated Route
```typescript
// app/demo-3d/page.tsx
import CompanyBreakdownVisualization from '@/modules/experimental/3d-visualization/CompanyBreakdownVisualization';

export default function Demo3DPage() {
  return <CompanyBreakdownVisualization />;
}
```

---

## Why Experimental

- Needs performance testing on various devices
- Mobile experience needs optimization
- Considering alternative approaches (video, gif, static renders)
- Evaluating user engagement data first
- May use for special landing pages or presentations

---

## Future Enhancements

- [ ] Add gesture controls (hand tracking)
- [ ] Import external 3D models (GLTF/GLB)
- [ ] Add particle effects on separation
- [ ] Add sound effects
- [ ] Create mobile-optimized version
- [ ] Add loading progress indicator
- [ ] Optimize performance for low-end devices
- [ ] Add screenshot/share functionality

---

## Notes

Created during AI Day 2026 preparation. Decided to keep homepage minimal and text-focused. This module is preserved for:
- Future product demos
- Presentation materials
- Special campaign landing pages
- Trade show displays
