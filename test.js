const map = require("./data/map/map.json");

// const levels = Object.entries(map)
//   .filter(([_, o]) => !!o.level)
//   .map(([_, o]) => o.level);

// const lvls = {};

// for (let l of levels) {
//   lvls[l] = {
//     level: `<pre>This is level ${l}</pre>`,
//     answer: "answer",
//     points: 300,
//     flagging: { time: 60, attempts: 20 },
//   };
// }

// console.log(JSON.stringify(lvls));

const nmap = { ...map };

for (let [k, o] of Object.entries(map)) {
  if (o.type === "OpenLevel" || o.type === "LockedLevel") {
    nmap[k].level = parseInt(nmap[k].level);
  }
}

console.log(JSON.stringify(nmap, null, 2));
