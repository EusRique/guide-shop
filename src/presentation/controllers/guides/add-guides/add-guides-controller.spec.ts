import { HttpRequest } from './add-guides-controller-protocols'
import { AddGuideController } from './add-guides-controller'
import { Validation } from '../../../protocols/validation'
import { badRequest } from '../../../helpers/http/http-helpers'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    latitude: 'any_latitude',
    longitude: 'any_longitude',
    about: 'any_about',
    instruction: 'any_instruction',
    openOnWeekends: 'any_open_on_weekends',
    address: 'any_address'
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

interface SutType {
  sut: AddGuideController
  validationStub: Validation
}

const makeSut = (): SutType => {
  const validationStub = makeValidation()
  const sut = new AddGuideController(validationStub)

  return {
    sut,
    validationStub
  }
}

describe('AddGuide Controller', () => {
  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
})
