import { useEffect, useState, MutableRefObject } from 'react';
import { Map, TileLayer } from 'leaflet';
import { Point } from '../types/types';


const ZOOM = 13;
const LAYER_PNG = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';


function useMap (mapRef: MutableRefObject<HTMLElement | null>, center: Point): Map | null {

  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if(mapRef.current !== null && map === null) {
      const thisMap = new Map(mapRef.current, {center, zoom: ZOOM});

      const layer = new TileLayer(LAYER_PNG, {attribution: LAYER_ATTRIBUTION});

      thisMap.addLayer(layer);

      setMap(thisMap);
    }
  }, [mapRef, map, center]);

  return map;
}

export default useMap;
