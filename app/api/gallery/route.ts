import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Apuntamos a la carpeta dentro de public
    const galleryDir = path.join(process.cwd(), 'public', 'gallery');

    // Si la carpeta no existe por alguna razón, la creamos en automático
    if (!fs.existsSync(galleryDir)) {
      fs.mkdirSync(galleryDir, { recursive: true });
      return NextResponse.json([]);
    }

    // Leemos todos los archivos dentro de la carpeta
    const files = fs.readdirSync(galleryDir);

    // Filtramos únicamente archivos que tengan extensiones de imagen válidas
    const images = files.filter(file => 
      /\.(jpg|jpeg|png|webp|avif)$/i.test(file)
    );

    return NextResponse.json(images);
  } catch (error) {
    console.error("Error reading gallery folder:", error);
    return NextResponse.json({ error: "Failed to load images" }, { status: 500 });
  }
}