import { logIn, signUp } from "@/actions/user.actions";
import AuthFormBtn from "./auth-form-btn";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type AuthFormProps = {
  type: "logIn" | "signUp";
};

function AuthForm({ type }: AuthFormProps) {
  return (
    <form action={type === "logIn" ? logIn : signUp}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" maxLength={100} required />
      </div>

      <div className="mb-4 mt-2 space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          maxLength={100}
          required
        />
      </div>

      <AuthFormBtn type={type} />
    </form>
  );
}

export default AuthForm;
