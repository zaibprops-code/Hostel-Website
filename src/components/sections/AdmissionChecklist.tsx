import { Icon } from "@/components/ui/Icon";
import { admissionChecklist } from "@/data/booking";

/**
 * The move-in checklist: documents, steps, what to bring and the house rules.
 * A calm, scannable reference that answers the repetitive pre-arrival
 * questions before they're asked.
 */
export function AdmissionChecklist() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {admissionChecklist.map((group) => (
        <section
          key={group.id}
          className="rounded-2xl border border-forest-900/10 bg-white p-6"
        >
          <h3 className="flex items-center gap-3 text-lg font-semibold text-forest-800">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-forest-50 text-forest-600">
              <Icon name={group.icon} size={20} />
            </span>
            {group.title}
          </h3>
          <ul className="mt-5 space-y-4">
            {group.items.map((item) => (
              <li key={item.id} className="flex gap-3">
                <Icon
                  name="check"
                  size={16}
                  className="mt-1 shrink-0 text-brass-500"
                />
                <div>
                  <p className="font-medium text-forest-800">{item.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
