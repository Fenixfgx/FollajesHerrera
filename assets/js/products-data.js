// Base de datos de productos - Follajes Herrera
// Puedes agregar, modificar o eliminar productos fácilmente desde aquí

const productsDatabase = [
    {
        id: 1,
        name: {
            es: 'Pittosporum',
            en: 'Pittosporum'
        },
        scientificName: 'Pittosporum Tobira Variegata',
        sizes: [55, 60],
        image: 'assets/img/productos/shop/foliage (1).jpg',
        images: [
            'assets/img/productos/shop/foliage (1).jpg',
            'assets/img/productos/shop/foliage (1).jpg',
            'assets/img/productos/shop/foliage (1).jpg'
        ],
        description: {
            es: 'El Helecho Tropical es uno de los follajes más versátiles y populares en la industria floral. Sus frondas elegantes y exuberantes aportan textura y volumen a cualquier arreglo. Perfecto para bodas, eventos corporativos y decoración de interiores.',
            en: 'The Tropical Fern is one of the most versatile and popular foliages in the floral industry. Its elegant and lush fronds add texture and volume to any arrangement. Perfect for weddings, corporate events and interior decoration.'
        },
        characteristics: {
            es: [
                'Follaje de larga duración (7-14 días)',
                'Frondas delicadas y elegantes',
                'Ideal para arreglos florales y ramos',
                'Resistente al transporte',
                'Color verde intenso y brillante',
                'Cultivado en condiciones controladas'
            ],
            en: [
                'Long-lasting foliage (7-14 days)',
                'Delicate and elegant fronds',
                'Ideal for floral arrangements and bouquets',
                'Transport resistant',
                'Intense and bright green color',
                'Grown under controlled conditions'
            ]
        },
        translateKey: 'prod1_name'
    },
    {
        id: 2,
        name: {
            es: 'Ruscus',
            en: 'Italian Ruscus'
        },
        scientificName: 'Ruscus aculeatus',
        sizes: [50, 55, 60],
        image: 'assets/img/productos/shop/foliage (2).jpg',
        images: [
            'assets/img/productos/shop/foliage (2).jpg',
            'assets/img/productos/shop/foliage (2).jpg',
            'assets/img/productos/shop/foliage (2).jpg'
        ],
        description: {
            es: 'El Ruscus es un follaje premium muy apreciado en la industria floral internacional. Sus tallos flexibles y hojas brillantes lo hacen perfecto para dar estructura y elegancia a cualquier diseño. Extremadamente duradero y versátil.',
            en: 'Italian Ruscus is a premium foliage highly appreciated in the international floral industry. Its flexible stems and glossy leaves make it perfect for adding structure and elegance to any design. Extremely durable and versatile.'
        },
        characteristics: {
            es: [
                'Durabilidad excepcional (14-21 días)',
                'Tallos flexibles y manejables',
                'Hojas brillantes de color verde oscuro',
                'Perfecto para bouquets de lujo',
                'Resistente a condiciones adversas',
                'Exportación internacional premium'
            ],
            en: [
                'Exceptional durability (14-21 days)',
                'Flexible and manageable stems',
                'Glossy dark green leaves',
                'Perfect for luxury bouquets',
                'Resistant to adverse conditions',
                'Premium international export'
            ]
        },
        translateKey: 'prod2_name'
    },
    {
        id: 3,
        name: {
            es: 'Palma Robelina',
            en: 'Pygmy Date Palm'
        },
        scientificName: 'Phoenix roebelenii',
        sizes: [50, 55, 60],
        image: 'assets/img/productos/shop/foliage (3).jpg',
        images: [
            'assets/img/productos/shop/foliage (3).jpg',
            'assets/img/productos/shop/foliage (3).jpg',
            'assets/img/productos/shop/foliage (3).jpg'
        ],
        description: {
            es: 'La Palma Robelina ofrece un aspecto tropical y sofisticado. Sus frondas arqueadas y elegantes son ideales para crear diseños con altura y movimiento. Popular en eventos de alto perfil y decoración de espacios exclusivos.',
            en: 'The Pygmy Date Palm offers a tropical and sophisticated look. Its arched and elegant fronds are ideal for creating designs with height and movement. Popular in high-profile events and exclusive space decoration.'
        },
        characteristics: {
            es: [
                'Apariencia tropical elegante',
                'Frondas arqueadas naturalmente',
                'Múltiples tamaños disponibles',
                'Ideal para centros de mesa altos',
                'Duración de 10-15 días',
                'Textura suave y refinada'
            ],
            en: [
                'Elegant tropical appearance',
                'Naturally arched fronds',
                'Multiple sizes available',
                'Ideal for tall centerpieces',
                'Duration of 10-15 days',
                'Soft and refined texture'
            ]
        },
        translateKey: 'prod3_name'
    },
    {
        id: 4,
        name: {
            es: 'Cinta Liriope',
            en: 'Lilyturf'
        },
        scientificName: 'Liriope muscari',
        sizes: [50, 55, 60],
        image: 'assets/img/productos/shop/foliage (4).jpg',
        images: [
            'assets/img/productos/shop/foliage (4).jpg',
            'assets/img/productos/shop/foliage (4).jpg',
            'assets/img/productos/shop/foliage (4).jpg'
        ],
        description: {
            es: 'La Cinta Liriope aporta líneas limpias y modernas a los diseños florales. Sus hojas largas y estrechas crean movimiento y fluidez. Perfecta para diseños contemporáneos y minimalistas.',
            en: 'Lilyturf brings clean and modern lines to floral designs. Its long, narrow leaves create movement and fluidity. Perfect for contemporary and minimalist designs.'
        },
        characteristics: {
            es: [
                'Diseño lineal y moderno',
                'Hojas largas y flexibles',
                'Color verde vibrante',
                'Estilo contemporáneo',
                'Duración de 7-12 días',
                'Fácil de incorporar en arreglos'
            ],
            en: [
                'Linear and modern design',
                'Long and flexible leaves',
                'Vibrant green color',
                'Contemporary style',
                'Duration of 7-12 days',
                'Easy to incorporate in arrangements'
            ]
        },
        translateKey: 'prod4_name'
    },
    {
        id: 5,
        name: {
            es: 'Vibornium',
            en: 'Vibornium'
        },
        scientificName: 'Vibornium',
        sizes: [55, 60],
        image: 'assets/img/productos/shop/foliage (5).jpg',
        images: [
            'assets/img/productos/shop/foliage (5).jpg',
            'assets/img/productos/shop/foliage (5).jpg',
            'assets/img/productos/shop/foliage (5).jpg'
        ],
        description: {
            es: 'El Cocculus es un follaje de alta calidad con hojas redondeadas que añaden textura y plenitud. Su forma compacta y ramificada lo hace ideal como relleno en arreglos florales sofisticados.',
            en: 'Cocculus is a high-quality foliage with rounded leaves that add texture and fullness. Its compact and branched form makes it ideal as filler in sophisticated floral arrangements.'
        },
        characteristics: {
            es: [
                'Hojas redondeadas uniformes',
                'Textura densa y compacta',
                'Excelente como follaje de relleno',
                'Color verde medio brillante',
                'Duración de 10-14 días',
                'Ramificación natural abundante'
            ],
            en: [
                'Uniform rounded leaves',
                'Dense and compact texture',
                'Excellent as filler foliage',
                'Bright medium green color',
                'Duration of 10-14 days',
                'Abundant natural branching'
            ]
        },
        translateKey: 'prod5_name'
    },
    {
        id: 6,
        name: {
            es: 'Brillantina',
            en: 'Baby Tears'
        },
        scientificName: 'Pilea glauca',
        sizes: [50, 60],
        image: 'assets/img/productos/shop/foliage (6).jpg',
        images: [
            'assets/img/productos/shop/foliage (6).jpg',
            'assets/img/productos/shop/foliage (6).jpg',
            'assets/img/productos/shop/foliage (6).jpg'
        ],
        description: {
            es: 'La Brillantina es un follaje delicado y aireado que añade un toque etéreo y romántico. Sus pequeñas hojas plateadas crean un efecto cascada perfecto para bodas y eventos elegantes.',
            en: 'Baby Tears is a delicate and airy foliage that adds an ethereal and romantic touch. Its small silvery leaves create a perfect cascading effect for weddings and elegant events.'
        },
        characteristics: {
            es: [
                'Follaje fino y delicado',
                'Efecto cascada natural',
                'Tono plateado único',
                'Perfecto para bodas románticas',
                'Duración de 5-10 días',
                'Apariencia etérea y ligera'
            ],
            en: [
                'Fine and delicate foliage',
                'Natural cascading effect',
                'Unique silvery tone',
                'Perfect for romantic weddings',
                'Duration of 5-10 days',
                'Ethereal and light appearance'
            ]
        },
        translateKey: 'prod6_name'
    },
    {
        id: 7,
        name: {
            es: 'Helecho',
            en: 'Leather Fern'
        },
        scientificName: 'Rumohra adiantiformis',
        sizes: [50, 55, 60],
        image: 'assets/img/productos/shop/foliage (7).jpg',
        images: [
            'assets/img/productos/shop/foliage (7).jpg',
            'assets/img/productos/shop/foliage (7).jpg',
            'assets/img/productos/shop/foliage (7).jpg'
        ],
        description: {
            es: 'El Helecho Cuero es uno de los follajes más duraderos y versátiles del mercado. Sus frondas resistentes y de textura única lo hacen indispensable en la industria floral. Ideal para cualquier tipo de diseño.',
            en: 'Leather Fern is one of the most durable and versatile foliages on the market. Its resistant fronds with unique texture make it indispensable in the floral industry. Ideal for any type of design.'
        },
        characteristics: {
            es: [
                'Durabilidad excepcional (14-21 días)',
                'Textura resistente tipo cuero',
                'Versátil para todo tipo de arreglos',
                'Color verde oscuro profundo',
                'Resistente al marchitamiento',
                'Estándar de la industria floral'
            ],
            en: [
                'Exceptional durability (14-21 days)',
                'Resistant leather-like texture',
                'Versatile for all types of arrangements',
                'Deep dark green color',
                'Resistant to wilting',
                'Floral industry standard'
            ]
        },
        translateKey: 'prod7_name'
    },
    {
        id: 8,
        name: {
            es: 'Cocculus',
            en: 'Cocculus'
        },
        scientificName: 'Cocculus laurifolius',
        sizes: [50, 55, 60],
        image: 'assets/img/productos/shop/foliage (8).jpg',
        images: [
            'assets/img/productos/shop/foliage (8).jpg',
            'assets/img/productos/shop/foliage (8).jpg',
            'assets/img/productos/shop/foliage (8).jpg'
        ],
        description: {
            es: 'La Alocasia es un follaje tropical dramático y llamativo. Sus grandes hojas con venas contrastantes crean un impacto visual único. Perfecta para eventos modernos y diseños botánicos contemporáneos.',
            en: 'Alocasia is a dramatic and striking tropical foliage. Its large leaves with contrasting veins create a unique visual impact. Perfect for modern events and contemporary botanical designs.'
        },
        characteristics: {
            es: [
                'Hojas grandes y dramáticas',
                'Venas contrastantes prominentes',
                'Aspecto tropical exótico',
                'Ideal para diseños modernos',
                'Duración de 7-10 días',
                'Gran impacto visual'
            ],
            en: [
                'Large and dramatic leaves',
                'Prominent contrasting veins',
                'Exotic tropical appearance',
                'Ideal for modern designs',
                'Duration of 7-10 days',
                'Great visual impact'
            ]
        },
        translateKey: 'prod8_name'
    },
    {
        id: 9,
        name: {
            es: 'Eucalipto Baby Blue',
            en: 'Baby Blue Eucalyptus'
        },
        scientificName: 'Eucalyptus pulverulenta',
        sizes: [50, 55, 60],
        image: 'assets/img/productos/shop/foliage (9).jpg',
        images: [
            'assets/img/productos/shop/foliage (9).jpg',
            'assets/img/productos/shop/foliage (9).jpg',
            'assets/img/productos/shop/foliage (9).jpg'
        ],
        description: {
            es: 'El Eucalipto Baby Blue es tendencia en eventos y bodas modernas. Su distintivo color azul-grisáceo y aroma fresco lo hacen único. Perfecto para paletas de colores suaves y diseños románticos.',
            en: 'Baby Blue Eucalyptus is trending in modern events and weddings. Its distinctive blue-gray color and fresh aroma make it unique. Perfect for soft color palettes and romantic designs.'
        },
        characteristics: {
            es: [
                'Color azul-grisáceo distintivo',
                'Aroma fresco y agradable',
                'Trending en bodas modernas',
                'Hojas redondeadas únicas',
                'Duración de 14-18 días',
                'Versátil en diseños románticos'
            ],
            en: [
                'Distinctive blue-gray color',
                'Fresh and pleasant aroma',
                'Trending in modern weddings',
                'Unique rounded leaves',
                'Duration of 14-18 days',
                'Versatile in romantic designs'
            ]
        },
        translateKey: 'prod9_name'
    },
    {
        id: 10,
        name: {
            es: 'Eucalipto Silver Dollar',
            en: 'Silver Dollar Eucalyptus'
        },
        scientificName: 'Eucalyptus cinerea',
        sizes: [55, 60],
        image: 'assets/img/productos/shop/foliage (10).jpg',
        images: [
            'assets/img/productos/shop/foliage (10).jpg',
            'assets/img/productos/shop/foliage (10).jpg',
            'assets/img/productos/shop/foliage (10).jpg'
        ],
        description: {
            es: 'El Eucalipto Silver Dollar es uno de los follajes más populares en la actualidad. Sus hojas plateadas redondas y su fragancia característica lo hacen ideal para diseños elegantes y naturales.',
            en: 'Silver Dollar Eucalyptus is one of the most popular foliages today. Its round silvery leaves and characteristic fragrance make it ideal for elegant and natural designs.'
        },
        characteristics: {
            es: [
                'Hojas plateadas en forma de moneda',
                'Fragancia aromática característica',
                'Muy popular en tendencias actuales',
                'Textura suave aterciopelada',
                'Duración de 12-16 días',
                'Perfecto para bouquets modernos'
            ],
            en: [
                'Silvery coin-shaped leaves',
                'Characteristic aromatic fragrance',
                'Very popular in current trends',
                'Soft velvety texture',
                'Duration of 12-16 days',
                'Perfect for modern bouquets'
            ]
        },
        translateKey: 'prod10_name'
    },
    {
        id: 11,
        name: {
            es: 'Pino',
            en: 'Pine'
        },
        scientificName: 'Pinus strobus',
        sizes: [30, 40, 50],
        image: 'assets/img/productos/shop/foliage (11).jpg',
        images: [
            'assets/img/productos/shop/foliage (11).jpg',
            'assets/img/productos/shop/foliage (11).jpg',
            'assets/img/productos/shop/foliage (11).jpg'
        ],
        description: {
            es: 'El Pino es un follaje clásico perfecto para temporada navideña y eventos invernales. Su aroma fresco y sus agujas suaves aportan un toque natural y acogedor. Ideal para decoración festiva y arreglos rústicos.',
            en: 'Pine is a classic foliage perfect for the Christmas season and winter events. Its fresh aroma and soft needles provide a natural and cozy touch. Ideal for festive decoration and rustic arrangements.'
        },
        characteristics: {
            es: [
                'Aroma fresco de bosque',
                'Agujas suaves y flexibles',
                'Perfecto para temporada navideña',
                'Color verde intenso natural',
                'Duración de 10-14 días',
                'Ideal para decoración invernal'
            ],
            en: [
                'Fresh forest aroma',
                'Soft and flexible needles',
                'Perfect for Christmas season',
                'Natural intense green color',
                'Duration of 10-14 days',
                'Ideal for winter decoration'
            ]
        },
        translateKey: 'prod11_name'
    }
];

// Función para obtener todos los productos
function getAllProducts() {
    return productsDatabase;
}

// Función para obtener un producto por ID
function getProductById(id) {
    return productsDatabase.find(product => product.id === id);
}

// Función para obtener productos por rango de tamaños
function getProductsBySize(size) {
    return productsDatabase.filter(product => product.sizes.includes(size));
}
