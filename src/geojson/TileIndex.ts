import * as fs from "fs";
import * as geojsonvt from 'geojson-vt';
import * as mercator from 'global-mercator';
import {toFeatureCollection, IVectorTile} from "./vt2geojson";

export class TileIndex {
  private _index;

  constructor(file: string) {
    let data: any = fs.readFileSync(file);

    this._index = geojsonvt(JSON.parse(data), {
      maxZoom: 14,  // max zoom to preserve detail on; can't be higher than 24
      tolerance: 3, // simplification tolerance (higher means simpler)
      extent: 4096, // tile extent (both width and height)
      buffer: 0,   // tile buffer on each side
      debug: 0,     // logging level (0 to disable, 1 or 2)
      lineMetrics: false, // whether to enable line metrics tracking for LineString/MultiLineString features
      promoteId: null,    // name of a feature property to promote to feature.id. Cannot be used with `generateId`
      generateId: false,  // whether to generate feature ids. Cannot be used with `promoteId`
      indexMaxZoom: 14,       // max zoom in the initial tile index
      indexMaxPoints: 0 // max number of points per tile in the index
    });
  }

  public getTileCoords() {
    return this._index.tileCoords;
  }

  getTile(x, y, z): any {
    // noinspection JSSuspiciousNameCombination
    return this._index.getTile(z, x, y);
  }
}
