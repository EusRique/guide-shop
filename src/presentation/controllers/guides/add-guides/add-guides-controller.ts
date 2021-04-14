import { badRequest, serverError } from '../../../helpers/http/http-helpers'
import { Controller, HttpRequest, HttpResponse, Validation, AddGuide } from './add-guides-controller-protocols'
export class AddGuideController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addGuide: AddGuide
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const { name, latitude, longitude, about, instruction, openOnWeekends, address } = httpRequest.body
      await this.addGuide.add({
        name,
        latitude,
        longitude,
        about,
        instruction,
        openOnWeekends,
        address
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
