import { badRequest } from '../../../helpers/http/http-helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from './add-guides-controller-protocols'
export class AddGuideController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)

    if (error) {
      return badRequest(error)
    }
  }
}
