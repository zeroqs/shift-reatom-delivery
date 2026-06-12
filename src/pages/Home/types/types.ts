import type { DeliveryPackageType, DeliveryPoint } from '@api';

import type { DeliveryForm } from '../model';

export interface CityField {
  latitude: number;
  longitude: number;
}

export interface PackageField {
  height: number;
  length: number;
  weight: number;
  width: number;
}

export interface HomeModel {
  cities: Array<string>;
  form: DeliveryForm;
  isPackageTypesError: boolean;
  isPointsError: boolean;
  packageTypes: Array<DeliveryPackageType>;
  points: Array<DeliveryPoint>;
  tips: {
    senderCities: Array<string>;
    receiverCities: Array<string>;
  };
}

export interface HomeProps {
  model: HomeModel;
  onRetry: () => void;
}

export interface CityTipsProps {
  cities: Array<string>;
  onSelectCity: (city: string) => void;
}

export interface CitySelectNothingFoundProps {
  isError: boolean;
  onRetry: () => void;
}

export interface PackageSizeSelectProps {
  error?: string;
  isError: boolean;
  packageTypes: Array<DeliveryPackageType>;
  value: string;
  onChange: (value: PackageField | null) => void;
  onRetry: () => void;
}

export interface PackageTypeOptionProps {
  packageType: DeliveryPackageType;
}

export interface PackageTypesEmptyProps {
  isError: boolean;
  onRetry: () => void;
}

export interface CustomPackageSize {
  height: string;
  length: string;
  weight: string;
  width: string;
}

export type CustomPackageSizeErrors = Partial<Record<keyof CustomPackageSize, string>>;

export interface CustomPackageSizeFormProps {
  errors: CustomPackageSizeErrors;
  value: CustomPackageSize;
  onChange: (field: keyof CustomPackageSize, value: number | string) => void;
  onSubmit: () => void;
}
