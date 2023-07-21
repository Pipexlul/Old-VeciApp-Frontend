import {
  IconSearch,
  IconChartAreaLine,
  IconSpeakerphone,
  IconCoins,
  IconUsers,
  IconDeviceMobile,
} from "@tabler/icons-react";

import type { FeatureData } from "../types/Features";

const featureDataOwner: FeatureData[] = [
  {
    title: "Hazte conocer",
    description:
      "Los vecinos cercanos no son los únicos que llegan a tu negocio, da a conocer tus precios y productos a nuevos clientes",
    icon: IconSearch,
  },
  {
    title: "Analiza tu negocio",
    description:
      "Desde tu panel de control, podrás ver cuantas visitas tienes por la App, y cuales de tus productos son los mas buscados",
    icon: IconChartAreaLine,
  },
  {
    title: "Comunicación efectiva",
    description:
      "Indicale a tus clientes cuales son tus horarios habituales, y también avísales cuando tengas que abrir antes o cerrar después de lo común",
    icon: IconSpeakerphone,
  },
];

const featureDataUser: FeatureData[] = [
  {
    title: "Cotiza",
    description:
      "Si buscas un producto y no puedes ir al supermercado, puedes buscarlo en un almacén. Filtra y ordena los productos por precio, marca y distancia al almacén",
    icon: IconCoins,
  },
  {
    title: "Apoya la economía de tu barrio",
    description: "Si fuiste bien atendido, deja una reseña del almacén",
    icon: IconUsers,
  },
  {
    title: "Comodidad",
    description: "Puedes usar la App desde tu teléfono, tablet o computadora",
    icon: IconDeviceMobile,
  },
];

export { featureDataOwner, featureDataUser };
