import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-graphite">Profile</h2>
      <p className="mt-2 max-w-lg text-sm text-muted">
        Account creation and sign-in aren&rsquo;t connected yet. This is a preview of the
        profile fields a real account will have.
      </p>

      <div className="mt-8 max-w-md space-y-4 rounded-2xl border border-line bg-white p-6">
        <div className="mb-2 flex justify-end">
          <Badge tone="warning">Not yet functional</Badge>
        </div>
        {[
          { label: "Name", placeholder: "Your name" },
          { label: "Email", placeholder: "you@example.com" },
          { label: "Phone", placeholder: "+43 …" },
        ].map((field) => (
          <label key={field.label} className="block">
            <span className="mb-1 block text-xs font-medium text-muted">{field.label}</span>
            <input
              disabled
              placeholder={field.placeholder}
              className="w-full rounded-xl border border-line bg-line-soft px-3 py-2.5 text-sm text-muted-soft"
            />
          </label>
        ))}
      </div>
    </div>
  );
}
