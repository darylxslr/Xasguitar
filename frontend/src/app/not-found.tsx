import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-6xl font-bold text-accent-amber">404</h1>
      <p className="text-text-secondary text-lg">This page is out of tune.</p>
      <Link
        href="/"
        className="mt-4 px-6 py-3 bg-accent-amber text-bg-primary font-semibold rounded-lg hover:opacity-90 transition-opacity"
      >
        Back to Home
      </Link>
    </div>
  );
}
