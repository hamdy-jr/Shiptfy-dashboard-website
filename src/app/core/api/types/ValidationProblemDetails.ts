import ProblemDetails from './ProblemDetails';
import ErrorDescriber from './ErrorDescriber';

/**
 * This response will be returned if the request has a semantic errors
 * (some parameters were missing or otherwise invalid).
 */
export interface ValidationProblemDetails extends ProblemDetails {
  errors: { [key: string]: ErrorDescriber[] };
}
