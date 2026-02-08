import React, { useState, useEffect, useCallback, memo } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
  Sparkles,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Memoized Components
const StatusBadge = memo(() => (
  <div
    className="inline-block animate-float lg:mx-0"
    data-aos="zoom-in"
    data-aos-delay="400"
  >
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#850e35] to-[#ee6983] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
        <span className="bg-gradient-to-r from-[#ee6983] to-[#ffc4c4] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-[#ee6983]" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#850e35] to-[#ee6983] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#fff5e4] via-[#ffc4c4] to-[#ee6983] bg-clip-text text-transparent">
          Frontend
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#850e35] to-[#ee6983] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#850e35] to-[#ee6983] bg-clip-text text-transparent">
          Developer
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#850e35] to-[#ee6983] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-11 bg-[#1a0b12] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#850e35]/20 to-[#ee6983]/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="bg-gradient-to-r from-[#fff5e4] to-[#ffc4c4] bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>
          <Icon
            className={`w-4 h-4 text-[#fff5e4] ${text === "Contact" ? "group-hover:translate-x-1" : "group-hover:rotate-45"} transform transition-all duration-300 z-10`}
          />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-[#ee6983] to-[#850e35] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-[#fff5e4] transition-colors" />
      </div>
    </button>
  </a>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Network & Telecom Student", "Tech Enthusiast"];
const TECH_STACK = ["React", "Javascript", "Node.js", "Tailwind"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/SilfaSalsaBilaPutri" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/silfa-salsa-bila-putri-526453343" },
  { icon: Instagram, link: "https://www.instagram.com/silfa.sbp?igsh=cGkzZGNhaWRkb29l" },
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const initAOS = () => {
      AOS.init({ once: true, offset: 10 });
    };
    initAOS();
    window.addEventListener("resize", initAOS);
    return () => window.removeEventListener("resize", initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED,
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  return (
    <div
      className="min-h-screen bg-[#1a0b12] overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%]"
      id="Home"
    >
      <div
        className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <div className="container mx-auto min-h-screen">
          <div className="flex flex-col lg:flex-row items-center justify-center h-screen md:justify-between gap-0 sm:gap-12 lg:gap-20">
            {/* LEFT */}
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left">
              <StatusBadge />
              <MainTitle />

              <div className="h-8 flex items-center">
                <span className="text-xl md:text-2xl bg-gradient-to-r from-[#fff5e4] to-[#ffc4c4] bg-clip-text text-transparent font-light">
                  {text}
                </span>
                <span className="w-[3px] h-6 bg-gradient-to-t from-[#ee6983] to-[#850e35] ml-1 animate-blink"></span>
              </div>

              <p className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-light">
                Membangun Aplikasi dan Sistem yang Efisien, Inovatif, dan
                Scalable untuk Solusi Digital.
              </p>

              <div className="flex flex-wrap gap-3">
                {TECH_STACK.map((tech, i) => (
                  <TechStack key={i} tech={tech} />
                ))}
              </div>

              <div className="flex gap-3">
                <CTAButton
                  href="#Portofolio"
                  text="Projects"
                  icon={ExternalLink}
                />
                <CTAButton href="#Contact" text="Contact" icon={Mail} />
              </div>

              <div className="hidden sm:flex gap-4">
                {SOCIAL_LINKS.map((s, i) => (
                  <SocialLink key={i} {...s} />
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="w-full lg:w-1/2 h-[260px] sm:h-[400px] lg:h-[600px] flex items-center justify-center relative">
              {/* Aura / Glow di belakang ilustrasi (tanpa kotak besar) */}
              <div className="absolute inset-0 z-0 hidden sm:block">
                <div className="absolute top-10 left-10 w-48 h-48 bg-[#850e35]/40 rounded-full blur-3xl animate-spin-slow" />
                <div className="absolute bottom-20 right-5 w-56 h-56 bg-[#ffc4c4]/30 rounded-full blur-2xl animate-pulse-slow" />
                <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-[#ee6983]/25 rounded-full blur-2xl animate-float -translate-x-1/2 -translate-y-1/2" />
              </div>

              {/* Animated Gradient Blobs di pojok */}
              <span className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-r from-[#850e35] via-[#ee6983] to-[#ffc4c4] rounded-full filter blur-3xl animate-blob animation-delay-2000 opacity-70 z-0"></span>
              <span className="absolute bottom-10 right-5 w-40 h-40 bg-gradient-to-r from-[#ffc4c4] via-[#ee6983] to-[#fff5e4] rounded-full filter blur-2xl animate-blob animation-delay-4000 opacity-60 z-0"></span>

              {/* Gambar ilustrasi */}
              <div className="relative w-full h-full z-10 rounded-xl overflow-hidden shadow-[0_0_60px_rgba(238,105,131,0.35)] transform transition-all duration-700 hover:scale-105">
                <img
                  src="ilustrasiEngineer.png"
                  alt="Engineer Illustration"
                  className="w-full h-full object-contain transition-transform duration-700 hover:scale-110 hover:rotate-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
