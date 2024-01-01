import ProblemDetails from "./ProblemDetails"

/** This response will be returned if can not find an entity in database. */
export default interface NotFoundProblemDetails extends ProblemDetails {
  params: {
    /** The entity name. */
    entity: string
    /** The property value that caused the failure. */
    key: string
  }
}
