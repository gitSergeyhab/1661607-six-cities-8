import { useEffect, useRef} from 'react';
import { Icon, Marker } from 'leaflet';
import useMap from '../../hooks/use-map';
import { Center, Offer } from '../../types/types';
import 'leaflet/dist/leaflet.css';


type MapProps = {center: Center, offers: Offer[], selectedId: number}

const getOfferIcon = (iconUrl: string) => new Icon({iconUrl, iconSize: [30, 40], iconAnchor: [15, 40]});

const defaultIcon = getOfferIcon('./img/pin.svg');
const activeIcon = getOfferIcon('./img/pin-active.svg');

function Map({center, offers, selectedId}: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, center);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const [lat, lng] = [offer.location.latitude, offer.location.longitude];
        const marker = new Marker({lat, lng});
        marker.setIcon(selectedId && selectedId === offer.id ? activeIcon : defaultIcon);
        marker.addTo(map);
      });
    }
  }, [map, offers, selectedId]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
