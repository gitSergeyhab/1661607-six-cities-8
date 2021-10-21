import { useEffect, useRef} from 'react';
import { Icon, Marker, LayerGroup} from 'leaflet';

import useMap from '../../hooks/use-map';
import { Point, Offer } from '../../types/types';

import 'leaflet/dist/leaflet.css';


const enum PinImage {
  Default = './img/pin.svg',
  Active = './img/pin-active.svg',
}

const getOfferIcon = (iconUrl: string) => new Icon({iconUrl, iconSize: [30, 40], iconAnchor: [15, 40]});

const defaultIcon = getOfferIcon(PinImage.Default);
const activeIcon = getOfferIcon(PinImage.Active);

type MapProps = {center: Point, offers: Offer[], selectedId: number};


function Map({center, offers, selectedId}: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, center);
  const markerGroup = new LayerGroup();

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const [lat, lng] = [offer.location.latitude, offer.location.longitude];
        const marker = new Marker({lat, lng});
        marker.setIcon(selectedId && selectedId === offer.id ? activeIcon : defaultIcon);
        marker.addTo(markerGroup);
      });
      markerGroup.addTo(map);
    }

    return () => {markerGroup.remove();};
  });

  useEffect(() => {
    map?.setView(center);
  }, [center, map]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
