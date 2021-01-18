import "cross-fetch/dist/node-polyfill.js";
import "abort-controller/polyfill.js";

import config from "@arcgis/core/config.js";

// to prevent arcgis from doing a login attampt
/**
 * check this
 * url : https://github.com/Esri/jsapi-resources/tree/master/esm-samples/jsapi-node#identitymanager
 */

config.request.useIdentity = false;

import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";

const layer = new FeatureLayer({
  portalItem: {
    id: "b234a118ab6b4c91908a1cf677941702",
  },
});

async function queryLayer(term) {
  await layer.load();
  const query = layer.createQuery();
  query.outFields = ["NAME", "STATE_NAME", "VACANT", "HSE_UNITS"];
//   query.returnGeometry = false;
  query.where = term;

  const { features } = await layer.queryFeatures(query);

  console.log("features => ", JSON.stringify(features, null, 2));
}
// just a test means i want features that have housing units greater than 1000
queryLayer("HSE_UNITS > 1000");
