/*eslint no-prototype-builtins: 0*/
import map from "./map.json";
import levels from "../levels";

let validated = false;

if (!validated) {
  validated = true;
  const NodeTypes = ["LockedLevel", "OpenLevel", "Key", "Portal", "Empty"];
  const validateAttachedNodes = (attached, k) => {
    if (!attached || attached.length === 0) {
      console.error(`Error in attached nodes at level ${k}`);
      return;
    }

    const allowed = ["left", "right", "up", "down"];
    for (let [d, n] of Object.entries(attached)) {
      if (allowed.indexOf(d) === -1 || typeof n !== "number") {
        console.error(`Error in attached nodes at node ${k}`);
      }

      if (!map.hasOwnProperty(n)) {
        console.error(
          `Error in attached nodes at node ${k}: Node ${n} does not exist`
        );
      }
    }
  };

  for (let [k, node] of Object.entries(map)) {
    if (!/^\d+$/.test(k)) {
      console.error(`Error in key at node ${k}`);
    }

    validateAttachedNodes(node.options, k);

    if (
      !node.hasOwnProperty("type") ||
      NodeTypes.indexOf(node.type) === -1 ||
      (node.hasOwnProperty("message") && typeof node.message !== "string")
    ) {
      console.error(`Error at node ${k}`);
    }

    if (node.type === "LockedLevel" || node.type === "OpenLevel") {
      if (!node.hasOwnProperty("level") || !levels.hasOwnProperty(node.level)) {
        console.error(`Error at node ${k}: Invalid level`);
      }
    }

    if (
      node.type === "Portal" &&
      (!node.hasOwnProperty("portalTo") || !map.hasOwnProperty(node.portalTo))
    ) {
      console.error(`Error at node ${k}: portalTo node does not exist`);
    }
  }
}

export default map;
