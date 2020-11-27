const l = (n) => ({
  level: `This is <b>level ${n}</b>`,
  answer: `answer${n}`,
  points: 200 + n * 20,
  flagging: { time: 60, attempts: 10 },
});

const final = {};

for (let i = 0; i < 50; i++) {
  final[i] = l(i);
}

console.log(JSON.stringify(final));
