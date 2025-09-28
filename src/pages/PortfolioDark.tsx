import { ModeToggle } from "@/components/mode-toggle"
import { useEffect, useRef, useState } from "react"

export default function PortfolioDark() {
  // const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  // useEffect(() => {
  //   document.documentElement.classList.toggle("dark", isDark)
  // }, [isDark])

  //tracker and observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { //array of elements that changed their intersection status
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up") //CSS class
            setActiveSection(entry.target.id) // (for the navigation dots)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])
  
  //smooth scroll to section
   const scrollToSection = (sectionId: string) => {
document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
 }

 

  const heroData = {
    metaTitle: "PORTFOLIO | 2025",
    name: "Seth Hendrikz",
    title: "BSc Computing Graduate",
    location: "Hillcrest, Durban, KZN",
    email: "seth.hendrikz@gmail.com",
    phone: "(081) 260 6055",
    website: "www.sethswork.shop",
    duration: "2022 — Present",
    currentEmployer: "@ Curro Hillcrest High School",
    currentRole: "Recent BSc Computing Graduate and IT Facilitator",
    focusSkills: ["Java", "SQL", "HTML", "React", "JavaScript", "Spring Boot", "APIs"],
    about: "Aspiring Full Stack Developer. Recently graduated with a BSc in Computing. Eager to contribute to innovative projects and further develop my skills in a dynamic tech environment.",
  }

  const workExperiences = [
    {
      year: "2022",
      role: "IT, Coding & Robotics Facilitator",
      company: "Curro Hillcrest High School",
      description: "Leading transition from traditional classroom to online learning. Teaching Java and SQL, maintaining hardware/software, and supporting digital platform adoption.",
      tech: ["Java", "SQL", "Moodle", "Canvas"],
    },
    {
      year: "2021",
      role: "Rugby and Sports Coach",
      company: "Curro High School",
      description: "Fostering athletic skills and promoting teamwork through training programmes that enhance physical abilities and strategic understanding.",
      tech: ["Leadership", "Team Management", "Training"],
    },
    {
      year: "2018",
      role: "Junior Manager, Waiter, Barista",
      company: "The View Cafe, Bothas Hill",
      description: "Multifaceted role requiring leadership skills and customer service expertise to ensure positive customer experiences.",
      tech: ["Management", "Customer Service", "Operations"],
    },
  ]

  const recentProjects = [
    {
      title: "Digital Learning Transition",
      excerpt: "Successfully guided the transition from traditional classroom settings to online learning platforms at Curro High School.",
      date: "2024",
      readTime: "Case Study",
    },
    {
      title: "Programming Curriculum Development",
      excerpt: "Developed and delivered Java and SQL curriculum for high school students, making complex concepts accessible.",
      date: "2023",
      readTime: "Educational",
    },
    {
      title: "Google Ads Mastery",
      excerpt: "Currently completing comprehensive Google Ads Masterclass on Udemy to expand digital marketing expertise.",
      date: "2025",
      readTime: "In Progress",
    },
    {
      title: "Full Stack Development Journey",
      excerpt: "Building expertise in modern web technologies including React, Node.js, and database management systems.",
      date: "Ongoing",
      readTime: "Learning",
    },
  ]

  const socialLinks = [
    { name: "LinkedIn", handle: "seth-hendrikz", url: "https://linkedin.com/in/seth-hendrikz/" },
    { name: "Portfolio", handle: "sethswork.shop", url: "https://www.sethswork.shop" },
    { name: "Email", handle: "seth.hendrikz@gmail.com", url: "mailto:seth.hendrikz@gmail.com" },
    { name: "Phone", handle: "(081) 260 6055", url: "tel:+27812606055" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Dotted Grid Overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(156, 163, 175, 0.3) 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0",
        }}
      />
      {/* paginiation buttons */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "experience", "discoveries", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`w-2 h-8 rounded-full transition-all duration-500  ${activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 ">
        <header
          id="intro"
          ref={(el) => { sectionsRef.current[0] = el }}
          className="min-h-screen flex items-center opacity-0 -mt-8"
        >

          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">{heroData.metaTitle}</div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  {heroData.name.substring(0, heroData.name.indexOf(" ") + 1)}
                  <br />
                  <span className="text-muted-foreground">{heroData.name.substring(heroData.name.indexOf(" ") + 1)}</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  {heroData.about}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for work
                  </div>
                  <div>{heroData.location}</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-foreground">{heroData.currentRole}</div>
                  <div className="text-muted-foreground">{heroData.currentEmployer}</div>
                  <div className="text-xs text-muted-foreground">{heroData.duration}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
                  {heroData.focusSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </header>

        <section
          id="experience"
          ref={(el) => { sectionsRef.current[1] = el }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Work Experience</h2>
              <div className="text-sm text-muted-foreground font-mono">{workExperiences[0].year} - {workExperiences[workExperiences.length - 1].year} </div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {workExperiences.map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                      <div className="text-muted-foreground">{job.company}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="discoveries"
          ref={(el) => { sectionsRef.current[2] = el }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Recent Discoveries and Projects</h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {recentProjects.map((post, index) => (
                <article
                  key={index}
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <span>Read more</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="connect" ref={(el) => { sectionsRef.current[3] = el }} className="py-20 sm:py-32 opacity-0">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Get Connected</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  I'm always open to discussing new opportunities, collaborations, or just connecting with like-minded professionals. Feel free to reach out via email or through the channels here.
                </p>

                <div className="space-y-4">
                  <a
                    href={`mailto:${heroData.email}`}
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">{heroData.email}</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm overflow-hidden"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© SethsWorkShop</div>
              <div className="text-xs text-muted-foreground">Built with React, Javascript, Vite and Springboot</div>
            </div>

            <div className="flex items-center gap-4">
              <ModeToggle />

              {/* <button className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button> */}
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}