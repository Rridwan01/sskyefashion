import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

async function main() {
  console.log('Seeding database...');

  // Create Admin User
  await prisma.user.upsert({
    where: { email: 'admin@skye.com' },
    update: {
      name: 'SKYE Admin',
      role: 'ADMIN',
      password: hashPassword('admin123'),
    },
    create: {
      name: 'SKYE Admin',
      email: 'admin@skye.com',
      role: 'ADMIN',
      password: hashPassword('admin123'),
    }
  });

  // Clear all products first to avoid foreign key violations when changing categories
  await prisma.product.deleteMany();

  // Delete old categories to prevent orphaned categories
  await prisma.category.deleteMany({
    where: {
      slug: {
        in: ['avant-garde', 'ready-to-wear']
      }
    }
  });

  // Create Categories
  const wears = await prisma.category.upsert({
    where: { slug: 'wears' },
    update: {
      name: 'Wears',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop'
    },
    create: {
      name: 'Wears',
      slug: 'wears',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop'
    }
  });

  const accessories = await prisma.category.upsert({
    where: { slug: 'accessories' },
    update: {
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=1974&auto=format&fit=crop'
    },
    create: {
      name: 'Accessories',
      slug: 'accessories',
      image: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=1974&auto=format&fit=crop'
    }
  });

  const shoes = await prisma.category.upsert({
    where: { slug: 'shoes' },
    update: {
      name: 'Shoes',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop'
    },
    create: {
      name: 'Shoes',
      slug: 'shoes',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop'
    }
  });

  // Create Products
  const productsData = [
    // SKYE Atelier
    {
      name: 'Heavyweight Oversized Knit',
      slug: 'heavyweight-oversized-knit',
      brand: 'SKYE Atelier',
      collection: 'Monochrome Essentials',
      aesthetic: 'Quiet Luxury',
      description: 'A meticulously crafted knit offering structural volume and severe warmth.',
      editorialDescription: 'The absolute peak of quiet luxury, crafted for the urban environment. This piece redefines proportions with its aggressive drop shoulder and dense, architectural cashmere blend.',
      fitNotes: 'Severely oversized fit. We recommend sizing down if a traditional fit is desired.',
      stylingNotes: 'Pairs perfectly with wide-leg tailoring and brutalist silver hardware.',
      price: 1275000,
      currency: 'NGN',
      categoryId: wears.id,
      images: [
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1542272201-b1ca555f8505?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1550614000-4b95dd2449a6?q=80&w=2070&auto=format&fit=crop'
      ],
      inventory: 10,
      sizes: ['S', 'M', 'L'],
      colors: ['Black', 'Bone'],
      materials: ['80% Cashmere', '20% Heavy Wool'],
      tags: ['knit', 'heavyweight', 'oversized'],
      isNew: true,
      isFeatured: true
    },
    {
      name: 'Deconstructed Silk Trench',
      slug: 'deconstructed-silk-trench',
      brand: 'SKYE Atelier',
      collection: 'New Season',
      aesthetic: 'Avant Garde',
      description: 'A flowing, fluid take on the classic trench coat, heavily deconstructed.',
      editorialDescription: 'Moving like liquid obsidian, this trench coat abandons rigid structure for pure, unrestricted drape.',
      fitNotes: 'True to size with an intentionally relaxed shoulder.',
      stylingNotes: 'Wear open over a minimal slip dress or wide-leg trousers.',
      price: 3600000,
      currency: 'NGN',
      categoryId: wears.id,
      images: [
        'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1542272201-b1ca555f8505?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1550614000-4b95dd2449a6?q=80&w=2070&auto=format&fit=crop'
      ],
      inventory: 5,
      sizes: ['XS', 'S', 'M'],
      colors: ['Obsidian'],
      materials: ['100% Raw Silk'],
      tags: ['outerwear', 'silk', 'trench'],
      isNew: true,
      isFeatured: true
    },
    {
      name: 'Sculptural Asymmetric Blazer',
      slug: 'sculptural-asymmetric-blazer',
      brand: 'SKYE Atelier',
      collection: 'New Season',
      aesthetic: 'Avant Garde',
      description: 'Tailoring disrupted. An asymmetric cut provides a striking silhouette.',
      editorialDescription: 'The blazer reimagined. Sharp, aggressive lines meet a delicate, unexpected drape on the left lapel.',
      fitNotes: 'Tailored fit. Runs slightly narrow through the waist.',
      stylingNotes: 'Complete the suit with the Pleated Wool Trousers.',
      price: 2775000,
      currency: 'NGN',
      categoryId: wears.id,
      images: [
        'https://images.unsplash.com/photo-1507680434267-dbd3f5e1f743?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1542272201-b1ca555f8505?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1550614000-4b95dd2449a6?q=80&w=2070&auto=format&fit=crop'
      ],
      inventory: 8,
      sizes: ['38', '40', '42', '44'],
      colors: ['Charcoal'],
      materials: ['100% Virgin Wool', 'Cupro Lining'],
      tags: ['tailoring', 'blazer', 'asymmetric'],
      isNew: false,
      isFeatured: false
    },
    
    // NOIR DIVISION & Y-3 Collaborations
    {
      name: 'Y-3 Petronas Motorsport Backpack',
      slug: 'y3-petronas-motorsport-backpack',
      brand: 'Y-3',
      collection: 'Petronas Motorsport',
      aesthetic: 'Sport Luxury',
      description: 'A high-performance utility backpack featuring custom Mercedes-AMG Petronas Motorsport and Y-3 branding.',
      editorialDescription: 'Yohji Yamamoto meets motorsport. Tailored for absolute utility with multiple zipped compartments, industrial-strength adjustment clips, and technical weather-resistant weave.',
      fitNotes: 'Ergonomic shoulder strap adjustment for customized load distribution.',
      stylingNotes: 'Style with Y-3 trackpants and high-top sneakers.',
      price: 1020000,
      currency: 'NGN',
      categoryId: accessories.id,
      images: [
        '/products/backpack.png'
      ],
      inventory: 25,
      sizes: ['OS'],
      colors: ['Black'],
      materials: ['100% Ballistic Nylon', 'Stainless Steel Hardware'],
      tags: ['bag', 'backpack', 'y3', 'petronas'],
      isNew: true,
      isFeatured: true
    },
    {
      name: 'Y-3 Petronas Track Pants',
      slug: 'y3-petronas-track-pants',
      brand: 'Y-3',
      collection: 'Petronas Motorsport',
      aesthetic: 'Sport Luxury',
      description: 'Relaxed sporty track pants featuring signature piping and dual Mercedes-AMG Petronas / Y-3 details.',
      editorialDescription: 'Motorsport heritage reconstructed. Yohji Yamamoto applies his architectural draping to classic track uniform styling, featuring a lightweight satin-finish tech blend with secure drawcords.',
      fitNotes: 'Relaxed fit, true to size.',
      stylingNotes: 'Wear with low-top runners and the matching Petronas backpack.',
      price: 870000,
      currency: 'NGN',
      categoryId: wears.id,
      images: [
        '/products/trackpants.png'
      ],
      inventory: 30,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black'],
      materials: ['85% Recycled Polyester', '15% Elastane Technical Weave'],
      tags: ['pants', 'trackpants', 'y3', 'petronas'],
      isNew: false,
      isFeatured: false
    },
    {
      name: 'Classic Penny Loafer',
      slug: 'classic-penny-loafer',
      brand: 'SKYE Atelier',
      collection: 'Monochrome Essentials',
      aesthetic: 'Quiet Luxury',
      description: 'Minimalist penny loafer handcrafted in Italy from matte-finish full grain calf leather.',
      editorialDescription: 'A study in classic shape and clean construction. Hand-sewn saddle detailing with a comfortable, low-profile rubber-injected sole designed to endure.',
      fitNotes: 'True to size. Standard width.',
      stylingNotes: 'Wear sockless with cropped wool trousers or stack over distressed denim.',
      price: 1125000,
      currency: 'NGN',
      categoryId: shoes.id,
      images: [
        '/products/loafer.png'
      ],
      inventory: 15,
      sizes: ['41', '42', '43', '44', '45'],
      colors: ['Black'],
      materials: ['100% Calfskin Leather', 'Genuine Leather Lining'],
      tags: ['footwear', 'shoes', 'loafer', 'leather'],
      isNew: true,
      isFeatured: false
    },

    // NORTHLINE
    {
      name: 'Minimalist Zip Jacket',
      slug: 'minimalist-zip-jacket',
      brand: 'NORTHLINE',
      collection: 'Airport Fits',
      aesthetic: 'Minimal Urban',
      description: 'A sleek, unbranded zip jacket offering supreme comfort and sharp lines.',
      editorialDescription: 'The quintessential travel companion. NORTHLINE strips away the unnecessary, leaving only perfect geometry.',
      fitNotes: 'Standard fit. Cut short at the waist.',
      stylingNotes: 'Layer over a simple white tee for an effortless transit look.',
      price: 1080000,
      currency: 'NGN',
      categoryId: wears.id,
      images: [
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1542272201-b1ca555f8505?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1550614000-4b95dd2449a6?q=80&w=2070&auto=format&fit=crop'
      ],
      inventory: 22,
      sizes: ['S', 'M', 'L'],
      colors: ['Navy', 'Black'],
      materials: ['Technical Wool Blend'],
      tags: ['jacket', 'outerwear', 'minimal'],
      isNew: false,
      isFeatured: true
    },
    {
      name: 'Seamless Tech Runner',
      slug: 'seamless-tech-runner',
      brand: 'NORTHLINE',
      collection: 'Airport Fits',
      aesthetic: 'Minimal Urban',
      description: 'Aerodynamic running silhouette adapted for luxury lifestyle.',
      editorialDescription: 'Motion meets stillness. A completely seamless upper provides a sock-like fit with architectural mid-sole support.',
      fitNotes: 'Runs slightly small. Size up half a size.',
      stylingNotes: 'Ideal with tapered technical trousers.',
      price: 810000,
      currency: 'NGN',
      categoryId: shoes.id,
      images: [
        'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1542272201-b1ca555f8505?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1550614000-4b95dd2449a6?q=80&w=2070&auto=format&fit=crop'
      ],
      inventory: 40,
      sizes: ['40', '41', '42', '43', '44'],
      colors: ['Glacier White'],
      materials: ['Primeknit', 'EVA Foam'],
      tags: ['footwear', 'sneakers', 'tech'],
      isNew: true,
      isFeatured: false
    },
    {
      name: 'Volume Poplin Shirt',
      slug: 'volume-poplin-shirt',
      brand: 'NORTHLINE',
      collection: 'Summer Textures',
      aesthetic: 'Quiet Luxury',
      description: 'Oversized cotton poplin shirt with exaggerated cuffs and a dramatic drop shoulder.',
      editorialDescription: 'A study in volume. Crisp, cool poplin that floats away from the body, perfect for high summer.',
      fitNotes: 'Intentionally massive. Buy your normal size for the intended look.',
      stylingNotes: 'Leave unbuttoned over a ribbed tank top.',
      price: 720000,
      currency: 'NGN',
      categoryId: wears.id,
      images: [
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1976&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1542272201-b1ca555f8505?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1550614000-4b95dd2449a6?q=80&w=2070&auto=format&fit=crop'
      ],
      inventory: 18,
      sizes: ['S', 'M', 'L'],
      colors: ['Optic White'],
      materials: ['100% Organic Cotton'],
      tags: ['shirting', 'oversized', 'poplin'],
      isNew: false,
      isFeatured: false
    },

    // VANTA Studio
    {
      name: 'Distressed Wide-Leg Denim',
      slug: 'distressed-wide-leg-denim',
      brand: 'VANTA Studio',
      collection: 'Late Night Edit',
      aesthetic: 'Grunge Luxury',
      description: 'Heavily washed, ultra-wide denim with custom distressing.',
      editorialDescription: 'The anti-fit. VANTA Studio brings their signature aggressive wash process to a pooling, floor-dragging silhouette.',
      fitNotes: 'Extremely wide and long. Designed to drag on the floor.',
      stylingNotes: 'Let them pool over a massive chunky sneaker.',
      price: 1185000,
      currency: 'NGN',
      categoryId: wears.id,
      images: [
        '/products/denim.png'
      ],
      inventory: 12,
      sizes: ['28', '30', '32', '34'],
      colors: ['Washed Black'],
      materials: ['100% Japanese Denim'],
      tags: ['denim', 'jeans', 'wide-leg'],
      isNew: true,
      isFeatured: true
    },
    {
      name: 'Wide-Leg Heavyweight Sweatpants',
      slug: 'wide-leg-heavyweight-sweatpants',
      brand: 'VANTA Studio',
      collection: 'Late Night Edit',
      aesthetic: 'Grunge Luxury',
      description: 'Ultra-heavyweight cotton fleece sweatpants with a pooling wide-leg silhouette.',
      editorialDescription: 'Designed for supreme comfort with an imposing, oversized presence. Features raw hems and a subtle tonal patch.',
      fitNotes: 'Extra long inseam designed to stack over sneakers.',
      stylingNotes: 'Pair with chunky slides or retro runners and a cropped hoodie.',
      price: 735000,
      currency: 'NGN',
      categoryId: wears.id,
      images: [
        '/products/sweatpants.png'
      ],
      inventory: 20,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black'],
      materials: ['100% Cotton Fleece'],
      tags: ['pants', 'sweatpants', 'vanta'],
      isNew: false,
      isFeatured: false
    },
    {
      name: 'Spiked Silver Necklace',
      slug: 'spiked-silver-necklace',
      brand: 'VANTA Studio',
      collection: 'Late Night Edit',
      aesthetic: 'Grunge Luxury',
      description: 'Solid 925 sterling silver chain featuring aggressive thorn motifs.',
      editorialDescription: 'Jewelry as armor. Hand-cast silver spikes wrap the neck in a dangerous, beautiful halo.',
      fitNotes: '18-inch length. Sits at the collarbone.',
      stylingNotes: 'Wear directly on the skin under an open black shirt.',
      price: 1650000,
      currency: 'NGN',
      categoryId: accessories.id,
      images: [
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1542272201-b1ca555f8505?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1550614000-4b95dd2449a6?q=80&w=2070&auto=format&fit=crop'
      ],
      inventory: 5,
      sizes: ['OS'],
      colors: ['Silver'],
      materials: ['925 Sterling Silver'],
      tags: ['jewelry', 'necklace', 'silver'],
      isNew: true,
      isFeatured: false
    }
  ];

  // Delete old unused products to prevent orphans
  await prisma.product.deleteMany({
    where: {
      slug: {
        in: ['faded-graphic-zip-hoodie']
      }
    }
  });

  for (const p of productsData) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        brand: p.brand,
        collection: p.collection,
        aesthetic: p.aesthetic,
        images: p.images,
        price: p.price,
        description: p.description,
        editorialDescription: p.editorialDescription,
        fitNotes: p.fitNotes,
        stylingNotes: p.stylingNotes,
        inventory: p.inventory,
        sizes: p.sizes,
        colors: p.colors,
        materials: p.materials,
        tags: p.tags,
        isNew: p.isNew,
        isFeatured: p.isFeatured
      },
      create: p
    });
  }

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
