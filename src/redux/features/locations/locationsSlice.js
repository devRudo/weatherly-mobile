import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  timeOfUpdate: 0,
  locations: [],
  currentLocationId: '',
  isLoading: false,
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    addLocation: (state, action) => {
      state.locations = [...state.locations, action.payload];
    },
    removeLocation: state => {},
    setCurrentLocationId: (state, action) => {
      state.currentLocationId = action.payload.currentLocationId;
    },
    setTimeOfUpdate: (state, action) => {
      state.timeOfUpdate = action.payload;
    },
    updateWeatherData: (state, action) => {
      const locationToBeUpdated = state?.locations?.filter(
        loc => loc?.id === action.payload.locationId,
      )[0];
      const updatedLocation = {
        ...locationToBeUpdated,
        [action.payload.key]: action.payload.weatherData,
      };
      const updatedLocations = state.locations.map(location => {
        if (location.id === action.payload.locationId) {
          return updatedLocation;
        } else {
          return location;
        }
      });
      state.locations = updatedLocations;
    },
  },
});

export const {
  addLocation,
  removeLocation,
  setCurrentLocationId,
  updateWeatherData,
  setTimeOfUpdate,
} = locationsSlice.actions;

export default locationsSlice.reducer;
