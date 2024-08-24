import { z } from "astro:content";
import slugify from "slugify";

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  featured: z.boolean(),
  date: z.string(),
  category: z.string(),
  status: z.string(),
  images: z.array(z.string()),
  images2: z.array(z.string()), // Añadir la columna images2
  modelUrl: z.string(), // O z.array(z.string()) si es un arreglo de URLs
});

const api = {
  list: async () => {
    try {
      const response = await fetch(
        "https://docs.google.com/spreadsheets/d/1ZfHoOQmSZ1VxVWsNpdzyYzSLFJgcTQ5mRDQE_KZfomE/pub?gid=0&single=true&output=tsv"
      );

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const document = await response.text();

      // Verifica si el documento tiene contenido
      if (!document) {
        throw new Error("Empty document received.");
      }

      const rows = document
        .split("\n")
        .slice(1) // Omite la primera fila (cabecera)
        .filter((row) => row.trim() !== "") // Filtra filas vacías
        .map((row) => row.trim().split("\t"));

      return rows.map(
        ([title, featured, date, category, status, images, images2, modelUrl]) => {
          if (!title || !featured || !date || !category || !status || !images || !images2) {
            throw new Error("Missing required data in row.");
          }

          return projectSchema.parse({
            id: slugify(title, { lower: true }),
            title,
            featured: featured === "TRUE",
            date,
            category,
            status,
            images: images.split(",").map((image) => image.trim()),
            images2: images2.split(",").map((image) => image.trim()), // Procesar images2
            modelUrl: modelUrl ? modelUrl.trim() : "", // Ajusta según sea necesario
          });
        }
      );
    } catch (error) {
      console.error("Failed to fetch or process data:", error);
      return []; // O maneja el error de manera más apropiada según tu caso
    }
  },
};

export default api;
