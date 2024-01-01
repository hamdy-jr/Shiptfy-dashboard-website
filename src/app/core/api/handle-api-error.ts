import { ProblemDetails } from './types/ProblemDetails';
import { ErrorDescriber } from './types/ErrorDescriber';
import { ValidationProblemDetails } from './types/ValidationProblemDetails';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiException } from './clients';
import { StatusCodes } from './types/StatusCodes';
import { ConflictProblemDetails } from './types/ConflictProblemDetails';
import { ProblemDetailsTitles } from './types/ProblemDetailsTitles';

type HandleApiErrorCallbacks = {
  onUnexpected?: () => void;
  onUnauthorized?: () => void;
  onInternalError?: (error: ProblemDetails) => void;
  onEntityNotFounded?: (entity: string, key: string) => void;
  onEndpointNotFounded?: (endpoint: string) => void;
  onConflict?: (errors: ErrorDescriber[]) => void;
  onUnprocessableEntity?: (errors: ValidationProblemDetails['errors']) => void;
  onUnknownUnprocessableEntity?: () => void;
  onUnknownNotFound?: () => void;
  onParseError?: (error: unknown) => void;
};

export default function handleApiError(
  error: HttpErrorResponse,
  callbacks: HandleApiErrorCallbacks = {},
) {
  if (error?.error instanceof Blob) {
    const fr = new FileReader();

    fr.onload = function () {
      const error = parseResponse<Record<string, unknown>>(
        this.result as string,
        callbacks.onParseError,
      );

      baseHandleApiError(error, callbacks);
    };

    fr.readAsText(error.error);
  } else {
    baseHandleApiError(error as any, callbacks);
  }
}

export function baseHandleApiError(
  error: Record<string, unknown> | null | undefined,
  callbacks: HandleApiErrorCallbacks = {},
): void {
  if (
    error &&
    error['status'] &&
    isNumber(error['status']) &&
    error['status'] >= 200 &&
    error['status'] <= 299
  ) {
    console.log('@API Error: Unknown error', error);

    return;
  }

  if (ApiException.isApiException(error)) {
    handleApiExceptionError(error, callbacks);
    return;
  }

  // if (isProblemDetails(error)) {
  //   handleProblemDetailsApiError(error, callbacks);
  //   return;
  // }

  callbacks.onUnexpected && callbacks.onUnexpected();
}

export function handleProblemDetailsApiError<TError extends ProblemDetails>(
  error: TError,
  callbacks: HandleApiErrorCallbacks = {},
): void {
  // if (!isProblemDetails(error)) {
  //   callbacks.onUnexpected && callbacks.onUnexpected();
  //
  //   return;
  // }

  if (error.status === StatusCodes.UNAUTHORIZED) {
    callbacks.onUnauthorized && callbacks.onUnauthorized();

    return;
  }

  if (error.status >= StatusCodes.INTERNAL_ERROR) {
    console.log('@API Error: Internal server error', error);

    callbacks.onInternalError && callbacks.onInternalError(error);

    return;
  }

  if (error.status === StatusCodes.NOT_FOUND) {
    if (isEntityNotFoundProblemDetails(error)) {
      const { entity, key } = error.params;
      callbacks.onEntityNotFounded && callbacks.onEntityNotFounded(entity, key);
    } else if (isEndpointNotFoundProblemDetails(error)) {
      // @ts-ignore
      const { instance } = error as ProblemDetailsTitles.EndpointNotFounded;
      callbacks.onEndpointNotFounded &&
        callbacks.onEndpointNotFounded(instance);
    } else {
      console.log('Unexpected 404 error', error);

      if (callbacks.onUnknownNotFound) {
        callbacks.onUnknownNotFound();
      } else if (callbacks.onUnexpected) {
        callbacks.onUnexpected();
      }
    }

    return;
  }

  if (error.status === StatusCodes.CONFLICT) {
    const response = error as unknown as ConflictProblemDetails;

    if (response.errors && response.errors.length > 0) {
      callbacks.onConflict && callbacks.onConflict(response.errors);
    } else {
      callbacks.onUnexpected && callbacks.onUnexpected();
    }

    return;
  }

  if (error.status === StatusCodes.UNPROCESSABLE_ENTITY) {
    const response = error as unknown as ValidationProblemDetails;

    if (response.errors && Object.keys(response.errors).length < 1) {
      callbacks.onUnknownUnprocessableEntity &&
        callbacks.onUnknownUnprocessableEntity();
    } else {
      callbacks.onUnprocessableEntity &&
        callbacks.onUnprocessableEntity(response.errors);
    }

    return;
  }

  callbacks.onUnexpected && callbacks.onUnexpected();
}

export function handleApiExceptionError(
  error: ApiException,
  callbacks: HandleApiErrorCallbacks = {},
): void {
  if (!ApiException.isApiException(error)) {
    callbacks.onUnexpected && callbacks.onUnexpected();

    return;
  }

  if (error && error.status >= 200 && error.status <= 299) {
    console.log(
      '@API Error: Unknown error',
      error.status,
      error.message,
      error.response,
    );
    return;
  }

  if (error.status === StatusCodes.UNAUTHORIZED) {
    callbacks.onUnauthorized && callbacks.onUnauthorized();

    return;
  }

  if (error.status >= StatusCodes.INTERNAL_ERROR) {
    console.log(
      '@API Error: Internal server error',
      error,
      error.status,
      error.message,
      error.response,
    );

    const response = parseResponse<ProblemDetails>(
      error.response,
      callbacks.onParseError,
    );

    if (response) {
      callbacks.onInternalError && callbacks.onInternalError(response);
    } else {
      callbacks.onUnexpected && callbacks.onUnexpected();
    }

    return;
  }

  if (error.status === StatusCodes.NOT_FOUND) {
    const response = parseResponse<ProblemDetails>(
      error.response,
      callbacks.onParseError,
    );

    if (!response) {
      callbacks.onUnexpected && callbacks.onUnexpected();
      return;
    }

    // if (response.title === ProblemDetailsTitles.EntityNotFounded) {
    //   const { entity, key } = (response as EntityNotFoundProblemDetails).params;
    //   callbacks.onEntityNotFounded && callbacks.onEntityNotFounded(entity, key);
    // } else if (response.title === ProblemDetailsTitles.EndpointNotFounded) {
    //   const { instance } = response as EndpointNotFoundProblemDetails;
    //   callbacks.onEndpointNotFounded &&
    //     callbacks.onEndpointNotFounded(instance);
    // } else {
    //   console.log('Unexpected 404 error', response);
    //
    //   if (callbacks.onUnknownNotFound) {
    //     callbacks.onUnknownNotFound();
    //   } else if (callbacks.onUnexpected) {
    //     callbacks.onUnexpected();
    //   }
    // }

    return;
  }

  if (error.status === StatusCodes.CONFLICT) {
    const response = parseResponse<ConflictProblemDetails>(
      error.response,
      callbacks.onParseError,
    );

    if (!response) {
      callbacks.onUnexpected && callbacks.onUnexpected();
      return;
    }

    if (response.errors && response.errors.length > 0) {
      callbacks.onConflict && callbacks.onConflict(response.errors);
    } else {
      callbacks.onUnexpected && callbacks.onUnexpected();
    }

    return;
  }

  if (error.status === StatusCodes.UNPROCESSABLE_ENTITY) {
    const response = parseResponse<ValidationProblemDetails>(
      error.response,
      callbacks.onParseError,
    );

    if (!response) {
      callbacks.onUnexpected && callbacks.onUnexpected();
      return;
    }

    if (response.errors && Object.keys(response.errors).length < 1) {
      callbacks.onUnknownUnprocessableEntity &&
        callbacks.onUnknownUnprocessableEntity();
    } else {
      callbacks.onUnprocessableEntity &&
        callbacks.onUnprocessableEntity(response.errors);
    }

    return;
  }

  callbacks.onUnexpected && callbacks.onUnexpected();
}

function isString(val: unknown): val is string {
  return typeof val === 'string' || val instanceof String;
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

function parseResponse<T>(
  response: string | unknown,
  onError: HandleApiErrorCallbacks['onParseError'],
): T | null {
  try {
    return (isString(response) ? JSON.parse(response) : response) as T;
  } catch (e) {
    onError && onError(e);
    return null;
  }
}
