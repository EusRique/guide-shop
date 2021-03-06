import { ValidationComposite } from '../../../../../validation/validators/validation-composite'
import { Validation } from '../../../../../presentation/protocols/validation'
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation'

export const makeAddGuideValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'latitude', 'longitude', 'about', 'instruction', 'openOnWeekends', 'address']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
