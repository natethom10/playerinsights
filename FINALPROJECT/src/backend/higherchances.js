fetch("http://localhost:8080/higherChances")
  .then((response) => response.json())
  .then((json) => handleData(json));

function handleData(json) {
  const five = [];
  const four = [];
  const three = [];

  for (let i = 0; i < json.length; i++) {
    if (json[i].narratives.length === 4) four.push(json[i]);
    else if (json[i].narratives.length === 3) three.push(json[i]);
    else if (json[i].narratives.length === 5) five.push(json[i]);
  }

  // three.forEach(item => console.log(item.narratives));
  console.log(three[0]);

  four.forEach((item) =>
    console.log(
      item.gameId.split("-")[0] +
        " " +
        (item.type === "player" ? item.player.fullName : item.team.name)
    )
  );

  const objArray = [];
  const narratives = {
    RECENT_FORM: 0,
    HEAD_TO_HEAD: 0,
    HOME_SPLIT: 0,
    AWAY_SPLIT: 0,
    OPPONENT: 0,
  };

  [...four, ...three].forEach((item) => {
    const obj = {
      name: item.type === "player" ? item.player.fullName : item.team.name,
      date: item.gameId.split("-")[0],
      outcome: item.outcome,
      market: item.market.name,
      line: item.line,
      narratives: item.narratives,
      insights: item.insights,
      alternate: item.alternate,
      playerId: item.player.SRGUID
    };
    objArray.push(obj);

    item.narratives.forEach((narrative) => narratives[narrative]++);

    if (obj.name === "José Ramírez") console.log(obj);
  });

  console.log(four[0]);
}
