import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Join the Club</h1>
          <p className="text-muted-foreground mt-2">Get ready for the best summer yet</p>
        </div>
        <SignUp />
      </div>
    </div>
  );
}
