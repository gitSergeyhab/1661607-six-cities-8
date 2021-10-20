export const enum ActionType {
  ChangeCity = 'city/ChangeCity',
  GetOffers = 'offer/GetOffers',
  ChangeCityAndOffers = 'all/ChangeCityAndOffers'
}

// ??? первые два эккшна не нужны ???

export const changeCity = (city: string) => ({
  type: ActionType.ChangeCity,
  payload: city,
} as const);

export const getOffers = (city: string) => ({
  type: ActionType.GetOffers,
  payload: city,
} as const);

export const changeCityAndOffers = (city: string) => ({
  type: ActionType.ChangeCityAndOffers,
  payload: city,
} as const);

export type Actions = ReturnType<typeof changeCity> | ReturnType<typeof getOffers> | ReturnType<typeof changeCityAndOffers>;
