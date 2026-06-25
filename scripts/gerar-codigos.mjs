import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const saida = join(process.cwd(), 'generated');

const produtoCartesiano = (grupos) =>
  grupos.reduce(
    (combinacoes, grupo) =>
      combinacoes.flatMap((combinacao) =>
        grupo.map((valor) => [...combinacao, valor]),
      ),
    [[]],
  );

const letras = {
  CP1: ['A', 'B'],
  CP2: ['A', 'B', 'C'],
  DSP1: ['A', 'B', 'C'],
  DSP2: ['A', 'B', 'C'],
  DSP3: ['A', 'B', 'C', 'D'],
  PEE1: ['A', 'B', 'C', 'D', 'E'],
  PEE2: ['A', 'B', 'C', 'D'],
  PEE3: ['A', 'B', 'C'],
};

const corretos = produtoCartesiano([
  letras.CP1,
  letras.CP2,
  letras.DSP1,
  letras.PEE1,
  letras.PEE2,
  letras.PEE3,
]).map(
  ([cp1, cp2, dsp1, pee1, pee2, pee3]) =>
    `CP1${cp1}2${cp2}_DSP1${dsp1}_PEE1${pee1}2${pee2}3${pee3}`,
);

const incorretos = produtoCartesiano([
  letras.CP1,
  letras.CP2,
  letras.DSP1,
  letras.DSP2,
  letras.DSP3,
  letras.PEE1,
  letras.PEE2,
  letras.PEE3,
]).map(
  ([cp1, cp2, dsp1, dsp2, dsp3, pee1, pee2, pee3]) =>
    `CP1${cp1}2${cp2}_DSP1${dsp1}2${dsp2}3${dsp3}_PEE1${pee1}2${pee2}3${pee3}`,
);

mkdirSync(saida, { recursive: true });

writeFileSync(
  join(saida, 'codigos-questionarios-corretos.txt'),
  `${corretos.join('\n')}\n`,
  'utf8',
);

writeFileSync(
  join(saida, 'codigos-questionarios-incorretos.txt'),
  `${incorretos.join('\n')}\n`,
  'utf8',
);

const linhasCsv = [
  'tipo,codigo',
  ...corretos.map((codigo) => `correto,${codigo}`),
  ...incorretos.map((codigo) => `incorreto,${codigo}`),
];

writeFileSync(
  join(saida, 'todos-codigos-questionarios.csv'),
  `\uFEFF${linhasCsv.join('\n')}\n`,
  'utf8',
);

console.log(`Corretos: ${corretos.length}`);
console.log(`Incorretos: ${incorretos.length}`);
console.log(`Total: ${corretos.length + incorretos.length}`);
