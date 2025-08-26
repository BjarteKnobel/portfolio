export const projects = [
  {
    id: 1,
    title: 'sverresborg apartments',
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
    title: 'skippergata 11',
    image: '/assets/skippergata_11.png',
    type: 'commercial real estate',
    location: 'skippergata 11',
    status: 'student project',
    fullDescription: `The project is located at Nyhavna–Trondheim’s historic industrial waterfront—and integrates vertical textile production with retail and office programs. By deploying innovative manufacturing methods, it reduces environmental impact while opening new avenues for sustainable urban and workplace development. The project investigates architecture’s capacity to cultivate compact, flexible work environments.`,
    description: `Vertical textile production integrated with retail and office at Nyhavna, Trondheim.`,
    floorPlan: '/assets/3d_printing_diagram.png',
    details: [
      { label: 'type', value: 'commercial real estate' },
      { label: 'location', value: 'skippergata 11' },
      { label: 'status', value: 'student project' },
      { label: 'size', value: '200 sqm' },
      { label: 'date', value: '2020' },
      { label: 'collaborators', value: '—' },
    ],
    gallery: [
      '/assets/skippergata_11.png',
      '/assets/3d_printing_diagram.png'
    ]
  },
  {
    id: 3,
    title: 'moholt studenthousing',
    image: '/assets/moholt_student_housing.png',
    imageWidth: 677,
    imageHeight: 769,
    type: 'sustainable architecture',
    location: 'sverresborg alle 13',
    status: 'student project',
    fullDescription: `Developed as part of a Master's in Sustainable Architecture, the student housing project at Moholt Studentby in Trondheim targets a significant reduction in energy demand through passive design strategies calibrated to a temperate oceanic (Cfb) climate. Local climatic constraints inform an architectural response that minimises reliance on active space heating. The proposal reduces heat loss through a compact, energy-efficient massing strategy; locates high heat-load spaces where solar access is optimal; and leverages thermal mass to amplify passive gains. Parametric evaluation in Grasshopper underpins the bioclimatic optimisation and verifies compliance with the selected Passive House standards.`,
    description: `Sustainable student housing at Moholt Studentby using passive design strategies for energy efficiency.`,
    floorPlan: '/assets/floor_plan.jpg',
    details: [
      { label: 'type', value: 'sustainable architecture' },
      { label: 'location', value: 'sverresborg alle 13' },
      { label: 'status', value: 'student project' },
      { label: 'size', value: '85 sqm' },
      { label: 'date', value: '2023' },
      { label: 'collaborators', value: 'landscape collective' },
    ],
    gallery: [
      '/assets/moholt_student_housing.png',
      '/assets/floor_plan.jpg'
    ]
  },
  {
    id: 4,
    title: 'additiv',
    image: '/assets/additiv.png',
    type: 'building technology',
    location: 'n/a',
    status: 'master thesis',
    fullDescription: `My master's thesis was carried out in collaboration with SINTEF and the Norwegian Defence Estates Agency (Forsvarsbygg), and aimed to conduct a feasibility study as well as realize Norway's first structure built using 3D-printing technology (3DCP).

The construction sector faces significant challenges—stagnant productivity, rising building costs, and labor/resource shortages—that demand a radical rethink of how we build. By using 3D-printing technology, architects can challenge traditional material and design choices, optimize design processes, and lead the transition to more sustainable, innovative, and efficient construction methods.`,
    description: `Feasibility study toward Norway's first 3D-printed structure (3DCP).`,
    floorPlan: '/assets/additiv.png',
    details: [
      { label: 'type', value: 'building technology' },
      { label: 'location', value: 'n/a' },
      { label: 'status', value: 'master thesis' }
    ],
    gallery: [
      '/assets/additiv.png'
    ]
  },
  
];

export const getProjectById = (id) => {
  return projects.find(project => project.id === id);
};

export const getAllProjects = () => {
  return projects;
}; 