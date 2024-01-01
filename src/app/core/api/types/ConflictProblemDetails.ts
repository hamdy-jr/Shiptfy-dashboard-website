import ProblemDetails from './ProblemDetails';
import ErrorDescriber from './ErrorDescriber';

/** This response will be returned if can not find an entity in database. */
export interface ConflictProblemDetails extends ProblemDetails {
  errors: ErrorDescriber[];
}
