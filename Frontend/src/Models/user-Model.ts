import { RegisterOptions } from "react-hook-form";

export class UserModel {
  public constructor(
    public firstName: string,
    public lastName: string,
    public username: string,
    public password: string
  ) {}


public static nameValidation: RegisterOptions = {
  required: { value: true, message: "Missing name"},
  minLength: { value: 2, message: "Name must be minimum 2 chars"},
  maxLength: { value: 10, message: "Name can't exceeds 10 chars"}
};

public static LastNameValidation: RegisterOptions = {
  required: { value: true, message: "Missing Last name"},
  minLength: { value: 2, message: "Last name must be minimum 2 chars"},
  maxLength: { value: 10, message: "Last name can't exceeds 50 chars"}
};

public static usernameValidation: RegisterOptions = {
  required: { value: true, message: "Missing username"},
  minLength: { value: 2, message: "Name must be minimum 6 chars"},
  maxLength: { value: 50, message: "Name can't exceeds 12 chars"}
};

public static passwordValidation: RegisterOptions = {
  required: { value: true, message: "Missing name"},
  minLength: { value: 8, message: "Password must be 8 chars"},
  maxLength: { value: 8, message: "Password must be 8 chars"}
};
}
