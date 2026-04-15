import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, MapPin, ExternalLink } from "lucide-react";
import type { Project } from "../../types";

interface ProjectCarouselProps {
  projects: Project[];
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const currentProject = projects[currentProjectIndex];
  const allImages = currentProject?.images || [];
  const hasMultipleImages = allImages.length > 1;

  // Navigate to previous project
  const goToPrevProject = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setCurrentProjectIndex((prev) =>
        prev === 0 ? projects.length - 1 : prev - 1,
      );
      setCurrentImageIndex(0);
    },
    [projects.length],
  );

  // Navigate to next project
  const goToNextProject = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setCurrentProjectIndex((prev) =>
        prev === projects.length - 1 ? 0 : prev + 1,
      );
      setCurrentImageIndex(0);
    },
    [projects.length],
  );

  // Select specific project
  // const selectProject = useCallback((index: number) => {
  //   setCurrentProjectIndex(index);
  //   setCurrentImageIndex(0);
  // }, []);

  // Select specific image
  const selectImage = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  if (!projects || projects.length === 0) {
    return (
      <div className="py-16 text-center text-[#6B6B6B]">
        No hay proyectos disponibles
      </div>
    );
  }

  return (
    <section id="proyectos" className="py-8 md:py-12 bg-[#F8F8F8]">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12">
          <span className="text-sm font-mono text-[#8CFF2E] uppercase tracking-[0.2em]">
            Portfolio
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <h2 className="font-bold text-4xl md:text-5xl text-[#1a1a1a]">
            Proyectos Destacados
          </h2>
          <p className="text-[#6B6B6B] text-lg max-w-md">
            Una selección de nuestros trabajos más recientes
          </p>
        </div>

        {/* Main Project Display */}
        <div className="reveal-up">
          <div className="relative">
            {/* Main Image */}
            <div
              className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-xl bg-[#E5E5E5] group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={allImages[currentImageIndex] || allImages[0]}
                alt={`${currentProject.title} - Imagen ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {/* Navigation Arrows */}
              {projects.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goToPrevProject}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 shadow-xl flex items-center justify-center hover:bg-[#8CFF2E] transition-all duration-200 z-50 cursor-pointer"
                    aria-label="Proyecto anterior"
                  >
                    <ChevronLeft className="w-6 h-6 text-[#1a1a1a]" />
                  </button>
                  <button
                    type="button"
                    onClick={goToNextProject}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 shadow-xl flex items-center justify-center hover:bg-[#8CFF2E] transition-all duration-200 z-50 cursor-pointer"
                    aria-label="Siguiente proyecto"
                  >
                    <ChevronRight className="w-6 h-6 text-[#1a1a1a]" />
                  </button>
                </>
              )}

              {/* Project Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                <span className="inline-block px-3 py-1 bg-[#8CFF2E] text-[#1a1a1a] text-xs font-mono uppercase tracking-wider rounded mb-2">
                  {currentProject.category}
                </span>
                <h3 className="font-bold text-xl text-white mb-1">
                  {currentProject.title}
                </h3>
                <div className="flex items-center gap-3 text-white/80 text-sm">
                  {currentProject.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {currentProject.location}
                    </span>
                  )}
                  <span>•</span>
                  <span>{currentProject.status}</span>
                </div>
              </div>

              {/* Hover Overlay - View Project Link */}
              <a
                href={`/${currentProject.id}`}
                className={`absolute inset-0 flex items-end justify-center pb-20 bg-black/40 transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <span className="flex items-center gap-2 px-6 py-3 bg-[#8CFF2E] text-[#1a1a1a] font-semibold rounded-lg">
                  <span>Ver proyecto completo</span>
                  <ExternalLink className="w-4 h-4" />
                </span>
              </a>
            </div>

            {/* Image Thumbnails (for current project) */}
            {hasMultipleImages && (
              <div className="mt-4">
                <p className="text-xs text-[#6B6B6B] mb-2 font-mono uppercase tracking-wide">
                  Más imágenes ({allImages.length})
                </p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {allImages.map((image, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => selectImage(index)}
                      className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all duration-200 cursor-pointer ${
                        currentImageIndex === index
                          ? "ring-2 ring-[#8CFF2E] opacity-100"
                          : "opacity-60 hover:opacity-100 ring-1 ring-transparent"
                      }`}
                      aria-label={`Ver imagen ${index + 1}`}
                    >
                      <img
                        src={image}
                        alt={`Miniatura ${index + 1}`}
                        className="w-full h-full object-cover pointer-events-none"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Project Thumbnails - Selectable Projects */}
        <div className="mt-8">
          <p className="text-xs text-[#6B6B6B] mb-4 font-mono uppercase tracking-wide">
            Ver más proyectos ({projects.length})
          </p>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
            {projects.map((project, index) => (
              <a
                href={`/${project.id}`}
                className={`shrink-0 w-48 md:w-56 cursor-pointer transition-all duration-300 text-left snap-start block ${
                  currentProjectIndex === index
                    ? "opacity-100 scale-[1.02]"
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                <div className="aspect-[4/3] rounded-lg overflow-hidden mb-2 relative">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  {currentProjectIndex === index && (
                    <div className="absolute inset-0 ring-2 ring-[#8CFF2E] rounded-lg" />
                  )}
                </div>
                <h4 className="font-semibold text-sm text-[#1a1a1a] truncate">
                  {project.title}
                </h4>
                <p className="text-xs text-[#6B6B6B]">{project.category}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Project Counter */}
        <div className="mt-6 text-center">
          <span className="text-sm text-[#6B6B6B] font-mono">
            {currentProjectIndex + 1} / {projects.length}
          </span>
        </div>
      </div>
    </section>
  );
}
