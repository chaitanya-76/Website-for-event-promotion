# World Environment Day Promotion Webpage

A modern, responsive React application for promoting World Environment Day events with GSAP animations and premium green/black theme.

## 🌿 Features

✅ **React + JavaScript** - Built with React 19 and modern JavaScript  
✅ **Tailwind CSS** - Premium responsive design with custom eco-green color palette  
✅ **GSAP Animations** - Smooth entrance animations and interactive effects  
✅ **Mobile-First Design** - Responsive layout optimized for all devices  
✅ **Dark Theme** - Modern dark background with glowing green accents  
✅ **Event Management** - Display, filter, and manage events with modal details  
✅ **Google Form Integration** - Direct links to registration forms  

## 📁 Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx          # Landing page with welcome message
│   │   └── Events.jsx        # Events listing page with all events
│   ├── components/
│   │   ├── EventCard.jsx     # Individual event card component
│   │   └── EventDetailModal.jsx  # Event detail modal
│   ├── App.jsx               # Main app with routing
│   ├── App.css               # Global styles
│   ├── index.css             # Tailwind directives
│   └── main.jsx              # Entry point
├── tailwind.config.js        # Custom color theme configuration
├── vite.config.js            # Vite bundler configuration
└── package.json              # Dependencies
```

## 🎨 Color Theme

Custom premium green and black color palette defined in `tailwind.config.js`:

- **Primary Green**: `#00D084` (eco-green)
- **Dark Green**: `#00A86B` (eco-dark-green)
- **Neon Green**: `#39FF14` (eco-light-green)
- **Background**: `#0F0F0F` (eco-black)
- **Secondary BG**: `#1A1A1A` (eco-dark-bg)

## 🚀 Getting Started

### Installation

```bash
cd frontend
npm install
```

### Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5174`

### Build for Production

```bash
npm run build
```

## 📄 Pages

### Home Page (`/`)
- Welcome message with animated title
- Event description
- "Explore All Events" button with GSAP hover effects
- Floating decorative elements
- Mobile-responsive layout

### Events Page (`/events`)
- Grid display of all events (responsive: 1 column mobile → 3 columns desktop)
- Event cards with:
  - Event image
  - Title and date/time
  - Participant count badge
  - Brief description preview
- Click any card to view detailed information
- Smooth card hover animations

### Event Detail Modal
- Full event image
- Event title with glow effect
- Date, Time, Location, Expected Participants (info cards)
- Detailed description
- Event details section (placeholder for additional info)
- Register Now button (links to Google Form)
- Close functionality with animations

## 🔧 Technologies Used

- **React 19.2.6** - UI library
- **Vite 8.0** - Build tool
- **Tailwind CSS** - Utility-first CSS framework with @tailwindcss/vite
- **GSAP 3.12** - Animation library
- **React Router DOM 7.15** - Client-side routing

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Breakpoints

- **Mobile** (< 640px): Single column, larger touch targets
- **Tablet** (640px - 1024px): Two columns
- **Desktop** (> 1024px): Three columns

All components use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`)

## 🎬 Animations

The app includes GSAP animations for:
- Page entrance effects (fade-in, slide-up)
- Button hover interactions with glowing effects
- Event cards with lift and glow on hover
- Modal entrance and exit animations
- Floating decorative background elements

## 🔧 Customization

### Adding Events

Edit the `events` array in [src/pages/Events.jsx](src/pages/Events.jsx):

```javascript
const events = [
  {
    id: 1,
    title: 'Event Title',
    date: 'June 5, 2026',
    time: '8:00 AM - 11:00 AM',
    location: 'Location Name',
    image: 'Image URL',
    description: 'Event description',
    participants: '150+',
    googleFormLink: 'https://forms.google.com/...',
  },
  // Add more events...
];
```

### Modifying Colors

Update the color palette in `tailwind.config.js`:

```javascript
colors: {
  'eco-green': '#00D084',      // Change primary color
  'eco-dark-green': '#00A86B', // Change dark accent
  'eco-light-green': '#39FF14', // Change neon accent
  // ...
}
```

## 📝 Notes for Future Development

- Event details section is a placeholder - add more event-specific information as needed
- Image URLs use external Unsplash URLs - replace with local images or CDN links
- Google Form links are placeholders - update with actual form URLs
- The modal content area can be expanded with more event information
- Consider adding event filtering/search functionality
- Add event registration tracking or calendar integration

## 🌐 Browser Support

- Chrome/Edge 88+
- Firefox 87+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

Created for World Environment Day promotion - College Event Management

---

**Live Development**: The app is currently running with hot-reload enabled. Changes to components will automatically refresh the browser.

For questions or modifications, refer to individual component files for detailed implementation details.
