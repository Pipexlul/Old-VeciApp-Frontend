/* eslint-disable react/jsx-props-no-spreading */
import { z } from "zod";
import {
  Stack,
  Box,
  Text,
  TextInput,
  Title,
  Slider,
  createStyles,
  Divider,
  rem,
  Button,
  SimpleGrid,
  ScrollArea,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useRef, useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  MarkerProps,
  TooltipProps,
  Circle,
} from "react-leaflet";
import { Helmet } from "react-helmet";

import type { NominatimResponse } from "nominatim-browser";
import { IconBasketFilled, IconMapPinFilled } from "@tabler/icons-react";

import UserSearchStoreListElem from "./UserSearchStoreListElem";

import type { BaseStoreData } from "../../types/StoreData";
import nominatim from "../../services/nominatim";

import { tablerIconToSvg } from "../../utils/svgUtils";

const imp = (value: string): string => `${value} !important`;

const MARKER_SIZE = 36;

const STORE_SVG = tablerIconToSvg(
  <IconBasketFilled size={MARKER_SIZE} />,
  "red"
);

const HOUSE_SVG = tablerIconToSvg(
  <IconMapPinFilled size={MARKER_SIZE} />,
  "green"
);

const TITLE_MULTIPLIER = 1.7;

const RADIUS_CONFIG = {
  min: 0,
  max: 2000,
  defaultVal: 100,
} as const;

const MAP_SIZE = 500;
const MAP_SM_MULTIPLIER = 0.75;
const MAP_SM_SIZE = Math.floor(MAP_SIZE * MAP_SM_MULTIPLIER);

const radiusMarks: { value: number; label: string }[] = ((amount: number) => {
  const markNums: number[] = [];

  const step = Math.floor(RADIUS_CONFIG.max / amount);

  for (let i = 0; i <= amount; i += 1) {
    markNums.push(i * step);
  }

  return markNums.map((mark) => ({
    value: mark,
    label: `${mark} m`,
  }));
})(5);

const useStyles = createStyles((theme) => ({
  root: {
    minHeight: "100%",
    width: "100%",
    padding: theme.spacing.lg,
  },

  title: {
    fontWeight: 700,
    fontSize: `calc(${theme.fontSizes.lg} * ${TITLE_MULTIPLIER})`,

    [theme.fn.smallerThan("sm")]: {
      fontSize: `calc(${theme.fontSizes.sm} * ${TITLE_MULTIPLIER})`,
    },
  },

  mapContainer: {
    height: rem(MAP_SIZE),

    [theme.fn.smallerThan("sm")]: {
      height: rem(MAP_SM_SIZE),
    },
  },

  sliders: {
    marginTop: theme.spacing.sm,
  },

  labels: {
    display: "inline-block",
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    color: "#C1C2C5",
    wordBreak: "break-word",
    cursor: "default",
    WebkitTapHighlightColor: "transparent",
  },

  markers: {
    backgroundColor: "transparent",
    border: "none",
  },

  tooltips: {
    fontSize: imp(theme.fontSizes.md),
    fontWeight: 600,
    backgroundColor: imp(theme.colors.orange[3]),

    "&::before": {
      borderTopColor: imp(theme.colors.orange[3]),
    },
  },
}));

const valSchema = z.object({
  searchFrom: z.string().nonempty({ message: "Ingrese su ubicación" }),
  radius: z
    .number()
    .min(RADIUS_CONFIG.min, { message: "Ingrese un valor mayor a 0" })
    .max(RADIUS_CONFIG.max, { message: "Ingrese un valor menor a 10000" }),
  itemToSearch: z.string().optional(),
});

type UserSearchShape = z.infer<typeof valSchema>;

const UserSearch: React.FC = () => {
  const { classes, theme } = useStyles();

  const markers: (MarkerProps & {
    tooltip?: TooltipProps;
    tooltipLabel?: string;
  })[] = [];

  const [homeCoords, setHomeCoords] = useState<L.LatLngExpression | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [storeData, setStoreData] = useState<BaseStoreData[]>([]);
  const mapRef = useRef<L.Map>(null);

  const storesTableElems = storeData.map((store) => {
    const dist =
      (homeCoords &&
        mapRef.current?.distance([+store.lat, +store.lng], homeCoords)) ??
      0;

    return (
      <UserSearchStoreListElem
        key={store.store_id}
        store_id={store.store_id}
        owner_name={store.owner_name}
        store_name={store.store_name}
        distance={dist}
      />
    );
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const STORE_ICON = L.divIcon({
    html: STORE_SVG,
    iconSize: [MARKER_SIZE, MARKER_SIZE],
    className: classes.markers,
  });

  const HOUSE_ICON = L.divIcon({
    html: HOUSE_SVG,
    iconSize: [MARKER_SIZE, MARKER_SIZE],
    className: classes.markers,
  });

  const form = useForm<UserSearchShape>({
    initialValues: {
      searchFrom: "",
      radius: RADIUS_CONFIG.defaultVal,
      itemToSearch: "",
    },

    validate: zodResolver(valSchema),
  });

  const addressSearch = async () => {
    if (!form.validateField("searchFrom").hasError) {
      const { searchFrom } = form.values;

      const searchRes = (await nominatim.geocode({
        street: searchFrom,
        addressdetails: true,
        country: "Chile",
        limit: 50,
      })) as NominatimResponse[];

      if (searchRes.length > 0) {
        const { lat, lon } = searchRes[0];
        setHomeCoords([+lat, +lon]);

        setTimeout(() => {
          mapRef.current?.flyTo([+lat, +lon]);
        }, 1000);
      } else {
        setHomeCoords(null);
      }
    }
  };

  if (homeCoords) {
    markers.push({
      position: homeCoords,
      icon: HOUSE_ICON,
      tooltip: {
        className: classes.tooltips,
        opacity: 1,
        permanent: true,
        offset: [0, -20],
        direction: "top",
      },
      tooltipLabel: "Su ubicación",
    });
  }

  const markersElems = markers.map((marker) => {
    return (
      <Marker
        key={marker.position.toString()}
        position={marker.position}
        icon={marker.icon}
      >
        <Tooltip {...marker.tooltip}>{marker.tooltipLabel}</Tooltip>
      </Marker>
    );
  });

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </Helmet>
      <Box className={classes.root}>
        <Stack spacing="xl">
          <Title
            className={classes.title}
            sx={{ fontFamily: `Greycliff CF, ${theme.fontFamily}` }}
          >
            Busca productos y negocios
          </Title>
          <TextInput
            label="Ubicación"
            placeholder="Dirección desde la cual quieres buscar"
            required
            {...form.getInputProps("searchFrom")}
          />
          <Button variant="light" onClick={addressSearch}>
            Buscar dirección
          </Button>
          <Divider />
          <Stack spacing="xs">
            <Text
              component="label"
              className={classes.labels}
              htmlFor="radiusSlider"
            >
              Radio de busqueda:{" "}
              <Text inherit fz="md" fw={700} span color="green.3">{`${
                form.values.radius
              } ${form.values.radius === 1 ? "metro" : "metros"}`}</Text>
            </Text>
            <Slider
              id="radiusSlider"
              pb="md"
              min={RADIUS_CONFIG.min}
              max={RADIUS_CONFIG.max}
              step={50}
              marks={radiusMarks}
              label={(value) => `${value} ${value === 1 ? "metro" : "metros"}`}
              styles={{
                markLabel: {
                  [theme.fn.smallerThan("sm")]: {
                    display: "none",
                  },
                },
              }}
              {...form.getInputProps("radius")}
            />
          </Stack>
          <Divider />
          <TextInput
            disabled
            label="Item a buscar"
            description="Campo opcional. Si se deja vacío, se mostraran todos los almacenes en el radio. (No implementado)"
            placeholder="Arroz Pregraneado"
            styles={{
              wrapper: {
                cursor: "not-allowed",
              },
            }}
            {...form.getInputProps("itemToSearch")}
          />
          <Button variant="light">Buscar Almacenes</Button>
          <SimpleGrid
            cols={2}
            spacing="md"
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          >
            <ScrollArea.Autosize
              offsetScrollbars
              mah={{ base: rem(MAP_SM_SIZE), md: rem(MAP_SIZE) }}
            >
              <Stack>{storesTableElems}</Stack>
            </ScrollArea.Autosize>
            <MapContainer
              className={classes.mapContainer}
              center={[-33.4379, -70.6512]}
              zoom={20}
              scrollWheelZoom={false}
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {markersElems}
              {homeCoords && (
                <Circle
                  center={homeCoords}
                  radius={form.values.radius}
                  color="blue"
                />
              )}
            </MapContainer>
          </SimpleGrid>
        </Stack>
      </Box>
    </>
  );
};

export default UserSearch;
