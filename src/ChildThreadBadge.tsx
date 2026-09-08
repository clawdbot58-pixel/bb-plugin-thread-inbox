import type { PluginSidebarThread } from "@get-bb/plugin-sdk/app";
import { Disc } from "./Disc";
import { Icon } from "./components/Icon";
import { cn } from "./lib/utils";

/** BB Sidebar's overlapping child dots and count disclosure. */
export function ChildThreadBadge({
  threads,
  expanded,
  onToggle,
}: {
  threads: readonly PluginSidebarThread[];
  expanded: boolean;
  onToggle: () => void;
}) {
  const visible = threads.filter((thread) => !thread.isArchived);
  const needsYou = visible.filter((thread) => thread.hasPendingInteraction).length;
  const countLabel = `${visible.length} child ${visible.length === 1 ? "thread" : "threads"}`;

  return (
    <button
      type="button"
      aria-label={`${expanded ? "Hide" : "Show"} ${countLabel}`}
      aria-expanded={expanded}
      title={`${countLabel}${needsYou > 0 ? `, ${needsYou} need you` : ""}`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onToggle();
      }}
      className={cn(
        "pointer-events-auto relative flex h-4 shrink-0 items-center gap-0.5 px-1 text-[10px] font-medium leading-none outline-none focus-visible:ring-1 focus-visible:ring-ring",
        needsYou > 0
          ? "text-[#c9791b] dark:text-amber-300"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      <span className="flex shrink-0 items-center" aria-hidden>
        {visible.slice(0, 3).map((thread, index) => (
          <span key={thread.id} data-child-thread-dot="" className={cn("flex", index > 0 && "-ml-1")}>
            <Disc thread={thread} className="size-2.5 border border-sidebar" />
          </span>
        ))}
      </span>
      <span className="whitespace-nowrap text-[9px] font-normal tabular-nums opacity-70">{visible.length}</span>
      <Icon name={expanded ? "ChevronUp" : "ChevronDown"} className="size-3" aria-hidden />
    </button>
  );
}
