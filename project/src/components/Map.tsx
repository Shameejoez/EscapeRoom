/* eslint-disable indent */
/* eslint-disable react/jsx-closing-bracket-location */
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MARK_DEFAULT, MARK_MAIN } from '../utils/consts';

const defaultCustomIcon = new Icon({
  iconUrl: MARK_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const activeCustomIcon = new Icon({
  iconUrl: MARK_MAIN,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

type MapProps = {
  location: {location: number[]; id: string}[];
  center: number[];
  onClickCurrent?: (coors: number[]) => void;
  activeAdress?: number [] | null;
}

export function Map ({location, center , onClickCurrent = () => void 0, activeAdress }: MapProps): JSX.Element {

  const INT_FOR_RANDOM = 0.0005;
  const changeRandom = (int: number) => (Math.random() * INT_FOR_RANDOM);

  const onClickGetCoords = (coord: number []) => {
    onClickCurrent(coord);
  };


  return (
    <MapContainer center={{lat:center[0], lng:center[1]}} zoom={10} style={{width: '100%', height: '100%'}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {location.map(({location:loc, id}) =>
        (<Marker key={id} icon={loc === activeAdress ? activeCustomIcon : defaultCustomIcon}
          position={{lat: loc[0] - changeRandom(INT_FOR_RANDOM) , lng:loc[1] + changeRandom(INT_FOR_RANDOM)}}
          eventHandlers={{
            click: () =>
              onClickGetCoords(loc)
          }}>
         </Marker>
        ))}
    </MapContainer>

  );
}
