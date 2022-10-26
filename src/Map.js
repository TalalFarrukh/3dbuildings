import React, { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import MF from './new_data/MF.json'
import Acta from './new_data/ACTA.json'
import Initium from './new_data/Initium.json'
import HF from './new_data/HF.json'
import NU_VU from './new_data/NU-VU.json'
import O2 from './new_data/O2.json'
import OZW from './new_data/OZW.json'
import Transit from './new_data/Transitorium.json'
import WN from './new_data/W&N.json'
import DeckGL, { GeoJsonLayer, FlyToInterpolator } from 'deck.gl'
import { TileLayer } from '@deck.gl/geo-layers'
import { BitmapLayer } from '@deck.gl/layers'
import { MapView, _GlobeView } from '@deck.gl/core'


const MapTwo = () => {

  const maxZoom = 25; const minZoom = 12
  const latBounds = [52.41639375063081, 52.29380752973293]
  const longBounds = [5.050197222596376, 4.736692757660698]

  var defaultZoom = null; var changeZoom = null;

  const [twoDimension, setTwoDimension] = useState(false)
  const [views, setViews] = useState(new MapView())

  if(window.innerWidth<720) {
    defaultZoom = 14.2; changeZoom = 15.4
  }
  else {
    defaultZoom = 15; changeZoom = 16.7
  }

  const [initialState, setInitialState] = useState({
    latitude: 52.333762935282785, 
    longitude: 4.864205092154478,
    zoom: defaultZoom,
    bearing: 0,
    pitch: 30,
    maxZoom,
    minZoom
  })

  const [selected, setSelected] = useState(null)

  const onClick = info => {
    if(info.object) {
      if(!selected) {
        setInitialState({...initialState, latitude:info.coordinate[1], longitude:info.coordinate[0], zoom:changeZoom})
      }
      else {
        setSelected(null)
      }
    }
  }

  const [tileLayerData, setTileLayerData] = useState('https://tile.openstreetmap.org/{z}/{x}/{y}.png')

  const transparency = 0.9

  const selectedColor = [240,230,140]
  const unselectedColor = [255,255,255]

  const layers = [

    new TileLayer({
      data: tileLayerData,
      minZoom: 0,
      maxZoom: 19,
      tileSize: 256,
      renderSubLayers: props => {
        const {
          bbox: {west, south, east, north}
        } = props.tile;

        return new BitmapLayer(props, {
          data: null,
          image: props.data,
          bounds: [west, south, east, north]
        });
      }
    }),

    new GeoJsonLayer({
      id: 'MF', data: MF, opacity: transparency, stroked: false,
      filled: true, extruded: true,  wireframe: true, pickable: true,
      getElevation: f => f.properties.height,
      getFillColor: f => {
        if (selected && selected.property===f.properties.name) return selectedColor
        else if(selected && selected.property!==f.properties.name) return unselectedColor
        else return unselectedColor
      },
      updateTriggers: {
        getFillColor: [selected]
      },
      getLineColor: unselectedColor,
      autoHighlight: true, highlightColor: selectedColor,
      onClick
    }),

    new GeoJsonLayer({
      id: 'Acta', data: Acta, opacity: transparency, stroked: false,
      filled: true, extruded: true,  wireframe: true, pickable: true,
      getElevation: f => f.properties.height,
      getFillColor: f => {
        if (selected && selected.property===f.properties.name) return selectedColor
        else if(selected && selected.property!==f.properties.name) return unselectedColor
        else return unselectedColor
      },
      updateTriggers: {
        getFillColor: [selected]
      },
      getLineColor: unselectedColor,
      autoHighlight: true, highlightColor: selectedColor,
      onClick
    }),

    new GeoJsonLayer({
      id: 'HF', data: HF, opacity: transparency, stroked: false,
      filled: true, extruded: true,  wireframe: true, pickable: true,
      getElevation: f => f.properties.height,
      getFillColor: f => {
        if (selected && selected.property===f.properties.name) return selectedColor
        else if(selected && selected.property!==f.properties.name) return unselectedColor
        else return unselectedColor
      },
      updateTriggers: {
        getFillColor: [selected]
      },
      getLineColor: unselectedColor,
      autoHighlight: true, highlightColor: selectedColor,
      onClick
    }),

    new GeoJsonLayer({
      id: 'Initium', data: Initium, opacity: transparency, stroked: false,
      filled: true, extruded: true,  wireframe: true, pickable: true,
      getElevation: f => f.properties.height,
      getFillColor: f => {
        if (selected && selected.property===f.properties.name) return selectedColor
        else if(selected && selected.property!==f.properties.name) return unselectedColor
        else return unselectedColor
      },
      updateTriggers: {
        getFillColor: [selected]
      },
      getLineColor: unselectedColor,
      autoHighlight: true, highlightColor: selectedColor,
      onClick
    }),

    new GeoJsonLayer({
      id: 'NU_VU', data: NU_VU, opacity: transparency, stroked: false,
      filled: true, extruded: true,  wireframe: true, pickable: true,
      getElevation: f => f.properties.height,
      getFillColor: f => {
        if (selected && selected.property===f.properties.name) return selectedColor
        else if(selected && selected.property!==f.properties.name) return unselectedColor
        else return unselectedColor
      },
      updateTriggers: {
        getFillColor: [selected]
      }, 
      getLineColor: unselectedColor,
      autoHighlight: true, highlightColor: selectedColor,
      onClick
    }),

    new GeoJsonLayer({
      id: 'O2', data: O2, opacity: transparency, stroked: false,
      filled: true, extruded: true,  wireframe: true, pickable: true,
      getElevation: f => f.properties.height,
      getFillColor: f => {
        if (selected && selected.property===f.properties.name) return selectedColor
        else if(selected && selected.property!==f.properties.name) return unselectedColor
        else return unselectedColor
      },
      updateTriggers: {
        getFillColor: [selected]
      },
      getLineColor: unselectedColor,
      autoHighlight: true, highlightColor: selectedColor,
      onClick
    }),

    new GeoJsonLayer({
      id: 'OZW', data: OZW, opacity: transparency, stroked: false,
      filled: true, extruded: true,  wireframe: true, pickable: true,
      getElevation: f => f.properties.height,
      getFillColor: f => {
        if (selected && selected.property===f.properties.name) return selectedColor
        else if(selected && selected.property!==f.properties.name) return unselectedColor
        else return unselectedColor
      },
      updateTriggers: {
        getFillColor: [selected]
      },
      getLineColor: unselectedColor,
      autoHighlight: true, highlightColor: selectedColor,
      onClick
    }),

    new GeoJsonLayer({
      id: 'Transit', data: Transit, opacity: transparency, stroked: false,
      filled: true, extruded: true,  wireframe: true, pickable: true,
      getElevation: f => f.properties.height,
      getFillColor: f => {
        if (selected && selected.property===f.properties.name) return selectedColor
        else if(selected && selected.property!==f.properties.name) return unselectedColor
        else return unselectedColor
      },
      updateTriggers: {
        getFillColor: [selected]
      },
      getLineColor: unselectedColor,
      autoHighlight: true, highlightColor: selectedColor,
      onClick
    }),

    new GeoJsonLayer({
      id: 'WN', data: WN, opacity: transparency, stroked: false,
      filled: true, extruded: true,  wireframe: true, pickable: true,
      getElevation: f => f.properties.height,
      getFillColor: f => {
        if (selected && selected.property===f.properties.name) return selectedColor
        else if(selected && selected.property!==f.properties.name) return unselectedColor
        else return unselectedColor
      },
      updateTriggers: {
        getFillColor: [selected]
      },
      getLineColor: unselectedColor,
      autoHighlight: true, highlightColor: selectedColor,
      onClick
    }),
  ]

  const mfClick = () => {
    const val = layers.find(e => e.id === 'MF')
    const lat = val.state.features.polygonFeatures[0].geometry.coordinates[0][0][1]
    const long = val.state.features.polygonFeatures[0].geometry.coordinates[0][0][0]
    setSelected({x: long, y: lat, property: 'MF'})
    setInitialState({...initialState, latitude:lat, longitude:long, zoom:changeZoom, transitionInterpolator: new FlyToInterpolator({speed: 1.5}),
    transitionDuration: 'auto'})
  }

  const actaClick = () => {
    const val = layers.find(e => e.id === 'Acta')
    const lat = val.state.features.polygonFeatures[0].geometry.coordinates[0][0][1]
    const long = val.state.features.polygonFeatures[0].geometry.coordinates[0][0][0]
    setSelected({x: long, y: lat, property: 'ACTA'})
    setInitialState({...initialState, latitude:lat, longitude:long, zoom:changeZoom, transitionInterpolator: new FlyToInterpolator({speed: 1.5}),
    transitionDuration: 'auto'})
  }

  const hfClick = () => {
    const val = layers.find(e => e.id === 'HF')
    const lat = val.state.features.polygonFeatures[0].geometry.coordinates[0][0][1]
    const long = val.state.features.polygonFeatures[0].geometry.coordinates[0][0][0]
    setSelected({x: long, y: lat, property: 'Hoofdgebouw'})
    setInitialState({...initialState, latitude:lat, longitude:long, zoom:changeZoom, transitionInterpolator: new FlyToInterpolator({speed: 1.5}),
    transitionDuration: 'auto'})
  }

  const initiumClick = () => {
    const val = layers.find(e => e.id === 'Initium')
    const lat = val.state.features.polygonFeatures[0].geometry.coordinates[0][0][1]
    const long = val.state.features.polygonFeatures[0].geometry.coordinates[0][0][0]
    setSelected({x: long, y: lat, property: 'Initium'})
    setInitialState({...initialState, latitude:lat, longitude:long, zoom:changeZoom, transitionInterpolator: new FlyToInterpolator({speed: 1.5}),
    transitionDuration: 'auto'})
  }

  const nuvuClick = () => {
    const val = layers.find(e => e.id === 'NU_VU')
    const lat = val.state.features.polygonFeatures[0].geometry.coordinates[0][0][1]
    const long = val.state.features.polygonFeatures[0].geometry.coordinates[0][0][0]
    setSelected({x: long, y: lat, property: 'NU-VU'})
    setInitialState({...initialState, latitude:lat, longitude:long, zoom:changeZoom, transitionInterpolator: new FlyToInterpolator({speed: 1.5}),
    transitionDuration: 'auto'})
  }

  const o2Click = () => {
    const val = layers.find(e => e.id === 'O2')
    const lat = val.state.features.polygonFeatures[0].geometry.coordinates[0][0][1]
    const long = val.state.features.polygonFeatures[0].geometry.coordinates[0][0][0]
    setSelected({x: long, y: lat, property: 'O2'})
    setInitialState({...initialState, latitude:lat, longitude:long, zoom:changeZoom, transitionInterpolator: new FlyToInterpolator({speed: 1.5}),
    transitionDuration: 'auto'})
  }

  const ozwClick = () => {
    const val = layers.find(e => e.id === 'OZW')
    const lat = val.state.features.polygonFeatures[0].geometry.coordinates[0][0][1]
    const long = val.state.features.polygonFeatures[0].geometry.coordinates[0][0][0]
    setSelected({x: long, y: lat, property: 'OZW'})
    setInitialState({...initialState, latitude:lat, longitude:long, zoom:changeZoom, transitionInterpolator: new FlyToInterpolator({speed: 1.5}),
    transitionDuration: 'auto'})
  }

  const transitClick = () => {
    const val = layers.find(e => e.id === 'Transit')
    const lat = val.state.features.polygonFeatures[0].geometry.coordinates[0][0][1]
    const long = val.state.features.polygonFeatures[0].geometry.coordinates[0][0][0]
    setSelected({x: long, y: lat, property: 'Transitorium'})
    setInitialState({...initialState, latitude:lat, longitude:long, zoom:changeZoom, transitionInterpolator: new FlyToInterpolator({speed: 1.5}),
    transitionDuration: 'auto'})
  }

  const wnClick = () => {
    const val = layers.find(e => e.id === 'WN')
    const lat = val.state.features.polygonFeatures[0].geometry.coordinates[0][0][1]
    const long = val.state.features.polygonFeatures[0].geometry.coordinates[0][0][0]
    setSelected({x: long, y: lat, property: 'W&N Gebouw'})
    setInitialState({...initialState, latitude:lat, longitude:long, zoom:changeZoom, transitionInterpolator: new FlyToInterpolator({speed: 1.5}),
    transitionDuration: 'auto'})
  }

  const osm = () => {
    setTileLayerData('https://tile.openstreetmap.org/{z}/{x}/{y}.png')
  }

  const osmDE = () => {
    setTileLayerData('https://tile.openstreetmap.de/{z}/{x}/{y}.png')
  }

  const cartodbPositron = () => {
    setTileLayerData('https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png')
  }

  const cartodbVoyager = () => {
    setTileLayerData('https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png')
  }

  const cartodbVoyagerNoLabel = () => {
    setTileLayerData('https://basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png')
  }

  const nlmapsStandard = () => {
    setTileLayerData('https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:3857/{z}/{x}/{y}.png')
  }

  const nlmapsPastel = () => {
    setTileLayerData('https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/pastel/EPSG:3857/{z}/{x}/{y}.png')
  }

  const nlmapsGrijis = () => {
    setTileLayerData('https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/grijs/EPSG:3857/{z}/{x}/{y}.png')
  }

  const nlmapsWater = () => {
    setTileLayerData('https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/water/EPSG:3857/{z}/{x}/{y}.png')
  }

  const nlmapsLuchtfolo = () => {
    setTileLayerData('https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0/Actueel_ortho25/EPSG:3857/{z}/{x}/{y}.jpeg')
  }


  const changePerspective = () => {
    if(twoDimension) {
      setInitialState({...initialState, latitude:52.333762935282785, longitude:4.864205092154478, zoom:defaultZoom, pitch:30,
      transitionInterpolator: new FlyToInterpolator({speed: 1.5}), transitionDuration: 'auto'})
    }
    else {
      setInitialState({...initialState, latitude:52.333762935282785, longitude:4.864205092154478, zoom:defaultZoom, pitch:0,
      transitionInterpolator: new FlyToInterpolator({speed: 1.5}), transitionDuration: 'auto'})
    }
    setTwoDimension(!twoDimension)
  }


  return (
    <div>
        <div style={{ height: '80vh', width: '100vw', position: 'relative' }}>
          <DeckGL initialViewState={initialState} controller={{doubleClickZoom:false, touchRotate:true}} layers={layers}  
          getTooltip={({object}) => object && (object.properties.name)} views={views} 
          onViewStateChange={({viewState}) => {
            viewState.longitude = Math.min(longBounds[0], Math.max(longBounds[1], viewState.longitude))
            viewState.latitude = Math.min(latBounds[0], Math.max(latBounds[1], viewState.latitude))
          }} />
        </div>

        <div style={{ zIndex: 1 }}>
          <button onClick={mfClick}>MF</button>
          <button onClick={hfClick}>HF</button>
          <button onClick={actaClick}>Acta</button>
          <button onClick={initiumClick}>Initium</button>
          <button onClick={nuvuClick}>NU_VU</button>
          <button onClick={o2Click}>O2</button>
          <button onClick={ozwClick}>OZW</button>
          <button onClick={transitClick}>Transitorium</button>
          <button onClick={wnClick}>W&N</button>
        </div>

        <div>
          <button onClick={osm}>OSM Layer</button>
          <button onClick={osmDE}>OSM DE Layer</button>
          <button onClick={cartodbPositron}>CartoDB Positron Layer</button>
          <button onClick={cartodbVoyager}>CartoDB Voyager Layer</button>
          <button onClick={cartodbVoyagerNoLabel}>CartoDB Voyager Layer (No labels)</button>
        </div>

        <div>
          <button onClick={nlmapsStandard}>NL Maps Standard Layer</button>
          <button onClick={nlmapsPastel}>NL Maps Pastel Layer</button>
          <button onClick={nlmapsGrijis}>NL Maps Grijis Layer</button>
          <button onClick={nlmapsWater}>NL Maps Water Layer</button>
          <button onClick={nlmapsLuchtfolo}>NL Maps Luchtfolo Layer</button>
        </div>

        <div>
          <button onClick={changePerspective}>Home View</button>
        </div>


      {/* </DeckGL> */}
      
    </div>
  )
}

export default MapTwo