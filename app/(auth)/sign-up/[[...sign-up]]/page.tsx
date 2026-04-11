import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-base px-6 py-12">
      <div className="w-full max-w-md">
        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-bg-surface2 border border-border-default shadow-xl rounded-2xl w-full",
              headerTitle: "text-text-primary text-heading-lg font-bold",
              headerSubtitle: "text-text-secondary text-body-md",
              formLabel: "text-text-secondary text-label-md",
              formButtonPrimary: "bg-brand-default hover:bg-brand-hover text-text-primary text-label-md font-semibold rounded-lg",
              formFieldInput: "bg-bg-surface3 border-border-default text-text-primary placeholder:text-text-tertiary rounded-md px-3 py-2",
              footerActionText: "text-text-secondary",
              footerActionLink: "text-brand-text hover:text-brand-default transition-colors",
              identityPreviewText: "text-text-primary",
              dividerLine: "bg-border-subtle",
              dividerText: "text-text-tertiary text-caption",
              socialButtonsBlockButton: "bg-bg-surface3 border-border-default text-text-primary hover:bg-bg-surface2",
              socialButtonsBlockButtonText: "text-text-primary text-label-md font-medium",
            },
          }}
          routing="path"
          path="/sign-up"
          forceRedirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}
