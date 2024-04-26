"use client";

export default function Modal({ children }) {
  return (
    <dialog
      id="portfolio-modal"
      className="rounded-xl dark:bg-zinc-800 backdrop:bg-black/50 backdrop:backdrop-blur"
    >
      <div className="modal-box max-w-xl p-8 flex flex-col justify-between">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
            aria-label="button-close"
          >
            <i className="bx bx-x text-3xl"></i>
          </button>
        </form>
        <div className="flex flex-col gap-4">{children}</div>
      </div>
    </dialog>
  );
}
