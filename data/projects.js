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
    id: 'urban-density-housing',
    title: 'urban density housing',
    image: '/assets/project1.jpg',
    details: [
      { label: 'type', value: 'new construction' },
      { label: 'location', value: 'bakklandet, trondheim' },
      { label: 'status', value: 'concept phase' },
      { label: 'size', value: '1,200 sqm' },
      { label: 'date', value: '2024' },
      { label: 'collaborators', value: 'urban planning lab' },
    ],
    description: `A response to increasing urban density demands while maintaining neighborhood character. The project explores vertical densification through carefully positioned modular units that preserve existing sightlines and maintain human scale. Each residential unit features private outdoor space and shared communal areas, creating a gradient from private to public space. The design integrates passive environmental strategies including natural ventilation, daylight optimization, and rainwater management. Material choices emphasize local timber construction with contemporary detailing, creating dialogue between traditional Trondheim architecture and modern living needs.`,
    floorplan: '/assets/floorplan1.jpg',
    gallery: [
      '/assets/project1.jpg',
      '/assets/floorplan1.jpg'
    ]
  },
  {
    id: 'landscape-pavilion',
    title: 'landscape pavilion',
    image: '/assets/cabin_interior.jpg',
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
      '/assets/cabin_interior.jpg',
      '/assets/floor_plan.jpg'
    ]
  }
];

export const getProjectById = (id) => {
  return projects.find(project => project.id === id);
};

export const getAllProjects = () => {
  return projects;
}; 