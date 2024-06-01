import { request } from '../api.helpers';
import { HttpResponse } from '../api.types';
import { FlightDto } from '../../../types/flight.types';

class FlightApi {
  private static instance: FlightApi | null = null;

  private constructor() {
  }

  static getInstance(): FlightApi {
    if (!FlightApi.instance) {
      FlightApi.instance = new FlightApi();
    }
    return FlightApi.instance;
  }

  submitFlightDataForPrediction(data: FlightDto): Promise<HttpResponse<number>> {
    return request('/predict', 'post', data);
  }
}

export default FlightApi.getInstance();
