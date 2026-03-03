import { Metadata } from 'next';
import { getPortfolio } from '@/lib/devfolio';
import { generateThemeStyles, isSectionEnabled, getSectionsOrder } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  Hero,
  About,
  Projects,
  Skills,
  Experience,
  Certificates,
  Blog,
  Testimonials,
  Contact,
} from '@/components/sections';

// Revalidate every 60 seconds
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const portfolio = await getPortfolio();
    const { user } = portfolio;

    return {
      title: user.meta_title || `${user.name} | Portfolio`,
      description: user.meta_description || user.bio || `Portfolio of ${user.name}`,
      openGraph: {
        title: user.meta_title || `${user.name} | Portfolio`,
        description: user.meta_description || user.bio || `Portfolio of ${user.name}`,
        images: user.image_url ? [user.image_url] : [],
      },
    };
  } catch {
    return {
      title: 'Portfolio',
      description: 'A professional portfolio',
    };
  }
}

export default async function HomePage() {
  let portfolio;

  try {
    portfolio = await getPortfolio();
  } catch (error) {
    console.error('Failed to fetch portfolio:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-2xl font-bold mb-4">Unable to load portfolio</h1>
          <p className="text-foreground/60 mb-6">
            Please check your API configuration in the .env file.
          </p>
          <pre className="text-left text-sm bg-foreground/5 p-4 rounded-lg overflow-x-auto">
            {`DEVFOLIO_API_KEY=your-api-key
# or
DEVFOLIO_USER_UUID=your-uuid`}
          </pre>
        </div>
      </div>
    );
  }

  const {
    user,
    projects = [],
    skills = [],
    experiences = [],
    certificates = [],
    blogs = [],
    social_links = [],
    reviews = [],
    settings,
  } = portfolio;

  // Get section order and enabled status
  const sectionsOrder = getSectionsOrder(settings);
  const themeStyles = generateThemeStyles(settings);

  // Map section names to components
  const sectionComponents: Record<string, React.ReactNode> = {
    hero: <Hero key="hero" user={user} skills={skills} settings={settings} />,
    about: isSectionEnabled('about', settings) && <About key="about" user={user} />,
    projects: isSectionEnabled('projects', settings) && projects.length > 0 && (
      <Projects key="projects" projects={projects} />
    ),
    skills: isSectionEnabled('skills', settings) && skills.length > 0 && (
      <Skills key="skills" skills={skills} />
    ),
    experience: isSectionEnabled('experience', settings) && experiences.length > 0 && (
      <Experience key="experience" experiences={experiences} />
    ),
    certificates: isSectionEnabled('certificates', settings) && certificates.length > 0 && (
      <Certificates key="certificates" certificates={certificates} />
    ),
    blogs: isSectionEnabled('blogs', settings) && blogs.length > 0 && (
      <Blog key="blogs" blogs={blogs} />
    ),
    testimonials: isSectionEnabled('testimonials', settings) && reviews.length > 0 && (
      <Testimonials key="testimonials" reviews={reviews} />
    ),
    contact: isSectionEnabled('contact', settings) && (
      <Contact key="contact" user={user} settings={settings} />
    ),
  };

  return (
    <>
      {/* Inject theme styles */}
      <style dangerouslySetInnerHTML={{ __html: themeStyles }} />

      {/* Header */}
      <Header user={user} socialLinks={social_links} />

      {/* Main Content */}
      <main>
        {sectionsOrder.map((section) => sectionComponents[section])}
      </main>

      {/* Footer */}
      <Footer user={user} socialLinks={social_links} />
    </>
  );
}
