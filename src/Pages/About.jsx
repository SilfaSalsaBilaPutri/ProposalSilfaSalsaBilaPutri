import React, { useEffect, memo, useMemo } from "react";
import {
  FileText,
  Code,
  Award,
  Globe,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Memoized Components
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#850e35] to-[#ee6983]"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-[#ee6983]" />
      Transforming ideas into reliable and secure digital systems
      <Sparkles className="w-5 h-5 text-[#ee6983]" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div className="relative group" data-aos="fade-up" data-aos-duration="1000">
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-[#850e35] via-[#ee6983] to-[#ffc4c4] rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#ee6983] via-[#ffc4c4] to-[#850e35] rounded-full blur-2xl animate-pulse-slow opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#850e35] via-[#ee6983] to-[#ffc4c4] rounded-full blur-2xl animate-float opacity-50" />
      </div>

      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(238,105,131,0.35)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />

          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#ee6983]/20 via-transparent to-[#850e35]/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />

          <img
            src="/Silfa.jpg"
            alt="Profile"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
));

const StatCard = memo(
  ({ icon: Icon, color, value, label, description, animation }) => (
    <div
      data-aos={animation}
      data-aos-duration={1300}
      className="relative group"
    >
      <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
        <div
          className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
        />

        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
            <Icon className="w-8 h-8 text-[#fff5e4]" />
          </div>
          <span className="text-4xl font-bold text-[#fff5e4]">{value}</span>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wider text-gray-300 mb-2">
            {label}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">{description}</p>
            <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-[#fff5e4] transition-colors" />
          </div>
        </div>
      </div>
    </div>
  ),
);

const AboutPage = () => {
  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const storedCertificates = JSON.parse(
      localStorage.getItem("certificates") || "[]",
    );

    const startDate = new Date("2021-11-06");
    const today = new Date();
    const experience =
      today.getFullYear() -
      startDate.getFullYear() -
      (today <
      new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate())
        ? 1
        : 0);

    return {
      totalProjects: storedProjects.length,
      totalCertificates: storedCertificates.length,
    };
  }, []);

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const statsData = useMemo(
    () => [
      {
        icon: Code,
        color: "from-[#850e35] to-[#ee6983]",
        value: totalProjects,
        label: "Total Projects",
        description: "Innovative web solutions crafted",
        animation: "fade-right",
      },
      {
        icon: Award,
        color: "from-[#ee6983] to-[#850e35]",
        value: totalCertificates,
        label: "Certificates",
        description: "Professional skills validated",
        animation: "fade-up",
      },
    ],
    [totalProjects, totalCertificates],
  );

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0"
      id="About"
    >
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#850e35] to-[#ee6983]">
                Hello, I'm
              </span>
              <span className="block mt-2 text-gray-200">
                Silfa Salsa Bila Putri
              </span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify">
              Mahasiswa Teknik Informatika semester 6 yang tertarik pada
              pengembangan sistem, keamanan data, dan aplikasi mobile/web. Saya
              terbiasa menangani proyek end-to-end mulai dari perancangan,
              implementasi, hingga dokumentasi. Fokus saya adalah menciptakan
              solusi digital yang andal, aman, dan scalable.
            </p>

            <div className="relative bg-gradient-to-br from-[#850e35]/5 via-transparent to-[#ee6983]/5 border border-[#ee6983]/30 rounded-2xl p-4 my-6 backdrop-blur-md shadow-2xl">
              <blockquote className="text-gray-300 italic text-sm">
                "Engineering solutions that are reliable, secure, and
                user-centric."
              </blockquote>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <a
                href="/CV_ATS_SilfaSalsaBilaPutri.pdf" // path ke file di public
                download // bikin langsung download
                className="sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#850e35] to-[#ee6983] text-white font-medium hover:scale-105 transition flex items-center gap-2"
              >
                <FileText className="w-4 h-4 inline mr-2" /> Download CV
              </a>

              <a
                href="#Portofolio" // scroll ke section Portofolio
                className="sm:px-6 py-2 sm:py-3 rounded-lg border border-[#ee6983]/50 text-[#ee6983] hover:bg-[#ee6983]/10 transition flex items-center gap-2"
              >
                <Code className="w-4 h-4 inline mr-2" /> View Projects
              </a>
            </div>
          </div>

          <ProfileImage />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {statsData.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(AboutPage);
