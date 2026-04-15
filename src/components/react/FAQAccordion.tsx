import { useState } from "react";
import type { FAQItem } from "../../types";

interface FAQAccordionProps {
  items?: FAQItem[];
}

const defaultItems: FAQItem[] = [
  {
    question: "¿Cuánto tiempo toma un proyecto típico?",
    answer: "El tiempo varía según la complejidad. Un proyecto residencial puede tomar entre 2-4 meses desde la concepción hasta la entrega de planos finales. Proyectos comerciales o de mayor escala pueden requerir 6-12 meses.",
  },
  {
    question: "¿Cuál es el costo promedio de un proyecto?",
    answer: "Cada proyecto es único y el costo depende de múltiples factores: tamaño, complejidad, materiales, ubicación y alcance. Ofrecemos presupuestos personalizados después de la reunión inicial gratuita.",
  },
  {
    question: "¿Qué permisos necesito para construir?",
    answer: "Los permisos varían según la ubicación y tipo de proyecto. Generalmente se requiere permiso de construcción municipal, aprobación de planos, y en algunos casos permisos ambientales. Nosotros te guiamos en todo el proceso de gestión de permisos.",
  },
  {
    question: "¿Ofrecen garantía en sus proyectos?",
    answer: "Sí,Todos nuestros proyectos incluyen garantía de diseño. Responsabilizamos por la calidad del diseño y la documentación técnica proporcionada. Para la ejecución de obra, coordinamos con contratistas que ofrecen sus propias garantías.",
  },
  {
    question: "¿Cómo es el proceso de pago?",
    answer: "El proceso de pago se estructura en etapas: 30% para iniciar el anteproyecto, 40% para la entrega de planos finales, y 30% al completar la documentación. Aceptamos transferencias bancarias y cheques.",
  },
  {
    question: "¿Trabajan con clientes fuera de la ciudad?",
    answer: "Sí, tenemos experiencia en proyectos a nivel nacional e internacional. Utilizamos herramientas de colaboración virtual para mantener comunicación fluida y realizar seguimientos remotos eficientes.",
  },
  {
    question: "¿Cómo es el proceso de construcción?",
    answer: "Como arquitecto y constructor, acompaño todo el proceso de obra: desde la planificación y contratación de mano de obra hasta la supervisión diaria. Te entregamos el proyecto terminado, listo para habitar, con seguimiento de plazos y presupuesto.",
  },
  {
    question: "¿Qué incluye el proyecto final?",
    answer: "El proyecto final incluye: planos arquitectónicos completos, plantas, cortes y fachadas; especificaciones técnicas de materiales; presupuesto detallado de obra; renders fotorrealistas 3D; y documentación necesaria para permisos de construcción.",
  },
];

export default function FAQAccordion({ items = defaultItems }: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="faq-accordion space-y-4">
      {items.map((item, index) => {
        const isOpen = openItems.has(index);
        
        return (
          <div
            key={index}
            className={`faq-item border border-[#E5E5E5] rounded-lg bg-white overflow-hidden transition-all duration-300 hover:shadow-md ${
              isOpen ? "border-l-[3px] border-l-[#8CFF2E] bg-[#FAFAFA]" : ""
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <button
              className="faq-trigger w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-[#FAFAFA] transition-colors"
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-lg md:text-xl text-[#1a1a1a] pr-4">
                {item.question}
              </span>
              <span
                className={`faq-chevron shrink-0 text-[#8CFF2E] transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </button>
            <div
              className={`faq-content overflow-hidden transition-all duration-300 ease-out ${
                isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 md:px-8 pb-6 md:pb-8 text-[#6B6B6B] leading-relaxed text-base">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
