import React, { useState } from 'react';
// import ScrollingImageGallery from '../components/ScrollingImageGallery'; // Removed this import
import { AnimatedImageBackground } from '../components/AnimatedImageBackground'; // Added this import
import AccordionItem from '../components/AccordionItem';
import { cn } from '../lib/utils';
import { ScratchToReveal } from "../components/magicui/ScratchToReveal";
import { INTERIOR_STYLES } from '../data/styles';
import { Link } from 'react-router-dom';
import { GlobeDemo } from '../components/magicui/globe-demo';
import { Marquee } from '../components/magicui/marquee';

// Data for sections, you can expand this based on interiorai.com content
const heroData = {
  superTitle: "Your Personal AI Interior Stylist",
  title: "✨ Reimagine Your Space with AI",
  subTitle: "Unlock stunning interior designs tailored to your taste. Upload a photo or start from scratch and let our AI bring your dream room to life in seconds.",
  features: [
    "📷 Instantly redesign from a photo of your room",
    "🎨 Explore diverse styles: Modern, Minimalist, Bohemian, and more",
    "💡 Get multiple AI-generated concepts for any space",
    "🛋️ Virtually stage empty rooms for listings or visualization",
    "✏️ Transform sketches into photorealistic interior renders"
  ],
  ctaText: "Start Your AI Design →",
  googleCtaText: "Sign Up with Google"
};

const companies = ["Netflix", "Berkeley University", "Accenture", "Mercedes-Benz"]; // Add more as needed
const publications = ["New York Times", "Arch Daily", "TechCrunch", "MSN", "Yahoo! News"];

interface FaqItem {
  question: string;
  answer: string;
  isOpenInitially?: boolean;
}

const faqData: FaqItem[] = [
  { question: "How does the AI generate interior designs?", answer: "Our platform uses sophisticated deep learning models trained on vast datasets of interior images and design principles. It analyzes your input (photo, sketch, or text prompts) and generates new, unique designs based on your selected style and preferences." },
  { question: "What styles can the AI create?", answer: "We support a wide range of styles, from contemporary and minimalist to traditional, industrial, bohemian, and many niche aesthetics. The AI can also blend styles or create something entirely new based on your guidance." },
  { question: "Is it easy to use if I have no design background?", answer: "Absolutely! Our tool is designed for everyone. The interface is intuitive – just upload an image, choose a style, and let the AI do the creative work. No technical skills required." },
  { question: "Can I customize the AI-generated designs?", answer: "Yes, depending on your plan, you can often regenerate designs, try different variations, or use text prompts to guide the AI further, for instance, asking to add specific furniture pieces or change color schemes." },
  { question: "What are the benefits of using AI for interior design?", answer: "AI interior design offers fast concept generation, cost savings compared to traditional designers, endless inspiration, and the ability to visualize changes before committing to them in real life." },
  { question: "How long does it take to get a design?", answer: "Typically, designs are generated within seconds to a minute, depending on the complexity and server load. We strive for rapid results!" },
  { question: "Can I use the generated images commercially?", answer: "Commercial usage rights depend on the subscription plan you choose. Our Pro and Studio plans usually include a commercial license." }
];

function ScratchToRevealDemo({ image = "/images/drawing.jpg", revealImage = "/images/drawing1.jpg" }) {
  return (
    <div className="relative w-[400px] h-[300px] flex items-center justify-center">
      <ScratchToReveal
        width={400}
        height={300}
        minScratchPercentage={60}
        className="overflow-hidden rounded-2xl border-2 bg-gray-100"
        image={image}
        revealImage={revealImage}
      />
    </div>
  );
}

function BeforeAfterClipSlider() {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative w-full h-full select-none flex items-center justify-center">
      <img src="/images/back.jpg" alt="before" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
      <img
        src="/images/photo.jpg"
        alt="after"
        className="absolute inset-0 h-full object-cover rounded-lg"
        style={{
          width: '100%',
          height: '100%',
          clipPath: `inset(0 ${100 - pos}% 0 0)`
        }}
      />
      <div
        className="absolute top-0 bottom-0 z-20 flex flex-col items-center"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-1 h-full bg-white/80 rounded-full shadow" />
        <div className="w-6 h-6 bg-pink-500 border-4 border-white rounded-full shadow-lg mt-[-18px] cursor-pointer"
          style={{ touchAction: 'none' }}
          onPointerDown={e => {
            const move = (ev: PointerEvent) => {
              const parent = (e.target as HTMLElement).parentElement?.parentElement as HTMLElement;
              if (!parent) return;
              const rect = parent.getBoundingClientRect();
              let x = ev.clientX - rect.left;
              x = Math.max(0, Math.min(x, rect.width));
              setPos((x / rect.width) * 100);
            };
            const up = () => {
              window.removeEventListener('pointermove', move);
              window.removeEventListener('pointerup', up);
            };
            window.addEventListener('pointermove', move);
            window.addEventListener('pointerup', up);
          }}
        />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={e => setPos(Number(e.target.value))}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 z-10 opacity-0 pointer-events-none"
        tabIndex={-1}
        aria-label="对比滑块"
      />
    </div>
  );
}

function UploadSimulation() {
  const [img, setImg] = useState<string | null>(null);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setImg(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
        {img ? (
          <img src={img} alt="preview" className="max-h-80 rounded-lg shadow-lg object-contain" />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <svg width="64" height="64" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 16v-8m0 0-3 3m3-3 3 3"/><rect width="18" height="14" x="3" y="5" rx="2"/></svg>
            <span className="mt-2">点击上传图片</span>
          </div>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={handleChange} />
      </label>
    </div>
  );
}

// 用户评论内容（英文，头像随机，数量扩充到22条）
const userComments = [
  { quote: "The AI-generated designs exceeded my expectations. The details and style options are amazing!", author: "Emily R.", role: "Homeowner", avatar: "https://randomuser.me/api/portraits/women/32.jpg" },
  { quote: "Super easy to use. I uploaded a photo and got new ideas in seconds!", author: "Michael T.", role: "First-time Renovator", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
  { quote: "Love the variety of styles. Switching between Scandinavian and Modern is just one click!", author: "Luna D.", role: "Interior Designer", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
  { quote: "The response speed is impressive and the image quality is top-notch.", author: "John Z.", role: "Project Manager", avatar: "https://randomuser.me/api/portraits/men/12.jpg" },
  { quote: "AI helped me solve my layout problems. Saved me so much time!", author: "Chris C.", role: "Renter", avatar: "https://randomuser.me/api/portraits/men/23.jpg" },
  { quote: "Customer support is fast and helpful. The plans are flexible and affordable.", author: "Sophia Z.", role: "B&B Owner", avatar: "https://randomuser.me/api/portraits/women/41.jpg" },
  { quote: "Even my hand-drawn sketches can be turned into realistic renders. Incredible!", author: "Mr. Xu", role: "Art Teacher", avatar: "https://randomuser.me/api/portraits/men/54.jpg" },
  { quote: "Mobile experience is smooth. I can design anywhere, anytime on my phone.", author: "Linda S.", role: "Student", avatar: "https://randomuser.me/api/portraits/women/77.jpg" },
  { quote: "The AI's color and decor suggestions are so professional. Saved me a lot of back-and-forth.", author: "Grace W.", role: "International Student", avatar: "https://randomuser.me/api/portraits/women/12.jpg" },
  { quote: "I use the generated images directly in client proposals. It really boosts my closing rate!", author: "Director Chen", role: "Design Studio Head", avatar: "https://randomuser.me/api/portraits/men/36.jpg" },
  { quote: "The virtual staging feature is a game changer for my real estate business.", author: "Sarah M.", role: "Realtor", avatar: "https://randomuser.me/api/portraits/women/24.jpg" },
  { quote: "No design background needed. The interface is intuitive and fun!", author: "Kevin L.", role: "New User", avatar: "https://randomuser.me/api/portraits/men/61.jpg" },
  { quote: "I love how quickly I can try out different furniture and layouts.", author: "Anna P.", role: "Young Professional", avatar: "https://randomuser.me/api/portraits/women/53.jpg" },
  { quote: "The AI understands my preferences and always surprises me with creative ideas.", author: "David K.", role: "Tech Enthusiast", avatar: "https://randomuser.me/api/portraits/men/19.jpg" },
  { quote: "Batch processing and team collaboration features are super useful for our agency.", author: "Olivia F.", role: "Agency Manager", avatar: "https://randomuser.me/api/portraits/women/29.jpg" },
  { quote: "The subscription is worth every penny. I use it for all my projects now.", author: "Paul G.", role: "Freelancer", avatar: "https://randomuser.me/api/portraits/men/72.jpg" },
  { quote: "I can visualize changes before making real-life decisions. That's so valuable!", author: "Jessica H.", role: "Home Buyer", avatar: "https://randomuser.me/api/portraits/women/80.jpg" },
  { quote: "The AI's suggestions for color palettes are always on point!", author: "Brian S.", role: "DIY Enthusiast", avatar: "https://randomuser.me/api/portraits/men/28.jpg" },
  { quote: "I was able to stage my rental property virtually and it rented out in days!", author: "Megan L.", role: "Landlord", avatar: "https://randomuser.me/api/portraits/women/18.jpg" },
  { quote: "The team collaboration tools make working with my colleagues so much easier.", author: "Carlos V.", role: "Team Lead", avatar: "https://randomuser.me/api/portraits/men/39.jpg" },
  { quote: "The AI's lighting suggestions made my living room so much cozier!", author: "Nina P.", role: "Home Decor Lover", avatar: "https://randomuser.me/api/portraits/women/15.jpg" },
  { quote: "I can finally see my ideas come to life before any renovation starts.", author: "Tom F.", role: "Homeowner", avatar: "https://randomuser.me/api/portraits/men/44.jpg" },
];

const Home: React.FC = () => {
  const [billingType, setBillingType] = React.useState('yearly');
  const [selectedPlan, setSelectedPlan] = React.useState<number | null>(null);

  return (
    <div className="text-white">
      {/* Hero Section with AnimatedImageBackground as background */}
      <section className="relative min-h-screen flex flex-col justify-center text-left overflow-hidden pt-20 md:pt-24 lg:pt-28">
        {/* <div className=\"absolute inset-0 w-full h-full z-0\"> // Removed this block
          <ScrollingImageGallery />
        </div> */}
        {/* <div className=\"absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10\"></div> */}
        
        <AnimatedImageBackground /> {/* Added the new background component here */}

        <div className="relative z-20 container mx-auto px-4 sm:px-6 md:pl-8 md:pr-6 lg:pl-12 lg:pr-8 xl:pl-16 xl:pr-12 w-full flex-grow flex items-center">
          <div className="flex flex-col md:flex-row items-center md:justify-start w-full md:space-x-6 lg:space-x-10 xl:space-x-12">
            
            <div className="md:w-7/12 lg:w-6/12 xl:w-7/12 text-center md:text-left mb-10 md:mb-0 flex flex-col justify-center py-8">
              <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-300 tracking-wide">{heroData.superTitle}</h2>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                {heroData.title.split(' ').map((word, index) => (
                  <span key={index} className={word.startsWith('✨') ? 'inline-block mr-2' : 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent'}>
                    {word + ' '}
                  </span>
                ))}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-lg mx-auto md:mx-0">
                {heroData.subTitle}
              </p>
              
              <ul className="text-left mb-8 space-y-3 text-gray-300 max-w-md mx-auto md:mx-0">
                {heroData.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm sm:text-base">
                    <span className="mr-3 text-xl sm:text-2xl opacity-80">{feature.substring(0, feature.indexOf(' '))}</span>
                    <span className="opacity-90">{feature.substring(feature.indexOf(' ') + 1)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:w-5/12 lg:w-4/12 xl:w-4/12 flex items-center justify-center md:justify-end w-full px-2 sm:px-0 ml-auto">
              <div className="bg-gray-800 bg-opacity-70 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-[1.02] hover:shadow-purple-500/30">
                <div className="relative mb-5">
                  <input 
                    type="email" 
                    placeholder="Type your email..." 
                    className="w-full p-3.5 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-shadow shadow-md focus:shadow-pink-500/50"
                  />
                  <span className="absolute top-[-10px] right-3 bg-green-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-md">
                    ✨ New & Improved
                  </span>
                </div>
                <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3.5 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 mb-4">
                  Redesign your interior now →
                </button>
                <button className="w-full bg-white text-gray-800 hover:bg-gray-100 font-semibold py-3.5 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75">
                  <svg className="w-5 h-5 mr-2.5 text-gray-700" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M21.8563 12.4039C21.8563 11.8039 21.3963 11.3839 20.8063 11.3339L12.0563 11.2939C11.9763 10.4839 11.8063 9.69391 11.5363 8.95391C11.3063 8.28391 10.9463 7.66391 10.4663 7.15391C10.0063 6.64391 9.44631 6.25391 8.79631 6.00391C8.14631 5.75391 7.42631 5.63391 6.65631 5.63391C5.20631 5.63391 3.93631 6.15391 2.96631 7.09391C2.00631 8.03391 1.46631 9.27391 1.46631 10.6839C1.46631 12.0939 1.98631 13.3239 2.93631 14.2739C3.44631 14.7739 4.04631 15.1439 4.69631 15.3639C4.97631 15.4739 5.27631 15.5439 5.57631 15.5939L5.60631 15.5939C5.61631 15.6039 5.62631 15.6039 5.63631 15.6039C5.63631 15.6039 5.63631 15.6039 5.64631 15.6039C6.21631 15.6039 6.59631 15.2139 6.59631 14.6939C6.59631 14.2039 6.23631 13.8339 5.76631 13.7939C5.09631 13.7339 4.49631 13.4739 4.01631 13.0239C3.53631 12.5739 3.28631 11.9739 3.28631 11.2839C3.28631 10.5939 3.53631 10.0039 4.01631 9.55391C4.49631 9.09391 5.09631 8.84391 5.76631 8.84391C6.44631 8.84391 7.03631 9.09391 7.51631 9.55391C7.99631 10.0039 8.24631 10.5939 8.24631 11.2839L8.28631 20.7339C8.28631 21.3339 8.70631 21.8039 9.29631 21.8039C9.88631 21.8039 10.3063 21.3339 10.3063 20.7339L10.2663 13.3239H20.7763C21.3863 13.3239 21.8563 12.9039 21.8563 12.4039Z" fill="#4285F4"/><path fillRule="evenodd" clipRule="evenodd" d="M21.8563 12.4039C21.8563 11.8039 21.3963 11.3839 20.8063 11.3339L12.0563 11.2939C11.9763 10.4839 11.8063 9.69391 11.5363 8.95391C11.3063 8.28391 10.9463 7.66391 10.4663 7.15391C10.0063 6.64391 9.44631 6.25391 8.79631 6.00391C8.14631 5.75391 7.42631 5.63391 6.65631 5.63391C5.20631 5.63391 3.93631 6.15391 2.96631 7.09391C2.00631 8.03391 1.46631 9.27391 1.46631 10.6839C1.46631 12.0939 1.98631 13.3239 2.93631 14.2739C3.44631 14.7739 4.04631 15.1439 4.69631 15.3639C4.97631 15.4739 5.27631 15.5439 5.57631 15.5939L5.60631 15.5939C5.61631 15.6039 5.62631 15.6039 5.63631 15.6039C5.63631 15.6039 5.63631 15.6039 5.64631 15.6039C6.21631 15.6039 6.59631 15.2139 6.59631 14.6939C6.59631 14.2039 6.23631 13.8339 5.76631 13.7939C5.09631 13.7339 4.49631 13.4739 4.01631 13.0239C3.53631 12.5739 3.28631 11.9739 3.28631 11.2839C3.28631 10.5939 3.53631 10.0039 4.01631 9.55391C4.49631 9.09391 5.09631 8.84391 5.76631 8.84391C6.44631 8.84391 7.03631 9.09391 7.51631 9.55391C7.99631 10.0039 8.24631 10.5939 8.24631 11.2839L8.28631 20.7339C8.28631 21.3339 8.70631 21.8039 9.29631 21.8039C9.88631 21.8039 10.3063 21.3339 10.3063 20.7339L10.2663 13.3239H20.7763C21.3863 13.3239 21.8563 12.9039 21.8563 12.4039Z" fillOpacity="0.54"/><path fillRule="evenodd" clipRule="evenodd" d="M7.18621 12C7.18621 14.64 9.33621 16.76 12.0062 16.76C13.5362 16.76 14.9062 16.11 15.9062 15.09L13.1962 12.43C12.7062 12.83 12.0662 12.98 11.4162 12.78C10.7662 12.58 10.2862 12.03 10.1762 11.35L7.18621 12Z" fill="#FBBC05"/><path fillRule="evenodd" clipRule="evenodd" d="M12.0063 7.24C10.5163 7.24 9.22631 8.04 8.54631 9.25L11.2863 11.96C11.4463 11.49 11.8163 11.12 12.2863 10.95C12.7663 10.77 13.2963 10.82 13.7463 11.08C14.1963 11.34 14.5463 11.78 14.6663 12.29C14.7863 12.79 14.6663 13.32 14.3463 13.74L17.1263 10.99C16.0363 8.59999 14.3063 7.24 12.0063 7.24Z" fill="#EA4335"/><path fillRule="evenodd" clipRule="evenodd" d="M16.7062 15.45C17.3362 14.57 17.7062 13.53 17.7062 12.4C17.7062 10.14 16.5062 8.21 14.8162 7.05L12.0062 9.81C13.4062 10.06 14.5062 11.16 14.5062 12.56C14.5062 12.93 14.4162 13.28 14.2562 13.59L16.7062 15.45Z" fill="#34A853"/></svg>
                  Sign Up with Google
                </button>
                <p className="text-xs text-gray-400 w-full text-center pt-1">If you already have an account, we'll log you in</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* "Take a photo and redesign your interior in seconds using AI" Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Instantly Visualize Your Dream Space</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Snap a picture of any room, and our AI will generate stunning redesigns in moments. Experiment with styles, layouts, and decor to find the perfect look.
          </p>
          <div className="max-w-5xl mx-auto my-12 h-96 bg-gray-800 rounded-lg flex items-center justify-center shadow-xl relative overflow-hidden">
            <BeforeAfterClipSlider />
          </div>
        </div>
      </section>

      {/* Transform sketches and SketchUp Section */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-white">Transform your sketches into photorealistic renders</h2>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="flex flex-col items-center">
              <ScratchToRevealDemo />
              <h3 className="text-2xl font-semibold text-white mt-6 mb-2">Your Sketches, Reimagined</h3>
              <p className="text-base text-gray-300 mb-2 text-center max-w-md">Use advanced AI technology to add vivid details, rich colors, and sophisticated layouts to your sketches. Breathe new life into your images!</p>
            </div>
            <div className="flex flex-col items-center">
              <ScratchToRevealDemo image="/images/sketches.jpg" revealImage="/images/sketches1.jpg" />
              <h3 className="text-2xl font-semibold text-white mt-6 mb-2">Elevate Your 3D Models</h3>
              <p className="text-base text-gray-300 mb-2 text-center max-w-md">
                Take your SketchUp or other 3D model screenshots to the next level. Our AI enhances them with realistic lighting, textures, and decor, creating high-impact visuals for presentations or personal projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Staging AI Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">AI-Powered Virtual Staging for Any Property</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Fill empty rooms instantly with stylish, AI-generated furniture and decor. Perfect for real estate listings, rental showcases, or simply imagining the potential of a new space. Attract more buyers and tenants with beautifully staged visuals.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mt-12">
            <img src="/images/empty.jpg" alt="Empty Room" className="rounded-2xl shadow-xl w-full max-w-md" />
            <span className="text-5xl md:text-6xl text-white mx-4">→</span>
            <img src="/images/staged.jpg" alt="Staged Room" className="rounded-2xl shadow-xl w-full max-w-md" />
          </div>
        </div>
      </section>

      {/* Testimonials Section 跑马灯 */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-white">Real users give rave reviews</h2>
          <div className="space-y-8">
            <Marquee pauseOnHover repeat={2} className="[--duration:90s]">
              {userComments.map((c, i) => (
                <div key={i} className="flex items-center bg-gray-800 rounded-xl shadow-lg px-4 py-4 mx-2 min-w-[220px] max-w-xs">
                  <img src={c.avatar} alt={c.author} className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-pink-400" />
                  <div>
                    <p className="text-gray-200 text-sm mb-1 font-medium">“{c.quote}”</p>
                    <div className="flex items-center text-xs text-gray-400">
                      <span className="font-semibold text-white mr-1">{c.author}</span>·{c.role}
                    </div>
                    <div className="text-yellow-400 mt-1 text-xs">{'⭐️⭐️⭐️⭐️⭐️'}</div>
                  </div>
                </div>
              ))}
            </Marquee>
            <Marquee pauseOnHover reverse repeat={2} className="[--duration:100s]">
              {userComments.slice().reverse().map((c, i) => (
                <div key={i} className="flex items-center bg-gray-800 rounded-xl shadow-lg px-4 py-4 mx-2 min-w-[220px] max-w-xs">
                  <img src={c.avatar} alt={c.author} className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-purple-400" />
                  <div>
                    <p className="text-gray-200 text-sm mb-1 font-medium">“{c.quote}”</p>
                    <div className="flex items-center text-xs text-gray-400">
                      <span className="font-semibold text-white mr-1">{c.author}</span>·{c.role}
                    </div>
                    <div className="text-yellow-400 mt-1 text-xs">{'⭐️⭐️⭐️⭐️⭐️'}</div>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* Detailed AI Room Designer Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Unparalleled Detail in Every AI Design</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Our advanced AI considers everything from lighting and shadows to material textures and furniture placement, creating incredibly realistic and inspiring interior visualizations.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {Array.from({ length: 24 }).map((_, index) => (
              <Link
                key={index}
                to={`/design-detail/${index + 1}`}
                className={`bg-gray-800 rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 group aspect-[4/3] ${index % 2 === 0 ? 'mt-0 md:mt-8' : 'mt-8 md:mt-0'}`}
              >
                <img
                  src={`/images/${index + 1}.jpg`}
                  alt={`AI Detail ${index + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Updated */}
      <section id="faq" className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 md:mb-20 text-white">Your AI Design Questions, Answered</h2>
          <div className="flex flex-col md:flex-row md:space-x-10 lg:space-x-16 items-start">
            {/* Left: Smartphone Mockup Placeholder */}
            <div className="w-full md:w-1/3 lg:w-2/5 mb-12 md:mb-0 flex justify-center md:sticky md:top-28"> {/* Sticky on desktop */}
              <div className="relative mx-auto border-gray-700 bg-gray-800 border-[10px] rounded-[2.5rem] h-[550px] w-[280px] sm:h-[600px] sm:w-[300px] shadow-2xl">
                <div className="w-[120px] h-[18px] bg-gray-800 top-0 left-1/2 -translate-x-1/2 absolute rounded-b-[1rem] z-10"></div>
                <div className="h-[32px] w-[3px] bg-gray-700 absolute -left-[11px] top-[60px] rounded-l-lg"></div>
                <div className="h-[32px] w-[3px] bg-gray-700 absolute -left-[11px] top-[110px] rounded-l-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-700 absolute -right-[11px] top-[100px] rounded-r-lg"></div>
                <div className="rounded-[2rem] overflow-hidden w-full h-full bg-black flex items-center justify-center">
                  <video
                    src="/images/手机.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right: Accordion FAQs */}
            <div className="w-full md:w-2/3 lg:w-3/5">
              <div className="space-y-5">
                {faqData.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    question={faq.question} 
                    answer={faq.answer} 
                    isOpenInitially={faq.isOpenInitially}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Styles Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 text-white">Explore a Universe of Interior Styles</h2>
          <p className="text-lg md:text-xl text-center text-gray-300 max-w-3xl mx-auto mb-12">
            Discover the perfect aesthetic for your space. Our AI masters dozens of styles, with new ones added regularly. Find your inspiration and let us bring it to life.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6" id="styles-grid">
            {
              INTERIOR_STYLES.map(style => (
                <div key={style.name} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  <img src={style.imgSrc} alt={style.name} className="w-full h-32 object-cover" />
                  <div className="p-4 text-center">
                    <h4 className="font-semibold text-white">{style.name}</h4>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="text-center mt-12">
            <a href="#" className="text-pink-500 hover:text-pink-400 font-semibold text-lg">Browse All Styles →</a>
          </div>
        </div>
      </section>

      {/* Pricing Section - Added ID */}
      <section id="pricing-plans" className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-white">Simple Plans for Every Design Need</h2>
          
          {/* 月/年切换按钮 */}
          <div className="flex justify-center mb-10 gap-4">
            <button
              className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-200 border-2 ${billingType === 'monthly' ? 'bg-pink-500 text-white border-pink-500 shadow-lg' : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'}`}
              onClick={() => setBillingType('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-200 border-2 ${billingType === 'yearly' ? 'bg-purple-500 text-white border-purple-500 shadow-lg' : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'}`}
              onClick={() => setBillingType('yearly')}
            >
              ✨Yearly Get 6+ Months Free with Yearly!
            </button>
          </div>
          
          {/* 价格栏 */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter AI",
                priceMonthly: "$39",
                priceYearly: "$17",
                yearlyFull: "$288 billed yearly",
                features: [
                  "500 AI design generations/mo",
                  "Access to core styles",
                  "Standard image resolution",
                  "Personal use license",
                  "Community support"
                ],
              },
              {
                name: "Pro AI Designer",
                priceMonthly: "$99",
                priceYearly: "$42",
                yearlyFull: "$588 billed yearly",
                features: [
                  "2,000 AI design generations/mo",
                  "Access to all 50+ styles",
                  "High-resolution images",
                  "Sketch & 3D model uploads",
                  "Commercial use license",
                  "Priority support"
                ],
                popular: true
              },
              {
                name: "Studio AI Suite",
                priceMonthly: "$299",
                priceYearly: "$142",
                yearlyFull: "$1980 billed yearly",
                features: [
                  "10,000 AI design generations/mo",
                  "All Pro features, plus:",
                  "Batch image processing",
                  "Team collaboration tools (beta)",
                  "API access (coming soon)",
                  "Dedicated account manager"
                ]
              }
            ].map((plan, idx) => (
              <div
                key={plan.name}
                className={`bg-gray-800 p-8 rounded-lg shadow-xl border-2 flex flex-col transition-all duration-200 cursor-pointer ${plan.popular ? 'border-pink-500' : 'border-gray-700'} ${selectedPlan === idx ? 'ring-4 ring-pink-400 scale-105 z-10' : 'hover:ring-2 hover:ring-pink-300 hover:scale-105'}`}
                onMouseEnter={() => setSelectedPlan(idx)}
                onMouseLeave={() => setSelectedPlan(null)}
                onClick={() => setSelectedPlan(idx)}
              >
                {plan.popular && <span className="bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full self-start mb-4">Most Popular</span>}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-4xl font-extrabold text-white mb-1">
                  {billingType === 'monthly' ? plan.priceMonthly : plan.priceYearly}
                  <span className="text-base font-normal text-gray-400">/mo</span>
                </p>
                {billingType === 'yearly' && (
                  <p className="text-sm text-gray-400 mb-6">{plan.yearlyFull}</p>
                )}
                <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-start">
                      <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="#" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 text-center">
                  Choose Plan
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA Section - Assuming this is the LAST section before a global footer component */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Ready to Transform Your Space?</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
             Stop dreaming, start designing. Our AI Interior Design tool gives you the power to create beautiful, personalized interiors in minutes. Get started today and see your vision come to life.
          </p>
          <ul className="text-left mb-8 space-y-3 max-w-lg mx-auto text-gray-300">
            {[ "📷 Instant redesigns from your photos", "🎨 Vast library of styles & decor options", "💡 Unlimited inspiration, zero intimidation", "🛋️ Perfect for homeowners, renters, & pros"].map((feature, index) => (
               <li key={index} className="flex items-start">
                <span className="mr-2 text-2xl">{feature.substring(0, feature.indexOf(' '))}</span>
                <span>{feature.substring(feature.indexOf(' ') + 1)}</span>
              </li>
            ))}
          </ul>
          <a
            href="/design-room"
            className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-4 px-10 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 text-xl"
          >
            Design Your Dream Room Now →
          </a>
        </div>
      </section>

      {/* Standalone Footer - If you don't have a global one, add it here */}
      {/* If you have a global Footer component, you'd modify that instead */}
    </div>
  );
};

export default Home;