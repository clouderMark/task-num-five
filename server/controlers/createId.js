const IdLength = 15;

export const createId = (id1, id2) => {
  const strId1 = `${id1}`;
  const strId2 = `${id2}`
  return `${strId1.slice(0, Math.floor(strId1.length / 2))}${strId2.slice(0, Math.floor(strId2.length / 2))}`.slice(0, IdLength);
};
