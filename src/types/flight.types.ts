export interface FlightDto {
  searchDate: string | null;
  flightDate: string | null;
  departureHour: number | null;
  departureMinute: number | null;
  arrivalHour: number | null;
  arrivalMinute: number | null;
}


export interface StatisticsDto {
  flightDate: string;
  baseFare: number;
  isHoliday: boolean;

}

export interface PredictionResponseDto {
  prediction: number;
}