export class ResetPasswordEvent {
  constructor(
    public readonly email: string,
    public readonly token: string,
  ) {}
}
