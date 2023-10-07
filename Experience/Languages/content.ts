import * as Section from "./common.js";

const sections: { es: Section; en: Section }[] = [
  {
    es: Section.sectContent("Acerca de mi", [
      [
        "Formacion",
        "Soy un estudiante avanzado de la carrera de Ingenieria Informatica de la Universidad Nacional de Mar del Plata.",
        "Actualmente estoy trabajando en el proyecto final de carrera, el cual trata del desarrollo de una aplicacion movil parte del ecosistema de Past-Ar.",
      ],
      [
        "Perfil",
        "Soy un individuo altamente versátil con una fuerte capacidad de adaptación a nuevos desafíos y entornos laborales. Me motiva la solución de problemas y trabajar en equipo.",
        "Además, estoy siempre dispuesto a desarrollar mis habilidades y conocimientos a través de oportunidades de aprendizaje continuo.",
        "Mi objetivo es aplicar mis habilidades y experiencia en un ambiente desafiante y dinámico, para contribuir al éxito de la organización.",
        Section.link(
          "Descargar CV",
          "https://docs.google.com/document/d/1t58WQXp5FvzyUJOjjgcz6NojBMHfB8Cj/export?format=pdf"
        ),
      ],
    ]),

    en: Section.sectContent("About me", [
      [
        "Education",
        "I am an advanced student of the Software Engineering degree at the National University of Mar del Plata.",
        "I am currently working on my final project, which deals with the development of a mobile application part of the Past-Ar ecosystem.",
      ],
      [
        "Profile",
        "I am a highly versatile individual with a strong ability to adapt to new challenges and work environments. I am motivated by problem solving and working in a team.",
        "Additionally, I am always willing to develop my skills and knowledge through continuous learning opportunities.",
        "My goal is to apply my skills and experience in a challenging and dynamic environment, to contribute to the success of the organization.",
        Section.link(
          "Download CV",
          "https://docs.google.com/document/d/1jyjaNjgsLRNhbr0lNQJhJ0GG1gTLsqIX/export?format=pdf"
        ),
      ],
    ]),
  },

  {
    es: Section.sectContent("Conocimientos", [
      [
        "Herramientas",
        "JavaScript, Java, C, React, PostgreSQL, Docker, Git, Debian",
        "Tengo conocimientos y practica del uso de Node.js, Java, Git, Docker, PostgreSQL adquiridos mediante la Universidad",
        "Estoy familiarizado con sistemas GNU Linux, principalmente Debian cual utilizo cotidianamente",
        "He realizado cursos de React, Machine Learning y desarrollado una pagina como practica para afianzar conocimientos. La pagina se puede encontrar en mi repositorio de Git",
        Section.link("Git", "https://github.com/VeitchM"),
      ],
      [
        "Idiomas",
        "Ingles B2 y experiencia practica adquirida en el extranjero donde trabaje y vivi con\
        locales. Esto fue por medio de un work&travel en el 2019 en Colorado",
        "Frances, cuando tenia 17 años me fui de intercambio estudiante con el programa de\
        Rotary a un pais francofono donde vivi con una familia local y asisti al colegio del pueblo",
        "Aleman, A1 con ganas de continuar aprendiendo el idioma",
      ],
    ]),

    en: Section.sectContent("Skills", [
      [
        "Tools and Technology",
        "JavaScript, Java, C, React, PostgreSQL, Docker, Git, Debian",
        "I have knowledge and experience using Node.js, Java, Git, Docker, PostgreSQL acquired through the University",
        "I am familiar with GNU Linux systems, mainly Debian which I use daily",
        "I have taken courses in React, Machine Learning and developed a website as a practice to reinforce my knowledge. The website can be found in my Git repository",
        Section.link("Git", "https://github.com/VeitchM"),
      ],
      [
        "Languages",
        "English B2 with practical experience acquired abroad where I worked and lived with\
locals. This was through a work & travel in 2019 in Colorado",
        "French, when I was 17 I went on a student exchange with the Rotary program to a\
French - speaking country where I lived with a local family and attended the local school",
        "German, A1 with a desire to continue learning the language",
      ],
    ]),
  },
  {
    es: Section.sectContent("Intereses", [
      [
        "Aprendizaje de Machine Learning",
        "Estoy muy interesado en el campo del Machine Learning y actualmente estoy dedicando tiempo a su estudio.",
        "A principios de 2023, comencé a tomar cursos para comprender las redes neuronales profundas (DNN), las redes neuronales convolutionales (CNN) y el uso práctico de TensorFlow.",
        "Hasta ahora he completado el curso provisto por FreeCodeCamp de Machine Learning con Python",
        Section.link(
          "Certificado de FreeCodeCamp",
          "https://www.freecodecamp.org/certification/fcc630df60e-4a43-4c1a-b035-69b001883eb1/machine-learning-with-python-v7"
        ),
      ],

      [
        "Blender",
        "A los 15 años comenzar a utilizar herramientas de modelado 3D y desde entonces he\
            hecho un cercano seguimiento respecto a las tecnologias para la generacion de imagenes por computadora",
        "En este seguimiento he aprendido habilidades utiles como el modelado, renderizado,\
            animacion, rigging, simulacion, mapeo de texturas y creacion de shaders en blender.",
        "Todos los objetos de esta pagina los he hecho en blender. ",
      ],
      [
        "Godot",
        "He aprendido por cuenta propia y comenzado a desarrollar con fines didacticos un\
            videojuego con modo LAN funcional, graficos 3D y animaciones implementadas, actualmente el proyecto esta\
            pausado por ordenamiento de prioridades.",
      ],
    ]),

    en: Section.sectContent("Interests", [
      [
        "Machine Learning",
        "I am currently highly interested in Machine Learning and its applications",
        "In early 2023, I started taking courses to gain a deeper understanding of DNNs, CNNs, and practical use of TensorFlow",
        "So far, I have completed the Machine Learning with Python course provided by FreeCodeCamp",
        Section.link(
          "FreeCodeCamp Certificate",
          "https://www.freecodecamp.org/certification/fcc630df60e-4a43-4c1a-b035-69b001883eb1/machine-learning-with-python-v7"
        ),
      ],

      [
        "Blender",
        "I started using 3D modeling tools at the age of 15, and since then I have been closely following the technologies for computer-generated images",
        "Through my interest in this field, I have learned useful skills such as modeling, rendering, animation, rigging, simulation, texture mapping, and shader creation in Blender",
        "All of the objects on this website were created by me using Blender.",
      ],

      [
        "Godot",
        "I have self-taught myself and started developing a LAN functional video game with 3D graphics and implemented animations, currently the project is on hold due to prioritization.",
      ],
    ]),
  },
  {
    es: Section.sectContent("Desarrollo movil", [
      [
        "Proyecto Pastech",
        "Durante mi trabajo final en la carrera de Ingeniería Informática, participé activamente en el desarrollo de una aplicación móvil diseñada para el control de pasturas.",
        "En este proyecto, desempeñé un rol integral que incluyó tareas de análisis, diseño y desarrollo, trabajando en estrecha colaboración con un compañero de equipo.",
        "Entre las destacadas funcionalidades de esta aplicación se encuentra la capacidad de establecer comunicación vía Bluetooth con un dispositivo específico diseñado para la medición de pastizales, un sistema de filtrado y presentación de datos, así como la interacción con un servidor backend que ofrece una API REST con autenticación y administración de roles.",
        "Este proyecto marcó el comienzo de mi aprendizaje en React Native, así como el dominio de las herramientas proporcionadas por el framework Expo."
    ],

    [
      "Desarrollo para la compañía Lyrtron",
      "En este proyecto, asumí la responsabilidad de diseñar la arquitectura y llevar a cabo la codificación de una aplicación móvil.",
      "Fue una experiencia sumamente enriquecedora que me permitió ampliar mis conocimientos técnicos, haciendo uso de librerías como react-native-skia para la creación de gráficos y tablaspersonalizados, Firebase/Firestore para la autenticación y gestión de bases de datos en la nube, y react-native-ble-plx para habilitar la comunicación Bluetooth.",
      "Además, tuve la oportunidad de colaborar estrechamente con un diseñador de UX/UI, lo que me brindó una valiosa perspectiva sobre la importancia de la colaboración y la comunicación efectiva en el proceso de desarrollo."
  ],
    ]),

    en: Section.sectContent("Mobile Development", [
      [
          "Pastech Project",
          "During my final project in the Computer Engineering program, I actively participated in the development of a mobile application designed for pasture control.",
          "In this project, I played a comprehensive role that included tasks related to analysis, design, and development, working closely with a team colleague.",
          "Among the notable features of this application is the ability to establish Bluetooth communication with a specific device designed for pasture measurement, a data filtering and presentation system, as well as interaction with a backend server that offers a REST API with authentication and role management.",
          "This project marked the beginning of my learning journey with React Native, as well as mastery of the tools provided by the Expo framework."
      ],
  
      [
        "Development for Lyrtron Company",
        "In this project, I assumed the responsibility of designing the architecture and carrying out the coding of a mobile application.",
        "It was an extremely enriching experience that allowed me to expand my technical knowledge, making use of libraries such as react-native-skia for creating custom charts, Firebase/Firestore for authentication and cloud database management, and react-native-ble-plx to enable Bluetooth communication.",
        "Furthermore, I had the opportunity to collaborate closely with a UX/UI designer, which provided me with valuable insights into the importance of collaboration and effective communication in the development process."
    ],
      ])
  
  },

  {
    es: Section.sectContent("Desarrollo Web", [
      [
        "Sobre esta pagina",
        "Se desarrollo una aplicacion en el marco de la wadw del ambito agropecuario",
        "A principios de 2023, comencé a tomar cursos para comprender las redes neuronales profundas (DNN), las redes neuronales convolutionales (CNN) y el uso práctico de TensorFlow.",
        "Las tecnologias utilizas han sido react, three.js/fiber three dei y framer motion",
      ],

      [
        "Desarrollo para la compañia Lyrtron",
        "A los 15 años comenzar a utilizar herramientas de modelado 3D y desde entonces he\
            hecho un cercano seguimiento respecto a las tecnologias para la generacion de imagenes por computadora",
        "ÇÇÇMostrar iFRAME del lo que hay de la compañia actualmenteÇÇÇ\
            animacion, rigging, simulacion, mapeo de texturas y creacion de shaders en blender.",
        "Todos los objetos de esta pagina los he hecho en blender. ",
      ],
    ]),

    en: Section.sectContent("Work", [
      [
        "Machine Learning",
        "I am currently highly interested in Machine Learning and its applications",
        "In early 2023, I started taking courses to gain a deeper understanding of DNNs, CNNs, and practical use of TensorFlow",
        "So far, I have completed the Machine Learning with Python course provided by FreeCodeCamp",
        Section.link(
          "FreeCodeCamp Certificate",
          "https://www.freecodecamp.org/certification/fcc630df60e-4a43-4c1a-b035-69b001883eb1/machine-learning-with-python-v7"
        ),
      ],

      [
        "Blender",
        "I started using 3D modeling tools at the age of 15, and since then I have been closely following the technologies for computer-generated images",
        "Through my interest in this field, I have learned useful skills such as modeling, rendering, animation, rigging, simulation, texture mapping, and shader creation in Blender",
        "All of the objects on this website were created by me using Blender.",
      ],

      [
        "Godot",
        "I have self-taught myself and started developing a LAN functional video game with 3D graphics and implemented animations, currently the project is on hold due to prioritization.",
      ],
    ]),
  },
];

export default sections;
