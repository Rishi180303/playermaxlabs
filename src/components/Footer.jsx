export default function Footer() {
  return (
    <footer className="border-t border-card-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <span className="font-display text-sm font-bold text-fg">
          PlayerMax <span className="text-accent">Labs</span>
        </span>

        <div className="flex items-center gap-6">
          <a href="#" className="font-body text-xs text-muted transition-colors hover:text-fg">Privacy</a>
          <a href="#" className="font-body text-xs text-muted transition-colors hover:text-fg">Terms</a>
          <a href="#" className="font-body text-xs text-muted transition-colors hover:text-fg">Contact</a>
        </div>

        <p className="font-body text-xs text-muted">
          &copy; {new Date().getFullYear()} PlayerMax Labs
        </p>
      </div>
    </footer>
  );
}
