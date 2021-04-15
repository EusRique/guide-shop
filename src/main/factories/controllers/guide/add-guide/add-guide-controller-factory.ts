import { AddGuideController } from '../../../../../presentation/controllers/guides/add-guides/add-guides-controller'
import { Controller } from '../../../../../presentation/protocols/controller'
import { makeAddGuideValidation } from './add-guide-validation-factory'
import { makeDbAddGuide } from '../../../usecases/guide/add-guide/db-add-guide-factory'

export const makeAddGuideController = (): Controller => {
  const controller = new AddGuideController(makeAddGuideValidation(), makeDbAddGuide())

  return controller
}
