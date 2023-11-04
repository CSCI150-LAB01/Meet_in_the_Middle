'use client';
import { Location } from '@/lib/types';
import { createContext, ReactNode, useCallback, useReducer} from 'react';

type LocationContextProviderType = {
  children: ReactNode;
}

export type LocationType = 'navigator' | 'database';

const LOCATION_ACTION = {
  SET_LOCATION: 'location',
  SET_TYPE: 'type',
} as const;
export type LocationActionType = typeof LOCATION_ACTION[keyof typeof LOCATION_ACTION];

export type LocationReducerAction = {
  type: LocationActionType;
  payload: Location | LocationType;
}

export type LocationStateType = {
  location: Location;
  type: LocationType;
}

export const initState:  LocationStateType = {
  location: {
    lat: 0,
    lng: 0,
  },
  type: 'navigator',
};

export const locationReducer = (state: LocationStateType, action: LocationReducerAction): LocationStateType => {
  let key;

  switch (action.type) {
    case LOCATION_ACTION.SET_LOCATION:
      key = 'location';
      return { ...state, [key]: action.payload }
    case LOCATION_ACTION.SET_TYPE:
      key = 'type';
      return { ...state, [key]: action.payload }
    default:
      return state;
  }
}

export type LocationContextType = {
  state: LocationStateType;
  setLocation: (location: Location) => void;
  setType: (type: LocationType) => void;
}

export const LocationContext = createContext<LocationContextType | null>(null);

export default function LocationContextProvider({ children }: LocationContextProviderType) {
  const [state, dispatch] = useReducer(locationReducer, initState);

  const setLocation = useCallback((location: Location) => {
    dispatch({ type: 'location', payload: location });
  }, []);

  const setType = useCallback((locationType: LocationType) => {
    dispatch({ type: 'type', payload: locationType });
  }, []);

  return (
    <LocationContext.Provider value={{ state, setLocation, setType }}>
      {children}
    </LocationContext.Provider>
  )
}
