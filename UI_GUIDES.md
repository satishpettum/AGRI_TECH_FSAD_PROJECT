# Agri-Connect Role-Based UI System Guide

## Overview
Your Agri-Connect application now features beautifully designed, role-specific user interfaces for three distinct user types. When users register and select their role, they automatically see a customized dashboard tailored to their needs.

---

## 🌾 1. User Registration Flow

### Enhanced Signup Page (`src/pages/Signup.jsx`)

Users now see a **visual role selector** with three beautifully designed cards instead of a dropdown menu:

```
┌─────────────────────────────────────────────────────┐
│          Join Our Community                          │
│        Choose your role to get started               │
├─────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ 🌱 Farmer│ │ 🎓 Expert│ │ 👁 Public│          │
│  │ Access   │ │ Share    │ │ Explore  │          │
│  │ resources│ │ knowledge│ │ & learn  │          │
│  └──────────┘  └──────────┘  └──────────┘          │
├─────────────────────────────────────────────────────┤
│  Full Name: [___________________]                    │
│  Email:     [___________________]                    │
│  Password:  [___________________]                    │
│  [Create Account & Start]                           │
└─────────────────────────────────────────────────────┘
```

**Features:**
- ✅ Visual card selection with icons (Sprout, GraduationCap, Eye)
- ✅ Color-coded roles (Green, Indigo, Amber)
- ✅ Check mark indicator shows selected role
- ✅ Hover animations for interactivity
- ✅ Smooth scale-up animation when selected

**Role Colors:**
- **Farmer**: Emerald/Green (#059669)
- **Expert**: Indigo/Blue (#4f46e5)
- **Public**: Amber/Orange (#d97706)

---

## 🚜 2. Farmer Dashboard

**Path**: `/dashboard` (when role = `farmer`)
**File**: `src/components/dashboards/FarmerDashboard.jsx`

### Layout & Features

```
┌──────────────────────────────────────────────────┐
│  🌾 FARMER DASHBOARD - Welcome back, John!       │
│      Your crops are thriving.                    │
├──────────────────────────────────────────────────┤
│
│  📊 STATISTICS ROW
│  ┌──────────┐  ┌──────────┐  ┌──────────┐
│  │📚 Saved  │  │🎓 Expert │  │💬 Posts  │
│  │Resources │  │Calls: 4  │  │Posted: 8 │
│  │Count: 24 │  │          │  │          │
│  └──────────┘  └──────────┘  └──────────┘
│
│  🔥 QUICK ACTIONS (4 cards)
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│  │ 📚 My   │ │ 🎓 Find │ │ 💬 Ask  │ │ 📈 View │
│  │Resources│ │ Expert  │ │Community│ │Trends   │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘
│
│  🌱 CROP TRACKING (2 column layout)
│  ┌──────────────────────┐  ┌──────────────────────┐
│  │ Crop Progress        │  │ Weather & Soil Info  │
│  │ • Wheat: 75% ready   │  │ 🌡️ 24°C, Partly    │
│  │ • Rice: 50% growing  │  │    Cloudy            │
│  │ • Corn: 90% mature   │  │ 📊 Soil Metrics:    │
│  │ + Add New Crop       │  │ • pH: 6.8 (Optimal) │
│  │                      │  │ • Moisture: 65%     │
│  │                      │  │ • Temp: 24°C        │
│  └──────────────────────┘  └──────────────────────┘
│
│  📋 TODAY'S TASKS & ALERTS (2 columns)
│  ┌──────────────────────┐  ┌──────────────────────┐
│  │ ✓ Daily Tasks        │  │ ⚠️  Alert System     │
│  │ □ Check irrigation   │  │ 🔴 Soil pH dropping │
│  │ □ Review guides      │  │ 🔵 Market price up  │
│  │ ✓ Log wheat progress │  │ 🟢 Watering tips    │
│  │ + Add Task           │  │                      │
│  └──────────────────────┘  └──────────────────────┘
│
└──────────────────────────────────────────────────┘
```

### Key Features

1. **Crop Tracking Section**
   - Track multiple crops (wheat, rice, corn, etc.)
   - Progress bars showing growth percentage
   - Current growth stage (Flowering, Growth, Mature)
   - Next watering schedule
   - Crop health percentage

2. **Soil Metrics Widget**
   - Soil pH indicator (Optimal/Good/Warning levels)
   - Moisture level (percentage)
   - Temperature tracking
   - Icons for quick visual scanning

3. **Task Management**
   - Check/uncheck daily tasks
   - Task completion tracking
   - Quick add task button

4. **Alert System**
   - 🔴 **Warning alerts** (Red) - critical issues
   - 🔵 **Info alerts** (Blue) - market updates
   - 🟢 **Tip alerts** (Green) - helpful suggestions

5. **Quick Actions**
   - My Resources - Saved guides
   - Find Expert - Connect with specialists
   - Community - Ask questions
   - Market Trends - View prices

### Color Scheme
- **Primary**: Emerald green (#10b981) with gradients
- **Secondary colors**: Lime, Teal
- **Accents**: Green, Emerald, Lime

---

## 🎓 3. Agricultural Expert Dashboard

**Path**: `/dashboard` (when role = `expert`)
**File**: `src/components/dashboards/ExpertDashboard.jsx`

### Layout & Features

```
┌──────────────────────────────────────────────────┐
│  🎓 EXPERT DASHBOARD - Welcome Dr. Smith         │
│      ✓ Verified Expert                            │
│      You have 5 new farmer queries waiting       │
│  [Answer Queries]  [Write Article]              │
├──────────────────────────────────────────────────┤
│
│  📊 STATISTICS ROW
│  ┌──────────┐  ┌──────────┐  ┌──────────┐
│  │👥 Farmers│  │📄 Articles│  │💬 Active │
│  │ Helped:  │  │Published: │  │ Queries: │
│  │142 +12▲  │  │12 +2▲    │  │5 (2 to  │
│  └──────────┘  └──────────┘  │answer)  │
│                               └──────────┘
│
│  👥 FARMER QUERIES SECTION (Takes 2/3 width)
│  ┌────────────────────────────────────┐
│  │ Recent Farmer Queries              │[View All]
│  │ Tap to respond                     │
│  │                                    │
│  │ 🔴 [D] David K. - 2 hours ago      │[HIGH]
│  │    "Best organic pesticide for     │
│  │     tomato blight?"                │
│  │                                    │
│  │ 🟡 [S] Sarah M. - 5 hours ago      │[MED]
│  │    "Irrigation frequency during    │
│  │     heat waves?"                   │
│  │                                    │
│  │ 🟢 [J] John D. - 1 day ago         │[LOW]
│  │    "Soil pH adjustment for         │
│  │     blueberries?"                  │
│  │                                    │
│  │ [+ Add Response Template]          │
│  └────────────────────────────────────┘
│
│  📈 THIS MONTH STATS (1/3 width sidebar)
│  ┌────────────────────┐
│  │ Engagement: 87%    │
│  │ ████████░ 87%      │
│  │                    │
│  │ Response: 2.3h avg │
│  │ "Average time to"  │
│  │  respond to query" │
│  │                    │
│  │ 🏆 Recent Badges   │
│  │ ⭐ Top Expert      │
│  │ ⚡ Fast Responder  │
│  └────────────────────┘
│
│  📚 YOUR PUBLISHED ARTICLES
│  ┌────────────────────────────────────┐
│  │ "Advanced Drip Irrigation Guide"   │
│  │ 👁️ 1.2k views | ⭐ 4.9 | 💬 24     │
│  │ Published 3 days ago   [Edit]      │
│  │                                    │
│  │ "Organic Pest Management"          │
│  │ 👁️ 890 views | ⭐ 4.7 | 💬 15      │
│  │ Published 1 week ago   [Edit]      │
│  │                                    │
│  │ "Crop Rotation for Soil Health"    │
│  │ 👁️ 650 views | ⭐ 4.8 | 💬 12      │
│  │ Published 2 weeks ago  [Edit]      │
│  │                                    │
│  │ [+ Publish New]                    │
│  └────────────────────────────────────┘
│
│  💡 CTA CARDS (2 columns)
│  ┌────────────────────┐ ┌────────────────────┐
│  │ 🧠 Share Expertise │ │ 👥 Build Network   │
│  │ Create guides and  │ │ Connect with       │
│  │ tutorials          │ │ farmers & experts  │
│  │ [Start Writing]    │ │ [View Networks]    │
│  └────────────────────┘ └────────────────────┘
│
└──────────────────────────────────────────────────┘
```

### Key Features

1. **Query Management**
   - Display all pending farmer questions
   - Priority indicators (High/Medium/Low)
   - Farmer avatar with initials
   - Category tags (Pest Control, Water, Soil, etc.)
   - Time stamps

2. **Article Management**
   - View all published articles
   - Track views, ratings, comments
   - Edit functionality
   - Publish new article button

3. **Engagement Metrics**
   - Engagement rate percentage with progress bar
   - Average response time
   - Recent achievement badges
   - Monthly performance tracking

4. **Professional Features**
   - Verified Expert badge
   - Direct action buttons ("Answer Queries", "Write Article")
   - Network building CTA
   - Knowledge sharing focus

### Color Scheme
- **Primary**: Dark Blue/Indigo (#1e1b4b, #3730a3)
- **Secondary colors**: Blue, Violet, Indigo
- **Accents**: Professional grays and whites

---

## 🌍 4. Public/Enthusiast Dashboard

**Path**: `/dashboard` (when role = `public`)
**File**: `src/components/dashboards/PublicDashboard.jsx`

### Layout & Features

```
┌──────────────────────────────────────────────────┐
│  🌍 ENTHUSIAST COMMUNITY - Discover Agriculture  │
│      Learn how you can support sustainable       │
│      farming and become part of the              │
│      agricultural revolution                     │
│  [Start Learning]  [Join Community]              │
├──────────────────────────────────────────────────┤
│
│  🎯 HIGHLIGHT CARDS (4 items)
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│  │ 🌱      │ │ 🛒      │ │ 🌍      │ │ 📅     │
│  │Farming  │ │ Local   │ │ Global  │ │ Events │
│  │101      │ │ Market  │ │ Impact  │ │        │
│  │Beginner │ │Community│ │Intermed.│ │ Events │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘
│
│  📚 LEARNING PATHS SECTION (2/3 width)
│  ┌─────────────────────────────────┐
│  │ Recommended Learning Paths   [All]
│  │ Structured courses for        
│  │ different interests            
│  │                                
│  │ 📖 Sustainable Farming (4 wks) │
│  │    12 lessons | 3/12 complete  │
│  │    ███░░░░░░░░ 25%             │
│  │    Beginner  [Continue]        │
│  │                                
│  │ 📖 Organic Gardening (3 wks)   │
│  │    8 lessons | 0/8 complete    │
│  │    ░░░░░░░░░░ 0%               │
│  │    Beginner  [Start]           │
│  │                                
│  │ 📖 Soil Health (5 wks)         │
│  │    15 lessons | 5/15 complete  │
│  │    █████░░░░░░░░░ 33%          │
│  │    Intermediate [Continue]     │
│  └─────────────────────────────────┘
│
│  💪 SUPPORT & LEARNING (1/3 sidebar)
│  ┌──────────────────────┐
│  │ ❤️ Support Farmers   │
│  │ Make an impact by    │
│  │ supporting local     │
│  │ initiatives          │
│  │ [Get Involved]       │
│  │                      │
│  │ 🏆 Earn Badges       │
│  │ Unlock achievements  │
│  │ as you learn         │
│  │ [View Badges]        │
│  └──────────────────────┘
│
│  📰 TRENDING STORIES
│  ┌─────────────────────────────────┐
│  │ "The rise of urban vertical..." │[5 min]
│  │ 👁️ 1.2k ❤️ 89                   │
│  │                                 │
│  │ "How supporting local farmers..."│[8 min]
│  │ 👁️ 856 ❤️ 142                   │
│  │                                 │
│  │ "Demystifying organic labels..." │[4 min]
│  │ 👁️ 2.1k ❤️ 208                  │
│  └─────────────────────────────────┘
│
│  🗓️ UPCOMING EVENTS
│  ┌───────────┐ ┌───────────┐ ┌───────────┐
│  │📍Community│ │📚 Workshop│ │ 🎤 Farmers│
│  │ Farm Tour │ │ Urban     │ │ Market    │
│  │Mar 15     │ │ Gardening │ │ Talk      │
│  │Local Co-op│ │Mar 22     │ │Mar 29     │
│  │24 attend. │ │15 attend. │ │8 attend. │
│  │[Register] │ │[Register] │ │[Register]│
│  └───────────┘ └───────────┘ └───────────┘
│
│  📚 RESOURCE CARDS (3 columns)
│  ┌──────────┐ ┌──────────┐ ┌──────────┐
│  │ 📹 Video │ │ 📥 Guides│ │ 🗣️ Forum │
│  │Tutorials │ │Downloads │ │Discussion│
│  │[Browse]  │ │[Get]     │ │[Go]      │
│  └──────────┘ └──────────┘ └──────────┘
│
└──────────────────────────────────────────────────┘
```

### Key Features

1. **Learning Paths**
   - Structured courses with progress tracking
   - Difficulty levels (Beginner/Intermediate)
   - Lesson counts and completion percentage
   - Progress bars
   - Start/Continue buttons

2. **Events System**
   - Upcoming workshops, farm visits, talks
   - Event details (date, location, attendees)
   - Event type badges
   - Registration buttons
   - Community engagement

3. **Trending Stories**
   - Featured articles from community
   - View and like counters
   - Read time estimates
   - Category tags
   - Hover reveals explore action

4. **Resource Hub**
   - Video tutorials
   - Downloadable guides
   - Community forum
   - Support for farmers section
   - Badge / achievement system

5. **Community Features**
   - Badge earning system
   - Social engagement (likes/views)
   - Event participation tracking
   - Support farmer donations

### Color Scheme
- **Primary**: Amber/Orange (#f59e0b, #ea580c)
- **Secondary colors**: Rose, Yellow, Warm tones
- **Accents**: Orange, Rose, Warmth

---

## 🔄 Dashboard Routing

When users log in, they automatically see the correct dashboard:

```javascript
// In Dashboard.jsx (src/pages/Dashboard.jsx)
if (role === 'farmer' || role === 'admin') {
  return <FarmerDashboard {...props} />
}
if (role === 'expert') {
  return <ExpertDashboard {...props} />
}
if (role === 'public') {
  return <PublicDashboard {...props} />
}
```

---

## 🎨 Design System Features

All dashboards use consistent design patterns:

### Components Used
- **Cards**: Shadcn UI Card component for containers
- **Buttons**: Shadcn UI Button with variants (primary, outline, ghost)
- **Icons**: Lucide React (24x24px icons)
- **Grid Layouts**: Responsive TailwindCSS grids (md: 2 cols, lg: 3-4 cols)
- **Badges**: Status/category tags with optional colors
- **Progress Bars**: Visual indicators for completion/progress

### Interactive Elements
- ✅ Hover animations (scale, color change, shadow)
- ✅ Smooth transitions (300-500ms)
- ✅ Click animations on cards
- ✅ Focus states on inputs
- ✅ Loading states on buttons

### Typography
- **Display font**: Large headings (text-3xl, text-4xl)
- **Body font**: Regular text (text-sm, text-base)
- **Hierarchy**: Clear visual hierarchy with font weights

### Color Palette
- **Green (Farmer)**: #10b981, #059669, #047857
- **Blue (Expert)**: #3b82f6, #1e40af, #0c4a6e
- **Amber (Public)**: #f59e0b, #d97706, #b45309

---

## 🚀 Using the Dashboard System

### For Users:
1. **Register** → Select your role (Farmer/Expert/Public)
2. **Login** → Automatically see your role-specific dashboard
3. **Customize** → Each dashboard tailored to your needs

### For Developers:
1. **Add Features** → Extend existing dashboard components
2. **Connect Backend** → Replace mock data with API calls
3. **Real-time Updates** → Add WebSocket for live notifications
4. **Analytics** → Track user engagement per dashboard

---

## 📝 Next Steps (Future Enhancements)

1. **Backend Integration**
   - Connect crop tracking to database
   - Store task/alert data
   - Persist learning progress
   - Save event registrations

2. **Advanced Features**
   - Real-time notifications
   - Push alerts for weather
   - Crop disease detection
   - AI-powered recommendations

3. **Social Features**
   - Expert follow/subscribe system
   - User profiles with portfolios
   - Direct messaging
   - Event networking

4. **Mobile Optimization**
   - Responsive improvements
   - Touch-friendly interactions
   - Mobile-specific navigation
   - Offline support

---

## 📂 File Structure

```
src/
├── pages/
│   ├── Dashboard.jsx           (Routing logic)
│   └── Signup.jsx              (Registration with role selector)
├── components/
│   └── dashboards/
│       ├── FarmerDashboard.jsx
│       ├── ExpertDashboard.jsx
│       └── PublicDashboard.jsx
├── contexts/
│   └── AuthContext.jsx         (Role management)
└── lib/
    └── api.js                  (API endpoints)
```

---

**Made with ❤️ for the agricultural community!**
