import { Validation } from '../../../../../presentation/protocols/validation'
import { makeAddGuideValidation } from './add-guide-validation-factory'
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation'
import { ValidationComposite } from '../../../../../validation/validators/validation-composite'

jest.mock('../../../../../validation/validators/validation-composite')

describe('AddGuideValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddGuideValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'latitude', 'longitude', 'about', 'instruction', 'openOnWeekends', 'address']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
