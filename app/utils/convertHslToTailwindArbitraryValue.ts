export const convertHslToTailwindArbitraryValue = (
  hslString: string
): string => {
  const hslPattern =
    /hsl(?:a)?\((\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?)%?,\s*(\d+(?:\.\d+)?)%?(?:\s*\/\s*(\d+(?:\.\d+)?)%?)?\)/;
  const match = hslString.match(hslPattern);

  if (match) {
    const [, h, s, l, a] = match;
    const alpha = a ? `_/_${a}%` : "";
    return `hsl(${h}_${s}%_${l}%${alpha})`;
  }

  throw new Error(`Invalid HSL format: ${hslString}`);
};
