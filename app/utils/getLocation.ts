type LocationType =
    | {
          value: string;
          label: string;
          flag: string;
          latlng: [number, number];
          region: string;
      }
    | undefined;

export const getLocation = (location: LocationType) =>
    `${location?.region}, ${location?.label}`;
