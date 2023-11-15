"use client";

import styled from "styled-components";

const ModalDiv = styled.div`
  &::-webkit-scrollbar {
    display: none !important;
  }
`;

export default function Modal({ children }) {
  return (
    <dialog id="portfolio-modal" className="modal">
      <ModalDiv className="modal-box p-8 flex flex-col justify-between">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">
            <i className="bx bx-x text-3xl"></i>
          </button>
        </form>
        <div className="flex flex-col gap-4">{children}</div>
      </ModalDiv>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
