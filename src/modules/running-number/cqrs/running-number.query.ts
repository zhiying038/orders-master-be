export class GetNewRunningNumberQuery {
  constructor(public readonly purpose: string) {}
}

export class GetNextAvailableNumberQuery {
  constructor(public readonly purpose: string) {}
}
