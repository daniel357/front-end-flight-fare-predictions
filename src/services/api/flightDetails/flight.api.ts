import { request } from '../api.helpers';
import { HttpResponse } from '../api.types';
import { FlightDto, PredictionResponseDto, StatisticsDto } from '../../../types/flight.types';

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

  submitFlightDataForPrediction(data: FlightDto): Promise<HttpResponse<PredictionResponseDto>> {
    return request('/predict', 'post', data);
  }

  getStatisticalDataAboutFlightPrices(): Promise<HttpResponse<StatisticsDto[]>> {
    return request('/statistics', 'get');
  }
}

export default FlightApi.getInstance();
