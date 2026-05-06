import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import bcrypt from "bcryptjs";

const getConnectionString = () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const url = new URL(connectionString);
  const sslMode = url.searchParams.get("sslmode");
  if (sslMode && ["prefer", "require", "verify-ca"].includes(sslMode)) {
    url.searchParams.set("sslmode", "verify-full");
  }

  return url.toString();
};

const adapter = new PrismaPg({
  connectionString: getConnectionString(),
});
const prisma = new PrismaClient({ adapter });

const projects = [
  {
    slug: "nara-project-management",
    title: "Sistem Monitoring dan Manajemen Proyek PT Nara Megah Perkasa",
    category: "Project Management",
    summary:
      "Dashboard operasional untuk memantau progres proyek, mengelola data pekerjaan, dan membantu tim melihat status proyek secara lebih terstruktur.",
    description:
      "Aplikasi web berbasis Next.js untuk kebutuhan monitoring dan manajemen proyek internal, lengkap dengan backend Prisma dan database PostgreSQL.",
    cover: "/projects/nara.png",
    featured: true,
    order: 1,
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Shadcn"],
  },
  {
    slug: "gallery-mobile",
    title: "Gallery Mobile",
    category: "Media Gallery",
    summary:
      "Galeri foto responsif dengan tampilan bersih, penyimpanan data terstruktur, dan pengalaman browsing yang ringan.",
    description:
      "Platform galeri berbasis Next.js dengan Prisma dan Neon untuk mengelola konten foto secara dinamis.",
    cover: "/projects/gallery.png",
    featured: true,
    order: 2,
    technologies: ["Next.js", "TypeScript", "Prisma", "Neon", "Tailwind CSS"],
  },
  {
    slug: "chemlinko",
    title: "Chemlinko",
    category: "Business Platform",
    summary:
      "Website bisnis modern untuk menampilkan layanan, informasi perusahaan, dan konten produk secara profesional.",
    description:
      "Aplikasi web company profile dengan struktur konten yang mudah dikembangkan dan performa frontend yang rapi.",
    cover: "/projects/chemlinko.png",
    featured: true,
    order: 3,
    technologies: ["Next.js", "TypeScript", "Prisma", "Neon", "Tailwind CSS"],
  },
  {
    slug: "safera",
    title: "Safera",
    category: "AI Commerce",
    summary:
      "Platform digital dengan integrasi AI dan pembayaran untuk membantu proses transaksi serta interaksi pengguna.",
    description:
      "Aplikasi fullstack yang menggabungkan Google Gemini API, Xendit, database MySQL, dan UI berbasis Shadcn.",
    cover: "/projects/safera.png",
    featured: true,
    order: 4,
    technologies: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "MySQL",
      "Google Gemini API",
      "Shadcn",
      "Xendit",
    ],
  },
  {
    slug: "car-rental",
    title: "Car Rental",
    category: "Booking System",
    summary:
      "Sistem rental mobil untuk menampilkan armada, detail kendaraan, dan alur pemesanan yang mudah dipahami pengguna.",
    description:
      "Website rental kendaraan dengan fokus pada katalog, informasi layanan, dan pengalaman pemesanan yang responsif.",
    cover: "/projects/carrental.png",
    featured: false,
    order: 5,
    technologies: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "gpt-sniffer",
    title: "GPT Sniffer",
    category: "AI Tool",
    summary:
      "Tool analisis berbasis AI untuk membantu mendeteksi dan mengevaluasi konten dengan antarmuka yang sederhana.",
    description:
      "Eksperimen produk AI yang menggabungkan UI web modern dengan alur analisis konten berbasis model bahasa.",
    cover: "/projects/gptsniffer.png",
    featured: false,
    order: 6,
    technologies: ["Next.js", "TypeScript", "AI API", "Tailwind CSS"],
  },
];

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "ahmadwildanputro13@gmail.com";
  const password = process.env.ADMIN_PASSWORD ?? "awps1385";
  const name = process.env.ADMIN_NAME ?? "Admin";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin already exists: ${email}`);
  } else {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, passwordHash, name, role: "ADMIN" },
    });

    console.log(`Admin created: ${user.email}`);
    console.log(`Password: ${password}`);
    console.log("-> Change it in the dashboard after first login.");
  }

  const technologyNames = [
    ...new Set(projects.flatMap((project) => project.technologies)),
  ];

  await Promise.all(
    technologyNames.map((name, order) =>
      prisma.technology.upsert({
        where: { slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-") },
        update: { name, order },
        create: {
          slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          name,
          order,
        },
      })
    )
  );

  for (const project of projects) {
    const technologies = project.technologies.map((name) => ({
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    }));

    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        title: project.title,
        category: project.category,
        summary: project.summary,
        description: project.description,
        cover: project.cover,
        featured: project.featured,
        published: true,
        order: project.order,
        technologies: { set: technologies },
      },
      create: {
        slug: project.slug,
        title: project.title,
        category: project.category,
        summary: project.summary,
        description: project.description,
        cover: project.cover,
        featured: project.featured,
        published: true,
        order: project.order,
        technologies: { connect: technologies },
      },
    });
  }

  console.log(`Seeded ${projects.length} projects.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
