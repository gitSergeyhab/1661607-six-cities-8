export const enum ActionType {
  ChangeCity = 'city/ChangeCity',
  GetOffers = 'offer/GetOffers',
  ChangeCityAndOffers = 'city-offer/ChangeCityAndOffers',
  ChangeOption = 'option/ChangeOption'
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

export const changeOption = (option: string) => ({
  type: ActionType.ChangeOption,
  payload: option,
} as const);

export type Actions =
  ReturnType<typeof changeCity> |
  ReturnType<typeof getOffers> |
  ReturnType<typeof changeCityAndOffers> |
  ReturnType<typeof changeOption>;
