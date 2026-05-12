export type Cell = "wall" | "dot" | "power" | "empty";

export type PacMazePreset = {
  id: string;
  name: string;
  lines: readonly string[];
};

/** # wall, . dot, o power, space empty, P start, G ghost spawn */
export const PAC_MAZE_PRESETS: readonly PacMazePreset[] = [
  {
    id: "classic",
    name: "Classic lanes",
    lines: [
      "#######################",
      "#o...........#.......o#",
      "#.#####.#####.#.#####.#",
      "#.....................#",
      "#.###.#.#####.#.#.###.#",
      "#.....#...G.....#.....#",
      "#####.#.#.###.#.#.#####",
      "    #.#.#.....#.#.#    ",
      "#####.#.#.###.#.#.#####",
      "#...........P.........#",
      "#.###.###.#.#.#.###.###",
      "#...#.....#.#.#.....#.#",
      "#.#.#.#####.#.#####.#.#",
      "#.#...................#",
      "#.#.###.#.###.#.###.#.#",
      "#o..#...#.....#...#..o#",
      "#######################",
    ],
  },
  {
    id: "open",
    name: "Open plaza",
    lines: [
      "#######################",
      "#o...................o#",
      "#.#.#.#.#.#.#.#.#.#.#.#",
      "#..........G..........#",
      "#.#.#.#.#.#.#.#.#.#.#.#",
      "#.....................#",
      "#.#.#.###########.#.#.#",
      "#.......#...#.........#",
      "#####.#.#.#.#.#.#.#####",
      "    #.#...P...#.#      ",
      "#####.#.#.#.#.#.#.#####",
      "#.......#...#.........#",
      "#.#.#.###########.#.#.#",
      "#.....................#",
      "#.#.#.#.#.#.#.#.#.#.#.#",
      "#..........G..........#",
      "#.#.#.#.#.#.#.#.#.#.#.#",
      "#o...................o#",
      "#######################",
    ],
  },
  {
    id: "zig",
    name: "Zigzag",
    lines: [
      "#######################",
      "#o..................o.#",
      "#.####...........####.#",
      "#....#...........#....#",
      "##.#.#.....G.....#.#.##",
      "#..#.#...........#.#..#",
      "#.##.#...........#.##.#",
      "#.#..#...........#..#.#",
      "#.#.##...........##.#.#",
      "#....#.....P.....#....#",
      "#.####...........####.#",
      "#.....................#",
      "##.#####.......#####.##",
      "#...........#.........#",
      "#.###.###.#.#.#.###.###",
      "#...#.....#.#.#.....#.#",
      "#.#.#.#####.#.#####.#.#",
      "#.#...................#",
      "#o..#...#.....#...#..o#",
      "#######################",
    ],
  },
] as const;

export function parseMazePreset(presetIndex: number): {
  grid: Cell[][];
  pac: { r: number; c: number };
  ghosts: { r: number; c: number }[];
} {
  const preset = PAC_MAZE_PRESETS[Math.max(0, Math.min(presetIndex, PAC_MAZE_PRESETS.length - 1))]!;
  const lines = preset.lines;
  const rows = lines.length;
  const cols = lines[0]?.length ?? 0;
  const grid: Cell[][] = [];
  let pac = { r: 1, c: 1 };
  const ghosts: { r: number; c: number }[] = [];

  for (let r = 0; r < rows; r++) {
    const row: Cell[] = [];
    const line = lines[r] ?? "";
    for (let c = 0; c < cols; c++) {
      const ch = line[c] ?? "#";
      if (ch === "#") row.push("wall");
      else if (ch === ".") row.push("dot");
      else if (ch === "o") row.push("power");
      else if (ch === "P") {
        row.push("empty");
        pac = { r, c };
      } else if (ch === "G") {
        row.push("empty");
        ghosts.push({ r, c });
      } else if (ch === " ") row.push("empty");
      else row.push("empty");
    }
    grid.push(row);
  }
  while (ghosts.length < 3) {
    ghosts.push({ r: Math.min(5, rows - 2), c: Math.floor(cols / 2) });
  }
  return { grid, pac, ghosts: ghosts.slice(0, 3) };
}
