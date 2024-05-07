export enum Type {
  paisagem = '1',
  flor = '2',
  pizza = '3',
}

export const TypeLabel = new Map<string, string>([
  [Type.paisagem, 'Paisagem'],
  [Type.flor, 'Flor'],
  [Type.pizza, 'Pizza'],
]);
