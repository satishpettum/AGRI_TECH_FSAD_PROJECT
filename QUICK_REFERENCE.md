# Role-Based UI - Quick Reference Guide

## 🎨 Color Scheme & Navigation Quick Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FARMER (Emerald/Green)                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ Primary Color: #059669 (Emerald-600)                                         │
│ Gradient: from-emerald-600 via-green-500 to-teal-500                        │
│ Navigation: Home | Resources | Find Experts | Community | About              │
│                                                                              │
│ Key Features:                                                               │
│ • Dashboard: Farm management, crop tracking, saved resources                 │
│ • Resources: Can save guides and tutorials                                   │
│ • Experts: "Contact Expert" button to reach out                              │
│ • Community: Share farming experiences and ask questions                     │
│ • Button Colors: bg-emerald-600 hover:bg-emerald-700                        │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                      EXPERT (Indigo/Blue)                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ Primary Color: #4f46e5 (Indigo-600)                                         │
│ Gradient: from-slate-900 via-indigo-950 to-blue-900                         │
│ Navigation: Home | Articles | Farmer Questions | About                       │
│                                                                              │
│ Key Features:                                                               │
│ • Dashboard: Answer queries, track published articles, engagement metrics    │
│ • Resources: "Write Article" button to publish content                       │
│ • Experts: "View Profile" to collaborate with other experts                  │
│ • Community: See farmer questions as queries to answer                       │
│ • Button Colors: bg-indigo-600 hover:bg-indigo-700                         │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                    PUBLIC/ENTHUSIAST (Amber/Orange)                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ Primary Color: #b45309 (Amber-600)                                          │
│ Gradient: from-amber-600 via-orange-500 to-rose-500                         │
│ Navigation: Home | Learn | Community | About                                 │
│                                                                              │
│ Key Features:                                                               │
│ • Dashboard: Learning paths, upcoming events, recommendations               │
│ • Resources: Beginner-friendly courses and articles                         │
│ • Experts: "Learn More" about experts and their areas                       │
│ • Community: Join discussions about agriculture & sustainability             │
│ • Button Colors: bg-amber-600 hover:bg-amber-700                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 📋 Page-by-Page Changes

| Page | Farmer Changes | Expert Changes | Public Changes |
|------|---|---|---|
| **Header** | Green accent, "Find Experts" nav | Blue accent, "Articles" nav | Orange accent, "Learn" nav |
| **Resources** | "Saved Resources" counter, green hero | "Write Article" button, blue hero | "Learning Paths", orange hero |
| **Experts** | "Contact Expert" button (email) | "View Profile" button, badge | "Learn More" button |
| **Community** | "New Farm Discussion", green accent | "Post Expert Insight", blue accent | "Join Discussion", orange accent |
| **Dashboard** | Crop tracking, farming metrics | Query dashboard, articles stats | Learning recommendations |
| **Home** | Farming-focused quick actions | Knowledge-sharing focus | Learning journey focus |

## 🔌 Implementation Locations

### Configuration
- **Where**: `src/lib/roleConfig.js`
- **What**: Central role definitions with colors, navigation, descriptions
- **How**: Import and use `ROLE_CONFIG` object + `useAuth()` hook

### Usage Pattern in Components
```javascript
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_CONFIG } from '@/lib/roleConfig';

export default function MyComponent() {
  const { role } = useAuth();
  const roleConfig = ROLE_CONFIG[role] || ROLE_CONFIG.public;
  
  return (
    <div className={roleConfig.bgGradient}>
      <h1 className={roleConfig.accentColor}>Title</h1>
      <button className={roleConfig.buttonPrimary}>Action</button>
    </div>
  );
}
```

## 🎯 Key CSS Classes Used

### For Hero Sections (Gradients)
- Farmer: `bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500`
- Expert: `bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900`
- Public: `bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500`

### For Accent Colors
- Farmer: `text-emerald-600` / `border-emerald-200` / `bg-emerald-50`
- Expert: `text-indigo-600` / `border-indigo-200` / `bg-indigo-50`
- Public: `text-amber-600` / `border-amber-200` / `bg-amber-50`

### For Buttons (CTAs)
- Farmer: `bg-emerald-600 hover:bg-emerald-700 text-white`
- Expert: `bg-indigo-600 hover:bg-indigo-700 text-white`
- Public: `bg-amber-600 hover:bg-amber-700 text-white`

## 🧪 Testing Checklist

### Visual Testing
- [ ] All pages show correct color theme for each role
- [ ] Header navigation matches role configuration
- [ ] Buttons and CTAs display correct colors and labels
- [ ] Mobile view is responsive and maintains colors

### Functional Testing
- [ ] Farmer can save resources (green button)
- [ ] Expert can write articles (blue button)
- [ ] Public can join discussions (orange theme)
- [ ] Role persists after page reload
- [ ] Logout clears role
- [ ] Can switch roles via signup

### Accessibility Testing
- [ ] All color gradients have sufficient contrast
- [ ] Text labels clarify role differences (not color-only)
- [ ] Keyboard navigation works across all themes
- [ ] Screen readers work properly

## 📚 File Reference

| File | Purpose | Status |
|------|---------|--------|
| `src/lib/roleConfig.js` | Central role config | ✅ Created |
| `src/components/Header.jsx` | Role-aware header | ✅ Updated |
| `src/pages/Resources.jsx` | Role-specific content | ✅ Updated |
| `src/pages/Experts.jsx` | Role-specific expert view | ✅ Updated |
| `src/pages/Community.jsx` | Role-specific community | ✅ Updated |
| `src/pages/Index.jsx` | Personalized home | ✅ Updated |
| `ROLE_BASED_UI_DOCUMENTATION.md` | Full documentation | ✅ Created |
| `IMPLEMENTATION_COMPLETE.md` | Summary guide | ✅ Created |
| `QUICK_REFERENCE.md` | This file | ✅ Created |

---

**Ready to go! Each role now has a unique, consistent, and intuitive UI experience! 🚀**
