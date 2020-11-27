/*eslint no-prototype-builtins: 0*/
import levels from "./levels";

let validated = false;

if (!validated) {
  validated = true;
  // Validate levels
  for (let [k, level] of Object.entries(levels)) {
    if (
      !level.hasOwnProperty("level") ||
      typeof level.level !== "string" ||
      !level.hasOwnProperty("answer") ||
      typeof level.answer !== "string" ||
      !level.hasOwnProperty("flagging") ||
      !level.flagging.hasOwnProperty("time") ||
      typeof level.flagging.time !== "number" ||
      !level.flagging.hasOwnProperty("attempts") ||
      typeof level.flagging.attempts !== "number"
    ) {
      console.error(`Validation error at level ${k}`);
    }
  }
}

export default levels;
