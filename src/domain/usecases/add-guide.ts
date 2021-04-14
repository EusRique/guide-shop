export interface AddGuideModel {
  name: string
  latitude: number
  longitude: number
  about: string
  instruction: string
  openOnWeekends: boolean
  address: string
}

export interface AddGuide {
  add: (data: AddGuideModel) => Promise<void>
}
