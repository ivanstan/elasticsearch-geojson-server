import {Client} from '@elastic/elasticsearch';

import * as Progress from "cli-progress";
import {TileIndex} from "./geojson/TileIndex";

const client = new Client({
  node: 'https://search-ivanstan-fwyclk37rb3t524iwflinclw6i.eu-central-1.es.amazonaws.com',
  requestTimeout: 3000
});

const file = 'data/quercus-petraea.json';

const index = new TileIndex(file);

const coords = index.getTileCoords();

const progress = new Progress.SingleBar({
  format: 'Indexing | {bar} | {percentage}% | tile {value}/{total}',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true
});

progress.start(coords.length, 0, {
  tile: "N/A"
});

for (let i in coords) {
  if (!coords.hasOwnProperty(i)) {
    progress.increment();
    continue;
  }

  let {z, x, y} = coords[i];
  let tile = index.getTile(x, y, z);

  if (!tile || !tile.features) {
    progress.increment();
    continue;
  }

  // let bbox = mercator.googleToBBox([tile.x, tile.y, tile.z]);
  // let [minX, minY, maxX, maxY] = bbox;

  // const vectorTiles = tile.features as IVectorTile[];
  // let json = toFeatureCollection(vectorTiles, x, y, z);

  // client.index({
  //   index: IndexDefinition.index,
  //   body: {
  //     // geojson: json,
  //     x: x,
  //     y: y,
  //     z: z,
  //     // minxX: minX,
  //     // minY: minY,
  //     // maxX: maxX,
  //     // maxY: maxY,
  //   }
  // }).then((response) => {
  //   console.log(response)
  // }).catch((e) => {
  //   console.log(e)
  // });

  progress.increment();
}

setTimeout(() => {
  console.info(`\nDone indexing file: ${file}`);
  process.exit(0);
}, 500);

