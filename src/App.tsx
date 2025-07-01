import { ProfileHeader } from './components/profile-header';
import { StoryHighlights } from './components/story-highlights';
import { PortfolioGrid } from './components/portfolio-grid';
import { Testimonials } from './components/testimonials';
import { ContactForm } from './components/contact-form';
import { Footer } from './components/footer';
import { ThemeSwitcher } from './components/theme-switcher';
import { LanguageSwitcher } from './components/language-switcher';
import './i18n';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <ThemeSwitcher />
      <LanguageSwitcher />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <ProfileHeader />
        <StoryHighlights />
        <PortfolioGrid />
        <Testimonials />
        <div id="contact" className="mt-12">
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
