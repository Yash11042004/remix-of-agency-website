export interface Project {
  slug: string;
  image: string;
  title: string;
  location: string;
  year: string;
  description: string;
  category: string;
  area: string;
  duration: string;
  services: string[];
  challenge: string;
  approach: string;
  outcome: string;
  gallery: string[];
}

export const projects: Project[] = [
  {
    slug: "project-kiosk",
    image: "https://api.builder.io/api/v1/image/assets/20f31d2b4c414a48ac0232fce85f1621/a06c1e9db3259afd3fb03988140429da7a04bc1d?placeholderIfAbsent=true",
    title: "Project Kiosk",
    location: "Copenhagen",
    year: "2025",
    description: "Modern café designed for everyday rituals.",
    category: "Commercial / Hospitality",
    area: "85 m²",
    duration: "4 months",
    services: ["Interior Architecture", "Furniture Selection", "Lighting Design"],
    challenge: "The client approached us with a narrow, deep retail space in Copenhagen's bustling Vesterbro district. The challenge was to create a café that could accommodate high foot traffic during peak hours while maintaining an intimate atmosphere for those who wished to linger. The existing layout felt disconnected, with poor natural light penetration and no clear visual identity.",
    approach: "We began by stripping the space back to its essentials, exposing the original brickwork and ceiling beams. A custom terrazzo counter became the focal point, its warm aggregate tones echoing the building's heritage. We introduced a series of brass pendant lights at varying heights to draw the eye through the space and create zones of varying intimacy. The material palette—oak, brushed brass, and handmade ceramic tiles—was chosen to age gracefully with daily use.",
    outcome: "The completed space has become a neighborhood institution within its first six months. The design successfully balances efficiency with atmosphere, allowing the café to serve over 200 customers daily while regulars still find their preferred corners. The project was featured in Dezeen and nominated for the Danish Design Award.",
    gallery: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80",
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&q=80"
    ]
  },
  {
    slug: "open-plan-studio",
    image: "https://api.builder.io/api/v1/image/assets/20f31d2b4c414a48ac0232fce85f1621/ceaf299cf903ef3e721a937a48357fcda5695941?placeholderIfAbsent=true",
    title: "Open Plan Studio",
    location: "Zurich",
    year: "2025",
    description: "Co-working space for focus and openness.",
    category: "Commercial / Workspace",
    area: "340 m²",
    duration: "6 months",
    services: ["Spatial Planning", "Acoustic Design", "Custom Furniture"],
    challenge: "A growing architecture collective needed a workspace that could accommodate twelve permanent members while hosting visiting collaborators. The existing industrial loft offered generous proportions but suffered from echo problems and a lack of defined work zones. The team wanted to preserve the open character while creating moments of privacy for focused work and client meetings.",
    approach: "Rather than partition the space conventionally, we developed a system of freestanding acoustic panels wrapped in natural felt. These elements can be repositioned as the team's needs evolve. We designed custom desks with integrated cable management and personal storage, arranged in clusters that encourage collaboration while respecting individual territory. A sunken meeting area near the windows provides separation without walls.",
    outcome: "The studio has reported a 40% increase in productivity since moving into the redesigned space. The flexible system has already been reconfigured twice for different project phases. The acoustic treatment reduced ambient noise by 60%, and the space has been featured in several workplace design publications as a model for post-pandemic office thinking.",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800&q=80",
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&q=80"
    ]
  },
  {
    slug: "apartment-m",
    image: "https://api.builder.io/api/v1/image/assets/20f31d2b4c414a48ac0232fce85f1621/d70610dc0afcf1ceb8b34d21873d78b8c5d70576?placeholderIfAbsent=true",
    title: "Apartment M",
    location: "Zurich",
    year: "2025",
    description: "Compact living concept.",
    category: "Residential",
    area: "52 m²",
    duration: "3 months",
    services: ["Interior Architecture", "Built-in Furniture", "Material Sourcing"],
    challenge: "A young professional purchased a compact apartment in Zurich's Kreis 4 district and needed to maximize every square centimeter. The space had potential—high ceilings and a south-facing window—but the previous layout wasted floor area with awkward circulation paths. The client requested room for a home office, guest accommodation, and generous kitchen storage.",
    approach: "We developed a strategy of concealment and transformation. A wall of floor-to-ceiling joinery contains the kitchen, storage, a fold-down desk, and a Murphy bed for guests. When closed, the wall presents as a minimal oak surface. The bathroom was reconfigured to open the shower area visually, using a frameless glass partition. We specified materials that reflect light—polished concrete, white lacquer, brushed stainless steel—to amplify the sense of space.",
    outcome: "The apartment now functions as effectively as spaces twice its size. The client has hosted dinner parties for eight and accommodated visiting family without compromise. The project demonstrates that thoughtful design can liberate small spaces from their limitations. It was published in Architectural Digest Switzerland's 'Small Spaces' feature.",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80"
    ]
  },
  {
    slug: "private-volume",
    image: "https://api.builder.io/api/v1/image/assets/20f31d2b4c414a48ac0232fce85f1621/714bab90fb9e804d18d58c5c2acbf4c13fbf2b03?placeholderIfAbsent=true",
    title: "Private Volume",
    location: "Berlin",
    year: "2025",
    description: "Reduced bedroom centred on rest and warmth.",
    category: "Residential",
    area: "28 m²",
    duration: "2 months",
    services: ["Interior Design", "Lighting Design", "Textile Curation"],
    challenge: "The clients—a couple working in creative industries—found their sleep quality deteriorating in their Berlin apartment. Their bedroom had become a catch-all space, cluttered with work materials and electronics. They asked us to create a sanctuary focused entirely on rest, separate from the demands of their professional lives.",
    approach: "We began by establishing strict boundaries: no screens, no work surfaces, no overhead lighting. The room was reconceived around the bed, which we positioned to face the morning light. We specified natural materials throughout—linen bedding, wool carpeting, oak wall paneling with subtle acoustic properties. Lighting is provided exclusively by dimmable wall sconces and a single floor lamp with a warm color temperature. Storage is hidden behind fabric-wrapped panels.",
    outcome: "The clients report significantly improved sleep quality and describe the room as the most restful space they've ever inhabited. The project has become a reference for our approach to wellness-focused design. The bedroom was featured in a case study on restorative environments by the German Sleep Research Society.",
    gallery: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
      "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800&q=80"
    ]
  }
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};
