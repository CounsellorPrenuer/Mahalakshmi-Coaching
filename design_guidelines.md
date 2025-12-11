# Design Guidelines: Path-Finder Career Guidance Website

## Design Approach
**Reference-Based Approach**: Hypermodern career coaching platform inspired by premium SaaS products (Linear, Stripe) with glassmorphism aesthetics and sophisticated interactions.

## Core Design Elements

### Typography
- **Primary Font**: Inter or DM Sans (Google Fonts)
- **Headings**: Bold 700, sizes: 3xl-6xl for hero, xl-2xl for sections
- **Body**: Regular 400, Medium 500, size: base-lg
- **Accent/Stats**: Tabular numbers, gradient text treatments

### Layout System
**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Section padding: py-20 to py-32 (desktop), py-12 to py-16 (mobile)
- Card spacing: p-6 to p-8
- Grid gaps: gap-6 to gap-8

### Color Strategy
**Extract from Logo**: Blues (#1E40AF, #3B82F6), Purples (#7C3AED, #A78BFA), professional gradients
- Light mode: White backgrounds with subtle gray (#F9FAFB, #F3F4F6)
- Dark mode: Deep navy/blacks (#0F172A, #1E293B) with elevated cards
- Accents: Vibrant gradient CTAs (blue-to-purple)
- Ensure 4.5:1 contrast ratios minimum

### Component Library

**Navigation**
- Sticky header with glassmorphism (backdrop-blur-lg, bg-opacity-80)
- Smooth slide-in mobile menu
- Light/Dark mode toggle (sun/moon icon)
- Logo with subtle pulse animation

**Hero Section**
- Full viewport height (min-h-screen)
- Animated gradient background (morphing blue-purple waves)
- Typewriter effect headline: "Transform Your Career Journey"
- Subtitle with fade-up animation
- Dual CTAs: Primary "Book Your Session" + Secondary "Learn More"
- Floating particle system background
- Professional headshot image (right side, desktop) with subtle float animation

**Statistics Section**
- 3-column grid (1 on mobile)
- Large numbers with count-up animation on scroll
- Gradient number treatment
- Labels: "Years Experience", "Clients Helped", "Success Rate"

**Services Cards**
- Grid: 3 columns (lg), 2 columns (md), 1 column (mobile)
- Glassmorphism cards with hover lift effect (translateY -4px)
- Icon at top (Material Icons or Heroicons)
- Title, description, "Learn More" link
- Staggered fade-in animation (delay: 100ms between cards)
- Services: Career Guidance, Path Planning, Resume Building, Interview Prep, Leadership Coaching, Behavioral Training

**About Timeline**
- Vertical timeline with connecting line
- Interactive nodes: Indian Army → L&D → Career Counselling
- Each milestone: Year, title, description card
- Scroll-triggered reveals
- Professional photo with soft shadow

**Testimonials Carousel**
- 3 testimonials visible (desktop), 1 (mobile)
- Card layout: Quote, client name, role, photo
- Auto-rotate with manual controls
- Smooth transitions (transform, opacity)

**Contact Form**
- Two-column layout (desktop): Form left, info right
- Fields: Name, Email, Phone, Service Interest, Message
- Validation with error shake animation
- Success state: Checkmark animation
- Right column: Contact details, WhatsApp button, LinkedIn embed

**Floating Elements**
- Scroll progress indicator (top bar, gradient fill)
- Back-to-top button (bottom-right, appears after 300px scroll)
- Quick contact FAB (WhatsApp icon, pulsing animation)

**Custom Cursor**
- 24px circular cursor with gradient fill
- Trail of 6 smaller circles (12px, 8px, 6px...) with opacity fade
- Scale 1.5x on buttons/links
- Morph to cross on drag
- Desktop only (hide on touch devices)

### Animations
- **Intersection Observer**: Fade-in elements at 0.2 threshold
- **Scroll parallax**: Background shapes move at 0.5x speed
- **Hover effects**: Scale 1.05, shadow-xl, glow (box-shadow with theme color)
- **Loading**: Skeleton screens for admin dashboard
- **Page transitions**: Fade-out current, fade-in next (300ms)
- **Micro-interactions**: Button press (scale 0.98), checkbox bounce, toggle slide

### Admin Dashboard
- Sidebar navigation (fixed left)
- Cards for stats overview
- Table for contact submissions with actions (view, archive, delete)
- Settings panel for theme customization
- Dark sidebar with light content area (light mode) / full dark (dark mode)

### Images
- **Hero Image**: Professional headshot of Mahalakshmi (right side, 40% width on desktop, hidden on mobile)
- **About Section**: Career journey photo, professional setting
- **Services**: Icon-based (no photography)
- **Testimonials**: Client headshots (circular, 60px)
- All images: Lazy loading, WebP format, blur-up placeholder

### Accessibility
- ARIA labels on all interactive elements
- Keyboard navigation support (tab order, focus visible)
- Screen reader announcements for dynamic content
- Skip to main content link
- Minimum 16px base font size
- Focus indicators: 2px outline, theme color

### Responsive Breakpoints
- Mobile: < 768px (single column, stacked layout)
- Tablet: 768px - 1024px (2 columns where appropriate)
- Desktop: > 1024px (full multi-column layouts)
- Max container width: 1280px (max-w-7xl)