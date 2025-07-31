export const projects = [
  {
    id: 'sverresborg-ferieleiligheter',
    title: 'sverresborg ferieleiligheter',
    image: '/assets/cabin_interior.jpg',
    details: [
      { label: 'type', value: 'transformation' },
      { label: 'location', value: 'sverresborg alle 13' },
      { label: 'status', value: 'student project' },
      { label: 'size', value: '200 sqm' },
      { label: 'date', value: '2020' },
      { label: 'collaborators', value: 'none' },
    ],
    description: `The project aims to transform traditional log constructions into contemporary weekend apartments. A key focus is the preservation of the buildings' historic character, while sensitively integrating essential modern amenities. By introducing a centralized wet core on each floor, all technical infrastructure can be discreetly routed through the existing floor structures. This approach minimizes interventions in the original timber construction and ensures that decorative interior surfaces are preserved and optimally exposed. The solution effectively accommodates essential living spaces—including kitchen, bathroom, master bedroom, and flexible living areas—without requiring extensive or permanent alterations to the historic fabric.`,
    floorplan: '/assets/floor_plan.jpg',
    gallery: [
      '/assets/cabin_interior.jpg',
      '/assets/floor_plan.jpg'
    ]
  },
  {
    id: 'additiv-manufacturing',
    title: 'additiv manufacturing',
    image: '/assets/3d_printing_hero.png',
    details: [
      { label: 'type', value: 'transformation' },
      { label: 'location', value: 'sverresborg alle 13' },
      { label: 'status', value: 'student project' },
      { label: 'size', value: '200 sqm' },
      { label: 'date', value: '2020' },
      { label: 'collaborators', value: 'none' },
    ],
    description: `My master's thesis was carried out in collaboration with Sintef and the Norwegian Defence Estates Agency (Forsvarsbygg), and aimed to conduct a feasibility study as well as realize Norway's first construction built using 3D printing technology (3DCP). The construction industry is currently facing significant challenges, including stagnating productivity, rising construction costs, and shortages of labor and resources. This calls for radical rethinking of how we build. By using 3D printing technology, architects can challenge traditional material and design choices, optimize design processes, and take the lead in the transition to more sustainable, innovative, and efficient construction methods.`,
    floorplan: '/assets/3d_printing_diagram.png',
    gallery: [
      '/assets/3d_printing_hero.png',
      '/assets/3d_printing_diagram.png'
    ]
  },
  {
    id: 'landscape-pavilion',
    title: 'sit student housing',
    image: '/assets/p13_7 - Photo-2-kopi 2 2.png',
    details: [
      { label: 'type', value: 'public architecture' },
      { label: 'location', value: 'bymarka forest' },
      { label: 'status', value: 'completed' },
      { label: 'size', value: '85 sqm' },
      { label: 'date', value: '2023' },
      { label: 'collaborators', value: 'landscape collective' },
    ],
    description: `A minimal intervention in the forest landscape that serves as both shelter and observation platform. The structure emerges from the topography using locally sourced materials and traditional joinery techniques. The pavilion creates framed views of the surrounding landscape while providing gathering space for outdoor education programs. Construction details prioritize disassembly and minimal site impact, with all materials selected for weathering and biodegradability. The project demonstrates how contemporary architecture can enhance rather than dominate natural settings.`,
    floorplan: '/assets/floor_plan.jpg',
    gallery: [
      '/assets/p13_7 - Photo-2-kopi 2 2.png',
      '/assets/floor_plan.jpg'
    ]
  },
  {
    id: 'project-3',
    title: 'project 3',
    image: '/assets/project_4.png',
    details: [
      { label: 'type', value: 'TBD' },
      { label: 'location', value: 'TBD' },
      { label: 'status', value: 'TBD' },
      { label: 'size', value: 'TBD' },
      { label: 'date', value: 'TBD' },
      { label: 'collaborators', value: 'TBD' },
    ],
    description: `Project description to be added...`,
    floorplan: '/assets/project_4.png',
    gallery: [
      '/assets/project_4.png'
    ]
  }
];

export const getProjectById = (id) => {
  return projects.find(project => project.id === id);
};

export const getAllProjects = () => {
  return projects;
}; 