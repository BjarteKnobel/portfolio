export const projects = [
  {
    id: 1,
    title: 'sverresborg ferieleiligheter',
    image: '/assets/floorplan1.jpg',
    type: 'transformation',
    location: 'sverresborg alle 13',
    status: 'student project',
    fullDescription: `The project aims to transform traditional log constructions into contemporary weekend apartments. A key focus is the preservation of the buildings' historic character, while sensitively integrating essential modern amenities. By introducing a centralized wet core on each floor, all technical infrastructure can be discreetly routed through the existing floor structures. This approach minimizes interventions in the original timber construction and ensures that decorative interior surfaces are preserved and optimally exposed. The solution effectively accommodates essential living spaces—including kitchen, bathroom, master bedroom, and flexible living areas—without requiring extensive or permanent alterations to the historic fabric.`,
    description: `Traditional log constructions transformed into contemporary weekend apartments while preserving historic character.`,
    floorPlan: '/assets/render_sverresborg_ferieleiligheter.png',
    details: [
      { label: 'type', value: 'transformation' },
      { label: 'location', value: 'sverresborg alle 13' },
      { label: 'status', value: 'student project' },
      { label: 'size', value: '200 sqm' },
      { label: 'date', value: '2020' },
      { label: 'collaborators', value: 'none' },
    ],
    gallery: [
      '/assets/floorplan1.jpg',
      '/assets/render_sverresborg_ferieleiligheter.png'
    ]
  },
  {
    id: 2,
    title: 'additiv manufacturing',
    image: '/assets/3d_printing_hero.png',
    type: 'research',
    location: 'trondheim',
    status: 'completed',
    fullDescription: `My master's thesis was carried out in collaboration with Sintef and the Norwegian Defence Estates Agency (Forsvarsbygg), and aimed to conduct a feasibility study as well as realize Norway's first construction built using 3D printing technology (3DCP). The construction industry is currently facing significant challenges, including stagnating productivity, rising construction costs, and shortages of labor and resources. This calls for radical rethinking of how we build. By using 3D printing technology, architects can challenge traditional material and design choices, optimize design processes, and take the lead in the transition to more sustainable, innovative, and efficient construction methods.`,
    description: `Norway's first construction built using 3D printing technology in collaboration with Sintef.`,
    floorPlan: '/assets/3d_printing_diagram.png',
    details: [
      { label: 'type', value: 'research' },
      { label: 'location', value: 'trondheim' },
      { label: 'status', value: 'completed' },
      { label: 'size', value: '200 sqm' },
      { label: 'date', value: '2020' },
      { label: 'collaborators', value: 'sintef' },
    ],
    gallery: [
      '/assets/3d_printing_hero.png',
      '/assets/3d_printing_diagram.png'
    ]
  },
  {
    id: 3,
    title: 'sit student housing',
    image: '/assets/p13_7 - Photo-2-kopi 2 2.png',
    type: 'public architecture',
    location: 'bymarka forest',
    status: 'completed',
    fullDescription: `A minimal intervention in the forest landscape that serves as both shelter and observation platform. The structure emerges from the topography using locally sourced materials and traditional joinery techniques. The pavilion creates framed views of the surrounding landscape while providing gathering space for outdoor education programs. Construction details prioritize disassembly and minimal site impact, with all materials selected for weathering and biodegradability. The project demonstrates how contemporary architecture can enhance rather than dominate natural settings.`,
    description: `Minimal forest intervention serving as shelter and observation platform using local materials.`,
    floorPlan: '/assets/floor_plan.jpg',
    details: [
      { label: 'type', value: 'public architecture' },
      { label: 'location', value: 'bymarka forest' },
      { label: 'status', value: 'completed' },
      { label: 'size', value: '85 sqm' },
      { label: 'date', value: '2023' },
      { label: 'collaborators', value: 'landscape collective' },
    ],
    gallery: [
      '/assets/p13_7 - Photo-2-kopi 2 2.png',
      '/assets/floor_plan.jpg'
    ]
  },
  {
    id: 4,
    title: 'project 4',
    image: '/assets/project_4.png',
    type: 'TBD',
    location: 'TBD',
    status: 'TBD',
    fullDescription: `Project description to be added...`,
    description: `Project description to be added...`,
    floorPlan: '/assets/project_4.png',
    details: [
      { label: 'type', value: 'TBD' },
      { label: 'location', value: 'TBD' },
      { label: 'status', value: 'TBD' },
      { label: 'size', value: 'TBD' },
      { label: 'date', value: 'TBD' },
      { label: 'collaborators', value: 'TBD' },
    ],
    gallery: [
      '/assets/project_4.png'
    ]
  },
  
];

export const getProjectById = (id) => {
  return projects.find(project => project.id === id);
};

export const getAllProjects = () => {
  return projects;
}; 