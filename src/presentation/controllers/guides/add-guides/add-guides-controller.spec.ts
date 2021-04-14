import { HttpRequest, Validation, AddGuide, AddGuideModel } from './add-guides-controller-protocols'
import { AddGuideController } from './add-guides-controller'
import { badRequest, serverError, noContent } from '../../../helpers/http/http-helpers'

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

const makeAddGuide = (): AddGuide => {
  class AddGuideStub implements AddGuide {
    async add (data: AddGuideModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new AddGuideStub()
}

interface SutType {
  sut: AddGuideController
  validationStub: Validation
  addGuideStub: AddGuide
}

const makeSut = (): SutType => {
  const validationStub = makeValidation()
  const addGuideStub = makeAddGuide()
  const sut = new AddGuideController(validationStub, addGuideStub)
  return {
    sut,
    validationStub,
    addGuideStub
  }
}

describe('AddGuide Controller', () => {
  test('Should call validation  with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddGuide with correct values', async () => {
    const { sut, addGuideStub } = makeSut()
    const addSpy = jest.spyOn(addGuideStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if AddGuide throws', async () => {
    const { sut, addGuideStub } = makeSut()
    jest.spyOn(addGuideStub, 'add').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
