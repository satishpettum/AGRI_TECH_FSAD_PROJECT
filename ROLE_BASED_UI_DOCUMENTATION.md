# Role-Based UI Implementation for AgriConnect

## Overview
This document outlines the role-based UI system implementation for the AgriConnect application. The system provides personalized user experiences based on three user roles: **Farmer**, **Expert**, and **Public/Enthusiast**.

## Roles & Colors

### 1. Farmer (Emerald/Green Theme)
- **Color Scheme**: Emerald-600, Green-500, Teal-500
- **Primary Color**: `#059669`
- **Use Cases**: 
  - Access farming resources and guides
  - Connect with agricultural experts
  - Manage crops and track progress
  - Share experiences in community forums
- **Navigation**: Home, Resources, Find Experts, Community, About

### 2. Expert (Indigo/Blue Theme)
- **Color Scheme**: Slate-900, Indigo-950, Blue-900
- **Primary Color**: `#4f46e5`
- **Use Cases**:
  - Share agricultural knowledge through articles
  - Answer farmer questions
  - Collaborate with other experts
  - Build reputation and reach
- **Navigation**: Home, Articles, Farmer Questions, About

### 3. Public/Enthusiast (Amber/Orange Theme)
- **Color Scheme**: Amber-600, Orange-500, Rose-500
- **Primary Color**: `#b45309`
- **Use Cases**:
  - Learn about farming and agriculture
  - Explore sustainable food systems
  - Join community discussions
  - Discover global farming practices
- **Navigation**: Home, Learn, Community, About

## Updated Components

### 1. **Header Component** (`src/components/Header.jsx`)
**Changes:**
- Dynamic navigation menu based on user role
- Role-specific border and text colors
- Logo color changes based on role
- Mobile menu styling respects role colors

**Features:**
- Shows appropriate navigation links for each role
- Color-coded accent elements
- Responsive design maintained

### 2. **Role Configuration** (`src/lib/roleConfig.js`)
**New File** - Central configuration for role-based styling
**Contains:**
- `ROLE_CONFIG` object with configuration for each role
- Navigation items for each role
- Color scheme definitions
- Theme configuration
- Helper functions for retrieving role-specific styling

### 3. **Resources Page** (`src/pages/Resources.jsx`)
**Changes:**
- Role-specific page titles and descriptions
- Different button labels based on role
- Custom hero section with gradient matching role
- Farmer: "Save Resource" / Expert: "Write Article" / Public: "Learn More"
- Role-specific UI styling and colors

**Features:**
- Experts can see a "Write New Article" CTA button
- Farmers see resource saving functionality
- Public users see beginner-friendly content
- All features maintain core functionality

### 4. **Experts Page** (`src/pages/Experts.jsx`)
**Changes:**
- Role-specific hero section and descriptions
- Different action buttons based on role:
  - **Farmer**: "Contact Expert" (send email)
  - **Expert**: "View Profile" (navigate to profile)
  - **Public**: "Learn More" (informational)
- Expert verification badge shown only to experts
- Role-specific button colors

### 5. **Community Page** (`src/pages/Community.jsx`)
**Changes:**
- Role-specific page titles and descriptions
- Context-aware discussion categories:
  - Farmer: "Farm Discussion"
  - Expert: "Expert Insight"
  - Public: "Join Discussion"
- Left border accent on posts matches role color
- Role-specific placeholder text in dialog
- Category badges styled with role colors

### 6. **Home/Index Page** (`src/pages/Index.jsx`)
**Changes:**
- Shows personalized welcome for logged-in users
- Role-specific quick action cards
- Dashboard link displayed for authenticated users
- Displays different feature highlights based on role:
  - **Farmer**: Crop management, farming guides, expert consultation
  - **Expert**: Share knowledge, answer queries, analytics dashboard
  - **Public**: Learn agriculture, understand food systems, join community

## Color Scheme Reference

| Role | Primary | Secondary | Light Background | Border |
|------|---------|-----------|------------------|--------|
| Farmer | #059669 (emerald-600) | #10b981 (emerald-500) | #d1fae5 (emerald-100) | #a7f3d0 (emerald-200) |
| Expert | #4f46e5 (indigo-600) | #6366f1 (indigo-500) | #e0e7ff (indigo-100) | #c7d2fe (indigo-200) |
| Public | #b45309 (amber-600) | #d97706 (amber-500) | #fef3c7 (amber-100) | #fcd34d (amber-200) |

## Implementation Details

### Role Detection
- User role is retrieved from `useAuth()` context
- Stored in `AuthContext.jsx` after login/signup
- Persists across page navigation

### Styling Approach
- Tailwind CSS classes used for theme colors
- Dynamic class names generated based on role
- Conditional rendering for role-specific content
- Gradient classes for hero sections

### Responsive Design
- Mobile-first approach maintained
- All role-specific styling is responsive
- Header navigation adapts on mobile

## Files Created/Modified

### New Files:
- `src/lib/roleConfig.js` - Role configuration centralization
- `src/components/RoleBasedLayout.jsx` - Role-based layout wrapper (optional)

### Modified Files:
- `src/components/Header.jsx` - Role-aware navigation
- `src/pages/Resources.jsx` - Role-specific content and styling
- `src/pages/Experts.jsx` - Role-specific expert view
- `src/pages/Community.jsx` - Role-specific community features
- `src/pages/Index.jsx` - Role-aware home page with personalization

## Future Enhancements

1. **Profile Customization**: Allow users to customize their theme color
2. **Role-specific Dashboard Widgets**: Different widget layouts per role
3. **Notification Preferences**: Role-based notification filtering
4. **Analytics**: Track engagement metrics per role
5. **API Responses**: Filter API data based on user role
6. **Admin Dashboard**: Add admin role with separate UI

## Testing Checklist

- [ ] Test header navigation for all 3 roles
- [ ] Verify color schemes display correctly
- [ ] Test Resources page with all roles
- [ ] Verify Experts page role-specific actions
- [ ] Test Community page role-specific features
- [ ] Verify Home page personalization when logged in
- [ ] Test mobile responsiveness for each role
- [ ] Verify role persistence across navigation
- [ ] Test logout and switch role (via signup)

## Accessibility Notes

- Color is not the only distinguishing feature (text labels provided)
- All interactive elements maintain proper contrast ratios
- Keyboard navigation preserved
- ARIA labels appropriate for role-specific features

---

**Last Updated**: April 7, 2026
**Version**: 1.0
