import { UnavailabilityError, CodedError } from '@unimodules/core';
import { PermissionStatus, PermissionExpiration } from 'unimodules-permissions-interface';

import ExponentImagePicker from './ExponentImagePicker';
import {
  CameraPermissionResponse,
  CameraRollPermissionResponse,
  ImagePickerResult,
  MediaTypeOptions,
  ImagePickerOptions,
  VideoExportPreset,
  ExpandImagePickerResult,
} from './ImagePicker.types';

function validateOptions(options: ImagePickerOptions) {
  const { aspect, quality, videoMaxDuration } = options;

  if (aspect != null) {
    const [x, y] = aspect;

    if (x <= 0 || y <= 0) {
      throw new CodedError(
        'ERR_INVALID_ARGUMENT',
        `Invalid aspect ratio values ${x}:${y}. Provide positive numbers.`
      );
    }
  }

  if (quality && (quality < 0 || quality > 1)) {
    throw new CodedError(
      'ERR_INVALID_ARGUMENT',
      `Invalid 'quality' value ${quality}. Provide a value between 0 and 1.`
    );
  }

  if (videoMaxDuration && videoMaxDuration < 0) {
    throw new CodedError(
      'ERR_INVALID_ARGUMENT',
      `Invalid 'videoMaxDuration' value ${videoMaxDuration}. Provide a non-negative number.`
    );
  }

  return options;
}

export async function getCameraPermissionsAsync(): Promise<CameraPermissionResponse> {
  return ExponentImagePicker.getCameraPermissionsAsync();
}

export async function getCameraRollPermissionsAsync(): Promise<CameraRollPermissionResponse> {
  return ExponentImagePicker.getCameraRollPermissionsAsync();
}

export async function requestCameraPermissionsAsync(): Promise<CameraPermissionResponse> {
  return ExponentImagePicker.requestCameraPermissionsAsync();
}

export async function requestCameraRollPermissionsAsync(): Promise<CameraRollPermissionResponse> {
  return ExponentImagePicker.requestCameraRollPermissionsAsync();
}

export async function launchCameraAsync(
  options: ImagePickerOptions = {}
): Promise<ImagePickerResult> {
  if (!ExponentImagePicker.launchCameraAsync) {
    throw new UnavailabilityError('ImagePicker', 'launchCameraAsync');
  }
  return await ExponentImagePicker.launchCameraAsync(validateOptions(options));
}

export async function launchImageLibraryAsync<T extends ImagePickerOptions>(
  options: T
): Promise<ExpandImagePickerResult<T>> {
  if (!ExponentImagePicker.launchImageLibraryAsync) {
    throw new UnavailabilityError('ImagePicker', 'launchImageLibraryAsync');
  }
  return await ExponentImagePicker.launchImageLibraryAsync(options);
}

export {
  MediaTypeOptions,
  ImagePickerOptions,
  ImagePickerResult,
  VideoExportPreset,
  CameraPermissionResponse,
  CameraRollPermissionResponse,
  PermissionStatus,
  PermissionExpiration,
};
