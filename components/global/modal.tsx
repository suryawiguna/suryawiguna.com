"use client";

export default function Modal({ children }) {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box flex flex-col justify-between">
        <div className="flex flex-col gap-4">{children}</div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn px-3 py-1">Close</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
