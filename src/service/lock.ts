class LockService {
  constructor() {}

  public unlock(password: string) {
    return !password;
  }
}

export const LockServiceInstance = new LockService();
