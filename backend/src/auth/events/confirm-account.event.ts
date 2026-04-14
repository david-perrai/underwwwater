export class ConfirmAccountEvent {
  constructor(
    public readonly email: string,
    public readonly token: string,
  ) {}
}
